# 🎨 John Doe — Multi-Design Portfolio

> **One developer. Four unique visual identities. One selector hub.**
>
> A showcase of 4 completely different portfolio design styles built with **React** and **Framer Motion** — all powered by the same résumé data, navigable from a single home screen.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Designs](#-live-designs)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Design Details](#-design-details)
  - [V1 — Dark Neon](#v1--dark-neon)
  - [V2 — Editorial Brutalist](#v2--editorial-brutalist)
  - [V3 — Terminal OS](#v3--terminal-os)
  - [V4 — Bento Glass](#v4--bento-glass)
- [Common App Hub](#-common-app-hub)
- [Sections Included](#-sections-included)
- [Known Fixes Applied](#-known-fixes-applied)
- [Customisation Guide](#-customisation-guide)
- [Deployment](#-deployment)
- [Dependencies](#-dependencies)
- [Author](#-author)

---

## 🧭 Overview

This project is a **multi-design portfolio system** where a central home screen (`App.jsx`) lets visitors choose between 4 visually distinct portfolio styles. Each style is a fully self-contained React component lazy-loaded on demand, so the initial bundle stays lean.

```
Home Screen (Design Selector)
        │
        ├── V1  Dark Neon          →  Portfolio.jsx
        ├── V2  Editorial          →  Portfolio_v2.jsx  (fixed)
        ├── V3  Terminal OS        →  Portfolio_v3.jsx
        └── V4  Bento Glass 2025  →   Portfolio_v4.jsx
```

Every design contains the **same 8 sections**:
`About / Hero` · `Skills` · `Experience` · `Projects` · `Education` · `Contact`

---

## ✨ Live Designs

| # | Name | Vibe | Accent Colors |
|---|------|------|---------------|
| V1 | **Dark Neon** | Futuristic · Space · Glassmorphism | `#00f5ff` · `#7c3aed` · `#f472b6` |
| V2 | **Editorial** | Print · Brutalist · Warm Cream | `#F5F0E8` · `#0a0a0a` · `#D4A017` |
| V3 | **Terminal OS** | Retro · CRT · Phosphor Green | `#39ff6e` · `#ffb830` · `#00ffe0` |
| V4 | **Bento Glass** | 2025 Trend · Frosted Glass · Grid | `#6366f1` · `#8b5cf6` · `#f43f5e` |

---

## 📁 Project Structure

```
portfolio/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── App.jsx                        # 🏠 Home selector hub — entry point
│   │
│   ├── Portfolio.jsx                  # 🌌 V1 — Dark Neon
│   ├── Portfolio_v2.jsx               # 📰 V2 — Editorial Brutalist (fixed)
│   ├── Portfolio_v3.jsx               # 💻 V3 — Terminal OS
│   ├── Portfolio_v4.jsx               # ✨ V4 — Bento Glass 2025
│   │
│   ├── main.jsx                       # React DOM entry point
│   └── index.css                      # Global resets (optional)
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Framer Motion** | All animations — fade, slide, stagger, hover, scroll |
| **Vite** | Build tool & dev server |
| **Pure Inline Styles** | Zero CSS dependency — no Tailwind, no CSS modules needed |

> ⚠️ **No Tailwind CSS required.** All four portfolios use pure inline `style={{}}` objects. Drop any file into any React project and it works.

---

## 🚀 Getting Started

### 1. Clone or download

```bash
# If using git
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Or unzip the downloaded archive
unzip portfolio_source.zip
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

Only **one** runtime dependency is needed:

```bash
npm install framer-motion
```

### 3. Add your files

Place all five files in `src/`:

```
src/
├── App.jsx                      ← common hub (entry point)
├── Portfolio.jsx                ← V1
├── Portfolio_v2.jsx             ← V2 (use the _fixed version)
├── Portfolio_v3.jsx             ← V3
├── Portfolio_v4.jsx             ← V4
└── main.jsx
```

### 4. Update `main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🎨 Design Details

---

### V1 — Dark Neon

**File:** `Portfolio.jsx`

> Deep space dark theme with cyan-to-violet gradients, an animated rotating avatar ring, staggered skill bars, parallax hero and glowing cards.

**Key Features:**
- 🌀 Spinning conic-gradient avatar ring (CSS animation)
- ✍️ Rotating role titles with `AnimatePresence` swap
- 📊 Animated skill progress bars triggered on scroll
- 🗂 Alternating timeline for experience section
- 🃏 Project cards with per-color glow blob on hover
- 🖱 Hero text parallax on scroll using `useScroll` + `useTransform`
- 📱 Responsive hamburger menu for mobile

**Color Palette:**

```
Background  #050d1a
Cyan        #00f5ff
Violet      #7c3aed
Pink        #f472b6
Emerald     #34d399
Text        #f1f5f9
```

**Animations used:**
- `motion.div` stagger on hero stats
- `useInView` scroll-triggered fade-up on every section
- `AnimatePresence` for rotating words and mobile menu
- `useScroll` + `useTransform` for hero parallax

---

### V2 — Editorial Brutalist

**File:** `Portfolio_v2.jsx` *(use the fixed version)*

> Warm parchment background, Playfair Display serif, thick `2px` ink-black borders, hover-invert rows — magazine layout meets brutalist design.

**Key Features:**
- 📰 Animated ticker tape running across the page
- 🔲 Scroll progress bar pinned to top (`scaleX` transform)
- 🖱 Experience rows invert to black on hover
- 🎛 Skill filter buttons (All / Frontend / Mobile / Backend / Tools)
- 📐 Bordered cell grid for skills with `AnimatePresence` filter transitions
- 🖱 Project cards invert black on hover with sliding arrow
- 📝 Editorial 12-column hero grid with stat cells

**Color Palette:**

```
Background  #F5F0E8  (warm parchment)
Ink         #0a0a0a
Gold        #D4A017
Muted       #888888
```

**Animations used:**
- `motion.div` layout animation on skill filter
- `AnimatePresence` for skill card mount/unmount
- `useScroll` + `useTransform` for scroll progress bar
- `whileHover` invert on project and experience rows

**Bugs Fixed (v2):**
- ✅ All Tailwind classes → pure inline styles
- ✅ Duplicate `animate` prop on `ProjectCard` (cards were invisible)
- ✅ `Reveal` wrapper removed from `ProjectCard` (broke grid borders)
- ✅ `group-hover:text-amber-400` Tailwind class → React state hover
- ✅ Dead `last` prop removed
- ✅ `id="Education"` added to Education section

---

### V3 — Terminal OS

**File:** `Portfolio_v3.jsx`

> A fully simulated operating system — complete with BIOS boot sequence, CRT scanline overlay, sticky taskbar, live system clock and collapsible project file windows.

**Key Features:**
- 🖥 **Boot sequence** — BIOS-style animation on first load before UI appears
- 📺 **CRT scanlines** — repeating CSS gradient overlay across the entire viewport
- 🗂 **Fake OS taskbar** — section navigation styled as OS tabs with active state
- 🕐 **Live clock** — real-time `HH:MM:SS` in the taskbar
- 📁 **Collapsible project windows** — click `▶` to expand `cat README.md` output
- 📊 **Block-character skill bars** — `████░░░░` style using Unicode characters
- 📋 **Experience as process table** — PID, Company, Role, Period, Status columns

**Color Palette:**

```
Background    #0a0e0a
Phosphor Green  #39ff6e
Amber         #ffb830
Cyan          #00ffe0
Magenta       #ff2d78
Text          #b8f0c8
```

**Animations used:**
- `AnimatePresence` for section switching (SPA-style)
- `motion.div` stagger on boot lines
- `AnimatePresence` height animation on collapsible project windows
- `useInView` on skill bars

---

### V4 — Bento Glass 2025

**File:** `Portfolio_v4.jsx`

> The dominant 2025 design trend — frosted glass bento grid cards, floating pill navbar, noise texture overlay, spinning conic avatar ring and deep indigo space palette.

**Key Features:**
- 💊 **Floating pill navbar** — centered, detaches from top, frosts on scroll
- 🌀 **Spinning conic avatar** — continuously rotating iridescent ring
- 🟦 **Bento stat grid** — 4-column metric cards with gradient numbers
- 🃏 **Glassmorphism cards** — `backdrop-filter: blur(20px)` on all cards
- 🌫 **Noise texture overlay** — SVG fractalNoise grain for tactile depth
- 💡 **Per-color project glow** — radial glow matching each project's accent
- ✦ **Stack icon chips** — hoverable tech icons with accent borders
- 🟢 **Live availability pulse dot** — glowing dot on current job

**Color Palette:**

```
Background  #0f0c29 → #1a0533 → #0d1b3e  (gradient)
Indigo      #6366f1
Violet      #8b5cf6
Rose        #f43f5e
Amber       #f59e0b
Emerald     #10b981
Cyan        #06b6d4
```

**Animations used:**
- `useScroll` + `useMotionValueEvent` for navbar frost effect
- `useInView` scroll-triggered reveals on all sections
- `motion.div` spring hover on bento cards
- `AnimatePresence` not required — all in single page scroll

---

## 🏠 Common App Hub

**File:** `App.jsx`

The selector home screen that connects all four designs.

**Features:**
- 🌌 Deep space background with ambient glow orbs and grid pattern
- 🃏 4 design cards with mini preview strip, palette swatches, badge and description
- ⚡ `React.lazy` + `Suspense` — each portfolio loads **only when clicked**
- 🌀 Per-design loading spinner shown while lazy chunk downloads
- ← **Back button** — fixed bottom-right, adapts color for light (V2) vs dark themes
- 🔄 `AnimatePresence` — smooth fade+slide transition between home and designs
- ⌨️ Keyboard accessible — `tabIndex`, `role="button"`, Enter/Space support
- 📜 Scroll reset — `window.scrollTo(0,0)` on every navigation

---

## 📄 Sections Included

All four designs include these sections:

| Section | Description |
|---|---|
| **Hero / About** | Name, animated role title, bio, CTA buttons, key stats |
| **Skills** | All 11 technologies with visual level indicators |
| **Experience** | 6 companies from 2017 to present, timeline or table style |
| **Projects** | 5 featured projects with tech stack, descriptions and metrics |
| **Education** | B.E. Computer Science + Higher Secondary |
| **Contact** | Email, phone, location — with direct mailto link |

---

## 🔧 Known Fixes Applied

### `Portfolio_fixed.jsx` (V1 fixed version)
- All Tailwind utility classes replaced with inline styles
- Duplicate `animate` prop on `ProjectCard` merged into one (cards were invisible)

### `Portfolio_v2_fixed.jsx` (V2 fixed version)
- All Tailwind utility classes replaced with inline styles
- `Reveal` wrapper removed from `ProjectCard` — was breaking CSS grid border logic
- Duplicate `animate` prop on `ProjectCard` fixed (selected work was empty)
- `group-hover:text-amber-400` Tailwind class → React `useState` hover
- Dead `last` prop removed from `ProjectCard`
- `id="Education"` added to Education section

---

## ✏️ Customisation Guide

### Update your personal info

Each portfolio file has a data block at the top. Edit these constants:

```js
// In any portfolio file — update the data at the top

const PERSONAL = {
  name:     'Your Name',
  tagline:  'Your Title',
  bio:      'Your bio...',
  email:    'you@email.com',
  phone:    '+91 XXXXXXXXXX',
  location: 'Your City, Country',
}

const SKILLS = [
  { name: 'React', level: 90, color: '#06b6d4' },
  // ...add or remove skills
]

const EXPERIENCE = [
  {
    company: 'Company Name',
    role:    'Your Role',
    period:  'Jan 2023 – Present',
    // ...
  },
]
```

### Change colors

Each file has a color token object at the top:

```js
// V1
const T = {
  cyan:   '#22d3ee',   // ← change to your accent
  violet: '#8b5cf6',
  // ...
}

// V4
const G = {
  indigo: '#6366f1',   // ← change to your accent
  violet: '#8b5cf6',
  // ...
}
```

### Add a new design

1. Create `YourPortfolio.jsx` with a default export
2. Add a lazy import in `App.jsx`:
   ```js
   const PortfolioV5 = lazy(() => import('./YourPortfolio'))
   ```
3. Add an entry to the `DESIGNS` array in `App.jsx`
4. Add the render case in the `AnimatePresence` block

---

## 🚢 Deployment

### Vercel (recommended — free)

```bash
npm run build

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect the repo at [vercel.com](https://vercel.com) — auto-deploys on every push.

### Netlify

```bash
npm run build
# Drag and drop the `dist/` folder at netlify.com/drop
```

### GitHub Pages

```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

npm run build
npm run deploy
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react":        "^18.x",
    "react-dom":    "^18.x",
    "framer-motion": "^11.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x"
  }
}
```

Install with:

```bash
npm install
# or
npm install framer-motion
```

**No other dependencies required.** No Tailwind, no CSS frameworks, no icon libraries.

---

## 👤 Author

**John Doe**
Technical Lead & Senior Frontend Engineer

| Contact | Details |
|---|---|
| 📧 Email | johndoe@gmail.com |
| 📱 Phone | +91 6463665643 |
| 📍 Location | Pune, Maharashtra, India |
| 💼 Experience | 7+ years |
| 🔧 Specialities | Angular · React · Ionic · TypeScript · Node.js |

---

## 📃 License

This project is for personal portfolio use. Feel free to use it as a template and adapt it to your own brand.

---

<div align="center">

**Built with React + Framer Motion**

*Four designs. One developer. Infinite possibilities.*

</div>
