import type { Img } from './types';
import { unsplash } from './unsplash';

/** /about — sourced from Taszid's résumé and current site. */
export const aboutPage = {
  label: '(About)',
  title: 'A designer who works *with AI, not for it.*',
  /** Add a portrait to use it as the About hero image (e.g. { src: '/images/about/portrait.jpg', w: 1600, h: 2000, alt: 'Taszid Izaz' }) */
  portrait: null as Img | null,

  timeline: [
    { year: '2020', text: 'Started a BSc in Software Engineering at the Islamic University of Technology' },
    { year: '2023', text: 'UX Designer at SpaceCats Technology, Arizona (remote)' },
    { year: '2024', text: 'UX Designer at SquidX: 600+ website sections, prototypes and motion' },
    { year: '2024', text: 'Won Algorizin’s Design-a-thon and joined as Product Designer' },
    { year: '2024', text: 'Founding Product Designer at Profyl.ai, and graduated from IUT' },
    { year: '2025', text: 'Product Designer & Manager at Polyuno, Washington DC (remote)' },
    { year: '2025', text: 'Web Designer at UNIKO, Miami, for brands in the USA and Dubai' },
    { year: 'Now', text: 'Creative Director at GY6' },
  ],

  experience: [
    { company: 'GY6', role: 'Creative Director', where: 'Bangladesh', when: 'Now' },
    { company: 'UNIKO', role: 'Web Designer', where: 'Miami, USA · Remote, part-time', when: 'Oct 2025 — Present' },
    { company: 'Polyuno', role: 'Product Designer / Manager', where: 'Washington DC, USA · Remote', when: 'Mar 2025 — Nov 2025' },
    { company: 'Profyl.ai', role: 'Founding Product Designer', where: 'Dhaka, Bangladesh · Part-time', when: 'Sep 2024 — Present' },
    { company: 'Algorizin', role: 'Product Designer', where: 'New York, USA · Remote', when: 'Jun 2024 — Present' },
    { company: 'SquidX Agency', role: 'UX Designer', where: 'Dhaka, Bangladesh · Remote', when: 'May 2024 — Nov 2024' },
    { company: 'SpaceCats Technology', role: 'UX Designer', where: 'Arizona, USA · Remote', when: 'May 2023 — Sep 2023' },
  ],

  education: { school: 'Islamic University of Technology', degree: 'BSc in Software Engineering', when: '2020 — 2024' },

  tools: [
    { group: 'Design', items: ['Figma', 'Protopie', 'Illustrator'] },
    { group: 'Motion', items: ['Jitter (Contra Expert)', 'After Effects'] },
    { group: 'Research', items: ['Miro', 'Hotjar', 'Typeform'] },
    { group: 'Build', items: ['Next.js', 'React', 'Webflow'] },
  ],

  certifications: [
    'Google UX Design Professional Certificate',
    'Agile Methods for UX Design',
    'UX Management: Strategy and Tactics',
    'Perception and Memory in HCI and UX — Interaction Design Foundation',
    'Human-Computer Interaction: The Foundations of UX Design — Interaction Design Foundation',
    'Mastering React JS, Next JS and Prisma — Ostad',
  ],

  /** Scrolling list: name + what I did there */
  collaborators: [
    { name: 'Algorizin', role: 'product design, UX research' },
    { name: 'Profyl.ai', role: 'founding product designer' },
    { name: 'FIZCLO', role: 'UX design, frontend' },
    { name: 'CenteredData', role: 'brand identity' },
    { name: 'Polyuno', role: 'product design & management' },
    { name: 'UNIKO', role: 'web design' },
    { name: 'SquidX', role: 'UX design, component library' },
    { name: 'GY6', role: 'creative direction' },
    { name: 'BSIC', role: 'creative direction, launch identity' },
    { name: 'Paperless', role: 'creative direction, brand identity' },
    { name: 'Revora', role: 'creative direction, brand & web' },
    { name: 'Storyflow', role: 'creative direction, web design' },
    { name: 'Teez Agency', role: 'creative direction, web design' },
  ],
};

/**
 * /about — the journey: a line that winds down the page through stops and cards
 * (after the "who am I?" storytelling references). Copy is drafted in Taszid's voice; edit freely.
 * Photos: Unsplash (free licence) evoke each inspiration; no film stills or manga panels are used.
 */
export const journey = {
  hero: {
    image: unsplash('photo-1628850627071-42b3fb16533d', 4769, 3163, 'A narrow Japanese alley glowing at night', 'masahiro miyagi'),
    /** Hand-labelled tags on the hero image */
    tags: ['Product designer', 'Creative director', 'Film, game & anime nerd', 'AI-enabled'],
    /** Small polaroids of the work, tucked over the hero's edge */
    polaroids: [
      { src: '/images/shots/bespoke.webp', w: 2000, h: 1469, alt: 'A tailoring website' },
      { src: '/images/shots/editorial.webp', w: 2000, h: 1469, alt: 'A fashion editorial website' },
    ] as Img[],
    name: 'Taszid Izaz',
    intro: ['I help ideas', 'meet the people', 'they were made for,', 'one frame at a time.'],
  },
  stops: {
    who: { num: '01', label: 'Who am I?', lines: ['A question that takes a lifetime.', '— Who are you?', '— Depends who’s asking…'], image: unsplash('photo-1635183783375-98e857771351', 3376, 6000, 'Someone sketching at a desk', 'Lesia and Serhii Artymovych') },
    teachers: { num: '02', label: 'Who taught me?', lines: ['None of them designed an app.', 'All of them taught me how to.'] },
    gives: { num: '03', label: 'What it gives the work', lines: ['Frames, devotion, breath, connection.', 'Four lessons, one way of working.'] },
  },
  /** "Who am I?" cards */
  who: [
    {
      n: '/1',
      text: 'My name is Taszid. I’m a product designer and creative director in Dhaka, currently leading creative at GY6. People who work with me would tell you I ask a lot of questions.',
      images: [unsplash('photo-1586717791821-3f44a563fa4c', 7952, 5304, 'Sketching wireframes on a tablet', 'Alvaro Reyes')],
    },
    {
      n: '/2',
      text: 'A designer, an engineer by degree, a creative director, a collector of references, a late-night gamer, a film re-watcher. Those are a few of my roles.',
      images: [unsplash('photo-1552820728-8b83bb6b773f', 5826, 3885, 'A game controller on a wooden desk', 'Alexey Savchenko')],
    },
    {
      n: '/3',
      text: 'I fall for stories: films, games and anime. It’s where I learn the most about design without opening Figma. That’s my answer to “who am I?”',
      images: [
        unsplash('photo-1440404653325-ab127d49abc1', 4896, 3264, 'Two film reels', 'Noom Peerapong'),
        unsplash('photo-1670960763844-10278a725ac7', 6000, 4000, 'Someone walking a rainy street with an umbrella', 'Nicolas Caetano'),
      ],
    },
  ],
  /** The four storytellers behind the way I design */
  teachers: [
    {
      name: 'Akira Kurosawa', medium: 'Film', works: 'Seven Samurai · Rashomon · Ran',
      lesson: 'Every frame has a reason.',
      text: 'Kurosawa painted his own storyboards and used rain, wind and movement to carry emotion. I compose layouts the same way: nothing in the frame by accident, and motion only when it means something.',
      image: unsplash('photo-1688327044868-e358b414039c', 3024, 4032, 'A samurai seated with a sword', 'Juno Jo'),
    },
    {
      name: 'Kentaro Miura', medium: 'Manga', works: 'Berserk',
      lesson: 'Detail is devotion.',
      text: 'Miura spent more than thirty years drawing Berserk by hand, panel after obsessive panel. That patience is why I’ll still nudge 4px at midnight. Nobody notices the detail; everybody feels it.',
      image: unsplash('photo-1460194436988-671f763436b7', 4120, 2747, 'A knight in chainmail holding a sword', 'Henry Hustava'),
    },
    {
      name: 'Hayao Miyazaki', medium: 'Animation', works: 'Spirited Away · Princess Mononoke · My Neighbor Totoro',
      lesson: 'Leave room to breathe.',
      text: 'Miyazaki’s films pause for quiet moments where nothing happens and everything is felt. I keep that space in interfaces: white space, calm pacing, and the warmth of something made by hand.',
      image: unsplash('photo-1650647526661-5dee44d4b62a', 12000, 8000, 'Rolling green hills under soft clouds', 'Massimiliano Morosinotto'),
    },
    {
      name: 'Hideo Kojima', medium: 'Games', works: 'Metal Gear Solid · Death Stranding',
      lesson: 'Design the connection.',
      text: 'Kojima treats menus, radio calls and even a cardboard box as part of the story, and Death Stranding is about reconnecting people. That’s good UX to me: the interface is the story, and the point is connection.',
      image: unsplash('photo-1508165821229-7be282c31b6e', 5110, 3407, 'A lone figure standing on misty ground', 'Jakub Kriz'),
      extra: unsplash('photo-1630448927918-1dbcd8ba439b', 6000, 4000, 'A cardboard box', 'Christopher Bill'),
    },
  ],
  /** What I love, after the "platforms / tech / services" list layout */
  favourites: {
    label: 'What I love',
    title: 'Stories first, *screens second.*',
    groups: [
      { group: 'Watching', items: ['Seven Samurai', 'Rashomon', 'Ran', 'Spirited Away', 'Princess Mononoke'] },
      { group: 'Playing', items: ['Metal Gear Solid', 'Death Stranding'] },
      { group: 'Reading', items: ['Berserk'] },
      { group: 'Doing', items: ['Sketching on paper', 'Collecting references', 'Building in Figma and code'] },
    ],
  },
};
