import { useState } from 'react';
import { cn } from '../../utils/cn';
import './Switch.css';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Renders a visible label next to the control. */
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
  'aria-label'?: string;
}

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  className,
  'aria-label': ariaLabel,
}: SwitchProps) {
  const [inner, setInner] = useState(defaultChecked);
  const isOn = checked ?? inner;

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (checked === undefined) setInner(next);
    onChange?.(next);
  };

  const control = (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={label ? undefined : ariaLabel}
      disabled={disabled}
      onClick={toggle}
      className={cn('uib-switch', `uib-switch--${size}`, isOn && 'uib-switch--on', className)}
    >
      <span className="uib-switch__knob" aria-hidden />
    </button>
  );

  if (!label) return control;

  return (
    <label className={cn('uib-switch-row', disabled && 'uib-switch-row--disabled')}>
      {control}
      <span className="uib-switch-row__label">{label}</span>
    </label>
  );
}
