import {
  AntiPatternRule,
  AuditDomain,
  AuditRecord,
  QaChecklistItem,
  RuleStrength,
  ToneExample,
  WcagCriterion,
} from '../types';

export const WCAG_CRITERIA: WcagCriterion[] = [
  {
    id: 'wcag-1-4-3',
    code: '1.4.3',
    title: 'Contrast (Minimum)',
    level: 'AA',
    strength: RuleStrength.Must,
    requirement: 'All body text, labels, metadata, and table cells must achieve >= 4.5:1 contrast against their immediate obsidian surface token.',
    passCheck: 'Automated contrast check reports >= 4.5:1 for normal text (12px–18.88px) and >= 3:1 for headings >= 24px or bold >= 18.66px.',
    failCheck: 'Muted labels fall below 4.5:1 on color.surface.strong or placeholder text acts as primary label.',
    appliesTo: 'All 408 links, 60 buttons, 54 lists, 24 inputs, 8 cards, 4 tables',
  },
  {
    id: 'wcag-1-4-11',
    code: '1.4.11',
    title: 'Non-Text Contrast',
    level: 'AA',
    strength: RuleStrength.Must,
    requirement: 'Input borders, active tab indicators, focus rings, and SVG pathway connectors carrying state must achieve >= 3:1 contrast.',
    passCheck: 'Interactive borders and active color.border.strong indicators measure >= 3:1 against adjacent surface.',
    failCheck: 'Ghost input fields blend into color.surface.base with < 3:1 boundary contrast.',
    appliesTo: 'Inputs, Buttons, Tabs, SVG Architecture Nodes',
  },
  {
    id: 'wcag-2-1-1',
    code: '2.1.1',
    title: 'Keyboard Operability',
    level: 'A',
    strength: RuleStrength.Must,
    requirement: 'Every interactive button, tab, accordion, pathway node, inspector close action, and filter must be operable solely via keyboard.',
    passCheck: 'Full task completion (inspect token, test states, expand pathway, run walkthrough, export spec) verified without mouse.',
    failCheck: 'Click-only <div> triggers without tabIndex, role, and Enter/Space handlers.',
    appliesTo: 'All interactive components and SVG pathway nodes',
  },
  {
    id: 'wcag-2-4-7',
    code: '2.4.7',
    title: 'Focus Visible & Not Obscured (2.4.11)',
    level: 'AA',
    strength: RuleStrength.Must,
    requirement: 'Keyboard focus must render a 2px color.border.strong ring with 2px offset and never be hidden beneath sticky headers.',
    passCheck: 'Tabbing through every control shows unbroken 2px teal ring with scroll-margin clearance below sticky nav.',
    failCheck: 'outline: none suppresses ring, overflow: hidden clips ring, or sticky header overlaps focused anchor.',
    appliesTo: 'Global focusable tree & 6 navigation landmarks',
  },
  {
    id: 'wcag-1-4-1',
    code: '1.4.1',
    title: 'Use of Color',
    level: 'A',
    strength: RuleStrength.Must,
    requirement: 'Error, warning, verified, and selected states must never be conveyed through color alone.',
    passCheck: 'Every status and error pairs hue with an explicit icon and plain-text label (e.g., "Error: Token name required").',
    failCheck: 'Red input outline or colored dot without accompanying textual explanation.',
    appliesTo: 'Error states, WCAG pass/fail tables, Audit risk tags',
  },
  {
    id: 'wcag-2-5-8',
    code: '2.5.8',
    title: 'Target Size (Minimum)',
    level: 'AA',
    strength: RuleStrength.Must,
    requirement: 'Interactive controls must meet >= 24x24px WCAG minimum and this system enforces >= 40px desktop / >= 44px mobile touch targets.',
    passCheck: 'All buttons, nav rows, checkboxes, and mobile triggers measure >= 44px on 375px viewport with >= space.8 gap.',
    failCheck: 'Crowded icon buttons or tight footer links colliding on touch screens.',
    appliesTo: '60 buttons, 408 links, 24 inputs',
  },
  {
    id: 'wcag-3-3-1',
    code: '3.3.1',
    title: 'Error Identification & Suggestion (3.3.3)',
    level: 'AA',
    strength: RuleStrength.Must,
    requirement: 'Validation failures must identify the exact field via aria-invalid and aria-describedby and state the concrete corrective action.',
    passCheck: 'Triggering error state associates descriptive recovery copy programmatically and moves focus to first invalid field on submit.',
    failCheck: 'Generic toast "Something went wrong" without field-level association.',
    appliesTo: '24 inputs and interactive forms',
  },
  {
    id: 'wcag-1-4-10',
    code: '1.4.10',
    title: 'Reflow (320px–1440px)',
    level: 'AA',
    strength: RuleStrength.Must,
    requirement: 'Content must reflow down to 375px mobile (and 320px minimum) with zero page-level horizontal scrolling except structured data tables.',
    passCheck: 'Document scrollWidth equals clientWidth at 375px, 768px, 1280px, and 1440px; tables sit inside focusable overflow-x-auto regions.',
    failCheck: 'Fixed-width code blocks, wide headings, or unclipped grids causing horizontal page scroll.',
    appliesTo: 'Global layout, 4 tables, SVG architecture canvas',
  },
];

export const TONE_EXAMPLES: ToneExample[] = [
  {
    id: 'tone-cta',
    context: 'Primary Action Button',
    avoidCopy: 'Unlock Sandbox Magic Now',
    recommendedCopy: 'Export Specification (.md)',
    rationale: 'State the exact artifact and outcome in 2–4 plain words; avoid hype verbs.',
  },
  {
    id: 'tone-error',
    context: 'Form Validation Error',
    avoidCopy: 'Oops! Invalid value entered.',
    recommendedCopy: 'Enter a valid egress CIDR (for example, 10.24.0.0/16) before saving.',
    rationale: 'Identify the rule violated and give an actionable concrete example.',
  },
  {
    id: 'tone-empty',
    context: 'Filtered Table Empty State',
    avoidCopy: 'Nothing here yet.',
    recommendedCopy: 'No audit records match "AGPL" in Spenta OS. Reset filters to view all 16 audited records.',
    rationale: 'Explain why the viewport is empty and pair immediately with a recovery action.',
  },
  {
    id: 'tone-heading',
    context: 'Section Heading',
    avoidCopy: '// 03_NEXT_GEN_SANDBOX_TELEMETRY',
    recommendedCopy: '03. Runtime Isolation & Egress Boundaries',
    rationale: 'Use clean human editorial numbering and title-case prose without fake code-comment prefixes.',
  },
  {
    id: 'tone-rule',
    context: 'Normative Guideline Copy',
    avoidCopy: 'Try to keep focus rings visible when possible.',
    recommendedCopy: 'Every focusable control must render a 2px color.border.strong focus-visible outline.',
    rationale: 'Non-negotiable requirements must use "must"; optional best practices should use "should".',
  },
];

export const ANTI_PATTERNS: AntiPatternRule[] = [
  {
    id: 'anti-raw-hex',
    title: 'Raw Hex Values in Component Specifications',
    strength: RuleStrength.Must,
    prohibited: 'Hardcoding #0d1117, #81c5c9, or arbitrary one-off grays directly inside component documentation or style overrides.',
    compliantAlternative: 'Reference semantic tokens exclusively: color.surface.strong, color.border.strong, color.text.primary.',
    migrationNote: 'Audit legacy CSS modules with grep for #[0-9a-fA-F]{3,6} and replace with var(--color-*) custom properties.',
  },
  {
    id: 'anti-hidden-focus',
    title: 'Suppressed Focus Outlines or Clipped Rings',
    strength: RuleStrength.Must,
    prohibited: 'Using outline: none on buttons/tabs or wrapping focusable controls tightly inside overflow: hidden containers.',
    compliantAlternative: 'Preserve :focus-visible { outline: 2px solid var(--color-border-strong); outline-offset: 2px; } with 4px breathing padding.',
    migrationNote: 'Replace global reset rules that strip outlines with :focus:not(:focus-visible) guards.',
  },
  {
    id: 'anti-pill-overload',
    title: 'Static Metadata Pill Sandwiches & Nested Cards',
    strength: RuleStrength.Must,
    prohibited: 'Wrapping dates, categories, and license tags in rounded capsule badges or nesting bordered cards inside bordered cards.',
    compliantAlternative: 'Render static metadata as clean unboxed typography separated by "·" and divide layout zones with hairline borders and whitespace.',
    migrationNote: 'Reserve segmented button styling strictly for real interactive filters with click/keyboard handlers.',
  },
  {
    id: 'anti-color-only',
    title: 'Hue-Only Error or Status Signaling',
    strength: RuleStrength.Must,
    prohibited: 'Highlighting an invalid input with a red border alone or using tiny green/amber dots without text labels.',
    compliantAlternative: 'Pair semantic border color with an explicit icon, plain-language text message, and aria-invalid / aria-describedby binding.',
    migrationNote: 'Run grayscale browser emulation during PR review to confirm every status remains unambiguous without color.',
  },
  {
    id: 'anti-incomplete-states',
    title: 'Shipping Components Without Full 7-State Coverage',
    strength: RuleStrength.Must,
    prohibited: 'Designing only default and hover views while omitting focus-visible, active, disabled, loading, error, overflow, or empty states.',
    compliantAlternative: 'Verify every new component against the 7-State Matrix and Long-Content/Overflow/Empty stressors before merge.',
    migrationNote: 'Require interactive state toggles in design review sign-off for all 7 component families.',
  },
];

export const ATTACHED_AUDIT_RECORDS: AuditRecord[] = [
  {
    id: 'audit-opensandbox-mirror',
    domain: AuditDomain.Fork78License,
    domainLabel: '78-Fork License Audit',
    entity: 'OpenSandbox (farhantahmid-proit + fts-pro)',
    classification: 'AI Agent Sandbox · Cross-Handle Mirror',
    riskOrPosture: 'Verified',
    licenseOrMetric: '2x Mirror · 4-Layer Runtime',
    summary: 'Mirrored across both handles; self-hosting requires gVisor/Kata isolation, per-request credential scoping, and default-deny egress.',
    upstreamOrSpec: 'Alibaba OpenSandbox / Wavect Review',
  },
  {
    id: 'audit-github-dedup',
    domain: AuditDomain.GitHub416,
    domainLabel: 'GitHub 416-Repo Portfolio',
    entity: 'Portfolio Inventory Hygiene (507 Raw -> 416 Repos)',
    classification: 'Deduplication & Handle Partitioning',
    riskOrPosture: 'Verified',
    licenseOrMetric: '346 Farhan · 70 Third-Party',
    summary: 'Eliminated 85 redundant occurrences across 65 repeated URLs plus 6 non-repository links; 262 unique Farhan repo names + 84 mirrors.',
    upstreamOrSpec: 'farhantahmid-proit (174) · fts-pro (164) · DEMOITS-POC (8)',
  },
  {
    id: 'audit-bbot',
    domain: AuditDomain.Fork78License,
    domainLabel: '78-Fork License Audit',
    entity: 'fts-pro/bbot',
    classification: 'Security / OSINT Recursive Scanner',
    riskOrPosture: 'Review Required',
    licenseOrMetric: 'GPL-3.0 · Active',
    summary: 'Python async reconnaissance scanner; copyleft GPL-3.0 requires strict process isolation if invoked from commercial workflows.',
    upstreamOrSpec: 'blacklanternsecurity/bbot',
  },
  {
    id: 'audit-zeroleaks',
    domain: AuditDomain.Fork78License,
    domainLabel: '78-Fork License Audit',
    entity: 'farhantahmid-proit & fts-pro/zeroleaks',
    classification: 'AI Security / LLM Red-Teaming',
    riskOrPosture: 'Review Required',
    licenseOrMetric: 'FSL-1.1-Apache-2.0 · 737 Stars',
    summary: 'Source-available Functional Source License (non-OSI); verify non-competing commercial restrictions before embedding.',
    upstreamOrSpec: 'ZeroLeaks/zeroleaks',
  },
  {
    id: 'audit-artex',
    domain: AuditDomain.Fork78License,
    domainLabel: '78-Fork License Audit',
    entity: 'BaaRai/ARTEX',
    classification: 'AI Security / Dual-Graph Pentest',
    riskOrPosture: 'High Risk',
    licenseOrMetric: 'AGPL-3.0 · Community Fork',
    summary: 'Network copyleft AGPL-3.0 triggers source disclosure obligations if exposed as a hosted SaaS service.',
    upstreamOrSpec: 'Autumn-27/ARTEX -> BaaRai/ARTEX',
  },
  {
    id: 'audit-maxun',
    domain: AuditDomain.Fork78License,
    domainLabel: '78-Fork License Audit',
    entity: 'farhantahmid-proit/maxun',
    classification: 'Playwright Web-to-API Extractor',
    riskOrPosture: 'High Risk',
    licenseOrMetric: 'AGPL-3.0 · 18.6k Stars',
    summary: 'High-traction no-code scraper under AGPL-3.0; prefer MIT browserbase/stagehand (26.1k stars) or BSD Scrapling for proprietary SaaS.',
    upstreamOrSpec: 'getmaxun/maxun',
  },
  {
    id: 'audit-stagehand',
    domain: AuditDomain.Fork78License,
    domainLabel: '78-Fork License Audit',
    entity: 'farhantahmid-proit/stagehand',
    classification: 'AI-Native Browser Automation',
    riskOrPosture: 'Verified',
    licenseOrMetric: 'MIT · 26.1k Stars',
    summary: 'Permissive MIT TypeScript/Playwright automation layer compatible with OpenSandbox headless browser execution.',
    upstreamOrSpec: 'browserbase/stagehand',
  },
  {
    id: 'audit-horizon',
    domain: AuditDomain.GitHub416,
    domainLabel: 'GitHub 416-Repo Portfolio',
    entity: 'farhantahmid-proit & fts-pro/horizon',
    classification: 'Legacy Backend Framework',
    riskOrPosture: 'High Risk',
    licenseOrMetric: 'Deprecated / Legacy',
    summary: 'Flagged deprecated upstream (rethinkdb/horizon); archive mirrored forks and exclude from active deployment stacks.',
    upstreamOrSpec: 'rethinkdb/horizon',
  },
  {
    id: 'audit-hetty',
    domain: AuditDomain.Fork78License,
    domainLabel: '78-Fork License Audit',
    entity: 'fts-pro/hetty',
    classification: 'HTTP Security Intercept Proxy',
    riskOrPosture: 'Review Required',
    licenseOrMetric: 'MIT · Stagnant Upstream',
    summary: 'Permissive MIT Go + Next.js binary with 12.5k stars, but stagnant commit cadence demands CVE pinning before internal use.',
    upstreamOrSpec: 'dstotijn/hetty',
  },
  {
    id: 'audit-siple',
    domain: AuditDomain.GitHub416,
    domainLabel: 'GitHub 416-Repo Portfolio',
    entity: 'zyno-io/siple',
    classification: 'Rust SIP Softphone + MCP API',
    riskOrPosture: 'Review Required',
    licenseOrMetric: 'FSL-1.1-ALv2 · Third-Party',
    summary: 'Source-available native Rust softphone exposing JSON-RPC + MCP AI-agent controls; non-OSI license requires legal clearance.',
    upstreamOrSpec: 'zyno-io/siple',
  },
  {
    id: 'audit-spenta-core',
    domain: AuditDomain.SpentaOS,
    domainLabel: 'Spenta Sovereign OS',
    entity: 'L1–L6 Core & 0.88 OPA HITL Gate',
    classification: 'Sovereign Enterprise AI Architecture',
    riskOrPosture: 'Verified',
    licenseOrMetric: '< 35ms LAN · 0 Cloud Egress',
    summary: 'AMD SEV-SNP / Intel TDX on-prem appliance posture with deterministic >= 0.88 OPA approval gate and 13 composable modules.',
    upstreamOrSpec: 'Spenta Sovereign OS Spec & Roadmap Remix',
  },
  {
    id: 'audit-spenta-safe',
    domain: AuditDomain.SpentaOS,
    domainLabel: 'Spenta Sovereign OS',
    entity: 'Investor SSOT & Dual-Shore Model',
    classification: 'Unit Economics & Financial Governance',
    riskOrPosture: 'Verified',
    licenseOrMetric: '$500k SAFE · $4.5M Cap · 20% Disc',
    summary: '5-year FY2027–FY2031 financial matrix with USD/BDT dual currency normalization (122.61 FX) and 4-tier on-prem server sizing.',
    upstreamOrSpec: 'SPENTA Master SSOT (14 Sections)',
  },
  {
    id: 'audit-hellokhata-dvc',
    domain: AuditDomain.HelloKhata,
    domainLabel: 'HelloKhata Retail OS',
    entity: 'Draft-Verify-Commit Voice POS',
    classification: 'AI-First Bangla/Banglish Retail Engine',
    riskOrPosture: 'Verified',
    licenseOrMetric: 'Offline Sync · Atomic Multi-Branch',
    summary: 'Enforces human confirmation between voice transcription and inventory commit; paired with Dead Stock Detector & Aging Buckets.',
    upstreamOrSpec: 'AI-First Retail OS Deep Dive',
  },
  {
    id: 'audit-hellokhata-repos',
    domain: AuditDomain.HelloKhata,
    domainLabel: 'HelloKhata Retail OS',
    entity: 'Proprietary Retail-AI Core (9 Repos)',
    classification: 'First-Party Product Lineage',
    riskOrPosture: 'Verified',
    licenseOrMetric: '9 Proprietary Repos',
    summary: 'BanglaBiz-AI, BanglaBiz-HK-ERP, HKAI-ShopKeeper, Smart-DigiBiz, GeminAI-STT-TTS, BanglaScript, AIaaS + Bangla NLP/STT upstreams.',
    upstreamOrSpec: 'Farhan First-Party Portfolio',
  },
];

export const QA_CHECKLIST: QaChecklistItem[] = [
  {
    id: 'qa-tokens-semantic',
    group: 'Tokens',
    strength: RuleStrength.Must,
    check: 'Zero raw hex codes exist in component guidance or component stylesheets; all colors, spaces, radii, and shadows resolve via semantic tokens.',
    verificationMethod: 'Run static token grep across component modules and inspect computed CSS custom properties.',
  },
  {
    id: 'qa-tokens-type',
    group: 'Tokens',
    strength: RuleStrength.Must,
    check: 'DM Sans loads cleanly with font.size.base (18.88px / 300 / 33.6064px) for editorial copy and tabular-nums monospace on every table/metric.',
    verificationMethod: 'Inspect computed font-family, line-height, and font-variant-numeric in DevTools.',
  },
  {
    id: 'qa-states-seven',
    group: 'States',
    strength: RuleStrength.Must,
    check: 'Every interactive component implements and verifies all 7 states: default, hover, focus-visible, active, disabled, loading, and error.',
    verificationMethod: 'Step through the Component State Matrix for all 7 component families.',
  },
  {
    id: 'qa-states-loading-cls',
    group: 'States',
    strength: RuleStrength.Must,
    check: 'Loading states set aria-busy="true", announce via polite live region, and keep width/height shift within <= 2px (CLS = 0).',
    verificationMethod: 'Toggle Loading state on buttons and tables while watching bounding box geometry.',
  },
  {
    id: 'qa-states-error-recovery',
    group: 'States',
    strength: RuleStrength.Must,
    check: 'Error states pair border treatment with icon + concrete plain-language recovery copy linked via aria-invalid and aria-describedby.',
    verificationMethod: 'Trigger validation failure and verify screen-reader description and inline recovery.',
  },
  {
    id: 'qa-resp-reflow',
    group: 'Responsive',
    strength: RuleStrength.Must,
    check: 'Zero page-level horizontal overflow at 375px, 768px, 1280px, and 1440px; mobile sticky header height remains <= 15% of viewport height.',
    verificationMethod: 'Test all 4 viewport widths and inspect document.documentElement.scrollWidth === clientWidth.',
  },
  {
    id: 'qa-resp-edge',
    group: 'Responsive',
    strength: RuleStrength.Must,
    check: 'Long-content strings, wide tables (4), and zero-match filtered views handle truncation, keyboard horizontal scrolling, and actionable empty states.',
    verificationMethod: 'Toggle Long Content, Overflow, and Empty State stressors inside the Component Lab and Audit table.',
  },
  {
    id: 'qa-a11y-contrast',
    group: 'Accessibility',
    strength: RuleStrength.Must,
    check: 'All foreground/background token combinations pass WCAG 2.2 AA (>= 4.5:1 text, >= 3:1 UI borders and focus rings).',
    verificationMethod: 'Verify all active pairs in the Live Contrast Checker inside the Tokens view.',
  },
  {
    id: 'qa-a11y-keyboard',
    group: 'Accessibility',
    strength: RuleStrength.Must,
    check: 'Complete keyboard-only traversal (Tab, Shift+Tab, Enter, Space, Arrow keys, Escape) works across top bar, matrix, SVG pathway, and drawer.',
    verificationMethod: 'Unplug pointer and complete end-to-end navigation verifying visible 2px color.border.strong focus rings.',
  },
  {
    id: 'qa-content-gates',
    group: 'Content',
    strength: RuleStrength.Should,
    check: 'Non-negotiable rules use "must", recommendations use "should", and zero static metadata pills or code-comment prefixes appear in UI copy.',
    verificationMethod: 'Review rendered headings, metadata rows, and exported Markdown specification.',
  },
];

export function generateMarkdownSpec(checkedQaIds: string[]): string {
  const passedCount = checkedQaIds.length;
  const totalCount = QA_CHECKLIST.length;

  return `# Alibaba OpenSandbox Review: Self — Design System Specification

## 1. Context & Design Intent
- **Design Intent**: Deliver an implementation-ready, token-driven UI system for Alibaba OpenSandbox Review: Self that guarantees WCAG 2.2 AA accessibility, deterministic seven-state component parity, and zero-overflow density governance across every technical marketing surface.
- **Reference Surface**: https://wavect.io/blog/opensandbox-ai-agent-sandbox-review/
- **Audience**: Developers and technical teams
- **Known Page Component Density**: 408 Links · 60 Buttons · 54 Lists · 24 Inputs · 8 Cards · 6 Navigation Regions · 4 Tables

## 2. Semantic Design Tokens & Foundations
- **Typography**: \`font.family.primary=DM Sans\`, \`font.family.stack=DM Sans, system-ui, sans-serif\`, \`font.size.base=18.88px\`, \`font.weight.base=300\`, \`font.lineHeight.base=33.6064px\`
- **Type Scale**: \`xs=12px\`, \`sm=13px\`, \`md=14px\`, \`lg=15.2px\`, \`xl=16px\`, \`2xl=17.28px\`, \`3xl=18.24px\`, \`4xl=18.88px\`
- **Semantic Colors**: \`color.text.primary=#f1f5f9\`, \`color.text.inverse=#aaaaaa\`, \`color.border.muted=#ffffff\`, \`color.border.strong=#81c5c9\`, \`color.surface.base=#000000\`, \`color.surface.muted=#060a0f\`, \`color.surface.strong=#0d1117\`
- **Spacing Scale**: \`space.1=1.82px\`, \`space.2=2.24px\`, \`space.3=2.4px\`, \`space.4=3.2px\`, \`space.5=5px\`, \`space.6=5.44px\`, \`space.7=6.4px\`, \`space.8=7.2px\`
- **Radii**: \`xs=2px\`, \`sm=6px\`, \`md=10px\`, \`lg=16px\`, \`xl=18px\`, \`2xl=50px\`, \`step7=999px\`, \`step8=9999px\`
- **Motion**: \`motion.duration.instant=150ms\`, \`motion.duration.fast=200ms\`

## 3. Seven-State Component Guidelines (Normative)
Every interactive component **must** implement all seven states using semantic tokens only:
1. **Default**: \`color.surface.strong\` / \`color.surface.muted\`, \`color.text.primary\`, \`shadow.1\`; >= 4.5:1 contrast; logical Tab order; >= 44px mobile touch target.
2. **Hover**: \`color.border.strong\` + \`shadow.2\` within \`motion.duration.instant\` (150ms); fine-pointer scoped; 0px layout shift; Escape-dismissible disclosures.
3. **Focus-Visible**: \`2px solid color.border.strong\` + \`2px\` offset + \`shadow.3\`; Enter/Space activation; never clipped or obscured by sticky headers.
4. **Active**: \`color.surface.muted\` grounded press + \`color.border.strong\` + synchronized \`aria-pressed\`/\`aria-selected\`.
5. **Disabled**: \`color.surface.muted\` + \`color.text.inverse\`; blocks pointer/touch/keyboard activation; uses \`aria-disabled="true"\` + \`aria-describedby\` when contextual reason is needed.
6. **Loading**: \`aria-busy="true"\`, \`role="status"\` polite announcement, locked bounding geometry (<= 2px delta), static fallback under \`prefers-reduced-motion\`.
7. **Error**: High-contrast alert border + explicit icon + plain-language recovery copy (\`font.size.sm\`) linked via \`aria-invalid="true"\` and \`aria-describedby\`.

## 4. Responsive Density, Long Content, Overflow & Empty States
- **Desktop (>=1280px)**: 1200px architectural frame, 2–3 card columns, 40px min targets, full 4-table columns.
- **Tablet (768px–1279px)**: 2-column card collapse, 44px targets, keyboard-focusable horizontal scroll wrappers for wide tables.
- **Mobile (375px–767px)**: 1-column stack, 0px page horizontal overflow, sticky header <= 15% viewport height, 16px (\`font.size.xl\`) input font minimum.
- **Long Content**: Single-line buttons (\`whitespace-nowrap\`), \`text-wrap: balance\` headings, \`min-w-0 break-words\` in flex rows, truncation with full accessible label on identifiers.
- **Overflow**: Every wide data table sits inside \`tabIndex="0" role="region" overflow-x-auto\` with \`shadow.4\` scroll cues.
- **Empty States**: Recessed \`color.surface.muted\` panel explaining active zero-match condition plus one-click recovery CTA.

## 5. Release QA Checklist Status (${passedCount}/${totalCount} Verified)
${QA_CHECKLIST.map((item) => `- [${checkedQaIds.includes(item.id) ? 'x' : ' '}] **${item.strength}** (${item.group}): ${item.check}`).join('\n')}
`;
}
