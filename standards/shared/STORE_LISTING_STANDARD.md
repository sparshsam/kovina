# Store Listing Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.1.0](../VERSION.md)
>
> Single source of truth for every distribution platform listing — metadata, descriptions, screenshots, promotional assets, categories, keywords, age ratings, privacy declarations, and release notes across all app stores.

---

## Table of Contents

1. [Authority](#1-authority)
2. [Philosophy](#2-philosophy)
3. [Consistency Requirements](#3-consistency-requirements)
4. [Store Metadata](#4-store-metadata)
5. [Descriptions](#5-descriptions)
6. [Screenshots](#6-screenshots)
7. [Feature Graphics & Promotional Assets](#7-feature-graphics--promotional-assets)
8. [Categories & Keywords](#8-categories--keywords)
9. [Age Ratings](#9-age-ratings)
10. [Privacy Declarations](#10-privacy-declarations)
11. [Release Notes](#11-release-notes)
12. [App-Specific Store Pages](#12-app-specific-store-pages)
13. [Localization for Stores](#13-localization-for-stores)
14. [Platform-Specific Asset Tables](#14-platform-specific-asset-tables)
15. [Update & Maintenance](#15-update--maintenance)
16. [QA Checklist](#16-qa-checklist)
17. [Agent Checklist](#17-agent-checklist)

---

## 1. Authority

### This document owns

- Store metadata requirements, description conventions, screenshot standards, promotional asset specifications, category and keyword guidelines, age rating processes, privacy declaration rules, and release note conventions for all distribution platforms.
- Consistency rules across stores — the same application presents a coherent identity on every platform.

### This document does not define

| Subject | Owning Standard |
|---|---|
| App icon sizes, formats, and generation pipeline | [APP_ICON_STANDARD.md](../shared/APP_ICON_STANDARD.md) |
| Platform-specific submission workflows and technical requirements | Platform standards ([WINDOWS_APP_STANDARD.md](.../platforms/WINDOWS_APP_STANDARD.md), etc.) |
| Privacy policy content (legal text) | [WEBSITE_STANDARD.md](.../platforms/WEBSITE_STANDARD.md) §12 |
| Translation workflow and locale architecture | [LOCALIZATION_STANDARD.md](../shared/LOCALIZATION_STANDARD.md) |
| Brand identity, naming, voice | [BRAND_GUIDELINES.md](.../foundational/BRAND_GUIDELINES.md) |

### Dependencies

This document references [APP_ICON_STANDARD.md](../shared/APP_ICON_STANDARD.md) for icon asset sizes and [BRAND_GUIDELINES.md](.../foundational/BRAND_GUIDELINES.md) for naming and voice. Platform standards reference this document for store listing requirements rather than defining their own.

---

## 2. Philosophy

A Kovina application's store listing is the first impression a user has of the product. It must be honest, consistent, and well-crafted. No exaggerated claims, no misleading screenshots, no keyword stuffing. The listing reflects the same calm, editorial tone as the product itself.

Every Kovina application ships on at least one distribution platform. Each platform has its own metadata fields, asset sizes, and review requirements — but the *message* is the same everywhere. A user who reads the Microsoft Store listing and the website should recognize the same product, the same voice, and the same value proposition.

---

## 3. Consistency Requirements

### Cross-Store Consistency

| Element | Must Be Identical | May Differ |
|---|---|---|
| Application name | ✓ | — |
| App icon (color, shape, design) | ✓ | Size and format per platform |
| Value proposition (one-sentence description) | ✓ | — |
| Long description (body text) | — | Length per platform limits |
| Screenshot content and layout | ✓ core composition | Aspect ratio per platform |
| Privacy posture | ✓ (same data collection declared) | Platform-specific form |
| Age rating determination | ✓ (same IARC base) | Platform-specific questionnaire |
| Version number | ✓ | — |

### Voice Consistency

All store listings use the Kovina brand voice as defined in [BRAND_GUIDELINES.md](.../foundational/BRAND_GUIDELINES.md):

- Calm, editorial, confident.
- Clear, direct, no jargon.
- Professional but warm.
- No superlatives ("best", "amazing", "incredible").
- No marketing fluff ("revolutionary", "game-changing").
- No comparison to competitors.

---

## 4. Store Metadata

### Application Name

| Rule | Standard |
|---|---|
| Format | Full product name (e.g. "OpenReader", not "Reader"). See [BRAND_GUIDELINES.md](.../foundational/BRAND_GUIDELINES.md) naming rules. |
| Length | Fit within the shortest platform limit (typically 30 characters). |
| Subtitle / tagline | If the platform supports a subtitle (Apple, Google), use the product tagline (≤ 30 characters). |
| Consistency | Identical across all stores and the website. |

### Platform Limits

| Platform | Name Limit | Subtitle Limit |
|---|---|---|
| Microsoft Store | 50 characters | Not supported |
| Google Play | 50 characters | Not supported |
| Apple App Store | 30 characters | 30 characters |
| Mac App Store | 30 characters | 30 characters |

### Developer / Publisher Name

| Platform | Value |
|---|---|
| All platforms | "Kovina" (if custom display is supported) or the registered developer account name. |

### Support URL

Every store listing must link to a valid, publicly accessible support page. For Kovina applications, this is the project's GitHub Issues page or a dedicated support page on the app's website.

---

## 5. Descriptions

### Short Description (Tagline)

A single sentence (≤ 80 characters) that states what the app does and why it exists.

```
Format:  [Verb] [object] for [benefit].
Example: "View and annotate PDFs with speed and precision."
```

- Used as the store subtitle, short description, or strapline depending on the platform.
- Consistent across all stores and the website hero.
- Written in the Kovina brand voice — calm, direct, no puffery.

### Long Description

The store listing body text. Structure:

```
Paragraph 1 — What this is (one sentence value proposition)
                    + who it is for.

Paragraph 2 — What it does (2–3 key features, one sentence each).

Paragraph 3 — Why Kovina (open source, privacy, local-first, no ads).

Bullet list — Key features (5–7 items, one line each).

Closing — Open source note + link to GitHub.
```

### Description Rules

| Rule | Rationale |
|---|---|
| No HTML formatting unless required by the platform | Most stores accept plain text or Markdown-like formatting |
| First 2–3 sentences are the most important | Often shown in truncated preview |
| No placeholder text or TODOs | Listing is a shipping artifact |
| No comparison to other apps | Defensive and unprofessional |
| No pricing mentions (all Kovina apps are free) | Stating "free" ages quickly; let the store badge speak |
| No feature lists that duplicate screenshot captions | Descriptions and screenshots complement each other |

### Platform Limits

| Platform | Short Description | Long Description |
|---|---|---|
| Microsoft Store | 100 characters | 10,000 characters |
| Google Play | 80 characters | 4,000 characters |
| Apple App Store / Mac App Store | Not supported (subtitle used) | 4,000 characters |

---

## 6. Screenshots

### Screenshot Philosophy

Screenshots are the most important element of a store listing. A user should understand what the app does and whether it suits them within 3–5 screenshots. Every screenshot must be real, current, and show the application in use with realistic data.

### Screenshot Rules

| Rule | Rationale |
|---|---|
| All screenshots are real — no mockups, no composited UI | Trust; users detect fake screenshots |
| Screenshots show the app in dark mode (default) | Kovina's default presentation |
| Light mode screenshots may supplement dark mode | When a feature is best shown in light mode |
| No empty states, placeholder text, or "lorem ipsum" | Screenshots must convey real value |
| No browser chrome, device frames, or desktop backgrounds | Only the application UI |
| Text in screenshots is readable at listing thumbnail size | Users judge from small previews |
| Each screenshot highlights one distinct feature | No "wall of features" per screenshot |
| First screenshot is the most important | Often the only one users see before expanding |

### Screenshot Sequence

The recommended sequence for a multi-platform Kovina app:

1. **Hero** — The main screen or landing view (what the user sees on launch).
2. **Core action** — The primary action the app performs.
3. **Result / output** — The outcome of the core action.
4. **Secondary feature** — Another significant feature.
5. **Settings / customization** (optional) — If the app has notable configuration.

### Platform Screenshot Sizes

All screenshot sizes and format requirements are defined in the per-platform tables below (§14). These are the canonical reference — platform standards reference this document instead of duplicating the tables.

---

## 7. Feature Graphics & Promotional Assets

### Microsoft Store

| Asset | Size | Notes |
|---|---|---|
| App icon | 256×256 | Defined in [APP_ICON_STANDARD.md](../shared/APP_ICON_STANDARD.md) |
| Small tile | 71×71 | |
| Medium tile | 150×150 | |
| Wide tile | 310×150 | |
| Large tile | 310×310 | |
| Store logo | 50×50 | |
| Splash screen | 620×300 | |

### Google Play

| Asset | Size | Notes |
|---|---|---|
| App icon | 512×512 (32-bit PNG) | Defined in [APP_ICON_STANDARD.md](../shared/APP_ICON_STANDARD.md) |
| Feature graphic | 1024×500 PNG/JPG | Required. Represents the app in search and featured sections. |
| Phone screenshots | Min 640px, max 3840px (at least 4) | Any aspect ratio, but must be consistent. |
| 7-inch tablet screenshots | Min 640px, max 3840px (at least 2) | Required if tablet supported. |
| 10-inch tablet screenshots | Min 640px, max 3840px (at least 2) | Required if tablet supported. |

### Apple App Store / Mac App Store

| Asset | Size | Notes |
|---|---|---|
| App icon | 1024×1024 (no alpha) | Defined in [APP_ICON_STANDARD.md](../shared/APP_ICON_STANDARD.md) |
| iPhone screenshots (6.5″) | 1242×2688 or 1290×2796 (at least 4) | Mandatory for iPhone apps. |
| iPhone screenshots (5.5″) | 1242×2208 | Optional. Auto-scaled by App Store if not provided. |
| iPad screenshots (12.9″) | 2048×2732 (at least 2) | Required if iPad supported. |
| Mac screenshots | 1920×1080 or 1280×800 (at least 3) | For Mac App Store or direct distribution. |
| App Preview (video) | 886×1920 or 1080×1920 MOV/M4V | Optional. 15–30 seconds. |

### Kovina Website

| Asset | Size | Notes |
|---|---|---|
| Social preview | 1200×630 PNG | Used for Open Graph, Twitter Card, and link sharing. |
| App icon (Archetype A) | 192×192, 512×512 PNG | PWA manifest icons, defined in APP_ICON_STANDARD.md. |
| App screenshot (hero) | 1920×1080 or equivalent | Full-width hero image on the app's website landing page. |

### GitHub Releases

| Asset | Notes |
|---|---|
| Release notes | Written in Markdown, following the CHANGELOG format from [DOCUMENTATION_STANDARD.md](.../process/DOCUMENTATION_STANDARD.md). |
| Binaries | Platform-specific installers (MSIX, DMG, APK, etc.). Named `{project}-{version}.{ext}`. |
| Checksums | SHA-256 checksum file for all downloadable artifacts. |

---

## 8. Categories & Keywords

### Category Selection

Every Kovina app selects exactly one primary category that best describes its function. The category is chosen before the first store submission and does not change without a product reason.

| Category | Suitable For |
|---|---|
| **Productivity** | OpenLedger, OpenReader, OpenSprout |
| **Utilities** | OpenSnap, OpenConvert, OpenPalette, OpenSend |
| **Finance** | OpenLedger (if finance-specific categories are available) |
| **Education** | WordWise, OpenProof |
| **Games** | Hisstastic, OpenScrabble, Chess by Sparsh |
| **Lifestyle** | OpenJournal, OpenTone |
| **Developer Tools** | OpenProof, OpenConvert |

### Keywords (Apple Platforms)

| Rule | Standard |
|---|---|
| Limit | 100 characters, comma-separated |
| Content | Descriptive, non-generic terms related to the app's function |
| Prohibited | Competitor names, trademarked terms, misleading keywords |

---

## 9. Age Ratings

### Process

Every Kovina application requires an age rating questionnaire on each distribution platform. The rating is based on:

| Factor | Typical Kovina Rating |
|---|---|
| Content | None to mild (no violence, no sexual content, no profanity) |
| Gambling | None (simulated or real) |
| Unrestricted web access | Depends on the app — most Kovina apps have no unrestricted web access |
| Privacy / data collection | None to minimal (no telemetry per Kovina principle) |

### Platform-Specific Ratings

| Platform | Method | Typical Result |
|---|---|---|
| Microsoft Store | IARC questionnaire | 3+ or Everyone |
| Google Play | Google Play content rating questionnaire | Everyone (E) |
| Apple App Store / Mac App Store | App Store age rating questionnaire | 4+ |

### Rules

- The rating must be completed honestly. Kovina's no-telemetry principle means data collection declarations are minimal.
- If the rating changes (because of new features or content), a new review submission may be required.
- The rating is reviewed with every major release to ensure it remains accurate.

---

## 10. Privacy Declarations

### General Rules

| Rule | Standard |
|---|---|
| Kovina apps collect no telemetry by default | This must be reflected truthfully in every store's privacy questionnaire |
| Privacy policy URL is required for all stores | Must link to a valid, publicly accessible `/privacy` page |
| Any third-party services (analytics, crash reporting) must be declared | If used, declared. Opt-in only. |

### Microsoft Store

- Privacy policy URL is required in the Store listing.
- The "Does this app collect data?" section must be completed accurately.

### Google Play

- Data Safety section must be completed. For a standard Kovina app with no telemetry:
  - Data collected: None.
  - Data shared: None.
  - Security practices: Data encrypted in transit (HTTPS).

### Apple App Store / Mac App Store

- Privacy policy URL is required.
- The App Store privacy questionnaire must be completed.
- Export compliance must be declared:
  - Apps using only HTTPS (no custom cryptography) may use the "exemption" declaration.
  - Apps with custom cryptography may require additional documentation.

---

## 11. Release Notes

### "What's New" Conventions

Every store submission includes release notes (also called "What's New" or "Release Notes").

| Rule | Standard |
|---|---|
| Written for users, not developers | No technical jargon, no commit summaries |
| One to three bullet points | Users scan, they do not read |
| Lead with the most important change | The feature users care about most comes first |
| Bug fixes without elaboration are acceptable | "Bug fixes and performance improvements" is a valid entry when no user-facing changes exist |
| Cross-reference the CHANGELOG.md for detail | Users who want the full history can visit GitHub |

### Platform Limits

| Platform | Character Limit |
|---|---|
| Microsoft Store | 1,500 characters |
| Google Play | Not specified (short recommended) |
| Apple App Store / Mac App Store | 4,000 characters |

---

## 12. App-Specific Store Pages

### When an App Has Multiple Store Pages

If a Kovina application ships on multiple platforms (e.g. OpenReader on Windows via Microsoft Store and macOS via Mac App Store), each store listing is independently managed but must present a coherent identity:

| Element | Rule |
|---|---|
| App name | Identical |
| App icon | Same design; platform-specific format |
| Description | Same core text; length adapted to platform limits |
| Screenshots | Same feature sequence; platform-specific aspect ratios |
| Privacy declarations | Same data collection posture |
| Age rating | Same questionnaire outcome |
| Version | Same semantic version number |

---

## 13. Localization for Stores

### When to Localize

Store listings are localized for every locale in which the app itself is localized. An app that ships with English-only UI must have an English-only store listing. An app that supports Japanese UI must have a Japanese store listing.

### Store Localization Requirements

| Requirement | Standard |
|---|---|
| Listing text is professionally translated or reviewed | Machine translation is acceptable for initial submission but must be reviewed before a stable release |
| Screenshots are localized if they contain text | Screenshots with text must be produced per locale (generated, not hand-edited) |
| Keywords are translated per locale | Keywords are not direct translations — they are per-locale search terms |
| Age rating and privacy declarations are locale-appropriate | Some regions have additional declaration requirements |

The localization workflow for store content follows the same translation process defined in [LOCALIZATION_STANDARD.md](../shared/LOCALIZATION_STANDARD.md).

---

## 14. Platform-Specific Asset Tables

This section is the canonical reference for store asset sizes. Platform standards and APP_ICON_STANDARD reference this section rather than duplicating these tables.

### Microsoft Store Assets

| Asset | Size | Format |
|---|---|---|
| App icon | 256×256 | PNG |
| Small tile | 71×71 | PNG |
| Medium tile | 150×150 | PNG |
| Wide tile | 310×150 | PNG |
| Large tile | 310×310 | PNG |
| Store logo | 50×50 | PNG |
| Splash screen | 620×300 | PNG |

### Microsoft Store Text Limits

| Field | Limit |
|---|---|
| App name | 50 characters |
| Short description | 100 characters |
| Description | 10,000 characters |
| What's new | 1,500 characters |

### Google Play Assets

| Asset | Size | Format |
|---|---|---|
| App icon | 512×512 | 32-bit PNG |
| Feature graphic | 1024×500 | PNG/JPG |
| Phone screenshot | Min 640px, max 3840px | PNG (at least 4) |
| 7-inch tablet screenshot | Min 640px, max 3840px | PNG (at least 2, if tablet supported) |
| 10-inch tablet screenshot | Min 640px, max 3840px | PNG (at least 2, if tablet supported) |

### Google Play Text Limits

| Field | Limit |
|---|---|
| App name | 50 characters |
| Short description | 80 characters |
| Full description | 4,000 characters |

### Apple App Store / Mac App Store Assets

| Asset | Size | Format |
|---|---|---|
| App icon | 1024×1024 (no alpha) | PNG |
| iPhone screenshot (6.5″) | 1242×2688 or 1290×2796 | PNG (at least 4) |
| iPhone screenshot (5.5″) | 1242×2208 | PNG (optional, auto-scaled) |
| iPad screenshot (12.9″) | 2048×2732 | PNG (at least 2, if iPad supported) |
| Mac screenshot | 1920×1080 or 1280×800 | PNG (at least 3) |
| App Preview | 886×1920 or 1080×1920 | MOV/M4V (15–30s, optional) |

### Apple App Store / Mac App Store Text Limits

| Field | Limit |
|---|---|
| App name | 30 characters |
| Subtitle | 30 characters |
| Description | 4,000 characters |
| What's new | 4,000 characters |
| Keywords | 100 characters (comma-separated) |

### GitHub Release Assets

| Asset | Notes |
|---|---|
| Release notes | Markdown. Follows CHANGELOG format from DOCUMENTATION_STANDARD.md. |
| Platform binaries | Named `{project}-{version}.{ext}`. |
| SHA-256 checksums | One checksum per artifact. |

---

## 15. Update & Maintenance

| Rule | Standard |
|---|---|
| Store listing is updated with every release | CHANGELOG, screenshots, and description are reviewed before submission |
| Screenshots are regenerated if the UI changes | Even minor UI changes can make screenshots misleading |
| Privacy declarations reviewed annually | Even if nothing changed, the declaration is re-verified |
| Age rating reviewed with every major release | New features may change the content rating |
| Store metadata consistency is checked before every submission | OpenAudit can verify cross-store metadata consistency |

---

## 16. QA Checklist

Before any store submission:

- [ ] App name is correct and consistent across all stores.
- [ ] Short/tagline description is consistent across all stores and the website.
- [ ] Long description follows the standard structure (what → features → why → open-source).
- [ ] No placeholder text, TODOs, or outdated information in any description field.
- [ ] Screenshots are real, current, and show the app in dark mode.
- [ ] First screenshot is the most compelling and representative.
- [ ] All screenshots are at the correct platform size and format.
- [ ] At least 4 screenshots are provided (per platform).
- [ ] Feature graphic (Google Play) or equivalent is present and sized correctly.
- [ ] App icon is present at the correct platform size.
- [ ] iOS 1024×1024 App Store icon has no alpha channel.
- [ ] Privacy policy URL is valid and points to a working page.
- [ ] Data safety / privacy declaration is accurate (no telemetry declared truthfully).
- [ ] Age rating questionnaire has been completed for this release.
- [ ] Export compliance (Apple) is declared.
- [ ] Categories and keywords are set and relevant.
- [ ] Release notes are written for users, not developers.
- [ ] Support URL is valid.
- [ ] Screenshot captions (if supported) are written and accurate.
- [ ] No exaggerated claims or superlatives in any text.
- [ ] Cross-store consistency check: name, description, icon match across all listings.

---

## 17. Agent Checklist

Before an AI agent declares store listing work complete:

### Metadata

- [ ] App name matches the canonical product name from BRAND_GUIDELINES.md.
- [ ] Name is within the shortest platform limit (30 characters).
- [ ] Developer/publisher name is "Kovina" or the registered account name.
- [ ] Support URL is valid and points to the GitHub Issues page or equivalent.

### Descriptions

- [ ] Short description / tagline is ≤ 80 characters and consistent across stores.
- [ ] Long description follows the standard structure.
- [ ] No superlatives, puffery, or competitor comparisons.
- [ ] Description fits within the character limit of the target platform.

### Screenshots

- [ ] All screenshots are real and show the actual application.
- [ ] First screenshot is the most important / representative view.
- [ ] Screenshots are at correct platform dimensions.
- [ ] At least 4 screenshots provided.
- [ ] Screenshots show dark mode by default (light mode optional).
- [ ] No empty states, placeholder text, or lorem ipsum in any screenshot.
- [ ] Screenshots have no browser chrome, device frames, or desktop backgrounds.

### Privacy & Ratings

- [ ] Privacy policy URL is valid and accessible.
- [ ] Data safety / privacy declaration is accurate (Kovina collects no telemetry unless declared).
- [ ] Age rating questionnaire has been completed.
- [ ] Export compliance is declared (Apple).

### Release Notes

- [ ] Release notes are written for end users.
- [ ] Most important change is listed first.
- [ ] Character limit is respected.

### Cross-Store Consistency

- [ ] App name is identical across all stores.
- [ ] App icon design is identical (sizes differ per platform).
- [ ] Core description is consistent.
- [ ] Privacy posture is identical.

---

*This standard is the canonical reference for all store listing requirements. Platform standards reference this document instead of duplicating its tables. Companion to [APP_ICON_STANDARD.md](../shared/APP_ICON_STANDARD.md) for icon assets, [BRAND_GUIDELINES.md](.../foundational/BRAND_GUIDELINES.md) for voice, and [LOCALIZATION_STANDARD.md](../shared/LOCALIZATION_STANDARD.md) for listing localization.*
