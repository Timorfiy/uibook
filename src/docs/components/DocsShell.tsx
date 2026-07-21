import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookBookmark, GithubLogo, List, Monitor, Moon, Sun, Swatches, X } from '@phosphor-icons/react';
import {
  Badge,
  Menu,
  SegmentedControl,
  ThemeMode,
  applyMode,
  applyTheme,
  getStoredMode,
  getStoredTheme,
  themes,
} from '../../lib';
import { componentDocs } from '../registry';

const GITHUB_URL = 'https://github.com/Timorfiy/uibook';

export function DocsShell() {
  const location = useLocation();
  const [theme, setTheme] = useState(getStoredTheme);
  const [mode, setMode] = useState<ThemeMode>(getStoredMode);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Page-turn: scroll to the top whenever the route changes.
  useEffect(() => {
    window.scrollTo(0, 0);
    setDrawerOpen(false);
  }, [location.pathname]);

  // Keep the OS dark-mode listener in sync while 'system' is selected.
  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyMode('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mode]);

  return (
    <div className="docs-shell">
      <header className="docs-topbar uib-glass-thin">
        <button
          type="button"
          className="docs-menu-btn"
          aria-label="Open table of contents"
          onClick={() => setDrawerOpen(true)}
        >
          <List size={20} weight="bold" />
        </button>
        <Link to="/" className="docs-topbar__brand">
          <BookBookmark size={22} weight="duotone" />
          <span>UIBook</span>
          <Badge tone="neutral">v0.2</Badge>
        </Link>
        <span className="docs-topbar__spacer" />
        <Menu
          className="docs-theme-menu"
          label="Theme"
          align="end"
          value={theme}
          onSelect={(v) => {
            applyTheme(v);
            setTheme(v);
          }}
          trigger={
            <>
              <Swatches size={14} />
              {themes.find((t) => t.id === theme)?.name ?? 'Theme'}
            </>
          }
          items={themes.map((t) => ({
            value: t.id,
            label: t.name,
            hint: t.status !== 'available' ? 'soon' : undefined,
            disabled: t.status !== 'available',
          }))}
        />
        <SegmentedControl
          size="sm"
          aria-label="Color mode"
          value={mode}
          onChange={(v) => {
            const m = v as ThemeMode;
            applyMode(m);
            setMode(m);
          }}
          options={[
            { value: 'light', label: 'Light', icon: <Sun /> },
            { value: 'dark', label: 'Dark', icon: <Moon /> },
            { value: 'system', label: 'Auto', icon: <Monitor /> },
          ]}
        />
        <a
          className="docs-topbar__github"
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="View source on GitHub"
        >
          <GithubLogo size={20} />
        </a>
      </header>

      <aside className={drawerOpen ? 'docs-sidebar docs-sidebar--open' : 'docs-sidebar'}>
        <div className="docs-sidebar__drawer-head">
          <span>Table of contents</span>
          <button
            type="button"
            aria-label="Close table of contents"
            onClick={() => setDrawerOpen(false)}
          >
            <X size={16} weight="bold" />
          </button>
        </div>
        <p className="docs-sidebar__label">Guide</p>
        <NavLink to="/" end className="docs-sidebar__link">
          Cover
        </NavLink>
        <NavLink to="/getting-started" className="docs-sidebar__link">
          Getting Started
        </NavLink>
        <NavLink to="/foundations" className="docs-sidebar__link">
          Foundations
        </NavLink>
        <NavLink to="/theming" className="docs-sidebar__link">
          Theming
        </NavLink>
        <p className="docs-sidebar__label">Components</p>
        {componentDocs.map((d) => (
          <NavLink key={d.slug} to={`/components/${d.slug}`} className="docs-sidebar__link">
            <span className="docs-sidebar__num">{String(d.chapter).padStart(2, '0')}</span>
            {d.name}
          </NavLink>
        ))}
        <div className="docs-sidebar__foot">
          A portfolio project by{' '}
          <a href="https://github.com/Timorfiy" target="_blank" rel="noreferrer">
            Timorfiy
          </a>
        </div>
      </aside>
      {drawerOpen ? (
        <div className="docs-scrim" onClick={() => setDrawerOpen(false)} aria-hidden />
      ) : null}

      <main className="docs-main">
        <div className="docs-page-wrap">
          {/* key remounts the page on navigation — that remount *is* the page-turn */}
          <div className="docs-page uib-glass-thick" key={location.pathname}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
