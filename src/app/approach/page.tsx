import type { Metadata } from 'next';
import { ApproachEngagements, ApproachPrinciples, ApproachServices, ApproachSteps } from '@/components/approach/ApproachSections';
import { Contact } from '@/components/sections/Contact';
import { Faq } from '@/components/sections/Faq';
import { BigMarquee } from '@/components/ui/BigMarquee';
import { GapStatement } from '@/components/ui/GapStatement';
import { PageIntro } from '@/components/ui/PageIntro';
import { approachPage } from '@/content/approach';

export const metadata: Metadata = {
  title: 'Approach',
  description: 'How Taszid Izaz designs with AI: faster research, exploration and prototyping, steered by experience and finished by hand.',
  alternates: { canonical: '/approach' },
};

export default function ApproachPage() {
  const { closing } = approachPage;
  return (
    <>
      <PageIntro label={approachPage.label} title={approachPage.title} aside={{ text: approachPage.aside, cta: approachPage.asideCta }} narrate="approachPage" />
      <BigMarquee word={approachPage.marquee.word} image={approachPage.marquee.image} />
      <ApproachPrinciples />
      <ApproachSteps />
      <ApproachServices />
      <ApproachEngagements />
      <GapStatement left={closing.left} right={closing.right} image={closing.image} text={closing.text} />
      <Faq />
      <Contact />
    </>
  );
}
