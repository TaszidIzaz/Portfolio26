import { Fragment } from 'react';
import { ticker } from '@/content/home';
import styles from './Ticker.module.css';

/** CSS-only marquee (no JS). Items are duplicated once for a seamless loop. */
export function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className={styles.ticker} aria-hidden>
      <div className={styles.track}>
        {items.map((t, i) => (
          <Fragment key={i}><span>{t}</span><b>✦</b></Fragment>
        ))}
      </div>
    </div>
  );
}
