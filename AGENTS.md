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
- **Dark mode:** Default (true black `#000000`). Light mode designed independently, not inverted.

## Tech Stack

- **Framework:** Next.js 16.2.9 (static export)
- **Language:** TypeScript
- **Styling:** Tailwind v4 + CSS custom properties for theme
- **Deployment:** Cloudflare Pages (direct upload via wrangler)
- **Domain:** kovina.org (Cloudflare zone active)

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
├── public/             # Static assets (app-icons, fonts)
├── CHANGELOG.md
├── README.md           # Premium landing page
├── AGENTS.md           # Agent operating notes
└── CLAUDE.md           # Claude configuration
```

## Page Structure

1. **Sticky Header** — Wordmark + Projects link + GitHub link + Theme toggle
2. **Hero** — Centered. Large KOVINA wordmark (`text-[clamp(4rem,15vw,10rem)] font-black leading-[0.85]`), headline, tagline, two pill CTAs. Directly on canvas, no card.
3. **Editorial Statement** — Centered. Single bold paragraph, `max-w-2xl`. No containers.
4. **Projects — Editorial Exhibition** — 17 projects, each with unique composition. No cards, no equal-width grids. Five layout patterns (Canvas, Marginalia, Spread, Notice, Asymmetric). Each has its own abstract ornament (circle, diamond, rule line, dot grid, cross) in accent color at low opacity.
5. **Data Strip** — Border-to-border: Open Source · Built by Sparsh Sam · Toronto, Canada
6. **Footer** — Brand tagline + GitHub / Privacy / Terms links

## Design Rules (from DESIGN_PLAYBOOK)

- Hero directly on canvas — no hero card/container
- All buttons pill-shaped (`rounded-full`)
- No bordered containers unless mechanically justified
- Typography hierarchy does layout work — no boxes needed
- No dashboard patterns, feature cards, marketing fluff, gradients, or animations beyond subtle fades
- Dark mode first; light mode is a separate design (not inversion)
- Exactly one accent color (`#099019`)
- Borders barely visible (`rgba(255,255,255,0.06)` / `rgba(0,0,0,0.06)`)
- Mobile-first responsive (sm:/lg: breakpoints, touch targets ≥44px)

## Projects (17 listed)

| # | Project | Status | Live URL | Repo |
|---|---------|--------|----------|------|
| 1 | Chess by Sparsh | Under dev | chess-by-sparsh.vercel.app | chess-by-sparsh |
| 2 | Elora Vault | Under dev | elora-bet-api.vercel.app | elora-vault |
| 3 | Hisstastic | Live | hisstastic.vercel.app | hisstastic |
| 4 | OpenConvert | Under dev | (not deployed) | openconvert |
| 5 | OpenJournal | Under dev | (not deployed) | openjournal |
| 6 | OpenLedger | Under dev | openledgerbysparsh.vercel.app | openledger |
| 7 | OpenPalette | Under dev | openpalette-delta.vercel.app | openpalette |
| 8 | OpenProof | Under dev | openproof.vercel.app | openproof |
| 9 | OpenReader | Desktop (MS Store) | — | openreader |
| 10 | OpenScrabble | Under dev | openscrabble.vercel.app | openscrabble |
| 11 | OpenSend | Live (GitHub repo) | github.com/sparshsam/opensend | opensend |
| 12 | OpenSprout | Under dev | opensprout.vercel.app | opensprout |
| 13 | OpenTone | Desktop app | — | opentone |
| 14 | SheSafe | Under dev | isshesafe.vercel.app | shesafe |
| 15 | Sparsh Sam | Live | sparshsam.github.io | sparshsam.github.io |
| 16 | WordWise | Live | wordwisehiccups.vercel.app | wordwise |
| 17 | World Clock Widget | Under dev | — | world-clock-widget |

**Rendering rules:**
- Under dev → title is plain text (not clickable). GitHub link shown.
- Live → title links to deployment URL. GitHub link shown.
- Desktop-only → title is plain text. GitHub link shown.
- Every row gets a GitHub link to `github.com/sparshsam/<repo>`.

## Routes

- `/` — Home (landing page)
- `/privacy` — Privacy policy
- `/terms` — Terms of use
- `/_not-found` — Custom 404

All routes are statically prerendered via `output: "export"`.

## CSS Architecture (Tailwind v4)

- `globals.css` — `@import "tailwindcss"`, `@theme inline {}` for tokens, `:root` for dark mode variables, `:root.light` for light mode
- `ornaments.css` — Utility classes for abstract decorative elements (circle, diamond, rule, dots). Used as `className` references.
- Theme toggle: CSS variable approach — `@theme inline` emits `var(--xyz)` at runtime; toggling `.light` class on `<html>` swaps all values at once. Accent color hardcoded in `@theme inline` (identical in both modes). FOUC prevention via inline `<script>` in `<head>`.
- Element-level styles (`body`) placed outside any `@layer` block to avoid Tailwind v4 stripping them.

## Deployment

- **Build:** `npm run build` → produces `out/` directory (static export)
- **Deploy:** `wrangler pages deploy out --project-name kovina --branch main`
- **Custom domains:** kovina.org, www.kovina.org (both CNAME → kovina.pages.dev, proxied)
- **www redirect:** `_redirects` file in `public/`: `www.kovina.org/* https://kovina.org/:splat 301`

## Git Workflow

- Branch: `main`
- Repo: github.com/sparshsam/kovina
- License: AGPL-3.0

## Ecosystem Standards

All ecosystem repos follow: https://github.com/sparshsam/ecosystem-standards

## Common Commands

```bash
npm run dev          # Development server
npm run build        # Production build (static export to out/)
npm run lint         # ESLint
wrangler pages deploy out --project-name kovina --branch main  # Deploy to Cloudflare
```
