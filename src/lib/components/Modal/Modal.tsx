import { KeyboardEvent, ReactNode, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';
import './Modal.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  /** Actions row, rendered right-aligned below the body. */
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnBackdrop?: boolean;
}

const EXIT_MS = 220;

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
}: ModalProps) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number>();
  const titleId = useId();

  useEffect(() => {
    if (open) {
      setRendered(true);
      // Next frame: flip to visible so the enter transition actually runs.
      const raf = requestAnimationFrame(() => setVisible(true));
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = prevOverflow;
      };
    }
    if (rendered) {
      setVisible(false);
      timerRef.current = window.setTimeout(() => setRendered(false), EXIT_MS);
      return () => window.clearTimeout(timerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Move focus into the dialog once the panel is actually in the DOM.
  useEffect(() => {
    if (rendered && open) panelRef.current?.focus();
  }, [rendered, open]);

  if (!rendered) return null;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not(:disabled), input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div
      className={cn('uib-modal-backdrop', visible && 'uib-modal-backdrop--visible')}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && closeOnBackdrop) onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title ? undefined : 'Dialog'}
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cn('uib-modal', 'uib-glass-thick', `uib-modal--${size}`)}
      >
        <div className="uib-modal__header">
          {title ? (
            <h2 id={titleId} className="uib-modal__title">
              {title}
            </h2>
          ) : null}
          <button type="button" className="uib-modal__close" aria-label="Close" onClick={onClose}>
            <X size={16} weight="bold" />
          </button>
        </div>
        <div className="uib-modal__body">{children}</div>
        {footer ? <div className="uib-modal__footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
