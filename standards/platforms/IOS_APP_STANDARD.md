# iOS App Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.0.0](VERSION.md)
>
> Defines mandatory requirements for every Kovina Open project that ships an iOS application.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Packaging](#2-packaging)
3. [Store Submission](#3-store-submission)
4. [Icons & Assets](#4-icons--assets)
5. [Navigation](#5-navigation)
6. [Safe Areas & Layout](#6-safe-areas--layout)
7. [Minimum iOS Version](#7-minimum-ios-version)
8. [Orientation](#8-orientation)
9. [Accessibility](#9-accessibility)
10. [Build Requirements](#10-build-requirements)
11. [QA Checklist](#11-qa-checklist)
12. [Agent Checklist](#12-agent-checklist)

---

## 1. Philosophy

A Kovina iOS app is a native Swift citizen of the platform — it uses system navigation idioms, respects Safe Area and Dynamic Island, integrates with Share Sheet and system services, and handles the full range of iOS device sizes and orientations. It feels at home on iPhone, iPad, and iPhone Pro Max, across light and dark modes.

The app does not fight the platform. It adopts standard iOS patterns (navigation stack, modal presentation, swipe gestures) where they serve the product, and only introduces custom interactions when the product metaphor demands them.

---

## 2. Packaging

### Distribution Format

| Format | Requirement | Use Case |
|---|---|---|
| IPA | **Required** | App Store distribution via App Store Connect |

### IPA Requirements

- The IPA must be signed with a production distribution certificate.
- The IPA must include bitcode (if the framework supports it — deprecated as of Xcode 14, omit if targeting current toolchains).
- The IPA must be exported using the App Store distribution method for Store submission.
- The bundle must support all target architectures (arm64 required).

### Code Signing

- Signing must use a valid Apple Developer Program certificate.
- Development signing for testing on physical devices.
- Distribution signing for App Store submission.
- Signing identities and provisioning profiles must not be committed to version control.
- Use Xcode's automatic signing management or a CI signing solution (Fastlane match recommended).

### Bundle Identity

| Field | Value |
|---|---|
| Bundle identifier | `org.kovina.{app_slug}` (e.g. `org.kovina.openreader`) |
| Version | Semantic version (e.g. `1.2.3`) |
| Build number | Monotonically increasing integer (`CFBundleVersion`) |
| App name | `{Full Application Name}` (e.g. `OpenReader`) |

---

## 3. Store Submission

### App Store Requirements

| Requirement | Standard |
|---|---|
| Developer account | Apple Developer Program membership ($99/year). |
| App Store Connect | App record created with complete metadata before submission. |
| Pricing | Free. No in-app purchases. No ads. |
| Age rating | Must complete the App Store age rating questionnaire. |
| Privacy policy | Must link to a valid, publicly accessible privacy policy URL. |
| Export compliance | Must declare encryption usage correctly (Kovina apps that use only HTTPS without custom cryptography may use the "exemption" declaration). |

### Store Listing Assets

All store listing assets (icons, screenshots, previews) and text fields (name, subtitle, description, what's new, keywords) are defined in the [Store Listing Standard](../shared/STORE_LISTING_STANDARD.md#14-platform-specific-asset-tables). That document is the canonical reference — this section does not duplicate it.

iOS-specific submission notes:
- The app icon must be 1024×1024 with no alpha channel.
- 6.5″ iPhone screenshots: 1242×2688 or 1290×2796 (at least 4).
- 5.5″ iPhone screenshots: 1242×2208 (optional, auto-scaled if omitted).
- 12.9″ iPad screenshots: 2048×2732 (at least 2, if iPad supported).
- An optional App Preview video (886×1920 or 1080×1920 MOV/M4V, 15–30 seconds) is allowed.

### App Review

- All features must be functional and demonstrated in the review build.
- Test accounts or testing instructions must be provided in App Store Connect review notes if the app requires authentication.
- Beta features behind feature flags must be hidden from reviewers unless the feature is the purpose of the submission.
- The app must not reference unreleased Apple products or features per Apple's guidelines.

---

## 4. Icons & Assets

All cross-platform icon generation requirements (source file, sizes, formats) are defined in the [App Icon Standard](../shared/APP_ICON_STANDARD.md). That document is the canonical reference — this section covers only iOS-specific requirements.

### Required Icon Sizes

The full table of all required iOS icon sizes (20×20 through 1024×1024, all scales) is defined in [App Icon Standard — iOS §8](../shared/APP_ICON_STANDARD.md#8-ios-application-icons). That table is the source of truth.

### Critical Rule

The 1024×1024 App Store icon must have **no alpha channel** — the App Store rejects icons with transparency. This is the only icon variant where alpha must be stripped and background flattened.

### Asset Catalog

- All icons must be stored in an `Assets.xcassets` AppIcon set with a `Contents.json` that describes all size/scale entries.
- All icons must be generated from the single 1024×1024 canonical source — never hand-crafted at different sizes.
- Use Fastlane `frameit` or equivalent to generate screenshots with device frames where required.

---

## 5. Navigation

### Navigation Pattern

| App Type | Pattern |
|---|---|
| Single-screen utility (OpenProof, OpenPalette) | Full-screen presentation. No navigation bar required. |
| Multi-screen app (OpenLedger, OpenSprout) | Navigation stack (`UINavigationController` or `NavigationStack`) with optional tab bar. |

### Tab Bar

- Tab bar: 3–5 tabs maximum. Never more than 5.
- Tab bar items: icon + text label. Icon-only tabs are not acceptable for primary navigation.
- The selected tab must use the app's accent color.
- Tab bar must respect `prefersLargeTitles` integration where applicable.

### Navigation Bar

- Navigation bars must use standard system appearance (large titles optional for hierarchical apps).
- Back button text must be minimal (single word or no text — just the chevron).
- Custom back buttons must retain the system chevron shape and gesture (swipe-to-go-back).

### Swipe Gestures

- Swipe-to-go-back must work on all pushed screens.
- Swipe-to-dismiss must work on all modal presentations.
- Custom swipe gestures must not conflict with system edge gestures.

---

## 6. Safe Areas & Layout

### Safe Area Insets

- All content must be inset from the Safe Area (notch, Dynamic Island, home indicator).
- Status bar height must be respected.
- Keyboard appearance must not cause content to be clipped or hidden.
- Full-screen content (media, readers) may extend behind the Safe Area but must include gradient overlays or padding for readability.

### Layout Margins

| Edge | Margin |
|---|---|
| Leading / trailing (phone) | 16–20pt |
| Leading / trailing (tablet) | 20–24pt |
| Top (below nav bar) | 16–20pt |
| Bottom (above home indicator) | 16–20pt |

### Device Support

| Device Family | Required |
|---|---|
| iPhone (all sizes since iPhone SE) | Yes |
| iPad (all sizes since iPad mini) | Recommended for productivity/utility apps |
| iPhone Pro Max / Plus | Yes — no letterboxing |
| iPhone SE / mini | Yes — no clipping or truncation |
| iPad multitasking (Split View, Slide Over) | Recommended for productivity apps |

---

## 7. Minimum iOS Version

| Parameter | Value | Rationale |
|---|---|---|
| Minimum iOS | 16.0 | Covers >95% of active devices. Supports SwiftUI navigation stack, Live Activities, Lock Screen widgets. |
| Deployment target | Latest stable + 2 versions | Balance between feature access and user coverage. |

### Justified Exceptions

A higher minimum version may be set if:

- The application requires a framework or API introduced in a newer iOS version (e.g. RealityKit, CoreNFC).
- The application targets a specific audience known to be on recent hardware.

A lower minimum version requires ecosystem review and must be justified by a significant user demographic otherwise excluded.

### iPadOS

- If the app declares iPad support, it must target the same minimum version as iPhone.
- iPad-specific features (multitasking, drag-and-drop, Apple Pencil) may require higher minimum versions.

---

## 8. Orientation

- Both portrait and landscape must be supported unless the application has a justified hardware constraint.
- Locking orientation is prohibited for general-purpose apps.
- On iPad, all four interface orientations must be supported.
- On iPhone, portrait and landscape left/right must be supported.

### Orientation Changes

- Layouts must reflow on orientation change. No scaling, no cropping, no letterboxing.
- State must be preserved across orientation changes.
- Scroll position must be preserved across orientation changes where practical.

---

## 9. Accessibility

All cross-platform accessibility requirements are defined in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md). That document is the canonical reference — this section covers only iOS-specific additions.

| Requirement | Standard |
|---|---|
| VoiceOver | All interactive elements must have `accessibilityLabel`, `accessibilityTraits`, and `accessibilityHint` where needed. Custom views implement `UIAccessibility` protocol. |
| Dynamic Type | All text must use `UIFontMetrics` / SwiftUI `@ScaledMetric` and support system font sizes up to `.accessibilityExtraExtraExtraLarge`. |
| Touch targets | ≥ 44×44pt (Apple HIG standard). |
| Focus order | Logical focus order for Switch Control and VoiceOver. |
| System settings | `isReduceMotionEnabled`, `isBoldTextEnabled`, `buttonShapesEnabled`, `isReduceTransparencyEnabled`, `isDarkerSystemColorsEnabled` — all must be respected. |
| Live regions | Dynamic content must use accessibility notifications for VoiceOver announcement. |

Every rule in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md) applies.

---

## 10. Build Requirements

| Requirement | Standard |
|---|---|
| Language | Swift preferred. SwiftUI for new development. UIKit for complex custom interactions. |
| Minimum Xcode version | Latest stable at time of development. |
| Architecture | arm64 (all iOS devices since iPhone 5s). |
| Minimum iOS version | 16.0 (see [Minimum iOS Version](#7-minimum-ios-version)). |
| Size | IPA under 100MB compressed. Under 200MB installed. |
| Crash reporting | Optional — must be opt-in. Must comply with App Store guidelines and privacy policy. |

### Build Automation

- Fastlane recommended for build, signing, and deployment automation.
- CI/CD pipeline must build and test on every push.
- Archive and export must be reproducible from CI.
- Build secrets (certificates, profiles, API keys) must be stored in a secure vault (GitHub Secrets, 1Password, or equivalent), never in version control.

### Dependencies

- Swift Package Manager preferred for dependencies.
- CocoaPods may be used for legacy projects but transition to SPM is expected.
- Dependency count must be minimized. Every dependency is a review burden and a supply chain risk.

---

## 11. QA Checklist

Before shipping an iOS app release:

- [ ] Builds and archives without errors in Xcode.
- [ ] App installs and launches on a device running minimum iOS version.
- [ ] App installs and launches on a device running latest iOS version.
- [ ] All features work on iPhone SE, standard iPhone, and iPhone Pro Max sizes.
- [ ] All features work on iPad (if supported).
- [ ] Orientation change preserves state and scroll position.
- [ ] App handles interruption (phone call, FaceTime, notification).
- [ ] App handles backgrounding and foregrounding correctly.
- [ ] Swipe-to-go-back works on all pushed screens.
- [ ] Modal presentations are dismissible by swipe.
- [ ] Safe Area insets are respected on all devices (notch, Dynamic Island, home indicator).
- [ ] Keyboard does not clip or hide content.
- [ ] Dynamic Type at maximum accessibility size does not break layout.
- [ ] VoiceOver reads all interactive controls.
- [ ] VoiceOver navigation order is logical.
- [ ] All icon sizes are present in the asset catalog.
- [ ] App icon renders correctly on light and dark home screen.
- [ ] App icon has no alpha channel (validated).
- [ ] Privacy policy URL is valid and linked in App Store Connect.
- [ ] Export compliance declaration is accurate.
- [ ] Store listing screenshots are current and match the release build.
- [ ] Version and build numbers are incremented correctly.
- [ ] Archive is signed with distribution certificate.
- [ ] No memory leaks or retain cycles (verified with Instruments).

---

## 12. Agent Checklist

Before an AI agent declares iOS app work complete:

### Build & Packaging

- [ ] Bundle identifier follows `org.kovina.{app_slug}`.
- [ ] Minimum iOS version is 16.0 (or justified exception).
- [ ] App archive is signed with distribution certificate.
- [ ] Version and build numbers are incremented.
- [ ] No signing identities are committed to version control.

### Icons & Assets

- [ ] All required icon sizes are present in the asset catalog.
- [ ] 1024×1024 App Store icon has no alpha channel.
- [ ] Icon is recognizable at all sizes on both light and dark backgrounds.
- [ ] At least 4 iPhone screenshots are prepared.
- [ ] iPad screenshots are prepared (if iPad supported).

### Navigation & Layout

- [ ] Tab bar has 3–5 items (if used).
- [ ] Swipe-to-go-back works on all screens.
- [ ] Safe Area insets are respected.
- [ ] Layout adapts to all iPhone sizes without clipping.
- [ ] iPad layout (if supported) uses multi-column where appropriate.

### Accessibility

- [ ] VoiceOver reads all interactive controls.
- [ ] Dynamic Type to max accessibility size does not break layout.
- [ ] Touch targets ≥ 44×44pt.
- [ ] `isReduceMotionEnabled` is respected.
- [ ] All images have accessibility labels.

### Functionality

- [ ] Core features work on minimum iOS version device.
- [ ] Core features work on latest iOS version device.
- [ ] Orientation change preserves state.
- [ ] App handles background → foreground correctly.
- [ ] Keyboard interaction works correctly.

### Store Readiness

- [ ] App Store Connect record is complete.
- [ ] Privacy policy is linked.
- [ ] Export compliance is declared.
- [ ] Review notes include any required test accounts.
- [ ] Store screenshots match the current build.

---

*This standard applies to every Kovina iOS application. Companion to the [Design Playbook](../foundational/DESIGN_PLAYBOOK.md) and [Architecture Playbook](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) for shared design and architecture requirements.*
