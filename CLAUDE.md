@AGENTS.md

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
- `public/app-icons/` — App screenshot PNGs (13 with icons, 4 slugs use placeholders)
- `public/fonts/` — NotoSansSymbols2-Regular.ttf
- `next.config.ts` — Static export config

**Build:** `npm run build` → `out/`
**Deploy:** `npx wrangler pages deploy out --project-name kovina --branch main`
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

**CI:** Repo at github.com/sparshsam/kovina. Main branch auto-deploys to Cloudflare Pages.

**Brand assets:** `assets/branding/BRAND_GUIDELINES.md` — full identity system (wordmark SVGs, colors, logo hierarchy, icon philosophy, naming convention, repository standards)

**Reference documents (shared across all Open* projects):**
- `references/DESIGN_PLAYBOOK.md` — UI/UX design system
- `references/PRODUCT_ARCHITECTURE_PLAYBOOK.md` — architecture patterns
- `references/MCP-SERVER-BUILD-GUIDE.md` — MCP server specification
