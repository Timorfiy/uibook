import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Badge.css';

export type BadgeTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** 'soft' is a tinted wash; 'solid' fills with the tone color. */
  variant?: 'soft' | 'solid';
}

export function Badge({ tone = 'accent', variant = 'soft', className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn('uib-badge', `uib-badge--${tone}`, `uib-badge--${variant}`, className)}
      {...rest}
    />
  );
}
