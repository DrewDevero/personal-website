import { useState, useEffect, useRef, useCallback } from "react";

/* ── Section data ──────────────────────────────────────────── */
const SECTIONS = [
  { id: "hero", label: "Origin" },
  { id: "about", label: "About" },
  { id: "projects", label: "Works" },
  { id: "skills", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

/* ── Social icon SVGs ─────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-5 9h8v2H8v-2zm0 4h8v2H8v-2zm0-8h3v2H8V9z" />
    </svg>
  );
}

/* ── Resume Modal ─────────────────────────────────────────── */
function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const pdfUrl = "/Alston%20Drew%20Devero-Belfon_Resume.pdf";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl h-[85vh] rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl shadow-[0_0_60px_rgba(100,100,255,0.15),0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-2 rounded-full border border-white/25 bg-white/20 backdrop-blur-xl text-white/60 hover:text-white hover:bg-white/30 transition-all duration-300 cursor-pointer"
          aria-label="Close resume"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isMobile ? (
          /* Mobile fallback — PDF iframes don't render on most mobile browsers */
          <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-6">
            <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center">
              <ResumeIcon />
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">Resume</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Alston Drew Devero-Belfon
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 border border-white/10 text-white text-sm font-medium hover:from-blue-500/80 hover:to-purple-500/80 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in New Tab
              </a>
              <a
                href={pdfUrl}
                download
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/25 bg-white/10 text-white/70 text-sm font-medium hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        ) : (
          /* Desktop — full PDF embed */
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title="Resume — Alston Drew Devero-Belfon"
          />
        )}
      </div>
    </div>
  );
}

/* ── Navigation Dot Component ─────────────────────────────── */
function NavDot({
  section,
  index,
  active,
  onClick,
}: {
  section: (typeof SECTIONS)[number];
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 transition-all duration-500 ${
        active ? "scale-110" : "opacity-50 hover:opacity-80"
      }`}
      aria-label={`Navigate to ${section.label}`}
    >
      <span
        className={`block rounded-full transition-all duration-500 ${
          active
            ? "w-3 h-3 bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
            : "w-2 h-2 bg-white/40 group-hover:bg-white/60"
        }`}
      />
      <span
        className={`text-xs font-mono uppercase tracking-[0.25em] transition-all duration-500 ${
          active
            ? "text-white opacity-100 translate-x-0"
            : "text-white/0 -translate-x-2 group-hover:text-white/50 group-hover:translate-x-0"
        }`}
      >
        {section.label}
      </span>
    </button>
  );
}

/* ── W-Axis Indicator ─────────────────────────────────────── */
function WAxisIndicator({ wRotation }: { wRotation: number }) {
  const normalizedW = ((wRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const percent = (normalizedW / (Math.PI * 2)) * 100;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
      <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
        W-Axis
      </span>
      <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-white/30">
        {normalizedW.toFixed(2)}rad
      </span>
    </div>
  );
}

/* ── Dimension Badge ──────────────────────────────────────── */
function DimensionBadge({ activeSection }: { activeSection: number }) {
  const isHero = activeSection === 0;

  return (
    <div
      className={`fixed top-6 left-6 z-30 transition-all duration-700 ${
        isHero
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1.5 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-white/25 bg-white/20 backdrop-blur-xl">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[8px] md:text-[10px] font-mono text-white/70 uppercase tracking-[0.2em] md:tracking-[0.3em]">
          4D Active
        </span>
      </div>
    </div>
  );
}

type ScrollRef = (el: HTMLElement | null) => void;

/* ── Hero Section ─────────────────────────────────────────── */
function HeroSection({ visible, scrollRef, onNavigate }: { visible: boolean; scrollRef: ScrollRef; onNavigate: (index: number) => void }) {
  return (
    <section
      ref={scrollRef}
      className={`absolute inset-0 overflow-y-auto flex flex-col items-center justify-center py-24 transition-all duration-1000 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="text-center max-w-3xl px-6">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-300/40 bg-slate-900/80 backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-white/60 uppercase tracking-[0.25em]">
            Available for Collaboration
          </span>
        </div>

        <h1 className="text-[2.35rem] sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
          <span className="block whitespace-nowrap">Alston Drew</span>
          <span className="block whitespace-nowrap bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Devero-Belfon
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 font-light mb-3 leading-relaxed">
          Full Stack Engineer · AI Researcher · Creative Technologist
        </p>
        <p className="text-base text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
          Classically trained opera singer turned software engineer — I use
          storytelling, voice, physicality, and code to build
          immersive&nbsp;experiences.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => onNavigate(2)}
            className="px-6 py-2.5 rounded-full bg-blue-600/65 border border-sky-300/45 text-white text-base font-medium backdrop-blur-lg hover:bg-blue-500/75 transition-all duration-300 cursor-pointer"
          >
            Explore Works →
          </button>
          <button
            onClick={() => onNavigate(4)}
            className="px-6 py-2.5 rounded-full border border-sky-300/35 bg-slate-900/70 text-white/85 text-base hover:text-white hover:border-sky-200/55 hover:bg-slate-800/85 transition-all duration-300 cursor-pointer"
          >
            Make Contact
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── About Section ────────────────────────────────────────── */
function AboutSection({ visible, scrollRef }: { visible: boolean; scrollRef: ScrollRef }) {
  return (
    <section
      ref={scrollRef}
      className={`absolute inset-0 overflow-y-auto flex flex-col items-center justify-start md:justify-center pt-24 pb-24 transition-all duration-1000 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left — Text */}
        <div className="text-center md:text-left">
          <span className="text-[11px] font-mono text-cyan-400/80 uppercase tracking-[0.3em] mb-4 block">
            ∴ Origin Story
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Where Stage Meets&nbsp;Screen
          </h2>
          <div className="space-y-4 text-white/80 text-base leading-relaxed text-left">
            <p>
              A detail-oriented and collaborative full-stack engineer and
              researcher who uses his background in the{" "}
              <span className="text-white/80">performing arts</span> to bring a
              unique, storytelling-driven approach to technology.
            </p>
            <p>
              Driven by the desire to use technology to create creative, practical
              solutions that improve the daily lives of people. Passionate about
              collaboration, continuous learning, and finding new ways to engage
              others.
            </p>
            <p>
              Years of academic and work experience at non-profit and for-profit
              businesses across{" "}
              <span className="text-white/80">
                product engineering, AI engineering, and research
              </span>{" "}
              — always with a focus on usability and accessibility.
            </p>
          </div>
        </div>

        {/* Right — Identity Card */}
        <div className="relative">
          <div className="rounded-2xl border border-sky-300/40 bg-slate-900/80 backdrop-blur-xl p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  Drew Devero
                </p>
                <p className="text-white/80 text-sm">
                  Creative Technologist
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Logic Mode", value: "Multimodal" },
                { label: "Primary Goal", value: "Accessibility" },
                { label: "UI Philosophy", value: "Immersive" },
                { label: "Arts Background", value: "Opera / Theatre" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg bg-slate-800/80 border border-sky-300/30 p-3"
                >
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-white/90 text-sm font-medium">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10">
              <p className="text-[10px] font-mono text-white/35 uppercase tracking-wider mb-2">
                Achievements
              </p>
              <p className="text-white/85 text-sm leading-relaxed">
                Led team to win{" "}
                <span className="text-amber-400/90">
                  CUNY × Blackstone 2024 Innovation Sprint
                </span>{" "}
                — L'Oréal Biolage concept combining pop-ups with an AI chatbot.
              </p>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-xl -z-10" />
        </div>
      </div>
    </section>
  );
}

/* ── Project Card ──────────────────────────────────────────── */
interface ProjectData {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  link?: string;
  color: string;
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  return (
    <div
      className="group rounded-xl border border-sky-300/40 bg-slate-900/80 backdrop-blur-xl p-5 hover:bg-slate-800/85 hover:border-sky-200/55 transition-all duration-500 cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider"
          style={{
            color: project.color,
            backgroundColor: `${project.color}15`,
            border: `1px solid ${project.color}25`,
          }}
        >
          {project.tag}
        </span>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/70 transition-colors"
            aria-label={`Visit ${project.title}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        )}
      </div>
      <h3 className="text-white text-base font-semibold mb-2 group-hover:text-white">
        {project.title}
      </h3>
      <p className="text-white/80 text-sm leading-relaxed mb-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-sky-300/25 text-white/80 text-xs font-mono"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Projects Section ──────────────────────────────────────── */
const PROJECTS: ProjectData[] = [
  {
    title: "Brand Journey — Mobile Brand Adventure",
    tag: "AI / MarTech",
    description:
      "Interactive storytelling app bridging patron stories with brand identity. Agile Immersion — high-fidelity storytelling without six-month cycles. Reduced visual production from weeks to hours.",
    tech: ["Three.js", "R3F", "OpenAI", "ElevenLabs", "Next.js 16", "Vercel"],
    link: "https://www.brandjourney.app/",
    color: "#f59e0b",
  },
  {
    title: "Birdle — Progressive Web App",
    tag: "Full Stack",
    description:
      "Gamified educational tool for nature enthusiasts. A guessing game utilizing robust backend to manage biological data and user progression.",
    tech: ["Express.js", "PostgreSQL", "PWA"],
    link: "https://www.birdle.fun/",
    color: "#22c55e",
  },
  {
    title: "Shared Studios — Project Noro",
    tag: "Enterprise AI",
    description:
      "Next-gen interactive enterprise products using multi-modal AI. Developing VUI, sensor tech, and GenAI integrations for specialized enterprise workflows.",
    tech: ["VUI", "GenAI", "Sensors", "Enterprise"],
    link: "https://www.noro.co/",
    color: "#a855f7",
  },
  {
    title: "CUNY × Blackstone Innovation Sprint",
    tag: "1st Place Winner",
    description:
      "Led Team Dive to win the 2024 Innovation Sprint with a prototype for L'Oréal's Biolage — pop-ups + integrated AI chatbot with voice user interface.",
    tech: ["AI Chatbot", "VUI", "QR Integration", "Prototype"],
    link: "https://drewdevero.github.io/biolage-chat/",
    color: "#f43f5e",
  },
  {
    title: "Smart Eats — E-Commerce",
    tag: "Web Dev",
    description:
      "E-commerce site with performance boosting, SEO, and security enhancements. Translating design concepts into functional, accessible experiences.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
    link: "https://smarteatspantry.com/",
    color: "#eab308",
  },
  {
    title: "Tri-Sense — AI Accessibility Engine",
    tag: "Computer Vision",
    description:
      "AI-powered hand-motion tracking for Deaf & Hard-of-Hearing communication. Real-time gesture recognition with semantic dictionary mapping and audible pronunciation.",
    tech: ["React", "TensorFlow.js", "MediaPipe", "Spring Boot", "PostgreSQL"],
    link: "https://drewdevero.github.io/Tri-Sense/",
    color: "#06b6d4",
  },
  {
    title: "Three-D Web Research",
    tag: "3D / WebGL",
    description:
      "Experimental environment exploring browser-based 3D rendering limits. Building responsive 3D UI/UX elements inspired by theatrical staging.",
    tech: ["Three.js", "WebGL", "JavaScript"],
    link: "https://github.com/DrewDevero/three-d-website",
    color: "#3b82f6",
  },
  {
    title: "Millennial Mancala",
    tag: "Game Dev",
    description:
      "Digital reimagining of the world's oldest board game. Features AI-Opponent logic with deterministic game state management for local play.",
    tech: ["HTML", "CSS", "JavaScript", "jQuery"],
    link: "https://drewdevero.github.io/Millennial-Mancala",
    color: "#ec4899",
  },
];

function ProjectsSection({ visible, scrollRef }: { visible: boolean; scrollRef: ScrollRef }) {
  return (
    <section
      ref={scrollRef}
      className={`absolute inset-0 overflow-y-auto scrollbar-thin py-24 transition-all duration-1000 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 w-full min-h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <span className="text-[11px] font-mono text-amber-400/80 uppercase tracking-[0.3em] mb-3 block">
            ∴ Selected Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            The Intersection of AI &amp; Interaction
          </h2>
          <p className="text-white/70 text-base">
            Projects spanning accessibility, enterprise AI, 3D rendering, and
            creative technology
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pr-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Skills Section ────────────────────────────────────────── */
const SKILL_CATEGORIES = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "HTML/CSS", "SQL"],
    color: "#3b82f6",
  },
  {
    label: "Frameworks",
    items: [
      "React",
      "React Native",
      "Expo",
      "Three.js",
      "Next.js",
      "Spring Boot",
      "Express.js",
    ],
    color: "#a855f7",
  },
  {
    label: "AI / ML",
    items: [
      "TensorFlow.js",
      "MediaPipe",
      "OpenAI API",
      "GenAI",
      "Data Science",
      "Computer Vision",
    ],
    color: "#06b6d4",
  },
  {
    label: "Tools & Infra",
    items: [
      "PostgreSQL",
      "Git/GitHub",
      "Vercel",
      "Docker",
      "PWA",
      "WordPress",
    ],
    color: "#22c55e",
  },
  {
    label: "Creative",
    items: [
      "3D/WebGL",
      "UI/UX Design",
      "Opera/Theatre",
      "Storytelling",
      "Voice Acting",
      "Accessibility",
    ],
    color: "#f59e0b",
  },
];

function SkillsSection({ visible, scrollRef }: { visible: boolean; scrollRef: ScrollRef }) {
  return (
    <section
      ref={scrollRef}
      className={`absolute inset-0 overflow-y-auto flex flex-col items-center justify-start md:justify-center pt-24 pb-24 transition-all duration-1000 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div className="text-center mb-8">
          <span className="text-[11px] font-mono text-teal-400/80 uppercase tracking-[0.3em] mb-3 block">
            ∴ Technical DNA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Multimodal Stack
          </h2>
          <p className="text-white/70 text-base">
            Syncing voice, vision, and text across the full stack
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="rounded-xl border border-sky-300/40 bg-slate-900/80 backdrop-blur-xl p-5"
            >
              <h3
                className="text-sm font-mono uppercase tracking-[0.2em] mb-4"
                style={{ color: cat.color }}
              >
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-sm text-white/85 border border-sky-300/30 bg-slate-800/80 hover:bg-slate-700/85 hover:text-white transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DNA table */}
        <div className="mt-6 rounded-xl border border-sky-300/40 bg-slate-900/80 backdrop-blur-xl p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 text-center">
            {[
              {
                attr: "Logic Mode",
                value: "Multimodal",
                desc: "Voice · Vision · Text",
              },
              {
                attr: "Primary Goal",
                value: "Accessibility",
                desc: "Reducing barriers through tech",
              },
              {
                attr: "UI Philosophy",
                value: "Immersive",
                desc: "3D · Haptics · Engagement",
              },
            ].map((item) => (
              <div key={item.attr}>
                <p className="text-[10px] font-mono text-white/35 uppercase tracking-wider mb-1">
                  {item.attr}
                </p>
                <p className="text-white text-base font-semibold mb-0.5">
                  {item.value}
                </p>
                <p className="text-white/75 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact Section ───────────────────────────────────────── */
function ContactSection({ visible, scrollRef, onResumeOpen }: { visible: boolean; scrollRef: ScrollRef; onResumeOpen: () => void }) {
  return (
    <section
      ref={scrollRef}
      className={`absolute inset-0 overflow-y-auto flex flex-col items-center justify-start md:justify-center pt-24 pb-24 transition-all duration-1000 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <div className="max-w-lg mx-auto px-6 text-center">
        <span className="text-[11px] font-mono text-purple-400/80 uppercase tracking-[0.3em] mb-4 block">
          ∴ Make Contact
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Let's Create Together
        </h2>
        <p className="text-white/75 text-base mb-8 leading-relaxed">
          Ready for innovative and creative conversation. Whether it's building
          immersive AI experiences, accessible applications, or something
          entirely new — let's connect across dimensions.
        </p>

        {/* Social Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            {
              label: "GitHub",
              href: "https://github.com/DrewDevero",
              icon: <GithubIcon />,
              desc: "30 repos · Open source",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/alston-devero-belfon/",
              icon: <LinkedInIcon />,
              desc: "Professional network",
            },
            {
              label: "X / Twitter",
              href: "https://x.com/DrewDevero",
              icon: <XIcon />,
              desc: "@DrewDevero",
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-sky-300/40 bg-slate-900/80 backdrop-blur-xl p-4 hover:bg-slate-800/85 hover:border-sky-200/55 transition-all duration-300"
            >
              <span className="text-white/50 group-hover:text-white/80 transition-colors">
                {social.icon}
              </span>
              <div className="text-left">
                <p className="text-white text-sm font-medium">{social.label}</p>
                <p className="text-white/75 text-xs">{social.desc}</p>
              </div>
            </a>
          ))}
          {/* Resume button */}
          <button
            onClick={onResumeOpen}
            className="group flex items-center gap-3 rounded-xl border border-sky-300/40 bg-slate-900/80 backdrop-blur-xl p-4 hover:bg-slate-800/85 hover:border-sky-200/55 transition-all duration-300 text-left cursor-pointer"
          >
            <span className="text-white/50 group-hover:text-white/80 transition-colors">
              <ResumeIcon />
            </span>
            <div>
              <p className="text-white text-sm font-medium">Resume</p>
              <p className="text-white/75 text-xs">View PDF</p>
            </div>
          </button>
        </div>

        <a
          href="mailto:deverobelfon@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/85 to-purple-600/85 border border-sky-300/40 text-white text-base font-medium hover:from-blue-500/90 hover:to-purple-500/90 transition-all duration-300 shadow-[0_0_30px_rgba(100,100,255,0.2)]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          Open Communication Channel
        </a>

        <p className="mt-6 text-white/55 text-xs font-mono">
          "I'm excited for our multi-modal collaboration!"
        </p>
      </div>
    </section>
  );
}

/* ── Scroll boundary helper ────────────────────────────────── */
function isAtScrollTop(el: HTMLElement | null) {
  if (!el) return true;
  return el.scrollTop <= 2;
}
function isAtScrollBottom(el: HTMLElement | null) {
  if (!el) return true;
  return el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
}

/* ── Main Portfolio App ───────────────────────────────────── */
export default function PortfolioOverlay({
  activeSection,
  setActiveSection,
  wRotation,
  setWRotation,
}: {
  activeSection: number;
  setActiveSection: (s: number) => void;
  wRotation: number;
  setWRotation: (w: number) => void;
}) {
  const [resumeOpen, setResumeOpen] = useState(false);

  // Refs for each section's scrollable container
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const setSectionRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    },
    []
  );

  const handleNav = useCallback(
    (index: number) => {
      setActiveSection(index);
      setWRotation(index * ((Math.PI * 2) / SECTIONS.length));
      // Reset scroll position of new section to top
      const el = sectionRefs.current[index];
      if (el) el.scrollTop = 0;
    },
    [setActiveSection, setWRotation]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const el = sectionRefs.current[activeSection];
        if (!isAtScrollBottom(el)) return; // let section scroll first
        const next = Math.min(activeSection + 1, SECTIONS.length - 1);
        handleNav(next);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const el = sectionRefs.current[activeSection];
        if (!isAtScrollTop(el)) return; // let section scroll first
        const prev = Math.max(activeSection - 1, 0);
        handleNav(prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeSection, handleNav]);

  // Scroll-wheel section switching — only advances when section is at boundary
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      const el = sectionRefs.current[activeSection];

      if (e.deltaY > 0) {
        // Scrolling down: if section content hasn't reached bottom, let it scroll
        if (!isAtScrollBottom(el)) return;
        if (scrollTimeout.current) return;
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 600);
        const next = Math.min(activeSection + 1, SECTIONS.length - 1);
        if (next !== activeSection) handleNav(next);
      } else {
        // Scrolling up: if section content hasn't reached top, let it scroll
        if (!isAtScrollTop(el)) return;
        if (scrollTimeout.current) return;
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 600);
        const prev = Math.max(activeSection - 1, 0);
        if (prev !== activeSection) handleNav(prev);
      }
    };
    window.addEventListener("wheel", handler, { passive: true });
    return () => window.removeEventListener("wheel", handler);
  }, [activeSection, handleNav]);

  // Touch swipe section switching — respects scroll boundaries
  const touchStartY = useRef<number>(0);
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return; // ignore small swipes

      const el = sectionRefs.current[activeSection];
      if (deltaY > 0) {
        // Swipe up (advance)
        if (!isAtScrollBottom(el)) return;
        const next = Math.min(activeSection + 1, SECTIONS.length - 1);
        if (next !== activeSection) handleNav(next);
      } else {
        // Swipe down (go back)
        if (!isAtScrollTop(el)) return;
        const prev = Math.max(activeSection - 1, 0);
        if (prev !== activeSection) handleNav(prev);
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeSection, handleNav]);

  return (
    <div className="fixed inset-0 z-10 overflow-hidden">
      {/* Background overlay gradient — reduced for transparency */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/70 pointer-events-none z-0" />

      {/* Content sections */}
      <div className="relative z-10 w-full h-full">
        <HeroSection visible={activeSection === 0} scrollRef={setSectionRef(0)} onNavigate={handleNav} />
        <AboutSection visible={activeSection === 1} scrollRef={setSectionRef(1)} />
        <ProjectsSection visible={activeSection === 2} scrollRef={setSectionRef(2)} />
        <SkillsSection visible={activeSection === 3} scrollRef={setSectionRef(3)} />
        <ContactSection visible={activeSection === 4} scrollRef={setSectionRef(4)} onResumeOpen={() => setResumeOpen(true)} />
      </div>

      {/* Desktop: side nav dots (vertical, right side). Hidden on mobile. */}
      <nav className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-4">
        {SECTIONS.map((section, i) => (
          <NavDot
            key={section.id}
            section={section}
            index={i}
            active={activeSection === i}
            onClick={() => handleNav(i)}
          />
        ))}
      </nav>

      {/* Mobile: single active-section dot in top-left, hidden on hero (index 0) */}
      <div className="md:hidden fixed top-6 left-4 z-30">
        {SECTIONS.map((section, i) => (
          <div
            key={section.id}
            className={`absolute top-0 left-0 flex items-center gap-2 transition-all duration-500 ${
              activeSection === i && i !== 0
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <button
              onClick={() => handleNav(i)}
              className="flex items-center gap-2"
              aria-label={`Current section: ${section.label}`}
            >
              <span className="block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
              <span className="text-[10px] font-mono text-white/80 uppercase tracking-[0.2em]">
                {section.label}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Dimension badge — visible only on hero */}
      <DimensionBadge activeSection={activeSection} />

      {/* W-axis indicator */}
      <WAxisIndicator wRotation={wRotation} />

      {/* Social quick links — top right, smaller on mobile */}
      <div className="fixed top-6 right-6 z-30 flex items-center gap-1.5 md:gap-2">
        {[
          { href: "https://github.com/DrewDevero", icon: <GithubIcon /> },
          {
            href: "https://www.linkedin.com/in/alston-devero-belfon/",
            icon: <LinkedInIcon />,
          },
          { href: "https://x.com/DrewDevero", icon: <XIcon /> },
        ].map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 md:p-2 rounded-full border border-sky-300/40 bg-slate-900/80 text-white/75 backdrop-blur-xl hover:text-white hover:bg-slate-800/85 transition-all duration-300 [&_svg]:w-4 [&_svg]:h-4 md:[&_svg]:w-5 md:[&_svg]:h-5"
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Resume modal — rendered at root level to sit above all z-index layers */}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
