# Kovina — Agent Operating Notes

> **Brand:** Kovina
> **Meaning:** Forged tools, durable software, personal infrastructure
> **Tone:** Calm, editorial, confident
> **Accent color:** `#099019`
> **URL:** https://kovina.org

## Product Identity

- **Core metaphor:** Forge — the apps are tools forged for specific purposes
- **Tagline:** "Personal software. Forged to last."
- **Supporting text:** "A collection of open-source tools built for ownership, permanence, and everyday use."
- **Editorial statement:** "Most software is rented. Kovina tools are built to be owned, understood, and kept."
- **Footer tagline:** "Forged tools for everyday life."
- **Font:** Inter (300–900) via next/font
- **Mono font:** Geist Mono via next/font
- **Symbols font:** NotoSansSymbols2 (local, for decorative project titles)
- **Dark mode:** Default (true black `#000000`). Light mode designed independently, not inverted.

## Tech Stack

- **Framework:** Next.js 16.2.9 (static export)
- **Language:** TypeScript
- **Styling:** Tailwind v4 + CSS custom properties for theme
- **Deployment:** Cloudflare Pages (direct upload via wrangler)
- **Domain:** kovina.org (Cloudflare zone active, zone ID: `9bb7363fbddb97ee545828c205b7dd9c`)

## Repository Structure

```
kovina/
├── assets/
│   ├── hero/           # Hero screenshots
│   ├── screenshots/    # Gallery screenshots
│   ├── gallery/        # Additional gallery images
│   ├── icons/          # SVG icons (light/dark)
│   └── branding/       # Brand assets
├── docs/
│   ├── Development.md
│   ├── Architecture.md
│   ├── Deployment.md
│   ├── Testing.md
│   └── Contributing.md
├── src/                # Application source
│   ├── app/
│   │   ├── page.tsx              # Main landing page
│   │   ├── layout.tsx            # Root layout (fonts, SEO, FOUC script)
│   │   ├── globals.css           # Tailwind theme tokens, dark/light variables
│   │   └── apps/[slug]/page.tsx  # Individual app detail page
│   ├── components/
│   │   ├── Header.tsx            # Universal header (shared by all pages)
│   │   ├── Footer.tsx            # Universal footer (shared by all pages)
│   │   └── ThemeToggle.tsx       # Dark/light toggle
│   └── lib/
│       ├── projects.ts           # Canonical project list with slugs, store/website URLs
│       └── project-content.ts    # App feature content for detail pages
├── public/
│   ├── app-icons/       # App screenshot PNGs (13 with icons, 4 use placeholders)
│   ├── fonts/           # NotoSansSymbols2-Regular.ttf
│   └── _redirects       # www → root redirect
├── CHANGELOG.md
├── README.md            # Premium landing page (showroom-style)
├── AGENTS.md            # Agent operating notes
└── CLAUDE.md            # Claude configuration
```

## Page Structure

1. **Shared Header** — `src/components/Header.tsx`. KOVINA on far left. Right actions: (optional) All Projects → GitHub → ThemeToggle (absolute right-0 on full-width sticky header).
2. **Hero** — Centered. Large KOVINA wordmark (`text-[clamp(4rem,15vw,10rem)] font-black leading-[0.85]`), headline, tagline, two pill CTAs. Directly on canvas, no card.
3. **Editorial Statement** — Centered. "Most software is rented..." paragraph.
4. **Projects — App Icons Exhibition** — 18 full-screen project sections with large app screenshots, 3-cycle alignment (left/center/right), clickable titles linking to `/apps/[slug]`, status badges, GitHub links.
5. **Data Strip** — Border-to-border: Open Source · Built by Sparsh Sam · Toronto, Canada
6. **Shared Footer** — `src/components/Footer.tsx`. Brand tagline + GitHub / Privacy / Terms links.

## App Detail Pages (`/apps/[slug]`)

Each app has a dedicated page with:
- Large app icon screenshot (rounded-2xl)
- Title in `font-symbols` + status badge ("Live" or "Under Construction")
- Long description
- Buttons (in priority order):
  - **Store link** (live desktop apps only) — accent filled, Microsoft Store URL, shopping bag icon
  - **Website link** — secondary accent or outline, opens in new tab
  - **GitHub/Source** — with GitHub logo icon, opens in new tab
  - **Back to Projects** — small muted text, least hierarchy
- Feature sections (5 per app, with numbered titles and descriptions)
- Ecosystem footer ("Part of the Kovina ecosystem")

## Website URL Convention

Apps following the `{shortname}.kovina.org` pattern (drop "Open" prefix):

| App | Website |
|-----|---------|
| OpenReader | reader.kovina.org |
| OpenSnap | snap.kovina.org |
| OpenSend | send.kovina.org |
| OpenLedger | ledger.kovina.org |
| OpenPalette | palette.kovina.org |
| OpenTone | tone.kovina.org |
| OpenSprout | sprout.kovina.org |
| OpenJournal | journal.kovina.org |
| OpenProof | proof.kovina.org |
| OpenConvert | convert.kovina.org |
| OpenScrabble | scrabble.kovina.org |
| Elora Vault | vault.kovina.org |

Apps with existing third-party URLs retain them (Hisstastic, WordWise, Chess by Sparsh, SheSafe, Sparsh Sam).

## Projects (18 listed)

| # | Project | Status | Store/Website | Repo |
|---|---------|--------|---------------|------|
| 1 | OpenReader | Live (Store) | reader.kovina.org / Microsoft Store | openreader |
| 2 | OpenSnap | Live (Store) | snap.kovina.org / Microsoft Store | opensnap |
| 3 | OpenSend | Live | send.kovina.org | opensend |
| 4 | Hisstastic | Live | hisstastic.vercel.app | hisstastic |
| 5 | WordWise | Live | wordwisehiccups.vercel.app | wordwise |
| 6 | OpenLedger | Dev | ledger.kovina.org | openledger |
| 7 | OpenPalette | Dev | palette.kovina.org | openpalette |
| 8 | OpenTone | Dev | tone.kovina.org | opentone |
| 9 | OpenSprout | Dev | sprout.kovina.org | opensprout |
| 10 | OpenJournal | Dev | journal.kovina.org | openjournal |
| 11 | OpenProof | Dev | proof.kovina.org | openproof |
| 12 | OpenConvert | Dev | convert.kovina.org | openconvert |
| 13 | OpenScrabble | Dev | scrabble.kovina.org | openscrabble |
| 14 | Chess by Sparsh | Dev | chess-by-sparsh.vercel.app | chess-by-sparsh |
| 15 | World Clock Widget | Dev | — | world-clock-widget |
| 16 | SheSafe | Dev | isshesafe.vercel.app | shesafe |
| 17 | Elora Vault | Dev | vault.kovina.org | elora-vault |
| 18 | Sparsh Sam | Live | sparshsam.github.io | sparshsam.github.io |

## Design Rules

- Hero directly on canvas — no hero card/container
- All buttons pill-shaped (`rounded-full`)
- No cards, no bordered containers, no gradients, no animations
- Typography hierarchy does layout work — no boxes needed
- Dark mode first; light mode is a separate design (not inversion)
- Exactly one accent color (`#099019`)
- Borders barely visible (`rgba(255,255,255,0.06)` / `rgba(0,0,0,0.06)`)
- Mobile-first responsive (sm:/lg: breakpoints, touch targets ≥44px)

## CSS Architecture (Tailwind v4)

- `globals.css` — `@import "tailwindcss"`, `@theme inline {}` for tokens, `:root` for dark mode variables, `:root.light` for light mode
- `--font-symbols` defined in `@theme inline` (references NotoSansSymbols2 via `var()`)
- Theme toggle: CSS variable approach — `@theme inline` emits `var(--xyz)` at runtime; toggling `.light` class on `<html>` swaps all values at once. FOUC prevention via inline `<script>` in `<head>`.
- Element-level styles (`body`) placed outside any `@layer` block.

## Routes

| Route | Description |
|---|---|
| `/` | Home (landing page) |
| `/apps/[slug]` | Individual app detail page (18 pre-rendered) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |
| `/_not-found` | Custom 404 |

All routes are statically prerendered via `output: "export"` and `generateStaticParams`.

## Key Source Files

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Main landing page (Hero, Editorial, Projects, Data Strip) |
| `src/app/layout.tsx` | Root layout (Inter, Geist Mono, NotoSymbols2 fonts; SEO metadata) |
| `src/app/globals.css` | Tailwind v4 design tokens, dark/light CSS variables |
| `src/app/apps/[slug]/page.tsx` | Individual app detail page component |
| `src/components/Header.tsx` | Universal header (KOVINA + GitHub + ThemeToggle) |
| `src/components/Footer.tsx` | Universal footer (data strip + links) |
| `src/components/ThemeToggle.tsx` | Dark/light toggle (localStorage-backed) |
| `src/lib/projects.ts` | Canonical project list with `storeUrl` and `website` fields |
| `src/lib/project-content.ts` | App feature content for all 18 detail pages |
| `next.config.ts` | Static export config (`output: "export"`) |
| `public/_redirects` | Cloudflare Pages www → root redirect |

## Data Model (Project type)

```ts
type Project = {
  slug: string;          // URL slug, e.g. "opensnap"
  name: string;          // Display name, e.g. "OpenSnap"
  desc: string;          // One-line description
  storeUrl?: string;     // Microsoft Store / download link (live desktop apps)
  website?: string;      // App website / landing page
  repo: string;          // GitHub repo name
  underDev: boolean;     // Whether app is in development
  isDesktop: boolean;    // Whether app is a desktop application
};
```

## Deployment

- **Build:** `npm run build` → produces `out/` directory (static export)
- **Deploy:** `npx wrangler pages deploy out --project-name kovina --branch main`
- **Cache purge:** `curl -X POST "https://api.cloudflare.com/client/v4/zones/9bb7363fbddb97ee545828c205b7dd9c/purge_cache" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" -d '{"purge_everything":true}'`
- **Always purge cache after deploy** — CSS filenames change with each build, stale edge cache causes 404s.
- **Custom domains:** kovina.org, www.kovina.org (both CNAME → kovina.pages.dev, proxied)
- **www redirect:** `_redirects` file handles 301 from www → root.

## Common Commands

```bash
npm run dev          # Development server
npm run build        # Production build (static export to out/)
npm run lint         # ESLint

# Deploy + purge cache
npx wrangler pages deploy out --project-name kovina --branch main
curl -X POST "https://api.cloudflare.com/client/v4/zones/.../purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}'
```

## Changelog Summary (2026-07-01)

- Project order: Live apps first, then In Development
- Added OpenSnap (Microsoft Store, desktop app)
- Added `storeUrl` (Microsoft Store links) and `website` fields to Project type
- Restructured app page buttons by hierarchy (Store → Website → GitHub → Back)
- Created shared Header and Footer components (used by all pages)
- ThemeToggle: `absolute right-0` on full-width header (true far-right edge)
- Fixed chess-by-sparsh.png filename (was missing hyphens)
- Applied Kovina Repository Standard (showroom README, docs/assets structure, CHANGELOG)
