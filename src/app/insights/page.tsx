import type { Metadata } from 'next';
import { ArticleGrid } from '@/components/insights/ArticleGrid';
import { FactsCarousel } from '@/components/insights/FactsCarousel';
import { Contact } from '@/components/sections/Contact';
import { PageIntro } from '@/components/ui/PageIntro';
import { gestalt, ideas, insightsPage, lawsOfUx } from '@/content/insights';

export const metadata: Metadata = {
  title: 'Insights',
  description: insightsPage.description,
  keywords: ['laws of UX', 'Gestalt principles', 'AI product design', 'design with Claude', 'fast design iteration', 'AI prototyping', 'one-week design sprint'],
  alternates: { canonical: '/insights' },
};

/** Insights: ideas (blog posts) plus the laws of UX and Gestalt principles I design by. */
export default function InsightsPage() {
  return (
    <>
      <PageIntro label={insightsPage.label} title={insightsPage.title} lede={insightsPage.lede} narrate="insightsPage" />
      <ArticleGrid items={ideas()} title="Ideas" index="01" />
      <ArticleGrid items={lawsOfUx()} title="Laws of UX" index="02" variant="principles" note="The rules of thumb I design by" />
      <ArticleGrid items={gestalt()} title="Gestalt principles" index="03" variant="principles" note="How people see groups" />
      <FactsCarousel />
      <Contact />
    </>
  );
}
