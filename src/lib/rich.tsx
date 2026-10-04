import { Fragment, type ReactNode } from 'react';

/**
 * Minimal inline formatting for content files:
 *   "Some facts are just that, *facts.*" → …<em>facts.</em>
 * <em> is never italic on this site; inside headings it renders in the muted colour.
 */
export function rich(text: string): ReactNode {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
    );
}
