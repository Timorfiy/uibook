import { BookNav } from '../components/BookNav';
import { CodeBlock } from '../components/CodeBlock';

export function GettingStartedPage() {
  return (
    <div className="docs-prose">
      <p className="docs-chapter-tag">Guide</p>
      <h1 className="docs-page-title">Getting Started</h1>
      <p className="docs-lede">
        UIBook is a source-first library: the components live in <code>src/lib</code>, written
        in plain TypeScript and vanilla CSS. Use it inside this repo, or copy the folder into
        your own project — there is no build step to fight and no runtime engine to adopt.
      </p>

      <h2>Clone and run</h2>
      <CodeBlock
        lang="bash"
        code={`git clone https://github.com/Timorfiy/uibook.git
cd uibook
npm install
npm run dev   # this documentation site`}
      />

      <h2>Use a component</h2>
      <CodeBlock
        code={`import { Button, Switch } from './lib';

export function Toolbar() {
  return (
    <>
      <Switch label="Page-turn animation" defaultChecked />
      <Button variant="primary">Save changes</Button>
    </>
  );
}`}
      />
      <p>
        Importing from the library entry pulls in the base styles and every available theme.
        Tree-shaking drops the components you never import; the CSS is a few kilobytes of
        custom properties and class rules.
      </p>

      <h2>Set theme and mode</h2>
      <CodeBlock
        code={`import { applyTheme, applyMode } from './lib';

applyTheme('cupertino'); // writes data-uib-theme on <html>
applyMode('system');     // 'light' | 'dark' | 'system'`}
      />
      <p>
        No JavaScript? The same state can be declared as plain attributes — the CSS reads
        them either way:
      </p>
      <CodeBlock
        lang="tsx"
        code={`<html data-uib-theme="cupertino" data-uib-mode="dark">`}
      />

      <h2>Glass, without the jank</h2>
      <ul>
        <li>
          <strong>Blur is static.</strong> UIBook never animates <code>backdrop-filter</code> —
          panels animate transform and opacity only, so frames stay cheap.
        </li>
        <li>
          <strong>Glass needs a backdrop.</strong> Frosted surfaces are tuned to sit over colour
          or imagery; on flat backgrounds use <code>material="solid"</code>.
        </li>
        <li>
          <strong>Fallbacks are built in.</strong> Without <code>backdrop-filter</code> support,
          or when the user prefers reduced transparency, glass degrades to an opaque surface.
        </li>
        <li>
          <strong>Keep blurred regions bounded.</strong> A few medium surfaces outperform one
          viewport-sized blur on low-end GPUs.
        </li>
      </ul>

      <h2>Accessibility baseline</h2>
      <ul>
        <li>Visible, themeable focus rings on every interactive element.</li>
        <li>Correct roles: <code>switch</code>, <code>radiogroup</code>, <code>tablist</code>, <code>dialog</code> with <code>aria-modal</code>.</li>
        <li>Arrow-key navigation in SegmentedControl and Tabs; focus trapping in Modal.</li>
        <li>All motion collapses under <code>prefers-reduced-motion</code>.</li>
      </ul>

      <BookNav currentPath="/getting-started" />
    </div>
  );
}
