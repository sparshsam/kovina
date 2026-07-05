# Windows App Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.0.0](VERSION.md)
>
> Defines mandatory requirements for every Kovina Open project that ships a Windows desktop application.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Packaging](#2-packaging)
3. [Store Submission](#3-store-submission)
4. [Icons & Assets](#4-icons--assets)
5. [Title Bar & Window](#5-title-bar--window)
6. [System Integration](#6-system-integration)
7. [Input & Interaction](#7-input--interaction)
8. [Accessibility](#8-accessibility)
9. [Build Requirements](#9-build-requirements)
10. [QA Checklist](#10-qa-checklist)
11. [Agent Checklist](#11-agent-checklist)

---

## 1. Philosophy

A Kovina Windows app is a first-class citizen of the operating system — installable, uninstallable, taskbar-pinnable, and integrated into Windows shell conventions. It must feel native in window management, input handling, and system behavior, not like a web page running in a desktop frame.

The app respects the user's system preferences (theme, font scaling, contrast), observes Windows 11 design idioms where they exist, and falls back gracefully on Windows 10. It does not introduce custom window chrome unless the product metaphor justifies it.

---

## 2. Packaging

### Distribution Format

| Format | Requirement | Use Case |
|---|---|---|
| MSIX | **Required** | Microsoft Store distribution. Primary package format. |
| MSI/EXE | Optional | Sideloading, enterprise deployment, direct download. |
| Portable | Optional | Single-file executable, no install required. |

### MSIX Requirements

- The package must be signed with a valid code signing certificate.
- The package must declare all capabilities it uses.
- The package must specify minimum and maximum Windows versions.
- The package identity must match the Microsoft Store listing identity.
- The package display name must match the application name exactly.

### Package Identity

| Field | Value |
|---|---|
| Package name | `Kovina.{AppName}` |
| Display name | `{Full Application Name}` (e.g. "OpenReader") |
| Publisher | `CN=Kovina, O=Kovina, L=Toronto, C=CA` |
| Version | Matches application version (semantic). |

---

## 3. Store Submission

### Microsoft Store Requirements

| Requirement | Standard |
|---|---|
| Account | Developer account enrolled in Microsoft Partner Center. |
| Age rating | Must complete the IARC rating questionnaire. |
| Pricing | Free. No in-app purchases. No ads. |
| Category | Must match the application's primary function. |
| Testing notes | Must include notes for certification testers if the app requires specific setup. |
| Privacy policy URL | Must link to a valid privacy policy. |

### Store Listing Assets

All store listing assets (icons, tiles, screenshots, splash screen, store logo) and text fields (name, description, what's new) are defined in the [Store Listing Standard](../shared/STORE_LISTING_STANDARD.md#14-platform-specific-asset-tables). That document is the canonical reference — this section does not duplicate it.

Windows-specific asset notes:
- Screenshots must be 1920×1080 minimum (desktop) or 1240×2480 (phone form factor, if supported).
- The app tile icon (44×44) is used for the taskbar and Start menu.

---

## 4. Icons & Assets

Application icon generation (source file, sizes, formats) is defined in the [App Icon Standard](../shared/APP_ICON_STANDARD.md). That document is the canonical reference — this section covers only Windows-specific requirements.

### Application Icon (ICO)

The `.ico` file packs all required sizes (16×16 through 256×256) into a single file for the Windows shell. See [App Icon Standard — Windows §6](../shared/APP_ICON_STANDARD.md#6-windows-application-icons) for the full size table.

- The `.ico` file is generated from the 1024×1024 canonical source.
- No transparency issues at 16×16 — the icon must have a solid backing at the smallest sizes.
- The icon must render correctly on both light and dark taskbar backgrounds.

### Microsoft Store Assets (MSIX Package)

All Microsoft Store icon tile sizes are defined in [App Icon Standard — Windows §6](../shared/APP_ICON_STANDARD.md#6-windows-application-icons). That table is the canonical reference. This section covers only the MSIX package declaration that references those assets.

### Windows App Icon (MSIX Package)

```xml
<Applications>
  <Application Id="App" Executable="$targetnametoken$.exe" Square150x150Logo="Assets\Square150x150Logo.png"
               Square44x44Logo="Assets\Square44x44Logo.png">
    <uap:VisualGroup>
      <uap:Square150x150Logo Background="transparent"/>
      <uap:Square44x44Logo Background="transparent"/>
    </uap:VisualGroup>
  </Application>
</Applications>
```

---

## 5. Title Bar & Window

### Window Frame

| Element | Standard |
|---|---|
| Default size | 1280×800 (or appropriate for the application) |
| Minimum size | 800×600 minimum |
| Resizable | Yes, unless the application's function justifies a fixed size |
| Maximizable | Yes |
| Title bar | System default; custom title bar only if product metaphor justifies it |

### Custom Title Bar

If a custom title bar is implemented:

- Draggable region must extend the full title bar width.
- System menu (Alt+Space) must be accessible.
- Snap layouts must work (Windows 11).
- Title bar must respect dark/light mode.
- Minimize, maximize, and close buttons must be in the standard right-side position (or left-side on RTL systems — see [LOCALIZATION_STANDARD.md](../shared/LOCALIZATION_STANDARD.md#14-right-to-left-rtl-support)).

### Window Persistence

- Window position, size, and state (normal/maximized) must be persisted between sessions.
- The window should restore to its previous monitor if still connected.
- Multi-monitor layouts must be respected.

---

## 6. System Integration

### Taskbar

- The app must appear in the taskbar with its correct icon.
- Right-click context menu (jump list) may include recent files or common actions.
- Pinning to taskbar must work without additional configuration.

### File Associations

- If the application opens file types, register as the default handler for those types.
- File type associations must be declared in the app manifest.
- On uninstall, file associations must be cleaned up.

### Notifications

- Notifications must use the Windows notification system (toast notifications).
- Notifications must include the app icon and name.
- Notifications must be actionable where appropriate.
- No custom notification overlays outside the system notification area.

### Auto-Start

- Auto-start on login is prohibited unless the application is a background service or system utility.
- If auto-start is implemented, it must be opt-in, configurable from settings, and clearly explained to the user.

### Installer

- The installer must install to `%LocalAppData%\Kovina\{AppName}\` (per-user) or `%ProgramFiles%\Kovina\{AppName}\` (machine-wide).
- The installer must add an entry in Start Menu under "Kovina".
- The installer must support silent installation (`/quiet` or equivalent) for enterprise deployment.
- The installer must not require administrator privileges unless machine-wide installation is selected.

---

## 7. Input & Interaction

### Mouse & Touch

| Input | Requirement |
|---|---|
| Mouse | All interactions work with left-click, right-click context menus where appropriate |
| Touch | Touch targets ≥ 44×44px. Scrolling works with touch. |
| Pen | Where applicable, pen input is supported (drawing, annotation, signature) |

### Keyboard

- All functionality must be reachable with keyboard alone.
- Standard shortcuts follow Windows conventions: Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+Shift+Z, Ctrl+S, Ctrl+P, Ctrl+F, F1 (help).
- Tab order follows visual order.
- Accelerator keys (Alt+letter) are recommended for navigation items.

### Input Language

- The application must handle input method editors (IMEs) correctly for East Asian languages.
- Text input must respect the system's input language and keyboard layout.
- Right-to-left (RTL) text input must be supported in text fields.

---

## 8. Accessibility

All cross-platform accessibility requirements are defined in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md). That document is the canonical reference — this section covers only Windows-specific additions.

| Requirement | Standard |
|---|---|
| Windows Narrator | Full support. All interactive elements have accessible names and roles via UI Automation. |
| High contrast | Application must be usable in all Windows high-contrast themes. |
| Text scaling | UI must respect system text scaling up to 200%. No text truncation. |
| Focus indicators | Visible focus rect on all interactive elements. System accent color respected. |
| Keyboard navigation | All features reachable via Tab, arrow keys, Enter, and Space. Accelerator keys (Alt+letter) recommended. |
| Automation | Custom controls must implement `IAccessible` / UI Automation patterns. |
| Verification | Pass Windows Accessibility Insights verification. |

Every rule in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md) applies.

---

## 9. Build Requirements

| Requirement | Standard |
|---|---|
| Framework | .NET 8+ (or equivalent native framework). WinUI 3 preferred for new development. |
| Architecture | x64 required. ARM64 recommended. x86 optional (for backward compatibility). |
| Minimum Windows version | Windows 10 22H2 (build 19045) minimum. |
| Single binary | Single executable preferred. Side-by-side DLLs documented. |
| Code signing | Authenticode signing with SHA-256. Timestamped. |
| Antivirus | No false positives on common antivirus engines (verify on VirusTotal). |
| Size | MSIX package under 200MB compressed. Under 500MB installed. |

---

## 10. QA Checklist

Before shipping a Windows app release:

- [ ] MSIX package builds without errors.
- [ ] Package installs and uninstalls cleanly on Windows 10 and Windows 11.
- [ ] Application launches without errors on first run.
- [ ] Window opens at the correct default size and position.
- [ ] Window is resizable and respects minimum size.
- [ ] Window position persists between sessions.
- [ ] Taskbar icon displays correctly in light and dark taskbar modes.
- [ ] App icon renders correctly at all sizes (16×16 through 256×256).
- [ ] Alt+Tab switcher shows correct icon and name.
- [ ] All standard keyboard shortcuts work.
- [ ] Touch scrolling, panning, and zoom work on touch devices.
- [ ] High-contrast themes are usable.
- [ ] Windows Narrator reads all interactive controls correctly.
- [ ] System text scaling to 200% does not break layout.
- [ ] Application works correctly with IME input.
- [ ] File associations register and unregister correctly (if applicable).
- [ ] No crashes in Windows App Certification Kit tests.
- [ ] Silent install and uninstall work (`/quiet`).
- [ ] Application does not request unnecessary permissions.
- [ ] Start Menu entry appears under "Kovina".
- [ ] Privacy policy URL is accessible.
- [ ] Version number is displayed in About or Settings.
- [ ] CHANGELOG.md "What's new" reflects the current version.

---

## 11. Agent Checklist

Before an AI agent declares Windows app work complete:

### Packaging & Distribution

- [ ] MSIX package is signed with a valid code signing certificate.
- [ ] Package identity matches the Store listing.
- [ ] Package version matches the application version.
- [ ] All required Store assets are generated at correct sizes.
- [ ] Store listing text is complete (name, description, what's new).

### Window & Shell Integration

- [ ] Window title displays the application name.
- [ ] Window defaults to 1280×800 (or appropriate size).
- [ ] Minimum window size is enforced (800×600 minimum).
- [ ] Window position and size are persisted between sessions.
- [ ] Custom title bar (if used) implements Snap Layouts and system menu.
- [ ] Taskbar icon is correct in both dark and light modes.
- [ ] Installer adds Start Menu entry under "Kovina".
- [ ] File associations are registered (if applicable).

### Input

- [ ] All features are keyboard-accessible.
- [ ] Standard Windows shortcuts work (Ctrl+C, Ctrl+V, etc.).
- [ ] Touch targets are ≥ 44×44px.
- [ ] IME input is handled correctly.
- [ ] Right-to-left text input is supported in text fields.

### Accessibility

- [ ] Narrator reads all interactive controls.
- [ ] High-contrast themes are tested and working.
- [ ] Text scaling to 200% does not break layout.
- [ ] Visible focus indicators on all interactive elements.
- [ ] Color is never the sole means of conveying information.
- [ ] `prefers-reduced-motion` is respected.

### Quality

- [ ] App Certification Kit tests pass.
- [ ] No crashes on launch, navigation, or common operations.
- [ ] Uninstall removes all application artifacts.
- [ ] Memory usage is within expected bounds.
- [ ] Application does not perform unnecessary background activity.

---

*This standard applies to every Kovina Windows application. Companion to the [Design Playbook](../foundational/DESIGN_PLAYBOOK.md) and [Architecture Playbook](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) for shared design and architecture requirements.*
