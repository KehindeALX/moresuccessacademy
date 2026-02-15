/**
 * modules/reveal.js
 * Triggers scroll-reveal animations using IntersectionObserver.
 * Elements with class .reveal, .reveal-left, or .reveal-right
 * receive .is-visible when they enter the viewport.
 */

const SELECTOR  = '.reveal, .reveal-left, .reveal-right';
const THRESHOLD = 0.12;
const ROOT_MARGIN = '0px 0px -40px 0px';

export function initReveal() {
  const elements = document.querySelectorAll(SELECTOR);
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve after reveal — no need to watch further
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
  );

  elements.forEach(el => observer.observe(el));
}
