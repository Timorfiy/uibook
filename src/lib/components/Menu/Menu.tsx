import {
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { CaretDown, Check } from '@phosphor-icons/react';
import { cn } from '../../utils/cn';
import './Menu.css';

export interface MenuItem {
  value: string;
  label: ReactNode;
  /** Right-aligned metadata, e.g. "soon" or a shortcut. */
  hint?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface MenuProps {
  items: MenuItem[];
  /** Currently selected value — shown with a check mark. */
  value?: string;
  onSelect?: (value: string) => void;
  /** Trigger button content (the current selection reads best). */
  trigger: ReactNode;
  /** Accessible name for the menu. */
  label: string;
  align?: 'start' | 'end';
  className?: string;
}

interface Pos {
  x: number;
  y: number;
  ready: boolean;
}

export function Menu({
  items,
  value,
  onSelect,
  trigger,
  label,
  align = 'start',
  className,
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0, ready: false });
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const triggerLabelId = useId();

  const close = (refocus = false) => {
    setOpen(false);
    if (refocus) btnRef.current?.focus();
  };

  // Measure once per open: drop below the trigger, flip up when cramped,
  // clamp horizontally to the viewport.
  useLayoutEffect(() => {
    if (!open) return;
    const b = btnRef.current?.getBoundingClientRect();
    const p = popRef.current;
    if (!b || !p) return;
    const pw = p.offsetWidth;
    const ph = p.offsetHeight;
    let x = align === 'end' ? b.right - pw : b.left;
    x = Math.min(Math.max(8, x), window.innerWidth - pw - 8);
    let y = b.bottom + 6;
    if (y + ph > window.innerHeight - 8) y = Math.max(8, b.top - ph - 6);
    setPos({ x, y, ready: true });
  }, [open, align]);

  // Focus the selected (or first enabled) item when the menu opens.
  // preventScroll: focusing must not scroll the page — that would trip the
  // scroll-dismiss below and close the menu instantly.
  useEffect(() => {
    if (!open) return;
    const pop = popRef.current;
    if (!pop) return;
    const target =
      pop.querySelector<HTMLButtonElement>('[data-selected="true"]') ??
      pop.querySelector<HTMLButtonElement>('.uib-menu__item:not(:disabled)');
    target?.focus({ preventScroll: true });
  }, [open]);

  // Dismiss on outside pointer, Escape, page scroll or resize. Scrolling
  // *inside* a long popup is allowed and must not close it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: Event) => {
      const t = e.target as Node;
      if (popRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };
    const onScroll = (e: Event) => {
      if (popRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onResize = () => setOpen(false);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const moveFocus = (dir: 1 | -1 | 'home' | 'end') => {
    const pop = popRef.current;
    if (!pop) return;
    const enabled = Array.from(
      pop.querySelectorAll<HTMLButtonElement>('.uib-menu__item:not(:disabled)'),
    );
    if (!enabled.length) return;
    if (dir === 'home') return enabled[0].focus();
    if (dir === 'end') return enabled[enabled.length - 1].focus();
    const i = enabled.indexOf(document.activeElement as HTMLButtonElement);
    enabled[(i + dir + enabled.length) % enabled.length].focus();
  };

  const onPopupKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveFocus(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveFocus(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      moveFocus('home');
    } else if (e.key === 'End') {
      e.preventDefault();
      moveFocus('end');
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div className={cn('uib-menu', className)}>
      <button
        ref={btnRef}
        type="button"
        className="uib-menu__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-labelledby={triggerLabelId}
        onClick={() => (open ? close(true) : setOpen(true))}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span id={triggerLabelId} className="uib-menu__trigger-label">
          {trigger}
        </span>
        <CaretDown
          size={13}
          weight="bold"
          className={cn('uib-menu__caret', open && 'uib-menu__caret--open')}
          aria-hidden
        />
      </button>
      {open
        ? createPortal(
            <div
              ref={popRef}
              role="menu"
              aria-label={label}
              className="uib-menu__popup uib-glass-thick"
              // opacity, not visibility: the pre-measure frame must stay
              // focusable (visibility:hidden elements refuse focus()).
              style={{ left: pos.x, top: pos.y, opacity: pos.ready ? 1 : 0 }}
              onKeyDown={onPopupKeyDown}
            >
              {items.map((item) => {
                const selected = item.value === value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    data-selected={selected}
                    disabled={item.disabled}
                    className="uib-menu__item"
                    onClick={() => {
                      onSelect?.(item.value);
                      close(true);
                    }}
                  >
                    <span className="uib-menu__check" aria-hidden>
                      {selected ? <Check size={13} weight="bold" /> : null}
                    </span>
                    {item.icon ? (
                      <span className="uib-menu__icon" aria-hidden>
                        {item.icon}
                      </span>
                    ) : null}
                    <span className="uib-menu__text">{item.label}</span>
                    {item.hint ? <span className="uib-menu__hint">{item.hint}</span> : null}
                  </button>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
