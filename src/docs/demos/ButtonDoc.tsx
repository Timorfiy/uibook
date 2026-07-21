import { PaperPlaneTilt, Plus } from '@phosphor-icons/react';
import { Button } from '../../lib';
import { ComponentDoc } from '../types';

export const buttonDoc: ComponentDoc = {
  slug: 'button',
  name: 'Button',
  chapter: 1,
  tagline: 'Four weights, one continuous pill.',
  description:
    'The most-used control in the library. Primary carries the theme accent with a specular sheen, secondary sits on a neutral fill, glass frosts whatever is behind it, and plain collapses to tinted text.',
  importCode: "import { Button } from 'uibook';",
  demos: [
    {
      title: 'Variants',
      description: 'A hierarchy of emphasis — pick one primary action per view.',
      code: `<Button variant="primary">Get Started</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="glass">Glass</Button>
<Button variant="plain">Plain</Button>`,
      element: (
        <div className="docs-row">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="glass">Glass</Button>
          <Button variant="plain">Plain</Button>
        </div>
      ),
    },
    {
      title: 'Sizes',
      code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
      element: (
        <div className="docs-row">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      ),
    },
    {
      title: 'Icons, loading and disabled',
      description: 'Loading swaps the icon for a spinner and blocks further taps.',
      code: `<Button icon={<Plus weight="bold" />}>New Page</Button>
<Button variant="secondary" icon={<PaperPlaneTilt />}>Send</Button>
<Button loading>Uploading</Button>
<Button disabled>Unavailable</Button>`,
      element: (
        <div className="docs-row">
          <Button icon={<Plus weight="bold" />}>New Page</Button>
          <Button variant="secondary" icon={<PaperPlaneTilt />}>
            Send
          </Button>
          <Button loading>Uploading</Button>
          <Button disabled>Unavailable</Button>
        </div>
      ),
    },
  ],
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'glass' | 'plain'", default: "'primary'", description: 'Visual weight of the button.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control height: 28, 36 or 44 px.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables interaction.' },
    { name: 'icon', type: 'ReactNode', description: 'Icon rendered before the label.' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches the button to its container.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Standard HTML button attribute.' },
  ],
};
