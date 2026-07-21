# UIBook

**A themeable React component library, bound as a book.**
Its first design language, **Cupertino**, brings Apple-inspired frosted glass to the web — token-driven, dual-mode, and engineered to stay at 60fps.

**[Read the book (live docs)](https://timorfiy.github.io/uibook/)** · [Source](https://github.com/Timorfiy/uibook)

---

## Highlights

- **13 production-ready components** — Button, Card, TextField, Switch, Slider, SegmentedControl, Tabs, Menu, Modal, Toast, Tooltip, Badge, Spinner — each documented with live, editable examples.
- **Interchangeable theme architecture.** Components only read `--uib-*` design tokens. A theme is one CSS file + one registry entry; the component tree never changes.
- **Cupertino theme.** Three depths of frosted glass (thin / regular / thick) built from `backdrop-filter` blur + saturation, layered tints, hairline strokes and specular highlights — in light and dark.
- **Performance-first glass.** Blur is never animated, panels animate `transform`/`opacity` only, and glass degrades gracefully to solid surfaces when `backdrop-filter` is unsupported or the user prefers reduced transparency.
- **Interactive-book documentation.** The docs site presents the library as a bound book — table-of-contents sidebar, page-turn transitions, and prev/next chapter navigation. Deployed to GitHub Pages.
- **Lean by design.** Vanilla CSS, a few focused hooks, zero styling frameworks. No runtime theme engine.

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

| Theme        | Status      | Character                                             |
| ------------ | ----------- | ----------------------------------------------------- |
| **Cupertino** | Available  | Frosted glass, vibrancy blur, specular highlights     |
| **Minimal**   | Planned    | Warm monochrome, flat surfaces, loud typography       |
| **Codex**     | Planned    | Terminal-native dark tech, monospace-first            |

Creating a theme means defining the token space — including what “glass” means. Set
`--uib-glass-blur: 0px` and every glass component in the tree turns flat. See the
[Theming chapter](https://timorfiy.github.io/uibook/#/theming) for a walkthrough.

## Project structure

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

## Performance rules for glass

- **Never animate `backdrop-filter`** — UIBook keeps blur static and animates transforms only.
- **Glass needs a backdrop** — frosted materials are tuned to sit over colour; on flat backgrounds use `material="solid"`.
- **Fallbacks are built in** — `@supports` and `prefers-reduced-transparency` swap glass for opaque surfaces automatically.

## Deployment (GitHub Pages)

The repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the
docs and publishes them to Pages on every push to `main`:

1. Push the repository to GitHub (as `uibook`, or set `UIBOOK_BASE` in the workflow to match a different repo name).
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the site goes live at `https://<user>.github.io/uibook/`.

Client-side routing uses a `HashRouter`, so deep links and refreshes work on Pages without a custom 404.

## License

MIT © Timorfiy
