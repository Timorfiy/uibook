import { Badge, Card, themes } from '../../lib';
import { BookNav } from '../components/BookNav';
import { CodeBlock } from '../components/CodeBlock';

export function ThemingPage() {
  return (
    <div className="docs-prose">
      <p className="docs-chapter-tag">Guide</p>
      <h1 className="docs-page-title">Theming</h1>
      <p className="docs-lede">
        UIBook separates what a component <em>does</em> from how it <em>looks</em>. Components
        read a shared token space; themes are interchangeable style collections that redefine
        those tokens — including what “glass” means.
      </p>

      <h2>The three layers</h2>
      <ul>
        <li>
          <strong>Components</strong> — TypeScript + CSS that only reference{' '}
          <code>var(--uib-*)</code>. No hex values, no blur numbers.
        </li>
        <li>
          <strong>Tokens</strong> — the contract: ink, surfaces, fills, materials, radii,
          shadows, motion. Defined per theme, per color mode.
        </li>
        <li>
          <strong>Themes</strong> — one CSS file + one registry entry each. Selected with{' '}
          <code>data-uib-theme</code> on the root element.
        </li>
      </ul>

      <h2>Anatomy of a theme</h2>
      <CodeBlock
        lang="css"
        title="mytheme.css"
        code={`[data-uib-theme='mytheme'] {
  /* ink, surfaces, accent… */
  --uib-text-1: #101418;
  --uib-bg: #eef1f4;
  --uib-accent: #0e7490;

  /* redefine "glass" — or opt out of blur entirely */
  --uib-glass-blur: 0px;
  --uib-glass-saturate: 100%;
  --uib-glass-bg: #ffffff;
  --uib-glass-stroke: #d3dae1;
  --uib-glass-highlight: transparent;
  --uib-glass-shadow: 0 1px 2px rgba(16, 20, 24, 0.08);
  --uib-glass-bg-solid: #ffffff;
}

[data-uib-theme='mytheme'][data-uib-mode='dark'] {
  /* dark-mode tokens… */
}`}
      />
      <CodeBlock
        lang="tsx"
        title="themes/index.ts"
        code={`import './mytheme.css';

export const themes: ThemeMeta[] = [
  // …existing themes
  {
    id: 'mytheme',
    name: 'My Theme',
    tagline: 'Flat and friendly',
    description: '…',
    status: 'available',
    accent: '#0e7490',
  },
];`}
      />
      <p>
        That is the whole integration: the theme picker, docs and token browsers pick it up
        automatically. A theme that sets <code>--uib-glass-blur: 0px</code> turns every glass
        component flat — no component code changes, no conditional rendering.
      </p>

      <h2>Roadmap</h2>
      <div className="docs-themes__grid">
        {themes.map((t) => (
          <Card key={t.id} material="regular" padding="md">
            <div className={`docs-theme-swatch docs-theme-swatch--${t.id}`} aria-hidden />
            <div className="docs-theme-card__head">
              <h3>{t.name}</h3>
              <Badge tone={t.status === 'available' ? 'success' : 'neutral'}>
                {t.status === 'available' ? 'Available' : 'Planned'}
              </Badge>
            </div>
            <p>{t.description}</p>
          </Card>
        ))}
      </div>

      <BookNav currentPath="/theming" />
    </div>
  );
}
