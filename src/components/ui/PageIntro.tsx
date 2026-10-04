import { col } from '@/lib/grid';
import { Doodle } from './Collage';
import { Cut } from './Folk';
import { SplitHeading } from './SplitHeading';
import { TransitionLink } from './TransitionLink';
import styles from './PageIntro.module.css';

interface Props {
  label: string;
  title: string;
  lede?: string;
  /** Split layout: small text + link on the left, statement on the right */
  aside?: { text: string; cta?: { label: string; href: string } };
  narrate?: string;
  id?: string;
}

/** Standard page opening, shared by every inner page so titles stay consistent. */
export function PageIntro({ label, title, lede, aside, narrate, id = 'top' }: Props) {
  return (
    <header className={styles.intro} id={id} data-narrate={narrate} style={{ position: 'relative' }}>
      <Doodle name="asterisk" style={{ top: '22%', right: '7vw', '--s': '96px', '--r': '12deg' }} />
      <Cut name="morel" style={{ top: '20%', right: '7vw', '--s': '104px', '--r': '6deg', '--c': 'var(--accent)' }} />
      <div className={`grid ${styles.label}`}>
        <p className="label" style={col('1/4', '1/-1')}>{label}</p>
      </div>

      {aside ? (
        <div className={`grid ${styles.split}`}>
          <div className={styles.aside} style={col('1/5', '1/-1')}>
            <p className="t-s">{aside.text}</p>
            {aside.cta && (
              /^https?:/.test(aside.cta.href) ? (
                <a className={styles.asideLink} href={aside.cta.href} target="_blank" rel="noopener">{aside.cta.label}<span aria-hidden>→</span></a>
              ) : (
                <TransitionLink className={styles.asideLink} href={aside.cta.href}>{aside.cta.label}<span aria-hidden>→</span></TransitionLink>
              )
            )}
          </div>
          <SplitHeading as="h1" text={title} className={`t-l ${styles.splitTitle}`} style={col('6/13', '1/-1')} />
        </div>
      ) : (
        <div className="grid">
          <SplitHeading as="h1" text={title} className={`t-l ${styles.title}`} style={col('1/12', '1/-1')} />
          {lede && <p className={`t-m regular ${styles.lede}`} style={col('1/7', '1/-1')}>{lede}</p>}
        </div>
      )}
    </header>
  );
}
