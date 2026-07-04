# SYSTEM ARCHITECTURE — More Success Academy Platform

## Current state (as of this document)
```
moresuccessacademy/
├── assets/
│   ├── css/
│   ├── images/
│   └── js/
├── sections/
│   ├── hero.html
│   ├── features.html
│   ├── consultation.html
│   ├── how-it-works.html
│   ├── faq.html
│   ├── footer.html
│   ├── navbar.html
│   └── ...
├── index.html
├── package.json
└── README.md
```
Static, modular HTML site. No backend. No database. No auth. This is a legitimate architecture for a marketing site — it does not need to be replaced to ship Phase 1.

## Target architecture, introduced incrementally

### Phase 1 (now): Static + form backend
```
Browser
  → apply.html (new page, modular like existing sections/)
  → Formspree/Getform (managed form backend)
  → Email / Google Sheet
```
No new infrastructure. No auth. No database. This is intentional — don't add complexity the current scale doesn't need.

### Phase 2–3: Add a minimal backend
```
Browser (apply.html)
  → Vercel Serverless Function (/api/apply)
  → Supabase Postgres (applications table)

Browser (student roadmap page)
  → Supabase Auth (magic link)
  → Supabase Postgres (read own row only, via Row Level Security)
```
Why Supabase specifically: Postgres (real relational data, matches the tracker's tabular structure), built-in auth, built-in file storage for Phase 6, generous free tier, no separate ORM/infra to manage. This is the same recommendation your other notes converged on — no disagreement here, it's a sound default for this scale.

Why Vercel: your GitHub repo can auto-deploy to it, matches "GitHub → push → live" workflow already described in your notes.

### Phase 4+: Full platform
```
                 ┌─────────────┐
                 │   Next.js    │  (marketing site + app, or app as
                 │  (frontend)  │   subdomain if you prefer to keep
                 └──────┬───────┘   the current static site untouched)
                        │
        ┌───────────────┼────────────────┐
        │               │                │
  Supabase Auth   Supabase Postgres  Supabase Storage
  (roles: admin,  (students, mentors, (transcripts, CVs,
   mentor,        applications,        passports, letters)
   student)       schools, scholarships,
                  deadlines, notes)
```

## A decision you don't have to make yet: rebuild vs. extend
Two real options exist:
1. **Extend the current repo.** Add `apply.html` as a static page now. When you're ready for Phase 2's backend, add an `/api` folder (Vercel functions work alongside static HTML — no framework migration required to get a working backend).
2. **Migrate to Next.js.** Cleaner long-term (component reuse, built-in routing, easier auth integration), but it's a rewrite of every existing page.

**Recommendation:** Do (1) through Phase 3. Revisit (2) only if you're regularly duplicating markup across HTML pages by then — that's the actual signal a framework migration pays for itself, not a plan made in advance of the pain.

## Data flow for the intake form specifically
```
Student fills apply.html
   ↓
Phase 1: → Formspree → your email
Phase 2: → /api/apply → Supabase `applications` table
   ↓
Mentor reviews (manually today, via a dashboard from Phase 4)
   ↓
Student added to roadmap (Phase 3)
```

## Security notes for when auth is introduced
- Use Supabase Row Level Security so a student can only ever query their own `applications` row — never rely on the frontend alone to hide other students' data.
- Mentor/admin roles stored as a column on a `users` table, checked in RLS policies, not just hidden in the UI.
- File uploads (Phase 6) go to a private Storage bucket with signed URLs, not a public bucket — these are transcripts and passports.
