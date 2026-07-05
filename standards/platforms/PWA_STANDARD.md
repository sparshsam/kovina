# PWA Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.0.0](VERSION.md)
>
> Defines mandatory requirements for every Kovina Open project that ships a Progressive Web App. Web-First applications must follow this standard. Showcase/Companion websites should follow it where applicable.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Eligibility](#2-eligibility)
3. [Web App Manifest](#3-web-app-manifest)
4. [Service Worker](#4-service-worker)
5. [Offline Support](#5-offline-support)
6. [Installation](#6-installation)
7. [Splash Screen & Launch](#7-splash-screen--launch)
8. [Update Flow](#8-update-flow)
9. [Caching Strategy](#9-caching-strategy)
10. [Accessibility](#10-accessibility)
11. [Security Requirements](#11-security-requirements)
12. [Testing Checklist](#12-testing-checklist)
13. [Agent Checklist](#13-agent-checklist)

---

## 1. Philosophy

A PWA is not a website with a manifest. It is a first-class application surface that users install, launch from their home screen, and use offline. Every Kovina PWA must feel native in performance, behavior, and reliability — not like a website running in a browser chrome.

The PWA is the primary delivery mechanism for Web-First (Archetype A) applications. It must not be treated as a secondary or progressive enhancement. The PWA experience is the baseline; the full browser experience builds on it.

---

## 2. Eligibility

A Kovina project qualifies for PWA status when it meets all of the following:

| Criterion | Requirement |
|---|---|
| Archetype | Web-First Application (Archetype A per [WEBSITE_STANDARD.md](../platforms/WEBSITE_STANDARD.md#2-two-archetypes)) |
| Core functionality | A meaningful subset of the application works entirely offline |
| Install triggers | The app is useful enough to justify home-screen installation |
| User data | Data is stored locally (IndexedDB, Cache API) and survives cache clears |
| Security | All pages are served over HTTPS with a valid TLS certificate |

Projects that do not meet these criteria may still implement PWA features incrementally, but may not advertise themselves as PWA-ready.

---

## 3. Web App Manifest

### Required Properties

```json
{
  "name": "{Full Application Name}",
  "short_name": "{Short Name — max 12 characters}",
  "description": "{Same as website meta description}",
  "start_url": "/",
  "display": "standalone",
  "orientation": "any",
  "theme_color": "#000000",
  "background_color": "#000000",
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
  ],
  "categories": ["{Category — e.g. "productivity", "utilities", "finance"}"]
}
```

### Rules

- `display` must be `"standalone"`. No exceptions for Kovina Web-First apps.
- `theme_color` and `background_color` must match the app's dark mode background (`#000000` for true-black Kovina apps, or per-app brand dark background).
- Icon requirements (sizes, formats, maskable variant) are defined in the [App Icon Standard](../shared/APP_ICON_STANDARD.md#5-pwa-application-icons).
- `short_name` must be 12 characters or fewer. Use the "Open" prefix short form (e.g. "OpenLedger" → "OpenLedger" at 10 chars; "OpenScrabble" → "OScrabble" if needed).
- `orientation` must be `"any"` unless the application has a justified orientation constraint.
- A `scope` should be set to `/` unless the app is a sub-path application.

### Optional but Recommended

```json
{
  "iarc_rating_id": "{IARC rating ID if applicable}",
  "screenshots": [],
  "prefer_related_applications": false,
  "related_applications": [
    {
      "platform": "windows",
      "url": "https://apps.microsoft.com/store/detail/{id}"
    }
  ]
}
```

---

## 4. Service Worker

### Registration

- The service worker must be registered from the application's main entry point (or a dedicated script loaded on first interaction).
- Registration must use a scoped URL (e.g. `/sw.js`) that covers all application paths.
- The service worker must not be registered from a third-party origin.
- Registration must handle errors gracefully — failure to register must not break the application.

```javascript
if ("serviceWorker" in navigator) {
  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
  } catch (error) {
    // Log quietly. Do not interrupt the user.
  }
}
```

### Lifecycle

| Event | Handler Requirement |
|---|---|
| `install` | Pre-cache the application shell (HTML, CSS, JS, fonts, essential assets). |
| `activate` | Clean up old caches. Take control of all clients immediately. |
| `fetch` | Serve cached content when available; fall back to network. |

- The `install` event must call `skipWaiting()`.
- The `activate` event must call `clients.claim()`.
- The service worker must never cache opaque responses from third-party origins.

### Restrictions

- The service worker file must be served from the root of the application scope.
- The service worker file must be served with `Service-Worker-Allowed` header or be within its own scope.
- The service worker must have a `Content-Type: application/javascript` or `text/javascript` response header.
- The service worker must not import scripts from CDNs or third-party origins.
- The service worker must not make network requests during `install` that depend on user authentication.

---

## 5. Offline Support

### Mandatory Offline Content

The following content must be available offline on first load (pre-cached during service worker `install`):

| Asset | Rationale |
|---|---|
| Application shell HTML | Full page structure of all core routes |
| CSS | All application styles (dark and light mode) |
| JavaScript | All application logic bundles |
| Fonts | All locally-hosted font files |
| App icons | All manifest icon sizes |
| Landing/marketing content | For Archetype B: the full landing page |

### Mandatory Offline Functionality (Archetype A)

| Feature | Requirement |
|---|---|
| Read cached data | Previously loaded content is viewable offline |
| Navigation | App shell navigates correctly without network |
| State display | The UI renders user's last-known state |

### Graceful Degradation

- When the network is unavailable, the app must display a consistent offline indicator.
- Write operations that fail due to network absence must queue and retry — silently, without data loss.
- The offline indicator must be informative, not alarming: a subtle inline text, not a full-screen overlay.

### Prohibited

- Do not show browser-default offline pages.
- Do not display generic "No internet connection" alerts.
- Do not crash or hang when fetch requests fail.
- Do not silently discard user input on offline writes.

---

## 6. Installation

### Install Prompt

- The application must support the `beforeinstallprompt` event where available.
- The install prompt may be deferred but must be presented within the first three meaningful user sessions.
- The prompt must be triggered by a user gesture (button tap, menu selection).
- The prompt must not appear on first visit.
- The prompt must not appear more than once per session.
- The prompt must not appear while the user is in the middle of a critical task.

### Install UI

- The install button should be placed in the application header or navigation area.
- Label: "Install App" or "Add to Home Screen".
- The install button must be hidden once the application is installed.
- On platforms that support it, follow the platform's install UI convention.

---

## 7. Splash Screen & Launch

### Splash Screen

The browser-generated splash screen is controlled by the Web App Manifest properties:

| Property | Controls | Value |
|---|---|---|
| `background_color` | Splash screen background | `#000000` (or per-app brand dark background) |
| `theme_color` | Status bar color | `#000000` |
| Icons | Center image | 512×512 PNG with `purpose: "any maskable"` |

The splash screen must:
- Appear immediately on launch.
- Transition smoothly to the application shell.
- Use the same background color as the app's dark mode.
- Not display a white flash (this indicates incorrect `background_color`).

### Launch Experience

- The application shell must render and be interactive within 3 seconds on a mid-range device over 3G.
- First paint must show meaningful content — not a blank screen, not a loading spinner.
- If content depends on network availability, the shell and last-known state must display immediately while fresh content loads in the background.

---

## 8. Update Flow

### Service Worker Updates

When a new service worker is detected:

1. The new service worker installs in the background.
2. The user is notified via a subtle, non-blocking indicator that an update is available.
3. The notification includes an action to apply the update.
4. When the user triggers the update, the new service worker activates and the page reloads.
5. The update must preserve all local application state.

### Update Notification

- Update notification: inline banner or snackbar — never a modal dialog.
- Text: "An update is available." with a "Reload" or "Update" action.
- The notification must not interrupt the user's current task.
- If the user dismisses the notification, it should reappear on the next visit.

### Automatic Updates

- On subsequent page loads (when the user returns to the app with the tab still open), updates should apply automatically without notification.
- Critical security updates may trigger an automatic reload with user notification.

---

## 9. Caching Strategy

### Strategy Selection

| Content Type | Strategy | Rationale |
|---|---|---|
| Application shell (HTML) | Cache First, Network Fallback | Shell rarely changes; serve from cache instantly |
| CSS, JS bundles | Cache First | Content-hashed URLs; immutable once cached |
| Fonts | Cache First | Rarely change; critical for rendering |
| App icons, images | Cache First | Content-hashed or versioned URLs |
| API responses (read) | Network First, Cache Fallback | Fresh data preferred; cached data acceptable offline |
| API responses (write) | Network Only | Writes must reach the server |
| Third-party resources | Network Only (do not cache) | Avoid opaque response caching |

### Cache Management

- Each cache version must be named with the application version (e.g. `kovina-v1-appshell`).
- On service worker activation, old caches from previous versions must be deleted.
- Maximum cache size should be bounded (recommended: 50MB).
- Cache entries should have a maximum age where practical.

### Cache Invalidation

- Static assets with content-hashed filenames are implicitly invalidated — the old URL is never requested again.
- The application shell HTML must have a short cache lifetime or be versioned.
- API response caches must respect `Cache-Control` headers where present.
- Manual cache clearing must be available from a settings or about page.

---

## 10. Accessibility

All PWA accessibility requirements are defined in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md). The same web accessibility rules that apply to [WEBSITE_STANDARD.md](../platforms/WEBSITE_STANDARD.md#11-accessibility) apply to the PWA surface.

Additionally:

- The service worker must never interfere with accessibility tools (no DOM mutations that confuse screen readers).
- Offline indicator must be announced to screen readers when network status changes.
- Install prompts must be keyboard-dismissible and reachable by screen reader.

---

## 11. Security Requirements

| Requirement | Standard |
|---|---|
| HTTPS | Required for all pages. No mixed content. |
| TLS version | TLS 1.2 minimum. TLS 1.3 recommended. |
| Content Security Policy | CSP header must be set. Inline scripts must use nonces or hashes. |
| Service Worker scope | Must not exceed the service worker script's path scope. |
| Cache isolation | No shared caches across origins. |
| Web crypto | Use the Web Crypto API for local cryptographic operations. |
| Permissions API | Request permissions only in response to user gesture. |

### Prohibited

- No `eval()` or `new Function()` in service worker code.
- No `document.write()` in application code.
- No execution of remotely fetched code (no `import()` from dynamic user-controlled URLs).
- No storage of secrets (tokens, keys) in `localStorage` — use `sessionStorage` or in-memory for session tokens, and the Web Crypto API for key storage.

---

## 12. Testing Checklist

Before shipping a PWA update:

- [ ] Lighthouse PWA audit passes all required checks.
- [ ] Web App Manifest is valid JSON with all required fields.
- [ ] Service worker registers without errors.
- [ ] Application shell loads from cache when network is disconnected.
- [ ] All core routes render offline.
- [ ] CSS and fonts render correctly in offline mode.
- [ ] App launches in standalone mode (no browser chrome).
- [ ] Splash screen displays with correct background_color.
- [ ] Install prompt appears on the second or third visit.
- [ ] Install flow completes and app launches from home screen.
- [ ] Update notification displays when a new service worker is available.
- [ ] Update flow applies without data loss.
- [ ] Old caches are cleaned up after update.
- [ ] All images load in offline mode.
- [ ] Offline indicator displays when disconnected.
- [ ] Write operations queue and retry when coming back online.
- [ ] Cache is bounded (does not grow unboundedly).
- [ ] No mixed content warnings.
- [ ] CSP header is present and does not block application resources.
- [ ] Tested on: Chrome desktop, Chrome Android, Edge, Samsung Internet.
- [ ] Tested on: Slow 3G throttling in DevTools.
- [ ] Tested on: Airplane mode with full cache clear.

---

## 13. Agent Checklist

Before an AI agent declares PWA work complete:

### Manifest

- [ ] `name`, `short_name`, `description` are set to non-generic, app-specific values.
- [ ] `start_url` is `/`.
- [ ] `display` is `"standalone"`.
- [ ] `background_color` and `theme_color` match the app's dark mode background.
- [ ] Icon array includes 192×192 and 512×512 (with maskable purpose).
- [ ] Manifest is linked from every page's `<head>`.

### Service Worker

- [ ] Service worker registers on all supported browsers without errors.
- [ ] `install` event pre-caches app shell, CSS, JS, fonts, and icons.
- [ ] `activate` event deletes old caches and calls `clients.claim()`.
- [ ] `fetch` event handler serves cached content first, falls back to network.
- [ ] Service worker does not cache third-party or opaque responses.
- [ ] `skipWaiting()` is called in the `install` event.
- [ ] Service worker file is served from the root scope with correct MIME type.

### Offline

- [ ] App shell navigates correctly without network.
- [ ] Previously loaded data is viewable offline.
- [ ] Offline indicator is subtle and informative.
- [ ] Failed write operations queue and retry.
- [ ] No data loss on offline writes.
- [ ] No browser-default offline pages appear.
- [ ] Full offline test passed (airplane mode).

### Installation

- [ ] `beforeinstallprompt` is captured and deferred.
- [ ] Install prompt appears within first 3 sessions.
- [ ] Install button is hidden after installation.
- [ ] App launches in standalone mode after installation.
- [ ] Splash screen displays with correct colors.

### Updates

- [ ] New service worker detection triggers an update notification.
- [ ] Update notification is non-blocking (no modal).
- [ ] Update applies without data loss.
- [ ] Old caches are cleaned up on activation.
- [ ] Automatic updates work on return visits.

### Security

- [ ] All pages are served over HTTPS.
- [ ] CSP header is present.
- [ ] No `eval()` in service worker code.
- [ ] No secrets stored in `localStorage`.
- [ ] No mixed content.

---

*This standard applies to every Kovina PWA. Companion to [WEBSITE_STANDARD.md](../platforms/WEBSITE_STANDARD.md) for Archetype classification and [DESIGN_PLAYBOOK.md](../foundational/DESIGN_PLAYBOOK.md) for visual requirements.*
