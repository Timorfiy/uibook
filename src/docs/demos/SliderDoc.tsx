import { Slider } from '../../lib';
import { ComponentDoc } from '../types';

export const sliderDoc: ComponentDoc = {
  slug: 'slider',
  name: 'Slider',
  chapter: 5,
  tagline: 'A continuous value on a tinted track.',
  description:
    'A fully re-skinned range input: accent fill up to the thumb, neutral fill beyond. The fill position is a CSS custom property, so dragging costs one style update — no layout work.',
  importCode: "import { Slider } from 'uibook';",
  demos: [
    {
      title: 'Basic',
      code: `<Slider defaultValue={64} showValue aria-label="Opacity" />`,
      element: (
        <div style={{ maxWidth: 340, width: '100%' }}>
          <Slider defaultValue={64} showValue aria-label="Opacity" />
        </div>
      ),
    },
    {
      title: 'Custom range',
      code: `<Slider min={0} max={10} step={0.5} defaultValue={7.5} showValue aria-label="Blur radius" />`,
      element: (
        <div style={{ maxWidth: 340, width: '100%' }}>
          <Slider min={0} max={10} step={0.5} defaultValue={7.5} showValue aria-label="Blur radius" />
        </div>
      ),
    },
    {
      title: 'Disabled',
      code: `<Slider defaultValue={30} disabled aria-label="Disabled" />`,
      element: (
        <div style={{ maxWidth: 340, width: '100%' }}>
          <Slider defaultValue={30} disabled aria-label="Disabled" />
        </div>
      ),
    },
  ],
  props: [
    { name: 'value', type: 'number', description: 'Controlled value.' },
    { name: 'defaultValue', type: 'number', default: '50', description: 'Initial value when uncontrolled.' },
    { name: 'min / max', type: 'number', default: '0 / 100', description: 'Value range.' },
    { name: 'step', type: 'number', default: '1', description: 'Increment between values.' },
    { name: 'onChange', type: '(value: number) => void', description: 'Fires as the thumb moves.' },
    { name: 'showValue', type: 'boolean', default: 'false', description: 'Trailing numeric readout.' },
  ],
};
