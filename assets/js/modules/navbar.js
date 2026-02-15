/**
 * modules/navbar.js
 * Handles navbar scroll-shrink effect and mobile menu open/close.
 */

export function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const menuBtn   = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!navbar) return;

  // ── Scroll Effect ──────────────────────────────────────
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on init in case page is already scrolled

  // ── Mobile Menu ────────────────────────────────────────
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));

    // Swap icon
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
    }
  });

  // Close menu when any nav link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars text-xl';
    });
  });
}
