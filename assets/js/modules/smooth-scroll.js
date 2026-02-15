/**
 * modules/smooth-scroll.js
 * Intercepts anchor clicks and scrolls smoothly,
 * accounting for the fixed navbar height.
 */

const NAVBAR_OFFSET_PX = 80;

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href   = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top
                + window.scrollY
                - NAVBAR_OFFSET_PX;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
