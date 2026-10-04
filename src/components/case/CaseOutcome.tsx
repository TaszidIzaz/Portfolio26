import { Reveal } from '@/components/ui/Reveal';
import { col } from '@/lib/grid';
import styles from './Case.module.css';

export function CaseOutcome({ text }: { text: string }) {
  return (
    <Reveal className={`grid ${styles.outcome}`}>
      <p className="label" style={col('1/4', '1/-1')} data-reveal>Outcome</p>
      <p className="t-m" style={col('4/13', '1/-1')} data-reveal>{text}</p>
    </Reveal>
  );
}
