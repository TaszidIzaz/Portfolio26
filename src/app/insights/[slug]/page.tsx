import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/insights/ArticleBody';
import { ArticleGrid, formatDate } from '@/components/insights/ArticleGrid';
import { ArticleToc } from '@/components/insights/ArticleToc';
import { ShareLinks } from '@/components/insights/ShareLinks';
import styles from '@/components/insights/Article.module.css';
import { Contact } from '@/components/sections/Contact';
import { Button } from '@/components/ui/Button';
import { InsightArt } from '@/components/insights/InsightArt';
import { SplitHeading } from '@/components/ui/SplitHeading';
import { TransitionLink } from '@/components/ui/TransitionLink';
import { articleHref, articles, collectionOf, getAdjacent, getArticle, isPrinciple, plainText, readMinutes, wordCount, type Article } from '@/content/insights';
import { site } from '@/content/site';
import { col } from '@/lib/grid';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const path = articleHref(a.slug);
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    authors: [{ name: site.name, url: site.url }],
    category: a.category,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title: a.title,
      description: a.description,
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
      authors: [site.url],
      section: a.category,
      tags: [...a.tags, ...a.keywords],
    },
    twitter: { card: 'summary_large_image', title: a.title, description: a.description },
  };
}

/** schema.org data so search engines understand the article, its author and its FAQ. */
function jsonLd(a: Article) {
  const url = `${site.url}${articleHref(a.slug)}`;
  const person = {
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.name,
    url: site.url,
    jobTitle: site.roleLong,
    sameAs: site.socials.map((s) => s.href),
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: a.title,
        description: a.description,
        image: `${url}/opengraph-image`,
        datePublished: a.date,
        dateModified: a.updated ?? a.date,
        author: person,
        publisher: person,
        mainEntityOfPage: url,
        articleSection: a.category,
        keywords: a.keywords.join(', '),
        wordCount: wordCount(a),
        inLanguage: 'en',
      },
      a.faq.length > 0 && {
        '@type': 'FAQPage',
        mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: `${site.url}/insights` },
          { '@type': 'ListItem', position: 3, name: a.title, item: url },
        ],
      },
    ].filter(Boolean),
  };
}

export default async function ArticlePage({ params }: Params) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const { newer, older } = getAdjacent(article.slug);
  const url = `${site.url}${articleHref(article.slug)}`;
  const toc = [
    { id: 'key-takeaways', title: 'Key takeaways' },
    ...article.sections.map((s) => ({ id: s.id, title: s.title })),
    ...(article.faq.length ? [{ id: 'faq', title: 'Frequently asked questions' }] : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(article)).replace(/</g, '\\u003c') }} />
      <article>
        <header id="top" data-narrate="article" className={`grid ${styles.head}`}>
          <div className={styles.back} style={col('1/4', '1/-1')}>
            <TransitionLink href="/insights" className="label ul">← All insights</TransitionLink>
          </div>
          <div className={styles.titles} style={col('4/13', '1/-1')}>
            <p className={`label ${styles.kicker}`}>{collectionOf(article)} · {article.category}</p>
            <SplitHeading as="h1" text={article.title} className="t-l" />
            <p className="t-m regular muted">{article.subtitle}</p>
          </div>
        </header>

        <div className={`grid ${styles.metaRow}`}>
          <dl className={styles.meta} style={col('1/4', '1/-1')}>
            <div><dt className="label muted">Written by</dt><dd className="label"><TransitionLink href="/about" className="ul">{site.name}</TransitionLink></dd></div>
            <div><dt className="label muted">Category</dt><dd className="label">{article.category}</dd></div>
            <div><dt className="label muted">Published</dt><dd className="label"><time dateTime={article.date}>{formatDate(article.date)}</time></dd></div>
            {article.updated && <div><dt className="label muted">Updated</dt><dd className="label"><time dateTime={article.updated}>{formatDate(article.updated)}</time></dd></div>}
            <div><dt className="label muted">Reading time</dt><dd className="label">{readMinutes(article)} min</dd></div>
            <div><dt className="label muted">Share</dt><dd className="label"><ShareLinks url={url} title={article.title} /></dd></div>
          </dl>
          <figure className={styles.cover} style={col('4/13', '1/-1')}>
            <InsightArt subject={article.art} seed={article.slug} ratio="16 / 9" label={article.subtitle} />
          </figure>
        </div>

        <div className={`grid ${styles.layout}`}>
          <div className={styles.rail} style={col('1/4', '1/-1')}>
            <ArticleToc items={toc} />
          </div>
          <div style={col('4/13', '1/-1')}>
            <ArticleBody article={article} />

            <footer className={styles.foot}>
              <ul className={styles.tags} aria-label="Topics">{article.tags.map((t) => <li key={t} className="label">{t}</li>)}</ul>
              <div className={styles.author}>
                <p className="label muted">About the author</p>
                <p className="t-m regular">
                  {site.name} is an AI-enabled product designer and creative director in {site.city}, using AI to research, explore and prototype faster, and years of design experience to decide what ships.
                </p>
                <div className={styles.authorCta}>
                  <Button href={site.bookCall} arrow>Book a 30-min call</Button>
                  <TransitionLink href="/work" className="label ul">See the work →</TransitionLink>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <nav className={`grid ${styles.adjacent}`} aria-label="More articles">
          {newer ? (
            <TransitionLink href={articleHref(newer.slug)} className={styles.adj} style={col('1/7', '1/-1')}>
              <span className="label muted">← Newer</span><span className="t-m">{newer.title}</span>
            </TransitionLink>
          ) : <span style={col('1/7', '1/-1')} />}
          {older && (
            <TransitionLink href={articleHref(older.slug)} className={`${styles.adj} ${styles.adjRight}`} style={col('7/13', '1/-1')}>
              <span className="label muted">Older →</span><span className="t-m">{older.title}</span>
            </TransitionLink>
          )}
        </nav>
      </article>

      <ArticleGrid
        exclude={article.slug}
        items={articles.filter((a) => isPrinciple(a) === isPrinciple(article))}
        prefer={article.category}
        limit={isPrinciple(article) ? 4 : 3}
        variant={isPrinciple(article) ? 'principles' : 'ideas'}
        title="Keep reading"
      />
      <Contact />
    </>
  );
}
