/**
 * modules/waitlist.js
 * Handles waitlist form validation and submission.
 *
 * ── MAILCHIMP SETUP ──────────────────────────────────────────
 * 1. Go to Mailchimp → Audience → Signup Forms → Embedded Forms
 * 2. Copy your form action URL:
 *      https://YOURLIST.us1.list-manage.com/subscribe/post
 * 3. Copy u= and id= values from the form action
 * 4. Paste them into MAILCHIMP_CONFIG below
 * ────────────────────────────────────────────────────────────
 */

import { showToast } from './toast.js';

/** @type {{ action: string, u: string, id: string }} */
const MAILCHIMP_CONFIG = {
  action: 'https://YOURLIST.us1.list-manage.com/subscribe/post', // ← replace
  u:      'YOUR_U_VALUE',   // ← replace
  id:     'YOUR_LIST_ID',   // ← replace
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORM_SELECTOR = '.js-waitlist-form';

/**
 * Validates an email string.
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => EMAIL_REGEX.test(email.trim());

/**
 * Marks an input as errored with a temporary shake class.
 * @param {HTMLInputElement} input
 */
function markError(input) {
  input.classList.add('is-error');
  setTimeout(() => input.classList.remove('is-error'), 2200);
}

/**
 * Submits the email to Mailchimp via a no-cors POST.
 * Note: no-cors means we can't read the response — this is expected
 * behaviour for Mailchimp's embed API. Confirmation is assumed on success.
 * @param {string} email
 * @returns {Promise<void>}
 */
async function submitToMailchimp(email) {
  const params = new URLSearchParams({
    u:      MAILCHIMP_CONFIG.u,
    id:     MAILCHIMP_CONFIG.id,
    EMAIL:  email,
  });
  await fetch(`${MAILCHIMP_CONFIG.action}?c=?`, {
    method: 'POST',
    mode:   'no-cors',
    body:   params,
  });
}

/**
 * Handles a waitlist form submission event.
 * @param {SubmitEvent} e
 */
async function handleSubmit(e) {
  e.preventDefault();

  const form        = e.currentTarget;
  const emailInput  = form.querySelector('input[type="email"]');
  const submitBtn   = form.querySelector('button[type="submit"]');

  if (!emailInput) return;

  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    markError(emailInput);
    return;
  }

  // Disable during submission
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Joining…';
  }

  try {
    await submitToMailchimp(email);
  } catch (err) {
    // Network failures are silent — Mailchimp no-cors swallows them anyway
    console.warn('[MSA] Mailchimp request failed (this may be expected):', err.message);
  }

  emailInput.value = '';
  showToast();

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = submitBtn.dataset.originalLabel || 'Join Now <i class="fas fa-arrow-right ml-2"></i>';
  }
}

export function initWaitlist() {
  const forms = document.querySelectorAll(FORM_SELECTOR);
  if (!forms.length) return;

  forms.forEach(form => {
    // Store original button label for reset after submission
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.dataset.originalLabel = btn.innerHTML;

    form.addEventListener('submit', handleSubmit);
  });
}
