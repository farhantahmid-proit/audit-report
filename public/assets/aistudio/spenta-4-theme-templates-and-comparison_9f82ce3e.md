<!-- Active Studio Infrastructure Target Metadata -->
> **Infrastructure Target**: On-Prem — Customer-Owned On-Premises Appliance (Tier 1–4)
> **Transport**: Local Loopback NVLink + 10GbE LAN mTLS | **Latency Budget**: <35ms LAN · <50ms Edge
> **Enclave Boundary**: AMD SEV-SNP / Intel TDX on Client Rack (0 bytes cloud egress)
> **Egress & Compliance**: Zero Cloud PII Egress · Local Signed Model Registry | BB ICT v4.0 · HIPAA Local PHI · SOC2 Type II
> **Active L1–L6 Core Posture**: 4/6 Hardware TEE · 4/6 Strict OPA · TIER 4 (0 Apps)

---
# 4-Way Design & Theme Analysis + Universal Theme Templating Prompts

> Grounded in direct live stylesheet & token inspection of `spenta-web-v2`, `mmis-intel-dashboards-v2`, `spenta-dhaka`, and **Spenta Sovereign OS**.

## Reference 1: Spenta Web v2 (Vercel)
- **URL**: https://oits-web-v2-5i7a.vercel.app/
- **Visual Archetype**: Cybernetic Midnight Glass & Luminous Sky
- **Default Polarity**: DARK
- **Summary**: Dark-first high-tech engineering showcase anchored in deep midnight navy (#070A13), frosted translucent slate glass cards, luminous sky/electric-blue accents, radial atmospheric glows, and kinetic micro-motion.

### THEME TEMPLATE: "Cybernetic Midnight Glass" (`spenta-web-v2`)

**COLOR TOKENS**
- **Dark Mode (Default — `html.dark`)**:
  - Canvas: `#070A13` (Deep Midnight Navy)
  - Glass Surface: `rgba(15, 23, 42, 0.70)` (`#0F172AB3`) + `backdrop-blur-md`
  - Border: `rgba(30, 41, 59, 0.80)` (`#1E293BCC`)
  - Text: Primary `#F8FAFC` | Secondary `#CBD5E1` | Muted `#94A3B8`
  - Brand & Accents: Brand Navy `#2A3B8F` (dark `#1D2A68`), Electric Blue `#2563EB`, Sky Accent `#38BDF8`, Emerald `#10B981`, Amber `#F59E0B`, Indigo Depth `#312E81`
- **Light Mode**:
  - Canvas: `#F8FAFC` | Surface: `rgba(255, 255, 255, 0.95)` | Border: `rgba(226, 232, 240, 0.80)`
  - Text: Primary `#0B0F19` | Secondary `#334155` | Muted `#64748B` | Brand Navy `#1D2A68`

**TYPOGRAPHY & SCALE**
- Display & UI: Crisp sans-serif with tight display tracking (`-0.025em` to `-0.05em`), bold/extrabold headings (700–800).
- Telemetry/Tags: Monospace (`10px–12px`, uppercase tracking) for metadata and status readouts.

**SURFACES, RADIUS & MOTION**
- Fixed transparent header transitioning to frosted midnight glass on scroll.
- Spacious marketing cadence (`max-w-7xl`, `py-20 sm:py-24`, `space-y-12`), `rounded-xl` to `rounded-2xl` cards, ambient radial glows, luminous accent shadows, and 500ms theme transitions (`float`, `shimmer`, `pulseGlow`, `marquee`, respecting `prefers-reduced-motion`).

---

## Reference 2: MMIS Admin Intelligence v2
- **URL**: https://mmis-intel-dashboards-v2.vercel.app/
- **Visual Archetype**: Botanical Parchment & Forest Intelligence
- **Default Polarity**: LIGHT
- **Summary**: Warm, low-fatigue executive BI workbench anchored in unbleached parchment (#F7F5F0), ivory cards (#FFFEFA), deep pine ink (#213C31), sage hairlines, Georgia serif monogram accents, and a calm botanical forest dark mode (#131E19).

### THEME TEMPLATE: "Botanical Parchment & Forest Intelligence" (`mmis-intel-dashboards-v2`)

**COLOR TOKENS**
- **Light Mode (Default — `:root`)**:
  - Canvas: `#F7F5F0` (Warm Parchment) | Sidebar: `#FDFCF9` | Card: `#FFFEFA` | Recessed: `#F8F8F3`
  - Border Hairline: `#E0E6DD` (Soft Sage) | Shadow: `0 6px 26px rgba(30, 55, 38, 0.035)`
  - Text: Primary `#213C31` (Deep Pine) | Secondary `#345247` | Muted `#6D7E75`
  - Brand & Semantic: Deep Forest `#153C2A`, Botanical Green `#25704D` (tint `#E8F2E7`), Ochre `#AD6B20` (`#FFF4DF`), Terracotta `#A4413C` (`#FFEFEC`), Slate Blue `#386A87` (`#E9F3FA`)
- **Dark Mode (`[data-theme="dark"]`)**:
  - Canvas: `#131E19` | Sidebar: `#19271E` | Card: `#1C2A22` | Recessed: `#223428` | Border: `#3A5141`
  - Text: Primary `#F1F6EE` | Secondary `#D5E6D7` | Muted `#B3C0B6` | Accent Green: `#79C29B` on `#243E2E`

**TYPOGRAPHY & SCALE**
- Primary UI: `Inter, ui-sans-serif, system-ui, sans-serif` at 14px base; page titles `31px`, weight 780, `letter-spacing: -1.1px`, `line-height: 1.1`.
- Eyebrows: `10px` uppercase, weight 900, `letter-spacing: 0.17em`, preceded by a `16px × 2px` green rule.
- Brand Monogram: `Georgia, "Times New Roman", serif` (weight 900).

**SURFACES & LAYOUT**
- Persistent 2-column dashboard shell: sticky `252px` left sidebar + sticky `72px` top utility bar + `1660px` wide content canvas.
- Organic soft radii: `15px` cards, `9px` nav items, `8px` selects/inputs, `3px solid #9FCAAD` focus rings, zero neon glow.

---

## Reference 3: Spenta Dhaka Corporate
- **URL**: https://www.oitsdhaka.com/
- **Visual Archetype**: Swiss Editorial Stone & Heritage Navy
- **Default Polarity**: LIGHT
- **Summary**: Restrained institutional B2B consultancy aesthetic built on warm stone paper (#FAF8F4), linen section bands (#F2EFE9), putty hairlines (#E4DFD6), authoritative Heritage Navy (#1F3863), fluid Inter Variable display type, and IBM Plex Mono technical metadata.

### THEME TEMPLATE: "Swiss Editorial Stone & Heritage Navy" (`spenta-dhaka`)

**COLOR TOKENS**
- **Light Mode (Default — `:root`)**:
  - Canvas: `#FAF8F4` (Warm Stone Paper) | Band Surface: `#F2EFE9` (Linen) | Elevated Card: `#FFFFFF`
  - Hairlines: `#E4DFD6` (Line) | `#ECE8E0` (Soft) | `#CFC8BC` (Strong)
  - Brand Navy: `#1F3863` | Strong/Hover: `#12233F` | Tint: `#EEF3FB` | Soft Accent: `#D9E1F3`
  - Text: Heading `#16213A` | Body `#4A5163` | Muted `#5F6576` | Positive `#1C6E46` | Caution `#8A5C10`
- **Dark Mode (`.dark`)**:
  - Canvas: `#0B1020` | Surface: `#0F1529` | Elevated: `#141A32` | Borders: `#232B4A` / `#2E3862`
  - Brand: `#8FA6E8` | Accent: `#7FA6FF` | Text: `#E7EBF5` / `#C3CCE4` / `#8D97B5`

**TYPOGRAPHY & SCALE**
- Display & Body: `"Inter Variable"` / `Inter Tight` with fluid `clamp()` display headlines, `text-balance`, and a strict `720px` reading measure.
- Technical Metadata: `"IBM Plex Mono"` (`12px–12.5px`) for specs, indices, and architectural notes.

**SURFACES, RADIUS & LAYOUT**
- Disciplined `1200px` architectural frame with alternating stone and linen bands separated by crisp 1px horizontal rules.
- Tight geometric radii (`10px` cards, `8px` buttons/inputs), restrained hover elevation (`0 10px 30px -18px`), zero neon glow or heavy blur.

---

## Reference 4: Spenta Sovereign OS (Current App)
- **URL**: https://spenta.tech/
- **Visual Archetype**: Dark-First Swiss Technical Command & Composable OS
- **Default Polarity**: DARK
- **Summary**: Pure Obsidian (#09090B) technical command system with subtle 24px architectural gridlines, carbon cards (#111315), razor-thin white/[0.08] hairlines, Plus Jakarta Sans + JetBrains Mono tabular numerals, emerald/teal/crimson semantic rigor, and landscape print-safe overrides.

### THEME TEMPLATE: "Obsidian Precision & Sovereign Emerald" (`Spenta Sovereign OS`)

**COLOR TOKENS**
- **Dark Mode (Default — `html.dark`)**:
  - Canvas: `#09090B` (Pure Obsidian + subtle 24px architectural grid on hero stages)
  - Surface: `#111315` (Carbon) | Recessed Controls: `#18181B` | Hairlines: `rgba(255, 255, 255, 0.08)`
  - Text: Primary `#FAFAFA` | Secondary `#D4D4D8` | Muted `#A1A1AA`
- **Light Mode**:
  - Canvas: `#F8FAFC` | Surface: `#FFFFFF` | Recessed: `#F4F4F5` | Hairlines: `#E4E4E7`
  - Text: Primary `#09090B` | Secondary `#3F3F46` | Muted `#71717A`
- **Semantic Accents (Both Modes)**:
  - Sovereign Emerald `#10B981` (active / >= 0.88 HITL pass), Architecture Teal `#0D9488` (L1–L6 integrations), Governance Amber `#F59E0B` (< 0.88 review), Action Crimson `#E11D48` (exclusive primary CTAs).

**TYPOGRAPHY & SCALE**
- UI & Display: `Plus Jakarta Sans` (geometric precision, tight display headings).
- Data & Telemetry: `JetBrains Mono` with `tabular-nums` strictly enforced across financials, percentages, confidence scores, and layer specs.

**SURFACES, LAYOUT & PRINT**
- Compact 56px glassmorphic topbar (`max-w-[1440px]` workspace) + `⌘K` Command Palette + right slide-over Stack Composer drawer.
- Flat single-elevation surfaces (hairline borders over drop shadows), `8px` controls, `12px–16px` cards, plus dedicated landscape `@media print` paper-safe overrides stripping all navigation chrome.

---

## 4-Way Design & Theme Comparison Matrix (Design & Theme POV Only)

| Design Dimension | 1. spenta-web-v2 (Vercel) | 2. mmis-intel-dashboards-v2 | 3. spenta-dhaka | 4. Spenta Sovereign OS (Current App) |
| :--- | :--- | :--- | :--- | :--- |
| **Visual Archetype** | Cybernetic Midnight Glass & Luminous Sky | Botanical Editorial Intelligence Workbench | Swiss Institutional Editorial & Heritage Navy | Dark-First Swiss Technical Command OS |
| **Default Polarity** | Dark-first (html.dark midnight navy) | Light-first (:root warm parchment) | Light-first (:root warm stone paper) | Dark-first (html.dark pure obsidian) |
| **Canvas Tokens (Dark / Light)** | #070A13 / #F8FAFC | #131E19 / #F7F5F0 | #0B1020 / #FAF8F4 | #09090B (+24px grid) / #F8FAFC |
| **Card / Elevated Surface** | #0F172A/70 (glass) / #FFFFFF/95 | #1C2A22 / #FFFEFA (warm ivory) | #141A32 / #FFFFFF over #F2EFE9 bands | #111315 (carbon) / #FFFFFF |
| **Primary Ink (Dark / Light)** | #F8FAFC / #0B0F19 (cool slate) | #F1F6EE / #213C31 (deep pine) | #E7EBF5 / #16213A (oxford navy) | #FAFAFA / #09090B (neutral zinc) |
| **Brand & Semantic Accents** | Sky #38BDF8, Blue #2563EB, Navy #1D2A68, Emerald #10B981 | Botanical #25704D/#79C29B, Pine #153C2A, Ochre #AD6B20, Terracotta #A4413C | Heritage Navy #1F3863/#8FA6E8, Soft Tint #EEF3FB, Muted Green #1C6E46 | Emerald #10B981, Teal #0D9488, Amber #F59E0B, Action Crimson #E11D48 |
| **Typography Pairing** | Clean Sans UI + Monospace telemetry tags | Inter (14px dense, -1.1px titles) + Georgia serif monogram | Inter Variable / Inter Tight (clamp()) + IBM Plex Mono | Plus Jakarta Sans + JetBrains Mono (tabular-nums) |
| **Borders & Elevation Style** | Translucent slate borders, frosted blur, luminous glows | Organic sage hairlines (#E0E6DD), ultra-soft ambient shadow (0 6px 26px) | Putty/navy 1px rules (#E4DFD6), flat editorial rhythm, minimal hover lift | Razor-thin white/[0.08] / zinc-200 hairlines, flat single-elevation cards |
| **Corner Radius System** | Modern rounded (12px–24px / xl–3xl) | Soft organic (15px cards, 9px nav, 12px callouts) | Tight architectural (8px–10px, max 16px) | Structured technical (8px controls, 12px–16px stages) |
| **Navigation & Spatial Frame** | Fixed transparent→glass topbar, 1280px (max-w-7xl) marketing flow | Sticky 252px left sidebar + 72px topbar, 1660px wide BI canvas | Editorial top header, strict 1200px frame + 720px prose measure | Compact 56px glass topbar (7 tabs + ⌘K + slide-over drawer), 1440px canvas |
| **Motion & Visual Atmosphere** | Expressive (float, pulseGlow, shimmer, marquee, 500ms theme fade) | Calm & utilitarian (instant feedback, crisp focus rings, zero glow) | Restrained editorial (smooth scroll, subtle hover transitions) | Precision functional (3D Three.js / SVG stages, 150ms crisp transitions) |
| **Print & Document Strategy** | Screen-first marketing experience | Screen-focused enterprise admin cockpit | Editorial corporate web experience | Dedicated landscape @media print paper override + 16:9 vector PDF engine |
