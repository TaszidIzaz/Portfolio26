import { Odometer } from '@/components/ui/Odometer';
import { stats } from '@/content/home';
import { col } from '@/lib/grid';
import styles from './Numbers.module.css';

const PLACEMENT = [col('1/4', '1/3'), col('4/7', '3/5'), col('7/10', '1/3'), col('10/13', '3/5')];

export function Numbers() {
  return (
    <section className={styles.numbers} data-narrate="numbers">
      <div className={`grid ${styles.grid}`}>
        {stats.map((s, i) => (
          <div key={s.label} className={styles.stat} style={PLACEMENT[i]}>
            <p className={styles.num}>
              <Odometer value={s.value} />
              {s.suffix && <span className={styles.suf}>{s.suffix}</span>}
            </p>
            <p className={`label ${styles.label}`}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
