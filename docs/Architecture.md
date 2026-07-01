# Architecture

## Overview

Kovina is a statically exported Next.js 16 application. All routes are pre-rendered at build time. The application serves as a brand landing page and project directory for the Kovina ecosystem.

## Tech Stack

- **Framework:** Next.js 16.2.9 (static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Fonts:** Inter, Geist Mono (via next/font), NotoSansSymbols2 (local)

## Route Structure

| Route | Description |
|---|---|
| `/` | Main landing page (hero, editorial, project sections, footer) |
| `/apps/[slug]` | Individual app detail page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |

All routes are statically prerendered via `generateStaticParams`.

## Key Files

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Main landing page component |
| `src/app/apps/[slug]/page.tsx` | Dynamic app detail pages |
| `src/lib/projects.ts` | Project data and type definitions |
| `src/lib/project-content.ts` | App feature content for detail pages |
| `src/app/globals.css` | Tailwind theme tokens, dark/light variables |
| `src/app/layout.tsx` | Root layout with font loading and SEO metadata |
| `next.config.ts` | Static export configuration |

## Data Flow

1. `src/lib/projects.ts` defines the canonical project list with slugs, names, descriptions, and status flags
2. `generateStaticParams` reads the project list to pre-render all app pages
3. App pages look up project data by slug and render hero + feature sections from `project-content.ts`
4. The main page renders all projects in sequence with 3-cycle alignment variations

## Theme System

- Dark mode is the default
- Light mode is toggled via `.light` class on `<html>`
- CSS custom properties defined in `globals.css` control all color tokens
- Theme preference persisted in `localStorage` under `kovina-theme`
- FOUC prevention via inline script in `<head>`
