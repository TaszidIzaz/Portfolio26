import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Story } from '@/components/sections/Story';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { Numbers } from '@/components/sections/Numbers';
import { Expertise } from '@/components/sections/Expertise';
import { Ticker } from '@/components/sections/Ticker';
import { Works } from '@/components/sections/Works';

/**
 * Homepage — sections in scroll order.
 * Reorder, remove or add sections here; each one is self-contained.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <About />
      <Numbers />
      <Ticker />
      <Works />
      <Expertise />
      <Faq />
      <Contact />
    </>
  );
}
