import { Tabs } from '../../lib';
import { ComponentDoc } from '../types';

export const tabsDoc: ComponentDoc = {
  slug: 'tabs',
  name: 'Tabs',
  chapter: 7,
  tagline: 'Two rhythms: underline and floating pill.',
  description:
    'Navigation between sibling views. The line variant reads as document chrome; the pill variant is the same sliding-thumb physics as SegmentedControl. Both share one measurement hook.',
  importCode: "import { Tabs } from 'uibook';",
  demos: [
    {
      title: 'Line',
      code: `<Tabs
  aria-label="Chapter sections"
  items={[
    { value: 'overview', label: 'Overview' },
    { value: 'examples', label: 'Examples' },
    { value: 'api', label: 'API' },
  ]}
/>`,
      element: (
        <div style={{ width: '100%', maxWidth: 420 }}>
          <Tabs
            aria-label="Chapter sections"
            items={[
              { value: 'overview', label: 'Overview' },
              { value: 'examples', label: 'Examples' },
              { value: 'api', label: 'API' },
            ]}
          />
        </div>
      ),
    },
    {
      title: 'Pill',
      code: `<Tabs
  variant="pill"
  aria-label="Preview density"
  items={[
    { value: 'compact', label: 'Compact' },
    { value: 'cozy', label: 'Cozy' },
    { value: 'roomy', label: 'Roomy' },
  ]}
/>`,
      element: (
        <Tabs
          variant="pill"
          aria-label="Preview density"
          items={[
            { value: 'compact', label: 'Compact' },
            { value: 'cozy', label: 'Cozy' },
            { value: 'roomy', label: 'Roomy' },
          ]}
        />
      ),
    },
  ],
  props: [
    { name: 'items', type: 'TabItem[]', description: '{ value, label, disabled? }.' },
    { name: 'value', type: 'string', description: 'Controlled active tab.' },
    { name: 'defaultValue', type: 'string', description: 'Initial tab when uncontrolled.' },
    { name: 'onChange', type: '(value: string) => void', description: 'Called on tab change.' },
    { name: 'variant', type: "'line' | 'pill'", default: "'line'", description: 'Underline or floating-thumb style.' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Tabs share the container width.' },
  ],
};
