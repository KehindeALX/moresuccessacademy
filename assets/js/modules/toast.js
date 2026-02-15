/**
 * modules/toast.js
 * Manages the global toast notification.
 * Exported as a utility — consumed by waitlist.js.
 */

const TOAST_DURATION_MS = 4500;
let toastTimer = null;

/**
 * Shows the toast, auto-hides after TOAST_DURATION_MS.
 */
export function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;

  if (toastTimer) clearTimeout(toastTimer);

  toast.classList.add('is-visible');
  toastTimer = setTimeout(hideToast, TOAST_DURATION_MS);
}

/**
 * Hides the toast immediately.
 */
export function hideToast() {
  const toast = document.getElementById('toast');
  if (toast) toast.classList.remove('is-visible');
}

/**
 * Binds the close button inside the toast.
 */
export function initToast() {
  const closeBtn = document.getElementById('toast-close');
  if (closeBtn) closeBtn.addEventListener('click', hideToast);
}
