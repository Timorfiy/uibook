<div align="center">

# UIBook

**A themeable React component library, bound as a book.**

Frosted-glass components over a token-driven theme architecture.<br />
Light and dark, 60fps, zero styling frameworks.

[Read the Book](https://timorfiy.github.io/uibook/) ·
[Getting Started](https://timorfiy.github.io/uibook/#/getting-started) ·
[Theming](https://timorfiy.github.io/uibook/#/theming)

[![Build](https://img.shields.io/github/actions/workflow/status/Timorfiy/uibook/deploy.yml?branch=main&style=flat-square&label=build)](https://github.com/Timorfiy/uibook/actions/workflows/deploy.yml)
[![Version](https://img.shields.io/badge/version-0.2.0-007aff?style=flat-square)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-8e8e93?style=flat-square)](LICENSE)

</div>

---

## Highlights

- **13 components, documented live.** Every chapter pairs working demos with a full prop reference.
- **A theme is one CSS file.** Components read only `--uib-*` tokens; swapping themes never touches the component tree.
- **Real glass.** Three `backdrop-filter` materials — thin, regular, thick — with hairline strokes and specular highlights, retuned for dark mode.
- **Glass that stays at 60fps.** Blur is never animated; motion runs on `transform` and `opacity` only; glass degrades to solid surfaces without support or under reduced transparency.
- **Docs as a book.** Table-of-contents sidebar, page-turn transitions, prev/next chapters — the site dogfoods the library exclusively.
- **Lean runtime.** Vanilla CSS and a few focused hooks. No styling framework, no runtime theme engine.

## Components

| Component | What it is |
| --- | --- |
| [Button](https://timorfiy.github.io/uibook/#/components/button) | Four weights, one continuous pill |
| [Card](https://timorfiy.github.io/uibook/#/components/card) | The glass material, in three depths |
| [TextField](https://timorfiy.github.io/uibook/#/components/textfield) | Labels, helpers and validation, baked in |
| [Switch](https://timorfiy.github.io/uibook/#/components/switch) | A binary setting with spring in its step |
| [Slider](https://timorfiy.github.io/uibook/#/components/slider) | A continuous value on a tinted track |
| [SegmentedControl](https://timorfiy.github.io/uibook/#/components/segmented-control) | Mutually exclusive, mechanically satisfying |
| [Tabs](https://timorfiy.github.io/uibook/#/components/tabs) | Two rhythms: underline and floating pill |
| [Modal](https://timorfiy.github.io/uibook/#/components/modal) | A sheet of thick glass over a dimmed page |
| [Toast](https://timorfiy.github.io/uibook/#/components/toast) | Transient notes from the margin |
| [Tooltip](https://timorfiy.github.io/uibook/#/components/tooltip) | A whisper on hover, silent on touch |
| [Badge](https://timorfiy.github.io/uibook/#/components/badge) | Status in a capsule |
| [Spinner](https://timorfiy.github.io/uibook/#/components/spinner) | The smallest possible wait indicator |
| [Menu](https://timorfiy.github.io/uibook/#/components/menu) | A single-select dropdown on thick glass |

## Quick start

```bash
git clone https://github.com/Timorfiy/uibook.git
cd uibook
npm install
npm run dev        # documentation site
npm run build      # type-check + production build
```

Use a component:

```tsx
import { Button, Switch, applyTheme, applyMode } from './lib';

applyTheme('cupertino');
applyMode('system'); // 'light' | 'dark' | 'system'

export function Toolbar() {
  return (
    <>
      <Switch label="Page-turn animation" defaultChecked />
      <Button variant="primary">Save changes</Button>
    </>
  );
}
```

No JavaScript? Themes and modes are plain attributes — the CSS reads them either way:

```html
<html data-uib-theme="cupertino" data-uib-mode="dark">
```

## Themes

| Theme | Status | Character |
| --- | --- | --- |
| **Cupertino** | Available | Frosted glass, vibrancy blur, specular highlights |
| **Minimal** | Planned | Warm monochrome, flat surfaces, loud typography |
| **Codex** | Planned | Terminal-native dark tech, monospace-first |

Creating a theme means defining the token space — including what “glass” means:

```css
[data-uib-theme='mytheme'] {
  --uib-text-1: #101418;
  --uib-bg: #eef1f4;
  --uib-accent: #0e7490;
  --uib-glass-blur: 0px; /* every glass component in the tree turns flat */
}
```

See the [Theming chapter](https://timorfiy.github.io/uibook/#/theming) for the full walkthrough.

## Architecture

```
src/
├── lib/                      # the component library
│   ├── components/           # 13 components, each: Name.tsx + Name.css
│   ├── styles/base.css       # reset, focus rings, glass utilities, fallbacks
│   ├── themes/               # theme registry + one CSS file per theme
│   └── utils/                # cn(), sliding-indicator hook
└── docs/                     # the interactive-book documentation site
    ├── components/           # DocsShell, Demo, CodeBlock, PropsTable, BookNav
    ├── demos/                # per-component live examples + prop tables
    └── pages/                # Cover, Getting Started, Foundations, Theming
```

The contract: components reference `var(--uib-*)` tokens and nothing else — no hex
colors, pixel radii, or blur values inside component CSS. Themes map the token space
per color mode; `base.css` holds the shared reset, focus rings, glass utilities and
fallbacks.

## Performance rules for glass

- **Never animate `backdrop-filter`** — blur stays static; panels animate transforms only.
- **Glass needs a backdrop** — frosted materials are tuned to sit over colour; on flat backgrounds use `material="solid"`.
- **Fallbacks are built in** — `@supports` and `prefers-reduced-transparency` swap glass for opaque surfaces automatically.

## Deployment

The repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds
the docs and publishes them to Pages on every push to `main`:

1. Push the repository to GitHub (as `uibook`, or set `UIBOOK_BASE` to match a different repo name).
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the site goes live at `https://<user>.github.io/uibook/`.

Routing uses a `HashRouter`, so deep links and refreshes work on Pages without a custom 404.

## License

MIT © Timorfiy
