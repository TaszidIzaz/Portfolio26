'use client';

import { useEffect, useState } from 'react';
import { site } from '@/content/site';

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: site.timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
});

/** Live local time in Dhaka. Renders a placeholder on the server to avoid hydration mismatch. */
export function Clock({ className }: { className?: string }) {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>;
}
