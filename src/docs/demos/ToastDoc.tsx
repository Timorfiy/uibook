import { Button, useToast } from '../../lib';
import { ComponentDoc } from '../types';

function ToastDemo() {
  const { push } = useToast();
  return (
    <div className="docs-row">
      <Button
        variant="secondary"
        onClick={() =>
          push({ title: 'Page saved', description: 'Your margin notes were synced.', tone: 'success' })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          push({ title: 'Sync failed', description: 'The bookmark service is unreachable.', tone: 'error' })
        }
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => push({ title: 'Chapter 9 continues below', tone: 'default' })}
      >
        Default
      </Button>
    </div>
  );
}

export const toastDoc: ComponentDoc = {
  slug: 'toast',
  name: 'Toast',
  chapter: 9,
  tagline: 'Transient notes from the margin.',
  description:
    'A provider-plus-hook pair. Toasts stack in the top corner on frosted glass, cap at four, and dismiss themselves — hover the close button or wait them out.',
  importCode: "import { ToastProvider, useToast } from 'uibook';",
  demos: [
    {
      title: 'Pushing toasts',
      description: 'Wrap the app once, then push from anywhere below the provider.',
      code: `// once, near the root:
<ToastProvider>{children}</ToastProvider>

// anywhere below:
const { push } = useToast();

push({ title: 'Page saved', tone: 'success' });
push({ title: 'Sync failed', description: 'Try again.', tone: 'error' });`,
      scene: false,
      element: <ToastDemo />,
    },
  ],
  props: [
    { name: 'title', type: 'string', description: 'Bold first line.' },
    { name: 'description', type: 'string', description: 'Optional second line.' },
    { name: 'tone', type: "'default' | 'success' | 'error'", default: "'default'", description: 'Icon and accent colour.' },
    { name: 'duration', type: 'number', default: '4200', description: 'Auto-dismiss delay in ms; 0 pins the toast.' },
  ],
};
