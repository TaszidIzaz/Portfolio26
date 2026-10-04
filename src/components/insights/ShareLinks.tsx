'use client';

import { useState } from 'react';
import styles from './Article.module.css';

/** Copy link + LinkedIn / X share links for an article. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch { /* clipboard blocked: the links below still work */ }
  };
  return (
    <div className={styles.share}>
      <button className="ul" onClick={copy} aria-live="polite">{copied ? 'Link copied' : 'Copy link'}</button>
      <a className="ul" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener">LinkedIn</a>
      <a className="ul" href={`https://x.com/intent/post?url=${u}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener">X</a>
    </div>
  );
}
