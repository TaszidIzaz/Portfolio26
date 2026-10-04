import type { MetadataRoute } from 'next';
import { articles } from '@/content/insights';
import { projects } from '@/content/projects';
import { site } from '@/content/site';

/** Every route, generated from content — new projects/articles are picked up automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({ url: `${site.url}${path}`, lastModified: now, priority });
  return [
    page('', 1),
    page('/work', 0.9),
    page('/about', 0.8),
    page('/approach', 0.8),
    page('/insights', 0.7),
    ...projects.map((p) => page(`/work/${p.slug}`, 0.8)),
    ...articles.map((a) => ({ url: `${site.url}/insights/${a.slug}`, lastModified: new Date(a.updated ?? a.date), priority: 0.6 })),
  ];
}
