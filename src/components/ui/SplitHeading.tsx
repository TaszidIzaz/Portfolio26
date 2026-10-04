'use client';

import { useRef, type CSSProperties, type ElementType } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { rich } from '@/lib/rich';

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/** Headline whose lines slide up out of masks when scrolled into view. Supports *emphasis* (shown muted). */
export function SplitHeading({ text, as: Tag = 'h2', className = '', style }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      SplitText.create(ref.current!, {
        type: 'lines', mask: 'lines', linesClass: 'ln', autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.08,
            scrollTrigger: { trigger: ref.current, start: 'top 85%' },
          }),
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={`hl ${className}`} style={style}>
      {rich(text)}
    </Tag>
  );
}
