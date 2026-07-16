/**
 * Portfolio_v2_fixed.jsx
 * ─────────────────────────────────────────────────────────────
 * FIXES APPLIED:
 *   1. All Tailwind classes replaced with inline styles
 *   2. ProjectCard Reveal wrapper removed — grid borders work correctly now
 *   3. SkillCell group-hover Tailwind class replaced with React state
 *   4. Dead `last` prop removed from ProjectCard call
 *   5. Education section given id="Education"
 *   6. Dead CSS transition on skill hover cell removed
 *
 * Dependency: npm install framer-motion
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ─── DATA ───────────────────────────────────────────────────── */
const SKILLS = [
  { name: "Angular",    level: 80, cat: "Frontend" },
  { name: "JavaScript", level: 80, cat: "Frontend" },
  { name: "React.js",   level: 60, cat: "Frontend" },
  { name: "TypeScript", level: 75, cat: "Frontend" },
  { name: "HTML / CSS", level: 80, cat: "Frontend" },
  { name: "Ionic",      level: 80, cat: "Mobile"   },
  { name: "Cordova",    level: 80, cat: "Mobile"   },
  { name: "Node.js",    level: 40, cat: "Backend"  },
  { name: "MySQL",      level: 60, cat: "Backend"  },
  { name: "Git",        level: 80, cat: "Tools"    },
  { name: "PHP",        level: 20, cat: "Backend"  },
];

const JOBS = [
  { co: "Qualcom AI",               role: "Senior Software Developer", yr: "2024 – Now",   tag: "Current" },
  { co: "Netflow Pharma",           role: "UI Developer",              yr: "May–Jun 2024",  tag: null },
  { co: "Devine Techno Solutions",  role: "Technical Lead",            yr: "2019 – 2024",   tag: "4 yrs" },
  { co: "W3 Global Designing",      role: "Senior Software Developer", yr: "2018 – 2019",   tag: null },
  { co: "Meeshno Retail India",     role: "Junior Developer",          yr: "2017 – 2018",   tag: null },
  { co: "Global Healthcare Pvt Ltd",role: "Junior Developer",          yr: "Mar–Oct 2017",  tag: null },
];

const PROJECTS = [
  { no: "01", name: "Qualcom AI",   sub: "Regulatory Medical Document Automation", tech: ["Angular", "REST APIs", "Agile"],               desc: "AI-powered tool automating clinical study reports, safety narratives & consent forms for biotech/pharma firms." },
  { no: "02", name: "ApexDocs",     sub: "Workflow Management Dashboard",          tech: ["React.js", "Redux", "Node.js", "Python", "MySQL"], desc: "Admin panel for end-to-end document data extraction incorporating AI models and real-time WebSocket feeds." },
  { no: "03", name: "Skovia",       sub: "Crowd Funding Platform",                 tech: ["Next.js", "Redux", "Node.js", "Blockchain", "PhonePe"], desc: "Bridging the educational gap for underprivileged Indian students via blockchain-secured milestone funding." },
  { no: "04", name: "AkiraBuild",   sub: "Construction ERP System",               tech: ["Angular 12", "TypeScript", "Chart.js", "Express.js"], desc: "Full-scale ERP for the construction industry — scheduling, budgets, resource allocation & procurement." },
  { no: "05", name: "Ubenix CAM",   sub: "Common Area Management System",         tech: ["Angular 8", "Bootstrap", "Node.js", "Chart.js"],   desc: "Streamlines issue reporting, RFQ workflows, GRN management and stakeholder communication for property managers." },
];

/* ─── HELPERS ────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, dir = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const variants = {
    hidden:  { opacity: 0, y: dir === "up" ? 32 : dir === "down" ? -32 : 0, x: dir === "left" ? 40 : dir === "right" ? -40 : 0 },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div ref={ref} variants={variants} initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* FIX 1 — all Tailwind removed, pure inline styles */
function Ticker() {
  const items = ["Angular", "React.js", "Technical Lead", "Ionic", "Node.js", "7+ Years", "UI Architecture", "Pune, India"];
  return (
    <div style={{ overflow: "hidden", borderTop: "2px solid #0a0a0a", borderBottom: "2px solid #0a0a0a", background: "#0a0a0a", padding: "10px 0" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4A017", padding: "0 24px" }}>
            {item} <span style={{ color: "rgba(255,255,255,0.4)", margin: "0 4px" }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function PortfolioTwo() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredJob,   setHoveredJob]   = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cats     = ["All", "Frontend", "Mobile", "Backend", "Tools"];
  const filtered = activeFilter === "All" ? SKILLS : SKILLS.filter(s => s.cat === activeFilter);

  const taglines = ["Building interfaces that matter.", "7+ years of frontend craft.", "Angular. React. Ship it."];
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % taglines.length), 3000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  /* Inject global reset once */
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #F5F0E8; color: #0a0a0a; -webkit-font-smoothing: antialiased; }
      a { text-decoration: none; }
      button { font-family: inherit; }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", background: "#F5F0E8", minHeight: "100vh", color: "#0a0a0a" }}>

      {/* Progress bar */}
      <motion.div style={{ scaleX, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "#0a0a0a", zIndex: 100 }} />

      {/* ══ NAV ══ */}
      <nav style={{ borderBottom: "2px solid #0a0a0a", background: "#F5F0E8", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>
              John Doe<span style={{ color: "#D4A017" }}>.</span>
            </span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", gap: 4 }}>
            {["About", "Skills", "Experience", "Projects", "Contact"].map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em",
                  textTransform: "uppercase", padding: "6px 14px",
                  border: "1.5px solid transparent", borderRadius: 4, cursor: "pointer",
                  background: "transparent", color: "#0a0a0a", transition: "all 0.15s" }}
                onMouseEnter={e => { e.target.style.borderColor = "#0a0a0a"; e.target.style.background = "#0a0a0a"; e.target.style.color = "#F5F0E8"; }}
                onMouseLeave={e => { e.target.style.borderColor = "transparent"; e.target.style.background = "transparent"; e.target.style.color = "#0a0a0a"; }}>
                {s}
              </button>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="About" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", paddingTop: 64 }}>
        {/* FIX 1 — grid replaced with inline style */}
        <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 0, borderBottom: "2px solid #0a0a0a" }}>

          {/* Left */}
          <div style={{ padding: "48px 48px 48px 0", borderRight: "2px solid #0a0a0a" }}>
            <Reveal>
              <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.35em",
                textTransform: "uppercase", color: "#D4A017", marginBottom: 16 }}>
                ◆ Portfolio 2024 ◆ Pune, India
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 style={{ fontSize: "clamp(56px,9vw,108px)", fontWeight: 900, lineHeight: 0.9,
                letterSpacing: "-0.03em", marginBottom: 24 }}>
                John<br />
                <span style={{ WebkitTextStroke: "3px #0a0a0a", color: "transparent" }}>Doe</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ height: 36, overflow: "hidden", marginBottom: 24 }}>
                <AnimatePresence mode="wait">
                  <motion.p key={tIdx}
                    initial={{ y: 36, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -36, opacity: 0 }} transition={{ duration: 0.5 }}
                    style={{ fontFamily: "sans-serif", fontSize: 18, fontWeight: 600, color: "#5a5a5a" }}>
                    {taglines[tIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p style={{ fontFamily: "sans-serif", fontSize: 15, lineHeight: 1.7, color: "#3a3a3a", maxWidth: 540 }}>
                Technical Lead & Senior Frontend Developer with 7+ years building high-performance
                web and mobile applications. Expert in Angular, React, and Ionic ecosystems.
                Proven leader who collaborates cross-departmentally to ship products that scale.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              {/* FIX 1 — flex replaced with inline style */}
              <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("Projects")}
                  style={{ fontFamily: "sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "14px 28px", background: "#0a0a0a", color: "#F5F0E8",
                    border: "2px solid #0a0a0a", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  View Work →
                </motion.button>
                <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("Contact")}
                  style={{ fontFamily: "sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "14px 28px", background: "transparent", color: "#0a0a0a",
                    border: "2px solid #0a0a0a", cursor: "pointer" }}>
                  Contact Me
                </motion.button>
              </div>
            </Reveal>
          </div>

          {/* Right stats */}
          <div style={{ padding: "48px 0 48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Reveal delay={0.35}>
              {/* FIX 1 — grid replaced */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                {[["7+","Years of Experience"],["5","Major Projects"],["10+","Technologies"],["3","Company Levels"]].map(([n, l], i) => (
                  <div key={l} style={{
                    padding: "20px 16px",
                    borderRight: i % 2 === 0 ? "2px solid #0a0a0a" : "none",
                    borderBottom: i < 2 ? "2px solid #0a0a0a" : "none",
                  }}>
                    <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em", color: "#D4A017" }}>{n}</div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                      textTransform: "uppercase", color: "#888", marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: "2px solid #0a0a0a" }}>
                <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "#888", marginBottom: 10 }}>Contact</p>
                <p style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>johndoe@gmail.com</p>
                <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#555" }}>+91 6463665643</p>
                <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#555" }}>Pune, Maharashtra</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <Ticker />

      {/* ══ SKILLS ══ */}
      <section id="Skills" style={{ borderBottom: "2px solid #0a0a0a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
          {/* Header row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between",
            gap: 24, borderBottom: "2px solid #0a0a0a", paddingBottom: 24, marginBottom: 0 }}>
            <Reveal>
              <div>
                <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.3em",
                  textTransform: "uppercase", color: "#D4A017", marginBottom: 8 }}>02 — Skills</p>
                <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  Technical<br />Expertise
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              {/* Filter buttons */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {cats.map(c => (
                  <button key={c} onClick={() => setActiveFilter(c)}
                    style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em",
                      textTransform: "uppercase", padding: "8px 16px", cursor: "pointer", transition: "all 0.15s",
                      background: activeFilter === c ? "#0a0a0a" : "transparent",
                      color: activeFilter === c ? "#F5F0E8" : "#0a0a0a",
                      border: "2px solid #0a0a0a" }}>
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* FIX 1 — grid replaced; FIX 6 — CSS transition removed from motion element */}
          <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, border: "2px solid #0a0a0a", marginTop: 0 }}>
            <AnimatePresence>
              {filtered.map((sk, i) => (
                <motion.div key={sk.name} layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  whileHover={{ background: "#0a0a0a", color: "#F5F0E8" }}
                  style={{ padding: "24px 28px", borderRight: "1px solid #0a0a0a", borderBottom: "1px solid #0a0a0a",
                    background: "#F5F0E8", cursor: "default" }}>
                  <SkillCell skill={sk} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section id="Experience" style={{ borderBottom: "2px solid #0a0a0a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
          <Reveal>
            <div style={{ borderBottom: "2px solid #0a0a0a", paddingBottom: 24, marginBottom: 0 }}>
              <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#D4A017", marginBottom: 8 }}>03 — Experience</p>
              <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>Career</h2>
            </div>
          </Reveal>
          {JOBS.map((job, i) => (
            <Reveal key={job.co} delay={i * 0.07}>
              <motion.div
                onHoverStart={() => setHoveredJob(i)}
                onHoverEnd={() => setHoveredJob(null)}
                animate={{ background: hoveredJob === i ? "#0a0a0a" : "#F5F0E8", color: hoveredJob === i ? "#F5F0E8" : "#0a0a0a" }}
                transition={{ duration: 0.2 }}
                style={{ borderBottom: "2px solid #0a0a0a", padding: "20px 8px", cursor: "default" }}
              >
                {/* FIX 1 — flex replaced */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <span style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 800, opacity: 0.35,
                      letterSpacing: "0.1em", minWidth: 28 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{job.co}</h3>
                      <p style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 600, marginTop: 2,
                        color: hoveredJob === i ? "#D4A017" : "#555", transition: "color 0.2s" }}>{job.role}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {job.tag && (
                      <span style={{ fontFamily: "sans-serif", fontSize: 10, fontWeight: 900, letterSpacing: "0.15em",
                        textTransform: "uppercase", padding: "4px 10px",
                        background: hoveredJob === i ? "#D4A017" : "#0a0a0a",
                        color: "#F5F0E8", transition: "background 0.2s" }}>
                        {job.tag}
                      </span>
                    )}
                    <span style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, opacity: 0.6,
                      letterSpacing: "0.05em" }}>{job.yr}</span>
                    <motion.span
                      animate={{ x: hoveredJob === i ? 6 : 0 }}
                      style={{ fontSize: 20, opacity: hoveredJob === i ? 1 : 0.2, transition: "opacity 0.2s" }}>
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="Projects" style={{ borderBottom: "2px solid #0a0a0a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
          <Reveal>
            <div style={{ borderBottom: "2px solid #0a0a0a", paddingBottom: 24, marginBottom: 40 }}>
              <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#D4A017", marginBottom: 8 }}>04 — Projects</p>
              <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
                Selected<br />Work
              </h2>
            </div>
          </Reveal>

          {/* FIX 2 — Reveal wrapper removed from ProjectCard so grid border logic works */}
          {/* FIX 1 — grid replaced */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "2px solid #0a0a0a" }}>
            {PROJECTS.map((p, i) => (
              /* FIX 4 — removed dead `last` prop */
              <ProjectCard key={p.no} project={p} odd={i % 2 !== 0} total={PROJECTS.length} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ EDUCATION ══ */}
      {/* FIX 5 — added id="Education" */}
      <section id="Education" style={{ borderBottom: "2px solid #0a0a0a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
          <Reveal>
            <div style={{ borderBottom: "2px solid #0a0a0a", paddingBottom: 24, marginBottom: 40 }}>
              <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#D4A017", marginBottom: 8 }}>05 — Education</p>
              <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>Academic</h2>
            </div>
          </Reveal>
          {/* FIX 1 — grid replaced */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "2px solid #0a0a0a" }}>
            {[
              { degree: "B.E. Computer Science",  school: "KGF College of Engineering, Pune",       yr: "2013 – 2017" },
              { degree: "Higher Secondary (12th)", school: "Xavier's Higher Secondary School, Noida", yr: "Until 2013"  },
            ].map((e, i) => (
              <Reveal key={e.school} delay={i * 0.12}>
                <motion.div
                  whileHover={{ background: "#0a0a0a", color: "#F5F0E8" }}
                  transition={{ duration: 0.2 }}
                  style={{ padding: "36px 40px", borderRight: i === 0 ? "2px solid #0a0a0a" : "none", background: "#F5F0E8" }}>
                  <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#D4A017", marginBottom: 12 }}>{e.yr}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 8 }}>{e.degree}</h3>
                  <p style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 600, opacity: 0.6 }}>{e.school}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="Contact" style={{ borderBottom: "2px solid #0a0a0a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }}>
          {/* FIX 1 — grid replaced */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            <Reveal>
              <div>
                <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.3em",
                  textTransform: "uppercase", color: "#D4A017", marginBottom: 16 }}>06 — Contact</p>
                <h2 style={{ fontSize: "clamp(44px,7vw,80px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.95, marginBottom: 24 }}>
                  Let's Build<br />
                  <span style={{ WebkitTextStroke: "3px #0a0a0a", color: "transparent" }}>Something.</span>
                </h2>
                <p style={{ fontFamily: "sans-serif", fontSize: 16, lineHeight: 1.7, color: "#4a4a4a", maxWidth: 380 }}>
                  Looking for a technical lead or a senior frontend engineer who can hit the ground running?
                  Let's connect.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ borderLeft: "2px solid #0a0a0a", paddingLeft: 48 }}>
                {[
                  { label: "Email",    val: "johndoe@gmail.com"  },
                  { label: "Phone",    val: "+91 6463665643"      },
                  { label: "Location", val: "Pune, Maharashtra"   },
                ].map((c, i) => (
                  <div key={c.label} style={{ padding: "24px 0", borderBottom: i < 2 ? "2px solid #0a0a0a" : "none" }}>
                    <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#888", marginBottom: 6 }}>{c.label}</p>
                    <p style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em" }}>{c.val}</p>
                  </div>
                ))}
                <motion.a href="mailto:johndoe@gmail.com"
                  whileHover={{ x: 6 }} whileTap={{ scale: 0.97 }}
                  style={{ fontFamily: "sans-serif", display: "inline-flex", alignItems: "center", gap: 10, marginTop: 32,
                    fontWeight: 900, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase",
                    padding: "16px 32px", background: "#D4A017", color: "#0a0a0a",
                    border: "2px solid #D4A017", textDecoration: "none", cursor: "pointer" }}>
                  Send an Email →
                </motion.a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0a0a0a", color: "#F5F0E8", padding: "20px 24px" }}>
        {/* FIX 1 — flex replaced */}
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5 }}>© 2024 John Doe</span>
          <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em" }}>
            JD<span style={{ color: "#D4A017" }}>.</span>
          </span>
          <span style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5 }}>Pune · India</span>
        </div>
      </footer>
    </div>
  );
}

/* ─── SUB COMPONENTS ─────────────────────────────────────────── */

/* FIX 3 — Tailwind group-hover class replaced with React hover state */
function SkillCell({ skill }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transition: "color 0.2s", color: hovered ? "#D4A017" : "inherit" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <p style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em",
            textTransform: "uppercase", opacity: 0.4, marginBottom: 4 }}>
            {skill.cat}
          </p>
          <h3 style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.01em" }}>{skill.name}</h3>
        </div>
        <span style={{ fontFamily: "sans-serif", fontWeight: 900, fontSize: 28, opacity: 0.15 }}>{skill.level}</span>
      </div>
      <div style={{ height: 3, background: "rgba(0,0,0,0.12)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", background: "#D4A017" }}
        />
      </div>
    </div>
  );
}

/* FIX 2 — component now has its own inView so Reveal wrapper is not needed
   FIX 4 — dead `last` prop removed from signature */
function ProjectCard({ project, odd, idx, total }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView
        ? { opacity: 1, y: 0, background: hovered ? "#0a0a0a" : "#F5F0E8", color: hovered ? "#F5F0E8" : "#0a0a0a" }
        : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: "36px 40px",
        cursor: "default",
        borderRight: !odd ? "2px solid #0a0a0a" : "none",
        borderBottom: idx < total - 1 ? "2px solid #0a0a0a" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: "#D4A017" }}>{project.no}</span>
        <motion.span animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }} style={{ fontSize: 18 }}>→</motion.span>
      </div>
      <h3 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 4 }}>{project.name}</h3>
      <p style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
        textTransform: "uppercase", color: hovered ? "#D4A017" : "#888", marginBottom: 14, transition: "color 0.2s" }}>
        {project.sub}
      </p>
      <p style={{ fontFamily: "sans-serif", fontSize: 14, lineHeight: 1.65, opacity: 0.65, marginBottom: 18 }}>
        {project.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tech.map(t => (
          <span key={t} style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: 800, padding: "4px 10px",
            letterSpacing: "0.06em", textTransform: "uppercase",
            border: `1.5px solid ${hovered ? "rgba(255,255,255,0.25)" : "#0a0a0a"}`,
            transition: "border-color 0.2s" }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}