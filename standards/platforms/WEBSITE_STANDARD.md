# Website Standard

> Version 1.0 — July 2026
>
> Standards version: [v1.0.0](VERSION.md)
>
> Defines mandatory structure, UX, assets, performance, and release requirements for every Kovina Open project's website surface. Every Kovina project that has a public website follows this standard — regardless of whether that website IS the product or a showcase for one.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Two Archetypes](#2-two-archetypes)
3. [Domain & URL Convention](#3-domain--url-convention)
4. [Required Pages](#4-required-pages)
5. [Page Structure Requirements](#5-page-structure-requirements)
6. [SEO & Metadata](#6-seo--metadata)
7. [Performance Requirements](#7-performance-requirements)
8. [Hosting & Infrastructure](#8-hosting--infrastructure)
9. [Branding & Content](#9-branding--content)
10. [Dark & Light Mode](#10-dark--light-mode)
11. [Accessibility](#11-accessibility)
12. [Legal Pages](#12-legal-pages)
13. [Error & Edge States](#13-error--edge-states)
14. [Maintenance & Monitoring](#14-maintenance--monitoring)
15. [QA Checklist](#15-qa-checklist)
16. [Agent Checklist](#16-agent-checklist)
16. [Agent Checklist](#16-agent-checklist)

---

## 1. Philosophy

A Kovina website is never a marketing page first. It is either **the product itself** or a **showcase that leads to the product**. In both cases, it must be calm, fast, privacy-respecting, and free of tracking, pop-ups, engagement hooks, and dark patterns.

The website is the public face of the application. It must communicate the product's purpose within seconds, work without JavaScript where possible, and never demand the user's attention.

---

## 2. Two Archetypes

Every Kovina Open project falls into exactly one of two website archetypes. The archetype is chosen at project inception and documented in the project's `README.md` and `CLAUDE.md`. It cannot change without ecosystem review.

### Archetype A: Web-First Application

The website **is the product**. Users interact with it directly in the browser.

**Applies to:** OpenPalette, OpenProof, OpenLedger, OpenSprout, OpenScrabble, OpenSend, OpenConvert, OpenJournal, WordWise, Hisstastic, Elora Vault, SheSafe

**Requirements:**

| Area | Requirement |
|---|---|
| PWA | **Required.** Must meet all PWA_STANDARD.md requirements. |
| Offline | Core functionality works offline. Read operations always work. Write operations queue gracefully. |
| JS dependency | The app may require JavaScript to function, but the landing/marketing content must be server-rendered and readable without JS. |
| State persistence | User data persists across sessions. Local-first storage preferred. |
| Share target | Where applicable, register as a share target (file upload, URL, text). |
| Install prompt | Must support PWA installation on supported browsers. |
| Deep linking | Every significant entity/page has a shareable URL. |

### Archetype B: Showcase / Companion Website

The website presents the product and directs users to the primary platform (Desktop, Android, iOS, or Store). The website itself is not the primary way users interact with the application.

**Applies to:** OpenReader, OpenSnap, OpenTone, World Clock Widget

**Requirements:**

| Area | Requirement |
|---|---|
| PWA | **Optional but recommended.** If implemented, must meet all PWA_STANDARD.md requirements. |
| Primary CTA | The most prominent button on the page must link to the primary download or store page. |
| Screenshots | At least one hero-quality screenshot of the app in use. |
| Feature sections | At least three sections explaining what the app does, with supporting visuals. |
| Platform badges | Store badges (Microsoft Store, App Store, Google Play) must use official asset formats where available. |
| App version | Display current version number in the footer or about section. |
| System requirements | List minimum system requirements (OS version, RAM, architecture) on a dedicated or in-page section. |
| Release notes | Link to CHANGELOG.md or a rendered release notes page. |

### Archetype Decision

```
Is the primary user interaction in a browser?
  ├── Yes → Web-First Application (Archetype A)
  └── No  → Is the primary distribution through an app store?
              ├── Yes → Showcase / Companion Website (Archetype B)
              └── No  → Web-First Application (Archetype A)
```

---

## 3. Domain & URL Convention

### Subdomain Convention

Every Kovina web application uses the `{shortname}.kovina.org` subdomain pattern.

| Full Name | Slug | URL |
|---|---|---|
| OpenReader | reader | reader.kovina.org |
| OpenSnap | snap | snap.kovina.org |
| OpenSend | send | send.kovina.org |
| OpenLedger | ledger | ledger.kovina.org |
| OpenPalette | palette | palette.kovina.org |
| OpenTone | tone | tone.kovina.org |
| OpenSprout | sprout | sprout.kovina.org |
| OpenJournal | journal | journal.kovina.org |
| OpenProof | proof | proof.kovina.org |
| OpenConvert | convert | convert.kovina.org |
| OpenScrabble | scrabble | scrabble.kovina.org |
| Elora Vault | vault | vault.kovina.org |

**Exceptions:** Apps with established third-party URLs retain them (Hisstastic, WordWise, Chess by Sparsh, SheSafe, Sparsh Sam).

### URL Structure

```
https://{subdomain}.kovina.org/
                        /app/{path}     (Archetype A — application routes)
                        /privacy        (required)
                        /terms          (required)
                        /about          (recommended)
```

- All paths are lowercase, hyphen-delimited for multi-word segments.
- No file extensions in URLs.
- No trailing slashes except the root.
- Query parameters for state only — never for page identity.

### Redirects

- `www.{subdomain}.kovina.org` must 301 redirect to `{subdomain}.kovina.org`.
- `kovina.org/apps/{slug}` must 301 redirect to the app's subdomain.
- All historical URLs must 301 to their current equivalents.

---

## 4. Required Pages

### Page Inventory (Both Archetypes)

| Page | Archetype A | Archetype B | Notes |
|---|---|---|---|
| Home / Landing | ✓ Required | ✓ Required | Hero, value proposition, CTA |
| Privacy | ✓ Required | ✓ Required | Data handling and privacy policy |
| Terms | ✓ Required | ✓ Required | Terms of service / use |
| 404 | ✓ Required | ✓ Required | Custom not-found page |
| About | ◯ Recommended | ◯ Recommended | Project background, team |

### Home / Landing Page Requirements

- **Hero**: Directly on the canvas. Name, tagline, primary CTA. No hero card or container.
- **Value proposition**: One editorial paragraph maximum. Explains what the app does and why it exists.
- **Screenshots / demo**: At least one high-quality visual showing the app in use.
- **CTA**: The primary action the user should take. Pill-shaped, accent-colored.
- **Footer**: Brand tagline, version, links (see [Branding & Asset Requirements](#9-branding--asset-requirements)).

### Additional Pages (Archetype A)

| Page | Requirement |
|---|---|
| Application routes | Every significant feature has its own route. |

### Additional Pages (Archetype B)

| Page | Requirement |
|---|---|
| Download / Get | Download options for all distribution platforms |
| Features | Detailed feature listing with screenshots |
| Changelog | Rendered release notes (or direct link to CHANGELOG.md) |

---

## 5. Page Structure Requirements

Every Kovina website page must follow this structural skeleton:

```
<!DOCTYPE html>
<html>
  <head>
    <!-- SEO metadata (required) -->
    <!-- Open Graph / Twitter Card tags (required) -->
    <!-- Preload critical assets (recommended) -->
    <!-- PWA manifest link (if applicable) -->
  </head>
  <body>
    <header>    <!-- Universal, consistent across all pages -->
    <main>      <!-- Primary content -->
    <footer>    <!-- Universal, consistent across all pages -->
  </body>
</html>
```

### Rules

- **Header**: Consistent across all pages. Logo/name left, navigation right. Sticky or static.
- **Footer**: Consistent across all pages. Brand tagline, legal links, GitHub link, version.
- **Navigation**: Maximum 4–5 links. No dropdowns, no nested menus.
- **No modal overlays for marketing.** No newsletter sign-ups. No cookie consent walls (Kovina does not use tracking cookies).
- **Every page must be readable at 100% browser zoom** at 375px, 768px, 1280px, and 1920px widths.

---

## 6. SEO & Metadata

### Required Meta Tags (Every Page)

```html
<title>{App Name} — {Tagline}</title>
<meta name="description" content="One-sentence description of what this app does.">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph -->
<meta property="og:title" content="{App Name} — {Tagline}">
<meta property="og:description" content="{Same as meta description}">
<meta property="og:image" content="https://{domain}/social-preview.png">
<meta property="og:url" content="https://{domain}{path}">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{App Name} — {Tagline}">
<meta name="twitter:description" content="{Same as meta description}">
<meta name="twitter:image" content="https://{domain}/social-preview.png">
```

### Required Structured Data (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{App Name}",
  "applicationCategory": "{Category}",
  "operatingSystem": "Web, Windows, macOS, Android, iOS",
  "description": "{Same as meta description}",
  "url": "https://{domain}/",
  "image": "https://{domain}/social-preview.png",
  "author": {
    "@type": "Person",
    "name": "Sparsh Sam",
    "url": "https://sparshsam.github.io"
  },
  "license": "https://www.gnu.org/licenses/agpl-3.0.html",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### sitemap.xml

- Required for all public websites.
- Include all canonical pages.
- Exclude parameterized URLs unless they represent distinct content.
- Auto-generated and deployed with every build.

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://{domain}/sitemap.xml
```

---

## 7. Performance Requirements

| Metric | Target | Hard Limit |
|---|---|---|
| First Contentful Paint (FCP) | < 1.5s | < 2.5s |
| Largest Contentful Paint (LCP) | < 2.0s | < 4.0s |
| Total Blocking Time (TBT) | < 100ms | < 300ms |
| Cumulative Layout Shift (CLS) | < 0.05 | < 0.1 |
| Time to Interactive (TTI) | < 3.0s | < 5.0s |
| Lighthouse Performance score | ≥ 95 | ≥ 85 |
| Page weight (total transferred) | < 500KB | < 1MB |
| JS bundle (initial render) | < 100KB | < 200KB |

### Hard Rules

- **No third-party scripts** for analytics, fonts, or widgets. Self-host everything.
- **No render-blocking resources** above the fold except critical CSS.
- All images must have explicit `width` and `height` attributes to prevent CLS.
- Fonts load with `font-display: swap` — no invisible text during font load.
- Below-the-fold images are lazy-loaded.
- Server-side render or static-generate all marketing/content pages.
- HTTP requests to first paint: ≤ 5.

---

## 8. Hosting & Infrastructure

| Requirement | Standard |
|---|---|
| Hosting | Static-first. Cloudflare Pages, Vercel, or equivalent edge network. |
| Custom domain | CNAME to hosting provider. Cloudflare proxy (orange cloud) DNS. |
| HTTPS | Enforced. Auto-redirect HTTP → HTTPS. TLS 1.2 minimum. |
| CDN | Edge cache for static assets. HTML may be edge-cached with short TTL or bypass. |
| Caching policy | `_headers` or equivalent: HTML uncached or short TTL; assets (`_next/static/*`, `/fonts/*`, `/images/*`) long-lived with content hash URLs. |
| Redirects | `www` → root 301. Protocol upgrade. |

### Prohibited

- No server-side analytics (Google Analytics, Plausible, Fathom, etc.).
- No cookie-based tracking.
- No third-party ad networks.
- No third-party font services (Google Fonts, Adobe Fonts).
- No social media embed scripts.
- No hotjar, fullstory, or session recording tools.

---

## 9. Branding & Content

### Branding Rules

- The Kovina wordmark appears in the header and footer.
- The app's own lockup or wordmark appears in the hero.
- No third-party branding on the homepage (store badges belong on download pages or in footers).
- Store badges (Microsoft Store, App Store, Google Play) use official asset formats.
- No stock photography, illustrations, or abstract decorative images.
- All screenshots must be real, current, and taken in dark mode (default) and light mode.
- Screenshots must show real data (or realistic mock data), not empty states.

### App Icons

All favicon, browser icon, Apple touch icon, PWA manifest icon, and social preview requirements are defined in the shared [App Icon Standard](../shared/APP_ICON_STANDARD.md). That document is the canonical reference — this section does not duplicate it.

Website-specific icon requirements:

| Icon | Section in APP_ICON_STANDARD |
|---|---|
| Favicon (SVG, ICO, PNG sizes) | [§4 Favicon & Browser Icons](../shared/APP_ICON_STANDARD.md#4-favicon--browser-icons) |
| Apple touch icon (180×180) | [§4 Favicon & Browser Icons](../shared/APP_ICON_STANDARD.md#4-favicon--browser-icons) |
| Social preview (1200×630) | [§11 Store Listing Assets](../shared/STORE_LISTING_STANDARD.md#14-platform-specific-asset-tables) |
| PWA manifest icons (192×192, 512×512) | [§5 PWA Application Icons](../shared/APP_ICON_STANDARD.md#5-pwa-application-icons) |

---

## 10. Dark & Light Mode

- **Dark mode is the default.** Light mode is a courtesy.
- Dark and light modes are independently designed — light mode is not an inversion of dark mode.
- The accent color (`#099019` or per-app brand color) is the same in both modes.
- Mode preference is persisted in `localStorage`.
- System preference (`prefers-color-scheme`) is respected on first visit.
- No flashing or FOUC on page load — mode is applied before first paint via inline `<script>` in `<head>`.
- No auto-switch based on time of day.

---

## 11. Accessibility

All web and PWA accessibility requirements are defined in the shared [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md). That document is the canonical reference — this section only lists website-specific additions.

### Website-Specific Requirements

| Requirement | Standard |
|---|---|
| Conformance level | WCAG 2.2 AA |
| Screen reader | NVDA (Windows), VoiceOver (macOS), TalkBack (Android) — test all three |
| Skip-to-content link | Required. First focusable element on every page |
| Landmark elements | `<nav>`, `<main>`, `<footer>` consistent across all pages |
| Reading order | DOM order must match visual order |

Every rule in the [Accessibility Standard](../shared/ACCESSIBILITY_STANDARD.md) applies.

---

## 12. Legal Pages

### Privacy Policy

Every public website must have a `/privacy` page that clearly states:

- What data is collected (if any).
- How data is stored and processed.
- Whether any third-party services have access to data.
- How users can request data deletion.
- Contact information for privacy inquiries.
- Date of last update.

Kovina apps collect no telemetry by default. The privacy policy should reflect this truthfully.

### Terms of Service

Every public website must have a `/terms` page that covers:

- License and usage rights.
- Disclaimer of warranties.
- Limitation of liability.
- Governing law.
- Contact information.

---

## 13. Error & Edge States

### Custom 404 Page

- Must exist. Must not be the server's default 404 page.
- Include: a brief message, a link to the homepage, a link to the project's GitHub issues (for broken link reports).
- Tone: calm and helpful. Do not use "Oops!" or similar.
- No illustrations, no animations, no decorative elements.

### Loading States (Archetype A)

- Use inline text or a minimal indicator — never skeleton screens.
- The most important content appears first, even if less important sections are still loading.
- Loading states must not cause layout shift.

### Empty States (Archetype A)

- Text only: title + description. No icons, no illustrations.
- If the empty state is a call to action, include one pill-shaped button.
- Never show an empty table, empty list, or blank area without explanation.

### Error States

- Errors are displayed inline, not in toasts or modals.
- Error text is actionable: tell the user what happened and what they can do about it.
- Network errors should offer a retry action.

---

## 14. Maintenance & Monitoring

### Uptime

| Metric | Target |
|---|---|
| Uptime | ≥ 99.9% |
| Response time (p95) | < 500ms |
| Build duration | < 3 minutes (static site) |

### Certificate Management

- TLS certificates must auto-renew (Cloudflare, Let's Encrypt, or hosting provider managed).
- Certificate expiry alerts must be configured.
- Certificate expiry must never exceed 90 days.

### URL Monitoring

- All public URLs must be checked periodically (≥ hourly).
- Broken link detection must be run before every deployment.
- External links (stores, GitHub) are verified on each release.

---

## 15. QA Checklist

Before any website deployment:

- [ ] All pages render at 375px, 768px, 1280px, and 1920px widths.
- [ ] No horizontal scrollbar at any common viewport width.
- [ ] All internal links work.
- [ ] All external links work (store pages, GitHub, documentation).
- [ ] All images load and have correct `alt` text.
- [ ] Dark and light modes render correctly on every page.
- [ ] Mode preference persists across page navigation.
- [ ] No flash of unstyled content (FOUC) on initial load.
- [ ] SEO meta tags are correct on every page.
- [ ] Open Graph and Twitter card previews render correctly.
- [ ] sitemap.xml is present and valid.
- [ ] robots.txt is present and correct.
- [ ] `_redirects` or equivalent is deployed.
- [ ] `_headers` or equivalent is deployed with correct caching policy.
- [ ] Custom 404 page is reachable and styled correctly.
- [ ] Lighthouse Performance score ≥ 95.
- [ ] No console errors.
- [ ] No broken image paths.
- [ ] All fonts load correctly (no fallback font visible after swap).
- [ ] Privacy and Terms pages are up to date.
- [ ] Version number is current in footer.

---

## 16. Agent Checklist

Before an AI agent declares website work complete, every item below must be verified:

### Structure

- [ ] The website archetype (Web-First or Showcase) is documented and its requirements are met.
- [ ] The page structure (Header → Main → Footer) is consistent across all pages.
- [ ] Navigation has 4–5 links maximum. No dropdowns. No nested menus.
- [ ] The hero sits directly on the canvas — no hero card or container.
- [ ] Every section justifies its existence. The page passes the Museum Test ([Architecture Playbook](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md#29-the-museum-test)).

### Performance

- [ ] No third-party scripts are loaded.
- [ ] All images have explicit `width` and `height` attributes.
- [ ] Fonts use `font-display: swap`.
- [ ] Below-the-fold images are lazy-loaded.
- [ ] Marketing/content pages are server-rendered or statically generated.
- [ ] Initial JS bundle is under 200KB.
- [ ] Lighthouse Performance score ≥ 95 confirmed.

### Accessibility

- [ ] One `<h1>` per page. Heading hierarchy is correct.
- [ ] All interactive elements are keyboard-accessible.
- [ ] Focus indicators are visible on all interactive elements.
- [ ] Touch targets ≥ 44×44px.
- [ ] All images have `alt` text. Decorative images use `alt=""`.
- [ ] Landmark regions are consistent across pages.
- [ ] `prefers-reduced-motion` disables all animations.
- [ ] Color contrast meets WCAG 2.2 AA.

### Dark / Light Mode

- [ ] Dark mode is designed first and passes as default.
- [ ] Light mode is independently designed (not inverted).
- [ ] Accent color is identical in both modes.
- [ ] Preference is persisted in `localStorage`.
- [ ] System preference is respected on first visit.
- [ ] No FOUC — mode is applied before first paint.
- [ ] Both modes visually verified on every page.

### Assets

- [ ] Favicon (SVG + ICO + PNG sizes) is present in document `<head>`.
- [ ] Apple touch icon is present.
- [ ] Social preview image (1200×630) is present and referenced in meta tags.
- [ ] PWA manifest icons are present (if applicable).
- [ ] All screenshots are real and current.

### Legal

- [ ] Privacy policy exists and is accurate.
- [ ] Terms of service exist and are accurate.
- [ ] Both are linked in the footer.

### Deployment

- [ ] Build completes without errors.
- [ ] sitemap.xml is generated and valid.
- [ ] robots.txt is present.
- [ ] `_headers` or equivalent is deployed with correct caching policy.
- [ ] `_redirects` or equivalent is deployed.
- [ ] Cache is purged after deployment (if applicable).
- [ ] Production domain resolves and serves the new build.
- [ ] www → root redirect works.
- [ ] All assets load from the production domain (no broken paths).

---

*This standard applies to every Kovina Open project's website surface. Companion to the [Design Playbook](../foundational/DESIGN_PLAYBOOK.md), [Architecture Playbook](../foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md), and [PWA Standard](../platforms/PWA_STANDARD.md).*
