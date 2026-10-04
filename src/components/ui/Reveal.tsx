'use client';

import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

/**
 * Wrap any block: every child marked `data-reveal` fades + rises in on scroll.
 * Lets server components get scroll reveals without becoming client components.
 */
export function Reveal({ children, as: Tag = 'div', className, style, id, ...rest }: { children: ReactNode; as?: ElementType; className?: string; style?: CSSProperties; id?: string; [k: `data-${string}`]: string | undefined }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <Tag ref={ref} className={className} style={style} id={id} {...rest}>
      {children}
    </Tag>
  );
}
