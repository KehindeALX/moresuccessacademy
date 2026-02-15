/**
 * modules/counters.js
 * Animates [data-target] stat numbers from 0 to target value
 * using a cubic-ease-out easing function, triggered once on scroll.
 */

const DURATION_MS = 1800;
const SELECTOR    = '.stat-number[data-target]';

/**
 * Formats a number for display (adds + suffix, adds commas for thousands).
 * @param {number} value
 * @param {number} target
 * @returns {string}
 */
function formatValue(value, target) {
  return value.toLocaleString() + (target > 0 ? '+' : '');
}

/**
 * Runs the count-up animation for a single element.
 * @param {HTMLElement} el
 */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;

  const start = performance.now();

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / DURATION_MS, 1);
    // Cubic ease-out
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatValue(Math.floor(eased * target), target);

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function initCounters() {
  const elements = document.querySelectorAll(SELECTOR);
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  elements.forEach(el => observer.observe(el));
}
