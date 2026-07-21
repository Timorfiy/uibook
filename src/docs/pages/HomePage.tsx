import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Feather,
  Gauge,
  GithubLogo,
  MoonStars,
  Swatches,
} from '@phosphor-icons/react';
import { Badge, Button, Card, SegmentedControl, Slider, Switch, themes } from '../../lib';
import { componentDocs } from '../registry';

const GITHUB_URL = 'https://github.com/Timorfiy/uibook';

const features = [
  {
    icon: <Swatches size={20} weight="duotone" />,
    title: 'Tokens, not hard-codes',
    body: 'Every colour, blur, radius and shadow flows through --uib-* custom properties. A theme is a pure CSS file — components never change.',
  },
  {
    icon: <Gauge size={20} weight="duotone" />,
    title: 'Glass that respects the GPU',
    body: 'Static backdrop-filter, transform-only motion, and solid fallbacks for no-support browsers and reduced-transparency settings.',
  },
  {
    icon: <MoonStars size={20} weight="duotone" />,
    title: 'Dual-mode by default',
    body: 'Light and dark ship together in every theme. UIBook follows the OS, remembers the user, and never flashes on load.',
  },
  {
    icon: <Feather size={20} weight="duotone" />,
    title: 'A lean runtime',
    body: 'Vanilla CSS and a few focused hooks. No styling framework, no runtime theme engine, nothing between you and the cascade.',
  },
];

/** The hero glass stack tilts subtly toward the pointer — ref-driven, zero re-renders. */
function HeroStack() {
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`);
  };

  const onLeave = () => {
    innerRef.current?.style.setProperty('--rx', '0deg');
    innerRef.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="docs-hero-stack" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="docs-hero-stack__inner" ref={innerRef}>
        <Card material="thin" className="docs-hero-stack__back" aria-hidden />
        <Card material="regular" padding="lg" className="docs-hero-stack__front">
          <div className="docs-hero-panel__head">
            <strong>Reading preferences</strong>
            <Badge tone="neutral">Live</Badge>
          </div>
          <Switch label="Page-turn animation" defaultChecked />
          <Switch label="Night mode" />
          <div className="docs-hero-panel__slider">
            <span className="docs-hero-panel__label">Text size</span>
            <Slider defaultValue={62} aria-label="Text size" />
          </div>
          <SegmentedControl
            fullWidth
            size="sm"
            aria-label="Typeface"
            options={[
              { value: 'serif', label: 'Serif' },
              { value: 'sans', label: 'Sans' },
              { value: 'mono', label: 'Mono' },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <div>
      <section className="docs-hero">
        <div>
          <div className="docs-hero__badge">
            <Badge>Cupertino theme</Badge>
          </div>
          <h1>Glass components, bound as a book.</h1>
          <p className="docs-hero__lede">
            UIBook is a themeable React component library. Cupertino — its first design
            language — renders frosted-glass interfaces at 60fps.
          </p>
          <div className="docs-hero__cta">
            <Link to="/getting-started">
              <Button size="lg" icon={<BookOpen weight="bold" />}>
                Open the book
              </Button>
            </Link>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              <Button size="lg" variant="glass" icon={<GithubLogo weight="bold" />}>
                GitHub
              </Button>
            </a>
          </div>
        </div>
        <HeroStack />
      </section>

      <section className="docs-features">
        {features.map((f) => (
          <Card key={f.title} material="regular" padding="md">
            <div className="docs-feature__icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </Card>
        ))}
      </section>

      <section className="docs-materials">
        <h2 className="docs-section-title">Three materials, one recipe</h2>
        <p className="docs-section-sub">
          Blur, saturate, tint, hairline, highlight — remixed into thin, regular and thick
          depths. Toggle dark mode in the top bar; the materials retune themselves.
        </p>
        <div className="docs-materials__stage">
          <Card material="thin">
            <strong>Thin</strong>
            <p className="docs-muted">12px blur · 160% saturation</p>
          </Card>
          <Card material="regular">
            <strong>Regular</strong>
            <p className="docs-muted">20px blur · 180% saturation</p>
          </Card>
          <Card material="thick">
            <strong>Thick</strong>
            <p className="docs-muted">32px blur · 200% saturation</p>
          </Card>
        </div>
      </section>

      <section className="docs-themes">
        <h2 className="docs-section-title">One component tree, many voices</h2>
        <p className="docs-section-sub">
          Themes are interchangeable style collections over a shared token space. Cupertino
          ships today; two more are on the drawing board.
        </p>
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
              <p>{t.tagline}</p>
            </Card>
          ))}
        </div>
        <Link to="/theming" className="docs-text-link">
          How the theme architecture works <ArrowRight size={14} weight="bold" />
        </Link>
      </section>

      <section className="docs-index">
        <h2 className="docs-section-title">The chapters</h2>
        <p className="docs-section-sub">Thirteen components, each with live examples and a full prop reference.</p>
        <div className="docs-index__grid">
          {componentDocs.map((d) => (
            <Link key={d.slug} to={`/components/${d.slug}`} className="docs-index__item uib-glass">
              <span className="docs-index__num">{String(d.chapter).padStart(2, '0')}</span>
              <span className="docs-index__body">
                <strong>{d.name}</strong>
                <span>{d.tagline}</span>
              </span>
              <ArrowRight className="docs-index__arrow" size={15} weight="bold" />
            </Link>
          ))}
        </div>
      </section>

      <footer className="docs-footer">
        <span>UIBook — designed and built by Timorfiy</span>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          Source on GitHub
        </a>
      </footer>
    </div>
  );
}
