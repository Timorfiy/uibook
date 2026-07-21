import { Button, Tooltip } from '../../lib';
import { ComponentDoc } from '../types';

export const tooltipDoc: ComponentDoc = {
  slug: 'tooltip',
  name: 'Tooltip',
  chapter: 10,
  tagline: 'A whisper on hover, silent on touch.',
  description:
    'Mouse- and keyboard-triggered, measured once per open and clamped to the viewport. The arrow tracks the anchor even when the bubble shifts to stay on screen.',
  importCode: "import { Tooltip } from 'uibook';",
  demos: [
    {
      title: 'Four sides',
      code: `<Tooltip content="Previous page" side="top"><Button variant="glass">Top</Button></Tooltip>
<Tooltip content="Next page" side="right"><Button variant="glass">Right</Button></Tooltip>
<Tooltip content="Bookmark" side="bottom"><Button variant="glass">Bottom</Button></Tooltip>
<Tooltip content="Table of contents" side="left"><Button variant="glass">Left</Button></Tooltip>`,
      element: (
        <div className="docs-row">
          <Tooltip content="Previous page" side="top">
            <Button variant="glass">Top</Button>
          </Tooltip>
          <Tooltip content="Next page" side="right">
            <Button variant="glass">Right</Button>
          </Tooltip>
          <Tooltip content="Bookmark" side="bottom">
            <Button variant="glass">Bottom</Button>
          </Tooltip>
          <Tooltip content="Table of contents" side="left">
            <Button variant="glass">Left</Button>
          </Tooltip>
        </div>
      ),
    },
  ],
  props: [
    { name: 'content', type: 'ReactNode', description: 'Tooltip body — keep it to one line.' },
    { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred placement.' },
    { name: 'delay', type: 'number', default: '250', description: 'Hover delay in ms before appearing.' },
    { name: 'children', type: 'ReactNode', description: 'The anchor element(s).' },
  ],
};
