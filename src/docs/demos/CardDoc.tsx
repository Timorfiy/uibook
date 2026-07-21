import { Card } from '../../lib';
import { ComponentDoc } from '../types';

export const cardDoc: ComponentDoc = {
  slug: 'card',
  name: 'Card',
  chapter: 2,
  tagline: 'The glass material, in three depths.',
  description:
    'Cards are the canonical glass surface. Three frosted materials mirror the iOS vibrancy ramp — thin for floating chrome, regular for content, thick for sheets — plus a solid variant for dense layouts. Drag the mode toggle in the top bar to see both palettes.',
  importCode: "import { Card } from 'uibook';",
  demos: [
    {
      title: 'Materials',
      description: 'Same content, increasing blur and opacity. Glass needs a busy backdrop — that is what the scene is for.',
      code: `<Card material="thin">Thin · 12px blur</Card>
<Card material="regular">Regular · 20px blur</Card>
<Card material="thick">Thick · 32px blur</Card>
<Card material="solid">Solid</Card>`,
      element: (
        <div className="docs-grid-2">
          <Card material="thin">
            <strong>Thin</strong>
            <p className="docs-muted">12px blur · floating chrome</p>
          </Card>
          <Card material="regular">
            <strong>Regular</strong>
            <p className="docs-muted">20px blur · content surfaces</p>
          </Card>
          <Card material="thick">
            <strong>Thick</strong>
            <p className="docs-muted">32px blur · sheets and modals</p>
          </Card>
          <Card material="solid">
            <strong>Solid</strong>
            <p className="docs-muted">Opaque · dense layouts</p>
          </Card>
        </div>
      ),
    },
    {
      title: 'Interactive',
      description: 'Deepens its shadow on hover and presses on tap — for cards that navigate.',
      code: `<Card material="regular" interactive>
  <strong>Chapter 03 — TextField</strong>
  <p>Labels, helpers and validation, baked in.</p>
</Card>`,
      element: (
        <Card material="regular" interactive>
          <strong>Chapter 03 — TextField</strong>
          <p className="docs-muted">Labels, helpers and validation, baked in.</p>
        </Card>
      ),
    },
  ],
  props: [
    { name: 'material', type: "'thin' | 'regular' | 'thick' | 'solid'", default: "'regular'", description: 'Surface material: frosted glass in three depths, or opaque.' },
    { name: 'interactive', type: 'boolean', default: 'false', description: 'Adds hover emphasis and press feedback.' },
    { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Inner spacing scale.' },
  ],
};
