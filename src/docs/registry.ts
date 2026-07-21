import { ComponentDoc, guidePages } from './types';
import { buttonDoc } from './demos/ButtonDoc';
import { cardDoc } from './demos/CardDoc';
import { textFieldDoc } from './demos/TextFieldDoc';
import { switchDoc } from './demos/SwitchDoc';
import { sliderDoc } from './demos/SliderDoc';
import { segmentedControlDoc } from './demos/SegmentedControlDoc';
import { tabsDoc } from './demos/TabsDoc';
import { modalDoc } from './demos/ModalDoc';
import { toastDoc } from './demos/ToastDoc';
import { tooltipDoc } from './demos/TooltipDoc';
import { badgeDoc } from './demos/BadgeDoc';
import { spinnerDoc } from './demos/SpinnerDoc';
import { menuDoc } from './demos/MenuDoc';

export const componentDocs: ComponentDoc[] = [
  buttonDoc,
  cardDoc,
  textFieldDoc,
  switchDoc,
  sliderDoc,
  segmentedControlDoc,
  tabsDoc,
  modalDoc,
  toastDoc,
  tooltipDoc,
  badgeDoc,
  spinnerDoc,
  menuDoc,
];

export const getDoc = (slug: string) => componentDocs.find((d) => d.slug === slug);

export interface BookPage {
  path: string;
  title: string;
  section: 'Guide' | 'Components';
  chapter?: number;
}

/** Every page in reading order — the spine of the book. */
export const bookPages: BookPage[] = [
  ...guidePages.map<BookPage>((p) => ({ path: p.path, title: p.title, section: 'Guide' })),
  ...componentDocs.map<BookPage>((d) => ({
    path: `/components/${d.slug}`,
    title: d.name,
    section: 'Components',
    chapter: d.chapter,
  })),
];

export const neighbours = (path: string): { prev?: BookPage; next?: BookPage } => {
  const i = bookPages.findIndex((p) => p.path === path);
  return {
    prev: i > 0 ? bookPages[i - 1] : undefined,
    next: i >= 0 && i < bookPages.length - 1 ? bookPages[i + 1] : undefined,
  };
};
