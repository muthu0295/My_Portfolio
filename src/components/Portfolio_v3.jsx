import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─── PALETTE ─── */
const C = {
  bg:       "#0a0e0a",
  bgPanel:  "#0d120d",
  border:   "#1a3a1a",
  green:    "#39ff6e",
  greenDim: "#1a7a30",
  greenFade:"#0d3d18",
  amber:    "#ffb830",
  cyan:     "#00ffe0",
  magenta:  "#ff2d78",
  text:     "#b8f0c8",
  textDim:  "#4a7a58",
  scanline: "rgba(0,0,0,0.18)",
};

/* ─── DATA ─── */
const SKILLS = [
  { name: "Angular",     pct: 80, cat: "FE" },
  { name: "JavaScript",  pct: 80, cat: "FE" },
  { name: "TypeScript",  pct: 75, cat: "FE" },
  { name: "React.js",    pct: 60, cat: "FE" },
  { name: "HTML/CSS",    pct: 80, cat: "FE" },
  { name: "Ionic",       pct: 80, cat: "MOB" },
  { name: "Cordova",     pct: 80, cat: "MOB" },
  { name: "Node.js",     pct: 40, cat: "BE" },
  { name: "MySQL",       pct: 60, cat: "BE" },
  { name: "PHP",         pct: 20, cat: "BE" },
  { name: "Git",         pct: 80, cat: "TOOLS" },
  { name: "Redux",       pct: 65, cat: "FE" },
];

const JOBS = [
  { co: "Qualcom AI",              role: "Senior Software Developer",  yr: "2024–NOW",  status: "ACTIVE" },
  { co: "Netflow Pharma",          role: "UI Developer",               yr: "MAY–JUN 2024", status: "TERM" },
  { co: "Devine Techno Solutions", role: "Technical Lead",             yr: "2019–2024", status: "TERM" },
  { co: "W3 Global Designing",     role: "Senior Software Developer",  yr: "2018–2019", status: "TERM" },
  { co: "Meeshno Retail India",    role: "Junior Developer",           yr: "2017–2018", status: "TERM" },
  { co: "Global Healthcare",       role: "Junior Developer",           yr: "MAR–OCT 2017", status: "TERM" },
];

const PROJECTS = [
  {
    id: "QLCM-001",
    name: "QUALCOM_AI",
    type: "WEBAPP",
    stack: ["Angular", "REST", "Agile"],
    status: "RUNNING",
    desc: "AI-powered regulatory medical document automation for biotech/pharma. Generates clinical reports, safety narratives, consent forms.",
    lines: 14200,
  },
  {
    id: "APEX-002",
    name: "APEXDOCS",
    type: "DASHBOARD",
    stack: ["React", "Redux", "Node.js", "Python", "MySQL"],
    status: "RUNNING",
    desc: "Workflow management admin panel. End-to-end document data extraction using AI models + real-time WebSocket pipeline.",
    lines: 9840,
  },
  {
    id: "SKOV-003",
    name: "SKOVIA",
    type: "PLATFORM",
    stack: ["Next.js", "Redux", "Node.js", "Blockchain"],
    status: "DEPLOYED",
    desc: "Crowd-funding platform bridging the education gap for underprivileged Indian students. Blockchain-secured milestone funding.",
    lines: 11300,
  },
  {
    id: "AKIR-004",
    name: "AKIRABUILD",
    type: "ERP",
    stack: ["Angular 12", "TypeScript", "Chart.js", "Express.js"],
    status: "DEPLOYED",
    desc: "Full-scale ERP for the construction industry — scheduling, budgets, resource allocation, procurement, compliance.",
    lines: 22600,
  },
  {
    id: "UBNX-005",
    name: "UBENIX_CAM",
    type: "MGMT_SYS",
    stack: ["Angular 8", "Bootstrap", "Node.js", "Chart.js"],
    status: "DEPLOYED",
    desc: "Common Area Management System for residential/commercial properties. RFQ workflows, GRN, issue reporting, stakeholder comms.",
    lines: 8700,
  },
];

/* ─── HELPERS ─── */
function useTypewriter(text, speed = 38, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const t0 = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t0);
  }, [text]);
  return { displayed, done };
}

function Scanlines() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999,
      backgroundImage: `repeating-linear-gradient(0deg, ${C.scanline} 0px, ${C.scanline} 1px, transparent 1px, transparent 3px)`,
    }} />
  );
}

function WindowFrame({ title, subtitle, children, accent = C.green, style = {}, className = "" }) {
  return (
    <div className={className} style={{
      border: `1px solid ${accent}33`,
      background: C.bgPanel,
      position: "relative",
      ...style,
    }}>
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "6px 12px", borderBottom: `1px solid ${accent}33`,
        background: `${accent}12`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 5 }}>
            {[C.magenta, C.amber, C.green].map(c => (
              <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: accent, letterSpacing: "0.1em", fontWeight: 700 }}>
            {title}
          </span>
        </div>
        {subtitle && (
          <span style={{ fontFamily: "monospace", fontSize: 10, color: C.textDim, letterSpacing: "0.08em" }}>
            {subtitle}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

function TermBar({ pct, color = C.green }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const filled = Math.round(pct / 5);
  return (
    <div ref={ref} style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.04em", display: "flex", gap: 6, alignItems: "center" }}>
      <span style={{ color: C.textDim }}>[</span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.05 * filled, delay: 0.1 }}
        style={{ color }}
      >
        {"█".repeat(filled)}
      </motion.span>
      <span style={{ color: C.bgPanel }}>{"░".repeat(20 - filled)}</span>
      <span style={{ color: C.textDim }}>]</span>
      <span style={{ color: C.textDim, fontSize: 11 }}>{pct}%</span>
    </div>
  );
}

function BlinkCursor() {
  const [vis, setVis] = useState(true);
  useEffect(() => { const t = setInterval(() => setVis(v => !v), 530); return () => clearInterval(t); }, []);
  return <span style={{ color: C.green, opacity: vis ? 1 : 0, fontFamily: "monospace" }}>█</span>;
}

function Clock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString("en-US", { hour12: false }));
  useEffect(() => { const t = setInterval(() => setTime(new Date().toLocaleTimeString("en-US", { hour12: false })), 1000); return () => clearInterval(t); }, []);
  return <span style={{ fontFamily: "monospace", fontSize: 11, color: C.textDim }}>{time}</span>;
}

function Prompt({ cmd, delay = 0 }) {
  const { displayed, done } = useTypewriter(cmd, 32, delay);
  return (
    <div style={{ fontFamily: "monospace", fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 4 }}>
      <span style={{ color: C.greenDim }}>john@portfolio</span>
      <span style={{ color: C.textDim }}>:</span>
      <span style={{ color: C.cyan }}>~</span>
      <span style={{ color: C.textDim }}>$ </span>
      <span style={{ color: C.green }}>{displayed}</span>
      {!done && <BlinkCursor />}
    </div>
  );
}

/* ─── MAIN ─── */
export default function PortfolioThree() {
  const [section, setSection] = useState("home");
  const [bootDone, setBootDone] = useState(false);
  const [bootLines, setBootLines] = useState([]);

  const BOOT = [
    "BIOS v2.4.1  Copyright (C) JD Systems",
    "RAM Check: 8192MB OK",
    "Initializing portfolio kernel...",
    "Loading modules: [angular] [react] [ionic] [node]",
    "Mounting filesystem: /home/john/portfolio",
    "Starting display manager...",
    ">> PORTFOLIO_OS v1.0.0 ready <<",
  ];

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setBootLines(l => [...l, BOOT[i]]);
      i++;
      if (i >= BOOT.length) { clearInterval(iv); setTimeout(() => setBootDone(true), 600); }
    }, 260);
    return () => clearInterval(iv);
  }, []);

  const NAV = ["home", "skills", "experience", "projects", "contact"];

  if (!bootDone) {
    return (
      <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <Scanlines />
        <div style={{ maxWidth: 560, width: "100%" }}>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: C.green, lineHeight: 2.2 }}>
            {bootLines.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                {l.startsWith(">>") ? (
                  <span style={{ color: C.amber, fontWeight: 700 }}>{l}</span>
                ) : (
                  <span style={{ color: i < 3 ? C.textDim : C.text }}>{l}</span>
                )}
              </motion.div>
            ))}
            {bootLines.length < BOOT.length && <BlinkCursor />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "monospace" }}
    >
      <Scanlines />

      {/* ── TASKBAR ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50, background: C.bgPanel,
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", height: 36,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 12, color: C.green, fontWeight: 700, marginRight: 16, letterSpacing: "0.1em" }}>
            ◈ PORTFOLIO_OS
          </span>
          {NAV.map(n => (
            <button key={n} onClick={() => setSection(n)}
              style={{
                fontFamily: "monospace", fontSize: 11, padding: "4px 12px", cursor: "pointer",
                letterSpacing: "0.1em", textTransform: "uppercase", border: "none",
                background: section === n ? `${C.green}22` : "transparent",
                color: section === n ? C.green : C.textDim,
                borderBottom: section === n ? `1px solid ${C.green}` : "1px solid transparent",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (section !== n) e.target.style.color = C.text; }}
              onMouseLeave={e => { if (section !== n) e.target.style.color = C.textDim; }}
            >
              {n}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: C.textDim }}>
            CPU: <span style={{ color: C.cyan }}>12%</span>
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: C.textDim }}>
            MEM: <span style={{ color: C.cyan }}>2.1GB</span>
          </span>
          <Clock />
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={section}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >

            {/* ════════ HOME ════════ */}
            {section === "home" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Hero terminal */}
                <WindowFrame title="TERMINAL  —  bash" subtitle="tty1" style={{ gridColumn: "1 / -1" }}>
                  <div style={{ padding: "20px 24px", minHeight: 220 }}>
                    <Prompt cmd="whoami" delay={100} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                      <div style={{ marginLeft: 0, marginBottom: 20 }}>
                        <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.02em", color: C.green, lineHeight: 1, fontFamily: "monospace", marginBottom: 4 }}>
                          JOHN DOE
                        </div>
                        <div style={{ color: C.amber, fontSize: 14, letterSpacing: "0.15em", marginBottom: 12 }}>
                          [ TECHNICAL LEAD · SENIOR UI ENGINEER ]
                        </div>
                        <div style={{ color: C.textDim, fontSize: 13, lineHeight: 1.8, maxWidth: 560 }}>
                          <span style={{ color: C.greenDim }}>//</span> 7+ years building high-performance web &amp; mobile apps.<br />
                          <span style={{ color: C.greenDim }}>//</span> Expert in Angular, React, Ionic ecosystems.<br />
                          <span style={{ color: C.greenDim }}>//</span> Led teams, shipped products, mentored devs.<br />
                          <span style={{ color: C.greenDim }}>//</span> Currently @ Qualcom AI — Pune, Maharashtra.<br />
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {["skills", "experience", "projects", "contact"].map(s => (
                          <button key={s} onClick={() => setSection(s)}
                            style={{ fontFamily: "monospace", fontSize: 12, padding: "8px 18px", cursor: "pointer",
                              border: `1px solid ${C.green}55`, background: `${C.green}0d`,
                              color: C.green, letterSpacing: "0.12em", textTransform: "uppercase", transition: "all 0.15s" }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${C.green}22`; e.currentTarget.style.borderColor = C.green; }}
                            onMouseLeave={e => { e.currentTarget.style.background = `${C.green}0d`; e.currentTarget.style.borderColor = `${C.green}55`; }}>
                            ./{s}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </WindowFrame>

                {/* Stats */}
                <WindowFrame title="SYS_STATS.exe" accent={C.cyan}>
                  <div style={{ padding: 20 }}>
                    {[
                      ["EXP_YEARS",   "7+",  C.green],
                      ["PROJECTS",    "5",   C.cyan],
                      ["TECH_STACK",  "10+", C.amber],
                      ["ROLES_HELD",  "6",   C.magenta],
                    ].map(([k, v, col]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ color: C.textDim, fontSize: 12, letterSpacing: "0.08em" }}>{k}</span>
                        <span style={{ color: col, fontSize: 24, fontWeight: 900 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </WindowFrame>

                {/* Contact card */}
                <WindowFrame title="CONTACT.cfg" accent={C.amber}>
                  <div style={{ padding: 20 }}>
                    <Prompt cmd="cat contact.cfg" delay={300} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                      {[
                        ["EMAIL",    "johndoe@gmail.com",  C.cyan],
                        ["PHONE",    "+91 6463665643",     C.text],
                        ["LOCATION", "Pune, Maharashtra",  C.text],
                        ["STATUS",   "OPEN_TO_WORK",       C.green],
                      ].map(([k, v, col]) => (
                        <div key={k} style={{ display: "flex", gap: 12, marginBottom: 8, fontSize: 13 }}>
                          <span style={{ color: C.textDim, minWidth: 80 }}>{k}:</span>
                          <span style={{ color: col }}>{v}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </WindowFrame>
              </div>
            )}

            {/* ════════ SKILLS ════════ */}
            {section === "skills" && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Prompt cmd="cat skills.json | jq ." delay={0} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginTop: 8 }}>
                  {["FE", "MOB", "BE", "TOOLS"].map((cat, ci) => {
                    const items = SKILLS.filter(s => s.cat === cat);
                    const labels = { FE: "Frontend", MOB: "Mobile", BE: "Backend", TOOLS: "Tools" };
                    const accents = [C.green, C.cyan, C.amber, C.magenta];
                    const acc = accents[ci];
                    return (
                      <WindowFrame key={cat} title={`MODULE::${labels[cat]}`} accent={acc}>
                        <div style={{ padding: "16px 20px" }}>
                          {items.map((sk, i) => (
                            <motion.div key={sk.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ci * 0.05 + i * 0.06 }}
                              style={{ marginBottom: 14 }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
                                <span style={{ color: C.text, letterSpacing: "0.06em" }}>{sk.name}</span>
                              </div>
                              <TermBar pct={sk.pct} color={acc} />
                            </motion.div>
                          ))}
                        </div>
                      </WindowFrame>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ════════ EXPERIENCE ════════ */}
            {section === "experience" && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Prompt cmd="ls -lt ~/jobs/ | sort -r" delay={0} />
                </div>
                <WindowFrame title="JOBS_LOG  —  chronological" subtitle={`${JOBS.length} entries`}>
                  <div>
                    {/* Table header */}
                    <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 90px 80px",
                      padding: "8px 20px", borderBottom: `1px solid ${C.border}`,
                      background: `${C.green}0a` }}>
                      {["PID", "COMPANY", "ROLE", "PERIOD", "STATUS"].map(h => (
                        <span key={h} style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.15em", fontWeight: 700 }}>{h}</span>
                      ))}
                    </div>
                    {JOBS.map((job, i) => (
                      <JobRow key={job.co} job={job} idx={i} />
                    ))}
                  </div>
                </WindowFrame>

                <div style={{ marginTop: 20 }}>
                  <WindowFrame title="EDUCATION.log" accent={C.amber}>
                    <div style={{ padding: "16px 20px" }}>
                      {[
                        { deg: "B.E. Computer Science", school: "KGF College of Engineering, Pune", yr: "2013–2017" },
                        { deg: "Higher Secondary (XII)", school: "Xavier's Higher Secondary School, Noida", yr: "–2013" },
                      ].map((e, i) => (
                        <motion.div key={e.school} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }}
                          style={{ display: "flex", gap: 20, padding: "12px 0", borderBottom: i === 0 ? `1px solid ${C.border}` : "none" }}>
                          <span style={{ color: C.amber, fontSize: 12, minWidth: 70, letterSpacing: "0.06em" }}>{e.yr}</span>
                          <div>
                            <div style={{ color: C.text, fontSize: 13, marginBottom: 3 }}>{e.deg}</div>
                            <div style={{ color: C.textDim, fontSize: 12 }}>{e.school}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </WindowFrame>
                </div>
              </div>
            )}

            {/* ════════ PROJECTS ════════ */}
            {section === "projects" && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Prompt cmd="ls ~/projects/ --verbose" delay={0} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {PROJECTS.map((p, i) => (
                    <ProjectWindow key={p.id} project={p} delay={i * 0.08} />
                  ))}
                </div>
              </div>
            )}

            {/* ════════ CONTACT ════════ */}
            {section === "contact" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
                <WindowFrame title="PING  —  johndoe@system" style={{ gridColumn: "1 / -1" }}>
                  <div style={{ padding: "20px 24px" }}>
                    <Prompt cmd="ping johndoe --open-connection" delay={0} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                      <div style={{ color: C.text, fontSize: 13, lineHeight: 2.2, marginTop: 8 }}>
                        <span style={{ color: C.greenDim }}>PING</span> johndoe.dev: 56 data bytes<br />
                        <span style={{ color: C.green }}>64 bytes from johndoe.dev: icmp_seq=0 time=0.42ms</span><br />
                        <span style={{ color: C.textDim }}>Connection established. Ready to receive.</span>
                      </div>
                    </motion.div>
                  </div>
                </WindowFrame>

                <WindowFrame title="CONTACT_METHODS.cfg" accent={C.cyan}>
                  <div style={{ padding: 20 }}>
                    {[
                      { label: "// email", val: "johndoe@gmail.com", col: C.cyan, href: "mailto:johndoe@gmail.com" },
                      { label: "// phone", val: "+91 6463665643", col: C.text },
                      { label: "// location", val: "Pune, Maharashtra, IN", col: C.text },
                      { label: "// availability", val: "OPEN TO OPPORTUNITIES", col: C.green },
                    ].map(item => (
                      <div key={item.label} style={{ marginBottom: 16 }}>
                        <div style={{ color: C.greenDim, fontSize: 11, marginBottom: 3, letterSpacing: "0.08em" }}>{item.label}</div>
                        {item.href
                          ? <a href={item.href} style={{ color: item.col, fontSize: 14, fontFamily: "monospace", textDecoration: "none" }}
                              onMouseEnter={e => e.target.style.textDecoration = "underline"}
                              onMouseLeave={e => e.target.style.textDecoration = "none"}>{item.val}</a>
                          : <div style={{ color: item.col, fontSize: 14 }}>{item.val}</div>
                        }
                      </div>
                    ))}
                  </div>
                </WindowFrame>

                <WindowFrame title="SEND_MESSAGE.sh" accent={C.magenta}>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 12, color: C.textDim, lineHeight: 2, marginBottom: 16 }}>
                      <span style={{ color: C.magenta }}>#!/bin/bash</span><br />
                      <span style={{ color: C.greenDim }}># Fastest way to reach me:</span><br />
                      <span style={{ color: C.text }}>open mailto:johndoe@gmail.com</span>
                    </div>
                    <motion.a href="mailto:johndoe@gmail.com"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8,
                        fontFamily: "monospace", fontSize: 13, padding: "10px 20px",
                        border: `1px solid ${C.magenta}`, background: `${C.magenta}15`,
                        color: C.magenta, letterSpacing: "0.1em", textDecoration: "none", cursor: "pointer" }}>
                      ./send_email.sh ▶
                    </motion.a>
                  </div>
                </WindowFrame>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── STATUS BAR ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        height: 22, background: C.bgPanel, borderTop: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px",
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: C.greenDim }}>
          ◈ PORTFOLIO_OS  ·  john@portfolio  ·  ~/{section}
        </span>
        <div style={{ display: "flex", gap: 16 }}>
          {["UTF-8", "LF", "DARK_MODE: ON", "v1.0.0"].map(s => (
            <span key={s} style={{ fontFamily: "monospace", fontSize: 10, color: C.textDim }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ height: 30 }} />
    </motion.div>
  );
}

/* ─── JOB ROW ─── */
function JobRow({ job, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "grid", gridTemplateColumns: "80px 1fr 1fr 90px 80px",
        padding: "12px 20px", cursor: "default", transition: "background 0.15s",
        background: hovered ? `${C.green}0d` : "transparent",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <span style={{ fontFamily: "monospace", fontSize: 12, color: C.textDim }}>{String(idx + 1000)}</span>
      <span style={{ fontFamily: "monospace", fontSize: 13, color: hovered ? C.green : C.text, transition: "color 0.15s" }}>
        {job.co}
      </span>
      <span style={{ fontFamily: "monospace", fontSize: 12, color: C.textDim }}>{job.role}</span>
      <span style={{ fontFamily: "monospace", fontSize: 11, color: C.amber, letterSpacing: "0.05em" }}>{job.yr}</span>
      <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.1em",
        color: job.status === "ACTIVE" ? C.green : C.textDim }}>
        {job.status === "ACTIVE" ? "● ACTIVE" : "○ TERM"}
      </span>
    </motion.div>
  );
}

/* ─── PROJECT WINDOW ─── */
function ProjectWindow({ project, delay }) {
  const [expanded, setExpanded] = useState(false);
  const statusCol = project.status === "RUNNING" ? C.green : C.cyan;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <WindowFrame title={`${project.id}  —  ${project.name}`} subtitle={project.type} accent={statusCol}>
        <div>
          <div
            onClick={() => setExpanded(e => !e)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 20px", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = `${statusCol}0d`}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ color: statusCol, fontSize: 11, letterSpacing: "0.12em" }}>
                ● {project.status}
              </span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {project.stack.map(t => (
                  <span key={t} style={{ fontFamily: "monospace", fontSize: 11, color: C.textDim,
                    padding: "2px 8px", border: `1px solid ${C.border}`, letterSpacing: "0.05em" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: C.textDim }}>{project.lines.toLocaleString()} LOC</span>
              <motion.span animate={{ rotate: expanded ? 90 : 0 }} style={{ color: C.textDim, fontSize: 14 }}>▶</motion.span>
            </div>
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "14px 20px 18px", borderTop: `1px solid ${C.border}`,
                  background: `${statusCol}06` }}>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: C.greenDim, marginBottom: 8 }}>
                    <span style={{ color: C.textDim }}>$ </span>cat README.md
                  </div>
                  <p style={{ fontFamily: "monospace", fontSize: 13, color: C.text, lineHeight: 1.8 }}>
                    {project.desc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </WindowFrame>
    </motion.div>
  );
}
