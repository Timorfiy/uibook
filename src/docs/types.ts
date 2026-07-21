import { ReactNode } from 'react';

export interface DemoItem {
  title: string;
  description?: string;
  code: string;
  element: ReactNode;
  /** Render against the ambient scene so translucency is visible. */
  scene?: boolean;
}

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  /** Chapter number inside the Components section. */
  chapter: number;
  tagline: string;
  description: string;
  importCode: string;
  demos: DemoItem[];
  props: PropRow[];
}

export interface GuidePage {
  path: string;
  title: string;
}

/** Flat reading order of the whole book (used for prev/next page-turning). */
export const guidePages: GuidePage[] = [
  { path: '/getting-started', title: 'Getting Started' },
  { path: '/foundations', title: 'Foundations' },
  { path: '/theming', title: 'Theming' },
];
