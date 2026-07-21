import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner/Spinner';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'plain';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and blocks interaction while work is in flight. */
  loading?: boolean;
  /** Icon rendered before the label. */
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    fullWidth = false,
    className,
    children,
    disabled,
    type = 'button',
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'uib-button',
        `uib-button--${variant}`,
        `uib-button--${size}`,
        fullWidth && 'uib-button--block',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Spinner size="sm" tone="current" />
      ) : icon ? (
        <span className="uib-button__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="uib-button__label">{children}</span>
    </button>
  );
});
