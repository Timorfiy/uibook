import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Card.css';

export type CardMaterial = 'thin' | 'regular' | 'thick' | 'solid';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 'thin' | 'regular' | 'thick' are frosted-glass materials with increasing
   * blur depth; 'solid' is an opaque surface for content-heavy layouts.
   */
  material?: CardMaterial;
  /** Adds hover elevation + press feedback. Use for clickable cards. */
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  material = 'regular',
  interactive = false,
  padding = 'md',
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'uib-card',
        material === 'thin' && 'uib-glass-thin',
        material === 'regular' && 'uib-glass',
        material === 'thick' && 'uib-glass-thick',
        material === 'solid' && 'uib-card--solid',
        interactive && 'uib-card--interactive',
        `uib-card--pad-${padding}`,
        className,
      )}
      {...rest}
    />
  );
}
