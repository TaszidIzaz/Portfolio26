'use client';

import NextLink from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useNavigate } from '@/components/providers/PageTransitions';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  /** Runs first (e.g. close the menu); navigation then waits 300ms for it */
  onNavigate?: () => void;
};

/**
 * Internal link for the whole site.
 *  - "/work"     → page transition
 *  - "#contact"  → smooth scroll on this page
 *  - "/#about"   → transition to home, then scroll to #about
 * Modified clicks (cmd/ctrl/shift) behave like a normal link.
 */
export function TransitionLink({ href, children, onNavigate, onClick, ...rest }: Props) {
  const navigate = useNavigate();
  return (
    <NextLink
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onNavigate?.();
        navigate(href, { delay: onNavigate ? 300 : 0 });
      }}
    >
      {children}
    </NextLink>
  );
}
