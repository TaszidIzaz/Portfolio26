import type { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';
import { WorkIndex } from '@/components/sections/WorkIndex';
import { workIndex } from '@/content/work';

export const metadata: Metadata = {
  title: 'Work',
  description: workIndex.metaDescription,
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <WorkIndex />
      <Contact />
    </>
  );
}
