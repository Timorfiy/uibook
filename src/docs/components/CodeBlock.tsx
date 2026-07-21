import { useMemo, useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';
import { HighlightLang, tokenize } from './highlight';

interface CodeBlockProps {
  code: string;
  lang?: HighlightLang;
  title?: string;
}

export function CodeBlock({ code, lang = 'tsx', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const tokens = useMemo(() => tokenize(code.trim(), lang), [code, lang]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
    } catch {
      // Clipboard API blocked (insecure context) — select-and-copy fallback.
      const ta = document.createElement('textarea');
      ta.value = code.trim();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <figure className="docs-code">
      <figcaption className="docs-code__bar">
        <span className="docs-code__title">{title ?? lang}</span>
        <button type="button" className="docs-code__copy" onClick={copy} aria-label="Copy code">
          {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre className="docs-code__pre">
        <code>
          {tokens.map((t, i) =>
            t.type === 'plain' ? (
              <span key={i}>{t.text}</span>
            ) : (
              <span key={i} className={`tok-${t.type}`}>
                {t.text}
              </span>
            ),
          )}
        </code>
      </pre>
    </figure>
  );
}
