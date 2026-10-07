import type { Faq, Img } from './types';

export const faqIntro = {
  label: '(Still curious?)',
  title: 'Questions? *I’ve got coffee.*',
  lede: 'Everything people usually ask before we start. If yours isn’t here, it’s probably a good one.',
  card: {
    title: 'Can’t find your answer?',
    text: 'Book a quick call. No pitch, no pressure, just two people and an idea.',
    cta: 'Book a 30-min call',
  },
  /** Add a photo to show it on the card, e.g. { src: '/images/about/taszid.jpg', w: 800, h: 800, alt: 'Taszid Izaz' }. Until then the card shows a monogram. */
  photo: null as Img | null,
};

export const faqs: Faq[] = [
  { q: 'Who’s the best fit to work with me?', a: 'Startups, founders and product teams who want something that looks considered and ships quickly. If you have a deadline and plenty of opinions, we’ll get along just fine.' },
  { q: 'How do you actually use AI?', a: 'Like a very fast, very eager assistant. It helps me research, explore directions and prototype in hours instead of days. It never gets the final say. I do.' },
  { q: 'Won’t AI make my product look like everyone else’s?', a: 'Only if nobody is steering. AI hands me a pile of options; I pick, combine and refine them around your users and your brand, then finish every detail by hand.' },
  { q: 'Can you really design something in a week?', a: 'A first, tested version, yes: two days of research, then moodboards, layouts and polish, with something real to react to by day seven. Bigger products take longer, but you’ll see progress every single day.' },
  { q: 'What does it cost?', a: 'Landing pages start at $499. Websites and products are scoped to what you need, with a clear quote up front. No surprise invoices, ever.' },
  { q: 'Do you design and build?', a: 'Both. Figma for design, Jitter and After Effects for motion, Next.js, React or Webflow to build. One person from first sketch to launch, so nothing gets lost in the hand-off.' },
  { q: 'How will we work together day to day?', a: 'A short kick-off call, then regular updates you can react to whenever suits you. I’m based in Dhaka and happily work across time zones.' },
  { q: 'Can you work with our in-house team?', a: 'Happily. I can plug into your Figma, your stand-ups and your Slack, or sit alongside your developers and make the hand-off painless.' },
  { q: 'Are you open to full-time roles?', a: 'Yes, roles with room to grow, where I can shape product design and help a team use AI well.' },
];
