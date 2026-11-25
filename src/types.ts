export enum HubSection {
  Overview = 'overview',
  Tokens = 'tokens',
  Components = 'components',
  Pathway = 'pathway',
  Governance = 'governance',
}

export enum ComponentState {
  Default = 'default',
  Hover = 'hover',
  FocusVisible = 'focus-visible',
  Active = 'active',
  Disabled = 'disabled',
  Loading = 'loading',
  Error = 'error',
}

export enum ComponentFamily {
  Button = 'button',
  Input = 'input',
  Navigation = 'navigation',
  Card = 'card',
  Table = 'table',
  List = 'list',
  Link = 'link',
}

export enum EdgeStressMode {
  Normal = 'normal',
  LongContent = 'long-content',
  Overflow = 'overflow',
  EmptyState = 'empty-state',
}

export enum ViewportMode {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile',
}

export enum DensityMode {
  Compact = 'compact',
  Comfortable = 'comfortable',
}

export enum DeploymentProfile {
  LocalDocker = 'local-docker',
  HardenedK8s = 'hardened-k8s',
  AirGappedTee = 'air-gapped-tee',
}

export enum AuditDomain {
  All = 'all',
  GitHub416 = 'github-416',
  Fork78License = 'fork-78-license',
  SpentaOS = 'spenta-os',
  HelloKhata = 'hellokhata',
}

export enum RuleStrength {
  Must = 'MUST',
  Should = 'SHOULD',
}

export interface DesignToken {
  id: string;
  token: string;
  cssVar: string;
  value: string;
  category: 'color' | 'typography' | 'spacing' | 'radius' | 'shadow' | 'motion';
  usage: string;
  notes?: string;
}

export interface DensityInventoryItem {
  id: string;
  component: string;
  count: number;
  family: ComponentFamily;
  typographyTokens: string[];
  spacingTokens: string[];
  responsiveRule: string;
  overflowRule: string;
  emptyStateRule: string;
}

export interface StateGuidelineSpec {
  state: ComponentState;
  label: string;
  summary: string;
  semanticTokens: {
    surface: string;
    ink: string;
    borderAndShadow: string;
    motion: string;
  };
  keyboardPattern: string;
  pointerAndTouchPattern: string;
  passCriterion: string;
  failCriterion: string;
  wcagRefs: string[];
  mustRules: string[];
  shouldRules: string[];
}

export interface ComponentFamilyRule {
  family: ComponentFamily;
  title: string;
  inventoryCount: number;
  anatomy: string[];
  variants: string[];
  typographyTokens: string[];
  spacingTokens: string[];
  responsiveBehavior: Record<ViewportMode, string>;
  edgeCases: {
    longContent: string;
    overflow: string;
    emptyState: string;
  };
  keyboardShortcuts: string[];
}

export interface ResponsiveBreakpointRule {
  id: ViewportMode;
  label: string;
  range: string;
  containerMaxWidth: string;
  columns: string;
  touchTargetMin: string;
  sectionRhythm: string;
  typographyAdjustment: string;
  stickyBudget: string;
  overflowPolicy: string;
}

export interface ProfileOverride {
  protocol: string;
  boundary: string;
  latencyBudget: string;
  tradeOff: string;
}

export interface PathwayLeaf {
  id: string;
  code: string;
  title: string;
  summary: string;
  metric: string;
  layer: string;
  synergyIds: string[];
  profiles: Record<DeploymentProfile, ProfileOverride>;
}

export interface PathwaySubNode {
  id: string;
  code: string;
  title: string;
  summary: string;
  metric: string;
  leaves: PathwayLeaf[];
  profiles: Record<DeploymentProfile, ProfileOverride>;
}

export interface PathwayPillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  metric: string;
  subNodes: PathwaySubNode[];
}

export interface WalkthroughHop {
  step: number;
  nodeId: string;
  pillarId: string;
  subNodeId: string;
  label: string;
  actor: string;
  payloadSummary: string;
  securityCheck: string;
  latencyByProfile: Record<DeploymentProfile, string>;
  mitigation: string;
}

export interface WalkthroughTrace {
  id: string;
  title: string;
  sourceSystem: string;
  summary: string;
  hops: WalkthroughHop[];
}

export interface WcagCriterion {
  id: string;
  code: string;
  title: string;
  level: 'A' | 'AA';
  strength: RuleStrength;
  requirement: string;
  passCheck: string;
  failCheck: string;
  appliesTo: string;
}

export interface ToneExample {
  id: string;
  context: string;
  avoidCopy: string;
  recommendedCopy: string;
  rationale: string;
}

export interface AntiPatternRule {
  id: string;
  title: string;
  strength: RuleStrength;
  prohibited: string;
  compliantAlternative: string;
  migrationNote: string;
}

export interface AuditRecord {
  id: string;
  domain: AuditDomain;
  domainLabel: string;
  entity: string;
  classification: string;
  riskOrPosture: 'Verified' | 'Review Required' | 'High Risk';
  licenseOrMetric: string;
  summary: string;
  upstreamOrSpec: string;
}

export interface QaChecklistItem {
  id: string;
  group: 'Tokens' | 'States' | 'Responsive' | 'Accessibility' | 'Content';
  strength: RuleStrength;
  check: string;
  verificationMethod: string;
}
