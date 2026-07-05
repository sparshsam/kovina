# macOS App Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.0.0](VERSION.md)
>
> Defines mandatory requirements for every Kovina Open project that ships a macOS application.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Packaging](#2-packaging)
3. [Store Submission](#3-store-submission)
4. [Icons & Assets](#4-icons--assets)
5. [Menu Bar](#5-menu-bar)
6. [Window Management](#6-window-management)
7. [System Integration](#7-system-integration)
8. [Sandboxing & Security](#8-sandboxing--security)
9. [Accessibility](#9-accessibility)
10. [Build Requirements](#10-build-requirements)
11. [QA Checklist](#11-qa-checklist)
12. [Agent Checklist](#12-agent-checklist)

---

## 1. Philosophy

A Kovina macOS app is a native citizen of the platform. It uses the menu bar, supports window management (resize, zoom, tabbing, full-screen), integrates with the Dock, Finder, and system services, and respects the user's system appearance, accent color, and accessibility settings.

The app does not imitate iOS on the desktop. macOS has its own interaction patterns — multi-window support, menu-based actions, right-click context menus, drag-and-drop, keyboard-driven navigation — and every Kovina macOS app embraces them rather than papering over them with web-like or mobile-like patterns.

---

## 2. Packaging

### Distribution Format

| Format | Requirement | Use Case |
|---|---|---|
| App bundle (.app) | **Required** | Distribution — App Store or direct download |
| DMG | Optional | Direct download distribution (signed and notarized) |
| PKG | Optional | Enterprise deployment with custom install location |
| ZIP | Optional | Compressed app bundle for direct download |

### App Bundle Requirements

- The app bundle must be signed with a valid Apple Developer ID certificate (direct distribution) or Mac App Store distribution certificate.
- The app bundle must be notarized by Apple (direct distribution outside the App Store).
- The bundle must include only one `.app` wrapper.
- Resource forks and extended attributes must be cleaned before distribution.

### Code Signing & Notarization

- Development signing for local testing.
- Developer ID signing for direct distribution (outside App Store).
- Mac App Store signing for App Store distribution.
- Notarization is required for all distributions outside the Mac App Store.
- Notarization must pass without warnings that affect execution.

### Bundle Identity

| Field | Value |
|---|---|
| Bundle identifier | `org.kovina.{app_slug}` (e.g. `org.kovina.openreader`) |
| Version | Semantic version (e.g. `1.2.3`) |
| Build number | Monotonically increasing integer (`CFBundleVersion`). |
| App name | `{Full Application Name}` (e.g. `OpenReader`) |
| Copyright | `Copyright © {year} Kovina. All rights reserved.` |

---

## 3. Store Submission

### Mac App Store Requirements

| Requirement | Standard |
|---|---|
| Developer account | Apple Developer Program membership. |
| App Store Connect | Mac app record created with complete metadata. |
| Pricing | Free. No in-app purchases. No ads. |
| Age rating | Must complete the App Store age rating questionnaire. |
| Privacy policy | Must link to a valid, publicly accessible privacy policy. |
| Sandboxing | Required for Mac App Store distribution. |
| Entitlements | Must declare only the entitlements the app actually uses. |

### Direct Distribution (Outside App Store)

| Requirement | Standard |
|---|---|
| Notarization | Required. The app must pass Apple's notarization process. |
| Developer ID | Valid Developer ID Application certificate. |
| Gatekeeper | The app must be Gatekeeper-compatible (signed, notarized, no quarantine attributes). |
| Update mechanism | Sparkle framework or equivalent for self-updating. Mandatory for direct distribution. |

### Store Listing Assets

All store listing assets (icons, screenshots, previews) and text fields (name, subtitle, description, what's new, keywords) are defined in the [Store Listing Standard](../shared/STORE_LISTING_STANDARD.md#14-platform-specific-asset-tables). That document is the canonical reference — this section does not duplicate it.

macOS-specific submission notes:
- Screenshots must be 1920×1080 or 1280×800 (at least 3 for direct distribution, at least 4 for Mac App Store).
- An optional promo video (MOV/M4V) is allowed.

---

## 4. Icons & Assets

All cross-platform icon generation requirements (source file, sizes, formats) are defined in the [App Icon Standard](../shared/APP_ICON_STANDARD.md). That document is the canonical reference — this section covers only macOS-specific requirements.

### Icon Set (.iconset)

The full table of all required `.iconset` sizes (16×16 through 512×512 @1× and @2×) is defined in [App Icon Standard — macOS §9](../shared/APP_ICON_STANDARD.md#9-macos-application-icons). That table is the source of truth.

The `.iconset` directory must be converted to `.icns` with the `iconutil` command-line tool:

```bash
iconutil -c icns AppIcon.iconset -o AppIcon.icns
```

### Additional Assets

| Asset | Context |
|---|---|
| Dock icon | The `.icns` file — the canonical app icon. |
| Menu bar icon (if menu-bar app) | 16×16 template image (black on transparent, no hardcoded color — macOS applies menu bar styling automatically). |
| Toolbar icon | 32×32 template images for toolbar items. |

### File Layout

```
Assets.xcassets/
  AppIcon.iconset/
    icon_16x16.png
    icon_16x16@2x.png
    ...
  AppIcon.icns              (compiled from the iconset)
```

---

## 5. Menu Bar

### Required Menu Structure

Every Kovina macOS app must have the following menu items:

```
{App Name}
  ├── About {App Name}
  ├─────────────
  ├── Preferences… / Settings…    (⌘,)
  ├─────────────
  ├── Services
  ├── Hide {App Name}              (⌘H)
  ├── Hide Others                  (⌥⌘H)
  ├── Show All
  ├─────────────
  └── Quit {App Name}              (⌘Q)

File (if applicable)
  ├── New                          (⌘N)
  ├── Open…                        (⌘O)
  ├── Close                        (⌘W)
  └── Save                         (⌘S)

Edit
  ├── Undo                         (⌘Z)
  ├── Redo                         (⌘⇧Z)
  ├─────────────
  ├── Cut                          (⌘X)
  ├── Copy                         (⌘C)
  ├── Paste                        (⌘V)
  ├── Select All                   (⌘A)

View (if applicable)
  ├── Toggle Toolbar
  ├── Enter Full Screen            (⌃⌘F)

Window
  ├── Minimize                     (⌘M)
  ├── Zoom
  ├─────────────
  ├── Bring All to Front
  └── {Open Windows}

Help
  └── {App Name} Help
```

### Menu Rules

- The app menu must always include About, Preferences/Settings, Hide, and Quit.
- The Edit menu with Undo/Redo, Cut/Copy/Paste must exist.
- Keyboard shortcuts must use standard macOS modifier keys (⌘, ⌥, ⌃, ⇧).
- Menu items must have appropriate tooltips (status bar text).
- Third-party menu bar extras (icons in the menu bar) must be templatable images.
- Dynamic menu items (recent files, open windows) must be kept up to date.

---

## 6. Window Management

### Window Fundamentals

| Element | Standard |
|---|---|
| Default size | 1200×800 (or appropriate for the application's content) |
| Minimum size | 800×600 minimum |
| Resizable | Yes, unless the product metaphor justifies a fixed size |
| Title bar | System default title bar with traffic light controls (red/yellow/green) |

### Traffic Light Controls

- Close (red): closes the window. The app should confirm if there is unsaved work.
- Minimize (yellow): minimizes to the Dock.
- Zoom (green): toggles between the user's preferred size and a content-fitting size.

### Window Types

| Window Type | Usage |
|---|---|
| Standard window | Default for document-based and utility apps |
| Panel (floating) | For tool palettes, inspectors, and auxiliary windows. Floats above standard windows. |
| Preferences window | Modal window for settings (`.preferencePanel` style) |
| Full-screen | Supported for immersive applications (readers, media, games) |

### Window Behavior

- Window position must be persisted between sessions.
- Window size must be persisted between sessions.
- Multi-window applications must support the Window menu with Bring All to Front.
- Document-based apps must support tabbed windows (when enabled by the user in System Settings).
- Full-screen must work with the standard green button or ⌃⌘F.
- Split View must be supported on macOS 10.15+ for document-based apps.

### Title Bar

- Use the system title bar with standard traffic light controls.
- If a unified title bar + toolbar is used, it must follow Human Interface Guidelines.
- Custom title bars (no system title bar) are permitted only for immersive full-screen applications (media players, creative tools, reading apps) and must provide standard window controls in an accessible location.

---

## 7. System Integration

### Dock

- The app icon in the Dock must use the `.icns` file.
- The Dock icon should reflect the application state where relevant (badge, progress indicator).
- The Dock menu (right-click on Dock icon) may include recent files and common actions.
- The app must quit cleanly when "Quit" is selected from the Dock menu.

### Finder Integration

- If the app opens file types, it must register those types in `Info.plist` under `CFBundleDocumentTypes`.
- Double-clicking a registered file in Finder must open the app (or bring it to front if already running).
- Quick Look generation is recommended for document-based apps (`QLThumbnailGenerator`, Quick Look preview).
- The app may appear in the Share menu if it receives content from other apps.

### Notifications

- Notifications must use the UserNotifications framework (macOS 10.14+).
- Notifications must respect the system Do Not Disturb / Focus mode.
- Clicking a notification should open the relevant window or bring the app to front.

### Auto-Start (Login Items)

- Auto-start on login requires the `SMAppService` or `SMLoginItemSetEnabled` API.
- Auto-start must be opt-in and configurable from Settings.
- The user must be informed why the app needs to start at login.

### Update Mechanism

| Distribution Channel | Requirement |
|---|---|
| Mac App Store | Automatic updates via the App Store update mechanism |
| Direct distribution | Sparkle framework (or equivalent). Updates must be signed and notarized. |

- Update checks must be user-initiated or periodic (daily, weekly — not more frequently).
- Beta update channels are optional and must be opt-in.

---

## 8. Sandboxing & Security

### Mac App Store (Sandbox Required)

| Entitlement | Use |
|---|---|
| `com.apple.security.app-sandbox` | Required for App Store distribution. |
| `com.apple.security.files.user-selected.*` | User-selected file read/write access. |
| `com.apple.security.network.client` | Outbound network access (if required). |
| `com.apple.security.network.server` | Inbound network access (if required — rarely for Kovina apps). |

- Only declare entitlements the app actually uses.
- Each entitlement must be justified in the project documentation.
- Temporary entitlement exceptions require justification in the App Store review notes.

### Direct Distribution (Sandbox Optional)

- Sandboxing is optional but recommended for security.
- If not sandboxed, the app must still follow macOS security best practices:
  - Hardened Runtime enabled.
  - Library validation enabled.
  - Exception entitlements documented and minimized.
  - No arbitrary code execution (disable `com.apple.security.cs.disable-library-validation` and `com.apple.security.cs.allow-unsigned-executable-memory` unless absolutely necessary).

### Hardened Runtime

| Capability | Requirement |
|---|---|
| Hardened Runtime | Required for all distributions (App Store and direct). |
| Library validation | Enabled. |
| Executable memory | Only if required by the runtime environment (JIT, browser engine, game engine). |

### Privacy

- Camera, microphone, and accessibility permissions must follow the same rules as [iOS](../platforms/IOS_APP_STANDARD.md#6-permissions) — never request what the app does not use.
- File system access must use scoped bookmarks and security-scoped URLs where the user has explicitly granted access.
- The app must respond correctly to permission denials.

---

## 9. Accessibility

All cross-platform accessibility requirements are defined in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md). That document is the canonical reference — this section covers only macOS-specific additions.

| Requirement | Standard |
|---|---|
| VoiceOver | All interactive elements must have `accessibilityLabel`, `accessibilityRole`, and `accessibilityEnabled`. Custom views implement `NSAccessibility` protocol. |
| Keyboard navigation | All features reachable via Tab with Full Keyboard Access enabled. |
| Dynamic Type | Text must respect system font size settings. |
| Touch alternatives | All drag-and-drop operations must have a keyboard-based alternative. |
| System settings | `accessibilityDisplayShouldReduceMotion`, `accessibilityDisplayShouldIncreaseContrast`, `accessibilityDisplayShouldDifferentiateWithoutColor` — all must be respected. |
| Focus ring | Visible on all keyboard-navigable elements. |
| Preference application | Accessibility preferences must be respected immediately without requiring a restart. |

Every rule in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md) applies.

---

## 10. Build Requirements

| Requirement | Standard |
|---|---|
| Language | Swift preferred. AppKit for standard macOS apps. SwiftUI for newer apps (with AppKit integration where needed). |
| Minimum Xcode version | Latest stable at time of development. |
| Minimum macOS version | macOS 14 Sonoma or 13 Ventura (see note below). |
| Architecture | arm64 (Apple Silicon) required. x86_64 recommended for Intel compatibility. Universal binary (arm64 + x86_64) strongly preferred. |
| Size | App bundle under 100MB. DMG under 120MB. |

### Minimum macOS Version

| Version | Status |
|---|---|
| macOS 14 Sonoma | Recommended minimum for new development. |
| macOS 13 Ventura | Acceptable minimum if broader compatibility is needed. |
| macOS 12 Monterey | Requires ecosystem review. Must justify with user demographics. |
| macOS 11 or earlier | Not permitted for new Kovina applications. |

### Universal Binary

- Universal binaries (arm64 + x86_64) are strongly preferred for all new macOS applications.
- Apple Silicon–only builds are acceptable if the app uses Apple Silicon–specific APIs extensively.
- Intel-only builds are not permitted for new Kovina applications.

### Build Automation

- Xcode build system or command-line `xcodebuild`.
- Fastlane recommended for notarization and deployment automation.
- CI must build and sign the app on every release branch push.
- Build artifacts must be reproducible from clean CI environments.

---

## 11. QA Checklist

Before shipping a macOS app release:

- [ ] App builds and archives without errors.
- [ ] App launches on macOS minimum supported version (fresh install).
- [ ] App launches on latest macOS version (fresh install).
- [ ] App launches on Apple Silicon and Intel (if universal binary).
- [ ] App icon appears correctly in the Dock.
- [ ] App icon appears correctly in Finder and About panel.
- [ ] All menu bar items are present with correct keyboard shortcuts.
- [ ] About panel displays correct version and copyright.
- [ ] Preferences / Settings window opens and functions correctly.
- [ ] Window resizes and respects minimum size.
- [ ] Window position is persisted between launches.
- [ ] Traffic light controls work (close, minimize, zoom).
- [ ] Full-screen mode works.
- [ ] Drag-and-drop from Finder opens files correctly (if applicable).
- [ ] File type associations work (double-click in Finder).
- [ ] Notarization passes without errors.
- [ ] Gatekeeper does not block the app.
- [ ] Sandbox entitlements are correct (if sandboxed).
- [ ] Hardened Runtime is enabled.
- [ ] VoiceOver reads all interactive controls.
- [ ] Full Keyboard Access navigates all features.
- [ ] Reduce motion setting is respected.
- [ ] Increase contrast setting is respected.
- [ ] Light and dark mode render correctly.
- [ ] System accent color is respected where appropriate.
- [ ] Window tabbing works (if document-based).
- [ ] Dock menu shows correct items.
- [ ] Quit from Dock icon works cleanly.
- [ ] Memory usage is within expected bounds.
- [ ] No excessive CPU usage when idle.
- [ ] Update mechanism works (Sparkle or App Store).
- [ ] Privacy policy URL is valid and linked in the app.
- [ ] Version and build numbers are incremented correctly.

---

## 12. Agent Checklist

Before an AI agent declares macOS app work complete:

### Build & Packaging

- [ ] Bundle identifier follows `org.kovina.{app_slug}`.
- [ ] Minimum macOS version is 14 or 13 (or justified exception).
- [ ] Universal binary is built (arm64 + x86_64) or justified as Apple Silicon–only.
- [ ] Code signing is valid (Developer ID or Mac App Store).
- [ ] Notarization passes (for direct distribution).
- [ ] Hardened Runtime is enabled.
- [ ] Version and build numbers are incremented.

### Icons & Assets

- [ ] `.iconset` is complete with all 10 size variants.
- [ ] `.icns` is generated with `iconutil`.
- [ ] App icon is recognizable at 16×16 and 512×512.
- [ ] Menu bar icon (if applicable) is a 16×16 template image.

### Menu Bar

- [ ] Standard app menu is present (About, Preferences, Hide, Quit).
- [ ] File menu (if applicable) with standard shortcuts.
- [ ] Edit menu with Undo/Redo and Cut/Copy/Paste.
- [ ] Window menu with Minimize, Zoom, Bring All to Front.
- [ ] All keyboard shortcuts use standard macOS modifier keys.
- [ ] Dynamic menu items are populated correctly.

### Window Management

- [ ] Default window size is appropriate for the content.
- [ ] Minimum window size is enforced (800×600 or larger).
- [ ] Traffic light controls work correctly.
- [ ] Window position and size persist between sessions.
- [ ] Full-screen mode works.

### System Integration

- [ ] Dock icon displays correctly.
- [ ] File types are registered in Info.plist (if applicable).
- [ ] Double-clicking a registered file opens the app.
- [ ] Notification handling works correctly.

### Accessibility

- [ ] VoiceOver reads all interactive controls.
- [ ] Full Keyboard Access navigates all features.
- [ ] Reduce motion and increase contrast settings are respected.
- [ ] Color is never the sole means of conveying information.
- [ ] Focus ring is visible on all keyboard-navigable elements.

### Security

- [ ] Sandbox entitlements are declared (App Store) or justified.
- [ ] Hardened Runtime is enabled.
- [ ] Library validation is enabled.
- [ ] Privacy permissions are declared correctly.
- [ ] No unnecessary entitlements are requested.

---

*This standard applies to every Kovina macOS application. Companion to the [Design Playbook](../foundational/DESIGN_PLAYBOOK.md) and [Architecture Playbook](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) for shared design and architecture requirements.*
