import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { aboutPage } from '@/content/about';
import { col } from '@/lib/grid';
import styles from './About.module.css';

export function AboutTimeline() {
  return (
    <section className={styles.timeline} data-narrate="timeline">
      <SectionHead index="05" title="Timeline" />
      <Reveal className={styles.years}>
        {aboutPage.timeline.map((t, i) => (
          <div key={i} className={styles.year} data-reveal>
            <p className="t-m">{t.year}</p>
            <p className="t-s">{t.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export function AboutExperience() {
  const { experience, education } = aboutPage;
  return (
    <section className={styles.table}>
      <SectionHead index="06" title="Experience" />
      <Reveal>
        {experience.map((e) => (
          <div key={e.company} className={`grid ${styles.row}`} data-reveal>
            <p className="t-m" style={col('1/5', '1/-1')}>{e.company}</p>
            <p className="t-s" style={col('5/8', '1/3')}>{e.role}</p>
            <p className="t-s muted hide-m" style={col('8/11')}>{e.where}</p>
            <p className="t-s right" style={col('11/13', '3/5')}>{e.when}</p>
          </div>
        ))}
        <div className={`grid ${styles.row}`} data-reveal>
          <p className="t-m" style={col('1/5', '1/-1')}>{education.school}</p>
          <p className="t-s" style={col('5/8', '1/3')}>{education.degree}</p>
          <p className="t-s muted hide-m" style={col('8/11')}>Education</p>
          <p className="t-s right" style={col('11/13', '3/5')}>{education.when}</p>
        </div>
      </Reveal>
    </section>
  );
}

export function AboutCapabilities() {
  const { tools, certifications } = aboutPage;
  return (
    <section>
      <SectionHead index="07" title="Tools & certifications" />
      <Reveal className={`grid ${styles.caps}`}>
        {tools.map((g, i) => (
          <div key={g.group} className={styles.group} style={col(['1/4', '4/7', '7/10', '10/13'][i], i % 2 ? '3/5' : '1/3')} data-reveal>
            <p className="label">{g.group}</p>
            <ul className="t-s">{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        ))}
        <div className={styles.group} style={col('1/-1')} data-reveal>
          <p className="label">Certifications</p>
          <ul className="t-s">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </Reveal>
    </section>
  );
}

/** Kultiveret-style scrolling list of who I've worked with. */
export function AboutCollaborators() {
  const items = [...aboutPage.collaborators, ...aboutPage.collaborators];
  return (
    <section className={styles.people} aria-label="Selected collaborators">
      <div className={styles.peopleTrack}>
        {items.map((c, i) => (
          <p key={i} className={styles.person} aria-hidden={i >= aboutPage.collaborators.length}>
            <span className="t-m">{c.name}</span>
            <span className="t-s">({c.role})</span>
          </p>
        ))}
      </div>
    </section>
  );
}
