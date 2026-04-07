# More Success Academy — Waitlist Landing Page

Africa's first Agentic AI-Powered Learning Management System.

---

## Project Structure

```
msa-waitlist/
├── index.html                  ← App shell (entry point)
├── package.json
│
├── assets/
│   ├── css/
│   │   ├── variables.css       ← Design tokens (colours, fonts, spacing)
│   │   ├── base.css            ← Reset, body, layout primitives
│   │   ├── components.css      ← All UI components (cards, buttons, forms…)
│   │   └── animations.css      ← Keyframes + motion utilities
│   │
│   ├── js/
│   │   ├── main.js             ← Orchestrator: loads sections + inits modules
│   │   └── modules/
│   │       ├── navbar.js       ← Scroll shrink + mobile menu
│   │       ├── stars.js        ← Procedural star particles
│   │       ├── reveal.js       ← Scroll-triggered reveal animations
│   │       ├── counters.js     ← Animated stat counters
│   │       ├── countdown.js    ← Launch date countdown timer
│   │       ├── waitlist.js     ← Form validation + Mailchimp submission
│   │       ├── toast.js        ← Global notification
│   │       ├── faq.js          ← Accordion behaviour
│   │       ├── tabs.js         ← Tab panel switcher
│   │       └── smooth-scroll.js← Anchor scroll with navbar offset
│   │
│   └── images/
│       ├── logo.jpg
│       ├── mockup-1.jpg
│       ├── mockup-2.jpg
│       ├── mockup-3.jpg
│       └── mockup-4.jpg
│
└── sections/                   ← Pure HTML partials (no logic)
    ├── navbar.html
    ├── hero.html
    ├── stats.html
    ├── problem.html
    ├── features.html
    ├── app-preview.html
    ├── how-it-works.html
    ├── consultation.html
    ├── faq.html
    ├── cta.html
    └── footer.html
```

---

## Local Development

> **Important:** ES modules (`type="module"`) require an HTTP server.
> Opening `index.html` directly via `file://` will NOT work.

### Option 1 — npx serve (recommended, no install needed)
```bash
cd msa-waitlist
npm run dev
# → http://localhost:3000
```

### Option 2 — Python
```bash
python3 -m http.server 3000
# → http://localhost:3000
```

### Option 3 — VS Code
Install the **Live Server** extension and click "Go Live".

---

## Mailchimp Integration

1. Log into Mailchimp
2. Go to **Audience → Signup Forms → Embedded Forms**
3. Copy the form action URL (format: `https://YOURLIST.us1.list-manage.com/subscribe/post`)
4. Copy the `u=` and `id=` parameter values
5. Open `assets/js/modules/waitlist.js`
6. Update `MAILCHIMP_CONFIG`:

```js
const MAILCHIMP_CONFIG = {
  action: 'https://YOURLIST.us1.list-manage.com/subscribe/post',
  u:      'abc123...',   // your u= value
  id:     'def456...',   // your id= value
};
```

7. Uncomment the `submitToMailchimp` fetch call (it's already wired up — just update the config)

---

## Countdown Timer

Open `assets/js/modules/countdown.js` and update:

```js
const LAUNCH_DATE = new Date('2026-06-01T00:00:00');
//                              ↑ Your actual launch date
```

---

## Deployment (Netlify)

1. Zip the entire `msa-waitlist/` folder
2. Go to [netlify.com](https://netlify.com) → Drop zone → Upload zip
3. Done — your site is live in under 60 seconds ✅

Or connect your Git repo for automatic deploys on push.

---

## Design System

All design tokens live in `assets/css/variables.css`.
Change colours, fonts, or spacing there and it cascades everywhere.

| Token | Value |
|-------|-------|
| `--color-navy` | `#050B2E` |
| `--color-royal` | `#1B4FD8` |
| `--color-gold` | `#D4AF37` |
| `--font-display` | Bebas Neue |
| `--font-heading` | Syne |
| `--font-body` | DM Sans |

---

## Contact

- Email: info@moresuccessacademy.com.ng
- Consultation: https://moresuccessacademy.zohobookings.com
- Facebook: https://www.facebook.com/share/1GHvimrohD/
