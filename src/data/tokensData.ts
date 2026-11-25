import { ComponentFamily, DensityInventoryItem, DesignToken } from '../types';

export const DESIGN_INTENT_STATEMENT =
  'Deliver an implementation-ready, token-driven UI system for Alibaba OpenSandbox Review: Self that guarantees WCAG 2.2 AA accessibility, deterministic seven-state component parity, and zero-overflow density governance across every technical marketing surface.';

export const OPENSANDBOX_TOKENS: DesignToken[] = [
  // Colors
  {
    id: 'color-text-primary',
    token: 'color.text.primary',
    cssVar: '--color-text-primary',
    value: '#f1f5f9',
    category: 'color',
    usage: 'Primary headings, body prose, table cells, and high-priority labels on dark obsidian surfaces.',
    notes: 'Achieves 19.1:1 on color.surface.base and 17.4:1 on color.surface.strong.',
  },
  {
    id: 'color-text-inverse',
    token: 'color.text.inverse',
    cssVar: '--color-text-inverse',
    value: '#aaaaaa',
    category: 'color',
    usage: 'Secondary metadata, helper copy, disabled ink base, and table column captions.',
    notes: 'Achieves 9.0:1 on color.surface.base and 8.2:1 on color.surface.strong.',
  },
  {
    id: 'color-border-strong',
    token: 'color.border.strong',
    cssVar: '--color-border-strong',
    value: '#81c5c9',
    category: 'color',
    usage: 'Primary interactive accents, focus-visible rings, active tabs, and highlighted SVG conduits.',
    notes: 'Achieves 10.9:1 on color.surface.base and 9.9:1 on color.surface.strong.',
  },
  {
    id: 'color-border-muted',
    token: 'color.border.muted',
    cssVar: '--color-border-muted',
    value: '#ffffff',
    category: 'color',
    usage: 'Hairline container dividers rendered at controlled opacity (9%–16%) via shadow.1 and subtle borders.',
    notes: 'Use hairline opacity for passive structure; upgrade to color.border.strong for focus and active affordances.',
  },
  {
    id: 'color-surface-base',
    token: 'color.surface.base',
    cssVar: '--color-surface-base',
    value: '#000000',
    category: 'color',
    usage: 'Primary viewport canvas (60% neutral budget) and backdrop for high-contrast prose.',
  },
  {
    id: 'color-surface-muted',
    token: 'color.surface.muted',
    cssVar: '--color-surface-muted',
    value: '#060a0f',
    category: 'color',
    usage: 'Alternating editorial bands, recessed table headers, disabled controls, and empty-state regions.',
  },
  {
    id: 'color-surface-strong',
    token: 'color.surface.strong',
    cssVar: '--color-surface-strong',
    value: '#0d1117',
    category: 'color',
    usage: 'Elevated single-level cards, form inputs, inspector drawers, and interactive workbench panels.',
  },

  // Typography
  {
    id: 'font-family-primary',
    token: 'font.family.primary',
    cssVar: '--font-family-primary',
    value: 'DM Sans',
    category: 'typography',
    usage: 'Primary display and editorial reading typeface across all headings, controls, and copy.',
  },
  {
    id: 'font-family-stack',
    token: 'font.family.stack',
    cssVar: '--font-family-stack',
    value: 'DM Sans, system-ui, sans-serif',
    category: 'typography',
    usage: 'Root document font stack with deterministic geometric sans fallback.',
  },
  {
    id: 'font-size-base',
    token: 'font.size.base',
    cssVar: '--font-size-base',
    value: '18.88px',
    category: 'typography',
    usage: 'Long-form review body prose paired with font.weight.base (300) and font.lineHeight.base (33.6064px).',
  },
  {
    id: 'font-weight-base',
    token: 'font.weight.base',
    cssVar: '--font-weight-base',
    value: '300',
    category: 'typography',
    usage: 'Default editorial body weight on dark obsidian; pair with +0.01em optical tracking for crisp legibility.',
  },
  {
    id: 'font-lineHeight-base',
    token: 'font.lineHeight.base',
    cssVar: '--font-line-height-base',
    value: '33.6064px',
    category: 'typography',
    usage: '1.78x editorial reading line-height for 65ch–75ch long-form technical analysis blocks.',
  },
  {
    id: 'font-size-xs',
    token: 'font.size.xs',
    cssVar: '--font-size-xs',
    value: '12px',
    category: 'typography',
    usage: 'Tabular index labels, compact metadata dividers, and WCAG code identifiers.',
  },
  {
    id: 'font-size-sm',
    token: 'font.size.sm',
    cssVar: '--font-size-sm',
    value: '13px',
    category: 'typography',
    usage: 'Form field labels, inline validation messages, and compact data table cells.',
  },
  {
    id: 'font-size-md',
    token: 'font.size.md',
    cssVar: '--font-size-md',
    value: '14px',
    category: 'typography',
    usage: 'Buttons, primary navigation links, filter controls, and dense directory lists.',
  },
  {
    id: 'font-size-lg',
    token: 'font.size.lg',
    cssVar: '--font-size-lg',
    value: '15.2px',
    category: 'typography',
    usage: 'Prominent action triggers, sub-card descriptions, and inspector drawer body copy.',
  },
  {
    id: 'font-size-xl',
    token: 'font.size.xl',
    cssVar: '--font-size-xl',
    value: '16px',
    category: 'typography',
    usage: 'Interactive form input text (prevents mobile iOS auto-zoom), list titles, and empty-state headings.',
  },
  {
    id: 'font-size-2xl',
    token: 'font.size.2xl',
    cssVar: '--font-size-2xl',
    value: '17.28px',
    category: 'typography',
    usage: 'Sub-section headings and lead card titles.',
  },
  {
    id: 'font-size-3xl',
    token: 'font.size.3xl',
    cssVar: '--font-size-3xl',
    value: '18.24px',
    category: 'typography',
    usage: 'Technical specification lead-ins and pathway pillar titles.',
  },
  {
    id: 'font-size-4xl',
    token: 'font.size.4xl',
    cssVar: '--font-size-4xl',
    value: '18.88px',
    category: 'typography',
    usage: 'Base editorial anchor size; display headlines scale proportionally above 4xl via fluid clamp.',
  },

  // Spacing
  {
    id: 'space-1',
    token: 'space.1',
    cssVar: '--space-1',
    value: '1.82px',
    category: 'spacing',
    usage: 'Micro hairline offsets and icon optical alignment.',
  },
  {
    id: 'space-2',
    token: 'space.2',
    cssVar: '--space-2',
    value: '2.24px',
    category: 'spacing',
    usage: 'Focus-visible outline offset base unit and tight superscript spacing.',
  },
  {
    id: 'space-3',
    token: 'space.3',
    cssVar: '--space-3',
    value: '2.4px',
    category: 'spacing',
    usage: 'Fine underline offset on inline prose links.',
  },
  {
    id: 'space-4',
    token: 'space.4',
    cssVar: '--space-4',
    value: '3.2px',
    category: 'spacing',
    usage: 'Compact gap between stacked mono tokens and metadata separators.',
  },
  {
    id: 'space-5',
    token: 'space.5',
    cssVar: '--space-5',
    value: '5px',
    category: 'spacing',
    usage: 'Minimum vertical gap between form label and input control or helper message.',
  },
  {
    id: 'space-6',
    token: 'space.6',
    cssVar: '--space-6',
    value: '5.44px',
    category: 'spacing',
    usage: 'Compact vertical list item padding and icon-to-label inline spacing.',
  },
  {
    id: 'space-7',
    token: 'space.7',
    cssVar: '--space-7',
    value: '6.4px',
    category: 'spacing',
    usage: 'Segmented control internal padding and compact table cell vertical rhythm.',
  },
  {
    id: 'space-8',
    token: 'space.8',
    cssVar: '--space-8',
    value: '7.2px',
    category: 'spacing',
    usage: 'Primary structural rhythm unit; compose layout spacing in explicit multiples (2x=14.4px, 3x=21.6px, 4x=28.8px, 6x=43.2px).',
  },

  // Radii
  {
    id: 'radius-xs',
    token: 'radius.xs',
    cssVar: '--radius-xs',
    value: '2px',
    category: 'radius',
    usage: 'Inline code spans and dense table sort indicators.',
  },
  {
    id: 'radius-sm',
    token: 'radius.sm',
    cssVar: '--radius-sm',
    value: '6px',
    category: 'radius',
    usage: 'Standard buttons, text inputs, segmented toggles, and compact controls.',
  },
  {
    id: 'radius-md',
    token: 'radius.md',
    cssVar: '--radius-md',
    value: '10px',
    category: 'radius',
    usage: 'Specification cards, data table frames, empty-state containers, and tooltips.',
  },
  {
    id: 'radius-lg',
    token: 'radius.lg',
    cssVar: '--radius-lg',
    value: '16px',
    category: 'radius',
    usage: 'Primary architecture stage, interactive workbench frames, and modal shells.',
  },
  {
    id: 'radius-xl',
    token: 'radius.xl',
    cssVar: '--radius-xl',
    value: '18px',
    category: 'radius',
    usage: 'Outer shell wrappers when nesting radius.md inner panels (r_inner = r_outer - padding).',
  },
  {
    id: 'radius-2xl',
    token: 'radius.2xl',
    cssVar: '--radius-2xl',
    value: '50px',
    category: 'radius',
    usage: 'Reserved exclusively for specialized rounded media frames; never for static metadata pills.',
  },
  {
    id: 'radius-step7',
    token: 'radius.step7',
    cssVar: '--radius-step7',
    value: '999px',
    category: 'radius',
    usage: 'Interactive toggle switches and progress track rails.',
  },
  {
    id: 'radius-step8',
    token: 'radius.step8',
    cssVar: '--radius-step8',
    value: '9999px',
    category: 'radius',
    usage: 'Circular icon buttons, radio rings, and pathway node connectors.',
  },

  // Shadows
  {
    id: 'shadow-1',
    token: 'shadow.1',
    cssVar: '--shadow-1',
    value: 'rgba(255, 255, 255, 0.09) 0px 0px 0px 1px, rgba(0, 0, 0, 0.45) 0px 2px 6px 0px',
    category: 'shadow',
    usage: 'Resting elevation for cards, inputs, tables, and default interactive panels.',
  },
  {
    id: 'shadow-2',
    token: 'shadow.2',
    cssVar: '--shadow-2',
    value: 'rgba(255, 255, 255, 0.09) 0px 0px 0px 1px, rgba(0, 0, 0, 0.45) 0px 0px 24px 0px',
    category: 'shadow',
    usage: 'Hover elevation for interactive cards, dropdown menus, and inspector overlays.',
  },
  {
    id: 'shadow-3',
    token: 'shadow.3',
    cssVar: '--shadow-3',
    value: 'rgba(69, 157, 161, 0.25) 0px 0px 0px 1px, rgba(69, 157, 161, 0.18) 0px 8px 40px 0px',
    category: 'shadow',
    usage: 'Active teal highlight glow for focused panels, selected architecture nodes, and primary CTAs.',
  },
  {
    id: 'shadow-4',
    token: 'shadow.4',
    cssVar: '--shadow-4',
    value: 'rgba(0, 0, 0, 0.38) 0px 8px 28px 0px',
    category: 'shadow',
    usage: 'Deep scrim grounding for modals, error callouts, and horizontal table scroll edges.',
  },

  // Motion
  {
    id: 'motion-instant',
    token: 'motion.duration.instant',
    cssVar: '--motion-duration-instant',
    value: '150ms',
    category: 'motion',
    usage: 'Hover border transitions, focus-visible rings, active press feedback, and link underlines.',
  },
  {
    id: 'motion-fast',
    token: 'motion.duration.fast',
    cssVar: '--motion-duration-fast',
    value: '200ms',
    category: 'motion',
    usage: 'Tab indicator settling, branch expansions, drawer slides, and inline error reveals.',
  },
];

export const SURFACE_DENSITY_INVENTORY: DensityInventoryItem[] = [
  {
    id: 'density-links',
    component: 'Links',
    count: 408,
    family: ComponentFamily.Link,
    typographyTokens: ['font.size.base (prose)', 'font.size.md (directory)'],
    spacingTokens: ['space.3 (underline offset)', 'space.6–space.8 (list hit padding)'],
    responsiveRule: 'Prose links wrap naturally within 65ch–75ch; footer/nav directory links enforce >=44px touch height on mobile.',
    overflowRule: 'Long repository URLs must apply break-all or middle-truncation with full accessible title.',
    emptyStateRule: 'Broken or unverified reference links must display disabled non-navigable text with explicit status note.',
  },
  {
    id: 'density-buttons',
    component: 'Buttons',
    count: 60,
    family: ComponentFamily.Button,
    typographyTokens: ['font.size.md', 'font.size.lg'],
    spacingTokens: ['space.7 (vertical)', '2x space.8 (horizontal)'],
    responsiveRule: 'Single-line labels only (whitespace-nowrap); action groups stack full-width below 640px with space.8 gap.',
    overflowRule: 'Dynamic labels truncate with max-w and expose full text via aria-label; never wrap to two lines.',
    emptyStateRule: 'When prerequisite data is empty, keep primary submit discoverable via aria-disabled="true" + helper note.',
  },
  {
    id: 'density-lists',
    component: 'Lists',
    count: 54,
    family: ComponentFamily.List,
    typographyTokens: ['font.size.xl', 'font.size.4xl', 'font.size.xs (index)'],
    spacingTokens: ['space.6 (compact)', '2x space.8 (editorial item gap)'],
    responsiveRule: 'Multi-column audit lists collapse cleanly to single-column vertical flow below 768px.',
    overflowRule: 'Long list rows align tabular counters right and wrap prose left using min-w-0 flex-1.',
    emptyStateRule: 'Filtered lists with zero matches render recessed color.surface.muted panel with Reset Filters action.',
  },
  {
    id: 'density-inputs',
    component: 'Inputs',
    count: 24,
    family: ComponentFamily.Input,
    typographyTokens: ['font.size.xl (16px field)', 'font.size.sm (label & error)'],
    spacingTokens: ['space.5 (label gap)', '2x space.8 (inner padding)'],
    responsiveRule: 'Maintain 16px minimum input font size on mobile to block viewport auto-zoom; 2-col forms collapse to 1-col <768px.',
    overflowRule: 'Long single-line queries scroll horizontally inside the input box; never expand container width.',
    emptyStateRule: 'Placeholder text must never substitute for a visible <label>; show explicit clear button when populated.',
  },
  {
    id: 'density-cards',
    component: 'Cards',
    count: 8,
    family: ComponentFamily.Card,
    typographyTokens: ['font.size.2xl (title)', 'font.size.md (body)', 'font.size.xs (meta)'],
    spacingTokens: ['3x space.8 (outer padding)', '2x space.8 (internal child gap)'],
    responsiveRule: '3-col desktop grid shifts to 2-col at 768px and 1-col at 375px; flat single-elevation depth only.',
    overflowRule: 'Card outer padding must exceed child gap; long titles clamp cleanly without pushing sibling card heights unevenly.',
    emptyStateRule: 'Empty collections replace grid slots with a single spanning empty-state module rather than 8 blank skeletons.',
  },
  {
    id: 'density-navigation',
    component: 'Navigation Regions',
    count: 6,
    family: ComponentFamily.Navigation,
    typographyTokens: ['font.size.md (top bar)', 'font.size.sm (anchors)'],
    spacingTokens: ['space.8 (link gap)', '3x space.8 (zone separation)'],
    responsiveRule: 'Top bar stays strictly 3-zone single-row; sticky aggregate height must stay <=15% of mobile viewport height.',
    overflowRule: 'Secondary tab bars use horizontal scroll container with keyboard focus visibility instead of multi-row wrap.',
    emptyStateRule: 'Each of the 6 regions must have a unique aria-label; empty sub-menus must not render dangling trigger buttons.',
  },
  {
    id: 'density-tables',
    component: 'Tables',
    count: 4,
    family: ComponentFamily.Table,
    typographyTokens: ['font.size.sm (cells)', 'font.size.xs (headers)'],
    spacingTokens: ['space.7 (row vertical)', '2x space.8 (cell horizontal)'],
    responsiveRule: 'Compact 36px–44px rows; horizontal scroll container at <1024px with sticky header and keyboard region focus.',
    overflowRule: 'Wrap every table in tabIndex={0} role="region" overflow-x-auto with shadow.4 scroll cue and min-w constraints.',
    emptyStateRule: 'Render full-span table body row explaining active filter mismatch plus one-click Reset Filters button.',
  },
];

export const CONTRAST_FOREGROUND_TOKENS = [
  { token: 'color.text.primary', hex: '#f1f5f9' },
  { token: 'color.text.inverse', hex: '#aaaaaa' },
  { token: 'color.border.strong', hex: '#81c5c9' },
  { token: 'color.border.muted', hex: '#ffffff' },
  { token: 'color.feedback.error', hex: '#f87171' },
  { token: 'color.feedback.warn', hex: '#fbbf24' },
  { token: 'color.feedback.pass', hex: '#6ee7b7' },
];

export const CONTRAST_BACKGROUND_TOKENS = [
  { token: 'color.surface.base', hex: '#000000' },
  { token: 'color.surface.muted', hex: '#060a0f' },
  { token: 'color.surface.strong', hex: '#0d1117' },
];

function channelToLinear(channel: number): number {
  const srgb = channel / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(hex: string): number {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

export function computeContrastRatio(fgHex: string, bgHex: string): number {
  const l1 = getRelativeLuminance(fgHex);
  const l2 = getRelativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
