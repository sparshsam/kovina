@AGENTS.md

## Quick Reference

**kovina.org** — Brand landing page for Kovina, a collection of open-source tools.

**Key files:**
- `src/app/page.tsx` — Main landing page (Hero, Editorial, Projects, Data Strip, Footer)
- `src/app/layout.tsx` — Root layout (Inter font, SEO metadata, theme FOUC script)
- `src/app/globals.css` — Tailwind v4 design tokens, dark/light CSS variables
- `src/app/ornaments.css` — Abstract decorative element utilities
- `src/components/ThemeToggle.tsx` — Dark/light toggle (localStorage-backed)
- `public/_redirects` — Cloudflare Pages www → root redirect
- `next.config.ts` — Static export config

**Build:** `npm run build` → `out/`
**Deploy:** `bash /tmp/deploy_kovina.sh`

**Design constraints:**
- No cards, no bordered containers, no gradients, no animations
- All buttons pill-shaped
- Only changes to `src/app/page.tsx` and `src/app/globals.css` should be needed for content/tone updates
- To add/remove/reorder projects, edit the `projects` array in `page.tsx`

**CI:** Repo at github.com/sparshsam/kovina. Pushes to main don't auto-deploy (direct upload workflow). Re-deploy via wrangler after rebuild.
