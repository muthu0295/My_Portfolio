// // import { useState } from 'react';
// import PortfolioOne from "./components/Portfolio";
// // import PortfolioTwo from "./components/Portfolio_v2";
// // import PortfolioThree from "./components/Portfolio_v3";
// // import PortfolioFour from "./components/Portfolio_v4";

// function App() {

//   return (
//     <>
//     <PortfolioOne />;
//     </>
//   )
// }

// export default App




/**
 * ============================================================
 *  COMMON APP — Portfolio Design Selector
 * ============================================================
 *  HOW TO USE:
 *  1. Place this file as  src/App.jsx
 *  2. Put your four portfolio files in the same src/ folder:
 *       src/JohnDoe_Portfolio.jsx      (v1 – Dark Neon)
 *       src/JohnDoe_Portfolio_v2.jsx   (v2 – Editorial)
 *       src/JohnDoe_Portfolio_v3.jsx   (v3 – Terminal OS)
 *       src/JohnDoe_Portfolio_v4.jsx   (v4 – Bento Glass)
 *  3. npm install framer-motion  (only dependency needed)
 *  4. npm run dev
 * ============================================================
 */

import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Lazy-load each portfolio so they don't all parse at once ──
const PortfolioV1 = lazy(() => import("./components/Portfolio"));
const PortfolioV2 = lazy(() => import("./components/Portfolio_v2"));
const PortfolioV3 = lazy(() => import("./components/Portfolio_v3"));
const PortfolioV4 = lazy(() => import("./components/Portfolio_v4"));

// ── Design metadata ──────────────────────────────────────────
const DESIGNS = [
  {
    id: "v1",
    component: PortfolioV1,
    label: "Dark Neon",
    tagline: "Futuristic · Gradient · Glassmorphism",
    description:
      "Deep space dark theme with cyan-to-violet gradients, animated rotating avatar ring, staggered skill bars and a parallax glowing hero.",
    badge: "Classic Dev",
    emoji: "🌌",
    accent: "#00f5ff",
    accent2: "#7c3aed",
    bg: "linear-gradient(135deg,#050d1a 0%,#0d0929 100%)",
    palette: ["#050d1a", "#00f5ff", "#7c3aed", "#f472b6"],
  },
  {
    id: "v2",
    component: PortfolioV2,
    label: "Editorial",
    tagline: "Brutalist · Print · Warm Cream",
    description:
      "Parchment background, Playfair Display serif, thick ink borders, hover-invert rows and an animated ticker tape — magazine meets portfolio.",
    badge: "Standout",
    emoji: "📰",
    accent: "#D4A017",
    accent2: "#0a0a0a",
    bg: "linear-gradient(135deg,#F5F0E8 0%,#EDE8DC 100%)",
    palette: ["#F5F0E8", "#0a0a0a", "#D4A017", "#888"],
  },
  {
    id: "v3",
    component: PortfolioV3,
    label: "Terminal OS",
    tagline: "Retro · CRT · Phosphor Green",
    description:
      "A fake operating system — complete with BIOS boot sequence, CRT scanlines, task bar, system clock and collapsible project windows.",
    badge: "Memorable",
    emoji: "💻",
    accent: "#39ff6e",
    accent2: "#ffb830",
    bg: "linear-gradient(135deg,#0a0e0a 0%,#050805 100%)",
    palette: ["#0a0e0a", "#39ff6e", "#ffb830", "#00ffe0"],
  },
  {
    id: "v4",
    component: PortfolioV4,
    label: "Bento Glass",
    tagline: "2025 Trend · Frosted Glass · Bento Grid",
    description:
      "Floating pill nav, frosted glass bento cards, noise texture overlay, spinning conic gradient avatar and a deep indigo-violet palette.",
    badge: "Trending ✦",
    emoji: "✨",
    accent: "#6366f1",
    accent2: "#8b5cf6",
    bg: "linear-gradient(135deg,#0f0c29 0%,#1a0533 50%,#0d1b3e 100%)",
    palette: ["#0f0c29", "#6366f1", "#8b5cf6", "#f43f5e"],
  },
];

// ── Tiny helpers ─────────────────────────────────────────────
function PaletteDots({ colors }) {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      {colors.map((c, i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: c,
            border: "1.5px solid rgba(255,255,255,0.12)",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

function LoadingFallback({ design }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: design.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        fontFamily: "system-ui,sans-serif",
      }}
    >
      {/* Spinning ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: `2px solid ${design.accent}22`,
          borderTop: `2px solid ${design.accent}`,
        }}
      />
      <p
        style={{
          fontFamily: "monospace",
          fontSize: 12,
          letterSpacing: "0.25em",
          color: design.accent,
          textTransform: "uppercase",
          opacity: 0.8,
        }}
      >
        Loading {design.label}…
      </p>
    </div>
  );
}

// ── Back button (rendered over each portfolio) ────────────────
function BackButton({ onBack, design }) {
  const [hovered, setHovered] = useState(false);
  const isDark =
    design.id !== "v2"; // v2 is light background

  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onBack}
      aria-label="Back to design selector"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        borderRadius: 999,
        border: `1px solid ${hovered ? design.accent : isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.16)"}`,
        background: isDark
          ? hovered
            ? `${design.accent}22`
            : "rgba(0,0,0,0.55)"
          : hovered
          ? `${design.accent}18`
          : "rgba(255,255,255,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        cursor: "pointer",
        fontFamily: "system-ui,sans-serif",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.06em",
        color: hovered
          ? design.accent
          : isDark
          ? "rgba(255,255,255,0.8)"
          : "rgba(0,0,0,0.7)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        transition: "all 0.18s ease",
      }}
    >
      <motion.span animate={{ x: hovered ? -3 : 0 }} transition={{ duration: 0.18 }}>
        ←
      </motion.span>
      All Designs
    </motion.button>
  );
}

// ── Design card ───────────────────────────────────────────────
function DesignCard({ design, index, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const isLight = design.id === "v2";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.015 }}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid ${hovered ? `${design.accent}55` : "rgba(255,255,255,0.08)"}`,
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        cursor: "pointer",
        position: "relative",
        transition: "border-color 0.25s ease",
      }}
      onClick={() => onSelect(design.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(design.id)}
      aria-label={`View ${design.label} portfolio design`}
    >
      {/* Accent bar top */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${design.accent}, ${design.accent2})`,
        }}
      />

      {/* Hover glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 55% 40% at 50% 0%, ${design.accent}14, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Mini preview strip */}
      <div
        style={{
          height: 80,
          background: design.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span style={{ fontSize: 32, zIndex: 1 }}>{design.emoji}</span>
        {/* Decorative dots */}
        <div style={{ position: "absolute", top: 8, left: 10, display: "flex", gap: 5 }}>
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 40%, rgba(10,10,16,0.6) 100%)`,
          }}
        />
      </div>

      {/* Card body */}
      <div style={{ padding: "20px 24px 24px" }}>
        {/* Title row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3
              style={{
                fontFamily: "system-ui,sans-serif",
                fontSize: 17,
                fontWeight: 800,
                color: "#f1f5f9",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {design.label}
            </h3>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 99,
                background: `${design.accent}1a`,
                color: design.accent,
                border: `1px solid ${design.accent}33`,
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              {design.badge}
            </span>
          </div>
          <motion.span
            animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.18 }}
            style={{ fontSize: 18, color: design.accent, flexShrink: 0 }}
          >
            →
          </motion.span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            color: "#64748b",
            letterSpacing: "0.05em",
            marginBottom: 12,
          }}
        >
          {design.tagline}
        </p>

        {/* Description */}
        <p
          style={{
            fontFamily: "system-ui,sans-serif",
            fontSize: 13,
            color: "#94a3b8",
            lineHeight: 1.65,
            marginBottom: 18,
          }}
        >
          {design.description}
        </p>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "#475569" }}>Palette</span>
            <PaletteDots colors={design.palette} />
          </div>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(design.id);
            }}
            style={{
              fontFamily: "system-ui,sans-serif",
              fontWeight: 700,
              fontSize: 12,
              padding: "8px 18px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.05em",
              background: `linear-gradient(135deg, ${design.accent}, ${design.accent2})`,
              color: design.id === "v2" ? "#0a0a0a" : "#fff",
              boxShadow: `0 4px 18px ${design.accent}35`,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Open →
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

// ── Home / Selector screen ────────────────────────────────────
function HomeScreen({ onSelect }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #060612 0%, #0c0720 45%, #060612 100%)",
        fontFamily: "system-ui,sans-serif",
        color: "#f1f5f9",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient orbs */}
      {[
        { color: "#6366f1", size: 520, top: "-5%",  left: "-8%",  opacity: 0.11 },
        { color: "#f43f5e", size: 420, top: "25%",  right: "-6%", opacity: 0.09 },
        { color: "#8b5cf6", size: 360, bottom:"5%", left: "30%",  opacity: 0.07 },
      ].map((o, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            width: o.size,
            height: o.size,
            borderRadius: "50%",
            background: o.color,
            filter: "blur(110px)",
            opacity: o.opacity,
            pointerEvents: "none",
            zIndex: 0,
            top: o.top,
            left: o.left,
            right: o.right,
            bottom: o.bottom,
          }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1080,
          margin: "0 auto",
          padding: "80px 24px 60px",
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              borderRadius: 999,
              border: "1px solid rgba(139,92,246,0.3)",
              background: "rgba(139,92,246,0.1)",
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#8b5cf6",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8b5cf6",
              }}
            >
              Portfolio Design Studio
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(40px,7vw,80px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: "0 0 20px",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg,#ffffff 30%,#8b5cf6 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}
            >
              John Doe
            </span>
            <span
              style={{
                background: "linear-gradient(135deg,#6366f1,#f43f5e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}
            >
              Portfolio
            </span>
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "#94a3b8",
              maxWidth: 460,
              margin: "0 auto 10px",
              lineHeight: 1.7,
            }}
          >
            4 unique design styles, one developer. Pick a style and explore the full portfolio.
          </p>
          <p style={{ fontFamily: "monospace", fontSize: 12, color: "#475569" }}>
            Technical Lead · Angular · React · Ionic · 7+ years
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(460px,1fr))",
            gap: 18,
            marginBottom: 52,
          }}
        >
          {DESIGNS.map((d, i) => (
            <DesignCard key={d.id} design={d} index={i} onSelect={onSelect} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: 12,
            color: "#334155",
          }}
        >
          All designs built with React + Framer Motion · Same résumé data, four different visual identities
        </motion.p>
      </div>

      {/* Keyframes for pulse */}
      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; }
          50%      { opacity:0.4; }
        }
      `}</style>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────
export default function App() {
  const [current, setCurrent] = useState("home"); // "home" | "v1" | "v2" | "v3" | "v4"

  // Scroll to top whenever we switch view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [current]);

  const design = DESIGNS.find((d) => d.id === current);

  return (
    <AnimatePresence mode="wait">
      {current === "home" ? (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <HomeScreen onSelect={setCurrent} />
        </motion.div>
      ) : (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative" }}
        >
          {/* Lazy-loaded portfolio */}
          <Suspense fallback={<LoadingFallback design={design} />}>
            {current === "v1" && <PortfolioV1 />}
            {current === "v2" && <PortfolioV2 />}
            {current === "v3" && <PortfolioV3 />}
            {current === "v4" && <PortfolioV4 />}
          </Suspense>

          {/* Back button always on top */}
          <BackButton onBack={() => setCurrent("home")} design={design} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
