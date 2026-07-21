import { useState } from 'react';
import { Switch } from '../../lib';
import { ComponentDoc } from '../types';

function ControlledDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="docs-row">
      <Switch checked={on} onChange={setOn} aria-label="Page-turn animation" />
      <span className="docs-muted">Page-turn animation is {on ? 'on' : 'off'}</span>
    </div>
  );
}

export const switchDoc: ComponentDoc = {
  slug: 'switch',
  name: 'Switch',
  chapter: 4,
  tagline: 'A binary setting with spring in its step.',
  description:
    'The iOS-style toggle: a role="switch" button with a sprung knob. Works controlled or uncontrolled, and pairs with a visible label that toggles on click.',
  importCode: "import { Switch } from 'uibook';",
  demos: [
    {
      title: 'With label',
      code: `<Switch label="Reduce transparency" defaultChecked />
<Switch label="Notifications" />`,
      element: (
        <div className="docs-col">
          <Switch label="Reduce transparency" defaultChecked />
          <Switch label="Notifications" />
        </div>
      ),
    },
    {
      title: 'Controlled',
      description: 'Drive it from state to react to changes.',
      code: `const [on, setOn] = useState(true);

<Switch checked={on} onChange={setOn} aria-label="Page-turn animation" />
<span>Page-turn animation is {on ? 'on' : 'off'}</span>`,
      element: <ControlledDemo />,
    },
    {
      title: 'Sizes and disabled',
      code: `<Switch size="sm" defaultChecked aria-label="Small on" />
<Switch size="sm" aria-label="Small off" />
<Switch disabled aria-label="Disabled" />`,
      element: (
        <div className="docs-row">
          <Switch size="sm" defaultChecked aria-label="Small on" />
          <Switch size="sm" aria-label="Small off" />
          <Switch disabled aria-label="Disabled" />
        </div>
      ),
    },
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'Controlled state.' },
    { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial state when uncontrolled.' },
    { name: 'onChange', type: '(checked: boolean) => void', description: 'Called with the next state.' },
    { name: 'label', type: 'string', description: 'Visible label; clicking it toggles the switch.' },
    { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Track size: 51×31 or 41×25 px.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Dims and blocks interaction.' },
  ],
};
