/**
 * modules/stars.js
 * Generates procedural star particles into the hero background.
 */

const STAR_COUNT  = 90;
const SIZE_MIN    = 0.5;
const SIZE_MAX    = 2.8;
const DURATION_MIN = 3;
const DURATION_MAX = 9;

/**
 * Creates a single star element with randomised size, position, and timing.
 * @returns {HTMLDivElement}
 */
function createStar() {
  const el   = document.createElement('div');
  const size = Math.random() * (SIZE_MAX - SIZE_MIN) + SIZE_MIN;

  el.className = 'star';
  el.style.cssText = [
    `width: ${size}px`,
    `height: ${size}px`,
    `top: ${Math.random() * 100}%`,
    `left: ${Math.random() * 100}%`,
    `animation-duration: ${(Math.random() * (DURATION_MAX - DURATION_MIN) + DURATION_MIN).toFixed(2)}s`,
    `animation-delay: ${(Math.random() * 6).toFixed(2)}s`,
  ].join('; ');

  return el;
}

export function initStars() {
  const container = document.querySelector('.stars-container');
  if (!container) return;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < STAR_COUNT; i++) {
    fragment.appendChild(createStar());
  }
  container.appendChild(fragment);
}
