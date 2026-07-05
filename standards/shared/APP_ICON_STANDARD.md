# App Icon Standard

> Version 1.0 — July 2026
>
> Reference standard. Cross-platform icon specification for every Kovina Open project.
>
> Platform documents reference this standard rather than defining their own icon requirements.
> See: [WINDOWS_APP_STANDARD](.../platforms/WINDOWS_APP_STANDARD.md), [ANDROID_APP_STANDARD](.../platforms/ANDROID_APP_STANDARD.md),
> [IOS_APP_STANDARD](.../platforms/IOS_APP_STANDARD.md), [MAC_APP_STANDARD](.../platforms/MAC_APP_STANDARD.md),
> [PWA_STANDARD](.../platforms/PWA_STANDARD.md), [WEBSITE_STANDARD](.../platforms/WEBSITE_STANDARD.md).

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Canonical Source](#2-canonical-source)
3. [Design Rules](#3-design-rules)
4. [Favicon & Browser Icons](#4-favicon--browser-icons)
5. [PWA Application Icons](#5-pwa-application-icons)
6. [Windows Application Icons](#6-windows-application-icons)
7. [Android Application Icons](#7-android-application-icons)
8. [iOS Application Icons](#8-ios-application-icons)
9. [macOS Application Icons](#9-macos-application-icons)
10. [Splash & Launch Assets](#10-splash--launch-assets)
11. [Store Listings](#11-store-listings)
12. [Generation Pipeline](#12-generation-pipeline)
13. [QA Checklist](#13-qa-checklist)

---

## 1. Philosophy

Every Kovina application has a single icon. It is rendered across every platform the app ships on. The icon must be recognizable at every size — from 16×16 in a browser tab or menu bar to 1024×1024 on an app store listing. It must work on both light and dark backgrounds, on both traditional and adaptive icon systems, and across operating systems with vastly different rendering conventions.

The icon is not a logo. It is an application identifier. Icons should be **simple, filled shapes with minimal detail**, legible at small sizes and coherent at large ones. No text, no taglines, no fine detail that disappears below 48px.

---

## 2. Canonical Source

Every Kovina application icon begins from exactly one source file.

### Source Specification

| Property | Value |
|---|---|
| Format | PNG |
| Size | 1024×1024 pixels |
| Color space | sRGB |
| Bit depth | 32-bit (8 bits per channel + alpha) |
| Background | Transparent (for flexibility — platform-specific renders add backing as needed) |
| Location | `assets/app-icon/icon-source.png` in the application repository |

### Source Management

- The source file is the single source of truth. All platform-specific formats and sizes are generated from it.
- The source file is committed to version control.
- The source file is never resized or edited except to update the icon design itself.
- All generated assets are listed in a `scripts/generate-icons.js` or equivalent build script.
- Never hand-craft icons at different sizes — always generate from the 1024×1024 source.

---

## 3. Design Rules

### Visual Requirements

| Requirement | Rationale |
|---|---|
| Filled shapes, minimal detail | Legible at 16px and 1024px |
| No text in the icon | App name appears separately on every platform |
| No gradients | Flat color renders consistently across all platforms |
| No shadows or glows | Platform-specific rendering may add its own |
| No alpha channel on platforms that forbid it | iOS App Store requires no alpha |
| Clear silhouette at 16×16 | Menu bar, browser tab, notification area |
| Works on black and white backgrounds | Dark and light dock/taskbar/tab backgrounds |

### Icon Anatomy

For adaptive icon platforms (Android, modern Windows), the icon has two layers:

```
┌─────────────────────────┐
│  Background layer        │  ← 432×432 safe zone (full canvas)
│  ┌───────────────────┐  │
│  │  Foreground layer   │  │  ← 360×360 safe zone (80% of background)
│  │  ┌─────────────┐   │  │
│  │  │  Subject     │   │  │  ← 288×288 safe zone (66% — the "inner 2/3")
│  │  │  (icon core) │   │  │
│  │  └─────────────┘   │  │
│  │  ┌─────────────┐   │  │
│  │  │  Safe margin│   │  │  ← 72px padding from foreground edge
│  │  └─────────────┘   │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

- **Subject core**: The primary visual element. Lives in the inner 66% of the icon.
- **Safe margin**: 72px padding from each edge of the 1024×1024 canvas. Nothing critical extends beyond this.
- **Foreground layer**: The visual content. Rendered on the platform-specific background.
- **Background layer**: A solid color or simple pattern. Must be opaque.

---

## 4. Favicon & Browser Icons

Every Kovina website must include the following browser icon formats.

### Favicon

| Format | Size | File | Notes |
|---|---|---|---|
| SVG | Vector | `favicon.svg` | Preferred. Supported in all modern browsers. |
| ICO (legacy) | 16×16, 32×32 | `favicon.ico` | Required for older browsers and bookmark fallback. |
| PNG | 16×16 | `favicon-16x16.png` | For browsers that prefer PNG over ICO. |
| PNG | 32×32 | `favicon-32x32.png` | Standard resolution. |

### Apple Touch Icon

| Format | Size | File | Notes |
|---|---|---|---|
| PNG | 180×180 | `apple-touch-icon.png` | Required for iOS Safari "Add to Home Screen" and Safari Reader. |
| PNG | 152×152 | `apple-touch-icon-152x152.png` | iPad fallback. |

### Microsoft Tile Icons (Legacy)

| Format | Size | File | Notes |
|---|---|---|---|
| PNG | 150×150 | `mstile-150x150.png` | For Windows 8/10 Start Menu pinning (legacy). |

### HTML Declaration

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

---

## 5. PWA Application Icons

Every Kovina PWA must include the following icons in its Web App Manifest.

### Required Sizes

| Size | Purpose | Notes |
|---|---|---|
| 192×192 | PWA icon (general) | Minimum required for install prompt. |
| 512×512 | PWA icon (high-res) | Required for splash screen generation. Must include `purpose: "any maskable"`. |

### Manifest Declaration

```json
{
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Additional Recommended Sizes

| Size | Purpose |
|---|---|
| 512×512 | General high-resolution (already required above) |
| 256×256 | Medium-resolution fallback |
| 128×128 | Low-resolution icon |

---

## 6. Windows Application Icons

Every Kovina Windows app must generate the following from the canonical source.

### Application Icon (ICO)

The `.ico` file packs multiple sizes into a single file for the Windows shell.

| Size | Context |
|---|---|
| 16×16 | Title bar, notification area |
| 24×24 | Status bar |
| 32×32 | Taskbar, Alt+Tab switcher |
| 48×48 | Folder view, desktop |
| 64×64 | High-DPI taskbar |
| 96×96 | High-DPI folder view |
| 256×256 | Start menu, high-DPI desktop |

- The `.ico` file is generated with all sizes in a single file.
- No transparency issues at 16×16 — the icon must have a solid backing at the smallest sizes.
- The icon must render correctly on both light and dark taskbar backgrounds.

### Microsoft Store Assets

| Asset | Size | Format |
|---|---|---|
| App icon (Store listing) | 256×256 | PNG |
| Small tile | 71×71 | PNG |
| Medium tile | 150×150 | PNG |
| Wide tile | 310×150 | PNG |
| Large tile | 310×310 | PNG |
| Store logo | 50×50 | PNG |
| Splash screen | 620×300 | PNG |

### Windows App Icon (Package)

For MSIX packaging:

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

## 7. Android Application Icons

Every Kovina Android app must use the **Adaptive Icon** format and provide all density-specific sizes.

### Adaptive Icon Layers

| Layer | Content | Format |
|---|---|---|
| Background | Single color or simple pattern drawable | XML vector drawable |
| Foreground | App icon design (subject + safe margin) | XML vector drawable or PNG |

The foreground must maintain a **72px safe margin** from the edge of the 108×108dp canvas, placing the core subject within the inner 66%.

### Density-Specific Mipmaps

| Density | Size |
|---|---|
| mdpi | 48×48 |
| hdpi | 72×72 |
| xhdpi | 96×96 |
| xxhdpi | 144×144 |
| xxxhdpi | 192×192 |

### File Layout

```
res/
  mipmap-anydpi-v26/
    ic_launcher.xml          (adaptive icon definition)
    ic_launcher_round.xml    (round adaptive icon definition)
  mipmap-mdpi/
    ic_launcher.png           (48×48 fallback for pre-API-26)
  mipmap-hdpi/
    ic_launcher.png           (72×72)
  mipmap-xhdpi/
    ic_launcher.png           (96×96)
  mipmap-xxhdpi/
    ic_launcher.png           (144×144)
  mipmap-xxxhdpi/
    ic_launcher.png           (192×192)
  drawable/
    ic_launcher_background.xml  (background layer)
    ic_launcher_foreground.xml  (foreground layer)
```

### Google Play Store Icon

| Property | Value |
|---|---|
| Size | 512×512 |
| Format | 32-bit PNG |
| Alpha | Allowed (Store processes it) |

---

## 8. iOS Application Icons

Every Kovina iOS app must provide all icon sizes in an `Assets.xcassets` AppIcon set.

### All Required Sizes

| Context | Size | Scale | Pixel Dimensions |
|---|---|---|---|
| iPhone Notification | 20×20 | 1× | 20×20 |
| iPhone Notification | 20×20 | 2× | 40×40 |
| iPhone Notification | 20×20 | 3× | 60×60 |
| iPhone Settings | 29×29 | 1× | 29×29 |
| iPhone Settings | 29×29 | 2× | 58×58 |
| iPhone Settings | 29×29 | 3× | 87×87 |
| iPhone Spotlight | 40×40 | 1× | 40×40 |
| iPhone Spotlight | 40×40 | 2× | 80×80 |
| iPhone Spotlight | 40×40 | 3× | 120×120 |
| iPhone App | 60×60 | 2× | 120×120 |
| iPhone App | 60×60 | 3× | 180×180 |
| iPad Notification | 20×20 | 1× | 20×20 |
| iPad Notification | 20×20 | 2× | 40×40 |
| iPad Settings | 29×29 | 1× | 29×29 |
| iPad Settings | 29×29 | 2× | 58×58 |
| iPad Spotlight | 40×40 | 1× | 40×40 |
| iPad Spotlight | 40×40 | 2× | 80×80 |
| iPad App | 76×76 | 1× | 76×76 |
| iPad App | 76×76 | 2× | 152×152 |
| iPad Pro App | 83.5×83.5 | 2× | 167×167 |
| App Store | 1024×1024 | 1× | 1024×1024 |

### Critical Rule

The 1024×1024 App Store icon must have **no alpha channel** — the App Store rejects icons with transparency. This is the only icon variant where alpha must be stripped and background flattened.

### File Layout

```
Assets.xcassets/
  AppIcon.appiconset/
    Contents.json            (describes all size/scale entries)
    icon-20@1x.png
    icon-20@2x.png
    icon-20@3x.png
    icon-29@1x.png
    icon-29@2x.png
    icon-29@3x.png
    ...
    icon-1024@1x.png         (no alpha)
```

---

## 9. macOS Application Icons

Every Kovina macOS app must provide a `.iconset` directory with all required sizes, which is then compiled into a `.icns` file.

### Iconset Sizes

| Size | Scale | Filename |
|---|---|---|
| 16×16 | 1× | `icon_16x16.png` |
| 16×16 | 2× | `icon_16x16@2x.png` |
| 32×32 | 1× | `icon_32x32.png` |
| 32×32 | 2× | `icon_32x32@2x.png` |
| 128×128 | 1× | `icon_128x128.png` |
| 128×128 | 2× | `icon_128x128@2x.png` |
| 256×256 | 1× | `icon_256x256.png` |
| 256×256 | 2× | `icon_256x256@2x.png` |
| 512×512 | 1× | `icon_512x512.png` |
| 512×512 | 2× | `icon_512x512@2x.png` |

### Iconset to ICNS Conversion

```bash
iconutil -c icns AppIcon.iconset -o AppIcon.icns
```

### Menu Bar Icon (if applicable)

If the application has a menu bar extra:

| Property | Value |
|---|---|
| Size | 16×16 (or 18×18 for menu bar) |
| Format | Template image (black on transparent) |
| Rendering | macOS automatically applies menu bar styling — no hardcoded color |

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

## 10. Splash & Launch Assets

### Web / PWA Splash (Browser-Generated)

Controlled by the Web App Manifest and a `<meta>` tag:

| Property | Controls | Value |
|---|---|---|
| `background_color` | Splash background | App's dark mode background (`#000000` or brand dark) |
| `theme_color` | Status bar | `#000000` |
| Icons (512×512 maskable) | Center image | Used by the browser to render the splash icon |

No custom splash screen HTML — browser-generated splash is sufficient for PWA.

### Windows Splash Screen

| Asset | Size | Context |
|---|---|---|
| Splash screen (Store) | 620×300 | Microsoft Store listing |

### Android Splash / Launch Theme

For modern Android, use a launch theme with the adaptive icon:

```xml
<style name="AppTheme.Launcher">
    <item name="android:windowBackground">@drawable/launch_splash</item>
</style>
```

Where `launch_splash.xml` combines the app icon with the background color — no separate splash image file needed.

### iOS Launch Screen

Use a `LaunchScreen.storyboard` that renders the app icon centered on a solid background. No static launch images.

---

## 11. Store Listings

Store listing assets (screenshots, feature graphics, promotional images) are defined in the [Store Listing Standard](../shared/STORE_LISTING_STANDARD.md). That document is the canonical reference for all store listing asset sizes and requirements.

This document only defines **app icon** sizes for store submission, which appear in the platform-specific sections above. All other store assets are owned by STORE_LISTING_STANDARD.

---

## 12. Generation Pipeline

### Recommended Script Structure

```javascript
// scripts/generate-icons.js
// Generates all platform icon assets from a single 1024×1024 source.

const SOURCE = "assets/app-icon/icon-source.png";
const OUTPUT = {
  favicon:    "public/",
  pwa:        "public/",
  windows:    "assets/windows/",
  android:    "app/src/main/res/",
  ios:        "App/Assets.xcassets/AppIcon.appiconset/",
  mac:        "App/Assets.xcassets/AppIcon.iconset/",
  store:      "assets/store/",
};
```

### Generation Rules

- All sizes are generated from the 1024×1024 source using bicubic downscaling.
- No manual retouching at any size.
- The `.ico` file for Windows is generated by composing individual PNGs into an ICO container.
- The `.icns` file for macOS is generated by composing the `.iconset` and running `iconutil`.
- The iOS 1024×1024 App Store icon requires alpha stripping (flatten to white or brand background).
- The Android adaptive icon foreground and background are generated as separate PNGs or vector drawables.
- The generation script is run as part of the build or release process.
- Generated assets are committed to version control for reproducible builds.

---

## 13. QA Checklist

- [ ] Canonical source is 1024×1024 PNG with transparent background.
- [ ] No text appears in the icon.
- [ ] The icon is recognizable at 16×16 (test: squint test in browser tab).
- [ ] The icon works on a black background.
- [ ] The icon works on a white background.
- [ ] All favicon formats (SVG, ICO, 16×16 PNG, 32×32 PNG) are present.
- [ ] Apple touch icon (180×180) is present.
- [ ] PWA manifest icons (192×192, 512×512 maskable) are present.
- [ ] Windows `.ico` contains all required sizes (16–256).
- [ ] Windows Store assets (all tile sizes) are generated.
- [ ] Android adaptive icon (foreground + background) is configured.
- [ ] Android mipmap directories exist for all densities.
- [ ] iOS asset catalog contains all required sizes.
- [ ] iOS 1024×1024 App Store icon has no alpha channel.
- [ ] macOS `.iconset` contains all 10 required files.
- [ ] macOS `.icns` is generated via `iconutil`.
- [ ] Social preview (1200×630) is generated.
- [ ] Store screenshots are current and match the release build.
- [ ] The generation script is documented and reproducible.
- [ ] Generated assets are committed to version control.

---

*This standard defines the canonical icon pipeline for all Kovina projects. Platform-specific standards reference this document rather than duplicating its contents. Companion to [WEBSITE_STANDARD](.../platforms/WEBSITE_STANDARD.md), [PWA_STANDARD](.../platforms/PWA_STANDARD.md), [WINDOWS_APP_STANDARD](.../platforms/WINDOWS_APP_STANDARD.md), [ANDROID_APP_STANDARD](.../platforms/ANDROID_APP_STANDARD.md), [IOS_APP_STANDARD](.../platforms/IOS_APP_STANDARD.md), and [MAC_APP_STANDARD](.../platforms/MAC_APP_STANDARD.md).*
