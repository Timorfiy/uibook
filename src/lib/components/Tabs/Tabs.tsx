import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { useActiveIndicator } from '../../utils/useIndicator';
import './Tabs.css';

export interface TabItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** 'line' is an underline style; 'pill' is a floating thumb. */
  variant?: 'line' | 'pill';
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  variant = 'line',
  fullWidth = false,
  className,
  'aria-label': ariaLabel,
}: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inner, setInner] = useState(defaultValue ?? items.find((i) => !i.disabled)?.value ?? '');
  const current = value ?? inner;
  const indicator = useActiveIndicator(containerRef, current);

  const select = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const enabled = items.filter((i) => !i.disabled);
    const idx = enabled.findIndex((i) => i.value === current);
    const next = enabled[(idx + (e.key === 'ArrowRight' ? 1 : enabled.length - 1)) % enabled.length];
    if (!next) return;
    select(next.value);
    containerRef.current
      ?.querySelector<HTMLButtonElement>(`[data-value="${next.value}"]`)
      ?.focus();
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        'uib-tabs',
        `uib-tabs--${variant}`,
        fullWidth && 'uib-tabs--block',
        className,
      )}
    >
      <span
        className="uib-tabs__indicator"
        aria-hidden
        style={{
          transform: `translateX(${indicator.x}px)`,
          width: indicator.width,
          opacity: indicator.visible ? 1 : 0,
        }}
      />
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.value === current}
          data-active={item.value === current}
          data-indicator-item
          data-value={item.value}
          disabled={item.disabled}
          onClick={() => select(item.value)}
          className="uib-tabs__tab"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
