'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { THEMES } from '@/content/themes';
import { scramble } from '@/lib/scramble';

/** Current mode name; glitches into the new name on change. */
export function ModeLabel({ className }: { className?: string }) {
  const { theme } = useTheme();
  const ref = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  useEffect(() => {
    const name = THEMES.find((t) => t.id === theme)!.name;
    if (!ref.current) return;
    if (first.current) { ref.current.textContent = name; first.current = false; return; }
    scramble(ref.current, name);
  }, [theme]);
  return <span ref={ref} className={className}>{THEMES[0].name}</span>;
}
