import { ParallaxImage } from '@/components/ui/ParallaxImage';
import type { GalleryRow } from '@/content/types';
import { col } from '@/lib/grid';
import styles from './Case.module.css';

/** A row of 1, 2 or 3 images/videos. Multi-image rows share the first item's ratio so heights line up. */
export function CaseGallery({ row }: { row: GalleryRow }) {
  const [first] = row.images;
  const spans = row.layout === 'full' ? ['1/-1'] : row.layout === 'pair' ? ['1/7', '7/13'] : ['1/5', '5/9', '9/13'];
  const sizes = row.layout === 'full' ? '100vw' : row.layout === 'pair' ? '(max-width: 767px) 100vw, 50vw' : '(max-width: 767px) 100vw, 33vw';
  return (
    <div className={`grid ${styles.gallery}`}>
      {row.images.map((im) => (
        <ParallaxImage
          key={im.video ?? im.src}
          style={col(spans[row.images.indexOf(im)], '1/-1')}
          src={im.src}
          video={im.video}
          alt={im.alt}
          ratio={row.layout === 'full' ? `${im.w} / ${im.h}` : `${first.w} / ${first.h}`}
          sizes={sizes}
        />
      ))}
    </div>
  );
}
