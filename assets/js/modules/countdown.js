/**
 * modules/countdown.js
 * Live countdown timer to the platform launch date.
 *
 * ★ TO CONFIGURE: Update LAUNCH_DATE to your target launch date.
 */

/** @type {Date} Set this to your actual launch date */
const LAUNCH_DATE = new Date("2026-06-01T00:00:00");

const ELEMENT_IDS = {
  days: "cd-days",
  hours: "cd-hours",
  mins: "cd-mins",
  secs: "cd-secs",
};

/**
 * Pads a number to 2 digits.
 * @param {number} n
 * @returns {string}
 */
const pad = (n) => String(n).padStart(2, "0");

/**
 * Computes remaining time and updates DOM elements.
 */
function tick() {
  const diff = LAUNCH_DATE - Date.now();

  const values =
    diff > 0
      ? {
          days: Math.floor(diff / 864e5),
          hours: Math.floor((diff % 864e5) / 36e5),
          mins: Math.floor((diff % 36e5) / 6e4),
          secs: Math.floor((diff % 6e4) / 1e3),
        }
      : { days: 0, hours: 0, mins: 0, secs: 0 };

  Object.entries(ELEMENT_IDS).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = pad(values[key]);
  });
}

export function initCountdown() {
  // Verify at least one element exists before starting
  if (!document.getElementById(ELEMENT_IDS.secs)) return;

  tick();
  setInterval(tick, 1000);
}
