/**
 * main.js — More Success Academy Waitlist
 * ─────────────────────────────────────────────────────────────
 * Application bootstrap. Responsibilities:
 *   1. Fetch all HTML section partials in order
 *   2. Inject them into #app
 *   3. Initialise all behaviour modules
 *
 * Architecture:
 *   sections/  → pure HTML markup (no logic)
 *   modules/   → pure JS behaviour (no markup)
 *   main.js    → wires them together
 */

import { initNavbar }      from './modules/navbar.js';
import { initStars }       from './modules/stars.js';
import { initReveal }      from './modules/reveal.js';
import { initCounters }    from './modules/counters.js';
import { initCountdown }   from './modules/countdown.js';
import { initWaitlist }    from './modules/waitlist.js';
import { initToast }       from './modules/toast.js';
import { initFaq }         from './modules/faq.js';
import { initTabs }        from './modules/tabs.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';

/**
 * Ordered list of section partials to load.
 * Each string maps to sections/{name}.html
 */
const SECTIONS = [
  'navbar',
  'hero',
  'stats',
  'problem',
  'features',
  'app-preview',
  'how-it-works',
  'consultation',
  'faq',
  'cta',
  'footer',
];

/**
 * Fetches a single HTML partial.
 * @param {string} name
 * @returns {Promise<string>}
 */
async function loadSection(name) {
  const url      = `sections/${name}.html`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`[MSA] Failed to load section "${name}": ${response.status} ${response.statusText}`);
  }

  return response.text();
}

/**
 * Loads all section partials concurrently and injects them
 * into the #app container in the correct order.
 * @returns {Promise<void>}
 */
async function renderSections() {
  const app = document.getElementById('app');
  if (!app) throw new Error('[MSA] #app container not found');

  // Load all sections in parallel, preserve order
  const htmlFragments = await Promise.all(SECTIONS.map(loadSection));
  app.innerHTML = htmlFragments.join('\n');
}

/**
 * Initialises all behaviour modules.
 * Called after DOM is fully rendered.
 */
function initModules() {
  initToast();
  initNavbar();
  initStars();
  initReveal();
  initCounters();
  initCountdown();
  initWaitlist();
  initFaq();
  initTabs();
  initSmoothScroll();
}

/**
 * Application bootstrap.
 */
async function bootstrap() {
  try {
    await renderSections();
    initModules();
  } catch (error) {
    console.error('[MSA] Bootstrap error:', error);

    // Degrade gracefully — show a fallback message
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div style="min-height:100vh; display:flex; align-items:center; justify-content:center; padding:2rem; text-align:center;">
          <div>
            <p style="font-size:1.1rem; color:rgba(255,255,255,0.6); margin-bottom:1rem;">
              Could not load the page. Please ensure you are serving the files over HTTP.
            </p>
            <code style="font-size:0.8rem; color:#D4AF37;">npx serve .</code>
          </div>
        </div>`;
    }
  }
}

// Start
bootstrap();
