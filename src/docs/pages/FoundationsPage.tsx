import { useEffect, useState } from 'react';
import { Card } from '../../lib';
import { BookNav } from '../components/BookNav';

/** Reads the live computed value of a token and re-reads on theme/mode change. */
function useTokenValue(name: string): string {
  const [value, setValue] = useState('');
  useEffect(() => {
    const read = () =>
      setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-uib-mode', 'data-uib-theme'],
    });
    return () => mo.disconnect();
  }, [name]);
  return value;
}

function TokenSwatch({ name }: { name: string }) {
  const value = useTokenValue(name);
  return (
    <div className="docs-token">
      <span className="docs-token__chip" style={{ background: `var(${name})` }} aria-hidden />
      <span className="docs-token__name">{name}</span>
      <span className="docs-token__value">{value}</span>
    </div>
  );
}

const tokenGroups: { title: string; tokens: string[] }[] = [
  { title: 'Ink', tokens: ['--uib-text-1', '--uib-text-2', '--uib-text-3'] },
  { title: 'Surfaces', tokens: ['--uib-bg', '--uib-surface', '--uib-surface-2', '--uib-separator'] },
  { title: 'Accent & semantic', tokens: ['--uib-accent', '--uib-success', '--uib-warning', '--uib-danger'] },
  { title: 'Control fills', tokens: ['--uib-fill', '--uib-fill-2', '--uib-accent-soft'] },
];

const radii = ['--uib-radius-s', '--uib-radius-m', '--uib-radius-l', '--uib-radius-xl'];
const shadows = ['--uib-shadow-1', '--uib-shadow-2', '--uib-shadow-3'];

export function FoundationsPage() {
  return (
    <div className="docs-prose">
      <p className="docs-chapter-tag">Guide</p>
      <h1 className="docs-page-title">Foundations</h1>
      <p className="docs-lede">
        The Cupertino theme, expressed as tokens. Every value below is read live from the
        active stylesheet — flip the mode toggle in the top bar and watch them retune.
      </p>

      <h2>Colour</h2>
      {tokenGroups.map((g) => (
        <div key={g.title}>
          <h3>{g.title}</h3>
          <div className="docs-tokens">
            {g.tokens.map((t) => (
              <TokenSwatch key={t} name={t} />
            ))}
          </div>
        </div>
      ))}

      <h2>Materials</h2>
      <p>
        Three depths of frosted glass, each a remix of the same recipe: blur, saturation,
        tint, a one-pixel stroke and a specular top highlight.
      </p>
      <div className="docs-materials__stage">
        <Card material="thin">
          <strong>Thin</strong>
          <p className="docs-muted">--uib-glass-thin-* · toolbars, chips</p>
        </Card>
        <Card material="regular">
          <strong>Regular</strong>
          <p className="docs-muted">--uib-glass-* · cards, toasts</p>
        </Card>
        <Card material="thick">
          <strong>Thick</strong>
          <p className="docs-muted">--uib-glass-thick-* · modals, sheets</p>
        </Card>
      </div>

      <h2>Radius</h2>
      <p>One continuous-corner scale, applied consistently: controls small, cards large.</p>
      <div className="docs-swatch-row">
        {radii.map((r) => (
          <div key={r} className="docs-swatch-box" style={{ borderRadius: `var(${r})` }}>
            <span>{r.replace('--uib-radius-', '')}</span>
          </div>
        ))}
      </div>

      <h2>Elevation</h2>
      <p>Shadows are tinted to the page, never pure black, and deepen in dark mode.</p>
      <div className="docs-swatch-row">
        {shadows.map((s) => (
          <div key={s} className="docs-swatch-box" style={{ boxShadow: `var(${s})` }}>
            <span>{s.replace('--uib-shadow-', '')}</span>
          </div>
        ))}
      </div>

      <h2>Motion</h2>
      <ul>
        <li>
          <code>--uib-dur-1/2/3</code> — 140 / 220 / 360 ms, micro to scene.
        </li>
        <li>
          <code>--uib-ease</code> — the default settle; <code>--uib-ease-spring</code> for
          physical controls like the Switch knob.
        </li>
        <li>Only <code>transform</code> and <code>opacity</code> ever animate.</li>
      </ul>

      <BookNav currentPath="/foundations" />
    </div>
  );
}
