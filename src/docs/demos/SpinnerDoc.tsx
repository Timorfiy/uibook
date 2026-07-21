import { Button, Spinner } from '../../lib';
import { ComponentDoc } from '../types';

export const spinnerDoc: ComponentDoc = {
  slug: 'spinner',
  name: 'Spinner',
  chapter: 12,
  tagline: 'The smallest possible wait indicator.',
  description:
    'A single-element arc spinner driven by one GPU-cheap rotation. The current tone inherits text colour, which is exactly what Button uses for its loading state.',
  importCode: "import { Spinner } from 'uibook';",
  demos: [
    {
      title: 'Sizes and tones',
      code: `<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />
<Spinner tone="current" />`,
      element: (
        <div className="docs-row">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" />
          <span className="docs-muted">
            <Spinner tone="current" />
          </span>
        </div>
      ),
    },
    {
      title: 'Inside a button',
      code: `<Button loading>Saving</Button>`,
      scene: false,
      element: <Button loading>Saving</Button>,
    },
  ],
  props: [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '14, 18 or 26 px.' },
    { name: 'tone', type: "'current' | 'accent' | 'inverse'", default: "'accent'", description: 'Colour source for the arc.' },
  ],
};
