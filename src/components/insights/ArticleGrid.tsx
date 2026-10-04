import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { articleHref, articles, isPrinciple, readMinutes, type Article, type Category } from '@/content/insights';
import { col } from '@/lib/grid';
import { InsightArt } from './InsightArt';
import styles from './Insights.module.css';

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function ArticleCard({ article }: { article: Article }) {
  return (
    <TransitionLink href={articleHref(article.slug)} className={styles.item} data-cursor="Read →">
      <InsightArt subject={article.art} seed={article.slug} ratio="4 / 3" className={styles.itemArt} />
      <p className={`label ${styles.itemMeta}`}><span className={styles.itemCat}>{article.category}</span><time dateTime={article.date}>{formatDate(article.date)}</time><span>{readMinutes(article)} min read</span></p>
      <h3 className={`t-m ${styles.itemTitle}`}>{article.title}</h3>
      <p className={`t-s ${styles.itemExcerpt}`}>{article.subtitle}</p>
    </TransitionLink>
  );
}

/** Compact card for a law / principle: art, name, one-line definition (after lawsofux.com). */
export function PrincipleCard({ article }: { article: Article }) {
  const name = article.tags[1] ?? article.title;
  return (
    <TransitionLink href={articleHref(article.slug)} className={styles.principle} data-cursor="Read →">
      <InsightArt subject={article.art} seed={article.slug} ratio="1 / 1" className={styles.itemArt} />
      <h3 className={`t-m ${styles.itemTitle}`}>{name}</h3>
      <p className={`t-s ${styles.itemExcerpt}`}>{article.subtitle}</p>
    </TransitionLink>
  );
}

interface GridProps {
  exclude?: string;
  title?: string;
  index?: string;
  note?: string;
  /** Which entries to show (defaults to the ideas) */
  items?: Article[];
  /** Show entries from this category first (related reading) */
  prefer?: Category;
  limit?: number;
  /** 'principles' uses the compact four-up cards */
  variant?: 'ideas' | 'principles';
}

export function ArticleGrid({ exclude, title = 'Ideas', index = '01', note, items, prefer, limit, variant = 'ideas' }: GridProps) {
  const pool = (items ?? articles.filter((a) => !isPrinciple(a))).filter((a) => a.slug !== exclude);
  const sorted = prefer ? [...pool.filter((a) => a.category === prefer), ...pool.filter((a) => a.category !== prefer)] : pool;
  const list = limit ? sorted.slice(0, limit) : sorted;
  const principles = variant === 'principles';
  const spans = principles ? ['1/4', '4/7', '7/10', '10/13'] : ['1/5', '5/9', '9/13'];
  const mobile = principles ? ['1/3', '3/5'] : ['1/-1'];
  return (
    <section>
      <SectionHead index={index} title={title} note={note ?? (limit ? undefined : `${String(list.length).padStart(2, '0')} ${principles ? 'principles' : 'articles'}`)} />
      <Reveal className={`grid ${styles.articles}`}>
        {list.map((a, k) => (
          <div key={a.slug} style={col(spans[k % spans.length], mobile[k % mobile.length])} data-reveal>
            {principles ? <PrincipleCard article={a} /> : <ArticleCard article={a} />}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
