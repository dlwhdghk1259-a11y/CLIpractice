# Copilot instructions for Mona Mayhem

## Project overview

Mona Mayhem is an Astro workshop template for building a retro arcade-style GitHub contribution battle arena. The repository currently contains an intentionally minimal Astro app and a separate, already-written workshop/docs site.

The two parts have different roles:

- `src/` is the app being built during the workshop. It uses Astro server output with the Node standalone adapter.
- `docs/` and `workshop/` are static workshop content. The Pages workflow publishes these directories directly and does not build `src/`.
- `workshop/` is the canonical English workshop source. Translated workshop content lives under `workshop/es`, `workshop/ko`, and `workshop/pt_BR`.
- `README.md` is the canonical English README; translated README files follow the `README.<locale>.md` naming convention.

Read the relevant workshop part before implementing a feature: Part 2 describes the API/page scaffold, Part 3 describes the intended battle interaction, and Part 5 describes responsive, accessibility, error, and validation expectations.

## Development commands

Install the locked dependencies:

```bash
npm ci
```

Start the Astro development server at `http://localhost:4321`:

```bash
npm run dev
```

Build the production Astro app:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The repository currently has no test runner or lint script in `package.json`. There is therefore no supported single-test command yet. For the API route, use the running dev server and request a concrete username, for example:

```bash
curl http://localhost:4321/api/contributions/octocat
```

Also check an invalid username or other error case when changing the route. The dev container uses Node.js 22 and runs `npm ci` after creation.

## Architecture and implementation boundaries

- `src/pages/index.astro` is the main page. It is currently a scaffold and is the intended home for the battle UI and its client-side interaction.
- `src/pages/api/contributions/[username].ts` is a dynamic server endpoint. It disables prerendering and is intended to proxy GitHub contribution JSON from `https://github.com/{username}.contribs`, avoiding browser CORS restrictions.
- `astro.config.mjs` selects `output: 'server'` and `@astrojs/node` in standalone mode. Preserve this when adding server-side API behavior; do not assume the app is a static Pages deployment.
- `.github/workflows/deploy.yml` currently assembles `_site` by copying `docs/` and translated workshop directories, then deploys `_site` to GitHub Pages. Changes to the Astro app do not appear on Pages unless the deployment design is intentionally changed.
- The API and UI are intentionally built incrementally through the workshop. Keep the route, data shape, loading/error states, and contribution-grid rendering aligned with the requirements described in `workshop/03-agent-mode.md`.

## Repository-specific conventions

- Follow the existing Astro/TypeScript style: tabs for indentation, single-quoted strings, semicolons, and type-only imports where applicable.
- Keep API responses JSON with an explicit `Content-Type` header and meaningful HTTP status codes. Validate the dynamic `username` parameter and surface upstream failures rather than returning a success-shaped fallback.
- When fetching both players, preserve the workshop's intended parallel request behavior and keep loading, validation, invalid-user, and network-error states distinct in the UI.
- Preserve keyboard behavior and accessibility from the workshop: both username inputs should support Enter to start a battle, focus states must remain visible, and responsive layouts should collapse the comparison on smaller screens.
- Treat English documentation as the source of truth for localization. Localization automation recognizes only `README.md`, `docs/index.html`, `docs/step.html`, and non-localized `workshop/*.md` files as sources. Do not edit generated locale files as a substitute for updating the source.
- If a source documentation file is changed, keep the corresponding translated files and `localizations/<locale>/.localization-state.json` consistent with the repository's localization workflow.
- Avoid changing the GitHub Pages workflow to deploy `dist/` unless the Astro deployment is deliberately migrated to static output and the Node adapter/API hosting implications are handled as described in the README.
