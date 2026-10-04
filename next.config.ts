import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The dev-only Next.js badge sits on top of the dock; hide it.
  devIndicators: false,
  images: {
    // Serve modern formats; Next resizes per device from the `sizes` prop.
    formats: ['image/avif', 'image/webp'],
    // Article photos are hotlinked from Unsplash (free licence; credited in captions).
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;
