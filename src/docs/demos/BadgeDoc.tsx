import { Badge } from '../../lib';
import { ComponentDoc } from '../types';

export const badgeDoc: ComponentDoc = {
  slug: 'badge',
  name: 'Badge',
  chapter: 11,
  tagline: 'Status in a capsule.',
  description:
    'Small tinted labels for state and metadata. Soft badges wash the tone over the surface; solid badges fill it — use solid sparingly, it is loud by design.',
  importCode: "import { Badge } from 'uibook';",
  demos: [
    {
      title: 'Soft tones',
      code: `<Badge>Stable</Badge>
<Badge tone="success">Synced</Badge>
<Badge tone="warning">Beta</Badge>
<Badge tone="danger">Breaking</Badge>
<Badge tone="neutral">Draft</Badge>`,
      element: (
        <div className="docs-row">
          <Badge>Stable</Badge>
          <Badge tone="success">Synced</Badge>
          <Badge tone="warning">Beta</Badge>
          <Badge tone="danger">Breaking</Badge>
          <Badge tone="neutral">Draft</Badge>
        </div>
      ),
    },
    {
      title: 'Solid tones',
      code: `<Badge variant="solid">New</Badge>
<Badge variant="solid" tone="success">Shipped</Badge>
<Badge variant="solid" tone="danger">Deprecated</Badge>`,
      element: (
        <div className="docs-row">
          <Badge variant="solid">New</Badge>
          <Badge variant="solid" tone="success">
            Shipped
          </Badge>
          <Badge variant="solid" tone="danger">
            Deprecated
          </Badge>
        </div>
      ),
    },
  ],
  props: [
    { name: 'tone', type: "'accent' | 'success' | 'warning' | 'danger' | 'neutral'", default: "'accent'", description: 'Semantic colour.' },
    { name: 'variant', type: "'soft' | 'solid'", default: "'soft'", description: 'Tinted wash or filled capsule.' },
  ],
};
