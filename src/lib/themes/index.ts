/**
 * Theme registry.
 *
 * A UIBook theme is two things:
 *   1. metadata below (used by docs, switchers, marketing copy)
 *   2. one CSS file that maps the theme onto the shared --uib-* token space
 *      (see cupertino.css for the reference implementation)
 *
 * Components only ever read tokens, so adding a theme never touches
 * component code — register it here and ship a new CSS file.
 */

import './cupertino.css';

export type ThemeStatus = 'available' | 'planned';

export interface ThemeMeta {
  /** Applied as [data-uib-theme="<id>"] on the root element. */
  id: string;
  name: string;
  /** One-line pitch shown in the theme switcher. */
  tagline: string;
  description: string;
  status: ThemeStatus;
  /** Representative accent, used for swatches in docs. */
  accent: string;
}

export const themes: ThemeMeta[] = [
  {
    id: 'cupertino',
    name: 'Cupertino',
    tagline: 'Frosted glass, light and depth',
    description:
      'An Apple-inspired material language. Layered translucency, vibrancy-style blur with saturation, hairline strokes and specular highlights — tuned for the web.',
    status: 'available',
    accent: '#0a84ff',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Quiet surfaces, loud typography',
    description:
      'A flat, editorial counterpoint: warm monochrome, no blur, generous whitespace. Proof that the token architecture can express a radically different voice.',
    status: 'planned',
    accent: '#171717',
  },
  {
    id: 'codex',
    name: 'Codex',
    tagline: 'Terminal-native dark tech',
    description:
      'Monospace-first, phosphor accents, crisp 1px rules. A theme for developer tools, drawn from code editor aesthetics.',
    status: 'planned',
    accent: '#22c55e',
  },
];

export const availableThemes = themes.filter((t) => t.status === 'available');

export type ThemeMode = 'light' | 'dark' | 'system';

const THEME_KEY = 'uibook-theme';
const MODE_KEY = 'uibook-mode';

export function getStoredTheme(): string {
  try {
    return localStorage.getItem(THEME_KEY) ?? 'cupertino';
  } catch {
    return 'cupertino';
  }
}

export function getStoredMode(): ThemeMode {
  try {
    const m = localStorage.getItem(MODE_KEY);
    return m === 'light' || m === 'dark' || m === 'system' ? m : 'system';
  } catch {
    return 'system';
  }
}

/** Applies a theme to the document root and persists the choice. */
export function applyTheme(id: string, root: HTMLElement = document.documentElement): void {
  root.dataset.uibTheme = id;
  try {
    localStorage.setItem(THEME_KEY, id);
  } catch {
    /* private mode — non-fatal */
  }
}

/** Resolves 'system' against the OS preference. */
export function resolveMode(mode: ThemeMode): 'light' | 'dark' {
  if (mode !== 'system') return mode;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Applies a color mode to the document root and persists the choice. */
export function applyMode(mode: ThemeMode, root: HTMLElement = document.documentElement): void {
  root.dataset.uibMode = resolveMode(mode);
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    /* private mode — non-fatal */
  }
}
