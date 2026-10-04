'use client';

import { forwardRef, useImperativeHandle, useRef, type ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import styles from './Button.module.css';

type Variant = 'solid' | 'accent' | 'ghost' | 'round';

interface Props {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  arrow?: boolean;
  magnetic?: boolean;
  /** Label shown in the custom cursor on hover */
  cursor?: string;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

/** Pill button / link. External hrefs open in a new tab automatically. */
export const Button = forwardRef<HTMLElement, Props>(function Button(
  { children, href, variant = 'solid', arrow, magnetic = true, cursor, className = '', onClick, ...aria },
  forwarded,
) {
  const ref = useRef<HTMLElement>(null);
  useImperativeHandle(forwarded, () => ref.current as HTMLElement);
  useMagnetic(ref, magnetic);

  const cls = `${styles.btn} ${styles[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <span className={styles.arr} aria-hidden>↗</span>}
    </>
  );

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        data-cursor={cursor}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
        {...aria}
      >
        {content}
      </a>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type="button" className={cls} data-cursor={cursor} onClick={onClick} {...aria}>
      {content}
    </button>
  );
});
