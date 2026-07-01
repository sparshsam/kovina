@AGENTS.md

## Quick Reference

**kovina.org** — Brand landing page for Kovina, a collection of open-source tools.

**Key files:**
- `src/app/page.tsx` — Main landing page (Hero, Editorial, Projects, Data Strip, Footer)
- `src/app/layout.tsx` — Root layout (Inter font, SEO metadata, theme FOUC script)
- `src/app/globals.css` — Tailwind v4 design tokens, dark/light CSS variables
- `src/components/ThemeToggle.tsx` — Dark/light toggle (localStorage-backed)
- `src/lib/projects.ts` — Project data array (order, slugs, status)
- `src/lib/project-content.ts` — App feature content for detail pages
- `src/app/apps/[slug]/page.tsx` — Individual app detail page component
- `public/_redirects` — Cloudflare Pages www → root redirect
- `public/app-icons/` — App screenshot PNGs for project sections
- `next.config.ts` — Static export config

**Build:** `npm run build` → `out/`
**Deploy:** `npx wrangler pages deploy out --project-name kovina --branch main`

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
