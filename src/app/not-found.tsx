import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="sec grid" style={{ minHeight: '100svh', alignContent: 'center' }}>
      <p className="label muted">(404)</p>
      <h1 className="t-l" style={{ margin: '16px 0 32px' }}>
        This page went to get <em>coffee.</em>
      </h1>
      <p><Link href="/" className="ul">← Back to the homepage</Link></p>
    </section>
  );
}
