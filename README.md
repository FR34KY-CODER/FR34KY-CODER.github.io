# Ojasvi Goyal — Four Disciplines Under One Hood

> **AI Engineering · Backend Architecture · Data Science · ML Systems**  
> An interactive, narrative-driven portfolio inspired by the architectural split-screen aesthetic of `devinthehood.com`, featuring a continuous 3D WebGL developer actor, live interactive knowledge graphs, and deterministic conversational search.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.3.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1.6-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187.0-black?style=flat&logo=three.js)](https://threejs.org/)
[![React Flow](https://img.shields.io/badge/React_Flow-12.12.1-FF0072?style=flat)](https://reactflow.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?style=flat&logo=greensock)](https://greensock.com/gsap/)

---

## 📸 Visual Showcase & Screen Placeholders

<!-- 
NOTE FOR MAINTAINER:
When you have finalized your site's visual theme, place your screenshots in `./docs/screenshots/`
and uncomment/update the image links below.
-->

### 1. Hero 4-Quadrant Split & Clock Sweeper
Inspired by `devinthehood.com`, splitting the screen into 4 hairline quadrants with ambient background knowledge graphs and the central headline *"Four disciplines. Built together."*

```markdown
<!-- Replace with: ![Hero 4-Quadrant Overview](./docs/screenshots/01-hero-overview.png) -->
```
> **[ SCREENSHOT PLACEHOLDER: Hero 4-Quadrant View ]**  
> *Recommended size: 1920×1080 · Captures: Top-Left AI Engineer, Top-Right Backend Developer, Bottom-Left Data Scientist, Bottom-Right ML Engineer with central 3D developer and sweeping clock hands.*

---

### 2. Interactive Discipline Arena & Full React Flow Graph
Expanding any of the 4 quadrants triggers an arena takeover with draggable nodes, active edge animations, and the 3D developer on a dedicated stage.

```markdown
<!-- Replace with: ![Fullpage Discipline React Flow](./docs/screenshots/02-discipline-knowledge-graph.png) -->
```
> **[ SCREENSHOT PLACEHOLDER: Discipline Takeover & React Flow Graph ]**  
> *Recommended size: 1920×1080 · Captures: Draggable project/skill nodes, custom category badges, and active stage companion.*

---

### 3. The Street — 3D Cyclist & Project Storefronts (`#the-street`)
As you scroll down the street, the 3D developer rides a road bike directly along the asphalt road using analytical 2-bone inverse kinematics synchronized with scroll velocity.

```markdown
<!-- Replace with: ![The Street Cyclist](./docs/screenshots/03-the-street-cyclist.png) -->
```
> **[ SCREENSHOT PLACEHOLDER: The Street & 3D Road Cyclist ]**  
> *Recommended size: 1920×1080 · Captures: Asphalt road, red/black striped storefronts, live hover speech bubbles, and pedaling developer.*

---

### 4. The Factory — Production Line & Graduation Stage (`#the-factory`)
The conveyor belt carries system modules under the press while the 3D developer dons a mortarboard graduation cap and diploma.

```markdown
<!-- Replace with: ![The Factory Floor](./docs/screenshots/04-factory-floor.png) -->
```
> **[ SCREENSHOT PLACEHOLDER: The Factory Conveyor Floor ]**  
> *Recommended size: 1920×1080 · Captures: Conveyor belt, module cards, animated hazard belt, and graduate 3D developer.*

---

### 5. Workstation Desk & Deterministic DevBot Console
A dual-monitor workstation where the developer sits at the desk, powered by a deterministic regex-routed command engine (`/project <name>`, `/skill <name>`, `/contact`).

```markdown
<!-- Replace with: ![DevBot Terminal Workstation](./docs/screenshots/05-devbot-workstation.png) -->
```
> **[ SCREENSHOT PLACEHOLDER: DevBot Workstation & Terminal ]**  
> *Recommended size: 1920×1080 · Captures: Dual-monitor desk setup, glowing CRT terminals, and interactive query drawer.*

---

### 6. Responsive Mobile Viewport
Fully fluid layout with horizontal overflow protection, touch controls, and compact character staging.

```markdown
<!-- Replace with: ![Mobile Viewport](./docs/screenshots/06-mobile-view.png) -->
```
> **[ SCREENSHOT PLACEHOLDER: Mobile Viewport (390px) ]**  
> *Recommended size: 390×844 · Captures: Responsive navigation header, achievement pills, and stacked discipline preview.*

---

## ⚡ Core Features

- **Four-Quadrant Clock Navigation**: Sweeping clock dial that clocks through `01 AI Engineer`, `02 Backend Developer`, `03 Data Scientist`, and `04 ML Engineer`, or expands any quadrant into a full-page arena.
- **Continuous 3D WebGL Character (Three.js)**: A single persistent 3D human developer with streetwear hoodie, headphones, and glasses morphing across 6 distinct stage postures (center hub, leashed companion, mechanic rig, road bicycling, graduation, and desk workstation).
- **Analytical 2-Bone Cycling Inverse Kinematics**: Physically grounded pedaling kinematics solving hip-to-pedal stroke in real time as the user scrolls through `#the-street`.
- **Live Interactive Knowledge Graphs (`@xyflow/react`)**: Interactive node-graph visualization of domain relationships, skill clusters, and project case studies.
- **Deterministic Natural Language DevBot**: Fast, zero-API-cost query parser matching commands and natural language requests (`/project`, `/skill`, `/edu`, `/achievements`, `/contact`).
- **Client-Side Code-Splitting**: Heavy WebGL and graph libraries are dynamically loaded via `next/dynamic` with `ssr: false`, keeping initial load JS under 188 kB.
- **Dual Email Dispatch**: Contact form supports authenticated Gmail/SMTP via Nodemailer with transparent fallback to Resend API.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack, SSR/SSG) |
| **UI Library** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS |
| **3D & WebGL** | [Three.js](https://threejs.org/) (Procedural human mesh, drop-bar bike, PBR materials, analytical IK) |
| **Node Graphs** | [@xyflow/react](https://reactflow.dev/) (Interactive node canvases & bezier curves) |
| **Animation** | [GSAP](https://greensock.com/gsap/) + ScrollTrigger + Custom requestAnimationFrame render loop |
| **Icons & Design** | [Lucide React](https://lucide.dev/), Custom SVG iconography, Devinthehood styling |
| **Contact API** | [Nodemailer](https://nodemailer.com/), [Resend](https://resend.com/), [Zod](https://zod.dev/) |

---

## 📁 Project Structure

```text
portfoolio-website/
├── docs/
│   └── screenshots/              # Store your screenshots here
├── public/                       # Static public assets (SVGs, icons, logos)
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind v4 theme variables & utilities
│   │   ├── layout.tsx            # Root layout with font definitions & chrome
│   │   ├── page.tsx              # Home page assembling all chapters
│   │   ├── contact/              # Interactive contact page
│   │   ├── work/                 # Work archive & filtered case studies
│   │   │   └── [slug]/           # Dynamic project case study pages
│   │   └── api/
│   │       └── contact/          # Email dispatch API (SMTP / Resend)
│   ├── components/
│   │   ├── chrome/               # Global persistent UI (Header, Cursor, Preloader,
│   │   │                         #  PersistentMorphActor, MorphingThreeCharacter)
│   │   ├── home/                 # Chapter sections (TwoSides hero, Street,
│   │   │                         #  Factory, UnderHood, Missions, Finale, RoleKnowledgeGraph)
│   │   └── work/                 # Case study presentation components
│   ├── context/
│   │   └── RoleContext.tsx       # Global role, stage mode, and character mood state
│   ├── data/
│   │   ├── profile.ts            # Bio, education, resume achievements, socials
│   │   ├── roles.ts              # 4 core disciplines specifications
│   │   ├── projects.ts           # Case studies with problem/idea/impact
│   │   └── knowledgeGraph.ts     # Node-edge topology for each discipline
│   └── lib/
│       ├── devbotEngine.ts       # Deterministic query resolution engine
│       ├── navigation.ts         # Smooth scroll and page transition orchestrator
│       └── utils.ts              # Class merging and formatting helpers
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.18.0 or higher (v20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 1. Clone & Install
```bash
git clone https://github.com/FR34KY-CODER/portfolio-website.git
cd portfolio-website
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your contact form delivery settings in `.env.local`:
```env
# Option 1 (Primary): SMTP via Gmail / Nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password

# Inbox recipient
CONTACT_TO_EMAIL=your_email@gmail.com
CONTACT_FROM_NAME=Your Portfolio

# Option 2 (Fallback): Resend API
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🧪 Verification & Quality Checks

Run the verification pipeline to ensure zero type errors or lint warnings:

```bash
# Type check TypeScript
npx tsc --noEmit

# Lint code with Next.js ESLint configuration
npm run lint

# Clean build and compile static pages
npm run build
```

---

## 👤 Author & Links

**Ojasvi Goyal** (`FR34KY-CODER`)  
*AI & Data Science Engineer · Jaipur, India*

- **GitHub**: [@FR34KY-CODER](https://github.com/FR34KY-CODER)
- **LinkedIn**: [Ojasvi Goyal](https://linkedin.com/in/ojasvi-goyal)
- **LeetCode**: [@DSA_FR34K](https://leetcode.com/u/DSA_FR34K/)
- **Kaggle**: [@ojasvigoyal](https://kaggle.com/ojasvigoyal)
- **Medium**: [@ojasvigoyal](https://medium.com/@ojasvigoyal)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

