import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { neighbours } from '../registry';

/** Previous / next page links — the physical act of turning a page. */
export function BookNav({ currentPath }: { currentPath: string }) {
  const { prev, next } = neighbours(currentPath);
  if (!prev && !next) return null;

  return (
    <nav className="docs-booknav" aria-label="Turn the page">
      {prev ? (
        <Link to={prev.path} className="docs-booknav__link uib-glass">
          <span className="docs-booknav__dir">
            <ArrowLeft size={13} weight="bold" /> Previous
          </span>
          <span className="docs-booknav__title">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={next.path} className="docs-booknav__link docs-booknav__link--next uib-glass">
          <span className="docs-booknav__dir">
            Next <ArrowRight size={13} weight="bold" />
          </span>
          <span className="docs-booknav__title">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
