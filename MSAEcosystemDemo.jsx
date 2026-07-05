import React, { useState, useEffect } from 'react';
import {
  Home, FileText, LayoutDashboard, Bot, Menu, X, GraduationCap,
  Upload, Award, ChevronRight, ChevronLeft, CheckCircle2, Circle,
  Users, Clock, Send, ArrowRight, Wifi, BatteryFull, SignalHigh,
  Calendar, MapPin, DollarSign, FileCheck, Sparkles
} from 'lucide-react';

const NAVY = '#050B2E';
const NAVY_DEEP = '#03071A';
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#E6C666';
const TEAL = '#2E8368';
const CREAM = '#F1EFEA';
const INK_SOFT = '#A9AEC4';
const PANEL = 'rgba(255,255,255,0.05)';
const LINE = 'rgba(255,255,255,0.14)';

const roadmapSteps = [
  'Intake Form', 'Profile Review', 'School Shortlist', 'Scholarship Shortlist',
  'CV', 'Statement of Purpose', 'Applications', 'Admissions',
  'Funding', 'Visa', 'Pre-departure', 'Arrival Support'
];

const students = [
  {
    id: 'deborah', name: 'Deborah Obot', initials: 'DO',
    program: 'Occupational Health, Safety & Wellness', school: 'Conestoga College',
    country: 'Canada', progressStep: 4,
    nextDeadline: { task: 'Pay $2,500 deposit', due: '23 Jul 2026' },
    status: 'In Progress', budget: '$20,835.50 CAD (Yr 1)', funding: 'Loan (under review)'
  },
  {
    id: 'caleb', name: 'Caleb Ofonime', initials: 'CO',
    program: 'Computer Science — Graduate Study', school: 'Shortlisting in progress',
    country: 'Canada / UK / USA', progressStep: 1,
    nextDeadline: { task: 'Finalize school shortlist', due: 'This week' },
    status: 'In Progress', budget: 'To be confirmed', funding: 'Self + Family'
  }
];

const scholarships = [
  { name: 'Conestoga Entrance Award', student: 'Deborah', amount: 'Varies', deadline: 'TBD', status: 'Researching' },
  { name: 'Ontario Graduate Scholarship', student: 'Deborah', amount: 'CAD $15,000', deadline: 'Sep 2026', status: 'Not Started' },
  { name: 'Merit-Based Award', student: 'Caleb', amount: 'Varies', deadline: 'TBD', status: 'Not Started' },
  { name: 'Graduate Assistantship', student: 'Caleb', amount: 'Tuition + Stipend', deadline: 'Rolling', status: 'Researching' }
];

const documents = [
  { type: 'Academic Transcript', student: 'Caleb', status: 'Uploaded' },
  { type: 'CV / Resume', student: 'Caleb', status: 'Missing' },
  { type: 'Admission Letter', student: 'Deborah', status: 'Uploaded' },
  { type: 'Passport Bio Page', student: 'Deborah', status: 'Missing' },
  { type: 'Statement of Purpose', student: 'Caleb', status: 'Missing' },
  { type: 'Degree Certificate', student: 'Caleb', status: 'Uploaded' }
];

const advisorSuggestions = [
  'Which Canadian schools fit my GPA?',
  'What scholarships match my profile?',
  'Help me improve my SOP opening line'
];

const advisorAnswers = {
  'Which Canadian schools fit my GPA?': "With a Second Class Lower CGPA, Ontario college graduate certificates (like Conestoga) are strong, realistic fits — they weigh recent coursework and career direction heavily. For university master's programs, look at ones that state holistic review rather than a strict CGPA cutoff.",
  'What scholarships match my profile?': "Based on your profile, I'd start with institutional entrance awards (often automatic on admission) and graduate assistantships, which don't require a separate application in many cases. I'll flag application-required ones with deadlines on your Scholarships tab.",
  'Help me improve my SOP opening line': "Open with the specific moment that pointed you toward this field, not a general statement about passion. A concrete story is more memorable to an admissions reader than \"I have always been passionate about...\""
};

function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById('msa-demo-fonts')) return;
    const link = document.createElement('link');
    link.id = 'msa-demo-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap';
    document.head.appendChild(link);
  }, []);
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs" style={{ color: CREAM }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>9:41</span>
      <div className="flex items-center gap-1.5">
        <SignalHigh size={14} />
        <Wifi size={14} />
        <BatteryFull size={16} />
      </div>
    </div>
  );
}

function TopHeader({ title, onBack }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-2 pb-4" style={{ borderBottom: `1px solid ${LINE}` }}>
      {onBack && (
        <button onClick={onBack} className="p-1 -ml-1" style={{ color: CREAM }}>
          <ChevronLeft size={22} />
        </button>
      )}
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: CREAM }}>{title}</h1>
    </div>
  );
}

function Badge({ children, tone = 'gold' }) {
  const tones = {
    gold: { bg: 'rgba(212,175,55,0.14)', color: GOLD_LIGHT, border: 'rgba(212,175,55,0.4)' },
    teal: { bg: 'rgba(46,131,104,0.18)', color: '#8fe0c4', border: 'rgba(46,131,104,0.5)' },
    grey: { bg: 'rgba(255,255,255,0.06)', color: INK_SOFT, border: LINE }
  };
  const t = tones[tone];
  return (
    <span
      className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full"
      style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}`, fontFamily: "'DM Sans', sans-serif" }}
    >
      {children}
    </span>
  );
}

function HomeScreen({ goTo }) {
  const phases = [
    { icon: FileText, label: 'Mentorship Landing' },
    { icon: FileCheck, label: 'Application Form' },
    { icon: LayoutDashboard, label: 'Student Dashboard' },
    { icon: Users, label: 'Mentor Dashboard' },
    { icon: Upload, label: 'Document Uploads' },
    { icon: Award, label: 'Scholarship Mgmt' },
    { icon: Bot, label: 'AI Advisor' }
  ];
  return (
    <div className="px-5 pb-6 overflow-y-auto h-full">
      <div className="pt-4 pb-6 text-center">
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ border: `2px solid ${GOLD}`, boxShadow: `0 0 0 4px rgba(212,175,55,0.12)` }}
        >
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", color: GOLD, fontSize: 20, letterSpacing: 1 }}>MSA</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: GOLD, fontSize: 11, letterSpacing: 2 }} className="uppercase mb-2">
          Global Admissions &amp; Scholarship Mentorship
        </p>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 24, lineHeight: 1.25 }}>
          Start your international journey with confidence.
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 13, marginTop: 10, lineHeight: 1.55 }}>
          We Train. We Certify. We Place. We Migrate.
        </p>
      </div>

      <button
        onClick={() => goTo('apply')}
        className="w-full py-3.5 rounded-lg font-bold mb-8 flex items-center justify-center gap-2"
        style={{ background: GOLD, color: NAVY_DEEP, fontFamily: "'DM Sans', sans-serif" }}
      >
        Apply for Mentorship <ArrowRight size={16} />
      </button>

      <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11, letterSpacing: 1 }} className="uppercase mb-3">
        Ecosystem preview — 7 phases
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {phases.map((p, i) => (
          <button
            key={i}
            onClick={() => goTo(['apply','apply','dashboard','mentor','docs','scholarships','advisor'][i])}
            className="flex flex-col items-start gap-2 p-3.5 rounded-lg text-left"
            style={{ background: PANEL, border: `1px solid ${LINE}` }}
          >
            <p.icon size={18} color={GOLD_LIGHT} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
              {p.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ApplyScreen({ goTo }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', email: '', country: '', goal: '' });
  const [done, setDone] = useState(false);
  const totalSteps = 3;

  const update = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  if (done) {
    return (
      <div className="px-5 pt-16 pb-6 text-center h-full flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(46,131,104,0.18)' }}>
          <CheckCircle2 size={28} color="#8fe0c4" />
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 19 }} className="mb-2">
          Application received
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 13, lineHeight: 1.6 }} className="mb-8 max-w-[240px]">
          {data.name || 'Your'} mentor will review this and reach out within 48 hours.
        </p>
        <button
          onClick={() => goTo('home')}
          className="py-3 px-6 rounded-lg font-bold"
          style={{ background: GOLD, color: NAVY_DEEP, fontFamily: "'DM Sans', sans-serif" }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pb-6 h-full flex flex-col">
      <div className="flex gap-1.5 mb-6 mt-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? GOLD : LINE }} />
        ))}
      </div>

      {step === 0 && (
        <div className="flex-1">
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: GOLD, fontSize: 11, letterSpacing: 1.5 }} className="uppercase mb-2">Step 1 of 3</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 20 }} className="mb-6">Tell us about you</h2>
          <label style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 12 }} className="block mb-1.5">Full name</label>
          <input
            value={data.name} onChange={e => update('name', e.target.value)}
            className="w-full p-3 rounded-lg mb-4 outline-none"
            style={{ background: PANEL, border: `1.5px solid ${LINE}`, color: CREAM, fontFamily: "'DM Sans', sans-serif" }}
            placeholder="e.g. Deborah Obot"
          />
          <label style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 12 }} className="block mb-1.5">Email address</label>
          <input
            value={data.email} onChange={e => update('email', e.target.value)}
            className="w-full p-3 rounded-lg outline-none"
            style={{ background: PANEL, border: `1.5px solid ${LINE}`, color: CREAM, fontFamily: "'DM Sans', sans-serif" }}
            placeholder="you@example.com"
          />
        </div>
      )}

      {step === 1 && (
        <div className="flex-1">
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: GOLD, fontSize: 11, letterSpacing: 1.5 }} className="uppercase mb-2">Step 2 of 3</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 20 }} className="mb-6">Where to?</h2>
          <div className="grid grid-cols-2 gap-2">
            {['Canada', 'United Kingdom', 'United States', 'Ireland', 'Germany', 'Other'].map(c => (
              <button
                key={c}
                onClick={() => update('country', c)}
                className="p-3 rounded-lg text-left text-sm"
                style={{
                  background: data.country === c ? GOLD : PANEL,
                  color: data.country === c ? NAVY_DEEP : CREAM,
                  border: `1.5px solid ${data.country === c ? GOLD : LINE}`,
                  fontFamily: "'DM Sans', sans-serif", fontWeight: data.country === c ? 700 : 500
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1">
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: GOLD, fontSize: 11, letterSpacing: 1.5 }} className="uppercase mb-2">Step 3 of 3</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 20 }} className="mb-6">Your career goal</h2>
          <textarea
            value={data.goal} onChange={e => update('goal', e.target.value)}
            rows={5}
            className="w-full p-3 rounded-lg outline-none"
            style={{ background: PANEL, border: `1.5px solid ${LINE}`, color: CREAM, fontFamily: "'DM Sans', sans-serif" }}
            placeholder="What do you want to study, and why?"
          />
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="flex-1 py-3 rounded-lg font-semibold"
            style={{ background: 'transparent', border: `1.5px solid ${LINE}`, color: CREAM, fontFamily: "'DM Sans', sans-serif" }}
          >
            Back
          </button>
        )}
        <button
          onClick={() => step < totalSteps - 1 ? setStep(s => s + 1) : setDone(true)}
          className="flex-1 py-3 rounded-lg font-bold"
          style={{ background: GOLD, color: NAVY_DEEP, fontFamily: "'DM Sans', sans-serif" }}
        >
          {step < totalSteps - 1 ? 'Continue' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

function ProgressRing({ step }) {
  const pct = Math.round((step / roadmapSteps.length) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg width="48" height="48" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="24" cy="24" r="20" stroke={LINE} strokeWidth="4" fill="none" />
          <circle
            cx="24" cy="24" r="20" stroke={GOLD} strokeWidth="4" fill="none"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={2 * Math.PI * 20 * (1 - pct / 100)}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute" style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 11, fontWeight: 700 }}>{pct}%</span>
      </div>
      <div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 13, fontWeight: 600 }}>Step {step} of {roadmapSteps.length}</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11.5 }}>{roadmapSteps[step - 1]}</p>
      </div>
    </div>
  );
}

function StudentDashboard({ goTo }) {
  const student = students[0];
  return (
    <div className="px-5 pb-6 overflow-y-auto h-full">
      <div className="mb-5 mt-1">
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 12.5 }}>Welcome back,</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 20 }}>{student.name.split(' ')[0]}</h2>
      </div>

      <div className="p-4 rounded-xl mb-4" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
        <ProgressRing step={student.progressStep} />
      </div>

      <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(212,175,55,0.08)', border: `1px solid rgba(212,175,55,0.3)` }}>
        <div className="flex items-center gap-2 mb-1.5">
          <Clock size={14} color={GOLD_LIGHT} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", color: GOLD_LIGHT, fontSize: 11, fontWeight: 700 }} className="uppercase">Next Deadline</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 14, fontWeight: 600 }}>{student.nextDeadline.task}</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 12.5 }}>Due {student.nextDeadline.due}</p>
      </div>

      <div className="p-4 rounded-xl mb-5" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={14} color={GOLD_LIGHT} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 13, fontWeight: 600 }}>{student.school}</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 12 }}>{student.program} · {student.country}</p>
      </div>

      <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11, letterSpacing: 1 }} className="uppercase mb-2.5">Your roadmap</p>
      <div className="space-y-2">
        {roadmapSteps.map((s, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < student.progressStep;
          const isActive = stepNum === student.progressStep;
          return (
            <div key={s} className="flex items-center gap-3 p-2.5 rounded-lg" style={{ background: isActive ? 'rgba(212,175,55,0.08)' : 'transparent' }}>
              {isDone ? <CheckCircle2 size={17} color={TEAL} /> : <Circle size={17} color={isActive ? GOLD : INK_SOFT} />}
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: isDone ? INK_SOFT : CREAM, fontSize: 13, textDecoration: isDone ? 'line-through' : 'none' }}>
                {s}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MentorDashboard({ goTo }) {
  const [selected, setSelected] = useState(null);
  if (selected) {
    const s = students.find(x => x.id === selected);
    return (
      <div className="px-5 pb-6 overflow-y-auto h-full">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1 mb-4" style={{ color: GOLD_LIGHT, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
          <ChevronLeft size={16} /> All students
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: GOLD, color: NAVY_DEEP, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13 }}>
            {s.initials}
          </div>
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 17 }}>{s.name}</h2>
            <Badge tone="gold">{s.status}</Badge>
          </div>
        </div>
        {[
          { icon: GraduationCap, label: 'Program', value: `${s.program} — ${s.school}` },
          { icon: MapPin, label: 'Destination', value: s.country },
          { icon: DollarSign, label: 'Budget & Funding', value: `${s.budget} · ${s.funding}` },
          { icon: Clock, label: 'Next Deadline', value: `${s.nextDeadline.task} — ${s.nextDeadline.due}` }
        ].map((row, i) => (
          <div key={i} className="p-3.5 rounded-lg mb-2.5 flex items-start gap-3" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
            <row.icon size={16} color={GOLD_LIGHT} className="mt-0.5" />
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 10.5 }} className="uppercase mb-0.5">{row.label}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 13 }}>{row.value}</p>
            </div>
          </div>
        ))}
        <div className="p-3.5 rounded-lg" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 10.5 }} className="uppercase mb-2">Roadmap progress</p>
          <ProgressRing step={s.progressStep} />
        </div>
      </div>
    );
  }
  return (
    <div className="px-5 pb-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-1 mt-1">
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 19 }}>Your Students</h2>
        <Badge tone="grey">{students.length} active</Badge>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 12.5 }} className="mb-5">Tap a student for their full profile</p>
      <div className="space-y-3">
        {students.map(s => (
          <button
            key={s.id} onClick={() => setSelected(s.id)}
            className="w-full p-4 rounded-xl text-left flex items-center gap-3"
            style={{ background: PANEL, border: `1px solid ${LINE}` }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: GOLD, color: NAVY_DEEP, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12 }}>
              {s.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 14, fontWeight: 600 }}>{s.name}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11.5 }} className="truncate">{s.country} · {s.nextDeadline.task}</p>
            </div>
            <ChevronRight size={16} color={INK_SOFT} />
          </button>
        ))}
      </div>
    </div>
  );
}

function DocsScreen() {
  return (
    <div className="px-5 pb-6 overflow-y-auto h-full">
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 19 }} className="mb-1 mt-1">Documents</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 12.5 }} className="mb-5">Across both students</p>

      <div className="p-6 rounded-xl mb-5 flex flex-col items-center text-center" style={{ border: `1.5px dashed ${LINE}`, background: PANEL }}>
        <Upload size={22} color={GOLD_LIGHT} className="mb-2" />
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 13, fontWeight: 600 }}>Tap to upload a document</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11 }} className="mt-1">Demo only — no file is actually stored</p>
      </div>

      <div className="space-y-2.5">
        {documents.map((d, i) => (
          <div key={i} className="p-3.5 rounded-lg flex items-center gap-3" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
            <FileText size={16} color={INK_SOFT} />
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 13, fontWeight: 500 }}>{d.type}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11 }}>{d.student}</p>
            </div>
            <Badge tone={d.status === 'Uploaded' ? 'teal' : 'grey'}>{d.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScholarshipsScreen() {
  return (
    <div className="px-5 pb-6 overflow-y-auto h-full">
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 19 }} className="mb-1 mt-1">Scholarships</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 12.5 }} className="mb-5">Shortlist across both students</p>
      <div className="space-y-2.5">
        {scholarships.map((s, i) => (
          <div key={i} className="p-3.5 rounded-lg" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
            <div className="flex items-start justify-between mb-1.5">
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 13.5, fontWeight: 600 }} className="pr-2">{s.name}</p>
              <Badge tone={s.status === 'Researching' ? 'gold' : 'grey'}>{s.status}</Badge>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11.5 }}>{s.student}</span>
              <span className="flex items-center gap-1" style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11.5 }}>
                <DollarSign size={11} /> {s.amount}
              </span>
              <span className="flex items-center gap-1" style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11.5 }}>
                <Calendar size={11} /> {s.deadline}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdvisorScreen() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm the MSA AI Admission Advisor demo. Try one of the questions below." }
  ]);
  const [input, setInput] = useState('');

  const send = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setTimeout(() => {
      const answer = advisorAnswers[text] || "That's a great question for your human mentor to dig into with you directly — this demo only has canned answers for the three suggestions below.";
      setMessages(prev => [...prev, { from: 'bot', text: answer }]);
    }, 500);
    setInput('');
  };

  return (
    <div className="px-5 pb-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mt-1 mb-4">
        <Sparkles size={16} color={GOLD_LIGHT} />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 17 }}>AI Admission Advisor</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[85%] p-3 rounded-xl text-[13px]"
              style={{
                background: m.from === 'user' ? GOLD : PANEL,
                color: m.from === 'user' ? NAVY_DEEP : CREAM,
                border: m.from === 'user' ? 'none' : `1px solid ${LINE}`,
                fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {advisorSuggestions.map((q, i) => (
          <button
            key={i} onClick={() => send(q)}
            className="text-[11px] px-2.5 py-1.5 rounded-full"
            style={{ background: 'rgba(212,175,55,0.1)', border: `1px solid rgba(212,175,55,0.35)`, color: GOLD_LIGHT, fontFamily: "'DM Sans', sans-serif" }}
          >
            {q}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask a question..."
          className="flex-1 p-2.5 rounded-lg outline-none text-[13px]"
          style={{ background: PANEL, border: `1.5px solid ${LINE}`, color: CREAM, fontFamily: "'DM Sans', sans-serif" }}
        />
        <button onClick={() => send(input)} className="p-2.5 rounded-lg" style={{ background: GOLD }}>
          <Send size={16} color={NAVY_DEEP} />
        </button>
      </div>
    </div>
  );
}

function MoreScreen({ goTo }) {
  const items = [
    { icon: Users, label: 'Mentor Dashboard', screen: 'mentor', desc: 'Phase 4 — student list & profiles' },
    { icon: Upload, label: 'Document Uploads', screen: 'docs', desc: 'Phase 5 — transcripts, CVs, passports' },
    { icon: Award, label: 'Scholarship Management', screen: 'scholarships', desc: 'Phase 6 — shortlist & deadlines' }
  ];
  return (
    <div className="px-5 pb-6 overflow-y-auto h-full">
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: CREAM, fontSize: 19 }} className="mb-5 mt-1">More</h2>
      <div className="space-y-2.5">
        {items.map((it, i) => (
          <button
            key={i} onClick={() => goTo(it.screen)}
            className="w-full p-4 rounded-xl text-left flex items-center gap-3"
            style={{ background: PANEL, border: `1px solid ${LINE}` }}
          >
            <it.icon size={19} color={GOLD_LIGHT} />
            <div className="flex-1">
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: CREAM, fontSize: 14, fontWeight: 600 }}>{it.label}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: INK_SOFT, fontSize: 11.5 }}>{it.desc}</p>
            </div>
            <ChevronRight size={16} color={INK_SOFT} />
          </button>
        ))}
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { key: 'home', icon: Home, label: 'Home' },
  { key: 'apply', icon: FileCheck, label: 'Apply' },
  { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { key: 'advisor', icon: Bot, label: 'Advisor' },
  { key: 'more', icon: Menu, label: 'More' }
];

export default function MSAEcosystemDemo() {
  useGoogleFonts();
  const [screen, setScreen] = useState('home');

  const titles = {
    home: null, apply: 'Mentorship Application', dashboard: 'My Roadmap',
    mentor: 'Mentor Dashboard', docs: 'Documents', scholarships: 'Scholarships', advisor: null, more: null
  };

  const showBack = ['mentor', 'docs', 'scholarships'].includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen goTo={setScreen} />;
      case 'apply': return <ApplyScreen goTo={setScreen} />;
      case 'dashboard': return <StudentDashboard goTo={setScreen} />;
      case 'mentor': return <MentorDashboard goTo={setScreen} />;
      case 'docs': return <DocsScreen />;
      case 'scholarships': return <ScholarshipsScreen />;
      case 'advisor': return <AdvisorScreen />;
      case 'more': return <MoreScreen goTo={setScreen} />;
      default: return <HomeScreen goTo={setScreen} />;
    }
  };

  const activeTab = ['mentor', 'docs', 'scholarships'].includes(screen) ? 'more' : screen;

  return (
    <div className="w-full h-full flex items-center justify-center py-4" style={{ background: '#e5e5e5', minHeight: 780 }}>
      <div
        className="w-full max-w-sm flex flex-col overflow-hidden relative"
        style={{
          background: NAVY, borderRadius: '2.25rem', border: `8px solid ${NAVY_DEEP}`,
          height: 760, boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        }}
      >
        <StatusBar />
        {titles[screen] && <TopHeader title={titles[screen]} onBack={showBack ? () => setScreen('more') : null} />}
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>
        <div className="flex items-stretch" style={{ borderTop: `1px solid ${LINE}`, background: NAVY_DEEP }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => setScreen(item.key)}
              className="flex-1 flex flex-col items-center gap-1 py-2.5"
            >
              <item.icon size={19} color={activeTab === item.key ? GOLD : INK_SOFT} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, color: activeTab === item.key ? GOLD : INK_SOFT, fontWeight: activeTab === item.key ? 700 : 500 }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <div className="flex justify-center pb-1.5 pt-1" style={{ background: NAVY_DEEP }}>
          <div className="w-28 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
        </div>
      </div>
    </div>
  );
}
