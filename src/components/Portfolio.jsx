/**
 * Portfolio.jsx — FIXED VERSION
 * ─────────────────────────────────────────────────────────────
 * Root cause of broken UI: the original file used Tailwind CSS
 * utility classes (bg-slate-900, text-white, flex, grid, etc.)
 * but Tailwind was NOT installed/configured in the project.
 *
 * Fix: every style is now written as a plain inline style object.
 * Zero external CSS dependency — drop this file anywhere and it works.
 *
 * Dependencies: framer-motion   (npm install framer-motion)
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const T = {
  bg:           "#050d1a",
  bgCard:       "rgba(15,23,42,0.75)",
  bgCardSolid:  "#0f172a",
  border:       "rgba(51,65,85,0.6)",
  borderHover:  "rgba(100,116,139,0.8)",
  cyan:         "#22d3ee",
  violet:       "#8b5cf6",
  pink:         "#f472b6",
  emerald:      "#34d399",
  white:        "#f1f5f9",
  slate200:     "#e2e8f0",
  slate300:     "#cbd5e1",
  slate400:     "#94a3b8",
  slate500:     "#64748b",
  slate800:     "#1e293b",
  slate900:     "#0f172a",
};

/* ─── DATA ───────────────────────────────────────────────────── */
const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const SKILLS = [
  { name: "HTML",       level: 80, icon: "🌐" },
  { name: "CSS",        level: 80, icon: "🎨" },
  { name: "JavaScript", level: 80, icon: "⚡" },
  { name: "Angular",    level: 80, icon: "🔺" },
  { name: "React.js",   level: 60, icon: "⚛️"  },
  { name: "Ionic",      level: 80, icon: "📱" },
  { name: "Cordova",    level: 80, icon: "🔌" },
  { name: "Node.js",    level: 40, icon: "🟢" },
  { name: "MySQL",      level: 60, icon: "🗄️"  },
  { name: "Git",        level: 80, icon: "🔀" },
  { name: "PHP",        level: 20, icon: "🐘" },
  { name: "TypeScript", level: 75, icon: "🔷" },
];

const EXPERIENCES = [
  {
    company: "Qualcom AI",
    role: "Senior Software Developer",
    period: "July 2024 – Present",
    color: "#00f5a0",
    desc: "Developing Angular UIs with REST API integration for AI-powered regulatory medical document automation. Building reusable component libraries, optimizing bundle performance, and delivering pixel-perfect implementations.",
  },
  {
    company: "Netflow Pharma Solutions",
    role: "UI Developer",
    period: "May 2024 – June 2024",
    color: "#00d2ff",
    desc: "Developed user interfaces with REST API integration using Angular, contributing to seamless project execution in a pharma tech environment.",
  },
  {
    company: "Devine Techno Solutions",
    role: "Technical Lead",
    period: "Nov 2019 – Mar 2024",
    color: "#a78bfa",
    desc: "Led cross-functional teams, gathered requirements from stakeholders, managed project milestones and budgets. Built responsive interfaces using Angular and React.js with REST API integration.",
  },
  {
    company: "W3 Global Designing",
    role: "Senior Software Developer",
    period: "Dec 2018 – Nov 2019",
    color: "#f472b6",
    desc: "Hybrid mobile app developer using the Ionic framework with expertise in app maintenance, support, and project execution.",
  },
  {
    company: "Meeshno Retail India Pvt Ltd",
    role: "Junior Software Developer",
    period: "Oct 2017 – Nov 2018",
    color: "#fb923c",
    desc: "Mobile application developer specializing in the Ionic framework, contributing to the retail tech ecosystem.",
  },
  {
    company: "Global Healthcare Pvt Ltd",
    role: "Junior Software Developer",
    period: "Mar 2017 – Oct 2017",
    color: "#34d399",
    desc: "Mobile application developer using the Ionic framework in a healthcare context.",
  },
];

const PROJECTS = [
  {
    name: "Qualcom AI",
    tagline: "Regulatory Medical Document Automation",
    tech: ["Angular", "REST APIs", "Agile", "Git"],
    accent: "#00f5a0",
    desc: "AI-powered tool for automating generation of regulatory medical documents (clinical study reports, safety narratives, consent forms) used by biotech/pharma firms.",
    icon: "🧬",
  },
  {
    name: "ApexDocs",
    tagline: "Workflow Management Dashboard",
    tech: ["React.js", "Redux", "Node.js", "Python", "MySQL", "WebSocket"],
    accent: "#00d2ff",
    desc: "Admin panel for workflow management handling entire data extraction from documents using React.js, Node.js, MySQL and Python with incorporated AI models.",
    icon: "📊",
  },
  {
    name: "Skovia",
    tagline: "Crowd Funding Platform",
    tech: ["React.js", "Next.js", "Redux", "Node.js", "Blockchain", "PhonePe"],
    accent: "#a78bfa",
    desc: "Platform bridging the educational gap for underprivileged students in India — connecting donors with students for sponsorship, scholarships, book donations, and NGO collaboration via blockchain.",
    icon: "🎓",
  },
  {
    name: "AkiraBuild",
    tagline: "Construction ERP System",
    tech: ["Angular 12", "TypeScript", "Node.js", "Express.js", "Chart.js"],
    accent: "#fb923c",
    desc: "Comprehensive ERP tailored for the construction industry — streamlining project management, resource allocation, cost tracking, procurement, and collaboration.",
    icon: "🏗️",
  },
  {
    name: "Ubenix CAM",
    tagline: "Common Area Management System",
    tech: ["Angular 8", "TypeScript", "Bootstrap", "Node.js", "Chart.js"],
    accent: "#f472b6",
    desc: "CAMS application for efficient management and maintenance of shared spaces in residential/commercial properties — issue reporting, RFQ, GRN workflows and stakeholder communication.",
    icon: "🏢",
  },
];

/* ─── SCROLL SPY ─────────────────────────────────────────────── */
function useScrollSpy() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map((l) => document.getElementById(l));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].getBoundingClientRect().top <= 120) {
          setActive(NAV_LINKS[i]);
          return;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

/* ─── FADE-UP WRAPPER ────────────────────────────────────────── */
function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── SKILL BAR ──────────────────────────────────────────────── */
function SkillBar({ skill, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ marginBottom: 20 }}
    >
      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>{skill.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.slate200, letterSpacing: "0.04em" }}>
            {skill.name}
          </span>
        </div>
        <span style={{ fontSize: 12, color: T.slate400, fontFamily: "monospace" }}>{skill.level}%</span>
      </div>
      {/* Track */}
      <div style={{ height: 6, background: T.slate800, borderRadius: 99, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%",
            borderRadius: 99,
            background: "linear-gradient(90deg, #22d3ee, #8b5cf6)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── TIMELINE ITEM ──────────────────────────────────────────── */
function TimelineItem({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", gap: 20, marginBottom: 32 }}
    >
      {/* Dot + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: `2px solid ${exp.color}`,
            background: exp.color + "30",
            boxShadow: `0 0 12px ${exp.color}60`,
            marginTop: 6,
            flexShrink: 0,
          }}
        />
        {index < EXPERIENCES.length - 1 && (
          <div
            style={{
              width: 1,
              flex: 1,
              marginTop: 6,
              background: `linear-gradient(to bottom, ${exp.color}60, transparent)`,
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ scale: hovered ? 1.01 : 1 }}
        style={{
          flex: 1,
          background: T.bgCard,
          border: `1px solid ${hovered ? T.borderHover : T.border}`,
          borderRadius: 16,
          padding: "20px 24px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "border-color 0.2s",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: T.white, margin: 0, lineHeight: 1.3 }}>{exp.role}</h3>
            <p style={{ fontSize: 14, fontWeight: 600, color: exp.color, margin: "4px 0 0" }}>{exp.company}</p>
          </div>
          <span
            style={{
              fontSize: 11,
              color: T.slate400,
              fontFamily: "monospace",
              background: T.slate800,
              padding: "4px 10px",
              borderRadius: 99,
              border: `1px solid ${T.border}`,
              whiteSpace: "nowrap",
            }}
          >
            {exp.period}
          </span>
        </div>
        <p style={{ fontSize: 13, color: T.slate400, lineHeight: 1.7, margin: 0 }}>{exp.desc}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── PROJECT CARD ───────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: hovered ? -6 : 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        background: T.bgCard,
        border: `1px solid ${hovered ? project.accent + "44" : T.border}`,
        borderRadius: 20,
        padding: "24px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflow: "hidden",
        transition: "border-color 0.25s",
        cursor: "default",
      }}
    >
      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: project.accent + "1a",
          filter: "blur(28px)",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 32 }}>{project.icon}</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 99,
            color: project.accent,
            border: `1px solid ${project.accent}40`,
            background: project.accent + "15",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Project
        </span>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: 18, fontWeight: 800, color: T.white, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
        {project.name}
      </h3>
      <p style={{ fontSize: 12, fontWeight: 600, color: project.accent, margin: "0 0 12px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {project.tagline}
      </p>
      <p style={{ fontSize: 13, color: T.slate400, lineHeight: 1.7, margin: "0 0 16px" }}>{project.desc}</p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 8,
              background: T.slate800,
              color: T.slate300,
              border: `1px solid ${T.border}`,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── SECTION HEADING ────────────────────────────────────────── */
function SectionHeading({ eyebrow, eyebrowColor, title }) {
  return (
    <FadeUp style={{ textAlign: "center", marginBottom: 56 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.3em",
          color: eyebrowColor || T.cyan,
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontSize: "clamp(28px,5vw,44px)",
          fontWeight: 900,
          color: T.white,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
    </FadeUp>
  );
}

/* ─── MAIN PORTFOLIO ─────────────────────────────────────────── */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied]     = useState(false);
  const activeSection           = useScrollSpy();

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY      = useTransform(heroScroll, [0, 1], ["0%", "28%"]);
  const heroOpacity= useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Rotating words
  const words = ["Technical Lead", "UI Architect", "Angular Expert", "React Developer", "Mobile Developer"];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("johndoe@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Global base styles injected once ── */
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #050d1a; color: #f1f5f9; font-family: 'DM Sans', 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #050d1a; }
      ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: #22d3ee; }
      a { text-decoration: none; }
      button { font-family: inherit; }
      @media (max-width: 768px) {
        .grid-2col { grid-template-columns: 1fr !important; }
        .grid-3col { grid-template-columns: 1fr !important; }
        .hero-title { font-size: 48px !important; }
        .nav-desktop { display: none !important; }
        .nav-mobile-btn { display: flex !important; }
        .hide-mobile { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, overflowX: "hidden", position: "relative" }}>

      {/* ── Fixed background grid ── */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(148,163,184,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.03) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div style={{ position: "fixed", top: "20%", left: "8%",  width: 500, height: 500, borderRadius: "50%", background: "#7c3aed", filter: "blur(90px)", opacity: 0.09, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "20%", right: "8%", width: 500, height: 500, borderRadius: "50%", background: "#0891b2", filter: "blur(90px)", opacity: 0.08, pointerEvents: "none", zIndex: 0 }} />

      {/* ══════════════════════ NAV ══════════════════════ */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(5,13,26,0.85)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${T.border}`,
          padding: "0 24px",
          height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <motion.span
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em",
            background: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          JD.
        </motion.span>

        {/* Desktop nav */}
        <motion.ul
          className="nav-desktop"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: "flex", gap: 4, listStyle: "none" }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                style={{
                  background: activeSection === link ? "rgba(255,255,255,0.07)" : "transparent",
                  border: "none",
                  color: activeSection === link ? T.white : T.slate400,
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { e.target.style.color = T.white; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={(e) => { if (activeSection !== link) { e.target.style.color = T.slate400; e.target.style.background = "transparent"; } }}
              >
                {link}
              </button>
            </li>
          ))}
        </motion.ul>

        {/* Hire me */}
        <motion.button
          className="hide-mobile"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("Contact")}
          style={{
            background: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
            border: "none", borderRadius: 10, color: T.bg,
            padding: "8px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}
        >
          Hire Me
        </motion.button>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          style={{
            display: "none", background: "none", border: `1px solid ${T.border}`,
            borderRadius: 8, padding: "7px 9px", cursor: "pointer", color: T.slate300,
          }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen
              ? <path d="M6 18L18 6M6 6l12 12" />
              : <path d="M3 12h18M3 6h18M3 18h18" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: 60, left: 0, right: 0, zIndex: 90,
              background: "rgba(5,13,26,0.97)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              borderBottom: `1px solid ${T.border}`,
              padding: "16px 24px", display: "flex", flexDirection: "column", gap: 8,
            }}
          >
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)}
                style={{
                  background: "none", border: "none", textAlign: "left",
                  color: T.slate300, fontSize: 16, fontWeight: 500,
                  padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => e.target.style.color = T.cyan}
                onMouseLeave={(e) => e.target.style.color = T.slate300}
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        id="About"
        ref={heroRef}
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", position: "relative" }}
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 10, textAlign: "center", maxWidth: 800, margin: "0 auto" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32 }}
          >
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "5px 16px", borderRadius: 99,
                border: `1px solid rgba(34,211,238,0.3)`,
                background: "rgba(34,211,238,0.08)",
                fontSize: 12, fontWeight: 700, color: T.cyan,
                letterSpacing: "0.15em", textTransform: "uppercase",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.cyan, display: "inline-block", animation: "pulse 2s infinite" }} />
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: "clamp(48px,8vw,96px)", fontWeight: 900, lineHeight: 0.95,
              letterSpacing: "-0.04em", marginBottom: 16,
              background: "linear-gradient(135deg,#f1f5f9 40%,#8b5cf6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}
          >
            John Doe
          </motion.h1>

          {/* Animated role */}
          <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIdx}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4 }}
                style={{
                  fontSize: 20, fontWeight: 600,
                  background: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}
              >
                {words[wordIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ fontSize: 16, color: T.slate400, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 36px" }}
          >
            An organized Technical Lead who builds positive rapport, inspires trust, and guides teams toward achieving organizational goals. Adept at cross-departmental collaboration, training, and mentorship with 7+ years in frontend excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}
          >
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("Contact")}
              style={{
                padding: "12px 26px", borderRadius: 12, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg,#22d3ee,#8b5cf6)", color: T.bg,
                fontWeight: 700, fontSize: 14, boxShadow: "0 8px 28px rgba(139,92,246,0.35)",
              }}
            >
              Get in Touch
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("Projects")}
              style={{
                padding: "12px 26px", borderRadius: 12, cursor: "pointer",
                background: "rgba(255,255,255,0.05)", color: T.slate200,
                border: `1px solid ${T.border}`, fontWeight: 600, fontSize: 14,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = T.slate400}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = T.border}
            >
              View Projects
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            style={{
              display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap",
              paddingTop: 32, borderTop: `1px solid ${T.border}`,
            }}
          >
            {[["7+","Years Exp."],["5","Major Projects"],["4+","Frameworks"],["6","Companies"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  {v}
                </div>
                <div style={{ fontSize: 12, color: T.slate500, marginTop: 4, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontSize: 10, color: T.slate500, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(34,211,238,0.5), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════ SKILLS ══════════════════════ */}
      <section id="Skills" style={{ position: "relative", zIndex: 10, padding: "96px 24px", maxWidth: 900, margin: "0 auto" }}>
        <SectionHeading eyebrow="Expertise" eyebrowColor={T.cyan} title="Technical Skills" />
        <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 64px" }}>
          {SKILLS.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* ══════════════════════ EXPERIENCE ══════════════════════ */}
      <section id="Experience" style={{ position: "relative", zIndex: 10, padding: "96px 24px", maxWidth: 760, margin: "0 auto" }}>
        <SectionHeading eyebrow="Career" eyebrowColor="#a78bfa" title="Experience" />
        <div>
          {EXPERIENCES.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════ PROJECTS ══════════════════════ */}
      <section id="Projects" style={{ position: "relative", zIndex: 10, padding: "96px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeading eyebrow="Portfolio" eyebrowColor={T.pink} title="Featured Projects" />
        <div
          className="grid-3col"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════ EDUCATION ══════════════════════ */}
      <section id="Education" style={{ position: "relative", zIndex: 10, padding: "96px 24px", maxWidth: 900, margin: "0 auto" }}>
        <SectionHeading eyebrow="Background" eyebrowColor={T.emerald} title="Education" />
        <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { degree: "B.E Computer Science",   school: "KGF College of Engineering, Pune",       year: "Graduated May 2017",     icon: "🎓", color: "#00f5a0" },
            { degree: "Higher Secondary (12th)", school: "Xavier's Higher Secondary School, Noida", year: "Completed March 2013",   icon: "📚", color: "#00d2ff" },
          ].map((edu, i) => (
            <FadeUp key={edu.school} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 16,
                  padding: 24, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = T.borderHover}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = T.border}
              >
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 32 }}>{edu.icon}</span>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: T.white, marginBottom: 4 }}>{edu.degree}</h3>
                    <p style={{ fontSize: 14, fontWeight: 600, color: edu.color, marginBottom: 4 }}>{edu.school}</p>
                    <p style={{ fontSize: 12, color: T.slate500 }}>{edu.year}</p>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══════════════════════ CONTACT ══════════════════════ */}
      <section id="Contact" style={{ position: "relative", zIndex: 10, padding: "96px 24px", maxWidth: 760, margin: "0 auto" }}>
        <SectionHeading eyebrow="Let's Talk" eyebrowColor={T.cyan} title="Contact Me" />
        <FadeUp delay={0.2}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.7) 100%)",
              border: `1px solid ${T.border}`,
              borderRadius: 20,
              padding: "40px 36px",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <p style={{ color: T.slate400, textAlign: "center", lineHeight: 1.75, marginBottom: 36, fontSize: 15 }}>
              Ready to build something incredible together? Whether you have a project in mind or just want to say hello — my inbox is always open.
            </p>

            {/* Contact cards */}
            <div className="grid-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
              {[
                { icon: "✉️", label: "Email",    value: "johndoe@gmail.com",  action: copyEmail, actionLabel: copied ? "Copied!" : "Copy", color: "#00d2ff" },
                { icon: "📱", label: "Phone",    value: "+91 6463665643",      color: "#00f5a0" },
                { icon: "📍", label: "Location", value: "Pune, Maharashtra",   color: "#a78bfa" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -3 }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    textAlign: "center", gap: 10, padding: "20px 14px",
                    borderRadius: 14, background: "rgba(30,41,59,0.5)",
                    border: `1px solid ${T.border}`, transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = T.borderHover}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = T.border}
                >
                  <div
                    style={{
                      width: 48, height: 48, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: item.color, border: `1px solid ${item.color}40`,
                      background: item.color + "18", fontSize: 20,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: T.slate500, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontSize: 13, color: T.slate200, fontWeight: 500 }}>{item.value}</p>
                  </div>
                  {item.action && (
                    <button
                      onClick={item.action}
                      style={{
                        fontSize: 11, padding: "5px 12px", borderRadius: 8,
                        border: `1px solid ${T.border}`, background: "transparent",
                        color: T.slate400, cursor: "pointer", transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => { e.target.style.color = T.white; e.target.style.borderColor = T.slate400; }}
                      onMouseLeave={(e) => { e.target.style.color = T.slate400; e.target.style.borderColor = T.border; }}
                    >
                      {item.actionLabel}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center" }}>
              <motion.a
                href="mailto:johndoe@gmail.com"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "14px 32px", borderRadius: 12, fontWeight: 600, fontSize: 15,
                  background: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
                  color: T.bg, boxShadow: "0 8px 28px rgba(139,92,246,0.35)",
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send a Message
              </motion.a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer
        style={{
          position: "relative", zIndex: 10,
          borderTop: `1px solid ${T.border}`,
          padding: "28px 24px", textAlign: "center",
        }}
      >
        <p style={{ fontSize: 13, color: T.slate500 }}>
          Crafted with precision by{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#22d3ee,#8b5cf6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              fontWeight: 600,
            }}
          >
            John Doe
          </span>
          {" "}· 2024
        </p>
      </footer>

      {/* Pulse keyframe */}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}