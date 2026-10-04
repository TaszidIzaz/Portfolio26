const GLYPHS = '▖▘▝▗▚▞█▓░#%&*+=?ABCDEFGHJKLMNPRSTUVXYZ';
const frames = new WeakMap<HTMLElement, number>();

/** Glitch-resolve an element's text into `text`. */
export function scramble(el: HTMLElement, text: string, length = 16) {
  cancelAnimationFrame(frames.get(el) ?? 0);
  let f = 0;
  const step = () => {
    f++;
    const done = (f / length) * text.length;
    el.textContent = [...text]
      .map((c, i) => (i < done || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
      .join('');
    if (f < length) frames.set(el, requestAnimationFrame(step));
    else el.textContent = text;
  };
  step();
}
