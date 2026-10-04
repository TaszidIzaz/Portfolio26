/**
 * Tiny cross-component event bus (no global state library needed).
 */

/* Narrator: anything can make the dock say something. */
export const NARRATE_EVENT = 'ti:narrate';
export function narrate(text: string) {
  window.dispatchEvent(new CustomEvent<string>(NARRATE_EVENT, { detail: text }));
}

/* Grid overlay toggle. */
export const GRID_EVENT = 'ti:grid';
export function toggleGrid() {
  window.dispatchEvent(new Event(GRID_EVENT));
}

/* Intro: fired once when the loader has lifted. */
const INTRO_EVENT = 'ti:intro';
let introDone = false;
export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}
export function onIntroDone(cb: () => void): () => void {
  if (introDone) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
}
