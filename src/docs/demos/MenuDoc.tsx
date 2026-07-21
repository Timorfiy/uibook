import { useState } from 'react';
import { ArchiveBox, PencilSimple, ShareNetwork, Trash } from '@phosphor-icons/react';
import { Menu } from '../../lib';
import { ComponentDoc } from '../types';

const sortLabels: Record<string, string> = {
  chapter: 'Chapter order',
  alpha: 'Alphabetical',
  recent: 'Recently updated',
};

function SortDemo() {
  const [sort, setSort] = useState('chapter');
  return (
    <div className="docs-row">
      <Menu
        label="Sort components"
        value={sort}
        onSelect={setSort}
        trigger={sortLabels[sort]}
        items={[
          { value: 'chapter', label: 'Chapter order' },
          { value: 'alpha', label: 'Alphabetical' },
          { value: 'recent', label: 'Recently updated' },
        ]}
      />
      <span className="docs-muted">Sorted by {sortLabels[sort].toLowerCase()}</span>
    </div>
  );
}

function ActionsDemo() {
  const [action, setAction] = useState('share');
  return (
    <Menu
      label="Page actions"
      align="end"
      value={action}
      onSelect={setAction}
      trigger="Page actions"
      items={[
        { value: 'share', label: 'Share page', icon: <ShareNetwork /> },
        { value: 'rename', label: 'Rename', icon: <PencilSimple /> },
        { value: 'archive', label: 'Archive', icon: <ArchiveBox />, hint: 'soon', disabled: true },
        { value: 'delete', label: 'Delete', icon: <Trash /> },
      ]}
    />
  );
}

export const menuDoc: ComponentDoc = {
  slug: 'menu',
  name: 'Menu',
  chapter: 13,
  tagline: 'A single-select dropdown on thick glass.',
  description:
    'A select-style dropdown with a frosted popup and macOS-grade contrast: the highlighted row is solid accent with white text, readable over any backdrop. Full keyboard support (arrows, Home/End, Escape), automatic flip when the viewport edge is near, and check marks on the current value.',
  importCode: "import { Menu } from 'uibook';",
  demos: [
    {
      title: 'Selecting an option',
      description: 'The trigger shows the current value; the popup marks it with a check.',
      code: `const [sort, setSort] = useState('chapter');

<Menu
  label="Sort components"
  value={sort}
  onSelect={setSort}
  trigger={labels[sort]}
  items={[
    { value: 'chapter', label: 'Chapter order' },
    { value: 'alpha', label: 'Alphabetical' },
    { value: 'recent', label: 'Recently updated' },
  ]}
/>`,
      element: <SortDemo />,
    },
    {
      title: 'Icons, hints and disabled items',
      description: 'Hints sit right-aligned; disabled rows stay visible but unreachable.',
      code: `<Menu
  label="Page actions"
  align="end"
  value={action}
  onSelect={setAction}
  trigger="Page actions"
  items={[
    { value: 'share', label: 'Share page', icon: <ShareNetwork /> },
    { value: 'rename', label: 'Rename', icon: <PencilSimple /> },
    { value: 'archive', label: 'Archive', icon: <ArchiveBox />, hint: 'soon', disabled: true },
    { value: 'delete', label: 'Delete', icon: <Trash /> },
  ]}
/>`,
      element: <ActionsDemo />,
    },
  ],
  props: [
    { name: 'items', type: 'MenuItem[]', description: '{ value, label, hint?, icon?, disabled? }.' },
    { name: 'value', type: 'string', description: 'Selected value, marked with a check.' },
    { name: 'onSelect', type: '(value: string) => void', description: 'Called with the picked value; the menu closes.' },
    { name: 'trigger', type: 'ReactNode', description: 'Trigger button content — usually the current selection.' },
    { name: 'label', type: 'string', description: 'Accessible name for the popup menu (required).' },
    { name: 'align', type: "'start' | 'end'", default: "'start'", description: 'Popup edge alignment relative to the trigger.' },
  ],
};
