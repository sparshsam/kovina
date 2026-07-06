# Navigation Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.2.0](../VERSION.md)
>
> Canonical navigation architecture standard for every Kovina Open project. Defines how users move through an application — the nervous system of the app organism.
>
> Platform documents reference this standard rather than defining their own navigation rules.

---

## Table of Contents

1. [Authority](#1-authority)
2. [Philosophy](#2-philosophy)
3. [Navigation Hierarchy](#3-navigation-hierarchy)
4. [Navigation Components](#4-navigation-components)
5. [Platform Navigation Principles](#5-platform-navigation-principles)
6. [Route Naming](#6-route-naming)
7. [Deep Links](#7-deep-links)
8. [Back Behavior](#8-back-behavior)
9. [Navigation State Persistence](#9-navigation-state-persistence)
10. [Search Placement](#10-search-placement)
11. [Settings Placement](#11-settings-placement)
12. [Overflow & Contextual Navigation](#12-overflow--contextual-navigation)
13. [Responsive Navigation Adaptation](#13-responsive-navigation-adaptation)
14. [PWA Navigation](#14-pwa-navigation)
15. [Command Palette](#15-command-palette)
16. [Accessibility Requirements](#16-accessibility-requirements)
17. [Prohibited Navigation Patterns](#17-prohibited-navigation-patterns)
18. [QA Checklist](#18-qa-checklist)
19. [Agent Checklist](#19-agent-checklist)

---

## 1. Authority

### This document owns

- Navigation hierarchy rules — primary, secondary, tertiary.
- Navigation component specification — bottom navigation, tabs, sidebars, navigation rails, breadcrumbs, command palettes.
- Platform navigation principles — iOS, Android, Windows/macOS, web.
- Route naming conventions and deep link schemas.
- Back behavior, navigation state persistence, and search/settings placement rules.
- Responsive navigation adaptation across mobile, tablet, and desktop.
- PWA navigation adaptation across platforms (Android PWA vs iPhone PWA).
- Overflow menus, contextual navigation, and progressive disclosure.
- Accessibility requirements for navigation.

### This document does not define

| Subject | Owning Standard |
|---|---|
| Visual design of navigation components (colors, typography, spacing) | [DESIGN_PLAYBOOK.md](../foundational/DESIGN_PLAYBOOK.md) |
| Accessibility implementation details (keyboard, screen readers, focus) | [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md) |
| Layout architecture and responsive breakpoints | [PRODUCT_ARCHITECTURE_PLAYBOOK.md](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) |
| Platform-specific safe areas, status bars, and title bar behavior | Platform standards (IOS_APP_STANDARD, WINDOWS_APP_STANDARD, etc.) |
| PWA manifest and service worker configuration | [PWA_STANDARD.md](../platforms/PWA_STANDARD.md) |

### Dependencies

This document works alongside [PRODUCT_ARCHITECTURE_PLAYBOOK.md](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) (layout architecture), [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md) (keyboard and screen reader navigation), [DESIGN_PLAYBOOK.md](../foundational/DESIGN_PLAYBOOK.md) (visual rendering of navigation), and platform standards (per-platform navigation implementation). Platform standards reference this document instead of defining their own navigation rules.

---

## 2. Philosophy

Navigation is the nervous system of the application. It answers one question at every moment: **"Where am I, and where can I go next?"**

A Kovina application's navigation should be predictable before it is clever. Users should develop an intuitive mental model of the app's structure within minutes of first use. Novel navigation patterns — even elegant ones — cost the user a cognitive tax every time they interact. Standard patterns cost nothing.

The navigation architecture follows three principles:

1. **The user always knows where they are.** Every screen has an identifiable context. Navigation components provide persistent orientation cues.
2. **The user always knows how to get back.** Every screen has a clear reverse path. No dead ends. No modal stacks that trap the user.
3. **The user's path survives interruptions.** Closing and reopening the app restores navigation context. A paused session resumes naturally — not at the home screen.

Navigation is structural, not decorative. Every navigation element earns its place by answering a real user need. If a navigation pattern cannot be justified by user behavior data, remove it.

---

## 3. Navigation Hierarchy

### Three-Tier Model

Every Kovina application implements exactly three tiers of navigation. No more, no less.

```
Primary   → App-wide structure  (tab bar, sidebar, navigation rail)
Secondary → Section-level       (sub-navigation within a section)
Tertiary  → Contextual          (back, breadcrumbs, inline links)
```

| Tier | Purpose | Duration | Example |
|---|---|---|---|
| **Primary** | Top-level destinations. Persistent across the app. | Always visible in its slot. | Bottom tab bar, sidebar navigation. |
| **Secondary** | Section-specific navigation. Changes when the user enters a different primary section. | Visible while user is within that section. | Tab bar within a section, sidebar sub-items. |
| **Tertiary** | Navigational context within a page or screen. Enables drill-down and lateral moves. | Contextual — appears as needed. | Breadcrumbs, back button, inline "See all" links. |

### Hierarchy Rules

| Rule | Rationale |
|---|---|
| Primary navigation is always accessible from any screen | No dead sections, no hidden restart points |
| Secondary navigation changes only when the primary section changes | Predictable — the user knows when navigation will shift |
| Tertiary navigation never replaces primary or secondary | It supplements, not substitutes |
| A screen has exactly one route in the primary hierarchy | No ambiguous "which section am I in?" |
| Active state is visually distinct at every tier | The user always knows their location |
| Inactive primary destinations remain visible | The user always knows what else exists |

---

## 4. Navigation Components

### 4.1 Bottom Navigation (Mobile Primary)

Bottom navigation is the standard primary navigation pattern for mobile applications.

| Rule | Rationale |
|---|---|
| 3–5 top-level destinations | More than 5 forces horizontal scrolling or overflow menus |
| Icons + short labels | Text-only is harder to scan; icon-only is ambiguous |
| Active state is indicated by filled icon + emphasized text | Clear, standard, immediately readable |
| Badge counts are supported for notifications | Standard platform pattern |
| Bottom navigation never scrolls | Fixed position, always accessible |
| Never use bottom navigation for secondary content | Only primary destinations |

### 4.2 Tab Navigation (Secondary)

Tabs switch between related content within a section.

| Rule | Rationale |
|---|---|
| 2–5 tabs per tab group | More than 5 indicates poor information architecture |
| Tabs are horizontally scrollable on mobile if they exceed screen width | Standard mobile pattern |
| Tabs do not nest tabs | Two levels of tab nesting is the practical maximum — beyond that, restructure |
| Tab content is lazy-loaded but cached in memory while the parent is active | Preserves scroll position and state |
| Active tab is visually distinct | Immediate orientation |

### 4.3 Navigation Rail (Desktop / Tablet Primary)

The navigation rail is the standard primary navigation pattern for desktop and large tablet applications.

| Rule | Rationale |
|---|---|
| Icons + labels on first interaction | Labels are initially hidden, shown on hover or when expanded |
| Expandable to a full sidebar with labels always visible | Accommodates both icon-only and labeled preferences |
| Consistent width — never changes when selection changes | Layout stability |
| Fixed position on the left edge | Standard desktop placement |
| Supports collapse to icon-only on narrow windows | Space efficiency |
| Active section is visually distinct | Orientation |

### 4.4 Sidebar (Desktop / Tablet Secondary)

The sidebar provides section-level navigation alongside or within the rail pattern.

| Rule | Rationale |
|---|---|
| Secondary navigation lives inside the sidebar | Hierarchical separation from primary |
| Sidebar items may be grouped with headers | Section organization |
| Sidebar may include collapsible groups | Progressive disclosure for large hierarchies |
| Sidebar content changes when primary selection changes | Section-scoped |
| Sidebar can be toggled open/closed on narrower viewports | Space-efficient adaptation |
| Active item is visually distinct | Orientation |

### 4.5 Breadcrumbs (Tertiary)

Breadcrumbs provide navigation context for deep content.

| Rule | Rationale |
|---|---|
| Breadcrumbs show the full path from primary section to current page | Complete context, not partial |
| Each segment is clickable / tappable | Quick backtracking |
| The last segment is the current page and is not clickable | Standard convention |
| Breadcrumbs are omitted on mobile where the back button suffices | Screen space economy |
| Separator is a simple forward slash or chevron | Universally understood |

### 4.6 Back Button

Every non-top-level screen has a back mechanism.

| Rule | Rationale |
|---|---|
| Back returns to the previous screen in the navigation stack | Expected behavior |
| Back preserves the state of the previous screen | No data loss on backward navigation |
| Back does not reset scroll position | User continuity |
| On mobile, the system back gesture/button takes precedence | Platform convention |
| On desktop, a back button appears in the header or via breadcrumbs | Desktop convention |
| Back cannot be trapped — infinite loops are prohibited | User freedom |

### 4.7 Command Palette

Desktop applications and complex web apps should provide a command palette.

| Rule | Rationale |
|---|---|
| Triggered by Ctrl+K (or Cmd+K) | Universal convention |
| Searches across all navigable destinations | Full-app search |
| Results are categorized by section | Context for each result |
| Results support keyboard navigation (arrow keys + Enter) | Power user efficiency |
| Dismisses on Escape | Standard behavior |
| Command palettes are optional — not required for simple apps | Proportionate complexity |

---

## 5. Platform Navigation Principles

### 5.1 iOS / iPadOS Navigation

| Principle | Application |
|---|---|
| Navigation stack (UINavigationController) is the primary drill-down pattern | Standard iOS convention |
| Tab bar (UITabBarController) for primary destinations, 3–5 tabs | Matches iOS HIG |
| Bottom sheet for modal secondary actions | Standard iOS presentation |
| Swipe-back gesture is always enabled | Never disabled |
| Large titles collapse to small on scroll | Matches iOS HIG |
| Tab bar has a translucent background with blur | Matches iOS HIG |
| No hamburger menus — use tab bar or navigation bar | Apple HIG discourages hamburger menus |

### 5.2 Android Navigation

| Principle | Application |
|---|---|
| Bottom navigation bar for primary destinations (3–5 items) | Material Design bottom navigation |
| Navigation drawer for secondary or less-frequent destinations | Only if bottom navigation is insufficient |
| Up button (back arrow in top bar) for hierarchy navigation | Standard Android convention |
| System back button navigates the back stack | Standard Android behavior — never override |
| Navigation rail for large screens/tablets (foldable support) | Material Design canonical |
| Bottom navigation may include a FAB (Floating Action Button) for primary action | Standard Material pattern |
| No hamburger menu as primary navigation — bottom nav is preferred | Material Design best practice |

### 5.3 Windows / Desktop Navigation

| Principle | Application |
|---|---|
| Navigation rail or sidebar on the left edge | Standard desktop convention |
| Pivot / tab controls for section-level navigation | Windows convention |
| Back is via breadcrumbs or app-provided back button, not window chrome | Desktop convention |
| Menu bar is acceptable for complex applications with many sections | Traditional desktop pattern |
| Keyboard shortcuts are documented and discoverable | Desktop power user expectation |
| Multiple windows are supported where appropriate | Desktop multitasking expectation |

### 5.4 macOS Navigation

| Principle | Application |
|---|---|
| Sidebar (NSSplitView) for primary navigation | Standard macOS convention |
| Toolbar items for section-level actions | Matches macOS HIG |
| Back via breadcrumbs or "Go" menu in toolbar | Standard macOS pattern |
| Menu bar items follow macOS convention: File, Edit, View, Window, Help | Platform standard |
| Multiple windows with independent navigation state | Standard macOS behavior |
| Tabbed windows where appropriate (Safari-style tabs) | macOS multitasking |

### 5.5 Web Navigation

| Principle | Application |
|---|---|
| Header nav bar for primary destinations (responsive) | Universal web convention |
| Mobile hamburger menu for primary nav on narrow viewports | Standard responsive pattern — only on web, not native |
| Breadcrumbs for deep content | Web convention |
| Browser back/forward buttons follow the web history API | Standard behavior, never overridden |
| URL-based routing enables direct navigation and sharing | Web-native advantage |
| Keyboard shortcuts documented but not required | Web user expectation varies |

---

## 6. Route Naming

### Route Format

Routes follow a consistent naming convention across all Kovina applications:

```
/{primary-section}[/{sub-section}][/{resource}[/{resource-id}]]
```

| Segment | Pattern | Required | Example |
|---|---|---|---|
| Primary section | Lowercase, singular noun | Always | `/documents`, `/plants`, `/recipes` |
| Sub-section | Lowercase, singular noun | Optional | `/documents/scans` |
| Resource | Lowercase, singular noun | Optional | `/documents/scans/{id}` |
| Resource ID | UUID, slug, or numeric ID | Conditional | `/documents/scans/uuid-here` |

### Route Rules

| Rule | Rationale |
|---|---|
| Routes are lowercase | Case sensitivity causes bugs |
| Routes use hyphens, not underscores | Standard URL convention |
| Routes are nouns, not verbs | Resources, not actions |
| Routes are singular by default (`/document`, not `/documents`) | Consistent with REST convention |
| Route nesting is at most 3 levels deep (`/section/subsection/resource`) | Deep nesting creates fragile URLs |
| Query parameters are used for filters, not navigation state | URL readability |
| Fragment identifiers (`#section`) are for on-page anchors only | Proper fragment usage |

### Reserved Routes

| Route | Purpose |
|---|---|
| `/settings` | Application settings |
| `/search` | Search interface |
| `/help` | Help and documentation |
| `/about` | Application information |

---

## 7. Deep Links

### Universal Requirements

Every navigable screen in a Kovina application is reachable via a deep link.

| Rule | Rationale |
|---|---|
| Every screen has a stable, unique route | Direct linking and sharing |
| Deep links work from cold start — no session required | Reliable app-to-app navigation |
| Deep links respect authentication — unauthenticated users are redirected, not blocked | Secure but graceful |
| Deep link parameters are validated — malformed links show a friendly error, not a crash | Robust error handling |
| Deep links are registered with the platform | OS-level deep linking |

### Platform Registration

| Platform | Mechanism |
|---|---|
| Web | Standard URL routing with `pushState` |
| iOS | Universal Links (associated domains) |
| Android | App Links (verified links in manifest) |
| Windows | Protocol activation URI handling |
| macOS | URL scheme registration in Info.plist |

### Fallback Behavior

When a deep link targets content that no longer exists:

| Rule | Rationale |
|---|---|
| Show a "Content not found" screen, not a crash or blank page | Graceful degradation |
| Offer navigation to related content where possible | Redirection, not abandonment |
| Log the broken link for analysis (no user-identifying data) | Continuous improvement |

---

## 8. Back Behavior

### Standard Rules

| Rule | Rationale |
|---|---|
| Back returns to the previous screen preserving its full state | No data loss, no scroll reset |
| Back dismisses modals and sheets | Standard behavior |
| Back does not reset form input — warn before navigating back with unsaved changes | Preventing data loss |
| Back stack is cleared on navigation to a primary destination | Fresh context per section |

### Platform-Specific

| Platform | Behavior |
|---|---|
| Web | Browser history API — `window.history.back()` |
| iOS | UINavigationController pop — system swipe-back gesture always enabled |
| Android | System back button pops the back stack — never override default behavior |
| Windows | App-level back button or breadcrumb navigation |
| macOS | App-level back via toolbar, sidebar, or "Go" menu |

### Prohibited Back Patterns

- **Infinite back loops** — back must eventually reach a primary destination.
- **Back that logs the user out** — back is navigation, not session termination.
- **Back that opens a different app** — only the user can switch apps.
- **Back that resets the navigation stack** — preserve history.
- **Double-tap to exit on primary screen without confirmation** — warn before accidental exit.

---

## 9. Navigation State Persistence

### What Persists

| Element | Persistence Scope |
|---|---|
| Active primary section | App-wide — survives restart |
| Scroll position within a section | Session-wide — survives navigation away and back |
| Tab selection within a section | Session-wide |
| Modal stack | Not persisted — modals are dismissed on app exit |
| Form input state | Session-wide — warn on back navigation |
| Search query and results | Session-wide |
| Expanded/collapsed sidebar state | App-wide — survives restart |

### Persistence Rules

| Rule | Rationale |
|---|---|
| Navigation state is persisted to local storage or equivalent | Survives app restart |
| Persisted state is per-user, not per-device | User-specific navigation context |
| Persisted state excludes sensitive data from navigation parameters | No credential exposure in stored URLs |
| Navigation state is cleared on logout | Complete session separation |

---

## 10. Search Placement

| Rule | Rationale |
|---|---|
| Search is accessible from every primary section | Universal access point |
| Search lives in the header or top navigation bar on all platforms | Standard, found location |
| Search is a dedicated page or view at `/search` | Direct URL access |
| On mobile, search may be a dedicated tab or a header icon expanding to a search field | Space-efficient |
| On desktop, a persistent search field in the header is standard | Convenience |
| Search results are displayed in a dedicated results view, not inline | Clear result context |
| Search scope may be filtered to the current section | Progressive narrowing |

---

## 11. Settings Placement

| Rule | Rationale |
|---|---|
| Settings is accessible from every primary section | Always reachable |
| Settings lives in the overflow menu, navigation footer, or at routes `/settings` | Standard location |
| On mobile with bottom navigation, settings may be the last tab | Common pattern |
| On desktop, settings is typically in the sidebar footer or app-level menu | Standard location |
| Settings is a separate concern — never hidden inside a feature | Always findable |
| Per-section preferences live within that section's sub-navigation | Contextual settings |
| App-wide preferences live in the global settings section | Centralized management |

---

## 12. Overflow & Contextual Navigation

### When to Use Overflow

| Scenario | Pattern |
|---|---|
| More than 5 primary destinations | Use overflow menu as a "More" tab (mobile) or collapsible group (desktop) |
| Infrequent but necessary destinations | Overflow destinations. Logged in the overflow menu, not in primary nav. |
| Account / profile actions | Overflow menu or header icon |

### Rules

| Rule | Rationale |
|---|---|
| Overflow menu is the last item in the navigation | Standard placement |
| Overflow menu reveals all items on tap/click, not on hover (mobile) | Predictable interaction |
| Overflow items may include an icon + label | Consistent with navigation component rules |
| Contextual navigation never overrides primary navigation | It supplements, not shadows |

---

## 13. Responsive Navigation Adaptation

### Mobile (Compact Width)

| Element | Behavior |
|---|---|
| Primary navigation | Bottom tab bar (3–5 items) |
| Secondary navigation | Inline tabs, horizontally scrollable if needed |
| Tertiary navigation | Back button in header, no breadcrumbs |
| Sidebar content | Slides in as an overlay panel on demand |
| Search | Icon that expands to full-width field |

### Tablet (Medium Width)

| Element | Behavior |
|---|---|
| Primary navigation | Bottom tab bar (portrait) or navigation rail (landscape) |
| Secondary navigation | Sidebar or inline tabs |
| Tertiary navigation | Breadcrumbs or back button |
| Sidebar | Persistent if space allows, collapsible on narrower viewports |
| Search | Persistent field in header |

### Desktop (Expanded Width)

| Element | Behavior |
|---|---|
| Primary navigation | Navigation rail or sidebar, always visible |
| Secondary navigation | Sidebar or inline tabs |
| Tertiary navigation | Breadcrumbs |
| Sidebar | Persistent, collapsible |
| Search | Persistent field in header |

### Breakpoints

Navigation adaptation follows the same breakpoint system defined in [PRODUCT_ARCHITECTURE_PLAYBOOK.md](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md). Navigation components transition between modes at these breakpoints, not at arbitrary widths.

---

## 14. PWA Navigation

### PWA Navigation Rules

| Rule | Rationale |
|---|---|
| PWA navigation follows the web navigation principles (§5.5) by default | Web is the base platform |
| PWA navigates via browser history API | Standard web navigation |
| Service worker intercepts navigation requests for offline-capable routes | Offline resilience |
| PWA supports deep links via standard URL routing | Shareability |
| Navigation transitions do not rely on OS-native animations | PWA can't match native transitions — don't fake them |
| PWA install banner does not hijack navigation | Subtle promotion, not interruption |

### Android PWA vs iPhone PWA

| Aspect | Android PWA | iPhone PWA |
|---|---|---|
| Navigation pattern | Bottom navigation via CSS/JS in the web app | Bottom navigation via CSS/JS in the web app |
| Status bar | Theme-color meta tag controls status bar color | apple-mobile-web-app-status-bar-style controls status bar |
| Swipe gestures | Standard Android swipe-back via Chrome | iPhone adds system swipe-back from left edge (cannot be disabled) |
| Address bar visibility | Not visible when installed | Not visible when installed |
| Navigation UI | Chrome provides minimal chrome (pull-to-refresh, etc.) | Safari provides minimal chrome (pull-to-refresh) |
| Deep links | Android Verified Links | No universal link support for standalone PWA |
| Share target | Web Share Target API available | Limited |
| Keyboard shortcuts | Not available in standalone mode | Not available in standalone mode |

### PWA Navigation Adaptation

| Element | PWA Behavior |
|---|---|
| Back gesture | Web history back or system gesture — app must handle via history API |
| Navigation state | Persisted via IndexedDB or localStorage |
| URL bar | Hidden in standalone mode — app provides its own navigation chrome |
| Tab management | PWA has no tabs — handle multi-view within the app |
| Offline navigation | Service worker serves cached navigation shell + routes |

---

## 15. Command Palette

### When to Implement

| Scenario | Requirement |
|---|---|
| Desktop app with 10+ navigable screens | Implement command palette |
| Web app with 8+ navigable routes | Recommended |
| Mobile app | Optional — typically not needed |
| Simple app (≤ 5 screens) | Not required |

### Behavior

| Rule | Rationale |
|---|---|
| Triggered by Ctrl+K (Windows/Linux) or Cmd+K (macOS) | Universal convention |
| Opened from the active app — not the OS | App-scoped |
| Searches across routes, sections, and recent items | Comprehensive |
| Results are categorized (Pages, Actions, Recent) | Quick scanning |
| Results update as the user types (debounced, ≤ 150ms) | Responsive feel |
| Keyboard navigable — arrow keys + Enter to select, Escape to dismiss | No mouse needed |
| Dismissing preserves the current navigation state | No side effects |
| Available but discoverable — a subtle placeholder in the header hints at its presence | Discoverability without clutter |

### Prohibited Command Palette Patterns

- Command palette that hijacks standard system shortcuts (Ctrl+K is already reserved in many IDEs — check platform conventions).
- Command palette that performs actions without confirmation (navigates or executes only on explicit selection).
- Command palette that logs keystrokes or sends query data to a remote server.
- Command palette with advertisements or promoted content.

---

## 16. Accessibility Requirements

Navigation accessibility requirements are defined in [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md). This section identifies navigation-specific accessibility rules.

| Rule | Rationale |
|---|---|
| All navigation elements are keyboard reachable in tab order | Keyboard-only users must navigate |
| Skip-to-content link is present (web) | Bypass repeated navigation |
| Current page/section is announced by screen readers | `aria-current="page"` or platform equivalent |
| Navigation labels are descriptive, not generic | "Documents" not "Section 1" |
| Navigation role is correctly identified (`role="navigation"`, `aria-label`) | Screen reader orientation |
| Tab order follows visual order — left to right, top to bottom | Predictable focus flow |
| Bottom navigation items are not focusable when overflow is present | Only visible items receive focus |
| Navigation state changes are announced | Dynamic content notification |
| Command palette is accessible via keyboard | Power users who cannot use a mouse |
| Navigation regions persist across pages | Consistent landmark identification |

---

## 17. Prohibited Navigation Patterns

| Pattern | Why It Is Prohibited |
|---|---|
| **Hamburger menu as primary mobile navigation** | Discoverability is poor — studies show reduced engagement with hamburger-only navigation |
| **Infinite scroll as primary navigation** | No footer, no orientation, no ability to reach the bottom |
| **Navigation that changes order dynamically** | Muscle memory breaks — user cannot predict where an item will be |
| **Tab bar with more than 5 items** | Cognitive overload, touch target compression |
| **Double-tap to exit on primary screen without confirmation** | Accidental app exit |
| **Navigation that resets on every app launch** | User must rebuild mental context each session |
| **Back that performs an action instead of navigating** | Back must be navigation, not a "cancel" or "undo" |
| **Gesture-only navigation without visible controls** | Non-obvious, non-discoverable |
| **Navigation that depends on internet connectivity** | Core navigation must work offline — only content is network-dependent |
| **Scrolljacking navigation (custom scroll behavior that differs from platform)** | Breaks user expectation, accessibility, and scroll-based assistive tech |
| **Navigation that traps the user in a modal stack** | Every screen must have a way out |
| **Pop-up ads or promotional content in navigation** | Trust-eroding, anti-user |
| **Carousel-based primary navigation** | Horrible discoverability, motion sickness, no persistence |

---

## 18. QA Checklist

- [ ] Every screen has a unique, determinable location in the navigation hierarchy.
- [ ] Primary navigation is always accessible from any screen.
- [ ] No screen is a dead end — every screen has a way forward and a way back.
- [ ] Back returns to the previous screen preserving its state (scroll position, input, tab selection).
- [ ] Bottom navigation has 3–5 items maximum.
- [ ] Navigation is fully keyboard accessible (all items reachable and operable).
- [ ] Current location is visually distinct in navigation components.
- [ ] Deep links work from cold start for every navigable screen.
- [ ] Navigation state persists across app restart (active section, sidebar state).
- [ ] Command palette (if implemented) is triggered by Ctrl+K/Cmd+K and is fully keyboard navigable.
- [ ] Breadcrumbs (if present) show the complete path from primary section to current page.
- [ ] Navigation does not change order dynamically.
- [ ] Navigation works entirely offline — only content requires connectivity.
- [ ] No hamburger menu as primary navigation on native mobile apps.
- [ ] No infinite scroll as primary navigation.
- [ ] No gesture-only navigation without visible controls.
- [ ] Screen reader announces current location on every navigation change.
- [ ] PWA navigation works with standard web history API — no framework hijacking.
- [ ] Navigation transitions meet the animation constraints in ACCESSIBILITY_STANDARD.md.
- [ ] Overflow menu (if present) is the last item in the navigation.

---

## 19. Agent Checklist

Before an AI agent declares navigation work complete:

### Architecture

- [ ] Three-tier navigation model is implemented: primary, secondary, tertiary.
- [ ] Route naming follows the `/{section}[/{subsection}][/{resource}]` convention.
- [ ] Reserved routes (`/settings`, `/search`, `/help`, `/about`) are used for their intended purposes.
- [ ] Navigation hierarchy is stable — items do not reorder dynamically.
- [ ] Every screen is reachable via deep link.

### Components

- [ ] Bottom navigation has 3–5 items, icons + labels, active state visible.
- [ ] Tab bar has 2–5 tabs, horizontally scrollable on mobile if needed.
- [ ] Navigation rail is expandable/collapsible and fixed to the left edge.
- [ ] Breadcrumbs (if used) show the complete path with the current page as the last non-clickable segment.
- [ ] Back behavior preserves previous screen state.

### Platform

- [ ] iOS: UINavigationController stack pattern, swipe-back enabled, no hamburger menu.
- [ ] Android: Bottom navigation or rail, system back navigates the stack, never override default back.
- [ ] Windows: Rail/sidebar, breadcrumbs or app back button, keyboard shortcuts documented.
- [ ] macOS: Sidebar, toolbar items, menu bar follows standard Apple convention.
- [ ] Web: Header nav bar, mobile hamburger only on web, browser history API for routing.

### Persistence

- [ ] Active section persists across app restart.
- [ ] Scroll position is preserved when navigating back.
- [ ] Tab selection persists within a session.
- [ ] All persisted state is per-user and cleared on logout.

### Deep Links

- [ ] Every navigable screen has a stable, unique route.
- [ ] Deep links work from cold start.
- [ ] Broken deep links show a friendly error — not a crash.

### Accessibility

- [ ] All navigation elements are keyboard-reachable.
- [ ] Skip-to-content link is present (web).
- [ ] `aria-current="page"` (or equivalent) is set on the active item.
- [ ] Navigation labels are descriptive.
- [ ] Tab order follows visual order.

### Prohibited Patterns

- [ ] No hamburger menu as primary mobile navigation.
- [ ] No infinite scroll as primary navigation.
- [ ] No navigation that resets on app launch.
- [ ] No gesture-only navigation.
- [ ] No navigation that depends on internet connectivity.
- [ ] No navigation with more than 5 bottom tabs.

---

*This standard defines the canonical navigation architecture for all Kovina projects. Platform-specific standards reference this document instead of defining their own navigation rules. Companion to [DESIGN_PLAYBOOK.md](../foundational/DESIGN_PLAYBOOK.md) (visual rendering), [ACCESSIBILITY_STANDARD.md](../shared/ACCESSIBILITY_STANDARD.md) (keyboard and screen reader navigation), [PRODUCT_ARCHITECTURE_PLAYBOOK.md](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) (layout architecture), and [PWA_STANDARD.md](../platforms/PWA_STANDARD.md) (PWA-specific considerations).*
