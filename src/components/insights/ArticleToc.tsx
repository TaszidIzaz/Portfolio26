'use client';

import { useEffect, useState } from 'react';
import { useLenis } from '@/components/providers/SmoothScroll';
import styles from './Article.module.css';

type Item = { id: string; title: string };

/** Sticky "In this article" list; highlights the section being read and smooth-scrolls on click. */
export function ArticleToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const lenis = useLenis();

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [items]);

  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: -110, duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav className={styles.toc} aria-label="In this article">
      <p className="label muted">In this article</p>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} onClick={(e) => go(e, it.id)} aria-current={active === it.id ? 'true' : undefined}>{it.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
