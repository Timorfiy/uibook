import { MagnifyingGlass } from '@phosphor-icons/react';
import { TextField } from '../../lib';
import { ComponentDoc } from '../types';

export const textFieldDoc: ComponentDoc = {
  slug: 'textfield',
  name: 'TextField',
  chapter: 3,
  tagline: 'Labels, helpers and validation, baked in.',
  description:
    'A labelled input with the anatomy done right: label above, helper below, error replacing the helper and flagged with aria-invalid. The focus ring lives on the control frame, not the raw input.',
  importCode: "import { TextField } from 'uibook';",
  demos: [
    {
      title: 'Anatomy',
      code: `<TextField
  label="Display name"
  placeholder="Ada Lovelace"
  helper="Shown on your public profile."
/>`,
      element: (
        <div style={{ maxWidth: 320, width: '100%' }}>
          <TextField label="Display name" placeholder="Ada Lovelace" helper="Shown on your public profile." />
        </div>
      ),
    },
    {
      title: 'Validation',
      description: 'Pass an error string and the field handles colour, ring and role="alert".',
      code: `<TextField
  label="Email"
  defaultValue="ada@analytical"
  error="That address is incomplete."
/>`,
      element: (
        <div style={{ maxWidth: 320, width: '100%' }}>
          <TextField label="Email" defaultValue="ada@analytical" error="That address is incomplete." />
        </div>
      ),
    },
    {
      title: 'With icon',
      code: `<TextField
  icon={<MagnifyingGlass />}
  placeholder="Search the book"
  aria-label="Search"
/>`,
      element: (
        <div style={{ maxWidth: 320, width: '100%' }}>
          <TextField icon={<MagnifyingGlass />} placeholder="Search the book" aria-label="Search" />
        </div>
      ),
    },
  ],
  props: [
    { name: 'label', type: 'string', description: 'Visible label, wired to the input via htmlFor.' },
    { name: 'helper', type: 'string', description: 'Neutral hint below the field.' },
    { name: 'error', type: 'string', description: 'Replaces the helper, sets aria-invalid.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control height: 28, 36 or 44 px.' },
    { name: 'icon', type: 'ReactNode', description: 'Leading icon inside the control frame.' },
    { name: 'fullWidth', type: 'boolean', default: 'true', description: 'Stretches to the container width.' },
  ],
};
