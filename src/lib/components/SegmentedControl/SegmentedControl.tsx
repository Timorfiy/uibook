import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { useActiveIndicator } from '../../utils/useIndicator';
import './SegmentedControl.css';

export interface SegmentedOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  size = 'md',
  fullWidth = false,
  className,
  'aria-label': ariaLabel,
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inner, setInner] = useState(
    defaultValue ?? options.find((o) => !o.disabled)?.value ?? '',
  );
  const current = value ?? inner;
  const thumb = useActiveIndicator(containerRef, current);

  const select = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const enabled = options.filter((o) => !o.disabled);
    const i = enabled.findIndex((o) => o.value === current);
    const next = enabled[(i + (e.key === 'ArrowRight' ? 1 : enabled.length - 1)) % enabled.length];
    if (!next) return;
    select(next.value);
    focusOption(next.value);
  };

  const focusOption = (v: string) => {
    containerRef.current
      ?.querySelector<HTMLButtonElement>(`[data-value="${v}"]`)
      ?.focus();
  };

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        'uib-segmented',
        `uib-segmented--${size}`,
        fullWidth && 'uib-segmented--block',
        className,
      )}
    >
      <span
        className="uib-segmented__thumb"
        aria-hidden
        style={{
          transform: `translateX(${thumb.x}px)`,
          width: thumb.width,
          opacity: thumb.visible ? 1 : 0,
        }}
      />
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={opt.value === current}
          data-active={opt.value === current}
          data-indicator-item
          data-value={opt.value}
          disabled={opt.disabled}
          onClick={() => select(opt.value)}
          className="uib-segmented__option"
        >
          {opt.icon ? (
            <span className="uib-segmented__icon" aria-hidden>
              {opt.icon}
            </span>
          ) : null}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
