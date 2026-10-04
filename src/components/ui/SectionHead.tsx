'use client';

import { useRef } from 'react';
import { col } from '@/lib/grid';
import { PICTO_NAMES, Pictogram, type PictoName } from './Collage';
import { FOLK_SHAPES, FolkIcon, type FolkShape } from './Folk';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './SectionHead.module.css';

/** Pictogram per section title (Brutalist mode); anything unlisted picks one by index. */
const ICONS: Record<string, PictoName> = {
  About: 'reader', 'Selected work': 'arrow', Process: 'blob', Toolbox: 'anvil', 'Kind words': 'bubble',
  Questions: 'question', Contact: 'dots', Timeline: 'spark', Experience: 'reader', 'Tools & certifications': 'anvil',
  Principles: 'spark', Services: 'blob', 'Working together': 'dots', 'Latest notes': 'bubble', 'Keep reading': 'arrow',
};

/** Woodcut stamp per section title (Almanac mode). */
const FOLK_ICONS: Record<string, FolkShape> = {
  About: 'porcini', 'Selected work': 'enoki', Process: 'mint', Toolbox: 'pot', 'Kind words': 'hen',
  Questions: 'morel', Contact: 'pig', Timeline: 'ginseng', Experience: 'cow', 'Tools & certifications': 'bokchoy',
  Principles: 'fig', Services: 'chanterelle', 'Working together': 'pig', 'Latest notes': 'morel', 'Keep reading': 'mint',
};

/** The hairline + "(02) Selected work ……… note" row that opens each section. */
export function SectionHead({ index, title, note }: { index: string; title: string; note?: string }) {
  const icon = ICONS[title] ?? PICTO_NAMES[Number(index) % PICTO_NAMES.length];
  const folkIcon = FOLK_ICONS[title] ?? FOLK_SHAPES[Number(index) % FOLK_SHAPES.length];
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from(ref.current!.children, {
        opacity: 0, y: 12, duration: 0.9, ease: 'power3.out', stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: 'top 92%' },
      });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={`grid ${styles.head}`}>
      <p className={`label ${styles.index}`} style={col('1/3', '1/2')}><Pictogram name={icon} /><FolkIcon name={folkIcon} />({index})</p>
      <p className="label" style={col('3/7', '2/5')}>{title}</p>
      {note && <p className="label right hide-m" style={col('9/13')}>{note}</p>}
    </div>
  );
}
