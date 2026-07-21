import { cn } from '../../utils/cn';
import './Spinner.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  /** 'current' inherits text color — right inside buttons. */
  tone?: 'current' | 'accent' | 'inverse';
  className?: string;
}

export function Spinner({ size = 'md', tone = 'accent', className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('uib-spinner', `uib-spinner--${size}`, `uib-spinner--${tone}`, className)}
    />
  );
}
