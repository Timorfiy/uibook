import {
  CSSProperties,
  ReactNode,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import './Tooltip.css';

export interface TooltipProps {
  content: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Hover delay in ms before the tooltip appears. */
  delay?: number;
  children: ReactNode;
  className?: string;
}

interface Pos {
  x: number;
  y: number;
  arrowX?: number;
  arrowY?: number;
}

const GAP = 9;
const VIEWPORT_PAD = 8;

export function Tooltip({ content, side = 'top', delay = 250, children, className }: TooltipProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<number>();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });
  const id = useId();

  const show = () => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    window.clearTimeout(timerRef.current);
    setOpen(false);
  };

  // Measure once per open; tooltips are transient, so no scroll tracking.
  useLayoutEffect(() => {
    if (!open) return;
    const anchor = anchorRef.current;
    const tip = tipRef.current;
    if (!anchor || !tip) return;
    const a = anchor.getBoundingClientRect();
    const t = tip.getBoundingClientRect();

    let x = 0;
    let y = 0;
    if (side === 'top' || side === 'bottom') {
      x = a.left + a.width / 2 - t.width / 2;
      y = side === 'top' ? a.top - t.height - GAP : a.bottom + GAP;
      x = Math.min(Math.max(x, VIEWPORT_PAD), window.innerWidth - t.width - VIEWPORT_PAD);
      setPos({ x, y, arrowX: a.left + a.width / 2 - x });
    } else {
      x = side === 'left' ? a.left - t.width - GAP : a.right + GAP;
      y = a.top + a.height / 2 - t.height / 2;
      y = Math.min(Math.max(y, VIEWPORT_PAD), window.innerHeight - t.height - VIEWPORT_PAD);
      setPos({ x, y, arrowY: a.top + a.height / 2 - y });
    }
  }, [open, side]);

  return (
    <>
      <span
        ref={anchorRef}
        className={cn('uib-tooltip-anchor', className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={open ? id : undefined}
      >
        {children}
      </span>
      {open
        ? createPortal(
            <span
              ref={tipRef}
              id={id}
              role="tooltip"
              className={cn('uib-tooltip', `uib-tooltip--${side}`)}
              style={
                {
                  left: pos.x,
                  top: pos.y,
                  '--uib-tip-arrow-x': pos.arrowX !== undefined ? `${pos.arrowX}px` : undefined,
                  '--uib-tip-arrow-y': pos.arrowY !== undefined ? `${pos.arrowY}px` : undefined,
                } as CSSProperties
              }
            >
              {content}
            </span>,
            document.body,
          )
        : null}
    </>
  );
}
