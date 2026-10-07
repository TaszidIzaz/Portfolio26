import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { approachPage } from '@/content/approach';
import { col } from '@/lib/grid';
import styles from './Approach.module.css';

/** Four principles around an image (Wacomet-style numbered columns). */
export function ApproachPrinciples() {
  const { principles, principlesImage, principlesTitle } = approachPage;
  const spans = ['7/10', '10/13', '7/10', '10/13'];
  return (
    <section>
      <SectionHead index="01" title="Principles" />
      <Reveal className={`grid ${styles.principles}`}>
        <h2 className={`t-l ${styles.pIntro}`} style={col('1/7', '1/-1')} data-reveal>{principlesTitle}</h2>
        {principles.slice(0, 2).map((p, i) => (
          <div key={p.title} className={styles.principle} style={col(spans[i], '1/-1')} data-reveal>
            <p className="t-l">{String(i + 1).padStart(2, '0')}</p>
            <div><p className="t-m">{p.title}</p><p className="t-s" style={{ marginTop: 10 }}>{p.text}</p></div>
          </div>
        ))}
        <ParallaxImage className={styles.pImg} style={col('1/7', '1/-1')} src={principlesImage.src} alt={principlesImage.alt} ratio="4 / 3" sizes="(max-width: 767px) 100vw, 50vw" />
        {principles.slice(2).map((p, i) => (
          <div key={p.title} className={styles.principle} style={col(spans[i + 2], '1/-1')} data-reveal>
            <p className="t-l">{String(i + 3).padStart(2, '0')}</p>
            <div><p className="t-m">{p.title}</p><p className="t-s" style={{ marginTop: 10 }}>{p.text}</p></div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
