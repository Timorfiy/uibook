import { RefObject, useCallback, useLayoutEffect, useState } from 'react';

export interface IndicatorMetrics {
  x: number;
  width: number;
  visible: boolean;
}

/**
 * Measures the element flagged [data-active="true"] inside a container and
 * returns its offset/size so a sliding indicator (segmented control thumb,
 * tab underline) can track it. Re-measures on resize, option changes and
 * font loading — cheap: one layout read per change, zero per frame.
 */
export function useActiveIndicator(
  containerRef: RefObject<HTMLElement>,
  activeKey: unknown,
): IndicatorMetrics {
  const [metrics, setMetrics] = useState<IndicatorMetrics>({ x: 0, width: 0, visible: false });

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector<HTMLElement>('[data-active="true"]');
    if (!active) {
      setMetrics((m) => (m.visible ? { x: 0, width: 0, visible: false } : m));
      return;
    }
    const c = container.getBoundingClientRect();
    const a = active.getBoundingClientRect();
    const x = a.left - c.left;
    setMetrics((m) =>
      m.x === x && m.width === a.width && m.visible ? m : { x, width: a.width, visible: true },
    );
  }, [containerRef]);

  useLayoutEffect(() => {
    measure();
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    container.querySelectorAll('[data-indicator-item]').forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [measure, activeKey]);

  return metrics;
}
