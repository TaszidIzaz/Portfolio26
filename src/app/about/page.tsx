import type { Metadata } from 'next';
import { Favourites, Journey, JourneyHero } from '@/components/about/AboutJourney';
import { AboutCapabilities, AboutCollaborators, AboutExperience, AboutTimeline } from '@/components/about/AboutSections';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'About',
  description: 'Taszid Izaz is an AI-enabled product designer and creative director from Dhaka, shaped by Akira Kurosawa, Kentaro Miura, Hayao Miyazaki and Hideo Kojima.',
  alternates: { canonical: '/about' },
};

/** About: the journey (who I am, who taught me, what I love), then the career facts. */
export default function AboutPage() {
  return (
    <>
      <JourneyHero />
      <Journey />
      <Favourites />
      <AboutTimeline />
      <AboutExperience />
      <AboutCapabilities />
      <AboutCollaborators />
      <Contact />
    </>
  );
}
