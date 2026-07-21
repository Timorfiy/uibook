import { useState } from 'react';
import { Button, Modal } from '../../lib';
import { ComponentDoc } from '../types';

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this chapter?"
        footer={
          <>
            <Button variant="plain" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        This removes Chapter 12 and its three examples from the book. Footnotes
        that reference it will be kept, marked as dangling.
      </Modal>
    </>
  );
}

export const modalDoc: ComponentDoc = {
  slug: 'modal',
  name: 'Modal',
  chapter: 8,
  tagline: 'A sheet of thick glass over a dimmed page.',
  description:
    'Focus-trapped, scroll-locked and dismissable via Escape, backdrop click or the close button. The surface uses the thick material; the backdrop adds its own gentle blur so the page behind recedes.',
  importCode: "import { Modal } from 'uibook';",
  demos: [
    {
      title: 'Confirmation dialog',
      description: 'Enter animation is transform + opacity — the backdrop-filter never animates.',
      code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open modal</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete this chapter?"
  footer={
    <>
      <Button variant="plain" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>Delete</Button>
    </>
  }
>
  This removes Chapter 12 and its three examples from the book.
</Modal>`,
      scene: false,
      element: <ModalDemo />,
    },
  ],
  props: [
    { name: 'open', type: 'boolean', description: 'Controls visibility; exit animation plays on close.' },
    { name: 'onClose', type: '() => void', description: 'Called by Escape, backdrop and the close button.' },
    { name: 'title', type: 'string', description: 'Heading, wired via aria-labelledby.' },
    { name: 'footer', type: 'ReactNode', description: 'Right-aligned action row.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Max width: 360, 460 or 640 px.' },
    { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Clicking the dim closes the dialog.' },
  ],
};
