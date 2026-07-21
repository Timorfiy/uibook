import { GridFour, Rows, SquaresFour } from '@phosphor-icons/react';
import { SegmentedControl } from '../../lib';
import { ComponentDoc } from '../types';

export const segmentedControlDoc: ComponentDoc = {
  slug: 'segmented-control',
  name: 'SegmentedControl',
  chapter: 6,
  tagline: 'Mutually exclusive, mechanically satisfying.',
  description:
    'The classic iOS segment picker with a sliding thumb. The thumb is one absolutely-positioned element animated with transform only; a ResizeObserver keeps it glued to the active segment across fonts, zoom and container resizes.',
  importCode: "import { SegmentedControl } from 'uibook';",
  demos: [
    {
      title: 'Basic',
      description: 'Arrow keys move the selection when a segment has focus.',
      code: `<SegmentedControl
  aria-label="Reading mode"
  options={[
    { value: 'read', label: 'Read' },
    { value: 'listen', label: 'Listen' },
    { value: 'watch', label: 'Watch' },
  ]}
/>`,
      element: (
        <SegmentedControl
          aria-label="Reading mode"
          options={[
            { value: 'read', label: 'Read' },
            { value: 'listen', label: 'Listen' },
            { value: 'watch', label: 'Watch' },
          ]}
        />
      ),
    },
    {
      title: 'With icons, full width',
      code: `<SegmentedControl
  fullWidth
  aria-label="Layout"
  options={[
    { value: 'list', label: 'List', icon: <Rows /> },
    { value: 'grid', label: 'Grid', icon: <GridFour /> },
    { value: 'masonry', label: 'Masonry', icon: <SquaresFour /> },
  ]}
/>`,
      element: (
        <div style={{ maxWidth: 380, width: '100%' }}>
          <SegmentedControl
            fullWidth
            aria-label="Layout"
            options={[
              { value: 'list', label: 'List', icon: <Rows /> },
              { value: 'grid', label: 'Grid', icon: <GridFour /> },
              { value: 'masonry', label: 'Masonry', icon: <SquaresFour /> },
            ]}
          />
        </div>
      ),
    },
  ],
  props: [
    { name: 'options', type: 'SegmentedOption[]', description: '{ value, label, icon?, disabled? }.' },
    { name: 'value', type: 'string', description: 'Controlled selection.' },
    { name: 'defaultValue', type: 'string', description: 'Initial selection when uncontrolled.' },
    { name: 'onChange', type: '(value: string) => void', description: 'Called on selection change.' },
    { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Segment height: 24 or 28 px.' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Segments share the container width equally.' },
  ],
};
