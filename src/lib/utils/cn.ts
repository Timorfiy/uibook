/**
 * Tiny class-name joiner. Keeps the library dependency-free.
 * cn('uib-button', variant && `uib-button--${variant}`, className)
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
