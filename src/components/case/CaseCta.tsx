import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';
import { col } from '@/lib/grid';
import styles from './Case.module.css';

/** Alphamark-style prompt between the story and the next project. */
export function CaseCta() {
  return (
    <Reveal className={`grid ${styles.cta}`}>
      <p className="t-m" style={col('1/9', '1/-1')} data-reveal>Building something that deserves this kind of care?</p>
      <div className={styles.ctaBtn} style={col('9/13', '1/-1')} data-reveal>
        <Button href={site.bookCall} arrow>Start a project</Button>
      </div>
    </Reveal>
  );
}
