import { CSSProperties, useState } from 'react';
import { cn } from '../../utils/cn';
import './Slider.css';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  /** Shows the current value as a trailing readout. */
  showValue?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function Slider({
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  showValue = false,
  className,
  'aria-label': ariaLabel,
}: SliderProps) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const pct = max === min ? 0 : ((current - min) / (max - min)) * 100;

  const handle = (raw: string) => {
    const next = Number(raw);
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  return (
    <div className={cn('uib-slider', disabled && 'uib-slider--disabled', className)}>
      <input
        type="range"
        className="uib-slider__input"
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        aria-label={ariaLabel}
        style={{ '--uib-slider-pct': `${pct}%` } as CSSProperties}
        onChange={(e) => handle(e.currentTarget.value)}
      />
      {showValue ? <span className="uib-slider__value">{current}</span> : null}
    </div>
  );
}
