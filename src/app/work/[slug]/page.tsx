import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { CaseCta } from '@/components/case/CaseCta';
import { CaseGallery } from '@/components/case/CaseGallery';
import { CaseHeader } from '@/components/case/CaseHeader';
import { CaseNda } from '@/components/case/CaseNda';
import { CaseNext } from '@/components/case/CaseNext';
import { CaseOutcome } from '@/components/case/CaseOutcome';
import { CaseQuote } from '@/components/case/CaseQuote';
import { CaseStats } from '@/components/case/CaseStats';
import { CaseSummary } from '@/components/case/CaseSummary';
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

/** The testimonial sits between gallery rows, after this many rows (Alphamark-style). */
const QUOTE_AFTER = 3;

/**
 * Case study, Alphamark structure:
 * header → cover → summary & details → image story (with testimonial) → impact → outcome → CTA → next / discover more
 */
export default async function CasePage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { gallery, testimonial } = project;

  return (
    <>
      <CaseHeader project={project} />
      <CaseSummary project={project} />

      {project.nda && <CaseNda project={project} />}
      {gallery.map((row, i) => (
        <Fragment key={i}>
          <CaseGallery row={row} />
          {i === Math.min(QUOTE_AFTER, gallery.length) - 1 && testimonial && <CaseQuote testimonial={testimonial} />}
        </Fragment>
      ))}

      <CaseStats project={project} />
      {project.outcome && <CaseOutcome text={project.outcome} />}
      <CaseCta />
      <CaseNext slug={project.slug} />
      <Contact />
    </>
  );
}
