# UI/UX GUIDELINES — More Success Academy

Design language established in the intake form (`apply.html`) — reuse these tokens across every new page so the platform feels like one product, not a patchwork of pages built at different times.

## Concept
The visual metaphor is the international journey itself: a passport being stamped as a student moves through stages. Structural devices (numbered stages, stamp icons) should only be used where there's a real sequence to show — don't decorate pages that aren't a step-by-step process with stamp/passport motifs just for branding consistency.

## Color tokens
| Token | Hex | Use |
|---|---|---|
| `--navy` | `#14213D` | Primary brand color, headers, nav |
| `--navy-deep` | `#0D1730` | Darker backgrounds, active states |
| `--cream` | `#FBF7EF` | Page background |
| `--paper` | `#FFFDF8` | Card/form backgrounds |
| `--gold` | `#B8862B` | Primary accent, CTAs, active stamps |
| `--gold-light` | `#D9B65E` | Hover/lighter accent |
| `--burgundy` | `#6E2C2C` | Secondary accent (pills, highlights) — use sparingly |
| `--teal` | `#1F4B43` | Success/completed states, file-uploaded badges |
| `--ink` | `#22252B` | Body text |
| `--ink-soft` | `#5B5F6B` | Secondary/muted text |
| `--line` | `#DCD4C2` | Borders, dividers |

## Typography
- **Display (headings):** Fraunces — serif with character, used with restraint (headings only, never body copy).
- **Body:** Inter — all paragraph and form text.
- **Labels/data/mono accents:** Space Mono — form field labels, eyebrows, stamp numbers, deadlines. This typewriter feel reinforces the "official document" tone without needing heavy decoration.

## Components already built (reuse, don't recreate)
- **Stamp progress rail** — vertical stage indicator with circular "stamps" that fill gold and rotate slightly when a stage is completed. Use for any multi-step flow (intake form, future onboarding flows) — not for single-page content.
- **Choice pills** — rounded selectable buttons for single/multi-select questions (used for country preference, funding source, scholarship types).
- **Subpanel** — gold-left-border callout box for conditional follow-up questions (e.g. Canada selected → PGWP question appears in a subpanel). Reuse this pattern any time a form field's answer needs a dependent follow-up.
- **Review/summary block** — definition-list style (`dt`/`dd`) grid for read-only display of collected data — reuse this for the future student roadmap page and mentor review page so submitted data always looks the same way it does at intake.

## Voice and copy
- Active voice, plain verbs: "Continue," "Download as PDF," not "Submit" or generic system language.
- Field hints explain what to do, not how the system works (e.g. "As it appears on your passport," not "Enter string value").
- Errors/empty states (for future dashboard pages) should say what happened and what to do next — never a bare "No data."

## Accessibility baseline (carry into every future page)
- Visible keyboard focus states on all interactive elements (already implemented via the `:focus` gold outline).
- Color contrast: navy-on-cream and ink-on-paper both meet WCAG AA; don't introduce new color pairs without checking contrast.
- Forms must remain fully usable and readable down to a 375px-wide mobile viewport (the intake form's rail collapses to a horizontal scroll strip at 720px — follow this same collapse pattern for future multi-step flows).
