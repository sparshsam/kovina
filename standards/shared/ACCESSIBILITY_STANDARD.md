# Accessibility Standard

> Version 1.0 — July 2026
>
> Reference standard. Cross-platform accessibility requirements for every Kovina Open project.
>
> Platform documents reference this standard rather than defining their own accessibility requirements.
> See: [WEBSITE_STANDARD](.../platforms/WEBSITE_STANDARD.md), [WINDOWS_APP_STANDARD](.../platforms/WINDOWS_APP_STANDARD.md),
> [ANDROID_APP_STANDARD](.../platforms/ANDROID_APP_STANDARD.md), [IOS_APP_STANDARD](.../platforms/IOS_APP_STANDARD.md),
> [MAC_APP_STANDARD](.../platforms/MAC_APP_STANDARD.md).

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Conformance Level](#2-conformance-level)
3. [Keyboard Navigation](#3-keyboard-navigation)
4. [Screen Reader Support](#4-screen-reader-support)
5. [Touch Targets](#5-touch-targets)
6. [Color & Contrast](#6-color--contrast)
7. [Focus Indicators](#7-focus-indicators)
8. [Motion & Animation](#8-motion--animation)
9. [Text Scaling](#9-text-scaling)
10. [Content & Labels](#10-content--labels)
11. [Form & Input Accessibility](#11-form--input-accessibility)
12. [Landmarks & Structure](#12-landmarks--structure)
13. [Notifications & Dynamic Content](#13-notifications--dynamic-content)
14. [Testing Checklist](#14-testing-checklist)
15. [Agent Checklist](#15-agent-checklist)

---

## 1. Philosophy

Accessibility is not a checklist to pass before release. It is a design constraint applied from the first screen, the first component, the first interaction. An inaccessible application is an incomplete application.

Kovina applications are built for a wide range of users — varying vision, hearing, motor control, and cognitive abilities. Every platform interaction must be available through at least two modalities: the obvious one (mouse, touch, gesture) and an alternative (keyboard, keyboard shortcut, Switch Control, Voice Access, voice command).

No feature is complete until it is accessible.

---

## 2. Conformance Level

### Minimum Standard

| Standard | Level | Scope |
|---|---|---|
| WCAG 2.2 | AA | All web and PWA surfaces |
| Platform HIG | Native equivalent | Native desktop and mobile apps |

### WCAG 2.2 AA Requirements (Summary)

| Principle | Key Requirements |
|---|---|
| **Perceivable** | Text alternatives, captions, adaptable content, distinguishable colors |
| **Operable** | Keyboard accessible, enough time, seizures, navigable, input modalities |
| **Understandable** | Readable, predictable, input assistance |
| **Robust** | Compatible with current and future user agents, including assistive technologies |

### Platform Equivalents

| Platform | Standard | Notes |
|---|---|---|
| Web / PWA | WCAG 2.2 AA | Full standard applies. |
| Windows | Windows Accessibility + WCAG 2.1 AA | Narrator, high contrast, UI Automation patterns. |
| Android | Google Accessibility + WCAG 2.1 AA | TalkBack, Switch Access, Voice Access. |
| iOS / macOS | Apple Accessibility + WCAG 2.1 AA | VoiceOver, Switch Control, Full Keyboard Access. |

---

## 3. Keyboard Navigation

### Universal Requirements

Every Kovina application on every platform must satisfy these keyboard requirements:

| Rule | Rationale |
|---|---|
| All interactive elements are reachable by keyboard alone | Users with motor impairments may not use a pointing device |
| Tab order matches visual reading order | Screen reader and keyboard users follow the same logical sequence |
| No keyboard traps | Focus must be able to leave every element |
| All functionality operable by keyboard | No feature exists that only a mouse or touch can invoke |
| Standard platform shortcuts work | Users expect platform conventions (Ctrl+C, Ctrl+V, etc.) |

### Platform-Specific

| Platform | Key Mechanism | Notes |
|---|---|---|
| Web / PWA | Tab, Shift+Tab, Enter, Space, arrow keys | Native HTML semantics provide this by default. |
| Windows | Tab, Shift+Tab, arrow keys, accelerator keys (Alt+letter) | All controls implement `IAccessible`. Shortcuts use standard mnemonics. |
| Android | Tab / arrow keys (with keyboard attached), D-pad | All interactive elements have `focusable="true"` and logical `nextFocus*` attributes. |
| iOS | Keyboard (with external keyboard), Switch Control | All interactive elements are in the SwiftUI/UIKit focus engine order. |
| macOS | Tab (Full Keyboard Access), arrow keys | Tab through all controls (not just text boxes). |

### Shortcut Consistency

| Action | Windows | macOS | Web |
|---|---|---|---|
| Copy | Ctrl+C | ⌘C | Ctrl/Cmd+C |
| Paste | Ctrl+V | ⌘V | Ctrl/Cmd+V |
| Cut | Ctrl+X | ⌘X | Ctrl/Cmd+X |
| Select All | Ctrl+A | ⌘A | Ctrl/Cmd+A |
| Undo | Ctrl+Z | ⌘Z | Ctrl/Cmd+Z |
| Redo | Ctrl+Y | ⌘⇧Z | Ctrl/Cmd+Shift+Z |
| Save | Ctrl+S | ⌘S | Ctrl/Cmd+S |
| Find | Ctrl+F | ⌘F | Ctrl/Cmd+F |
| Close | Alt+F4 / Ctrl+W | ⌘W | — |
| Help | F1 | ⌘? | — |
| Preferences | — | ⌘, | — |

---

## 4. Screen Reader Support

### Universal Requirements

| Rule | Rationale |
|---|---|
| All interactive elements have accessible names | Screen readers must announce what each control does |
| All non-decorative images have descriptive alt text | Users who cannot see images rely on text descriptions |
| Decorative images are hidden from screen readers | `alt=""`, `aria-hidden="true"`, or platform equivalent |
| Custom controls implement the correct role and state | Users must know what a control IS and its current state |
| Live region changes are announced | Dynamic updates must reach screen readers without losing focus |
| Heading hierarchy is logical and complete | Screen reader users navigate by headings |

### Platform-Specific Screen Readers

| Platform | Screen Reader | Key APIs |
|---|---|---|
| Web / PWA | VoiceOver (macOS/iOS), NVDA (Windows), TalkBack (Android Chrome) | ARIA roles, states, properties; semantic HTML |
| Windows | Narrator | UI Automation (`IAccessible`); `AutomationProperties.Name` |
| Android | TalkBack | `contentDescription`; `accessibilityDelegate`; `liveRegion` |
| iOS | VoiceOver | `accessibilityLabel`, `accessibilityTraits`, `accessibilityHint` |
| macOS | VoiceOver | `NSAccessibility` protocol; `accessibilityLabel`, `accessibilityRole` |

### Accessible Name Priority

When multiple sources provide an accessible name, the priority order is:

1. Explicit `aria-label` or `accessibilityLabel` (highest)
2. `aria-labelledby` or `accessibilityIdentifier`
3. Inner text content (for buttons, links)
4. Associated `<label>` element (for form controls)
5. `placeholder` or `title` attribute (lowest — avoid relying on these)

### Common Patterns

| Pattern | Requirement |
|---|---|
| Icon-only button | Must have an accessible label (e.g. `aria-label="Close"`). Tooltip is not sufficient. |
| Button with icon + text | Text content provides the accessible name automatically. |
| Custom checkbox / toggle | Must communicate checked/unchecked state and the action it controls. |
| Slider | Must communicate current value, minimum, maximum, and value text. |
| Tab panel | Must communicate selected tab, tab count, and panel association. |
| Progress indicator | Must communicate current value, minimum, maximum, and indeterminate state. |

---

## 5. Touch Targets

### Universal Minimum

| Platform | Minimum Target Size |
|---|---|
| Web / PWA | 44×44 CSS pixels |
| Windows | 44×44 effective pixels |
| Android | 48×48dp (Material Design standard) |
| iOS | 44×44pt (Apple HIG standard) |
| macOS | 32×32pt (Apple HIG standard for click targets) |

### Spacing Between Targets

- Minimum 8px (or platform equivalent) between adjacent interactive elements.
- On touchscreens, minimum 12px between targets to prevent mis-taps.

### Exceptions

- Inline links within text blocks are exempt from minimum size requirements.
- Very dense data displays (code editors, timelines, spreadsheets) may use smaller targets with reduced spacing, but must provide an alternative interaction mode.

---

## 6. Color & Contrast

### Contrast Ratios

| Component | Minimum Ratio | WCAG Reference |
|---|---|---|
| Normal text (< 18pt / 24px) | 4.5:1 | WCAG 2.2 AA |
| Large text (≥ 18pt / 24px) | 3.0:1 | WCAG 2.2 AA |
| UI components and graphical objects | 3.0:1 | WCAG 2.2 AA |
| Focus indicators | 3.0:1 against adjacent colors | WCAG 2.2 AA |

### Color Reliance

- Color must never be the sole means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.
- All status indicators must include text, icon, or pattern in addition to color.
- Error states must include an icon or text label, not just a red outline.
- Charts and data visualizations must use patterns or labels in addition to color.

### Dark & Light Mode

- Contrast ratios must be maintained in both dark and light mode.
- The accent color is the same hex value in both modes.

### Testing Tools

- Use platform-appropriate contrast checking tools.
- Simulate common color vision deficiencies (deuteranopia, protanopia, tritanopia) during testing.

---

## 7. Focus Indicators

### Universal Requirements

| Rule | Rationale |
|---|---|
| Every interactive element has a visible focus indicator | Keyboard users must know where they are |
| Focus indicator must have ≥ 3:1 contrast against adjacent colors | Standard for visibility |
| `outline: none` is never used without a replacement | Eliminating the focus outline without providing an alternative is inaccessible |
| Focus order is logical and matches visual layout | Users predict where Tab will take them next |

### Platform-Specific

| Platform | Default Indicator | Notes |
|---|---|---|
| Web / PWA | Browser default outline (2px) | Custom focus rings must be at least 2px thick with 3:1 contrast. |
| Windows | Dotted rectangle (system accent) | Custom controls provide a focus visual via UI Automation. |
| Android | Color ripple or highlight | `state_focused` drawable; `nextFocus*` attributes for order. |
| iOS | System blue glow or border | `UIFocusSystem` manages focus for keyboard and Switch Control. |
| macOS | System blue glow ring | `NSFocusRingType`; focus follows keyboard navigation. |

---

## 8. Motion & Animation

### Reduced Motion

Every Kovina application must respect the user's system-level preference for reduced motion.

| Platform | API / Media Query |
|---|---|
| Web / PWA | `@media (prefers-reduced-motion: reduce)` |
| Windows | `SystemParameters.ClientAreaAnimation` (Win32) / `UISettings.AnimationsEnabled` (UWP) |
| Android | `Settings.Global.ANIMATOR_DURATION_SCALE == 0` (system-wide); `AccessibilityManager` |
| iOS | `UIAccessibility.isReduceMotionEnabled` |
| macOS | `NSWorkspace.shared.accessibilityDisplayShouldReduceMotion` |

### Required Behavior

| Setting | Effect |
|---|---|
| Reduced motion enabled | All animations disabled. Content appears or transitions instantly. |
| Reduced motion disabled | Animations may play. Duration limited to 300ms for UI transitions. |

### What Must Be Disabled

- Parallax effects
- Scroll-triggered reveals that animate
- Loading spinners that bounce or pulse
- Hover transitions that scale or slide
- Background video or canvas animations
- Morphing or shape-shifting transitions

### What May Remain

- Opacity transitions (fade in/fade out) at very short duration (≤ 100ms)
- Color transitions for state changes (hover, active, focus) without motion
- Scroll position changes (the user controls scrolling, the app does not animate it)

---

## 9. Text Scaling

### Universal Requirement

Every Kovina application must support text scaling to at least **200%** of the default size without loss of content or functionality.

### Platform-Specific Scaling

| Platform | Mechanism |
|---|---|
| Web / PWA | Browser zoom; system font-size setting via `rem`/`em` units |
| Windows | System text scaling (Settings → Accessibility → Text size) |
| Android | System font size (Settings → Display → Font size) |
| iOS | Dynamic Type (Settings → Display & Brightness → Text Size) |
| macOS | System font size (System Settings → Displays → Larger text) |

### Implementation Rules

| Rule | Rationale |
|---|---|
| Use relative units (`rem`, `em`, `%`) for all text sizes | Absolute pixel sizes do not scale with user preferences |
| Layouts must reflow, not overflow | Horizontal scrollbars at scaled-up text sizes are inaccessible |
| No text truncation at default size | Users scaling up should not lose content |
| Buttons and controls grow with text | Fixed-height buttons overflow when text scales |
| Minimum readable size is 12px / 12pt | Below this, text is illegible even with scaling |

### What Not to Do

- Do not use `text-overflow: ellipsis` on critical content.
- Do not set fixed heights on containers that hold text.
- Do not use `max-font-size` to cap text growth.
- Do not disable user zoom on web (`user-scalable=no` is prohibited).

---

## 10. Content & Labels

### Text Alternatives

Type | Requirement
|---|---|
| Informative images | Descriptive `alt` text (conveys the purpose or content of the image) |
| Decorative images | Empty `alt=""` or `aria-hidden="true"` (hidden from screen readers) |
| Functional images (icon buttons) | `alt` text describes the action, not the image |
| Complex images (charts, diagrams) | Long description or data table in addition to `alt` text |
| Logos | Logo file: `alt="{App Name} logo"` |

### Headings

- Exactly one `<h1>` per page / screen.
- Heading hierarchy does not skip levels (h1 → h2 → h3 — never h1 → h3).
- Headings describe the content they introduce.
- Heading levels reflect document structure, not visual style (use CSS for visual size).

### Links

- Link text describes the destination or action. Never "click here" or "read more".
- External links may indicate they open in a new tab (via text or `aria-label`).

---

## 11. Form & Input Accessibility

| Rule | Rationale |
|---|---|
| Every input has an associated label | Screen readers must announce what each field is for |
| Placeholder text is not a replacement for labels | Placeholders disappear on input, leaving users lost |
| Error messages are associated with their input field | `aria-describedby` or `aria-errormessage` or platform equivalent |
| Error messages are announced by screen readers | Dynamic error text uses live region or accessibility notification |
| Required fields are indicated programmatically | `aria-required="true"` or `*` with accessible announcement |
| Input types are correct | `type="email"`, `type="number"`, etc. enable appropriate keyboards |
| Autocomplete attributes are set where practical | Helps users with cognitive disabilities fill forms correctly |

---

## 12. Landmarks & Structure

### Web / PWA

Every page must use HTML landmark elements:

```html
<header>   <!-- site header — consistent across pages -->
<nav>      <!-- primary navigation — consistent across pages -->
<main>     <!-- primary content — unique per page -->
<footer>   <!-- site footer — consistent across pages -->
```

### Rules

| Rule | Rationale |
|---|---|
| Landmarks are in the same position on every page | Users who navigate by landmarks should not have to hunt |
| Skip-to-content link is available | Keyboard users bypass repeated navigation |
| Content inside landmarks is logically ordered | The page makes sense when linearized |
| ARIA roles supplement HTML elements only when semantics are insufficient | Native HTML landmarks are preferred |

---

## 13. Notifications & Dynamic Content

| Rule | Rationale |
|---|---|
| Dynamic content updates are announced via live regions (`aria-live`) | Screen readers announce changes without losing focus |
| Toast / snackbar messages have appropriate `aria-live` setting | "polite" for non-critical, "assertive" for errors |
| Loading states are announced | Screen readers should know content is being fetched |
| Timed content has an extend or disable option | Users who need more time must not lose content |

### Live Region Usage

| Type | `aria-live` | Example |
|---|---|---|
| Status update | `polite` | "File uploaded successfully" |
| Error notification | `assertive` | "Connection lost" |
| Progress indicator | `polite` | "Loading search results…" |
| Non-critical information | `off` (default for most content) | No announcement needed |

---

## 14. Testing Checklist

### Automated Checks

- [ ] All images have appropriate `alt` text or are hidden from screen readers.
- [ ] Color contrast passes WCAG 2.2 AA for all text sizes (verified by tool).
- [ ] Heading hierarchy is logical with exactly one `<h1>`.
- [ ] All form inputs have associated labels.
- [ ] No `outline: none` without a visible replacement.
- [ ] No `user-scalable=no` or `maximum-scale=1.0` meta tags.
- [ ] Landmark elements are present and correctly used.
- [ ] All interactive elements are keyboard-reachable.

### Manual Checks

- [ ] Navigate the entire application using only the keyboard.
- [ ] Navigate using the platform screen reader (VoiceOver, Narrator, TalkBack, NVDA).
- [ ] Zoom to 200% and verify no content is clipped or overlapping.
- [ ] Enable reduced motion in system settings and verify all animations are disabled.
- [ ] Enable high-contrast mode (Windows) / Increase Contrast (macOS/iOS) and verify readability.
- [ ] Enable color-blindness simulation and verify no information is conveyed by color alone.
- [ ] Verify touch targets meet minimum size requirements (use platform overlay tool).
- [ ] Verify all custom controls have correct roles and states announced by screen readers.
- [ ] Verify dynamic content updates are announced.

### Platform-Specific Tools

| Platform | Tools |
|---|---|
| Web / PWA | Axe DevTools, Lighthouse Accessibility audit, WAVE, NVDA, VoiceOver |
| Windows | Accessibility Insights for Windows, Narrator, Inspect SDK tool |
| Android | Accessibility Scanner, TalkBack, Layout Inspector |
| iOS | Xcode Accessibility Inspector, VoiceOver, Switch Control |
| macOS | Xcode Accessibility Inspector, VoiceOver |

---

## 15. Agent Checklist

Before an AI agent declares accessibility work complete:

### Keyboard

- [ ] Every interactive element is reachable by keyboard alone.
- [ ] Tab order matches visual reading order.
- [ ] No keyboard traps — focus can move away from every element.
- [ ] Standard platform keyboard shortcuts work (Ctrl+Cmd+C, etc.).
- [ ] All features are operable without a mouse or touch.

### Screen Reader

- [ ] All interactive elements have accessible names.
- [ ] All informative images have descriptive alt text.
- [ ] All decorative images are hidden from screen readers.
- [ ] Custom controls have correct roles and states.
- [ ] Dynamic content updates are announced.
- [ ] Heading hierarchy is logical and complete.

### Touch Targets

- [ ] Touch targets meet platform minimums (44×44 CSS/effective pixels, 48dp Android, 44pt iOS).
- [ ] Sufficient spacing between interactive elements.

### Color & Contrast

- [ ] All text meets 4.5:1 contrast ratio (3.0:1 for large text).
- [ ] UI components meet 3.0:1 contrast ratio.
- [ ] Color is never the sole means of conveying information.
- [ ] Status indicators use text or icons in addition to color.

### Focus

- [ ] All interactive elements have visible focus indicators.
- [ ] Focus indicators have ≥ 3:1 contrast against adjacent colors.
- [ ] `outline: none` is never used without a visible replacement.

### Motion

- [ ] System reduced-motion preference disables all animations.
- [ ] Animations are not essential for understanding any content.
- [ ] No parallax, bounce, spin, or decorative motion.
- [ ] Transition animations are ≤ 300ms.

### Text Scaling

- [ ] All text uses relative units (`rem`, `em`, `%`).
- [ ] Layout reflows correctly at 200% text scale.
- [ ] No content is clipped or truncated at any supported text size.
- [ ] No `user-scalable=no` or `maximum-scale` restrictions.

### Structure

- [ ] Landmarks are consistent across all pages/screens.
- [ ] Skip-to-content link is available (web).
- [ ] The page makes sense when linearized (single column, no side-by-side layout).
- [ ] Forms have labeled inputs, associated error messages, and correct types.

---

*This standard defines the accessibility baseline for all Kovina projects. Platform-specific standards reference this document rather than duplicating its contents. Companion to [WEBSITE_STANDARD](.../platforms/WEBSITE_STANDARD.md), [WINDOWS_APP_STANDARD](.../platforms/WINDOWS_APP_STANDARD.md), [ANDROID_APP_STANDARD](.../platforms/ANDROID_APP_STANDARD.md), [IOS_APP_STANDARD](.../platforms/IOS_APP_STANDARD.md), and [MAC_APP_STANDARD](.../platforms/MAC_APP_STANDARD.md).*
