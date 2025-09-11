# Astro Hybrid Bundle Server Dependencies

This project demonstrates Astro with Node.js adapter in server mode with selective prerendering (hybrid behavior) and complete dependency bundling for standalone deployment.

## Features

- **Hybrid Rendering**: Mix of prerendered static pages and server-rendered dynamic pages
- **Complete Dependency Bundling**: All dependencies including @sentry/astro are bundled into the server output
- **Standalone Deployment**: Server can run without node_modules folder
- **Sentry Integration**: Error tracking and performance monitoring bundled with the server

## Project Structure

```
src/
├── pages/
│   ├── index.astro          # Prerendered page (export const prerender = true)
│   ├── about.astro          # Prerendered page (export const prerender = true)
│   ├── dynamic.astro        # Server-rendered page (no prerender)
│   └── sentry-test.astro    # Server-rendered page with Sentry integration
└── layouts/
    └── Layout.astro         # Base layout component
```

## Build Output

- **dist/client/**: Static files and prerendered pages
  - `index.html` - Prerendered homepage
  - `about/index.html` - Prerendered about page
  - `_astro/` - Client-side JavaScript bundles
- **dist/server/**: Server components and bundled dependencies
  - `entry.mjs` - Standalone server entry point with all dependencies bundled

## Usage

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Standalone Deployment
After building, you can deploy just the `dist/` folder without `node_modules`:

```bash
# Copy dist folder to deployment server
cp -r dist/ /path/to/deployment/

# Run standalone server
cd /path/to/deployment/
HOST=0.0.0.0 PORT=3000 node dist/server/entry.mjs
```

## Configuration Highlights

- **Server Mode with Selective Prerendering**: Uses `output: 'server'` with `export const prerender = true` on specific pages
- **Complete Dependency Bundling**: `vite.ssr.noExternal: true` bundles ALL dependencies including @sentry/astro
- **Standalone Mode**: Node.js adapter configured with `mode: 'standalone'` for self-contained deployment

## Dependencies Bundled

- @sentry/astro - Error tracking and performance monitoring
- All other npm dependencies are bundled into the server output

## Environment Variables

- `SENTRY_DSN`: Optional Sentry DSN for error tracking
- `HOST`: Server host (default: localhost)
- `PORT`: Server port (default: 4321)