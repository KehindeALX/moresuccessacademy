# PRODUCT ROADMAP — More Success Academy: Global Admissions & Scholarship Mentorship

## Vision
MSA becomes the platform that takes a student from "I want to study abroad" through admission, funding, visa, and arrival — with a mentor guiding every step. Not a brochure site with a contact form; a system that gets smarter and more credible with every student who comes through it.

## Where we actually are today (be honest about this)
- A static, modular HTML website (`sections/`, `assets/`, `index.html`, `package.json`) hosted on GitHub.
- No backend, no database, no authentication.
- Mentorship currently runs on: WhatsApp conversations + an Excel tracker + one HTML intake form (built as a standalone file).
- Two active mentees (Deborah, Caleb), proof-of-concept scale.

This matters because it changes what "Phase 1" should be. Building auth, a database, and three portals before a single external student has used the intake form is solving problems you don't have yet. The roadmap below is ordered so every phase produces something you can use with real students immediately, and nothing is thrown away in the next phase.

## Phase 1 — Ship the Intake Form (this week)
**Goal:** Any visitor can apply, and their answers reach you reliably.
- Add the branded, multi-step intake form (already built) as a new page — e.g. `apply.html` or `mentorship/apply.html` — linked from the site nav and a "Apply for Mentorship" button on the homepage.
- Responses collection: don't build a database yet. Use a form backend (Formspree, Getform, or a simple Google Form embedded for the raw fields) so submissions land in your email/Sheet immediately. Zero backend code, live today.
- Each submission = one row you copy into the "Student Database" tab of your tracker (Phase 2 of the tracker itself, not the website).
- **Definition of done:** a stranger can fill the form on your live site and you receive their answers without touching Excel by hand for data entry.

## Phase 2 — Student Database + Mentor View (2–4 weeks)
**Goal:** Stop copy-pasting form responses into Excel.
- Add a lightweight backend: a Supabase project (free tier) with one `applications` table, and a Vercel serverless function (or Supabase's own API) that the intake form posts to directly.
- Your Excel tracker stays as-is for now — export the `applications` table to CSV/Excel weekly, or build a simple read-only mentor page that lists submissions with filters (country, stage). Don't build the full "Mentor Dashboard" UI yet — a table view is enough at this scale.
- **Definition of done:** submissions are queryable without opening email.

## Phase 3 — Student Roadmap Page (4–6 weeks)
**Goal:** Each student can see their own status without messaging you to ask "what's next?"
- Simple authenticated page (magic-link email auth via Supabase Auth — no passwords to manage) showing: their 12-step roadmap, which steps are done, and their next deadline.
- Data comes from the same `applications` table plus a new `roadmap_steps` table.
- **Definition of done:** Deborah and Caleb can log in and see their own status; you're not manually texting status updates.

## Phase 4 — Mentor Dashboard (real one) (6–10 weeks)
- Replaces the read-only table from Phase 2 with the full view: student list, filters, deadline alerts, notes, status editing.
- This is where your existing Excel tracker's structure (Dashboard / per-student / Master Deadlines) becomes the literal spec for the database schema and UI — see `DATABASE_SCHEMA.md`.

## Phase 5 — School & Scholarship Shortlist Tools
- A structured way to attach shortlisted schools/scholarships to a student record (replaces the manual "School Shortlist" table in the Excel tracker), with deadline tracking per item.

## Phase 6 — Document Vault
- Real file uploads (Supabase Storage) replacing the "file name only" placeholder in the current intake form — transcripts, CVs, passports, admission letters, all attached to the student record.

## Phase 7 — Notifications
- Email reminders for upcoming deadlines (deposit due, PAL received, visa deadline) — a scheduled job querying the deadlines table.

## Phase 8 — AI Admission Assistant ("Flowmingo" integration)
- Only after Phases 1–4 are live with real usage. An AI assistant is most useful once there's real student data and a track record to ground its answers in (shortlist logic, past scholarship outcomes, etc.) — building it first means it has nothing real to reason over.

## Success metrics to start tracking now (feeds the Dashboard metrics idea)
| Metric | Where it comes from |
|---|---|
| Students in program | Student Database row count |
| Applications submitted | Manually logged now, automatic in Phase 4 |
| Offers received | Manually logged now |
| Scholarships won / total value | Manually logged now |
| Visa approvals | Manually logged now |

Track these in the Excel tracker's Dashboard tab starting today — you don't need the platform built to start building the track record that makes the platform credible later.

## On tooling (GitHub Copilot vs. Cursor vs. Claude)
All three are legitimate choices and this isn't a decision that blocks Phase 1. Practically:
- **Right now**, you don't need any of them — Phase 1 is a static HTML page and a form backend, no AI coding agent required.
- **From Phase 2 onward**, whichever tool you're already comfortable with (sounds like VS Code + Copilot) is fine to start with. Switching tools mid-project costs more time than most tool differences save. Adopt Cursor later if you hit a real limitation with your current setup, not preemptively.
