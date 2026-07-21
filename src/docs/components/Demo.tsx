import { ReactNode, useState } from 'react';
import { Code, X } from '@phosphor-icons/react';
import { cn } from '../../lib';
import { CodeBlock } from './CodeBlock';

interface DemoProps {
  title: string;
  description?: string;
  code: string;
  scene?: boolean;
  children: ReactNode;
}

/** Live example frame: interactive preview on top, source on demand. */
export function Demo({ title, description, code, scene = true, children }: DemoProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <section className="docs-demo">
      <header className="docs-demo__head">
        <div>
          <h3 className="docs-demo__title">{title}</h3>
          {description ? <p className="docs-demo__desc">{description}</p> : null}
        </div>
        <button
          type="button"
          className={cn('docs-demo__toggle', showCode && 'docs-demo__toggle--on')}
          onClick={() => setShowCode((v) => !v)}
          aria-expanded={showCode}
        >
          {showCode ? <X size={14} weight="bold" /> : <Code size={14} weight="bold" />}
          {showCode ? 'Hide' : 'Code'}
        </button>
      </header>
      <div className={cn('docs-demo__preview', scene && 'docs-demo__preview--scene')}>
        <div className="docs-demo__canvas">{children}</div>
      </div>
      {showCode ? <CodeBlock code={code} lang="tsx" /> : null}
    </section>
  );
}
