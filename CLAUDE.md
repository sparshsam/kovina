⚠️ CRITICAL — Read these before every session.

Key reference: `AGENTS.md` — brand identity, page structure, app detail pages, URL conventions, project list, design rules, CSS architecture, routes, data model.

---

## ⚠️ Critical Deployment Notes

**The #1 recurring bug:** Every previous session would build correctly but deploy to a *preview* URL instead of production, leaving kovina.org broken. Follow these rules without exception:

### Deploy

**Auto-deploy (recommended):** Push to `main` — `.github/workflows/deploy.yml` builds and deploys to production, then purges cache. `CLOUDFLARE_API_TOKEN` set as repo secret.

**Manual deploy (if needed):**
```bash
npm run build
npx wrangler pages deploy out --project-name kovina --branch production   # ← MUST be --branch production
```

- `--branch main` creates a **preview** deployment at `{hash}.kovina.pages.dev` — never reaches production.
- `--branch production` auto-promotes to production, served at `kovina.org` and `kovina.pages.dev`.
- The Cloudflare Pages production branch is set to `production` (not `main`).
- The `CLOUDFLARE_API_TOKEN` env var must be set (in `~/.zshrc`).

### Always purge cache after deploy
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/9bb7363fbddb97ee545828c205b7dd9c/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}'
```

Without a cache purge, Cloudflare's edge continues serving stale HTML from the previous deployment, causing all assets (SVG wordmarks, app images, CSS, JS, fonts) to 404 since their hash-based filenames changed.

### Cache policy
`public/_headers` prevents edge caching of HTML pages. Hashed assets (`_next/static/*`, `/fonts/*`) cache permanently. This file is included in every deployment — no manual action needed.

### If things look broken after deploy
Check which URL is being served:
- `https://kovina.org/kovina-wordmark-header.svg` → should be 200
- `https://kovina.org/app-icons/opensend.png` → should be 200
- `https://kovina.org/favicon.ico` → should return **1893 bytes** (Kovina favicon), not 25931 (stale Vercel)
- Browser console → should have 0 errors

If assets 404 but `kovina.org` HTML loads, the previous deployment was a preview, not production. Redeploy with `--branch production`.

---

## Quick Reference

**kovina.org** — Brand landing page for Kovina, a collection of open-source tools.

**Shared components (used on all pages):**
- `src/components/Header.tsx` — Universal header: KOVINA left, nav right, ThemeToggle absolute right-0 on full-width header
- `src/components/Footer.tsx` — Universal footer: data strip + GitHub/Privacy/Terms links
- `src/components/ThemeToggle.tsx` — Dark/light toggle (localStorage-backed)

**Key files:**
- `src/app/page.tsx` — Main landing page (uses Header, Hero, Editorial, Projects, Footer)
- `src/app/apps/[slug]/page.tsx` — App detail page (uses Header with showAllProjects, Footer)
- `src/app/layout.tsx` — Root layout (Inter, Geist Mono, NotoSymbols2 fonts; SEO metadata; FOUC script)
- `src/app/globals.css` — Tailwind v4 design tokens, dark/light CSS variables, font-symbols theme
- `src/lib/projects.ts` — Canonical project list with `storeUrl`, `website`, `slug`, `repo`, status flags
- `src/lib/project-content.ts` — App feature content for all 18 detail pages
- `public/_redirects` — Cloudflare Pages www → root redirect
- `public/_headers` — Cloudflare edge caching policy (prevent HTML caching)
- `public/app-icons/` — App screenshot PNGs (14 with icons, 4 slugs use placeholders)
- `public/favicon.ico` — Generated from kovina brand PNGs; regenerate if brand changes
- `public/kovina-favicon.svg` — Brand SVG favicon (uses Inter font via @import — "K" on green rect)
- `public/fonts/` — NotoSansSymbols2-Regular.ttf
- `next.config.ts` — Static export config

**Build:** `npm run build` → `out/`
**Deploy:** `npx wrangler pages deploy out --project-name kovina --branch production`
**Cache purge (always after deploy):** `curl -X POST .../purge_cache -d '{"purge_everything":true}'`

**Design constraints:**
- No cards, no bordered containers, no gradients, no animations
- All buttons pill-shaped
- To add/remove/reorder projects, edit `src/lib/projects.ts`
- To add/change app content, edit `src/lib/project-content.ts`

**Repository structure:**
- `README.md` — Premium landing page (showroom-style)
- `docs/` — Developer documentation (Development, Architecture, Deployment, Contributing)
- `assets/` — Hero screenshots, gallery images, icons, branding
- `CHANGELOG.md` — Release history

**Brand assets:** `assets/branding/` — wordmark SVGs (black, white, header, favicon, social)

**Ecosystem standards (shared across all Open* projects — read before every session):**

**Foundational** — read before every session:
- `standards/foundational/KOVINA_MANIFESTO.md` — Constitution: why Kovina exists, what belongs, principles
- `standards/foundational/BRAND_GUIDELINES.md` — Brand identity system
- `standards/foundational/DESIGN_PLAYBOOK.md` — UI/UX design system
- `standards/foundational/PRODUCT_ARCHITECTURE_PLAYBOOK.md` — Architecture patterns

**Shared** — cross-platform requirements:
- `standards/shared/APP_ICON_STANDARD.md` — Icon specification for all platforms
- `standards/shared/ACCESSIBILITY_STANDARD.md` — Accessibility requirements across all platforms
- `standards/shared/STORE_LISTING_STANDARD.md` — Store listing metadata and assets
- `standards/shared/LOCALIZATION_STANDARD.md` — Internationalization and localization

**Platforms** — per-surface requirements:
- `standards/platforms/WEBSITE_STANDARD.md` — Website requirements (two archetypes)
- `standards/platforms/PWA_STANDARD.md` — Progressive Web App requirements
- `standards/platforms/WINDOWS_APP_STANDARD.md` — Windows application requirements
- `standards/platforms/ANDROID_APP_STANDARD.md` — Android application requirements
- `standards/platforms/IOS_APP_STANDARD.md` — iOS application requirements
- `standards/platforms/MAC_APP_STANDARD.md` — macOS application requirements

**Process** — engineering and documentation:
- `standards/process/PROJECT_STRUCTURE_STANDARD.md` — Repository structure and conventions
- `standards/process/DOCUMENTATION_STANDARD.md` — Documentation requirements
- `standards/process/TESTING_STANDARD.md` — Testing requirements
- `standards/process/RELEASE_PROCESS.md` — Release lifecycle and checklist

**Protocols** — tooling and infrastructure:
- `standards/protocols/MCP-SERVER-BUILD-GUIDE.md` — MCP server specification

**Templates** — canonical scaffolding artifacts (consumed by OpenForge):
- `standards/templates/` — README, CHANGELOG, CONTRIBUTING, SECURITY, ISSUE_TEMPLATE, PULL_REQUEST_TEMPLATE, release-notes, LICENSE_HEADER

## Session History

### 2026-07-05
- OpenProof promoted to Live (moved below OpenPalette, now `underDev: false`)
- Favicon: removed 26KB `src/app/favicon.ico`, added `?v=2` cache-busters + `no-cache` headers
- Auto-deploy: `.github/workflows/deploy.yml` added, `CLOUDFLARE_API_TOKEN` set as repo secret
