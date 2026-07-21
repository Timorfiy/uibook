# AGENTS.md — UIBook

A themeable React + TypeScript component library with an Apple-inspired glass design
language ("Cupertino" theme), presented as an interactive book. Vite build, vanilla CSS,
deployed to GitHub Pages via Actions.

## Commands

- `npm run dev` — docs site dev server
- `npm run build` — `tsc --noEmit` + Vite production build (must stay green)
- `npm run preview` — serve the production build locally
- `npm run typecheck` — types only

## Architecture

Two layers under `src/`:

- **`src/lib/` — the library.** Everything a consumer imports.
- **`src/docs/` — the documentation site.** Dogfoods the library exclusively; never
  styles around it with ad-hoc CSS when a component/token exists.

### Theming contract (the most important rule)

- Components reference **only** `var(--uib-*)` tokens. No hex colors, pixel radii, blur
  values, or shadow definitions inside component CSS.
- A theme = one CSS file in `src/lib/themes/` mapping the token space for
  `[data-uib-theme='<id>']` (+ `[data-uib-mode='dark']` and a `prefers-color-scheme`
  fallback block) + one `ThemeMeta` entry in `src/lib/themes/index.ts`.
- Tokens are grouped: ink, surfaces, fills, accent/semantic, glass materials
  (thin/regular/thick), radii, shadows, motion, scene washes. When adding a token, add it
  to **all three blocks** of every theme (light, dark, dark-media-query) and document it
  on the Foundations docs page.
- Theme/mode selection is attribute-based (`data-uib-theme`, `data-uib-mode` on `<html>`);
  `applyTheme`/`applyMode` helpers just set attributes + persist to localStorage.

## Conventions

- **CSS**: one file per component, BEM-ish (`uib-button__icon`, `uib-button--primary`).
  Animate `transform`/`opacity` only. Never animate `backdrop-filter`.
- **Glass**: compose from the material utilities (`uib-glass[-thin|-thick]`) or their
  tokens. Always keep the `@supports` + `prefers-reduced-transparency` solid fallbacks.
- **Motion**: durations/easings come from `--uib-dur-*` / `--uib-ease*`; everything
  collapses under `prefers-reduced-motion` (handled in `base.css`).
- **Accessibility**: focus rings come from `base.css`; interactive widgets carry proper
  roles (`switch`, `radiogroup`, `tablist`, `dialog`) and arrow-key support where the ARIA
  pattern expects it.
- **Icons**: `@phosphor-icons/react` only. No hand-rolled SVG glyphs, no emojis in UI.
- **TS**: strict; `noUnusedLocals` is on — clean up imports.

## Adding a component

1. `src/lib/components/Name/Name.tsx` + `Name.css` (token-driven).
2. Export it (component + prop types) from `src/lib/index.ts`.
3. Create `src/docs/demos/NameDoc.tsx` (`ComponentDoc`: demos + props) and register it in
   `src/docs/registry.ts` (order = chapter number).
4. Verify `npm run build`.

## Adding a theme

1. `src/lib/themes/<id>.css` implementing the full token space (copy `cupertino.css`).
2. Import the CSS and add a `ThemeMeta` in `src/lib/themes/index.ts` (`status: 'available'`).
3. Add a `.docs-theme-swatch--<id>` swatch in `src/docs/docs.css`.
4. Verify both color modes and that glass utilities still render sanely.

## Deployment

- GitHub Actions → Pages (`.github/workflows/deploy.yml`), `base` is `/uibook/` for
  production builds (override with `UIBOOK_BASE`). Routing uses `HashRouter` — do not
  switch to `BrowserRouter` without adding a Pages 404 fallback.
