import {
  ComponentFamily,
  ComponentFamilyRule,
  ComponentState,
  ResponsiveBreakpointRule,
  StateGuidelineSpec,
  ViewportMode,
} from '../types';

export const STATE_GUIDELINES: StateGuidelineSpec[] = [
  {
    state: ComponentState.Default,
    label: 'Default',
    summary:
      'Resting baseline establishing visual hierarchy, accessible name semantics, and resting elevation without hover or focus reliance.',
    semanticTokens: {
      surface: 'color.surface.strong (cards/inputs) or color.surface.muted (secondary controls)',
      ink: 'color.text.primary (primary label) · color.text.inverse (secondary metadata)',
      borderAndShadow: 'shadow.1 + color.border.muted hairline (9% opacity); radius.sm or radius.md',
      motion: 'No ambient animation; ready to settle in motion.duration.instant (150ms)',
    },
    keyboardPattern:
      'Every interactive element must participate in natural DOM tab order (Tab / Shift+Tab). Non-interactive containers must not receive tabIndex="0" unless acting as scrollable overflow regions.',
    pointerAndTouchPattern:
      'Actionable triggers must expose cursor: pointer and hit dimensions >= 40x40px on desktop and >= 44x44px on touch viewports with at least space.8 (7.2px) inter-target separation.',
    passCriterion:
      'Text contrast >= 4.5:1 (normal) and >= 3:1 (UI boundaries/large text); accessible name programmatically exposed via visible text or aria-label.',
    failCriterion:
      'Raw hex values hard-coded inside component CSS, missing accessible label, or resting contrast below 4.5:1 on color.surface.strong.',
    wcagRefs: ['1.4.3 Contrast (Minimum)', '1.4.11 Non-text Contrast', '2.5.8 Target Size'],
    mustRules: [
      'Component styles must bind exclusively to semantic tokens (color.surface.*, color.text.*, color.border.*, shadow.*).',
      'Every interactive component must expose a descriptive, unambiguous label stating the exact action or field purpose.',
    ],
    shouldRules: [
      'Secondary metadata should use color.text.inverse separated by unboxed typographic dividers rather than pill containers.',
    ],
  },
  {
    state: ComponentState.Hover,
    label: 'Hover',
    summary:
      'Fine-pointer affordance confirming interactivity through border promotion and controlled elevation without shifting layout geometry.',
    semanticTokens: {
      surface: 'color.surface.strong with subtle luminosity lift inside single-elevation bounds',
      ink: 'color.text.primary (promoted from color.text.inverse on muted links/tabs)',
      borderAndShadow: 'color.border.strong perimeter upgrade paired with shadow.2',
      motion: 'motion.duration.instant (150ms) compositor-only transition (border-color, opacity, transform)',
    },
    keyboardPattern:
      'Any informational disclosure or tooltip revealed on hover must also open on keyboard focus (FocusVisible) and dismiss cleanly on Escape without moving keyboard focus.',
    pointerAndTouchPattern:
      'Scope hover styles to @media (hover: hover) so touch devices never experience sticky hover artifacts after tap release. Hover tooltips must remain hoverable and non-obscuring.',
    passCriterion:
      'Hover transitions complete <= 150ms, produce 0px Cumulative Layout Shift (CLS = 0), and maintain >= 4.5:1 text legibility across all hovered states.',
    failCriterion:
      'Hover reveals essential actions unavailable to keyboard users, alters box height/width causing sibling jitter, or drops contrast below 4.5:1.',
    wcagRefs: ['1.4.13 Content on Hover or Focus', '1.4.3 Contrast (Minimum)'],
    mustRules: [
      'Hover effects must never animate layout properties (width, height, margin, padding).',
      'Hover-triggered callouts must remain dismissible via Escape and persistent while pointer moves over the callout.',
    ],
    shouldRules: [
      'Interactive cards should upgrade from shadow.1 to shadow.2 while keeping border width constant at 1px.',
    ],
  },
  {
    state: ComponentState.FocusVisible,
    label: 'Focus-Visible',
    summary:
      'High-visibility keyboard focus indicator ensuring unmistakable location tracking across dark obsidian surfaces during keyboard-first navigation.',
    semanticTokens: {
      surface: 'color.surface.strong or color.surface.base backdrop beneath ring offset',
      ink: 'color.text.primary',
      borderAndShadow: '2px solid color.border.strong outline + 2px offset + shadow.3 outer ring',
      motion: 'motion.duration.instant (150ms) ring reveal (0ms under prefers-reduced-motion)',
    },
    keyboardPattern:
      'Triggered on Tab, Shift+Tab, and roving-tabindex ArrowLeft/ArrowRight navigation inside tablists or segmented controls. Custom interactive elements must handle Enter and Space (calling preventDefault on Space to block scroll).',
    pointerAndTouchPattern:
      'Use :focus-visible so mouse clicks do not leave lingering focus halos on buttons while text inputs always retain a visible focus ring upon click or tap.',
    passCriterion:
      'Focus ring perimeter achieves >= 3:1 contrast against adjacent color.surface.base / color.surface.strong, is never clipped by overflow: hidden, and focused elements remain unobstructed by sticky headers.',
    failCriterion:
      'outline: none without a high-contrast replacement, focus trapped without Escape exit, or sticky top bar covering the focused target.',
    wcagRefs: ['2.4.7 Focus Visible', '2.4.11 Focus Not Obscured', '2.1.1 Keyboard'],
    mustRules: [
      'Every focusable element must render a 2px color.border.strong focus-visible outline with >= 2px offset.',
      'Scrollable containers must preserve scroll-margin-top above the sticky top bar so focused anchors are never hidden.',
    ],
    shouldRules: [
      'Composite widgets (tablists, pathway trees) should support Arrow key traversal alongside Tab exit.',
    ],
  },
  {
    state: ComponentState.Active,
    label: 'Active',
    summary:
      'Immediate tactile confirmation during pointer press, touch contact, or keyboard Enter/Space engagement, plus persistent pressed/selected states.',
    semanticTokens: {
      surface: 'color.surface.muted grounded fill (or color.border.strong tint for selected toggles)',
      ink: 'color.text.primary',
      borderAndShadow: 'color.border.strong border + shadow.1 grounded elevation (shadow.3 on selected primary tabs)',
      motion: 'motion.duration.instant (150ms) subtle transform: scale(0.985) disabled under reduced motion',
    },
    keyboardPattern:
      'Activates on Enter/Space keydown for buttons and links (Enter only for native anchors). Toggle buttons and tabs must update aria-pressed="true" or aria-selected="true" synchronously.',
    pointerAndTouchPattern:
      'Pointer down triggers active compression immediately; dragging outside control bounds before pointer up must cancel activation without firing the action handler.',
    passCriterion:
      'Active and selected states remain distinguishable from default and hover without relying solely on hue, maintain >= 4.5:1 contrast, and emit accurate ARIA pressed/selected state.',
    failCriterion:
      'State toggle indicates selection by subtle color tint alone (missing border/weight/ARIA indicator) or fires duplicate handlers on touch + click.',
    wcagRefs: ['1.4.1 Use of Color', '4.1.2 Name, Role, Value'],
    mustRules: [
      'Active toggles and tabs must synchronize visual state with aria-pressed or aria-selected.',
      'Primary action feedback must register within motion.duration.instant (150ms).',
    ],
    shouldRules: [
      'Selected navigation items should pair color.border.strong accenting with a solid structural indicator rather than color tint alone.',
    ],
  },
  {
    state: ComponentState.Disabled,
    label: 'Disabled',
    summary:
      'Non-interactive state communicating unavailable actions while preserving structural alignment and contextual discoverability when needed.',
    semanticTokens: {
      surface: 'color.surface.muted',
      ink: 'color.text.inverse at reduced optical prominence (60% opacity for non-critical controls)',
      borderAndShadow: 'color.border.muted subtle hairline; zero shadow.2 or shadow.3 lift',
      motion: 'Zero hover, focus lift, or press animation',
    },
    keyboardPattern:
      'Use native disabled when a control is completely irrelevant; use aria-disabled="true" when the user needs to discover why an action is blocked (linking a concise reason via aria-describedby while intercepting Enter/Space/click).',
    pointerAndTouchPattern:
      'Display cursor: not-allowed on fine pointers; block all pointer and touch handlers so repeated taps never enqueue stale requests.',
    passCriterion:
      'Disabled control verifiably blocks click, Enter, and Space mutations, exhibits no misleading hover lift, and links an explanatory reason whenever blocking form progression.',
    failCriterion:
      'An aria-disabled="true" trigger still executes onClick/onKeyDown, or a disabled button leaves users with zero explanation of what prerequisite is missing.',
    wcagRefs: ['4.1.2 Name, Role, Value', '3.3.2 Labels or Instructions'],
    mustRules: [
      'Disabled interactive elements must block pointer, touch, and keyboard activation.',
      'Form submit actions blocked by prerequisites must associate an explanatory helper string via aria-describedby.',
    ],
    shouldRules: [
      'Teams should prefer keeping form submission enabled with clear inline validation over silently disabling submit buttons without explanation.',
    ],
  },
  {
    state: ComponentState.Loading,
    label: 'Loading',
    summary:
      'Deterministic pending state that preserves component dimensions, blocks duplicate submissions, and announces progress to assistive technology.',
    semanticTokens: {
      surface: 'color.surface.strong (controls) or color.surface.muted (geometry-matched skeletons)',
      ink: 'color.text.primary paired with color.border.strong spinner or progress bar',
      borderAndShadow: 'color.border.strong subtle perimeter + shadow.1',
      motion: 'motion.duration.fast (200ms) reveal; reduced-motion replaces spin with static text status',
    },
    keyboardPattern:
      'Set aria-busy="true" on the loading control or region and preserve keyboard focus on the trigger (or move cleanly to results upon completion). Block Enter/Space re-submission while busy.',
    pointerAndTouchPattern:
      'Ignore duplicate pointer/touch taps while busy; lock button min-width to its default label width so surrounding toolbar items never reflow.',
    passCriterion:
      'Screen reader status updates via role="status" / aria-live="polite", control width changes by <= 2px during loading, and prefers-reduced-motion swaps animated spinners for clear textual status.',
    failCriterion:
      'Spinner-only button with no accessible status text, layout jump when entering/exiting loading, or uncapped double-click submission.',
    wcagRefs: ['4.1.3 Status Messages', '2.3.3 Animation from Interactions'],
    mustRules: [
      'Loading buttons and regions must declare aria-busy="true" and pair visual indicators with polite live-region announcements.',
      'Skeleton placeholders must match loaded row/card geometry within <= 2px delta.',
    ],
    shouldRules: [
      'Operations completing under 200ms should avoid flashing transient skeletons.',
    ],
  },
  {
    state: ComponentState.Error,
    label: 'Error',
    summary:
      'High-clarity fault state combining structural border contrast, explicit warning iconography, and actionable plain-language recovery copy.',
    semanticTokens: {
      surface: 'color.surface.strong with restrained semantic alert wash (10% opacity)',
      ink: 'color.text.primary for field values · high-contrast alert token for error copy (>= 4.5:1)',
      borderAndShadow: '1px solid semantic error border + shadow.4 grounding; font.size.sm (13px) helper text',
      motion: 'motion.duration.fast (200ms) non-jarring inline reveal (never shake animations)',
    },
    keyboardPattern:
      'Apply aria-invalid="true" and connect the inline error message with aria-describedby. On failed submission, move focus to the first invalid control or error summary banner; allow inline correction and retry.',
    pointerAndTouchPattern:
      'Error recovery buttons (e.g., "Retry Validation", "Reset Field") must meet >= 44px touch targets and clear error styling immediately once the corrected value passes validation.',
    passCriterion:
      'Error signaling combines icon + explicit text + border (never color alone), achieves >= 4.5:1 text contrast on color.surface.strong, and states the concrete fix required.',
    failCriterion:
      'Red border only without text, vague "Invalid input" copy, missing aria-invalid / aria-describedby association, or full-page crash without recovery action.',
    wcagRefs: ['1.4.1 Use of Color', '3.3.1 Error Identification', '3.3.3 Error Suggestion'],
    mustRules: [
      'Every error state must combine border treatment, explicit icon, and plain-language recovery instructions.',
      'Invalid inputs must set aria-invalid="true" and reference their error container via aria-describedby.',
    ],
    shouldRules: [
      'Validation should clear dynamically on input once the user resolves the documented error condition.',
    ],
  },
];

export const COMPONENT_FAMILY_RULES: ComponentFamilyRule[] = [
  {
    family: ComponentFamily.Button,
    title: 'Action Buttons',
    inventoryCount: 60,
    anatomy: ['Container (radius.sm 6px)', 'Optional leading affordance icon (16px)', 'Single-line action label', 'Optional loading status indicator'],
    variants: ['Primary (color.border.strong accent)', 'Secondary (color.surface.strong + shadow.1)', 'Ghost (transparent -> color.surface.muted)', 'Destructive (alert border + explicit label)'],
    typographyTokens: ['font.family.primary', 'font.size.md (14px)', 'font.size.lg (15.2px)'],
    spacingTokens: ['space.7 vertical padding (2x)', 'space.8 horizontal padding (2x–3x)', 'space.6 icon-to-label gap'],
    responsiveBehavior: {
      [ViewportMode.Desktop]: 'Inline horizontal grouping with space.8–2x space.8 gap; min height 40px; strictly single-line labels.',
      [ViewportMode.Tablet]: 'Maintain horizontal button pairs; overflow secondary actions into clean segmented menus before wrapping.',
      [ViewportMode.Mobile]: 'Minimum 44px touch height; primary + secondary CTA pairs stack full-width with 2x space.8 vertical gap.',
    },
    edgeCases: {
      longContent: 'Buttons must never wrap to two lines. Cap label length to 2–4 action words; apply truncate + max-w-[260px] + aria-label for dynamic labels.',
      overflow: 'Action toolbars with >3 buttons scroll horizontally inside a focusable region or collapse low-priority actions into a single menu trigger.',
      emptyState: 'If an action depends on empty selection, either hide the contextual toolbar or use aria-disabled="true" with explicit tooltip/helper copy.',
    },
    keyboardShortcuts: ['Tab / Shift+Tab to focus', 'Enter or Space to activate', 'Escape to cancel open menu button'],
  },
  {
    family: ComponentFamily.Input,
    title: 'Form Inputs & Search Fields',
    inventoryCount: 24,
    anatomy: ['Persistent visible <label>', 'Input shell (color.surface.strong + shadow.1 + radius.sm)', 'Optional clear / trailing control', 'Reserved helper & error slot'],
    variants: ['Text Input', 'Search Filter Input', 'Monospace Token / Config Field', 'Select Dropdown'],
    typographyTokens: ['font.size.xl (16px input text)', 'font.size.sm (13px label & error)', 'font.size.xs (character/unit hint)'],
    spacingTokens: ['space.5 label-to-input gap', '2x space.8 horizontal inner padding', 'space.6 helper text offset'],
    responsiveBehavior: {
      [ViewportMode.Desktop]: 'Max measure 480px–560px for single fields; 2-column form grids align cleanly with 3x space.8 gutter.',
      [ViewportMode.Tablet]: 'Preserve 2-column short fields (e.g., port + timeout); long URL/command inputs span full width.',
      [ViewportMode.Mobile]: 'Single-column 100% width; strictly 16px (font.size.xl) input text to prevent mobile Safari auto-zoom; 44px minimum height.',
    },
    edgeCases: {
      longContent: 'Single-line inputs scroll text horizontally internally; labels wrap cleanly at full container width without overlapping trailing icons.',
      overflow: 'Long URLs or CLI flags inside readonly copy inputs must use font-mono overflow-x-auto and an explicit Copy button.',
      emptyState: 'Never rely on placeholder text as the sole label. Empty search fields display neutral prompt text and hide the Clear button until length > 0.',
    },
    keyboardShortcuts: ['Tab to enter field', 'Escape to clear search input', 'Enter to submit enclosing form'],
  },
  {
    family: ComponentFamily.Navigation,
    title: 'Navigation Regions & Tab Bars',
    inventoryCount: 6,
    anatomy: ['Semantic <nav aria-label="..."> landmark', 'Single-line text links or tab buttons', 'Active underline or color.border.strong indicator', 'Skip-to-content bypass link'],
    variants: ['Primary Top Bar (3-zone contract)', 'Section Segmented Tabs', 'In-Page Anchor Rail', 'Footer Link Directory'],
    typographyTokens: ['font.size.md (14px)', 'font.size.sm (13px secondary)'],
    spacingTokens: ['space.8–3x space.8 link spacing', 'space.6 active underline offset'],
    responsiveBehavior: {
      [ViewportMode.Desktop]: 'Single-row 3-zone top bar (Wordmark — 5 nav links — 1 CTA); zero wrapping or second rows.',
      [ViewportMode.Tablet]: 'Maintain 3-zone top bar with compact 2x space.8 nav link gap; secondary sub-navs scroll horizontally.',
      [ViewportMode.Mobile]: 'Top bar height <= 15% of viewport height; links collapse into keyboard-accessible disclosure menu with 44px row targets.',
    },
    edgeCases: {
      longContent: 'Primary nav items must stay 1–2 words (whitespace-nowrap). Long breadcrumb segments truncate middle items while keeping current page visible.',
      overflow: 'Horizontal tablists wrap inside overflow-x-auto without clipping focus rings (add 4px vertical padding inside scroll viewport).',
      emptyState: 'Every one of the 6 navigation landmarks must declare a distinct aria-label; empty menu sections must be omitted from the DOM.',
    },
    keyboardShortcuts: ['Tab between nav zones', 'ArrowLeft / ArrowRight across tablist items', 'Home / End to jump first/last tab', 'Escape to close mobile menu'],
  },
  {
    family: ComponentFamily.Card,
    title: 'Specification & Audit Cards',
    inventoryCount: 8,
    anatomy: ['Single-elevation container (color.surface.strong + shadow.1 + radius.md)', 'Quiet unboxed metadata line (· separated)', 'Balanced heading (font.size.2xl)', 'Structured body & single footer action'],
    variants: ['Summary Feature Card', 'Interactive Audit Card', 'Metric Reference Card'],
    typographyTokens: ['font.size.2xl (17.28px title)', 'font.size.md (14px body)', 'font.size.xs (12px unboxed metadata)'],
    spacingTokens: ['3x space.8 outer padding (21.6px+)', '2x space.8 internal child gap'],
    responsiveBehavior: {
      [ViewportMode.Desktop]: '2-column or 3-column aligned grids using items-stretch; never nest bordered cards inside cards.',
      [ViewportMode.Tablet]: 'Collapse 3-column card rows to balanced 2-column grid with uniform vertical alignment.',
      [ViewportMode.Mobile]: 'Full-width 1-column stack with 2x space.8 vertical spacing; minimum 16px outer container padding.',
    },
    edgeCases: {
      longContent: 'Apply min-w-0 and text-wrap: balance on titles; cap preview summaries to 3 lines with expandable disclosure or inspector drawer.',
      overflow: 'Inline code snippets inside cards must use break-words or dedicated overflow-x-auto wrappers so card grids never blow out horizontally.',
      emptyState: 'When a card collection has 0 items, replace the grid with one full-width empty-state module containing explanation + reset action.',
    },
    keyboardShortcuts: ['Tab to primary card link/button', 'Enter or Space to open linked inspector'],
  },
  {
    family: ComponentFamily.Table,
    title: 'Structured Data Tables',
    inventoryCount: 4,
    anatomy: ['Focusable scroll region (tabIndex="0", role="region")', 'Sticky header row (color.surface.muted)', 'Compact 36px–44px data rows', 'Left-aligned text + right-aligned tabular-nums metrics'],
    variants: ['Token Specification Table', 'WCAG Pass/Fail Matrix', 'Attached Audit Comparison Table', 'Density Inventory Table'],
    typographyTokens: ['font.size.sm (13px body cells)', 'font.size.xs (12px column headers)', 'font-mono tabular-nums (metrics)'],
    spacingTokens: ['space.7–2x space.6 vertical cell padding', '2x space.8 horizontal column padding'],
    responsiveBehavior: {
      [ViewportMode.Desktop]: 'Full multi-column visibility inside 1200px frame with clear hairline row dividers (shadow.1).',
      [ViewportMode.Tablet]: 'Horizontal scroll wrapper engages cleanly with sticky header and shadow.4 edge affordance.',
      [ViewportMode.Mobile]: 'Preserve semantic <table> structure inside keyboard-scrollable region with min-w-[640px] and swipe/scroll hint.',
    },
    edgeCases: {
      longContent: 'Primary description columns wrap cleanly at max-w-[36ch]; monospace slugs/tokens use break-all or truncate with title attribute.',
      overflow: 'Never clip columns silently with overflow: hidden. Always provide overflow-x-auto + tabIndex="0" so keyboard Arrow keys scroll horizontally.',
      emptyState: 'Render a single <td colSpan={N}> empty-state row explaining active filter criteria plus a one-click Reset Filters button.',
    },
    keyboardShortcuts: ['Tab to table region', 'ArrowLeft / ArrowRight to scroll wide tables', 'Enter / Space on sortable column headers'],
  },
  {
    family: ComponentFamily.List,
    title: 'Editorial & Checklist Lists',
    inventoryCount: 54,
    anatomy: ['Semantic <ul> / <ol> container', 'Optional tabular index (01.–09.)', 'Primary prose body (65ch–75ch max)', 'Hairline divider (color.border.muted 9%)'],
    variants: ['Editorial Numbered List', 'Interactive QA Checklist', 'Audit Finding List'],
    typographyTokens: ['font.size.xl (16px)', 'font.size.base (18.88px long-form)', 'font.size.xs (tabular index)'],
    spacingTokens: ['space.6 compact item gap', '2x space.8 editorial row separation'],
    responsiveBehavior: {
      [ViewportMode.Desktop]: 'Constrained 65ch–75ch reading measure or clean 2-column paired lists with generous breathing room.',
      [ViewportMode.Tablet]: 'Single-column full-measure list rows keeping metadata aligned cleanly right or beneath title.',
      [ViewportMode.Mobile]: 'Interactive checklist rows enforce >= 44px vertical hit height and stack secondary verification notes beneath main label.',
    },
    edgeCases: {
      longContent: 'Multi-sentence rules wrap cleanly without colliding with leading checkboxes or numeric indices (use items-start alignment).',
      overflow: 'Inline token identifiers inside prose wrap using break-words; long checklists support group filtering rather than infinite walls.',
      emptyState: 'Filtered lists with zero entries render an inline color.surface.muted empty panel with count summary and Clear Filter action.',
    },
    keyboardShortcuts: ['Tab across interactive checklist items', 'Space to toggle checkbox state', 'Enter to expand detail disclosures'],
  },
  {
    family: ComponentFamily.Link,
    title: 'Inline & Directory Links',
    inventoryCount: 408,
    anatomy: ['Semantic <a href="..."> element', 'Underline indicator (offset space.3)', 'Optional external affordance icon', 'Focus-visible color.border.strong ring'],
    variants: ['Inline Prose Link', 'Directory / Reference Link', 'Skip Navigation Link'],
    typographyTokens: ['font.size.base (18.88px prose)', 'font.size.md (14px directory)', 'font.size.sm (13px footer)'],
    spacingTokens: ['space.3 underline offset', 'space.6 vertical directory hit padding'],
    responsiveBehavior: {
      [ViewportMode.Desktop]: 'Dense directory grids distribute across 3–4 balanced columns with clear vertical rhythm.',
      [ViewportMode.Tablet]: 'Directory lists reflow to 2 columns preserving scannable line spacing.',
      [ViewportMode.Mobile]: 'Directory links expand to full-width 44px touch rows; inline prose links preserve clear underline contrast.',
    },
    edgeCases: {
      longContent: 'Never use generic "Click here" or "Learn more" link text; wrap long repository URLs with break-all inside constrained sidebars.',
      overflow: '408 marketing-surface links must be grouped under clear section headings and landmarks so screen-reader rotor lists stay navigable.',
      emptyState: 'Unresolved or archived source links must render explicit "[Unverified]" or "[Archived]" status text rather than dead # anchors.',
    },
    keyboardShortcuts: ['Tab / Shift+Tab to traverse links', 'Enter to activate navigation'],
  },
];

export const RESPONSIVE_BREAKPOINTS: ResponsiveBreakpointRule[] = [
  {
    id: ViewportMode.Desktop,
    label: 'Desktop Baseline',
    range: '>= 1280px (1440px reference)',
    containerMaxWidth: '1200px centered architectural frame',
    columns: '2–3 columns for cards (8 total); split canvas + inspector drawer for pathway',
    touchTargetMin: '40px x 40px minimum interactive control height',
    sectionRhythm: '6x–8x space.8 (43.2px–57.6px) between major bands; 3x space.8 card padding',
    typographyAdjustment: 'Full OpenSandbox scale: font.size.base (18.88px) prose at 33.6064px line-height; fluid display headlines up to 52px',
    stickyBudget: 'Single-row 64px top bar (~7% of 900px viewport height)',
    overflowPolicy: 'Zero document horizontal overflow; all 4 tables display full columns with tabular-nums alignment',
  },
  {
    id: ViewportMode.Tablet,
    label: 'Tablet Adaptation',
    range: '768px – 1279px',
    containerMaxWidth: '100% width with 3x space.8 (21.6px) outer gutters',
    columns: '2-column card grids; Pathway Inspector slides as overlay panel with Escape dismissal',
    touchTargetMin: '44px x 44px minimum touch target for all controls',
    sectionRhythm: '5x space.8 (36px) band separation; 2.5x space.8 card padding',
    typographyAdjustment: 'Maintain font.size.xl (16px) inputs and font.size.md (14px) buttons; clamp hero display headline to 36px–42px',
    stickyBudget: 'Single-row 60px top bar (~6%–8% of tablet viewport height)',
    overflowPolicy: 'Data tables and multi-option segmented toolbars engage keyboard-focusable horizontal scroll regions with shadow.4 cues',
  },
  {
    id: ViewportMode.Mobile,
    label: 'Mobile Narrow',
    range: '375px – 767px',
    containerMaxWidth: '100% width with 16px minimum side padding',
    columns: 'Single-column vertical flow across all cards, forms, and lists',
    touchTargetMin: '44px x 44px strict minimum touch target + >= space.8 (7.2px) inter-control spacing',
    sectionRhythm: '4x space.8 (28.8px) band separation; outer container padding always >= internal child gap',
    typographyAdjustment: 'Prose scales smoothly to font.size.xl (16px) for comfortable mobile measure while preserving >= 16px inputs (no iOS zoom)',
    stickyBudget: 'Strictly <= 15% of mobile viewport height (<= 56px compact header; navigation collapses into disclosure drawer)',
    overflowPolicy: '0px page-level horizontal scroll; tables scroll inside dedicated region with explicit swipe/keyboard instruction',
  },
];
