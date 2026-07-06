# VISION.md — More Success Academy: The Ecosystem

**Status: North Star document. Aspirational and directional — not a build schedule. See `PRODUCT_ROADMAP.md` for what's actually being built next.**

## The full vision, as it stands today
> Learn → Build Skills → Get Certified → Find a Mentor → Conduct Research → Launch a Career → Get Placed → Build a Startup → Access Global Opportunities.

**Slogan:** *We Train. We Certify. We Place. We Migrate.*

MSA positioned as an AI-powered education and career operating system for Africa, spanning:

1. Agentic AI-Powered Learning Management System (LMS)
2. Personal AI Tutor
3. Career Roadmap (secondary school → university → graduate → professional)
4. Graduate Mentorship Tracker ← **this is what's actually built and running today**
5. Scholarship Discovery & Application Guidance ← **partially built (loan/funding due-diligence, shortlist tables)**
6. University Admissions (Nigeria + international) ← **partially built (Deborah's tracker, intake form)**
7. Research Collaboration (supervisors, publications)
8. Professional Certifications (AI, cybersecurity, data, cloud, PM, digital skills)
9. Job Placement & Internships
10. Migration & Global Opportunities ← **partially built (visa/PAL milestones in tracker)**
11. Women & Youth Empowerment
12. Entrepreneurship & Startup Incubation
13. AI Agents (learning, mentoring, admissions, research, career coaching)
14. Community & Networking (mentors, employers, investors, learners)
15. Research & Innovation (Research Scholar Network, PhD Supervisor Matching, Publication Support, AI Research Labs, Innovation Challenges, Grant & Fellowship Matching)

## Problem Statement
Many talented African students struggle to study abroad because they lack: trusted guidance, scholarship information, university selection support, application tracking, document organization, accountability, mentorship, and affordable professional support. MSA addresses these gaps through mentorship first, with technology and AI extending that reach over time.

## Mission
To empower African students with access to global education and career opportunities through mentorship, AI, and technology — proven one student at a time before it's automated at scale.

## User Roles & Permissions
| Role | Sees | Can do |
|---|---|---|
| **Student** | Own profile, own documents, own applications, own roadmap | Submit intake form, upload own documents, message mentor, view own deadlines |
| **Mentor** | Assigned students only | Review applications, score/assess candidates, leave notes, update roadmap status, manage shortlist |
| **Admin** | Everything | Full access — today this is just you; formalize this table when a second mentor joins |

This maps directly to the Row Level Security policies in `DATABASE_SCHEMA.md` — a student's Supabase auth ID should only ever unlock their own rows, never another student's.

## Countries Supported (current + target)
**Active today:** Canada (Deborah, Conestoga College).
**Being evaluated:** United Kingdom, United States, Ireland, Germany (Caleb's shortlist in progress).
**Future expansion, as demand emerges:** Australia, Netherlands, Sweden, Finland, Norway, Denmark, France, Japan, South Korea, Singapore, UAE.
Treat the second list as a watchlist, not a commitment — add a country to "active" only once a real student is pursuing it, the same way Canada became real through Deborah rather than being planned in the abstract first.

## Student Journey (end-to-end)
```
Visitor
  → Discovers MSA
  → Completes Intake Form
  → Profile Review (mentor)
  → School Shortlist
  → Scholarship Shortlist
  → CV + Statement of Purpose
  → Applications Submitted
  → Admission Received
  → Funding secured (savings / sponsor / loan / scholarship)
  → Visa Application
  → Pre-departure prep
  → Arrival
  → (long-term) Returns as a mentor — the cycle repeats
```
This is the same shape as the 12-step roadmap already in `DATABASE_SCHEMA.md`'s `roadmap_steps` table — one student journey, described twice for two audiences (this doc for people, the schema for the database), not two different journeys.



**The narrative is genuinely strong.** "Learn → Certify → Mentor → Research → Career → Placement → Startup → Global" is a coherent lifecycle, and the slogan compresses it well. This is a legitimate positioning for pitch decks, partnership conversations, or a future grant/fellowship application — it explains *why* MSA exists in one sentence, and that's worth having written down. Keep this document for exactly that purpose.

**The risk is treating this as a build plan instead of a compass.** Fifteen pillars is, realistically, fifteen separate products — an LMS with an adaptive AI tutor is its own multi-year build; a research-supervisor-matching network is a different one again; a job placement pipeline requires employer relationships that don't yet exist. Right now, MSA's actual, running, proof-of-concept system is one pillar: graduate mentorship (with slices of scholarship discovery, admissions, and migration inside it) — for two students, on a spreadsheet and one HTML form that hasn't gone live yet.

That's not a criticism of the vision — it's the normal gap between a founder's five-year picture and week-one execution, and naming the full picture now is useful. But two things are true at once:
- The vision document should stay this big and this ambitious. Don't shrink it to make it feel more "achievable" — it's meant to be read by people (funders, university partners, future team members) who need to see where this is going.
- The `PRODUCT_ROADMAP.md` should stay deliberately narrow. It currently only covers pillar 4 (Graduate Mentorship), because that's the one with real students, real deadlines, and a real deliverable due in days (Deborah's deposit). Adding LMS/AI Tutor/Certifications/Placement/Incubation into that roadmap now would mean none of them get built well, and the one thing that's actually urgent — Deborah and Caleb's mentorship — gets diluted.

## Suggested way to hold both
- `docs/VISION.md` (this file) — the full ecosystem, updated whenever the thinking evolves. Read by: you, future co-founders, partners, funders.
- `docs/PRODUCT_ROADMAP.md` — strictly the next 2–3 months of what's actually being built. Read by: you, whoever writes the code (Copilot/Cursor/Claude).
- When a new pillar is ready to move from "vision" to "roadmap" (e.g., once mentorship is running smoothly with 10+ students and scholarship-discovery tooling is the next bottleneck), promote it: write it its own section in the roadmap with the same level of concrete detail the mentorship pillar has now (see `DATABASE_SCHEMA.md` as the template for that level of specificity).

## On adding "Research & Innovation" as an official pillar
This one fits particularly naturally, given your own research-scholar and fellowship background — it's differentiated (few platforms in this space do supervisor-matching or grant/fellowship discovery well) and it's credible coming from you specifically. Worth keeping in the vision doc. Not worth building yet — same reasoning as above: it needs its own roadmap and its own first real student/researcher pair before it's more than an idea, the same way Graduate Mentorship needed Deborah and Caleb before it became a real system.
