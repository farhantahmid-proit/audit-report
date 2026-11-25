<!-- Active Studio Infrastructure Target Metadata -->
> **Infrastructure Target**: On-Prem — Customer-Owned On-Premises Appliance (Tier 1–4)
> **Transport**: Local Loopback NVLink + 10GbE LAN mTLS | **Latency Budget**: <35ms LAN · <50ms Edge
> **Enclave Boundary**: AMD SEV-SNP / Intel TDX on Client Rack (0 bytes cloud egress)
> **Egress & Compliance**: Zero Cloud PII Egress · Local Signed Model Registry | BB ICT v4.0 · HIPAA Local PHI · SOC2 Type II
> **Active L1–L6 Core Posture**: 4/6 Hardware TEE · 4/6 Strict OPA · TIER 4 (0 Apps)

---
# Spenta Sovereign OS — P0 / P1 / P2 Coding-Agent Design & Develop Prompt Pack

> Universal Markdown format compatible with Cursor, Claude Code, Windsurf, and Google AI Studio.

## Global Context Block (Prepend to Any Coding-Agent Session)

- **Stack**: React 19 + Vite + TypeScript (`strict: true`) + Tailwind CSS v4 (`@import "tailwindcss";`, `@source "../index.html";`, `@source "../src";`, and `@custom-variant dark (&:where(.dark, .dark *));`).
- **Typography**: `Plus Jakarta Sans` (UI & display headings) paired with `JetBrains Mono` (`font-variant-numeric: tabular-nums`) for metrics, financials, confidence scores, and layer IDs.
- **Dual-Theme Posture**: Dark-first Obsidian (`#09090B` canvas, `#111315` surface, `white/[0.08]` hairlines) + Light Slate (`#F8FAFC` canvas, `#FFFFFF` surface, `zinc-200` borders).
- **Semantic Accents**: Emerald `#10B981` (active / verified >= 0.88 HITL), Teal `#0D9488` (L1-L6 architecture & integrations), Amber `#F59E0B` (HITL review < 0.88), Crimson `#E11D48` (exclusive primary CTAs).
- **Non-Negotiables**: Pure client-side state synced to `localStorage`; zero `window.alert`/`confirm`/`open`; WCAG AA+ contrast in dark & light modes; responsive from 360px mobile to 1440px+ desktop; single-elevation cards without nested card-in-card clutter or static metadata pills.

---

# P0 — Foundation, Navigation & Primary Discovery (Build First)

### TASK [P0.1]: App Shell, Dual-Theme Engine & Centralized StackContext Store

**DESIGN SPEC**
- Sticky 56px top navbar (`bg-white/85 dark:bg-[#09090B]/85 backdrop-blur-md`) with hairline bottom border and 3 balanced zones:
  1. Left: Official Spenta logo (tone-aware for dark/light backgrounds) + subtle vertical divider + `SOVEREIGN OS` monospace label on wide viewports.
  2. Center: 7 single-line tabs (`App Vault`, `Infographics`, `Financials`, `Spenta Core`, `The Brain`, `Pitch Deck`, `Resources`) with an active emerald bottom bar.
  3. Right: Command Palette button (`⌘K`), Dark/Light theme toggle, crimson `Stack Composer` CTA with live module count, and responsive mobile drawer button (<1024px).
- Minimal footer displaying brand mark, regional delivery hubs (San Jose · Australia · 20-FTE Dhaka R&D Hub), and contact action.

**DEVELOP SPEC**
- Author a strongly typed manifest covering 13 Spenta apps, 8 Brain Hubs, 6 Sovereign Layers (L1–L6), 4 On-Prem Server Tiers, 5-year Financials (FY2027–FY2031), 18 Pitch Slides, and Starter Recipes.
- Implement `StackContext` persisted in `localStorage` for `theme`, `activeTab`, `selectedIds` (4-app default), `drawerOpen`, `hitlConfidence` (0.91 default), `coreLayerConfigs`, `coreAuditLog`, and `savedProposals`.
- In `toggleApp(id)`, recursively attach transitive `depends` modules and emit a dismissible inline notice.
- Compute memoized `stackMetrics`: `totalSetupUsd`, `blendedGmPct`, recommended `ServerTierId` (auto-escalate 1 tier when >= 6 apps selected), `activeLayers`, and deduplicated `synergyPairs`.

**ACCEPTANCE CRITERIA**
- Zero horizontal overflow at 375px, 768px, 1280px, and 1440px.
- Theme toggle persists across reload and applies cleanly without missing dark classes (verify `.gitignore` does not ignore `/src/`).

---

### TASK [P0.2]: App Vault — 13-App Composable Catalog & 2D Architecture Matrix

**DESIGN SPEC**
- Compact executive KPI bar showing live stack telemetry: Selected Modules (/13), Estimated Build Scope ($K), Blended Conservative GM%, and Auto-Recommended Server Tier.
- Starter Recipe strip offering 1-click curated multi-module stacks in crisp single-elevation cards.
- Interactive 2D SVG "Spenta Sovereign AI Brain" Orthogonal Matrix:
  - Central L1–L6 Core flanked by 8 domain hubs (4 Operations Engine left, 4 Experience & IR4 Engine right) connected via orthogonal bus lines that highlight emerald/teal when constituent modules are selected.
  - Clicking any hub filters and inspects its mapped modules inline.
- Responsive 13-App Catalog Grid (1-col mobile, 2-col tablet, 3-col desktop) leading with quiet unboxed category metadata, module title, tagline, setup/recurring pricing, GM%, L1–L6 layer indices, proof client, and Add/Selected toggle.

**DEVELOP SPEC**
- Support real-time search, category filter, engine filter (Operations / Experience / Fusion), and deployment filter (On-Prem / Private VPC / SaaS).
- Build an accessible module detail modal displaying `coreCapabilities`, required `depends`, native `integratesWith` (with 1-click Add), and minimum hardware tier.
- Listen for `pendingNavFocus` from global search to jump directly to any module.

**ACCEPTANCE CRITERIA**
- Selecting a module updates SVG bus highlights, KPI counters, and Stack Composer count in <50ms.
- Selecting an app with dependencies automatically attaches required modules with visible feedback.

---

### TASK [P0.3]: Persistent Slide-Over Stack Composer Drawer

**DESIGN SPEC**
- Right-anchored slide-over panel (`max-w-[420px]`, full width on mobile) with dimmed backdrop, Escape-to-close, and dark obsidian header showing `{N} / 13 Modules`.
- Summary strip: Estimated Build Scope ($K), Blended GM%, and Recommended Server PC Tier specification (hardware, VRAM/RAM, CapEx, token throughput).
- Compact 6-segment L1–L6 Sovereign Layer coverage bar indicating active layers.
- Scrollable selected modules list with 1-click removal and verified native synergy pair list.
- Sticky footer with 4 actions: `Export JSON`, `Copy Brief`, `Email Draft`, and `Request Proposal` jump-to-form CTA.

**DEVELOP SPEC**
- Bind directly to `StackContext` (`selectedApps`, `stackMetrics`, `toggleApp`, `clearStack`, `exportStackJson`, `buildExecutiveBrief`, `buildMailtoHref`).
- Apply `no-print` to the root overlay so it never obstructs printed documents.

**ACCEPTANCE CRITERIA**
- Build totals, GM%, hardware tier escalations, and synergy counts update immediately on add/remove.
- JSON export downloads a valid structured architecture manifest; Copy Brief shows inline confirmation.

---

# P1 — Core Interactive Intelligence & Commercial Depth (Build Second)

### TASK [P1.1]: Global Command Palette Search (⌘K)

**DESIGN SPEC**
- Top-weighted centered modal (`max-w-2xl`) with clean search input, clear button, Esc hint, and scannable result rows showing icon, title, concise subtitle, and destination tab label.
- Group and rank matches cleanly across Sections, Starter Recipes, Apps, Infographics, Core Layers, Server Tiers, Pitch Slides, Blueprints, and Case Studies.

**DEVELOP SPEC**
- Bind global `Cmd+K` / `Ctrl+K` shortcut (ignoring focus inside `INPUT`, `TEXTAREA`, or `SELECT`).
- Support full keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`) synchronized with mouse hover.
- Selecting an entry invokes `navigateToItem(tab, focus)` so the target view highlights or opens the exact requested item automatically.

**ACCEPTANCE CRITERIA**
- Queries like "HITL", "Healthcare", "Tier 1", "EBITDA", or "Slide 12" surface accurate matches instantly and deep-link cleanly on Enter.

---

### TASK [P1.2]: Financials View — FY2027–FY2031 P&L, Sensitivity Controls & Quick Generate PDF

**DESIGN SPEC**
- Top KPI strip: Year 5 Revenue, 5-Year Cumulative EBITDA, 5-Year Net Profit, Blended Portfolio GM%, and SAFE Raise Terms ($500K / $4.5M Cap / 20% Disc).
- Theme-aware Recharts `ComposedChart` (Revenue bars + EBITDA & Net Profit curves) with legible dark/light axes, gridlines, and custom tooltips.
- Interactive Sensitivity Controls: Conservative vs. Upside scenario toggle, BDT/USD FX rate slider, Tax rate slider, and Dhaka Dual-Shore OpEx leverage readout.
- Sortable 13-Product Gross Margin table aligned with tabular monospace numerals and live Stack inclusion indicators.

**DEVELOP SPEC**
- Derive all 5-year P&L tables and chart series purely from scenario, FX, and tax state without mutating base constants.
- Implement a **"Quick Generate"** button opening a simplified 1-page Quarterly Executive Summary modal powered by active financial parameters, with 1-click single-page PDF export via `jsPDF`.

**ACCEPTANCE CRITERIA**
- All currency and percentage cells use `JetBrains Mono` with `tabular-nums`.
- Quick Generate PDF reflects live scenario, FX, and tax slider adjustments accurately.

---

### TASK [P1.3]: Spenta Core — L1–L6 Fusion Stack, 4-Tier Server Matrix & Persistent Audit Log

**DESIGN SPEC**
- Clean sub-navigation bar: `L1–L6 Fusion Stack`, `Server PC Matrix`, `Dual-Shore Pods`, and `Audit Log` (showing live entry count).
- L1–L6 Stack: clickable vertical spine (L6 down to L1) paired with a Layer Inspector displaying SLA target, protocols, API contracts, security controls, mapped apps, and live editable controls (Deployment Isolation, OPA Policy Mode, Hardware TEE toggle, Reset to Baseline).
- 4-Tier Server Matrix: 4 comparison cards (Tier 1 Mac Studio M3 Ultra 512GB through Tier 4 48GB Edge) marking the StackContext-recommended tier and offering a "Set Target Tier" action.
- Dual-Shore Pods: Recharts hourly cost comparison chart (Dhaka R&D Hub vs. Western Agency) and pod structure breakdown.
- Audit Log Tab: search bar, scope filter (All, L1–L6, Hardware), JSON/CSV export, inline Clear Log confirmation (no `window.confirm`), and chronological diff table (Timestamp, Actor, Scope, Action, Field, Previous → New Value).

**DEVELOP SPEC**
- Automatically log an immutable entry to `coreAuditLog` in `StackContext` on every L1–L6 policy/isolation/TEE change or hardware tier assignment, persisted in `localStorage`.

**ACCEPTANCE CRITERIA**
- Modifying any L1–L6 control immediately records an accurate Previous → New Value entry with ISO timestamp that persists across reload.

---

### TASK [P1.4]: Pitch Deck — 18-Slide Interactive Presenter Stage

**DESIGN SPEC**
- Header toolbar with deck title, keyboard navigation cue (`← / →`), and `Show / Hide Notes` toggle.
- 12-column desktop stage: 3-column scrollable Slide Index rail + 9-column widescreen `aspect-[16/9]` slide frame.
- Every slide displays official Spenta logo, section label, `XX / 18` counter, bold headline, subtitle, 2–4 semantic KPI blocks, bullet list, optional callout banner, and confidential footer.
- Below stage: Previous / Progress Bar / Next control strip + collapsible Presenter Speaker Notes drawer.

**DEVELOP SPEC**
- Bind `ArrowLeft`, `ArrowRight`, `PageUp`, and `PageDown` shortcuts while ignoring focused inputs/textareas/selects.
- Consume `pendingNavFocus` so global search links open the target slide directly.

**ACCEPTANCE CRITERIA**
- All 18 slides render cleanly without text clipping on both mobile stacked viewports and desktop 16:9 stages.

---

# P2 — Visuals, Exports, 3D/Spatial & Hardening (Build Third)

### TASK [P2.1]: The Brain — 3D Neural Core, Operational Tech Radar & 0.88 HITL Gate Simulator

**DESIGN SPEC**
- Primary visualization panel toggling between:
  1. Interactive Three.js 3D Sovereign Neural Core (central emerald core, L1–L6 orbital rings, clickable 13-app nodes synced to `selectedIds`, smooth orbit controls).
  2. High-contrast 2D SVG Operational Tech Radar plotting modules across adoption rings and domain quadrants.
- 0.88 Confidence HITL Gate Simulator: interactive confidence threshold slider (0.50–0.99) dynamically classifying realistic enterprise inference events (ICR banking forms, HL7 handovers, KYC checks) into Auto-Pass (>= 0.88 Emerald) vs. Human Review Queue (< 0.88 Amber) with OPA policy rationale and latency readouts.
- Filterable 8-Vertical Agentic Loop (Think → Learn → Solve → HITL Trigger) and Blueprint Pillar Explorer.

**DEVELOP SPEC**
- Lazy-load the Three.js canvas with `React.lazy` + `Suspense` wrapped in a React Error Boundary falling back seamlessly to the 2D SVG Tech Radar if WebGL is unavailable.
- Dispose Three.js geometries, materials, and renderer cleanly on unmount.

**ACCEPTANCE CRITERIA**
- Moving the HITL slider recalculates pass/escalate ratios instantaneously.
- Zero crashes in WebGL-disabled or headless environments.

---

### TASK [P2.2]: Infographics Gallery & Zoomable Lightbox

**DESIGN SPEC**
- 2-column responsive gallery showcasing 4 widescreen 16:9 visual plates:
  1. Spenta Sovereign AI Brain (8-Hub Architecture)
  2. L1–L6 Sovereign Fusion Stack & 4-Tier Server Matrix
  3. FY2027–FY2031 Financial Trajectory & Dual-Shore Edge
  4. Captive Ecosystem Synergies (BEST Retail & X Ltd Mobility)
- Each plate card presents plate index, title, summary caption, crisp 16:9 preview, Expand Lightbox trigger, and Download action.
- Full-screen dark lightbox modal with Zoom In/Out/Reset controls, Escape/Arrow keyboard navigation, Print view, and Download action.

**DEVELOP SPEC**
- Import static visual assets via Vite ES imports with `src/vite-env.d.ts` declaring `vite/client` types and graceful fallback styling if any asset fails to load.

**ACCEPTANCE CRITERIA**
- Lightbox zooms cleanly without aspect-ratio distortion and closes reliably on Escape or backdrop click.

---

### TASK [P2.3]: Pitch Deck Vector 16:9 PDF Exporter & Print-to-PDF Media Queries

**DESIGN SPEC**
- Pitch Deck toolbar actions: `Slide XX PDF`, `PDF Options` modal trigger, primary crimson `Export Full Deck PDF` (with live rendering progress), and native `Print` button.
- PDF Options modal: Slide Scope (Full 18 / Current Slide / Custom From–To Range), Document Theme (Deck Native / All Obsidian Dark / Print-Friendly Light), Toggle Presenter Speaker Notes, and Toggle Live Composed Stack Appendix slide.

**DEVELOP SPEC**
- Build `exportPitchDeckToPdf` using `jsPDF` (297mm × 167.06mm 16:9 landscape):
  - Preload official Spenta logo to offscreen canvas with timeout + clean vector fallback.
  - Sanitize Unicode glyphs (`×`, `·`, `—`, `≥`, `↔`, smart quotes) so built-in PDF fonts never garble characters.
  - Pre-measure wrapped text heights dynamically to guarantee zero overlap across titles, KPIs, bullets, callouts, speaker notes, and footers.
  - Optionally append a 16:9 "Custom Stack Appendix" slide pulling live StackContext data.
- Author comprehensive `@media print` rules:
  - `@page { size: landscape; margin: 10mm; }` and `print-color-adjust: exact`.
  - Hide all navigational elements (`header, nav, footer, aside, .no-print, .pitch-deck-nav, .pitch-deck-screen-only`).
  - Override `html.dark` root canvas to white with deep dark ink and reveal a print-only paginated 18-slide layout (`break-after: page; break-inside: avoid;`) so all text prints clearly even when dark mode is active or background graphics are disabled.

**ACCEPTANCE CRITERIA**
- Vector PDF downloads cleanly for Full Deck, Single Slide, and Custom Range with zero text overlaps or garbled characters.
- Browser Print Preview renders 18 paginated, high-contrast landscape slides with zero navigation clutter.

---

### TASK [P2.4]: Resources Hub, Stack Proposal Workbench & Prompt/Theme Studio

**DESIGN SPEC**
- Top segmented mode bar toggling cleanly between `Enterprise Proofs & Proposals` and `Prompt Pack & Theme Studio`.
- Proofs & Proposals mode: sector-filtered Enterprise Case Studies (with 1-click "Load Matching Stack" actions), Sovereign Compliance matrix, live stack-aware Proposal Form (`#spenta-proposal-form`), and Saved Proposals archive.
- Prompt Pack & Theme Studio mode:
  - Universal Markdown download toolbar (Full Kit `.md`, P0–P2 Prompts `.md`, 4-Theme Kit `.md`).
  - Priority-filtered P0/P1/P2 prompt deck with one-click Copy and single-section `.md` download.
  - Sandboxed 4-Theme Live Preview Studio (scoped strictly inside the preview frame so global portal styling stays untouched) + copyable Theme Templating Prompts.
  - 4-Way Design & Theme Comparison Matrix with one-click Copy Markdown Table.

**DEVELOP SPEC**
- Persist saved proposals in `localStorage` with inline validation, JSON download, and pre-filled `mailto:` draft builder.
- Synthesize all downloadable `.md` bundles dynamically from the typed studio manifest so UI cards and exported Markdown never drift.

**ACCEPTANCE CRITERIA**
- Proposal submissions persist across reload; all `.md` downloads and per-section clipboard actions work cleanly with inline confirmation.
