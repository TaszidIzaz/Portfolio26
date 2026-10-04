import { Fragment, type ReactNode } from 'react';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { rich } from './rich';

/**
 * Inline formatting for article copy: [label](href) links plus *muted emphasis* (see rich()).
 * Internal links ("/work/…") use TransitionLink; external ones open in a new tab.
 */
export function inline(text: string): ReactNode {
  return text
    .split(/(\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part, i) => {
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (!m) return <Fragment key={i}>{rich(part)}</Fragment>;
      const [, label, href] = m;
      return href.startsWith('/') || href.startsWith('#') ? (
        <TransitionLink key={i} href={href} className="inline-link">{label}</TransitionLink>
      ) : (
        <a key={i} href={href} className="inline-link" target="_blank" rel="noopener">{label}</a>
      );
    });
}
