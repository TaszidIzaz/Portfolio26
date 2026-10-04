'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { projectHref, projects } from '@/content/projects';
import { col } from '@/lib/grid';
import { gsap } from '@/lib/gsap';
import styles from './ProjectList.module.css';

/** "Discover more" list; a preview of the hovered project follows the cursor. */
export function ProjectList({ exclude }: { exclude?: string }) {
  const items = projects.filter((p) => p.slug !== exclude);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = preview.current!;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div className={styles.list}>
      <div className={`grid ${styles.head}`}>
        <p className="label" style={col('1/4', '1/-1')}>Discover more</p>
        <p className="label muted right hide-m" style={col('10/13')}>Selected projects 2023 — 2025</p>
      </div>
      <div className={styles.rows} onPointerLeave={() => setActive(null)}>
        {items.map((p) => (
          <TransitionLink
            key={p.slug}
            href={projectHref(p.slug)}
            className={`grid ${styles.row}`}
            onPointerEnter={() => setActive(p.slug)}
          >
            <span className="t-m" style={col('1/7', '1/-1')}>{p.title}</span>
            <span className="t-s muted hide-m" style={col('7/11')}>{p.tags.join(' · ')}</span>
            <span className="t-s right hide-m" style={col('11/13')}>{p.year ?? (p.studio && `with ${p.studio}`)}</span>
          </TransitionLink>
        ))}
      </div>
      <div ref={preview} className={`${styles.preview} ${active ? styles.on : ''}`} aria-hidden>
        {items.map((p) => (
          <Image key={p.slug} src={p.cover.src} alt="" fill sizes="20vw" data-on={active === p.slug ? '' : undefined} />
        ))}
      </div>
    </div>
  );
}
