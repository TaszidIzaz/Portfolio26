import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import type { Testimonial } from '@/content/types';
import { col } from '@/lib/grid';
import styles from './Case.module.css';

export function CaseQuote({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Reveal className={`grid ${styles.quote}`}>
      <p className="label" style={col('1/4', '1/-1')} data-reveal>Client testimonial</p>
      <blockquote className="t-m" style={col('4/13', '1/-1')} data-reveal>{testimonial.quote}</blockquote>
      <div className={styles.person} style={col('4/13', '1/-1')} data-reveal>
        <span className={styles.avatar}><Image src={testimonial.avatar} alt="" fill sizes="48px" /></span>
        <span className="t-s"><b>{testimonial.name}</b><span className="muted">{testimonial.role}</span></span>
      </div>
    </Reveal>
  );
}
