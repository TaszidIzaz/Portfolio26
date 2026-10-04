import type { CSSProperties } from 'react';

/**
 * Place an element on the Swiss grid.
 * Desktop uses 12 columns, mobile (<768px) uses 4.
 *   <p style={col('3/7', '1/-1')} />  → spans columns 3–6 on desktop, full width on mobile
 */
export function col(desktop: string, mobile?: string): CSSProperties {
  return { '--c': desktop, ...(mobile ? { '--cm': mobile } : {}) } as CSSProperties;
}

/** Typed helper for passing CSS custom properties through `style`. */
export function vars(v: Record<string, string | number>): CSSProperties {
  return v as CSSProperties;
}
