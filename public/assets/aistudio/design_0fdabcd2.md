# SPENTA — Intelligent Reality | Investor Briefing & Master SSOT
## Comprehensive System Architecture, Visual Design & Functional Specification (`design.md`)

> **Target Audience**: AI Coding Agents, Senior Full-Stack Engineers, and UI/UX Architects tasked with reproducing, maintaining, or extending the exact **Spenta Intelligent Reality Investor Briefing & Strategic Single Source of Truth (SSOT)** web application.

---

## 1. Executive Overview & Product Identity

### 1.1 Product Purpose
**SPENTA — Intelligent Reality | Investor Master SSOT** is a high-density, institutional-grade interactive investor briefing and commercial diligence portal for **Spenta Inc.**, an enterprise **Spatial Computing (XR)** and **Physical AI** venture operating under a **Dual-Shore Delaware C-Corp structure**:
- **San Jose, California (USA)**: Executive leadership, enterprise sales, client strategy, and Silicon Valley investor relations.
- **Dhaka (Bangladesh)**: 24/7 deep-tech engineering studio delivering AAA 3D pipelines, WebXR/UE5 simulation, and self-hosted AI/OCR systems at an **8:1 structural cost advantage**.
- **Sydney / APAC Expansion**: Targeted Australian commercial pilot pipeline (8 pilots in Mining, Healthcare, and Banking).

### 1.2 Core Business & Investment Parameters (Single Source of Truth)
- **Seed Round Instrument**: Y Combinator Post-Money SAFE.
- **Target Seed Raise**: `$500,000 USD` (`61,305,000 ৳ BDT`).
- **Post-Money Valuation Cap**: `$4,500,000 USD` (`551,745,000 ৳ BDT`).
- **Conversion Discount**: `20.0%`.
- **18-Month Target**: `$60,000 USD` recurring ARR + 8 active Australian enterprise pilots.
- **Global Dual-Currency Engine**: Real-time toggle between `USD` (`$`) and `BDT` (`৳`) using fixed audited FX constant `USD_TO_BDT_RATE = 122.61` across every financial table, KPI card, chart, ROI calculator, PDF export, and AI thesis summary.
- **Global Dual View Mode**: Top-level toggle between **`Investor View`** (capital efficiency, SAFE terms, margin governance, TAM/ROI) and **`Partner View`** (technical deliverables, SLAs, enterprise case studies, deployment security).
- **Audited Margin Governance**: Strict gross margin discipline (`32.5%–45.0%`) and operating net margin (`18.0%–25.0%`) across 9 commercial tiers (Models A, B, and C).

---

## 2. Tech Stack, Dependencies & Full-Stack Architecture

### 2.1 Runtime & Build System
- **Frontend Framework**: React `19.0.1` + TypeScript `~5.8.2` + Vite `6.2.3`.
- **Styling Engine**: Tailwind CSS v4 (`@tailwindcss/vite` `4.1.14`, imported via `@import "tailwindcss";` in `/src/index.css`).
- **Full-Stack Server**: Express `4.21.2` (`server.ts`) running on **port `3000`** (`0.0.0.0`).
  - **Development (`npm run dev`)**: `tsx server.ts` mounts Vite in middleware mode (`createViteServer({ server: { middlewareMode: true }, appType: 'spa' })`) so both frontend SPA and `/api/*` endpoints run seamlessly on port `3000`.
  - **Production (`npm run build` / `npm start`)**: `vite build` outputs to `/dist`; `node --import tsx server.ts` serves static files from `/dist` with SPA fallback to `dist/index.html`.
- **Linting / Typechecking (`npm run lint`)**: `tsc --noEmit`.

### 2.2 Complete Package Manifest (`package.json`)
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react`, `react-dom` | `^19.0.1` | Core SPA UI framework |
| `express` | `^4.21.2` | Backend HTTP server & `/api/*` proxy |
| `@google/genai` | `^3.6.1` | Official Google GenAI SDK (server-side only in `server.ts`) |
| `three` / `@types/three` | `^0.185.1` / `^0.185.4` | Procedural 3D WebGL scenes (`Spatial3DCanvas`, `DualShoreGlobeSection`, `ArSpatialViewer`) |
| `d3` / `@types/d3` | `^7.9.0` / `^7.4.3` | Force-directed Value Exchange graph, ROI Sensitivity 5-Yr Area Chart, Investor Intelligence Dashboard charts, Feedback Sentiment & Heatmap visualizations |
| `recharts` | `^3.10.1` | Market Shift growth curves, Unit Economics waterfall/bar charts, Investment Terms capital allocation donut |
| `motion` | `^12.23.24` | `motion/react` animations (`AnimatePresence`, modals, popovers, transitions) |
| `lucide-react` | `^0.546.0` | High-density technical iconography across all components |
| `jspdf` | `^4.2.1` | Client-side 2-page dark-themed institutional PDF investor briefing generator |
| `html2canvas` | `^1.4.1` | DOM snapshot utilities for visual export workflows |
| `canvas-confetti` / `@types/canvas-confetti` | `^1.9.4` / `^1.9.0` | Micro-celebration feedback on diligence clarity submissions |
| `dotenv` | `^17.2.3` | Environment variable loading in `server.ts` |
| `tsx` (devDep) | `^4.21.0` | Direct TypeScript execution for `server.ts` |

> **Architectural Note on Three.js**: Vanilla `three` is intentionally used directly via React `useRef` + `useEffect` (with `RoomEnvironment` PMREM reflections, `ACESFilmicToneMapping`, and `SRGBColorSpace`) rather than `@react-three/fiber` to avoid React 19 peer dependency conflicts and preserve deterministic WebGL cleanup and frame-rate control.

---

## 3. Directory Structure & File Manifest

```text
/
├── index.html                           # Dark HTML entry point, Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono, Syne)
├── metadata.json                        # App metadata & capabilities
├── package.json                         # Dependencies and scripts (dev, build, start, lint)
├── server.ts                            # Full-stack Express + Vite server + POST /api/financial-summary (Gemini)
├── design.md                            # This master specification document
├── .env.example                         # Environment variable template (GEMINI_API_KEY)
└── src/
    ├── main.tsx                         # React DOM root mount
    ├── index.css                        # Tailwind v4 import + typography + HUD/CRT/3D utility classes
    ├── types.ts                         # Core TypeScript data contracts & USD_TO_BDT_RATE = 122.61
    ├── App.tsx                          # Root shell, global state, providers, deep-linking, hotkeys, all sections & modals
    ├── context/
    │   ├── SentimentContext.tsx         # 4-mode Investor Sentiment state, localStorage, CSS vars & #main-content filter
    │   └── ArPreviewContext.tsx         # Global AR 3D preview modal state & 6 ArModelPreset definitions
    ├── data/
    │   └── mockData.ts                  # SSOT datasets: FUSION_LAYERS, FINANCIAL_TIERS, CASE_STUDIES, NON_CLIENT_STREAMS, COMPETITOR_MATRIX
    ├── utils/
    │   └── pdfGenerator.ts              # 2-page A4 dark-mode jsPDF executive briefing exporter (USD/BDT aware)
    └── components/
        ├── SpentaLogo.tsx               # Official multi-gradient SVG logo (full wordmark & iconOnly variants)
        ├── GlobalLoadingScreen.tsx      # Initial telemetry boot sequence splash screen with SpentaLogo
        ├── ScrollProgressBar.tsx        # Fixed 2.5px top cyan-to-teal scroll progress indicator
        ├── Navbar.tsx                   # Fixed top glass navigation bar (mode toggle, FX toggle, deck/intel/data room/PDF/feedback)
        ├── BreadcrumbNav.tsx            # Sticky section context & quick-jump bar appearing on scroll > 80px
        ├── SidebarDock.tsx              # Right-edge floating spatial dock (scroll tube, quick links, Sentiment Dial, modal triggers)
        ├── InvestorSentimentWidget.tsx  # Interactive 4-state sentiment dial popover + toast notification
        ├── SectionMap.tsx               # Left-edge interactive node dependency map (search, filter, heatmap, focus, zoom, DnD pin)
        ├── ActiveTrackIndicator.tsx     # Bottom-left floating persona track HUD badge
        ├── AnomalyWatchToast.tsx        # Bottom-left financial anomaly alert toast (links to Unit Economics / Alt+A)
        ├── VoiceNavigator.tsx           # Bottom-right Web Speech API voice command assistant
        ├── CopyShareButton.tsx          # Deep-link URL generator (`?section=<id>#<id>`) with clipboard fallback
        ├── ArPreviewButton.tsx          # Reusable AR 3D launch button (`pill` | `button` | `compact`) in all 14 section headers
        ├── ArPreviewModal.tsx           # Floating fullscreen-capable AR 3D preview modal wrapper
        ├── ArSpatialViewer.tsx          # Procedural Three.js 6-preset 3D viewer (orbit, zoom, wireframe, AR passthrough, explode slider)
        ├── Spatial3DCanvas.tsx          # Hero section interactive Three.js spatial background canvas
        ├── MarketPulseCanvas.tsx        # Animated spectral pulse canvas for Market Shift & Macro Catalyst Overlay
        ├── MacroCatalystOverlay.tsx     # Interactive modal detailing 4 Big Tech hardware ecosystems + pulse speed controls
        ├── RoiSensitivitySlider.tsx     # D3.js 5-year ROI area chart with live Marketing & R&D cost delta sliders
        ├── FinancialSummaryGenerator.tsx# Auto-updating AI 1-paragraph investment thesis widget backed by /api/financial-summary
        ├── D3SentimentChart.tsx         # D3 donut/arc sentiment breakdown inside ExecutiveFeedbackDrawer
        ├── D3FeedbackHeatmap.tsx        # D3 section-by-priority feedback density heatmap inside ExecutiveFeedbackDrawer
        ├── FeedbackWidget.tsx           # Footer diligence clarity rating bar with canvas-confetti celebration
        ├── HeroSection.tsx              # Section 1  (#hero)
        ├── InvestorNewsTicker.tsx       # Marquee    (#investor-news-ticker)
        ├── DualEngineSection.tsx        # Section 2  (#dual-engines)
        ├── FusionStackSection.tsx       # Section 3  (#fusion-stack)
        ├── RdRoadmapSection.tsx         # Section 4  (#rd-roadmap)
        ├── MilestonesSection.tsx        # Section 5  (#milestones)
        ├── ValueExchangeSection.tsx     # Section 6  (#value-exchange)
        ├── MarketShiftSection.tsx       # Section 7  (#market-shift)
        ├── CaseStudiesSection.tsx       # Section 8  (#case-studies)
        ├── UnitEconomicsSection.tsx     # Section 9  (#unit-economics)
        ├── DualShoreGlobeSection.tsx    # Section 10 (#dual-shore-globe)
        ├── ExecutiveTeamSection.tsx     # Section 11 (#executive-team)
        ├── PassiveIPSection.tsx         # Section 12 (#passive-ip)
        ├── MoatAndBenchmarksSection.tsx # Section 13 (#moat-benchmarks)
        ├── InvestmentTermsSection.tsx   # Section 14 (#investment-terms)
        ├── Footer.tsx                   # Global Footer (#main-footer)
        ├── PitchDeckModal.tsx           # 12-Slide interactive fullscreen pitch deck with keyboard nav
        ├── DataRoomModal.tsx            # Searchable investor due-diligence document vault with section deep-links
        ├── ContactModal.tsx             # Encrypted executive inquiry form with auto-generated SPN-INQ-XXXX ticket
        ├── InvestorIntelligenceDashboard.tsx # Fullscreen D3.js institutional financial & scenario analytics dashboard
        ├── OnboardingWizardModal.tsx    # Investor persona selector tailoring reading track
        ├── OmniSearchModal.tsx          # Global Cmd/Ctrl+K / Alt+Q instant command & section search palette
        └── ExecutiveFeedbackDrawer.tsx  # Slide-over feedback ledger with priority tags, replies, and D3 analytics
```

---

## 4. Design System, Branding & Visual Tokens

### 4.1 Color Palette & Atmospheric Surfaces
- **Base Canvas (Obsidian / Deep Space)**: `#05070B` (App root), `#020617` (`body`, `slate-950`), `#070A10` (elevated modal panels).
- **Surface Layers**: `bg-slate-950/90`, `bg-slate-900/70`, `border-slate-800`, `backdrop-blur-md` / `backdrop-blur-xl`.
- **Primary Technical Accents**:
  - **Spatial Cyan**: `#06B6D4` / `#22D3EE` (`cyan-500` / `cyan-400`) — primary interactive focus, rings, telemetry, active buttons.
  - **Margin Emerald**: `#10B981` / `#34D399` (`emerald-500` / `emerald-400`) — gross/net profit, Dhaka hub, positive ROI delta, SLA verification.
  - **Neural Indigo / Purple**: `#6366F1` / `#A855F7` (`indigo-500` / `purple-500`) — AI/LLM layers, Model B tiers, R&D sliders.
  - **Warning Amber / Alert Rose**: `#F59E0B` (`amber-500`) & `#F43F5E` (`rose-500`) — CAC/Marketing controls, Anomaly Watch alerts, Conservative scenario.
- **Official Spenta Brand Gradient**: Deep emerald green (`#14A05C` → `#0F472E`) transitioning smoothly into crimson red (`#631525` → `#D8193E`).

### 4.2 Typography System (`index.html` & `src/index.css`)
- **Display & Headings (`--font-display`, `--font-heading`)**: `'Outfit'` (weights 300–900), tight tracking (`-0.025em` to `-0.03em`).
- **Body Copy (`--font-sans`)**: `'Plus Jakarta Sans'` (weights 300–800).
- **Technical Telemetry, KPIs & Badges (`--font-mono`)**: `'JetBrains Mono'` (weights 300–700).
- **Display Accent Font**: `'Syne'` (loaded via Google Fonts for high-impact display accents).

### 4.3 Official Spenta Logo Component (`SpentaLogo.tsx`)
Implemented as a crisp, scalable inline SVG with two rendering modes:
- **Full Wordmark (`iconOnly = false`, `viewBox="0 0 500 135"`)**:
  1. Left **Circuit-Leaf Emblem**: Organic leaf silhouette with emerald-to-crimson linear gradient (`#spentaLeafGrad`) and white internal circuit traces + 4 hollow terminal ring nodes.
  2. Custom geometric lowercase **`spenta`** wordmark:
     - `s`: vertical green gradient with right-extending thin circuit trace and hollow terminal ring.
     - `p`: rounded stem & bowl containing a miniature circuit-leaf counter (`#spentaPLeafGrad`) with scaled white traces and nodes.
     - `e`: stylized dual-leaf glyph (`#spentaELeafTop` upper leaf + `#05070B` vein cutout + `#0d3724` lower leaf base).
     - `n`: arch with downward circuit drop-trace and hollow ring on the left stem.
     - `t`: rounded vertical stem and crossbar.
     - `a`: green-to-crimson gradient loop (`#spentaAGrad`) enclosing a concentric solid gradient core circle.
  3. Optional `showTagline` prop renders `INTELLIGENT REALITY // XR & PHYSICAL AI` in `9px` mono cyan uppercase.
- **Icon-Only Emblem (`iconOnly = true`, `viewBox="0 0 110 110"`)**: Renders just the circuit-leaf mark.
- **Sizes**: `xs` (`h-6`), `sm` (`h-7`), `md` (`h-9`), `lg` (`h-12`), `xl` (`h-16`).
- **Placement Inventory**: `Navbar` (top-left brand link), `GlobalLoadingScreen` (center boot splash), `HeroSection` (executive briefing mark), `PitchDeckModal` (header & title/closing slides), `DataRoomModal` (vault header), `Footer` (brand column).

### 4.4 Custom CSS Utility Classes (`/src/index.css`)
- `.bg-grid-pattern`: 40×40px technical blueprint grid (`rgba(30, 41, 59, 0.25)`).
- `.bg-radial-cyan`: Soft radial cyan ambient spotlight.
- `.tech-border`, `.tech-border-cyan`, `.tech-border-emerald`, `.tech-border-purple`: Glassmorphic dark surfaces with colored translucent borders and `backdrop-filter: blur(8px)`.
- `.hud-corner`: Precision 6×6px glowing cyan corner brackets rendered via `::before` (top-left) and `::after` (bottom-right).
- `.crt-scanlines` & `.crt-beam`: Subtle scanline pattern and 6-second vertical sweeping beam (`@keyframes scanline-roll`).
- `.service-card-3d`: 3D perspective tilt card (`rotateX(2.8deg) rotateY(-3.2deg) translateY(-5px) scale(1.018)`) with masked cyan-to-purple gradient border illumination on hover.
- `.animate-data-flow`, `.animate-node-glow`, `.animate-value-pulse`: Telemetry dash flow, pulsing border glow, and value highlight animations.
- Custom 4px dark scrollbars (`::-webkit-scrollbar`) that glow cyan on hover.

### 4.5 Dynamic Sentiment Styling (`SentimentContext.tsx`)
Selecting an Investor Sentiment mutates `document.documentElement` and `#main-content` smoothly (`transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1)`):
| Sentiment ID | Name | Accent (`--sentiment-accent`) | Glow (`--sentiment-glow`) | `#main-content` Filter |
| :--- | :--- | :--- | :--- | :--- |
| `bullish` | Bullish Growth 🚀 | `#10b981` | `rgba(16, 185, 129, 0.35)` | `saturate(1.25) contrast(1.04)` |
| `cautious` (default) | Cautiously Optimistic ✨ | `#06b6d4` | `rgba(6, 182, 212, 0.3)` | `saturate(1.0) contrast(1.0)` |
| `neutral` | Neutral / Due Diligence ⚖️ | `#6366f1` | `rgba(99, 102, 241, 0.3)` | `saturate(0.88) contrast(1.02)` |
| `defensive` | Risk-Averse / Defensive 🛡️ | `#f59e0b` | `rgba(245, 158, 11, 0.35)` | `saturate(0.92) contrast(1.0)` |

---

## 5. Global State, Contexts, Deep Linking & Keyboard Shortcuts

### 5.1 Root State (`src/App.tsx`)
Wrapped in `<SentimentProvider>` → `<ArPreviewProvider>`. Root state manages:
- `currency: 'USD' | 'BDT'` (default `'USD'`).
- `globalViewMode: 'investor' | 'partner'` (default `'investor'`).
- `activePersona: InvestorPersona | null` (set via `OnboardingWizardModal`).
- `activeScenario: 'conservative' | 'base' | 'aggressive'` (default `'base'`, shared into `InvestorIntelligenceDashboard`).
- `contactInterestArea: string` (pre-populates `ContactModal` dropdown depending on which CTA triggered it).
- `comments: FeedbackComment[]` (persists session diligence comments, drives `SectionMarker` floating badges on sections, `SectionMap` comment heatmap, and `ExecutiveFeedbackDrawer` D3 analytics).
- Modal visibility booleans: `isPitchDeckOpen`, `isDataRoomOpen`, `isContactOpen`, `isIntelligenceOpen`, `isOnboardingOpen`, `isOmniSearchOpen`, `isFeedbackDrawerOpen`.

### 5.2 Deep Linking & Section Highlight Protocol
Every major section has a stable DOM `id` and a `CopyShareButton` that generates `?section=<id>#<id>`.
On initial load, `popstate`, keyboard shortcut `1–9`, `DataRoomModal` jump, or `SectionMap` click:
1. Locate element via `document.getElementById(targetId)`.
2. Call `el.scrollIntoView({ behavior: 'smooth', block: 'start' })`.
3. Apply temporary highlight ring:
   ```ts
   el.classList.add('ring-2', 'ring-cyan-400', 'ring-offset-4', 'ring-offset-[#05070B]', 'transition-all', 'duration-1000');
   setTimeout(() => {
     el.classList.remove('ring-2', 'ring-cyan-400', 'ring-offset-4', 'ring-offset-[#05070B]');
   }, 3000);
   ```

### 5.3 Global Keyboard Shortcuts
- **`1` through `9`** (ignored inside `<input>` / `<textarea>`): Smooth-scroll with 3s cyan highlight ring to:
  `1` `#hero`, `2` `#dual-engines`, `3` `#fusion-stack`, `4` `#rd-roadmap`, `5` `#case-studies`, `6` `#unit-economics`, `7` `#dual-shore-globe`, `8` `#executive-team`, `9` `#investment-terms`.
- **`Cmd/Ctrl + K`** or **`Alt + Q`** (or custom DOM event `open-omni-search`): Opens `OmniSearchModal`.
- **`Alt + A`**: Opens the Anomaly Watch alert drawer in `UnitEconomicsSection`.
- **`Escape`**: Closes whichever modal/drawer is currently open (`ArPreviewModal`, `ContactModal`, `PitchDeckModal`, `DataRoomModal`, `OmniSearchModal`, etc.).
- **`ArrowLeft` / `ArrowRight` / `Space`**: Navigates slides inside `PitchDeckModal`.

---

## 6. Persistent Chrome, Navigation & Floating HUD Overlays

1. **`GlobalLoadingScreen.tsx`**: Fullscreen boot sequence on initial mount displaying `SpentaLogo`, simulated telemetry module checks (WebXR runtime, 6-layer stack, Dual-Shore sync, FX feed), animated progress bar, and clean fade-out.
2. **`ScrollProgressBar.tsx`**: Fixed `z-[70]` top `2.5px` horizontal gradient bar (`from-cyan-500 via-sky-400 to-teal-300`) tracking `window.scrollY / (scrollHeight - innerHeight)`.
3. **`Navbar.tsx`**: Fixed top glass navigation bar containing:
   - Official `SpentaLogo` (clicks scroll to top).
   - **Global View Mode Switcher** (`Investor` vs `Partner`).
   - **Currency Switcher** (`USD $` vs `BDT ৳` @ 122.61).
   - **Omni-Search Trigger** (`Cmd/Ctrl+K`).
   - Action cluster: **Feedback Drawer** button, **Download PDF Briefing** (`generateBriefingPdf(currency)`), **12-Slide Pitch Deck**, **D3 Intel Dashboard**, and **Data Room** button, plus responsive mobile menu drawer.
4. **`BreadcrumbNav.tsx`**: Sticky sub-header below `Navbar` (visible when `window.scrollY > 80`) displaying current active section title, section index, quick-jump dropdown, and active reading context.
5. **`SidebarDock.tsx` + `InvestorSentimentWidget.tsx`** (Right-edge fixed vertical dock, hidden on small screens):
   - Vertical scroll progress percentage tube (`0%–100%`).
   - Quick-jump icon buttons for core sections (`Hero`, `Dual Engines`, `6-Layer Stack`, `Unit Economics`, `Dual-Shore Globe`, `SAFE Terms`).
   - **`InvestorSentimentWidget`**: Circular trigger displaying current sentiment emoji + glowing status dot. Clicking opens a `w-80` HUD popover to the left showing Active State summary, 4 selectable sentiment cards (`Bullish Growth`, `Cautiously Optimistic`, `Neutral / Due Diligence`, `Risk-Averse / Defensive`), current CSS saturation readout, and an ephemeral bottom-center toast confirmation on change. Persists selection to `localStorage['spenta-investor-sentiment']`.
   - Modal quick launchers: Onboarding Wizard, 12-Slide Deck, Data Room, Contact Founders, and Scroll-to-Top button.
6. **`SectionMap.tsx`** (Left-edge collapsible interactive architecture minimap):
   - Toggle button (`Map` icon from `lucide-react`) expands a floating panel visualizing all major briefing sections as interconnected nodes with animated SVG dependency flow lines.
   - **Click Handler**: Clicking any section node sets `activeSection(id)`, smoothly scrolls to `document.getElementById(id)`, and applies the exact 3-second `ring-2 ring-cyan-400 ring-offset-4 ring-offset-[#05070B]` highlight ring.
   - Features: instant node search filter, status filter (`All`, `Audited`, `Live Telemetry`, `Interactive`), **Feedback Heatmap Mode** (colors nodes based on `comments` density), **Focus Mode** (dims unrelated nodes), zoom controls (`0.8x–1.3x`), drag-and-drop pinned/favorite sections, and quick-peek hover tooltips showing section KPIs.
7. **`ActiveTrackIndicator.tsx`**: Bottom-left floating pill displaying the active Investor Persona selected in `OnboardingWizardModal` with quick button to switch tracks.
8. **`AnomalyWatchToast.tsx`**: Bottom-left dismissible telemetry alert card notifying investors of monitored margin/variance thresholds with a one-click jump to Unit Economics Anomaly Watch (`Alt+A`).
9. **`VoiceNavigator.tsx`**: Bottom-right floating microphone control powered by the browser Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) supporting spoken navigation commands (e.g., *"go to financials"*, *"open pitch deck"*, *"show fusion stack"*, *"open data room"*) with live transcript feedback and graceful fallback when unsupported.
10. **`SectionMarker`** (inline in `App.tsx`): Floating top-right circular comment counter badge overlaid on `DualEngineSection`, `FusionStackSection`, `MilestonesSection`, and `UnitEconomicsSection` whenever `comments` exist for that section, opening `ExecutiveFeedbackDrawer` on click.

---

## 7. Section-by-Section Detailed Specification (All 14 Sections + Ticker + Footer)

Every single major section header includes:
- A section badge/index label (mono cyan/indigo uppercase).
- A bold `Outfit` heading (`text-3xl sm:text-4xl lg:text-5xl font-black text-white`).
- A `<CopyShareButton sectionId="..." sectionTitle="..." />` for one-click deep-link sharing.
- An **`<ArPreviewButton sectionTitle="..." sectionId="..." modelPreset="..." subtitle="..." />`** launching the floating Three.js 3D AR modal pre-loaded with that section's matching architectural preset.

| # | Component | DOM `id` | Default AR 3D Preset | Key Visualizations & Interactive Features |
| :- | :--- | :--- | :--- | :--- |
| 1 | `HeroSection` | `#hero` | `fusion-core` | Interactive Three.js `Spatial3DCanvas` background, `SpentaLogo`, Investor/Partner mode-adaptive headline & CTAs, 4-card audited KPI telemetry bar (`$500k` SAFE, `8:1` arbitrage, `38–42%` GM, `99.4%` OCR F1), direct CTAs to Pitch Deck, Data Room, Contact, and AR Preview. |
| — | `InvestorNewsTicker` | `#investor-news-ticker` | — | Continuous horizontal scrolling dark telemetry ticker showing audited commercial wins, hardware shipments, patent/IP milestones, and FX rate (`1 USD = 122.61 BDT`), pause-on-hover. |
| 2 | `DualEngineSection` | `#dual-engines` | `spatial-twin` | Side-by-side 3D tilt cards (`.service-card-3d`) contrasting **Engine 1: Spatial Computing & Digital Twins** (UE5 Nanite/Lumen, Cleanroom VR, WebXR Showrooms) and **Engine 2: Physical AI & Document Intelligence** (PrimeOCR, Self-Hosted LLaMA 3.2 Vision, Bengali/English IDP, SCADA Telemetry), plus synergy flywheel diagram showing shared R&D compounding. |
| 3 | `FusionStackSection` | `#fusion-stack` | `fusion-core` | Interactive **6-Layer Neural Fusion Architecture** explorer (L6 Application Delivery → L5 Cloud & Vector Memory → L4 Spatial Simulation → L3 Multimodal AI & OCR → L2 Edge Wasm/MQTT → L1 Physical Sensing Ingest). Clicking any layer reveals latency/throughput/SLA specs, compliance mappings (SOC 2, HIPAA, PCI-DSS, Bangladesh Bank ICT), live REST/gRPC/WS endpoint schemas with JSON payloads, and syntax-highlighted TypeScript/Rust/C++/Python code snippets from `FUSION_LAYERS`. |
| 4 | `RdRoadmapSection` | `#rd-roadmap` | `fusion-core` | Multi-phase **2024–2027+ Technology & R&D Gantt Roadmap** (Phase 1 Completed → Phase 2 In Production → Phase 3 Active Execution → Phase 4 Autonomous Spatial Robotics) with interactive phase filter tabs, deliverable checklists, and milestone dependency bars. |
| 5 | `MilestonesSection` | `#milestones` | `fusion-core` | 18-month post-seed execution sprint tracker linking seed capital tranches to operational deliverables (`$60k ARR`, 8 Australian pilots, PrimeOCR enterprise scale, WebXR SDK release) with completion progress bars and verification status badges. |
| 6 | `ValueExchangeSection` | `#value-exchange` | `spatial-twin` | Interactive **D3.js Force-Directed Network Graph** mapping bidirectional value flows between Spenta Core, Enterprise Clients, Creator/IP Ecosystem, Dual-Shore Engineering, and Investors. Nodes are draggable and clickable to inspect contract economics and revenue loops. |
| 7 | `MarketShiftSection` | `#market-shift` | `hardware-glasses` | Macro thesis section with animated `MarketPulseCanvas` backdrop, **Recharts** TAM trajectory (`$667.3B by 2033` @ `42.5% CAGR`), 4 Big Tech hardware catalyst cards (Meta Ray-Ban/Orion, Android XR, Apple Vision Pro, NVIDIA Isaac/Qualcomm Spaces), and trigger button opening the fullscreen `MacroCatalystOverlay` modal (with 0.5x/1x/2x pulse rate switcher and platform filter tabs). |
| 8 | `CaseStudiesSection` | `#case-studies` | `spatial-twin` | Industry-filterable verified enterprise deployments (Prime Bank PrimeOCR, Samsung / Cleanroom Digital Twin, Hospital Wayfinding WebXR, Anamorphic 3D Spectacles) + interactive **Enterprise ROI Calculator** (inputs for document volume / training headcount / facility scale outputting real-time USD/BDT annual savings & payback period). |
| 9 | `UnitEconomicsSection` | `#unit-economics` | `financial-waterfall` | Flagship financial workbench containing: **(1)** Model A / B / C & 9-Tier selector (`T1–T9`, `$800` to `$100k+`), **(2)** 3-Scenario Switcher (`Base`, `Aggressive`, `Conservative / Market-Fit`) + side-by-side **Compare Scenarios Mode**, **(3)** `FinancialSummaryGenerator` (live Gemini AI 1-paragraph thesis auto-updating on scenario/tier change), **(4)** `RoiSensitivitySlider` (interactive Marketing `-30%..+50%` and R&D `-25%..+40%` sliders driving a real-time **D3.js 5-Year Cumulative ROI Area Chart**), **(5)** **Recharts** Cost & Margin Waterfall chart (COGS, Engineering, Spatial Design, Cloud, CAC, Overhead, Net Profit), **(6)** **Anomaly Watch Engine** with 6-month variance heatmap, alert threshold monitor, and slide-over Anomaly Detail Drawer (`Alt+A`), **(7)** Launch button for fullscreen `InvestorIntelligenceDashboard`, and **(8)** CSV / JSON data exporters. |
| 10 | `DualShoreGlobeSection` | `#dual-shore-globe` | `global-orbit` | Interactive **Three.js 3D Holographic Earth Globe** with animated orbital data arcs connecting **San Jose HQ (USA)** ↔ **Dhaka R&D Studio (BD)** ↔ **Sydney APAC Hub (AUS)**, live timezone clocks, 8:1 cost-arbitrage role comparison table, and direct CTA to contact leadership. |
| 11 | `ExecutiveTeamSection` | `#executive-team` | `global-orbit` | Founding & executive leadership dossier cards (CEO & Spatial Architect in San Jose, CTO AI & Vision in Dhaka, VP Enterprise Solutions in Sydney, Director of 3D Pipeline in Dhaka) with domain credentials, past institutional track records, and direct inquiry CTAs. |
| 12 | `PassiveIPSection` | `#passive-ip` | `spatial-twin` | Non-client recurring IP & Creator Commerce streams (`NON_CLIENT_STREAMS`: Unreal/Fab 3D Asset Marketplace, Spatial SaaS Templates, WebXR Component Licensing, Enterprise Training Modules) showing payout splits, monthly USD/BDT yield ranges, and 70%–85% passive margins. |
| 13 | `MoatAndBenchmarksSection` | `#moat-benchmarks` | `airgap-vault` | **4-Way Competitive Moat Matrix** (`COMPETITOR_MATRIX`) benchmarking Spenta against Western XR Agencies, Commodity Outsourcers, and Rigid Legacy SaaS across 8 dimensions + Verified Public/M&A Market Precedents (Matterport `$1.6B` CoStar acquisition, Scale AI `$13.8B`, Hyperscience `$1.1B`, XREAL `$1B+`, ASX:XRG `80%+ GM`). |
| 14 | `InvestmentTermsSection` | `#investment-terms` | `financial-waterfall` | YC Post-Money SAFE deal terms (`$500k` target, `$4.5M` Cap, `20%` Discount, Delaware C-Corp), **Recharts** Use-of-Funds Capital Allocation Donut Chart (Engineering/R&D, Enterprise GTM/APAC Pilots, Cloud/GPU Infrastructure, Legal/Compliance Reserve), interactive allocation simulator, and primary CTAs to Data Room, Pitch Deck, and SAFE Commitment Contact form. |
| — | `Footer` | `#main-footer` | — | Multi-column institutional footer with `SpentaLogo`, quick section navigation links, compliance badges, embedded **`FeedbackWidget`** (topic selector + High Conviction / Request More Data / Have Questions buttons with `canvas-confetti` burst + Data Room/Founder CTAs), and confidentiality notice. |

---

## 8. Modals, Drawers & Interactive Utilities

### 8.1 Augmented Reality 3D Preview System (`ArPreviewModal.tsx` + `ArSpatialViewer.tsx` + `ArPreviewButton.tsx`)
- **Trigger**: `<ArPreviewButton />` rendered in all 14 section headers (`pill`, `button`, or `compact` variants) calling `openArPreview({ sectionTitle, sectionId, modelPreset, subtitle })`.
- **Viewer (`ArSpatialViewer.tsx`)**: Self-contained, zero-external-asset procedural Three.js WebGL renderer (`ACESFilmicToneMapping`, `SRGBColorSpace`, `RoomEnvironment` PMREM studio reflections, 4-light studio rig, safe WebGL init guard):
  - **6 Procedural 3D Presets**:
    1. `fusion-core`: 6 stacked metallic hexagonal slabs (L1–L6) with neon torus edge rings, central rotating wireframe icosahedron gyro, and 120 orbiting cyan data particles.
    2. `spatial-twin`: Facility floor slab with `GridHelper`, 4 translucent glass cleanroom volumes housing internal equipment cylinders and roof telemetry beacons, plus an elevated spatial scanner laser ring.
    3. `hardware-glasses`: Metallic frame bridge, left/right refractive glass waveguide lenses (`transmission: 0.85`, `ior: 1.6`), temple arms, micro-camera nodes, and floating cyan wireframe holographic HUD planes.
    4. `financial-waterfall`: 9 radial 3D bar pillars (Models A cyan, B indigo, C emerald) rising in height with glowing caps atop a dark cylindrical pedestal.
    5. `airgap-vault`: Heavy metallic cylindrical vault topped with 3 concentric toothed security dials and a vertical holographic lock beam.
    6. `global-orbit`: Wireframe globe with cyan atmosphere shell, San Jose & Dhaka cone beacons, and a glowing quadratic Bezier orbital arc.
  - **Interactive Controls**: Pointer drag-to-orbit (spherical camera coordinates), wheel zoom (`radius 2.5–12.0`), **Simulate AR Passthrough** toggle (camera crosshair reticle + surface anchor HUD), **Wireframe** toggle, **Auto-Rotate** toggle, **Reset Camera**, **6-Preset Selector Bar**, **Exploded Architecture Slider (`0%–100%`)** smoothly interpolating sub-assemblies along per-part `explodeVector`s, and a **Collapsible Bottom Control Dock** to guarantee zero center-viewport occlusion.

### 8.2 `PitchDeckModal.tsx`
- Fullscreen 12-slide executive presentation deck synchronized with all SSOT numbers.
- Supports `ArrowLeft` / `ArrowRight` / `Space` keyboard navigation, slide thumbnail scrubber, speaker/investor notes toggle, progress bar, and `SpentaLogo` slide headers.

### 8.3 `DataRoomModal.tsx`
- Categorized institutional due-diligence document vault (Corporate & Legal, Financial Models, Technical Architecture, Commercial Pipeline, IP & Security).
- Includes real-time keyword search, category filters, document verification status badges, preview inspector, and deep-link buttons (`onNavigateToSection`) that close the modal and scroll+highlight the corresponding briefing section.

### 8.4 `InvestorIntelligenceDashboard.tsx`
- Fullscreen D3.js institutional analytics command center initialized with the active `currency` and `FinancialScenario` (`base` / `aggressive` / `conservative`).
- Provides multi-year revenue/EBITDA projections, margin sensitivity curves, cohort comparisons, and dual-currency readouts.

### 8.5 `OnboardingWizardModal.tsx`
- Interactive multi-step persona selector allowing visitors to choose their diligence track (e.g., *VC Seed Partner*, *Enterprise CTO*, *Strategic APAC Partner*, *Family Office Analyst*), dynamically setting `activePersona` displayed in `ActiveTrackIndicator` and recommending priority sections.

### 8.6 `OmniSearchModal.tsx`
- Instant `Cmd/Ctrl + K` / `Alt + Q` command palette indexing all 14 sections, fusion layers, case studies, financial tiers, and modal actions with keyboard arrow selection and Enter-to-jump.

### 8.7 `ExecutiveFeedbackDrawer.tsx` (+ `D3SentimentChart.tsx` & `D3FeedbackHeatmap.tsx`)
- Right slide-over institutional diligence comment ledger.
- Allows adding comments tagged by section and `FeedbackPriority` (`Critical Inquiry`, `Strategic Suggestion`, `General Feedback`), posting threaded replies (`FeedbackReply`), and viewing live D3 visualizations:
  - `D3SentimentChart`: Breakdown of comment priority/sentiment distribution.
  - `D3FeedbackHeatmap`: Matrix showing comment density across sections and priority levels.

### 8.8 `ContactModal.tsx`
- Direct Founder & Investment Committee inquiry modal pre-populated with `defaultInterestArea`.
- Fields: Full Name, Work/Institutional Email, Organization/Fund, Primary Interest Area (6 options), Target Investment/Project Bracket (5 options), Optional Note.
- Submission generates a confirmation receipt (`SPN-INQ-XXXX`) citing `<12h` founder response SLA (`founders@spenta.io`).

### 8.9 `pdfGenerator.ts`
- Client-side `jsPDF` generator (`generateBriefingPdf(currency)`) producing a dark-themed (`#070A10` background, `#06B6D4` cyan header stripes) 2-page A4 institutional briefing memo saved as `Spenta_XR_Physical_AI_Investor_Briefing_${currency}.pdf`:
  - **Page 1**: Executive Summary, Seed SAFE Round Highlights (USD or BDT converted), 6-Layer Neural Fusion Stack table, Commercial Models A/B/C Unit Economics summary table.
  - **Page 2**: 2024–2027+ R&D Roadmap, Executive Leadership & Dual-Shore locations, Market Precedents & 4-Way Moat, Confidentiality Notice.

---

## 9. TypeScript Data Contracts & Backend API Specification

### 9.1 Core Data Contracts (`/src/types.ts`)
- `Currency = 'USD' | 'BDT'` with `USD_TO_BDT_RATE = 122.61`.
- `FeedbackComment { id, text, section, timestamp, replies?: FeedbackReply[], priority?: FeedbackPriority }`.
- `FinancialTier { id, category: 'A'|'B'|'C', code, name, rangeUsd, rangeBdt, baselineUsd, deliveryTimeline, scopeSummary, teamAllocation, billableHours?, cogsPercent, grossMarginPercent, cacPercent, overheadPercent, netMarginPercent, costBreakdownUsd }`.
- `FusionLayer { level, id, title, subtitle, techStack, touchpoints, securityGovernance, enterpriseImpact, color, iconName, specs?, techDocs?: FusionLayerTechDocs }`.
- `CaseStudy { id, client, industry, headline, tag, solution, techStack, metrics[], quote? }`.
- `NonClientStream { id, title, platform, payoutSplit, monthlyUsdRange, monthlyBdtRange, grossMargin, netMargin, mechanics, precedent, icon }`.
- `CompetitorRow { attribute, spenta, westernAgencies, commodityOutsourcers, rigidSaas }`.

### 9.2 Backend AI Endpoint (`server.ts`)
- **Route**: `POST /api/financial-summary`
- **Security**: Strictly server-side. Reads `process.env.GEMINI_API_KEY`; never exposes keys to the browser bundle. Returns HTTP `500` with a clear configuration message if absent.
- **Model Configuration**: Uses `@google/genai` `GoogleGenAI` client with `model: 'gemini-4-hydrogen'`, `thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }`, and `httpOptions.headers['User-Agent'] = 'aistudio-build'`.
- **Request Body (JSON)**:
  ```json
  {
    "scenario": "Base Model | Aggressive Growth | Market-Fit / Conservative",
    "tierName": "Enterprise Spatial Twin & AI Platform",
    "tierCode": "C1",
    "revenue": "$45,000",
    "grossMargin": 38.0,
    "netMargin": 18.0,
    "netProfit": "$8,100",
    "cacPercent": 10,
    "overheadPercent": 10,
    "currency": "USD"
  }
  ```
- **Response Body (JSON)**:
  ```json
  {
    "summary": "Plain one-paragraph institutional VC investment thesis (55–75 words) tailored to the active scenario, tier, dual-shore arbitrage, and audited margin profile."
  }
  ```
- **Frontend Consumer (`FinancialSummaryGenerator.tsx`)**: Automatically calls `POST /api/financial-summary` on mount and whenever `scenario`, active tier, or `currency` changes; includes quick scenario switcher pills (`Base`, `Aggressive`, `Market-Fit`), skeleton loader, error banner, manual `Regenerate` button, and one-click `Copy` button.

---

## 10. Coding Agent Implementation & Verification Checklist

To reproduce this application accurately from scratch, follow this build order and verification gate:
1. **Bootstrap & Styling**: Configure Vite + React 19 + TypeScript + Tailwind v4 (`@tailwindcss/vite`), load Google Fonts (`Outfit`, `Plus Jakarta Sans`, `JetBrains Mono`, `Syne`) in `index.html`, and copy all custom utility classes into `src/index.css`.
2. **Backend Proxy First**: Implement `server.ts` on port `3000` with `POST /api/financial-summary` using `@google/genai` (`gemini-4-hydrogen`) and Vite middleware mounting in dev mode. Configure `package.json` scripts (`dev`, `build`, `start`, `lint`).
3. **Contracts & SSOT Data**: Create `src/types.ts` and populate `src/data/mockData.ts` with all 6 Fusion Layers, 9 Financial Tiers, Case Studies, Non-Client Streams, and Competitor Matrix rows.
4. **Contexts & Brand Assets**: Implement `SentimentContext.tsx`, `ArPreviewContext.tsx`, `SpentaLogo.tsx`, `CopyShareButton.tsx`, `ArPreviewButton.tsx`, and `pdfGenerator.ts`.
5. **3D & D3 Engines**: Build `Spatial3DCanvas.tsx`, `ArSpatialViewer.tsx` (all 6 procedural Three.js presets + RoomEnvironment + exploded slider + AR passthrough), `MarketPulseCanvas.tsx`, `RoiSensitivitySlider.tsx`, `D3SentimentChart.tsx`, and `D3FeedbackHeatmap.tsx`.
6. **14 Core Sections & Ticker/Footer**: Assemble all 14 sections in exact order inside `<main id="main-content">`, ensuring every section has its exact DOM `id`, `CopyShareButton`, and `ArPreviewButton` mapped to the appropriate `ArModelPreset`.
7. **Global HUD & Modals**: Wire `Navbar`, `BreadcrumbNav`, `SidebarDock` (embedding `InvestorSentimentWidget`), `SectionMap` (with click-to-scroll + 3s cyan highlight ring), `ActiveTrackIndicator`, `AnomalyWatchToast`, `VoiceNavigator`, and all 8 modals/drawers in `App.tsx`.
8. **Verification Gate**:
   - Run `npm run lint` (`tsc --noEmit`) — must pass with **0 errors**.
   - Run `npm run build` (`vite build`) — must bundle cleanly with **0 errors**.
   - Verify no `window.alert` / `window.open`, no client-side API key exposure, smooth deep linking (`?section=` / `#`), keyboard hotkeys (`1–9`, `Cmd/Ctrl+K`, `Alt+A`, `Esc`), live Sentiment saturation updates, AR 3D modal launch from all 14 sections, and live AI thesis synthesis via `/api/financial-summary`.
