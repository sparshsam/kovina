# Android App Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.0.0](VERSION.md)
>
> Defines mandatory requirements for every Kovina Open project that ships an Android application.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Packaging](#2-packaging)
3. [Store Submission](#3-store-submission)
4. [Icons & Assets](#4-icons--assets)
5. [Navigation](#5-navigation)
6. [Permissions](#6-permissions)
7. [Orientation & Layout](#7-orientation--layout)
8. [Minimum SDK & Targets](#8-minimum-sdk--targets)
9. [Accessibility](#9-accessibility)
10. [Build Requirements](#10-build-requirements)
11. [QA Checklist](#11-qa-checklist)
12. [Agent Checklist](#12-agent-checklist)

---

## 1. Philosophy

A Kovina Android app respects Android's design idioms while maintaining Kovina's calm, editorial identity. It integrates with system navigation (gestures, back), supports the full range of Android screen sizes and densities, and never requests permissions it does not need.

The app is a good citizen of the Android ecosystem — it handles lifecycle events correctly, preserves state across configuration changes, and behaves properly when suspended or killed by the system.

---

## 2. Packaging

### Distribution Format

| Format | Requirement | Use Case |
|---|---|---|
| AAB (Android App Bundle) | **Required** | Google Play Store distribution |
| APK | Optional | Sideloading, direct distribution, testing |

### AAB Requirements

- The bundle must be signed with the production keystore.
- The bundle must include all target architecture splits (arm64-v8a required, armeabi-v7a recommended, x86_64 optional).
- Dynamic feature modules must only be used for justified, optional functionality.
- The bundle must include density-split resources for all target screen densities.

### Signing

- App signing must use Android App Signing by Google Play or an equivalent secure keystore.
- The upload key and signing key must be stored securely, never committed to version control.
- Key expiration dates must be tracked and renewed before expiry.
- The keystore password and key password must be documented in a secure location accessible to the release team.

### Package Identity

| Field | Value |
|---|---|
| Package name | `org.kovina.{app_slug}` (e.g. `org.kovina.openproof`) |
| Version code | Monotonically increasing integer (matches release sequence) |
| Version name | Semantic version string (e.g. `1.2.3`) |
| MinSDK | 26 (Android 8.0) — see [Minimum SDK & Targets](#8-minimum-sdk--targets) |

---

## 3. Store Submission

### Google Play Requirements

| Requirement | Standard |
|---|---|
| Developer account | Google Play Developer account ($25 one-time registration). |
| App signing | Android App Signing by Google Play enabled. |
| Pricing | Free. No in-app purchases. No ads. |
| Content rating | Must complete the Google Play content rating questionnaire. |
| Target audience | Must specify correct age range and content descriptors. |
| Privacy policy | Must link to a valid, publicly accessible privacy policy. |
| Data safety | Must complete the Data Safety section honestly (no telemetry = no data collection declared). |

### Store Listing Assets

All store listing assets (icons, feature graphic, screenshots) and text fields (name, description) are defined in the [Store Listing Standard](../shared/STORE_LISTING_STANDARD.md#14-platform-specific-asset-tables). That document is the canonical reference — this section does not duplicate it.

Android-specific asset notes:
- Phone screenshots must be at least 640px wide, max 3840px (at least 4).
- Tablet screenshots are required at 7-inch and 10-inch sizes if the app supports tablets.
- A promo video (YouTube URL) is optional.

---

## 4. Icons & Assets

All cross-platform icon generation requirements (source file, sizes, formats) are defined in the [App Icon Standard](../shared/APP_ICON_STANDARD.md). That document is the canonical reference — this section covers only Android-specific requirements.

### Adaptive Icon Format

Adaptive icons are required (foreground + background layers). See [App Icon Standard — Android §7](../shared/APP_ICON_STANDARD.md#7-android-application-icons) for the full specification.

```xml
<!-- AndroidManifest.xml -->
<application
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:adaptiveIcon="@mipmap/ic_launcher_adaptive">
```

| Layer | Content |
|---|---|
| `ic_launcher_background.xml` | Single color or subtle gradient drawable |
| `ic_launcher_foreground.xml` | App icon content (108dp safe zone, 72dp viewport) |
| `ic_launcher.xml` | Adaptive icon composition |

### Density-Specific Mipmaps

All mipmap density directories and their sizes are defined in the [App Icon Standard](../shared/APP_ICON_STANDARD.md#7-android-application-icons). The file layout (`mipmap-anydpi-v26/`, `mipmap-mdpi/` through `mipmap-xxxhdpi/`) is mandatory.

---

## 5. Navigation

### Navigation Pattern

| App Type | Pattern |
|---|---|
| Single-screen utility (OpenProof, OpenPalette) | No dedicated navigation — screen IS the app |
| Multi-screen app (OpenLedger, OpenSprout) | Bottom navigation bar (3–5 items) or navigation rail (tablet) |

### Back Navigation

- System back must navigate to the previous screen (temporal navigation).
- Back must not navigate to a screen that has been removed from the back stack.
- Back from the home screen must exit the app (or navigate to the launcher on Android 12+ with predictive back gesture).
- Custom back handling must call `super.onBackPressed()` or `OnBackPressedDispatcher`.

### Navigation Structure

- Navigation should be flat where possible — no navigation drawers with nested sections.
- Navigation items are text-only or text + icon. Never icon-only for primary navigation.
- The active navigation item must have a clear visual indicator.
- Navigation state must persist across configuration changes.

---

## 6. Permissions

### Philosophy

Request the minimum number of permissions required for the application to function. Kovina apps do not request permissions that are not directly used by their core feature.

### Required Declaration

All permissions must be declared in `AndroidManifest.xml`. Runtime permissions must be requested at the time of use, not at install time.

### Prohibited Permissions

The following permissions must never be declared by Kovina apps:

- `ACCESS_FINE_LOCATION` / `ACCESS_COARSE_LOCATION` (unless the app is a navigation or location-based tool)
- `ACCESS_BACKGROUND_LOCATION`
- `READ_CONTACTS` / `WRITE_CONTACTS`
- `READ_CALL_LOG` / `WRITE_CALL_LOG`
- `CAMERA` (unless the app uses the camera as a core feature)
- `RECORD_AUDIO` (unless the app records audio as a core feature)
- `SEND_SMS` / `RECEIVE_SMS` / `READ_SMS`
- `READ_PHONE_STATE`
- `REQUEST_INSTALL_PACKAGES`
- `SYSTEM_ALERT_WINDOW`

### Runtime Permission Flow

- Permission requests must include a rationale if the user has previously denied the request.
- The rationale must be an inline explanation, not a system `shouldShowRequestPermissionRationale` toast.
- The permission dialog must be triggered by a user action (button tap, feature access).
- If the user denies a required permission, the feature must degrade gracefully with an explanation.

---

## 7. Orientation & Layout

### Orientation

- Both portrait and landscape must be supported unless the application has a justified hardware constraint.
- Locking orientation is prohibited for general-purpose applications.
- Layouts must reflow on rotation, not scale or crop.

### Screen Support

| Factor | Requirement |
|---|---|
| Screen sizes | Support small (~3.4″) through large (~10″+). |
| Screen densities | Support mdpi through xxxhdpi. |
| Foldables | App must not break on foldable devices. Layout should adapt to unfolded state. |
| Cutouts / notches | Content must be inset from cutout areas. Use `shortEdges` cutout mode where needed. |
| RTL | Full right-to-left support per [LOCALIZATION_STANDARD.md](../shared/LOCALIZATION_STANDARD.md#14-right-to-left-rtl-support). Layouts use `start`/`end`, not `left`/`right`. |

### Layout

- On phones (≤600dp width): single-column layout.
- On tablets (>600dp width): multi-column layout where the content benefits from additional space.
- A single layout XML or Compose tree must adapt to both phone and tablet via configuration qualifiers or window size classes.
- Touch targets must be ≥ 48dp (Material Design standard) for interactive elements.
- Minimum touch target spacing: 8dp between interactive elements.

---

## 8. Minimum SDK & Targets

| Parameter | Value | Rationale |
|---|---|---|
| `minSdk` | 26 (Android 8.0 Oreo) | Covers >95% of active devices. Supports modern TLS, Autofill, notification channels. |
| `targetSdk` | Latest stable | Must target the latest SDK within 90 days of release. |
| `compileSdk` | Latest stable | Must compile against the latest SDK. |
| NDK version | Latest stable (if native code is used). |

### Justified Exceptions

A higher `minSdk` may be set if:

- The application requires a feature not available on API 26 (e.g. CameraX, specific Bluetooth profiles).
- The application targets a specialized hardware platform with a known minimum OS version.

A lower `minSdk` must be approved by ecosystem review and must be justified by a significant user demographic that would otherwise be excluded.

---

## 9. Accessibility

All cross-platform accessibility requirements are defined in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md). That document is the canonical reference — this section covers only Android-specific additions.

| Requirement | Standard |
|---|---|
| TalkBack | All interactive elements must have `contentDescription`. Custom views implement `accessibilityDelegate`. |
| Touch target size | ≥ 48dp (Material Design standard). |
| Focus order | Logical Tab and directional focus order via `nextFocus*` attributes. |
| Text scaling | Layouts must support system font scale up to 200%. |
| Live regions | Error messages use `liveRegion` for TalkBack announcement. |

Every rule in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md) applies.

---

## 10. Build Requirements

| Requirement | Standard |
|---|---|
| Build system | Gradle with Kotlin DSL preferred. Version catalog (libs.versions.toml) required. |
| Language | Kotlin preferred. Java only if maintaining an existing Java codebase. |
| Minimum Android Studio version | Latest stable at time of development. |
| Architecture | arm64-v8a required. armeabi-v7a recommended. x86_64 optional. |
| ProGuard / R8 | Code shrinking and obfuscation enabled for release builds. |
| Crash reporting | Optional — must be opt-in, not opt-out. If used, must declare in privacy policy. |
| Size | APK / AAB under 50MB compressed. Under 150MB installed. |

### Build Variants

| Variant | Use |
|---|---|
| `debug` | Development. Unoptimized. Debuggable. |
| `release` | Production. Optimized. ProGuarded. Signed. |

- No build secrets (API keys, tokens) in version control.
- Build secrets using `BuildConfig` must be scoped to `debug` builds or use a secure key service.

---

## 11. QA Checklist

Before shipping an Android app release:

- [ ] AAB builds and signs without errors.
- [ ] App installs cleanly on a device running minimum supported SDK.
- [ ] App installs cleanly on a device running the latest SDK.
- [ ] App launches without errors (no crash on cold start).
- [ ] All core features work on arm64-v8a architecture.
- [ ] App handles configuration changes (rotation, locale change).
- [ ] App preserves state when the activity is recreated.
- [ ] System back navigation works correctly through all screens.
- [ ] Navigation structure matches the approved archetype.
- [ ] Adaptive icons render correctly on all launcher configurations.
- [ ] All density buckets have correct icon assets.
- [ ] App works in landscape and portrait orientations.
- [ ] App layout adapts to tablet screen sizes.
- [ ] All runtime permission flows work correctly.
- [ ] Permission denial degrades gracefully.
- [ ] No unnecessary permissions declared.
- [ ] RTL layout test passes.
- [ ] Text scaling to 200% does not break layout.
- [ ] TalkBack reads all interactive controls correctly.
- [ ] All standard Android shortcuts and behaviors work.
- [ ] App closes cleanly (no background processes leak).
- [ ] Data safety section in Store listing is accurate.
- [ ] Privacy policy link is valid.
- [ ] App does not crash on low-memory conditions.
- [ ] ProGuard/R8 does not strip required code.
- [ ] Store listing screenshots are current and match the release.
- [ ] Version name and code are correct and incremented.

---

## 12. Agent Checklist

Before an AI agent declares Android app work complete:

### Build & Packaging

- [ ] Package name follows `org.kovina.{app_slug}` convention.
- [ ] `minSdk` is 26 (or justified exception approved).
- [ ] `targetSdk` is the latest stable.
- [ ] AAB is signed with the production keystore.
- [ ] Version code is incremented from the previous release.
- [ ] Version name matches the semantic version.

### Icons & Assets

- [ ] Adaptive icon (foreground + background) is configured.
- [ ] All mipmap density directories have correct sizes.
- [ ] 512×512 Store icon is generated from the canonical source.
- [ ] Feature graphic is generated per [STORE_LISTING_STANDARD.md](../shared/STORE_LISTING_STANDARD.md#14-platform-specific-asset-tables).
- [ ] Phone screenshots are taken and uploaded per STORE_LISTING_STANDARD requirements.

### Functionality

- [ ] Core features work on API 26 device.
- [ ] Core features work on latest API device.
- [ ] Configuration changes (rotation, locale) preserve state.
- [ ] System back navigates correctly.
- [ ] Bottom navigation (if used) works correctly.

### Permissions

- [ ] Only necessary permissions are declared.
- [ ] No prohibited permissions are declared.
- [ ] Runtime permission requests include a rationale.
- [ ] Permission denial degrades gracefully.

### Accessibility

- [ ] All icons have `contentDescription`.
- [ ] Touch targets ≥ 48dp.
- [ ] TalkBack reads all interactive controls.
- [ ] System font scaling to 200% does not break layout.
- [ ] Animations respect "Remove animations" accessibility setting.

### Store Readiness

- [ ] Store listing is complete (name, description, screenshots).
- [ ] Data safety section is accurate (no telemetry declared if none exists).
- [ ] Privacy policy is linked and accessible.

---

*This standard applies to every Kovina Android application. Companion to the [Design Playbook](../foundational/DESIGN_PLAYBOOK.md) and [Architecture Playbook](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) for shared design and architecture requirements.*
