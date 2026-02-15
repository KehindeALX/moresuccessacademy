/**
 * modules/tabs.js
 * Tab-switcher for the app preview section.
 * Buttons carry [data-tab] attribute pointing to a panel id.
 */

const BTN_SELECTOR    = '.tab-btn';
const PANEL_SELECTOR  = '.tab-panel';
const ACTIVE_CLASS    = 'is-active';

export function initTabs() {
  const buttons = document.querySelectorAll(BTN_SELECTOR);
  const panels  = document.querySelectorAll(PANEL_SELECTOR);

  if (!buttons.length || !panels.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;
      if (!targetId) return;

      // Deactivate all
      buttons.forEach(b => b.classList.remove(ACTIVE_CLASS));
      panels.forEach(p  => p.classList.remove(ACTIVE_CLASS));

      // Activate selected
      btn.classList.add(ACTIVE_CLASS);
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add(ACTIVE_CLASS);
    });
  });
}
