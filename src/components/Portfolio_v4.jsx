import { useState,  useRef } from "react";
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";

const G = {
  bg: "linear-gradient(135deg, #0f0c29 0%, #1a0533 40%, #0d1b3e 100%)",
  card: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  rose: "#f43f5e",
  amber: "#f59e0b",
  emerald: "#10b981",
  cyan: "#06b6d4",
  text: "#f1f5f9",
  muted: "#94a3b8",
  faint: "#334155",
};

const SKILLS = [
  { name: "Angular",    pct: 80, color: "#f43f5e" },
  { name: "JavaScript", pct: 80, color: "#f59e0b" },
  { name: "TypeScript", pct: 75, color: "#6366f1" },
  { name: "React.js",   pct: 60, color: "#06b6d4" },
  { name: "HTML/CSS",   pct: 80, color: "#10b981" },
  { name: "Ionic",      pct: 80, color: "#8b5cf6" },
  { name: "Node.js",    pct: 40, color: "#ec4899" },
  { name: "MySQL",      pct: 60, color: "#f59e0b" },
  { name: "Git",        pct: 80, color: "#10b981" },
  { name: "Redux",      pct: 65, color: "#6366f1" },
];

const JOBS = [
  { co: "Qualcom AI",              role: "Senior Software Developer", yr: "2024–Now",      active: true  },
  { co: "Netflow Pharma",          role: "UI Developer",              yr: "May–Jun 2024",  active: false },
  { co: "Devine Techno Solutions", role: "Technical Lead",            yr: "2019–2024",     active: false },
  { co: "W3 Global Designing",     role: "Senior Software Developer", yr: "2018–2019",     active: false },
  { co: "Meeshno Retail India",    role: "Junior Developer",          yr: "2017–2018",     active: false },
  { co: "Global Healthcare",       role: "Junior Developer",          yr: "Mar–Oct 2017",  active: false },
];

const PROJECTS = [
  { name: "Qualcom AI",  sub: "Medical Doc Automation", tech: ["Angular","REST","AI"],           color: "#f43f5e", icon: "🧬" },
  { name: "ApexDocs",    sub: "Workflow Dashboard",     tech: ["React","Redux","Node","Python"],  color: "#6366f1", icon: "📊" },
  { name: "Skovia",      sub: "Crowd Funding Platform", tech: ["Next.js","Blockchain","Redux"],   color: "#10b981", icon: "🎓" },
  { name: "AkiraBuild",  sub: "Construction ERP",       tech: ["Angular 12","Chart.js"],          color: "#f59e0b", icon: "🏗️" },
  { name: "Ubenix CAM", sub: "Area Management System", tech: ["Angular 8","Bootstrap"],          color: "#8b5cf6", icon: "🏢" },
];

const STACK_ICONS = [
  { name: "Angular",    bg: "#f43f5e22", color: "#f43f5e", letter: "A"  },
  { name: "React",      bg: "#06b6d422", color: "#06b6d4", letter: "R"  },
  { name: "TypeScript", bg: "#6366f122", color: "#6366f1", letter: "TS" },
  { name: "Node.js",    bg: "#10b98122", color: "#10b981", letter: "N"  },
  { name: "Ionic",      bg: "#8b5cf622", color: "#8b5cf6", letter: "I"  },
  { name: "Next.js",    bg: "#ffffff15", color: "#ffffff", letter: "N." },
];

const glass = (extra = {}) => ({
  background: G.card,
  border: `1px solid ${G.border}`,
  borderRadius: 20,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  ...extra,
});

function Reveal({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function GlowOrb({ color, size, style }) {
  return <div style={{ position: "fixed", width: size, height: size, borderRadius: "50%",
    background: color, filter: "blur(80px)", opacity: 0.16, pointerEvents: "none", zIndex: 0, ...style }} />;
}

function Avatar() {
  return (
    <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", inset: -3, borderRadius: "50%",
          background: `conic-gradient(${G.indigo}, ${G.violet}, ${G.rose}, ${G.amber}, ${G.indigo})` }} />
      <div style={{ position: "absolute", inset: 2, borderRadius: "50%",
        background: "#1a0533", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>JD</span>
      </div>
    </div>
  );
}

function SkillPill({ skill, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      style={{ ...glass({ padding: "12px 16px", borderRadius: 14, cursor: "default",
        borderColor: hovered ? skill.color + "55" : G.border, transition: "border-color 0.2s" }) }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{skill.name}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: skill.color }}>{skill.pct}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
        <motion.div initial={{ width: 0 }} animate={inView ? { width: `${skill.pct}%` } : {}}
          transition={{ duration: 1.0, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }} />
      </div>
    </motion.div>
  );
}

function ExperienceCard({ job, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <motion.div whileHover={{ scale: 1.005 }}
        onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
        style={{ ...glass({ padding: "18px 24px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16, flexWrap: "wrap", cursor: "default",
          borderColor: hovered ? "rgba(255,255,255,0.14)" : G.border, transition: "border-color 0.2s" }) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
            background: job.active ? G.emerald : G.faint,
            boxShadow: job.active ? `0 0 10px ${G.emerald}` : "none" }} />
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: G.text, margin: 0 }}>{job.co}</h3>
            <p style={{ fontSize: 13, color: G.muted, margin: "2px 0 0" }}>{job.role}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {job.active && (
            <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
              background: `${G.emerald}18`, color: G.emerald, letterSpacing: "0.1em" }}>CURRENT</span>
          )}
          <span style={{ fontSize: 12, color: G.muted }}>{job.yr}</span>
        </div>
      </motion.div>
    </Reveal>
  );
}

function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <motion.div whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
        style={{ ...glass({ padding: "28px", position: "relative", overflow: "hidden", cursor: "default",
          borderColor: hovered ? project.color + "44" : G.border, transition: "border-color 0.25s" }) }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 130, height: 130, borderRadius: "50%",
          background: project.color + "1a", filter: "blur(28px)", opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <span style={{ fontSize: 30 }}>{project.icon}</span>
            <motion.div animate={{ x: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
              style={{ fontSize: 18, color: project.color }}>↗</motion.div>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: G.text, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
            {project.name}
          </h3>
          <p style={{ fontSize: 11, fontWeight: 700, color: project.color, margin: "0 0 16px",
            letterSpacing: "0.07em", textTransform: "uppercase" }}>{project.sub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tech.map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 99,
                background: "rgba(255,255,255,0.05)", color: G.muted,
                border: "1px solid rgba(255,255,255,0.07)" }}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function PortfolioFour() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", v => setScrolled(v > 60));

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.text,
      fontFamily: "'Inter','DM Sans',system-ui,sans-serif", overflowX: "hidden" }}>

      <GlowOrb color={G.indigo} size={500} style={{ top: "2%", left: "-8%" }} />
      <GlowOrb color={G.rose}   size={420} style={{ top: "18%", right: "-6%" }} />
      <GlowOrb color={G.violet} size={360} style={{ top: "65%", left: "18%", opacity: 0.11 }} />

      {/* Noise overlay */}
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.022,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "120px 120px" }} />

      {/* Floating nav pill */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
          zIndex: 100, width: "min(780px, calc(100% - 48px))",
          ...glass({ padding: "10px 20px", borderRadius: 999, display: "flex",
            alignItems: "center", justifyContent: "space-between",
            background: scrolled ? "rgba(15,12,41,0.85)" : G.card, transition: "background 0.3s" }) }}>
        <span style={{ fontWeight: 900, fontSize: 16, color: "#fff", letterSpacing: "-0.03em" }}>
          John Doe<span style={{ color: G.indigo }}>.</span>
        </span>
        <div style={{ display: "flex", gap: 2 }}>
          {["About","Skills","Experience","Projects","Contact"].map(s => (
            <button key={s} onClick={() => scrollTo(s)}
              style={{ fontFamily: "inherit", fontSize: 13, fontWeight: 500, padding: "6px 14px",
                borderRadius: 99, border: "none", background: "transparent", color: G.muted, cursor: "pointer" }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.color = G.text; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = G.muted; }}>
              {s}
            </button>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("Contact")}
          style={{ fontFamily: "inherit", fontSize: 13, fontWeight: 600, padding: "8px 18px",
            borderRadius: 99, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${G.indigo}, ${G.violet})`, color: "#fff" }}>
          Hire Me
        </motion.button>
      </motion.nav>

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* ══ HERO ══ */}
        <section id="About" style={{ padding: "120px 24px 48px", maxWidth: 1100, margin: "0 auto" }}>

          {/* Hero card */}
          <Reveal>
            <div style={{ ...glass({ padding: "40px 44px", marginBottom: 14, overflow: "hidden",
              position: "relative", borderRadius: 28 }) }}>
              <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320,
                borderRadius: "50%", background: `radial-gradient(circle, ${G.indigo}28, transparent 70%)`,
                pointerEvents: "none" }} />
              <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap", position: "relative" }}>
                <Avatar />
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99,
                      background: `${G.emerald}20`, color: G.emerald, letterSpacing: "0.06em" }}>
                      ● Available for work
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 99,
                      background: "rgba(255,255,255,0.06)", color: G.muted }}>📍 Pune, India</span>
                  </div>
                  <h1 style={{ fontSize: "clamp(36px,5.5vw,62px)", fontWeight: 900, lineHeight: 1,
                    letterSpacing: "-0.04em", margin: "0 0 10px",
                    background: `linear-gradient(135deg, #ffffff 40%, ${G.violet})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    John Doe
                  </h1>
                  <p style={{ fontSize: 16, color: G.muted, margin: "0 0 14px", fontWeight: 500 }}>
                    Technical Lead · Senior Frontend Engineer · 7+ years
                  </p>
                  <p style={{ fontSize: 14, color: G.muted, lineHeight: 1.75, maxWidth: 480, margin: 0 }}>
                    Building high-performance web & mobile experiences. Expert in Angular, React & Ionic.
                    Led teams, architected solutions, shipped products that scale.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "stretch" }}>
                  <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                    onClick={() => scrollTo("Contact")}
                    style={{ fontFamily: "inherit", fontWeight: 700, fontSize: 14, padding: "12px 24px",
                      borderRadius: 12, border: "none", cursor: "pointer",
                      background: `linear-gradient(135deg, ${G.indigo}, ${G.violet})`, color: "#fff",
                      boxShadow: `0 8px 28px ${G.indigo}45` }}>
                    Get in Touch →
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                    style={{ fontFamily: "inherit", fontWeight: 600, fontSize: 13, padding: "10px 20px",
                      borderRadius: 12, border: `1px solid ${G.border}`, cursor: "pointer",
                      background: "rgba(255,255,255,0.04)", color: G.muted }}>
                    ↓ Download CV
                  </motion.button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stat row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 14 }}>
            {[
              { val: "7+",  label: "Years exp.",     color: G.indigo, delay: 0.05 },
              { val: "5",   label: "Major projects",  color: G.violet, delay: 0.10 },
              { val: "10+", label: "Technologies",   color: G.rose,   delay: 0.15 },
              { val: "6",   label: "Companies",      color: G.amber,  delay: 0.20 },
            ].map(s => (
              <Reveal key={s.label} delay={s.delay}>
                <motion.div whileHover={{ scale: 1.04, y: -3 }} transition={{ type: "spring", stiffness: 300 }}
                  style={{ ...glass({ padding: "22px 18px", textAlign: "center", cursor: "default" }) }}>
                  <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1,
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: G.muted, fontWeight: 600, marginTop: 5, letterSpacing: "0.04em" }}>
                    {s.label}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Stack pill row */}
          <Reveal delay={0.22}>
            <div style={{ ...glass({ padding: "18px 24px", display: "flex", alignItems: "center",
              gap: 14, flexWrap: "wrap" }) }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: G.muted, letterSpacing: "0.1em",
                textTransform: "uppercase" }}>Stack</span>
              {STACK_ICONS.map(s => (
                <motion.div key={s.name} whileHover={{ y: -4, scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 400 }} title={s.name}
                  style={{ width: 38, height: 38, borderRadius: 10, background: s.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 900, color: s.color, border: `1px solid ${s.color}33`, cursor: "default" }}>
                  {s.letter}
                </motion.div>
              ))}
              <a href="mailto:johndoe@gmail.com" style={{ marginLeft: "auto", width: 38, height: 38, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.05)", border: `1px solid ${G.border}`,
                color: G.muted, textDecoration: "none", fontSize: 16, transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.color = G.indigo; e.currentTarget.style.background = `${G.indigo}20`; }}
                onMouseLeave={e => { e.currentTarget.style.color = G.muted; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
                @
              </a>
            </div>
          </Reveal>
        </section>

        {/* ══ SKILLS ══ */}
        <section id="Skills" style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: G.indigo,
                textTransform: "uppercase", margin: "0 0 6px" }}>02 — Expertise</p>
              <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", margin: 0,
                background: `linear-gradient(135deg, #fff, ${G.muted})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Technical Skills</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
            {SKILLS.map((sk, i) => <SkillPill key={sk.name} skill={sk} delay={i * 0.04} />)}
          </div>
        </section>

        {/* ══ EXPERIENCE ══ */}
        <section id="Experience" style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: G.violet,
                textTransform: "uppercase", margin: "0 0 6px" }}>03 — Career</p>
              <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", margin: 0,
                background: `linear-gradient(135deg, #fff, ${G.muted})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Experience</h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {JOBS.map((job, i) => <ExperienceCard key={job.co} job={job} delay={i * 0.07} />)}
          </div>
        </section>

        {/* ══ PROJECTS ══ */}
        <section id="Projects" style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: G.rose,
                textTransform: "uppercase", margin: "0 0 6px" }}>04 — Work</p>
              <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", margin: 0,
                background: `linear-gradient(135deg, #fff, ${G.muted})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Featured Projects</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 14 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} delay={i * 0.08} />)}
          </div>
        </section>

        {/* ══ EDUCATION ══ */}
        <section style={{ padding: "0 24px 32px", maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: G.amber,
                textTransform: "uppercase", margin: "0 0 6px" }}>05 — Background</p>
              <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", margin: 0,
                background: `linear-gradient(135deg, #fff, ${G.muted})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Education</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {[
              { deg: "B.E. Computer Science", school: "KGF College of Engineering, Pune", yr: "2013–2017", icon: "🎓", color: G.amber },
              { deg: "Higher Secondary (XII)",  school: "Xavier's Higher Secondary School, Noida", yr: "Until 2013", icon: "📚", color: G.cyan },
            ].map((e, i) => (
              <Reveal key={e.school} delay={i * 0.12}>
                <motion.div whileHover={{ y: -4 }} style={{ ...glass({ padding: "28px" }) }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{e.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: e.color, letterSpacing: "0.1em",
                    textTransform: "uppercase", marginBottom: 8 }}>{e.yr}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: G.text, marginBottom: 6 }}>{e.deg}</h3>
                  <p style={{ fontSize: 13, color: G.muted, lineHeight: 1.5, margin: 0 }}>{e.school}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="Contact" style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ ...glass({ padding: "52px 48px", position: "relative",
              overflow: "hidden", borderRadius: 28 }) }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
                background: `radial-gradient(ellipse 70% 55% at 50% 110%, ${G.indigo}1a, transparent)` }} />
              <div style={{ position: "relative" }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: G.cyan,
                  textTransform: "uppercase", margin: "0 0 10px" }}>06 — Contact</p>
                <h2 style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: 900, letterSpacing: "-0.04em",
                  margin: "0 0 14px", lineHeight: 1.05,
                  background: `linear-gradient(135deg, #fff 50%, ${G.violet})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Let's build<br />something great.
                </h2>
                <p style={{ fontSize: 15, color: G.muted, margin: "0 0 32px", lineHeight: 1.7, maxWidth: 400 }}>
                  Available for senior frontend or technical lead roles. Open to exciting products and strong teams.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 12, marginBottom: 32 }}>
                  {[
                    { label: "Email",    val: "johndoe@gmail.com", icon: "✉️" },
                    { label: "Phone",    val: "+91 6463665643",     icon: "📱" },
                    { label: "Location", val: "Pune, Maharashtra",  icon: "📍" },
                  ].map(c => (
                    <div key={c.label} style={{ ...glass({ padding: "16px 18px", borderRadius: 14 }) }}>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>{c.icon}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: G.muted, letterSpacing: "0.12em",
                        textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{c.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <motion.a href="mailto:johndoe@gmail.com" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                    style={{ fontFamily: "inherit", fontWeight: 700, fontSize: 14, padding: "13px 28px",
                      borderRadius: 12, border: "none", cursor: "pointer", textDecoration: "none",
                      background: `linear-gradient(135deg, ${G.indigo}, ${G.violet})`, color: "#fff",
                      boxShadow: `0 8px 28px ${G.indigo}45`, display: "inline-block" }}>
                    Send Email →
                  </motion.a>
                  <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                    style={{ fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "13px 24px",
                      borderRadius: 12, border: `1px solid ${G.border}`, cursor: "pointer",
                      background: "rgba(255,255,255,0.04)", color: G.muted }}>
                    ↓ Download Resume
                  </motion.button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${G.border}`,
        padding: "18px 24px", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: G.faint }}>© 2024 John Doe — crafted with care</span>
      </div>
    </div>
  );
}
