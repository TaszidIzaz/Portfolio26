import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseCta } from '@/components/case/CaseCta';
import { CaseHero } from '@/components/case/CaseHero';
import { CaseNext } from '@/components/case/CaseNext';
import { CaseStory } from '@/components/case/CaseStory';
import { Contact } from '@/components/sections/Contact';
import { getProject, projects } from '@/content/projects';

type Params = { params: Promise<{ slug: string }> };

/** Every case study is generated at build time from content/projects. */
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.intro,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.intro, images: [project.cover.src] },
  };
}

/**
 * Case study (after afternow.co/work/charted):
 * opening screen (identity + facts on the left, cover on the right)
 * → story (sticky section titles on the left that open as you read, images on the right)
 * → CTA → next project → contact.
 */
export default async function CasePage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <>
      <CaseHero project={project} />
      <CaseStory project={project} />
      <CaseCta />
      <CaseNext slug={project.slug} />
      <Contact />
    </>
  );
}
