/**
 * modules/faq.js
 * Accordion behaviour for FAQ items.
 * Only one item can be open at a time.
 */

const ITEM_SELECTOR   = '.faq-item';
const ANSWER_SELECTOR = '.faq-answer';
const OPEN_CLASS      = 'is-open';

/**
 * Closes all open FAQ items.
 * @param {NodeListOf<Element>} items
 */
function closeAll(items) {
  items.forEach(item => {
    item.classList.remove(OPEN_CLASS);
    const answer = item.querySelector(ANSWER_SELECTOR);
    if (answer) answer.classList.remove(OPEN_CLASS);
  });
}

export function initFaq() {
  const items = document.querySelectorAll(ITEM_SELECTOR);
  if (!items.length) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const isAlreadyOpen = item.classList.contains(OPEN_CLASS);
      closeAll(items);

      if (!isAlreadyOpen) {
        item.classList.add(OPEN_CLASS);
        const answer = item.querySelector(ANSWER_SELECTOR);
        if (answer) answer.classList.add(OPEN_CLASS);
      }
    });

    // Keyboard accessibility
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}
