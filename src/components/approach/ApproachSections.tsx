import { Button } from '@/components/ui/Button';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { approachPage } from '@/content/approach';
import { site } from '@/content/site';
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

export function ApproachSteps() {
  return (
    <section className={styles.steps} id="process" data-narrate="process">
      <SectionHead index="02" title="Process" note="From first call to launch" />
      <Reveal>
        {approachPage.steps.map((s, i) => (
          <div key={s.title} className={`grid ${styles.step}`} data-reveal>
            <p className={`t-l ${styles.num}`} style={col('1/3', '1/2')}>{String(i + 1).padStart(2, '0')}</p>
            <h3 className="t-m" style={col('3/7', '2/5')}>{s.title}</h3>
            <p className="t-s" style={col('7/10', '1/-1')}>{s.text}</p>
            <ul className={`t-s ${styles.deliverables}`} style={col('10/13', '1/-1')}>
              {s.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export function ApproachServices() {
  return (
    <section data-narrate="services">
      <SectionHead index="03" title="Services" />
      <Reveal className={`grid ${styles.services}`}>
        {approachPage.services.map((s, i) => (
          <div key={s.title} className={styles.service} style={col(['1/4', '4/7', '7/10', '10/13'][i], i % 2 ? '3/5' : '1/3')} data-reveal>
            <h3 className="t-m">{s.title}</h3>
            <ul className="t-s">{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export function ApproachEngagements() {
  return (
    <section>
      <SectionHead index="04" title="Working together" note={site.availability.booking} />
      <Reveal className={`grid ${styles.engage}`}>
        {approachPage.engagements.map((e, i) => (
          <div key={e.title} className={styles.card} style={col(['1/5', '5/9', '9/13'][i], '1/-1')} data-reveal>
            <p className="label">{e.title}</p>
            <div>
              <p className="t-l">{e.price}</p>
              <p className="t-s" style={{ marginTop: 14 }}>{e.text}</p>
            </div>
            <div><Button href={site.bookCall} variant={i === 0 ? 'solid' : 'ghost'} arrow>Book a call</Button></div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
