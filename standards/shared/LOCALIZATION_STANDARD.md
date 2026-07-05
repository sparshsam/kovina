# Localization Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.1.0](../VERSION.md)
>
> Canonical internationalization and localization standard for every Kovina Open project. Every Kovina application is designed to be localization-ready from day one, even if only English ships initially.

---

## Table of Contents

1. [Authority](#1-authority)
2. [Philosophy](#2-philosophy)
3. [Locale Architecture](#3-locale-architecture)
4. [Language Detection & Selection](#4-language-detection--selection)
5. [Fallback Strategy](#5-fallback-strategy)
6. [String Organization](#6-string-organization)
7. [Translation Keys & Naming](#7-translation-keys--naming)
8. [Pluralization](#8-pluralization)
9. [ICU Message Format](#9-icu-message-format)
10. [Dates & Times](#10-dates--times)
11. [Numbers & Currencies](#11-numbers--currencies)
12. [Measurements](#12-measurements)
13. [Timezone Handling](#13-timezone-handling)
14. [Right-to-Left (RTL) Support](#14-right-to-left-rtl-support)
15. [Typography Considerations Across Locales](#15-typography-considerations-across-locales)
16. [Accessibility Implications of Localization](#16-accessibility-implications-of-localization)
17. [Translation Workflow](#17-translation-workflow)
18. [Testing Localization](#18-testing-localization)
19. [Future Language Expansion](#19-future-language-expansion)
20. [Platform-Specific Implementation Strategies](#20-platform-specific-implementation-strategies)
21. [QA Checklist](#21-qa-checklist)
22. [Agent Checklist](#22-agent-checklist)

---

## 1. Authority

### This document owns

- Locale architecture, language detection, fallback strategy, string organization, translation key conventions, pluralization rules, formatting standards (dates, times, numbers, currencies, measurements), timezone handling, RTL support requirements, typography considerations for non-Latin scripts, accessibility and localization interactions, translation workflow, and testing requirements for all Kovina applications.

### This document does not define

| Subject | Owning Standard |
|---|---|
| Store listing localization text and asset generation | [STORE_LISTING_STANDARD.md](../shared/STORE_LISTING_STANDARD.md) |
| Color, typography, and visual design | [DESIGN_PLAYBOOK.md](.../foundational/DESIGN_PLAYBOOK.md) |
| Accessibility requirements (screen readers, contrast, focus) | [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md) |
| Platform-specific layout adaptation and safe areas | Platform standards ([ANDROID_APP_STANDARD.md](.../platforms/ANDROID_APP_STANDARD.md), etc.) |

### Dependencies

This document works alongside [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md) (RTL screen reader support), [DESIGN_PLAYBOOK.md](.../foundational/DESIGN_PLAYBOOK.md) (typography system), and platform standards (per-platform RTL implementation). Platform standards reference this document instead of defining their own localization rules.

---

## 2. Philosophy

A Kovina application that supports multiple languages is not a translated version of the English app — it is a localized version adapted to the linguistic, cultural, and regional expectations of its users. Localization is not an afterthought or a post-launch feature. Every UI decision made during development affects how easily the application can be localized later.

The core principle: **design for localization from the first commit, not the first translation.** Choosing a string key over a hardcoded string, using ICU placeholders instead of string concatenation, and testing with pseudo-localization are not "internationalization work" — they are engineering discipline.

Kovina's localization strategy is pragmatic: support the languages the user base needs, maintain quality over quantity (a well-translated app in 5 languages > a machine-translated app in 50), and treat the translation file as a shipping artifact with the same quality bar as source code.

---

## 3. Locale Architecture

### Locale Identifier Format

All Kovina applications identify locales using **BCP 47** tags:

```
language-script-region
```

| Component | Example | Required |
|---|---|---|
| Language (`ISO 639-1`) | `en`, `ja`, `ar`, `zh` | Yes |
| Script (`ISO 15924`) | `Hans`, `Latn` | Only when ambiguity exists (e.g. `zh-Hans` vs `zh-Hant`) |
| Region (`ISO 3166-1`) | `US`, `GB`, `JP` | Only when regional variance matters (e.g. `en-US` vs `en-GB`) |

### Examples

| Locale Tag | Meaning |
|---|---|
| `en` | English (generic) |
| `en-US` | English (United States) |
| `en-GB` | English (United Kingdom) |
| `ja` | Japanese |
| `ar` | Arabic |
| `zh-Hans` | Chinese (Simplified) |
| `zh-Hant` | Chinese (Traditional) |
| `fr-CA` | French (Canada) |
| `pt-BR` | Portuguese (Brazil) |
| `de` | German |

### Locale Scope

Kovina applications always ship the **language** as the primary differentiator, not the region. Regional variants (`en-GB`, `en-AU`) are only created when there is a substantive difference in spelling, date format, currency, or measurement conventions.

---

## 4. Language Detection & Selection

### Detection Priority

When determining which language to display, Kovina applications follow this priority:

1. **User-selected language** from in-app settings (highest priority) — explicit user choice overrides everything.
2. **System language** — the locale the user has selected in their operating system or browser settings.
3. **Application default** — the fallback locale (typically `en`).

### User Setting Persistence

- The user's language selection is persisted across sessions (localStorage, UserDefaults, SharedPreferences, or equivalent).
- The persisted selection overrides system language on subsequent launches.
- A "Reset to system language" option is available in settings.

### System Language Detection

| Platform | API |
|---|---|
| Web | `navigator.language` (primary), `navigator.languages` (priority list) |
| Windows | `ApplicationLanguages.PrimaryLanguageOverride` |
| Android | `Configuration.locales` (API 24+), `LocaleList.getDefault()` |
| iOS / macOS | `Locale.current`, `Bundle.preferredLocalizations` |

### Rules

| Rule | Rationale |
|---|---|
| Never silently override the user's language choice | User preference is authoritative |
| Language selection is not in a "Settings" submenu — it is prominent | Language affects the entire experience |
| Detect on first launch, persist the result | Avoid re-detecting on every session |
| Respect system language changes | If the user changes their OS language, offer to switch |

---

## 5. Fallback Strategy

### Locale Fallback Chain

When a translation is missing for the active locale, the application follows a deterministic fallback chain:

```
zh-Hans-CN → zh-Hans → zh → en
fr-CA      → fr         → en
en-GB      → en
en         → (no fallback — English is the base)
```

### Rules

| Rule | Rationale |
|---|---|
| Every application has a complete `en` (English) locale | English is the authoring language for all Kovina apps |
| A missing translation key falls back to `en`, never to an empty string or key name | Users should always see something readable |
| Fallback is transparent — no UI indicator that a fallback occurred | Users should never see partial translations mixed with source language |
| Fallback chains are defined per locale, not globally | Chinese Traditional is not a fallback for French |

---

## 6. String Organization

### Source of Truth

All localizable strings in a Kovina application live in a single directory per platform:

```
Web / PWA:     src/locales/{locale}.json
Windows:       Strings/{locale}/Resources.resw
Android:       app/src/main/res/values-{locale}/strings.xml
iOS / macOS:   {Project}/Resources/{locale}.lproj/Localizable.strings
```

### File Naming

| Platform | File | Format |
|---|---|---|
| Web / PWA | `{locale}.json` | Flat JSON with nested keys |
| Windows | `Resources.resw` | XML resource file |
| Android | `strings.xml` | XML string resources |
| iOS / macOS | `Localizable.strings` | Key-value string file |

### Structure Rules

| Rule | Rationale |
|---|---|
| One translation file per locale | Simple, predictable, easy to audit |
| Keys are not deleted when removed from code — they are deprecated | Avoid breaking translators' context |
| Comments are included above each key explaining context and length limits | Translators need context to produce accurate translations |
| No translation file is ever empty | Each locale file may be partial (fallback fills gaps), but the file exists |

---

## 7. Translation Keys & Naming

### Key Convention

```
{section}.{component}.{descriptive_name}
```

| Convention | Example |
|---|---|
| `common.save` | Shared action labels |
| `nav.title` | Navigation titles |
| `settings.language.label` | Settings section, language row, label |
| `errors.network.timeout` | Error messages |
| `onboarding.welcome.heading` | Onboarding flow |

### Key Rules

| Rule | Rationale |
|---|---|
| Keys are lowercase with dots as separators | Consistent, readable, familiar from i18n conventions |
| Keys describe the content, not the location | `login.heading` not `login_page_title_text` |
| Keys are unique across the entire application | No duplicate keys with different values |
| Keys are stable — once introduced, the key name does not change | Changing a key orphan translations |
| Keys are meaningful to humans, not auto-generated | `btn_1`, `str_2`, `lbl_3` are not acceptable |

---

## 8. Pluralization

### ICU Plural Rules

Every Kovina application uses the **ICU MessageFormat** plural syntax, which handles the full range of plural categories across languages (zero, one, two, few, many, other).

```json
{
  "inbox.message_count": "{count, plural, =0 {No messages} one {# message} other {# messages}}"
}
```

### Rules

| Rule | Rationale |
|---|---|
| Plural rules are never hardcoded with string concatenation | Languages have 1–6 plural forms; English has 2, Arabic has 6 |
| The `=0`, `=1` exact-match forms are used alongside `one`, `other` | Some languages distinguish "0" from "other" |
| The `#` placeholder is used for the numeric value | Translators place it naturally in sentence order |
| Plural keys are tested with values 0, 1, 2, 5, and 100 | Covers common edge cases across plural categories |

---

## 9. ICU Message Format

### Standard

All Kovina applications use **ICU MessageFormat** (or the closest platform equivalent) for any string that contains:

- Variables (`{name}`)
- Pluralization (`{count, plural, ...}`)
- Gender or select statements (`{gender, select, ...}`)
- Complex formatting (`{date, date, medium}`)

### Platform Support

| Platform | ICU Support |
|---|---|
| Web | `intl-messageformat` or `react-intl` / FormatJS ecosystem |
| Windows | `.resw` files with `{0}` positional format; ICU via platform tools |
| Android | `ICU` class (Android 7+); `String.format()` for positional args |
| iOS / macOS | `String(format:)` for positional; `ICU` via `Foundation` formatters |

### Rules

| Rule | Rationale |
|---|---|
| Never concatenate strings to build sentences | Word order varies between languages; concatenation breaks in translation |
| Variables in strings are named, not positional | `{userName}` is clearer than `{0}` |
| Translators can reorder variables in the translated string | Target language syntax may require different word order |
| Placeholder names are descriptive and use camelCase | `{userName}`, `{fileCount}`, `{remainingTime}` |

---

## 10. Dates & Times

### Formatting

All date and time display uses the operating system's or locale's standard formatters — never custom format strings.

| Concept | Standard |
|---|---|
| Date display | Use the platform's locale-aware date formatter (`.dateStyle` / `DateStyle` / `DateFormat.getDateInstance`) |
| Time display | Use the platform's locale-aware time formatter (`.timeStyle` / `TimeStyle` / `DateFormat.getTimeInstance`) |
| Relative time | Use platform relative date formatting ("2 hours ago", "yesterday") where supported |
| 12h vs 24h | Respect the user's system setting. Never hardcode `h:mm a` or `HH:mm`. |

### For Internal Representation

- All dates are stored and transmitted in **ISO 8601** format with timezone offset.
- All date calculations operate on UTC.
- Date display is localized at render time, never at storage time.

---

## 11. Numbers & Currencies

### Numbers

| Concept | Standard |
|---|---|
| Decimal separator | Locale-aware (`.` in `en`, `,` in `de`) |
| Grouping separator | Locale-aware (`,` in `en`, `.` in `de`, space in `fr`) |
| Percentages | Locale-aware formatting via platform number formatter |

### Currencies

| Rule | Standard |
|---|---|
| Currency display uses ISO 4217 codes | `USD`, `EUR`, `JPY`, `CAD` |
| Currency formatting uses the platform's locale-aware currency formatter | Symbol placement and decimal digits vary by locale |
| Store the amount in the minor unit (cents, pence) with the currency code | `{ "amount": 1999, "currency": "USD" }` = $19.99 |

### Rules

| Rule | Rationale |
|---|---|
| Never hardcode number formats | Commas and decimals swap meaning across locales |
| Never store formatted numbers | Store integers, format at display time |
| Percentages are formatted with the locale-aware percent formatter | Some locales use `% 50` instead of `50%` |

---

## 12. Measurements

| Concept | Standard |
|---|---|
| Display | Use platform locale-aware measurement formatters |
| Internal | Store measurements in the metric system (SI base units), format for display based on user's region |
| Conversion | Do not convert between systems at the data layer — convert at the display layer only |

### Examples

| Internal Storage | Display (en-US) | Display (en-GB) | Display (de) |
|---|---|---|---|
| 1.5 km | 0.93 mi | 1.5 km | 1,5 km |
| 25.4 mm | 1 in | 25.4 mm | 25,4 mm |
| 30 °C | 86 °F | 30 °C | 30 °C |

---

## 13. Timezone Handling

### Rules

| Rule | Rationale |
|---|---|
| All timestamps are stored and transmitted in **UTC** | Avoids ambiguity during daylight saving transitions |
| Timezone conversion happens at display time only | The same timestamp displays differently for users in Tokyo vs Toronto |
| The user's timezone is detected from the system | `Intl.DateTimeFormat().resolvedOptions().timeZone` or platform equivalent |
| Timezone is not assumed to be the storage location's timezone | Servers and databases may be in any timezone |
| Timezone is displayed alongside timestamps when precision matters | "2026-07-05 14:30 UTC" is unambiguous |

---

## 14. Right-to-Left (RTL) Support

### Philosophy

RTL is not a mirror. It is a distinct layout direction with its own typographic, navigational, and interactional conventions. A Kovina application that supports an RTL locale (Arabic, Hebrew, Persian, Urdu, etc.) is designed for RTL from the first layout, not retrofitted.

### Requirements

| Requirement | Standard |
|---|---|
| Layout direction | All layouts flip automatically based on locale — no hardcoded `left` or `right` |
| Text alignment | Body text aligns to the dominant direction. Mixed-direction text uses Unicode Bidirectional Algorithm. |
| Navigation | Back/forward direction flips. Swipe gestures remain directional (swipe right = go back in LTR, go forward in RTL). |
| Icons | Icons that imply direction (arrows, chevrons, play buttons) are mirrored in RTL |
| Animations | Slide-in/slide-out directions are reversed in RTL |

### Implementation Strategies by Platform

| Platform | RTL Strategy |
|---|---|
| Web / PWA | `dir="auto"` on root element. CSS logical properties (`margin-inline-start`, `padding-inline-end`). |
| Windows | `FlowDirection` property on layouts. Mirror images for directional icons. |
| Android | `layoutDirection` in manifest. Use `start`/`end` instead of `left`/`right` in layouts. |
| iOS / macOS | `semanticContentAttribute` on views. `leading`/`trailing` constraints instead of `left`/`right`. |

### Rules

| Rule | Rationale |
|---|---|
| Never use `left` or `right` for layout — use `start` and `end` | RTL flips automatically without code changes |
| Never hardcode text alignment — use the locale's default | Arabic is right-aligned; numbers within Arabic text are left-aligned |
| RTL is tested with real content, not lorem ipsum | Translated strings have different lengths |
| RTL text with embedded LTR content (code, URLs, numbers) is rendered correctly | Unicode Bidi Algorithm handles mixed-direction text |

---

## 15. Typography Considerations Across Locales

### Font Support

| Requirement | Standard |
|---|---|
| The primary typeface supports the target script | Inter supports Latin, Cyrillic, Greek. Not all scripts. |
| Fallback fonts are specified for non-Latin scripts | System UI fonts for CJK, Arabic, Devanagari, etc. |
| Font weights render correctly across scripts | Some scripts do not support 300–900 weight range |
| Line height is adjusted per script | CJK and Arabic may require different line spacing |

### String Length Variance

| Rule | Rationale |
|---|---|
| UI layouts account for text expansion (30–50% in some locales) | German and Russian translations are typically longer than English |
| Buttons and labels have horizontal padding, not fixed widths | Accommodates the widest translation |
| Truncation is avoided — text wraps or reflows | No text is cut off because translation exceeds the English length |
| Pseudo-localization is used during development | `[××× Lōrém ípsüm ×××]` reveals layout issues before translation begins |

---

## 16. Accessibility Implications of Localization

| Interaction | Requirement |
|---|---|
| Screen reader language | The screen reader announces content in the correct language. `lang` attribute on HTML, accessibility language hint on native platforms. |
| RTL screen reader navigation | Screen readers navigate RTL content in the correct direction. Tested per locale. |
| Translated text length and screen reader performance | Very long translations are not announced as a single unbroken block. |
| Localized images | Images containing text must have translated `alt` text. |
| UI language change and screen reader | If the user changes language in-app, the screen reader detects the change and adjusts. |

---

## 17. Translation Workflow

### Process

```
1. Extract keys from source code      (developer, automated)
2. Review keys for context             (developer)
3. Send to translator                  (automated export)
4. Translate                           (human or machine + review)
5. Import translations                 (automated import)
6. Pseudo-localization build           (developer, CI)
7. Review in-context                   (developer + reviewer)
8. Ship                                (part of release process)
```

### Key Extraction

- Keys are extracted automatically from source code using the locale toolchain (FormatJS CLI, Babel plugin, Android lint, etc.).
- Extraction is run as part of the build process.
- Missing keys in a locale file are detected by CI.

### Translation Quality

| Type | Acceptable For |
|---|---|
| Professional human translation | Stable releases, production shipping |
| Machine translation + human review | Beta releases, initial locale addition |
| Machine translation only | Experimental stage only |

### Who Translates

| Scenario | Translator |
|---|---|
| Core English strings | Developer (authoring language) |
| Production translations | Professional translator or native speaker |
| Community-contributed translations | Reviewed and accepted by maintainer |
| Machine translation | Never shipped without human review |

---

## 18. Testing Localization

### Pseudo-Localization

Every Kovina application supports pseudo-localization for development testing:

```
Input:  "Save changes?"
Output: "[Ŝávé çháñğéś?]  (εɳɠιιʂҽ ʅαƚιɳ)"
```

Pseudo-localization reveals:
- Strings that are hardcoded and not extracted.
- Layouts that break with longer translated text.
- RTL or special character rendering issues.

### Testing Checklist

- [ ] Every user-facing string is extracted to a translation key (no hardcoded strings).
- [ ] Pseudo-localization build renders without layout breaks at 30% string expansion.
- [ ] RTL layout flips correctly on all screens (tested per platform).
- [ ] Dates, times, and numbers render in the correct locale-specific format.
- [ ] Pluralization works for values 0, 1, 2, 5, and 100.
- [ ] Fallback to English works for missing translation keys (no empty strings, no key names).
- [ ] Language switch persists across sessions and restarts.
- [ ] Language switch does not require app restart (where platform supports it).
- [ ] Screen reader announces content in the correct language.
- [ ] Icons with directional meaning are mirrored in RTL.
- [ ] No layout uses `left` or `right` — all use `start` and `end`.
- [ ] All dates are stored in ISO 8601 UTC.

---

## 19. Future Language Expansion

### Adding a New Locale

The process for adding a new locale:

1. Create the locale file following the naming convention.
2. Translate all keys (or use machine translation with human review for beta).
3. Pseudo-localization build passes.
4. RTL testing (if the script is RTL).
5. Date, time, number, and currency formatting verified.
6. Plurals verified per the locale's plural rules.
7. In-app language switcher updated.
8. Store listing localized ([STORE_LISTING_STANDARD.md](../shared/STORE_LISTING_STANDARD.md)).
9. Release notes include the new locale.

### When to Add a Locale

| Criterion | Threshold |
|---|---|
| User demand | Multiple requests from native speakers of a language |
| Community contribution | A complete and reviewed translation is submitted |
| Market expansion | The application is targeting a region that speaks the language |

### Locale Maintenance

- A locale is removed if it falls below 80% translation coverage for two consecutive stable releases and no maintainer steps forward.
- Deprecated locale files remain in the repository for archival purposes but are excluded from the build.

---

## 20. Platform-Specific Implementation Strategies

### Web / PWA

| Area | Strategy |
|---|---|
| Library | FormatJS / `react-intl` (or framework equivalent) |
| File format | Flat JSON with ICU MessageFormat values |
| RTL | `dir="auto"` on `<html>`, CSS logical properties |
| Language detection | `navigator.languages` with fallback chain |
| Key extraction | `formatjs extract` CLI or Babel plugin |

### Windows

| Area | Strategy |
|---|---|
| File format | `.resw` XML files per locale in `Strings/{locale}/` |
| RTL | `FlowDirection="LeftToRight"` on root, set per locale |
| Language detection | `ApplicationLanguages.PrimaryLanguageOverride` |
| Formatting | Platform `ResourceLoader` with `{0}` positional arguments |

### Android

| Area | Strategy |
|---|---|
| File format | `values-{locale}/strings.xml` |
| RTL | `android:supportsRtl="true"` in manifest |
| Language detection | `Configuration.locales` |
| Pluralization | Android quantity strings (`<plurals>`) with `%d` |

### iOS / macOS

| Area | Strategy |
|---|---|
| File format | `{locale}.lproj/Localizable.strings` |
| RTL | `semanticContentAttribute` on views |
| Language detection | `Bundle.preferredLocalizations` |
| Pluralization | `.stringsdict` files with ICU plural rules |

---

## 21. QA Checklist

- [ ] All user-facing strings are extracted — no hardcoded strings in source code.
- [ ] Translation keys follow the `{section}.{component}.{name}` convention.
- [ ] Every locale file has comments explaining context for each key.
- [ ] Pseudo-localization build passes without layout breaks.
- [ ] Date and time display uses locale-aware formatters, not custom format strings.
- [ ] Number, currency, and percentage display uses locale-aware formatters.
- [ ] Pluralization is tested for values 0, 1, 2, 5, and 100 in each locale.
- [ ] Fallback to English works for every missing key (no empty strings, no raw keys).
- [ ] Language selection persists across sessions.
- [ ] Language change applies without app restart (where platform supports it).
- [ ] RTL layout flips correctly on all screens.
- [ ] Navigation direction reverses in RTL locales.
- [ ] Directional icons are mirrored in RTL locales.
- [ ] No layout uses `left` or `right` — all use `start` and `end`.
- [ ] All dates are stored in ISO 8601 UTC.
- [ ] Timestamps display in the user's local timezone.
- [ ] Screen reader announces content in the correct language.
- [ ] Translations are at least machine-translated + human reviewed for stable releases.
- [ ] Store listings are localized for every locale the app supports.
- [ ] CI detects missing translation keys and fails the build.

---

## 22. Agent Checklist

Before an AI agent declares localization work complete:

### Architecture

- [ ] All user-facing strings are extracted to locale files — no hardcoded strings remain.
- [ ] Translation keys follow the `{section}.{component}.{name}` naming convention.
- [ ] Keys are stable — no renaming after introduction.
- [ ] ICU MessageFormat (or equivalent) is used for strings with variables or plurals.
- [ ] String concatenation is never used to build sentences.

### Locale Support

- [ ] English (`en`) locale is complete and is the authoring locale.
- [ ] Fallback chains are defined so missing keys always fall back to `en`.
- [ ] Language selection persists across sessions.
- [ ] System language is detected and respected on first launch.

### Formatting

- [ ] All date/time display uses locale-aware formatters.
- [ ] All number/currency display uses locale-aware formatters.
- [ ] All dates are stored in ISO 8601 UTC.
- [ ] Timezone conversion happens at display time only.
- [ ] Measurements are stored in SI base units and localized for display.

### RTL

- [ ] Layouts use `start`/`end` (or equivalent) instead of `left`/`right`.
- [ ] Navigation and swipe directions reverse in RTL locales.
- [ ] Directional icons are mirrored in RTL.
- [ ] RTL is tested with real content, not placeholder text.

### Quality

- [ ] Pseudo-localization build passes without layout breaks.
- [ ] Pluralization is tested per locale.
- [ ] Missing translation keys fall back gracefully (no empty strings, no raw keys).
- [ ] CI detects missing keys.

### Platform

- [ ] Platform-specific locale file format is used (`.resw`, `strings.xml`, `.strings`, JSON).
- [ ] Locale-specific font fallbacks are configured.
- [ ] RTL implementation matches the platform strategy table (§20).

---

*This standard defines the canonical localization and internationalization requirements for all Kovina projects. Platform standards reference this document instead of defining their own localization rules. Companion to [STORE_LISTING_STANDARD.md](../shared/STORE_LISTING_STANDARD.md) for listing localization, [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md) for a11y across locales, and [DESIGN_PLAYBOOK.md](.../foundational/DESIGN_PLAYBOOK.md) for typography.*
