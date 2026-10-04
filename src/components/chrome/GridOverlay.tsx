'use client';

import { useEffect } from 'react';
import { GRID_EVENT, narrate } from '@/lib/events';
import styles from './GridOverlay.module.css';

/** The 12-column grid, revealed with the G key (or the footer button). */
export function GridOverlay() {
  useEffect(() => {
    const toggle = () => {
      const on = document.documentElement.classList.toggle('show-grid');
      narrate(on ? 'Behold: the 12-column grid. Swiss approved.' : 'Grid hidden. It’s still there, watching.');
    };
    const key = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase();
      if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey && tag !== 'input' && tag !== 'textarea') toggle();
    };
    window.addEventListener('keydown', key);
    window.addEventListener(GRID_EVENT, toggle);
    return () => {
      window.removeEventListener('keydown', key);
      window.removeEventListener(GRID_EVENT, toggle);
    };
  }, []);

  return (
    <div className={styles.overlay} aria-hidden>
      <div className="grid">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
    </div>
  );
}
