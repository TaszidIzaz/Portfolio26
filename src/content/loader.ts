/** Intro loader copy + the snapshots that flicker behind the title. */
export const loader = {
  title: ['Freelance Product Designer', 'and Creative Director'],
  messages: ['Generating options…', 'Discarding most of them…', 'Picking the right one…', 'Adding the human touch…', 'Okay. Ready.'],
  /** Exact loading time in seconds. Every snapshot is shown once inside this window. */
  duration: 3,
  /** Snapshots share one height; width follows each image's own aspect ratio. */
  images: [
    { src: '/images/shots/bespoke.webp', w: 2000, h: 1469 },
    { src: '/images/projects/bsic/cover.jpg', w: 1920, h: 1080 },
    { src: '/images/shots/obsidian.webp', w: 1504, h: 1104 },
    { src: '/images/shots/lumera.webp', w: 2000, h: 1469 },
    { src: '/images/projects/revora/cover.jpg', w: 1400, h: 844 },
    { src: '/images/shots/arbok.webp', w: 1931, h: 1418 },
    { src: '/images/shots/loungewear.webp', w: 2000, h: 1469 },
    { src: '/images/projects/paperless/cover.jpg', w: 1920, h: 1080 },
    { src: '/images/shots/editorial.webp', w: 2000, h: 1469 },
    { src: '/images/shots/qredibility.webp', w: 2000, h: 1313 },
    { src: '/images/projects/storyflow/cover.jpg', w: 1400, h: 888 },
    { src: '/images/shots/designer-portfolio.webp', w: 1504, h: 1104 },
    { src: '/images/shots/fizclo-orders.webp', w: 2000, h: 1469 },
    { src: '/images/shots/insights-blog.webp', w: 2000, h: 1108 },
  ],
};
