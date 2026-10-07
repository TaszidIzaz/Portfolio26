import type { Metadata } from 'next';
import { ApproachPrinciples } from '@/components/approach/ApproachSections';
import { Contact } from '@/components/sections/Contact';
import { Expertise } from '@/components/sections/Expertise';
import { Faq } from '@/components/sections/Faq';
import { Story } from '@/components/sections/Story';
import { PageIntro } from '@/components/ui/PageIntro';
import { approachPage } from '@/content/approach';

export const metadata: Metadata = {
  title: 'Approach',
  description: 'How Taszid Izaz designs with AI: faster research, exploration and prototyping, steered by experience and finished by hand.',
  alternates: { canonical: '/approach' },
};

export default function ApproachPage() {
  return (
    <>
      <PageIntro label={approachPage.label} title={approachPage.title} aside={{ text: approachPage.aside, cta: approachPage.asideCta }} narrate="approachPage" />
      <ApproachPrinciples />
      {/* Same process story and services stack as the homepage */}
      <Story />
      <Expertise index="02" />
      <Faq />
      <Contact />
    </>
  );
}
