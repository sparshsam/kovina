# Deployment

## Platform

Kovina is deployed to **Cloudflare Pages** as a static site.

## Build Command

```bash
npm run build
```

The build produces a `out/` directory containing the complete static export.

## Deploy

### Via wrangler

```bash
npx wrangler pages deploy out --project-name kovina --branch production

> **Important:** Use `--branch production` (not `--branch main`). The `--branch main` flag creates a *preview* deployment that won't be served at the custom domain. Only the production branch serves at `kovina.org`.
```

### Authentication

Set the `CLOUDFLARE_API_TOKEN` environment variable or use `npx wrangler login`.

## Custom Domains

- kovina.org (production)
- www.kovina.org (redirects to kovina.org)

Both CNAME to `kovina.pages.dev`, proxied through Cloudflare.

## GitHub Integration

The repository is connected to Cloudflare Pages for automatic deployments. Pushes to `main` trigger a new build and deployment.

## Redirects

The `public/_redirects` file handles:

```
www.kovina.org/* https://kovina.org/:splat 301
```
