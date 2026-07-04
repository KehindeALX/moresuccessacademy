# DEVELOPMENT PLAN — Sprints

Each sprint ships something usable. Nothing is "infrastructure for its own sake" — if a sprint doesn't change what you or a student can actually do, it's cut or merged into another sprint.

## Sprint 0 — This week
- [ ] Add `apply.html` (the intake form) to the existing repo, linked from the homepage nav and a CTA button.
- [ ] Connect it to Formspree or Getform (free tier) so submissions land in your email.
- [ ] Test end-to-end: fill it out yourself, confirm you receive it, confirm the "Download as PDF" and "Download as Text" buttons work for the applicant's own copy.
- [ ] Deploy (push to GitHub → Vercel auto-deploys, per your existing setup).

## Sprint 1 — Weeks 2–3
- [ ] Create a Supabase project. Create the `users` and `applications` tables from `DATABASE_SCHEMA.md`.
- [ ] Add a Vercel serverless function `/api/apply` that the form posts to, writing into `applications`.
- [ ] Keep Formspree running in parallel for one sprint as a safety net before fully switching over.

## Sprint 2 — Weeks 4–5
- [ ] Build a simple, password-protected (or Supabase-auth-protected) mentor page: a table of all applications, sortable/filterable by country and submission date.
- [ ] Add the `mentor_assessments` table and a basic scoring form on that same page.

## Sprint 3 — Weeks 6–7
- [ ] Add Supabase Auth (magic link) for students.
- [ ] Build the student roadmap page: reads `roadmap_steps` for the logged-in student, shows the 12-step journey with status.
- [ ] Seed `roadmap_steps` for Deborah and Caleb manually as your first real test data.

## Sprint 4 — Weeks 8–10
- [ ] Build `school_shortlist` and `scholarship_shortlist` UI (add/edit rows per student) — this replaces the manual Excel shortlist tables.
- [ ] Add `deadlines` table + UI, replacing the Master Deadlines tab.

## Sprint 5 — Weeks 11+
- [ ] Supabase Storage integration for real file uploads (replaces the "filename only" placeholder in the current intake form).
- [ ] Email reminders (a scheduled Vercel Cron job or Supabase Edge Function querying `deadlines` for anything due within N days).

## Backlog (not scheduled — revisit after Sprint 5 with real usage data)
- Full mentor dashboard with dashboard-style metrics (students, offers, scholarships won, total value, visa approvals).
- AI Admission Assistant.
- Multi-mentor support (if MSA brings on additional mentors beyond you).

## Prompt library (for whichever AI coding tool you use — Copilot, Cursor, or Claude Code)
Keep these in `docs/PROMPTS.md` as you go so any tool starts with the same context:

> "Here is `docs/SYSTEM_ARCHITECTURE.md` and `docs/DATABASE_SCHEMA.md` for the More Success Academy project. Implement [specific sprint task] following this architecture exactly. Do not introduce new tables, routes, or dependencies not listed in these docs without flagging it first."

Being this specific matters more than which tool you use — a vague "build the mentor dashboard" prompt is where agentic tools tend to improvise architecture that drifts from what's actually documented here.
