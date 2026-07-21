import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import './TextField.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  /** Neutral helper below the field. Replaced by `error` when present. */
  helper?: string;
  /** Error message; also flags the control aria-invalid. */
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, helper, error, size = 'md', icon, fullWidth = true, id, className, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const noteId = `${fieldId}-note`;
  const note = error ?? helper;

  return (
    <div
      className={cn(
        'uib-field',
        `uib-field--${size}`,
        error && 'uib-field--error',
        fullWidth && 'uib-field--block',
        rest.disabled && 'uib-field--disabled',
        className,
      )}
    >
      {label ? (
        <label className="uib-field__label" htmlFor={fieldId}>
          {label}
        </label>
      ) : null}
      <div className="uib-field__control">
        {icon ? (
          <span className="uib-field__icon" aria-hidden>
            {icon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={fieldId}
          className="uib-field__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={note ? noteId : undefined}
          {...rest}
        />
      </div>
      {note ? (
        <p id={noteId} className="uib-field__note" role={error ? 'alert' : undefined}>
          {note}
        </p>
      ) : null}
    </div>
  );
});
