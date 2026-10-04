import { InsightArt } from './InsightArt';
import type { Article, Block } from '@/content/insights';
import { inline } from '@/lib/inline';
import styles from './Article.module.css';

/**
 * Article content column: intro, key takeaways, sections, FAQ.
 * Laid out on a 9-column sub-grid: text in the first 6, the right margin (3) holds
 * pull quotes and image captions, as in an editorial layout.
 */
export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className={styles.body}>
      {article.intro.map((p, i) => <p key={`i${i}`} className={`t-m regular ${styles.text} ${i === 0 ? styles.lead : ''}`}>{inline(p)}</p>)}

      <aside className={`${styles.text} ${styles.takeaways}`} aria-labelledby="key-takeaways">
        <h2 id="key-takeaways" className="label">Key takeaways</h2>
        <ul>{article.takeaways.map((t) => <li key={t} className="t-s">{inline(t)}</li>)}</ul>
      </aside>

      {article.sections.map((s) => (
        <section key={s.id} className={styles.section} aria-labelledby={s.id}>
          <h2 id={s.id} className={`t-m ${styles.text} ${styles.h2}`}>{s.title}</h2>
          {s.blocks.map((b, i) => <BlockView key={i} block={b} />)}
        </section>
      ))}

      {article.faq.length > 0 && (
        <section className={styles.section} aria-labelledby="faq">
          <h2 id="faq" className={`t-m ${styles.text} ${styles.h2}`}>Frequently asked questions</h2>
          <div className={`${styles.text} ${styles.faq}`}>
            {article.faq.map((f) => (
              <details key={f.q} name="faq">
                <summary className="t-s"><h3 className={styles.faqQ}>{f.q}</h3><span aria-hidden>+</span></summary>
                <p className="t-s">{inline(f.a)}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case 'p':
      return <p className={`t-s ${styles.text} ${styles.p}`}>{inline(b.text)}</p>;
    case 'h3':
      return <h3 className={`t-s ${styles.text} ${styles.h3}`}>{inline(b.text)}</h3>;
    case 'list': {
      const Tag = b.ordered ? 'ol' : 'ul';
      return <Tag className={`t-s ${styles.text} ${styles.list}`}>{b.items.map((it) => <li key={it}>{inline(it)}</li>)}</Tag>;
    }
    case 'quote':
      return <blockquote className={`t-m ${styles.pull}`}>{inline(b.text)}</blockquote>;
    case 'callout':
      return (
        <div className={`${styles.text} ${styles.callout}`}>
          <p className="label">{b.title}</p>
          <p className="t-s">{inline(b.text)}</p>
        </div>
      );
    case 'table':
      return (
        <div className={`${styles.text} ${styles.tableWrap}`}>
          <table className={`t-s ${styles.table}`}>
            <thead><tr>{b.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row">{inline(c)}</th> : <td key={j}>{inline(c)}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'art':
      return (
        <figure className={styles.figure}>
          <InsightArt subject={b.subject} seed={`${b.subject}-${b.caption ?? ''}`} ratio="16 / 10" className={styles.figImg} label={b.caption} />
          {b.caption && <figcaption className="label">{b.caption}</figcaption>}
        </figure>
      );
  }
}
