# Performance Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.2.0](../VERSION.md)
>
> Canonical performance standard for every Kovina Open project. Defines startup speed, interaction responsiveness, resource efficiency, and perceived performance — the metabolism of the app organism.
>
> Platform documents reference this standard rather than defining their own performance rules.

---

## Table of Contents

1. [Authority](#1-authority)
2. [Philosophy](#2-philosophy)
3. [Startup Budgets](#3-startup-budgets)
4. [Interaction Latency](#4-interaction-latency)
5. [Render Performance](#5-render-performance)
6. [Bundle Size](#6-bundle-size)
7. [Dependency Limits](#7-dependency-limits)
8. [Offline Readiness](#8-offline-readiness)
9. [Cache Strategy](#9-cache-strategy)
10. [Background Work](#10-background-work)
11. [Battery Usage](#11-battery-usage)
12. [Memory Usage](#12-memory-usage)
13. [Image & Media Optimization](#13-image--media-optimization)
14. [Font Loading](#14-font-loading)
15. [Platform-Specific Performance Expectations](#15-platform-specific-performance-expectations)
16. [Web Vitals](#16-web-vitals)
17. [Desktop App Responsiveness](#17-desktop-app-responsiveness)
18. [Mobile App Responsiveness](#18-mobile-app-responsiveness)
19. [Low-End Device Expectations](#19-low-end-device-expected)
20. [Profiling Requirements](#20-profiling-requirements)
21. [Performance QA Checklist](#21-performance-qa-checklist)
22. [Agent Checklist](#22-agent-checklist)

---

## 1. Authority

### This document owns

- Performance budgets for startup, interaction latency, and rendering.
- Bundle size targets and dependency limits.
- Image, media, and font loading optimization rules.
- Perceived performance, responsiveness, and offline readiness expectations.
- Cache strategy (high-level architecture, not implementation).
- Background work rules, battery usage expectations, memory usage guidelines.
- Platform-specific performance expectations (web, desktop, mobile, low-end devices).
- Web Vitals targets, profiling requirements, and performance QA.

### This document does not define

| Subject | Owning Standard |
|---|---|
| Data storage architecture and sync performance | [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) |
| Network security and TLS configuration | [SECURITY_PRIVACY_STANDARD.md](../shared/SECURITY_PRIVACY_STANDARD.md) |
| Platform-specific packaging and build optimization | Platform standards (WEBSITE_STANDARD, WINDOWS_APP_STANDARD, etc.) |
| Cache TTL values for specific data types | [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) |
| Testing methodology for performance | [TESTING_STANDARD.md](../process/TESTING_STANDARD.md) |

### Dependencies

This document works alongside [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) (data caching architecture), [PRODUCT_ARCHITECTURE_PLAYBOOK.md](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) (performance as an architectural concern), platform standards (per-platform packaging and optimization), and [TESTING_STANDARD.md](../process/TESTING_STANDARD.md) (performance testing methodology).

---

## 2. Philosophy

Performance is a feature, not an optimization. It is designed in from the start, not bolted on after launch.

An application that feels slow is perceived as broken — regardless of its functional correctness. Users do not distinguish between "the feature doesn't exist" and "the feature takes too long." Perceived performance is the only performance that matters.

Kovina applications prioritize the performance dimensions that users perceive most acutely:

1. **Startup time** — how long until the user can interact with the application.
2. **Interaction latency** — how long between a user action and a visible response.
3. **Scroll smoothness** — does scrolling feel natural or janky?
4. **Navigation** — how long between requesting a new screen and seeing it rendered.

Performance is not about making the app fast on the developer's latest hardware. It is about making the app reliable on the hardware users actually have — including mid-range and low-end devices.

---

## 3. Startup Budgets

### Cold Start (First Launch / App Install)

| Platform | Maximum Startup Time | Measured On |
|---|---|---|
| Web (initial load) | 3 seconds to Largest Contentful Paint | 4G, mid-range device |
| PWA (installed) | 2 seconds to interactive | Mid-range device, no cache |
| Desktop (Windows / macOS) | 2 seconds to interactive | Mid-range device (3-year-old hardware) |
| Mobile (iOS / Android) | 2 seconds to interactive | Mid-range device (3-year-old hardware) |

### Warm Start (App in Memory / Service Worker Active)

| Platform | Maximum Startup Time |
|---|---|
| Web (subsequent navigation) | 1 second to interactive |
| PWA (from service worker cache) | 0.5 seconds to interactive |
| Desktop | 0.5 seconds to interactive |
| Mobile | 0.5 seconds to interactive |

### Startup Rules

| Rule | Rationale |
|---|---|
| Show immediate feedback (splash screen, skeleton) within 200ms of launch | User knows the app is loading |
| Show content progressively — render the shell first, then hydrate with data | Perceived speed |
| Delay non-critical initialization (sync, analytics, background tasks) until after the app is interactive | Prioritize what the user sees |
| Cache the app shell for offline cold start (PWA / native) | Instant subsequent startups |
| Never block startup on network response | Offline-first |
| Startup performance is tested on every CI run with a performance regression gate | Prevent regressions |

---

## 4. Interaction Latency

### Response Budgets

| Interaction Type | Maximum Latency | Definition |
|---|---|---|
| Tap / click feedback | 100ms | Visual feedback (highlight, press state) |
| Navigation transition | 300ms | Start of transition animation |
| Data load (local) | 100ms | Read from local database |
| Data load (synced) | 300ms to first paint, 3 seconds to complete | With skeleton/loading state |
| Search (local) | 200ms to first result | With debounced input |
| Search (remote) | 500ms to first result | With debounced input and loading state |
| Animation | 16ms per frame (60fps) | Smooth motion |
| High-refresh animation | 8ms per frame (120fps) | For scroll and drag |

### Interaction Rules

| Rule | Rationale |
|---|---|
| Every user action produces a visible response within 100ms | Prevents perceived lag |
| Actions that take longer than 100ms show a loading indicator or skeleton | User knows the app is working |
| Actions that take longer than 3 seconds show a progress estimate | User can decide to wait or cancel |
| Input (keyboard, touch, scroll) is never blocked by heavy computation | Main thread availability |
| Synchronous network calls on the main thread are prohibited | UI blocking |
| Expensive operations are debounced, throttled, or deferred | Main thread efficiency |
| Offline-queued operations are acknowledged immediately with deferred completion | Instant feedback |

---

## 5. Render Performance

### Frame Budget

| Metric | Target |
|---|---|
| Frame time (60fps) | ≤ 16ms per frame |
| Frame time (120fps) | ≤ 8ms per frame (scroll, drag, animation) |
| No dropped frames during scroll | 0 dropped frames in > 95% of scrolls |
| No dropped frames during navigation transition | 0 dropped frames during animation |

### Render Rules

| Rule | Rationale |
|---|---|
| Avoid layout thrashing — batch reads and writes to the DOM/render tree | Predictable frame times |
| Avoid forced reflows (web) — measure before write, not between | Performance stability |
| Lists are virtualized beyond 100 visible items | DOM node conservation |
| Offscreen content is not rendered | GPU/memory efficiency |
| Animations use GPU-composited properties only (transform, opacity) | No layout/paint triggers |
| Animations at 60fps on all supported devices | Smooth motion |
| No animation on elements that trigger layout on change (width, height, top, left) | Layout thrashing prevention |

---

## 6. Bundle Size

### Application Bundle

| Platform | Initial Bundle Budget | Notes |
|---|---|---|
| Web (desktop) | ≤ 200 KB gzipped JavaScript | Total for initial load |
| Web (mobile) | ≤ 150 KB gzipped JavaScript | Slower networks, lower budgets |
| PWA (installed) | ≤ 200 KB gzipped JavaScript | Same as web (service worker cached) |
| Desktop (Windows / macOS) | ≤ 10 MB download | Distribution size |
| Mobile (iOS / Android) | ≤ 20 MB download | App Store / Play Store limit awareness |

### Code Splitting Rules

| Rule | Rationale |
|---|---|
| Every route is a separate code-split chunk | Load only what the user needs |
| Shared dependencies are extracted into a common chunk | Cache reuse |
| Third-party libraries are not bundled into route chunks | Stable cache keys |
| Heavy libraries (charting, PDF, video) are lazy-loaded | Not in critical path |
| The main entry point contains only the app shell and router | Minimal initial payload |

---

## 7. Dependency Limits

### Rules

| Rule | Rationale |
|---|---|
| Every external dependency is justified — no "might be useful later" packages | Dependency bloat prevention |
| Dependencies with known performance issues are avoided | Proactive quality |
| Large dependencies (> 50 KB minified) are evaluated for alternatives or lazy loading | Conscious size management |
| Duplicate dependencies (same package in multiple versions) are resolved | Reduces bundle size |
| Native dependencies (mobile/desktop) are kept to the minimum necessary | Binary size control |
| Dependencies are reviewed for size impact before addition | CI size gate |

### Monorepo Dependency Sharing

In monorepo setups, shared libraries are extracted into shared packages. No two applications independently bundle the same shared dependency.

---

## 8. Offline Readiness

### Offline Performance Rules

| Rule | Rationale |
|---|---|
| The app shell loads instantly offline (cached at install or first visit) | No blank screen |
| Previously viewed content is available offline from cache | Reading history is always accessible |
| Navigation is instant offline — the app never shows a "no internet" screen for navigation | Navigation structure is cached |
| Data mutations are accepted offline and queued for sync | Productive offline |
| Offline indicator is shown but does not block interaction | Non-intrusive awareness |

### Offline Performance Targets

| Scenario | Target |
|---|---|
| App shell load (offline, no cache) | Not applicable — pre-cached |
| App shell load (offline, cached) | Instant (< 200ms) |
| Navigate to previously viewed content (offline) | < 300ms |
| Accept data mutation (offline) | < 100ms feedback |

---

## 9. Cache Strategy

### Architectural Principles

| Principle | Application |
|---|---|
| Cache is disposable — losing the cache never loses user data | See [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) |
| Cache is separate from user data storage | Clearable without consequence |
| Cache is automatically evicted based on TTL and storage pressure | Self-managing |
| Cache is populated lazily (on demand) not eagerly (on startup) | Startup speed preservation |
| Stale-while-revalidate is preferred over cache-then-network for most content | Freshness with speed |

### Cache Layers

| Layer | Content | Eviction |
|---|---|---|
| Memory | Active session data, current view model | On navigation, on memory pressure |
| Local (disk) | Cached API responses, thumbnails, reference data | TTL-based (see [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) §15) |
| Service worker (PWA) | App shell, static assets, API responses | Install-time cache, updated on service worker update |
| Platform HTTP cache | Images, fonts, scripts | Standard HTTP cache headers |

---

## 10. Background Work

### Rules

| Rule | Rationale |
|---|---|
| Background work runs after the app is interactive, not during startup | Startup priority |
| Background work is throttled when the user is actively interacting | Main thread availability |
| Background sync (if implemented) runs on a schedule, not continuously | Battery and data efficiency |
| Background tasks show a subtle indicator (activity spinner, sync badge) | User awareness |
| Heavy computation (image processing, data import) runs in a worker thread | No main thread blocking |
| Background work is cancelled when the app is suspended or terminated | No orphaned processes |

---

## 11. Battery Usage

### Rules

| Rule | Rationale |
|---|---|
| The application does not prevent device sleep or display sleep | No background power drain |
| Continuous network polling is replaced with push notifications or server-sent events | Battery-efficient data freshness |
| Animation frame rate is reduced when the device is in low-power mode | Battery awareness |
| GPS / location tracking is requested per-session, not persistently | Location battery drain prevention |
| Background sync frequency decreases when the device is on battery (vs. charging) | Battery-aware sync |
| The application does not perform significant computation while backgrounded | System background penalty |

### Battery Impact Targets

| Activity | Acceptable Drain |
|---|---|
| Normal usage (30 minutes) | ≤ 3% battery |
| Sync operation (1 minute) | ≤ 0.5% battery |
| Background sync (5 minutes) | ≤ 1% battery |

---

## 12. Memory Usage

### Rules

| Rule | Rationale |
|---|---|
| Memory usage does not grow unbounded over a session | No memory leaks |
| Memory is released when views or screens are dismissed | No orphaned references |
| Large datasets are paginated or virtualized, not loaded entirely into memory | Memory budget control |
| Images are decoded at display size, not source size | Memory-efficient image handling |
| Cached content is evicted under memory pressure (OS memory warning) | Cooperative memory management |
| Memory leaks are caught by CI profiling | Regression prevention |

### Memory Targets

| Platform | Typical Working Set | Maximum Before Warning |
|---|---|---|
| Web | ≤ 100 MB | 200 MB |
| Desktop (Windows / macOS) | ≤ 200 MB | 400 MB |
| Mobile (iOS / Android) | ≤ 150 MB | 300 MB |

---

## 13. Image & Media Optimization

### Image Rules

| Rule | Rationale |
|---|---|
| Images are served at the display dimensions — never larger | Bandwidth and memory efficiency |
| Images use modern formats: WebP (web), AVIF (where supported), JPEG XL (future) | Compression efficiency |
| PNG is used only when transparency is required and WebP is not supported | Appropriate format selection |
| SVG is used for icons, logos, and illustrations | Resolution-independent, small file size |
| Raster images have multiple resolution variants (1x, 2x, 3x) | Retina display support |
| Images are lazy-loaded (below-the-fold, offscreen) | Initial load performance |
| Image dimensions are specified in markup to prevent layout shift | CLS prevention |
| Maximum image file size is enforced per context (thumbnails ≤ 50 KB, full-size ≤ 500 KB) | Load time budgets |

### Media Rules

| Rule | Rationale |
|---|---|
| Video is not autoplayed with sound | User control |
| Video is compressed to minimum acceptable quality | Bandwidth consideration |
| Audio is loaded on demand, not preloaded | Bandwidth efficiency |
| Media elements expose playback controls | User control |
| Streaming media adapts quality to network conditions (HLS/DASH) | Adaptive bitrate |

---

## 14. Font Loading

### Rules

| Rule | Rationale |
|---|---|
| Font files are served with long-lived cache headers (1 year) | Cache persistence |
| Fonts are preloaded in the document `<head>` (web) or included in the app bundle (native) | Eliminate FOIT (Flash of Invisible Text) |
| A fallback font is specified to display text before the custom font loads | Prevent invisible text |
| `font-display: swap` (web) ensures text is visible immediately | Instant readability |
| Font subsetting removes unused glyphs | File size reduction |
| Variable fonts are preferred over multiple weight files | Single file, multiple weights |
| Font loading is monitored — it should not contribute to CLS (Cumulative Layout Shift) | Visual stability |

### Font File Budgets

| Font | Maximum Size | Notes |
|---|---|---|
| Latin-only variable font | ≤ 50 KB (woff2) | Subsetted |
| Extended Latin + Cyrillic | ≤ 100 KB (woff2) | Subsetted |
| Full character set (CJK, Arabic, etc.) | ≤ 500 KB (woff2) | Subsetted to used characters |

---

## 15. Platform-Specific Performance Expectations

### Web

| Metric | Target |
|---|---|
| Largest Contentful Paint (LCP) | ≤ 2.5 seconds |
| Interaction to Next Paint (INP) | ≤ 200ms |
| Cumulative Layout Shift (CLS) | ≤ 0.1 |
| First Contentful Paint (FCP) | ≤ 1.5 seconds |
| Time to Interactive (TTI) | ≤ 3.5 seconds |
| Total Blocking Time (TBT) | ≤ 200ms |

### Desktop (Windows / macOS)

| Metric | Target |
|---|---|
| Cold start to interactive | ≤ 2 seconds |
| Warm start to interactive | ≤ 0.5 seconds |
| Window resize / DPI change | ≤ 200ms to re-render |
| Context menu open | ≤ 100ms |
| File open (native format) | ≤ 0.5 seconds |
| File open (import, non-native) | ≤ 3 seconds |

### Mobile (iOS / Android)

| Metric | Target |
|---|---|
| Cold start to interactive | ≤ 2 seconds |
| Warm start to interactive | ≤ 0.5 seconds |
| Screen rotation | ≤ 200ms to re-render |
| Tab switch | ≤ 200ms |
| Scroll jank | 0 dropped frames in > 95% of scrolls |

### PWA

| Metric | Target |
|---|---|
| Cold start (offline, from service worker) | Instant (< 200ms) |
| Cold start (online, first visit) | Matches web targets |
| Install prompt to usable | ≤ 3 seconds |
| Offline navigation | Instant (< 200ms) |

---

## 16. Web Vitals

### Core Web Vitals (Web / PWA)

Every Kovina web application and PWA targets:

| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5s | 2.5s – 4.0s | > 4.0s |
| INP (Interaction to Next Paint) | ≤ 200ms | 200ms – 500ms | > 500ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | 0.1 – 0.25 | > 0.25 |

### Web Vitals Rules

| Rule | Rationale |
|---|---|
| Core Web Vitals are measured in CI for every deployment | Regression detection |
| A deployment that degrades a Core Web Vital below "Good" is blocked | Quality gate |
| LCP is optimized before FCP — the user cares most about the largest element appearing | User-perceived priority |
| CLS is prevented by reserving space for dynamic content (images, ads, embeds) | Layout stability |

---

## 17. Desktop App Responsiveness

### Rules

| Rule | Rationale |
|---|---|
| All interactions respond within 100ms | Perceived fluidity |
| Long-running operations (> 1 second) show a progress bar or spinner | User patience management |
| The main thread is never blocked for more than 50ms consecutively | UI thread availability |
| Multi-window operations are non-blocking between windows | Independent responsiveness |
| File I/O is asynchronous — never on the UI thread | No UI freeze during file operations |
| Large file processing shows progress with cancel option | User control |

---

## 18. Mobile App Responsiveness

### Rules

| Rule | Rationale |
|---|---|
| Touch response (highlight, press state) within 50ms | Instant tactile feedback |
| Scroll is smooth at 60fps minimum | No jank |
| Keyboard appearance does not cause layout jumps | Visual stability |
| Orientation change completes within 200ms | Fast adaptation |
| Tab bar / bottom navigation switches within 200ms | Instant navigation feel |
| Pull-to-refresh shows immediate visual feedback | Perceived responsiveness |

---

## 19. Low-End Device Expectations

### Definition

Low-end devices are defined as:

- **Mobile:** Devices with ≤ 3 GB RAM, ≥ 3 years old, or running an OS version 3+ years old.
- **Desktop:** Devices with ≤ 8 GB RAM, HDD (not SSD), integrated graphics, ≥ 5 years old.
- **Web:** Devices with slow CPUs, limited memory, or running on 3G/2G connections.

### Performance Targets on Low-End Devices

| Scenario | Target |
|---|---|
| Cold start | ≤ 4 seconds to interactive |
| Navigation | ≤ 500ms |
| Scroll | 30fps minimum (no dropped frame clusters) |
| Read content | ≤ 2 seconds to readable content |
| Data mutation | ≤ 200ms feedback |

### Rules for Low-End Devices

| Rule | Rationale |
|---|---|
| Animations are reduced or disabled automatically on low-end hardware | Preserve frame rate |
| Heavy features (image editing, animation-heavy views) are flagged and tested on low-end devices | Equitable experience |
| The application does not crash or become unusable on low-end devices | Minimum viable experience |
| Memory usage is tested on low-end device profiles before release | Memory budgeting |

---

## 20. Profiling Requirements

### When to Profile

| Scenario | Profiling Required |
|---|---|
| Before every release | Full performance profile |
| After adding a new feature | Feature-specific profile |
| After upgrading a major dependency | Dependency impact profile |
| When a performance regression is reported | Regression investigation |
| On every CI run (automated) | Lighthouse CI (web), XCTest performance (iOS), Macrobenchmark (Android) |

### What to Profile

| Metric | Tool |
|---|---|
| Startup time | Platform-specific (Xcode Organizer, Android Studio, Chrome DevTools) |
| Bundle size | `source-map-explorer`, `webpack-bundle-analyzer`, platform tooling |
| Frame rate | Platform profiler (Xcode, Android Studio, Chrome DevTools) |
| Memory usage | Platform profiler, heap snapshots |
| Network requests | Platform network inspector |
| Web Vitals (web) | Lighthouse CI, Web Vitals API |
| Disk usage | Application storage inspector |
| Battery impact | Platform battery profiler (Xcode, Android Studio) |

### Profiling Rules

| Rule | Rationale |
|---|---|
| Profiles are captured on a mid-range device, not the developer's machine | Real-world performance |
| Profiles are captured in release mode, not debug mode | Accurate measurements |
| Profile results are documented and compared against the previous release | Trend visibility |
| Performance regressions are treated as bugs with the same priority as functional regressions | No tolerance |

---

## 21. Performance QA Checklist

- [ ] Cold start meets the platform budget (≤ 2 seconds mobile/desktop, ≤ 3 seconds web).
- [ ] Warm start meets the platform budget (≤ 0.5 seconds).
- [ ] All interactions respond visibly within 100ms.
- [ ] Scroll is smooth at 60fps on a mid-range device.
- [ ] No dropped frames during navigation transitions.
- [ ] Initial bundle size is within the platform budget.
- [ ] Routes are code-split (each route loads independently).
- [ ] Images are optimized (proper format, dimensions, lazy loading).
- [ ] Fonts use `font-display: swap` (web) or equivalent instant-display strategy.
- [ ] Web Vitals (LCP, INP, CLS) meet "Good" targets.
- [ ] App works offline with cached shell and previously viewed content.
- [ ] Memory usage is stable over a 30-minute session (no leaks).
- [ ] Background work does not block the main thread.
- [ ] Dependencies are reviewed for size impact.
- [ ] Performance profile was captured on a mid-range device in release mode.
- [ ] No synchronous network calls on the main thread.
- [ ] Lists beyond 100 items use virtualization.
- [ ] Large files show progress indicators with cancel options.
- [ ] Application works on low-end devices (tested).
- [ ] Animations use only GPU-composited properties (transform, opacity).
- [ ] No layout thrashing in scroll handlers.
- [ ] CI runs performance regression checks.

---

## 22. Agent Checklist

Before an AI agent declares performance work complete:

### Startup

- [ ] Cold start meets budget: ≤ 2 seconds (mobile/desktop), ≤ 3 seconds (web).
- [ ] Immediate feedback (splash/skeleton) appears within 200ms.
- [ ] Non-critical initialization is deferred until after interactive.
- [ ] Startup does not block on network response.

### Interaction

- [ ] Every tap/click produces visible feedback within 100ms.
- [ ] Navigation transitions complete within 300ms.
- [ ] No interaction blocks the main thread.
- [ ] Operations over 3 seconds show progress estimates.

### Rendering

- [ ] Frame time meets 16ms (60fps) or 8ms (120fps) for animations.
- [ ] Virtualized lists for > 100 items.
- [ ] GPU-composited properties only for animations.
- [ ] No layout thrashing in scroll or resize handlers.

### Bundles

- [ ] Initial JavaScript bundle is within budget (≤ 200 KB gzipped web, ≤ 150 KB mobile web).
- [ ] Routes are code-split.
- [ ] Heavy libraries are lazy-loaded.
- [ ] No unnecessary or duplicate dependencies.

### Images & Fonts

- [ ] Images are served at display size in modern formats.
- [ ] Images are lazy-loaded below the fold.
- [ ] Fonts use `font-display: swap` (web).
- [ ] Fonts are subsetted.

### Offline

- [ ] App shell loads instantly offline (cached).
- [ ] Previously viewed content is available offline.
- [ ] Navigation works offline.

### Web Vitals (Web / PWA)

- [ ] LCP ≤ 2.5 seconds.
- [ ] INP ≤ 200ms.
- [ ] CLS ≤ 0.1.

### Testing

- [ ] Performance profile was captured on a mid-range device.
- [ ] Profile was captured in release mode.
- [ ] No memory leaks over 30 minutes of usage.
- [ ] CI runs performance regression checks.
- [ ] Low-end device testing passed.

### Prohibited Patterns

- [ ] No synchronous network calls on main thread.
- [ ] No continuous network polling (use push or SSE).
- [ ] No animations that trigger layout (width, height, top, left).
- [ ] No unloaded fonts causing invisible text (FOIT).
- [ ] No images served at larger than display size.
- [ ] No memory leaks (verified by profiling).

---

*This standard defines the canonical performance requirements for all Kovina projects. Platform-specific standards reference this document instead of defining their own performance rules. Companion to [DATA_STORAGE_STANDARD.md](../shared/DATA_STORAGE_STANDARD.md) (cache architecture), [PRODUCT_ARCHITECTURE_PLAYBOOK.md](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md) (performance as an architectural concern), [TESTING_STANDARD.md](../process/TESTING_STANDARD.md) (performance testing methodology), and platform standards (platform-specific performance expectations).*
