import React, { useState } from 'react';
import {
  AlertCircle,
  ExternalLink,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import {
  COMPONENT_FAMILY_RULES,
  RESPONSIVE_BREAKPOINTS,
  STATE_GUIDELINES,
} from '../data/componentStatesData';
import {
  ComponentFamily,
  ComponentState,
  EdgeStressMode,
  ViewportMode,
} from '../types';
import { StateGuidance } from './StateGuidance';
import { ResponsiveDensityPanel } from './ResponsiveDensityPanel';

interface ComponentMatrixSectionProps {
  selectedFamily: ComponentFamily;
  onSelectFamily: (family: ComponentFamily) => void;
}

const STATE_OPTIONS: { id: ComponentState; label: string }[] = [
  { id: ComponentState.Default, label: 'Default' },
  { id: ComponentState.Hover, label: 'Hover' },
  { id: ComponentState.FocusVisible, label: 'Focus-Visible' },
  { id: ComponentState.Active, label: 'Active' },
  { id: ComponentState.Disabled, label: 'Disabled' },
  { id: ComponentState.Loading, label: 'Loading' },
  { id: ComponentState.Error, label: 'Error' },
];

const STRESS_OPTIONS: { id: EdgeStressMode; label: string }[] = [
  { id: EdgeStressMode.Normal, label: 'Normal Content' },
  { id: EdgeStressMode.LongContent, label: 'Long Content' },
  { id: EdgeStressMode.Overflow, label: 'Overflow Stress' },
  { id: EdgeStressMode.EmptyState, label: 'Empty State' },
];

const VIEWPORT_OPTIONS: { id: ViewportMode; label: string; widthClass: string }[] = [
  { id: ViewportMode.Desktop, label: 'Desktop 1440px', widthClass: 'max-w-full' },
  { id: ViewportMode.Tablet, label: 'Tablet 768px', widthClass: 'max-w-[720px]' },
  { id: ViewportMode.Mobile, label: 'Mobile 375px', widthClass: 'max-w-[375px]' },
];

export const ComponentMatrixSection: React.FC<ComponentMatrixSectionProps> = ({
  selectedFamily,
  onSelectFamily,
}) => {
  const [activeState, setActiveState] = useState<ComponentState>(ComponentState.Default);
  const [stressMode, setStressMode] = useState<EdgeStressMode>(EdgeStressMode.Normal);
  const [viewportMode, setViewportMode] = useState<ViewportMode>(ViewportMode.Desktop);
  const [interactiveNote, setInteractiveNote] = useState<string>(
    'Interact with the staged component or switch any of the 7 states and 4 edge stressors.'
  );
  const [sampleInputValue, setSampleInputValue] = useState<string>('10.24.0.0/16');

  const activeStateSpec =
    STATE_GUIDELINES.find((item) => item.state === activeState) ?? STATE_GUIDELINES[0];
  const activeFamilyRule =
    COMPONENT_FAMILY_RULES.find((item) => item.family === selectedFamily) ??
    COMPONENT_FAMILY_RULES[0];
  const activeViewportConfig =
    VIEWPORT_OPTIONS.find((item) => item.id === viewportMode) ?? VIEWPORT_OPTIONS[0];

  const handleResetStressor = () => {
    setStressMode(EdgeStressMode.Normal);
    setActiveState(ComponentState.Default);
    setInteractiveNote('Restored populated baseline state and normal content density.');
  };

  const renderLiveComponentStage = () => {
    const isHover = activeState === ComponentState.Hover;
    const isFocus = activeState === ComponentState.FocusVisible;
    const isActive = activeState === ComponentState.Active;
    const isDisabled = activeState === ComponentState.Disabled;
    const isLoading = activeState === ComponentState.Loading;
    const isError = activeState === ComponentState.Error;
    const isLong = stressMode === EdgeStressMode.LongContent;
    const isOverflow = stressMode === EdgeStressMode.Overflow;
    const isEmpty = stressMode === EdgeStressMode.EmptyState;

    const focusRingClass = isFocus
      ? 'outline-2 outline-offset-2 outline-[#81c5c9] shadow-token-3'
      : '';

    if (selectedFamily === ComponentFamily.Button) {
      const label = isLong
        ? 'Provision Hardened Kubernetes gVisor Sandbox Pool With Egress Guard'
        : isLoading
          ? 'Validating Sandbox Policy…'
          : isError
            ? 'Retry Policy Verification'
            : 'Provision Isolated Sandbox';

      return (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              aria-disabled={isDisabled ? 'true' : undefined}
              aria-busy={isLoading ? 'true' : undefined}
              aria-pressed={isActive ? 'true' : undefined}
              onClick={() => {
                if (isDisabled || isLoading) {
                  setInteractiveNote(
                    `Blocked activation: ${activeState} state prevents duplicate or invalid execution.`
                  );
                  return;
                }
                if (isError) {
                  setActiveState(ComponentState.Default);
                  setInteractiveNote('Recovery action clicked: returned button to verified Default state.');
                  return;
                }
                setInteractiveNote(`Triggered "${label}" action cleanly within motion.duration.instant (150ms).`);
              }}
              className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[6px] px-4 py-2 text-[14px] font-medium transition-all duration-150 whitespace-nowrap ${
                isLong ? 'max-w-[260px]' : ''
              } ${focusRingClass} ${
                isDisabled
                  ? 'cursor-not-allowed border border-white/10 bg-[#060a0f] text-[#aaaaaa]/60'
                  : isError
                    ? 'cursor-pointer border border-[#f87171] bg-[#f87171]/12 text-[#f1f5f9] shadow-token-4'
                    : isActive
                      ? 'cursor-pointer scale-[0.985] border border-[#81c5c9] bg-[#060a0f] text-[#f1f5f9] shadow-token-1'
                      : isHover
                        ? 'cursor-pointer border border-[#81c5c9] bg-[#0d1117] text-[#f1f5f9] shadow-token-2'
                        : 'cursor-pointer border border-[#81c5c9]/80 bg-[#81c5c9]/15 text-[#f1f5f9] shadow-token-1'
              }`}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin text-[#81c5c9]" aria-hidden="true" />}
              {isError && <AlertCircle className="h-4 w-4 text-[#f87171]" aria-hidden="true" />}
              <span className={isLong ? 'truncate' : ''}>{label}</span>
            </button>

            {isOverflow && (
              <div
                tabIndex={0}
                role="region"
                aria-label="Overflow action toolbar"
                className="flex max-w-full items-center gap-2 overflow-x-auto py-1"
              >
                {['Compare Runtimes', 'Inspect execd Logs', 'Verify Credential Scope', 'Download Policy'].map(
                  (extraLabel) => (
                    <button
                      key={extraLabel}
                      type="button"
                      onClick={() => setInteractiveNote(`Toolbar action selected: ${extraLabel}`)}
                      className="min-h-[40px] rounded-[6px] border border-white/12 bg-[#0d1117] px-3.5 py-2 text-[14px] text-[#f1f5f9] whitespace-nowrap shrink-0 hover:border-[#81c5c9] cursor-pointer"
                    >
                      {extraLabel}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {isDisabled && (
            <p className="font-mono text-[13px] text-[#aaaaaa]">
              aria-describedby reason: Configure an egress allowlist before enabling sandbox provisioning.
            </p>
          )}
          {isError && (
            <p className="flex items-center gap-2 text-[13px] text-[#f87171]">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Policy verification failed: runtime isolation class must be gVisor or Kata. Select Retry to revalidate.</span>
            </p>
          )}
          {isEmpty && (
            <p className="text-[13px] text-[#aaaaaa]">
              Empty selection posture: bulk toolbar actions remain hidden or aria-disabled until at least one sandbox is selected.
            </p>
          )}
        </div>
      );
    }

    if (selectedFamily === ComponentFamily.Input) {
      return (
        <div className="max-w-[520px] space-y-2">
          <label
            htmlFor="staged-cidr-input"
            className="block text-[13px] font-medium text-[#f1f5f9]"
          >
            {isLong
              ? 'Authorized Outbound Egress CIDR Allowlist & Internal Proxy Domain Policy'
              : 'Allowed Egress CIDR Block'}
          </label>
          <div className="relative flex items-center">
            <input
              id="staged-cidr-input"
              type="text"
              disabled={isDisabled}
              aria-invalid={isError ? 'true' : undefined}
              aria-busy={isLoading ? 'true' : undefined}
              aria-describedby="staged-cidr-help"
              value={
                isEmpty
                  ? ''
                  : isOverflow
                    ? '10.24.0.0/16, 172.16.40.0/22, registry.internal.opensandbox.local:5000, pypi.mirror.svc.cluster.local'
                    : sampleInputValue
              }
              onChange={(e) => {
                setSampleInputValue(e.target.value);
                if (isError && e.target.value.includes('/')) {
                  setActiveState(ComponentState.Default);
                  setInteractiveNote('Inline validation passed after CIDR prefix correction.');
                }
              }}
              placeholder="e.g., 10.24.0.0/16"
              className={`min-h-[44px] w-full rounded-[6px] px-3.5 py-2 font-mono text-[16px] transition-all duration-150 ${focusRingClass} ${
                isDisabled
                  ? 'cursor-not-allowed border border-white/10 bg-[#060a0f] text-[#aaaaaa]/60'
                  : isError
                    ? 'border border-[#f87171] bg-[#0d1117] text-[#f1f5f9] shadow-token-4'
                    : isHover || isActive
                      ? 'border border-[#81c5c9] bg-[#0d1117] text-[#f1f5f9] shadow-token-2'
                      : 'border border-white/14 bg-[#0d1117] text-[#f1f5f9] shadow-token-1'
              }`}
            />
            {isLoading && (
              <Loader2
                className="pointer-events-none absolute right-3 h-4 w-4 animate-spin text-[#81c5c9]"
                aria-hidden="true"
              />
            )}
          </div>
          <p
            id="staged-cidr-help"
            className={`flex items-start gap-1.5 text-[13px] ${
              isError ? 'text-[#f87171]' : 'text-[#aaaaaa]'
            }`}
          >
            {isError && <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
            <span>
              {isError
                ? 'Enter a valid IPv4 CIDR with mask (for example, 10.24.0.0/16) to unblock egress policy.'
                : isLoading
                  ? 'Validating CIDR range against cluster NetworkPolicy schema…'
                  : 'Default-deny policy blocks all destinations outside this explicit range.'}
            </span>
          </p>
        </div>
      );
    }

    if (selectedFamily === ComponentFamily.Table) {
      if (isEmpty) {
        return (
          <div className="rounded-[10px] border border-white/12 bg-[#060a0f] p-6 text-center">
            <p className="text-[16px] font-semibold text-[#f1f5f9]">
              No sandbox runtime records match the active filter
            </p>
            <p className="mt-1.5 text-[14px] text-[#aaaaaa]">
              Zero rows returned for the current query. Reset filters to display all audited OpenSandbox runtime specs.
            </p>
            <button
              type="button"
              onClick={handleResetStressor}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-[#81c5c9] bg-[#81c5c9]/12 px-4 py-2 text-[14px] font-medium text-[#f1f5f9] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-[#81c5c9]" aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          </div>
        );
      }

      if (isLoading) {
        return (
          <div
            aria-busy="true"
            role="status"
            className="space-y-2 rounded-[10px] bg-[#0d1117] p-4 shadow-token-1"
          >
            <span className="sr-only">Loading runtime table rows…</span>
            {[1, 2, 3].map((row) => (
              <div
                key={row}
                className="flex h-10 items-center justify-between gap-4 rounded-[6px] bg-[#060a0f] px-4"
              >
                <div className="h-3 w-36 rounded bg-white/10" />
                <div className="h-3 w-24 rounded bg-white/8" />
                <div className="h-3 w-16 rounded bg-[#81c5c9]/20" />
              </div>
            ))}
          </div>
        );
      }

      return (
        <div
          tabIndex={0}
          role="region"
          aria-label="Staged sandbox runtime comparison table"
          className={`overflow-x-auto rounded-[10px] bg-[#0d1117] shadow-token-1 ${focusRingClass} ${
            isError ? 'border border-[#f87171]' : ''
          }`}
        >
          <table className={`w-full border-collapse text-left ${isOverflow ? 'min-w-[780px]' : 'min-w-[520px]'}`}>
            <thead>
              <tr className="border-b border-white/10 bg-[#060a0f]">
                <th scope="col" className="px-4 py-2.5 font-mono text-[12px] text-[#aaaaaa]">
                  Runtime Profile
                </th>
                <th scope="col" className="px-4 py-2.5 font-mono text-[12px] text-[#aaaaaa]">
                  Isolation Boundary
                </th>
                <th scope="col" className="px-4 py-2.5 text-right font-mono text-[12px] text-[#aaaaaa]">
                  Boot Latency
                </th>
                {isOverflow && (
                  <th scope="col" className="px-4 py-2.5 font-mono text-[12px] text-[#aaaaaa]">
                    Egress &amp; Credential Broker Policy
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 text-[13px]">
              <tr className={isHover ? 'bg-[#060a0f]' : ''}>
                <td className="px-4 py-3 font-medium text-[#f1f5f9]">
                  {isLong
                    ? 'Hardened Kubernetes Multi-Tenant Sandbox Runtime Class (gVisor + Cilium L7)'
                    : 'Hardened K8s + gVisor'}
                </td>
                <td className="px-4 py-3 text-[#aaaaaa]">User-space syscall sentry</td>
                <td className="px-4 py-3 text-right font-mono text-[#81c5c9] tabular-nums">
                  210ms
                </td>
                {isOverflow && (
                  <td className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">
                    Envoy mTLS broker · Zero static container env tokens
                  </td>
                )}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-[#f1f5f9]">Air-Gapped On-Prem TEE</td>
                <td className="px-4 py-3 text-[#aaaaaa]">AMD SEV-SNP hardware enclave</td>
                <td className="px-4 py-3 text-right font-mono text-[#81c5c9] tabular-nums">
                  290ms
                </td>
                {isOverflow && (
                  <td className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">
                    Local HSM signed TTL token · 0 bytes cloud egress
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {isError && (
            <div className="flex items-center justify-between gap-3 border-t border-[#f87171]/40 bg-[#f87171]/10 px-4 py-2.5 text-[13px] text-[#f87171]">
              <span>Telemetry sync interrupted. Verify cluster endpoint or retry table refresh.</span>
              <button
                type="button"
                onClick={handleResetStressor}
                className="rounded-[6px] border border-[#f87171] px-2.5 py-1 text-[12px] font-medium text-[#f1f5f9] cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      );
    }

    if (selectedFamily === ComponentFamily.Card) {
      if (isEmpty) {
        return (
          <div className="rounded-[10px] border border-white/12 bg-[#060a0f] p-6 text-center">
            <p className="text-[16px] font-semibold text-[#f1f5f9]">No specification cards in this view</p>
            <p className="mt-1 text-[14px] text-[#aaaaaa]">
              Empty collections render one clear spanning empty-state module instead of blank ghost cards.
            </p>
            <button
              type="button"
              onClick={handleResetStressor}
              className="mt-4 min-h-[40px] rounded-[6px] border border-[#81c5c9] px-4 py-2 text-[14px] text-[#f1f5f9] cursor-pointer"
            >
              Restore Card Sample
            </button>
          </div>
        );
      }

      return (
        <article
          className={`max-w-[440px] rounded-[10px] p-5 transition-all duration-150 ${focusRingClass} ${
            isDisabled
              ? 'bg-[#060a0f] opacity-65 shadow-token-1'
              : isError
                ? 'border border-[#f87171] bg-[#0d1117] shadow-token-4'
                : isHover
                  ? 'border border-[#81c5c9] bg-[#0d1117] shadow-token-2'
                  : 'bg-[#0d1117] shadow-token-1'
          }`}
        >
          <p className="font-mono text-[12px] text-[#aaaaaa]">
            Runtime Audit · Self-Hosting Gate 02 · Single Elevation
          </p>
          <h3 className="mt-2 text-[17.28px] font-semibold text-[#f1f5f9] break-words">
            {isLong
              ? 'Per-Request Credential Exchange & Zero-Static-Secret Isolation Architecture for Autonomous Code Sandboxes'
              : 'Per-Request Credential Exchange'}
          </h3>
          <p className="mt-2 text-[14px] leading-[1.6] text-[#aaaaaa]">
            {isLoading
              ? 'Refreshing credential rotation metrics from local policy store…'
              : 'Inject short-lived request capabilities at the egress proxy so prompt-injected agent scripts never observe raw API credentials.'}
          </p>
          {isOverflow && (
            <pre className="mt-3 overflow-x-auto rounded-[6px] bg-[#060a0f] p-3 font-mono text-[12px] text-[#81c5c9]">
              envoy.filters.http.credential_broker --scope=read:repo --ttl=60s --tenant=sandbox-7a91
            </pre>
          )}
          {isError && (
            <p className="mt-3 flex items-center gap-1.5 text-[13px] text-[#f87171]">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Audit metadata failed schema validation. Re-run policy lint.</span>
            </p>
          )}
        </article>
      );
    }

    if (selectedFamily === ComponentFamily.Navigation) {
      const items = isOverflow
        ? ['Overview', 'Semantic Tokens', '7-State Matrix', 'Responsive Density', 'Architecture Pathway', 'Walkthrough Traces', 'WCAG & QA']
        : ['Overview', 'Tokens', 'Components', 'Pathway'];
      return (
        <nav
          aria-label="Staged navigation bar preview"
          className={`flex items-center gap-5 overflow-x-auto rounded-[8px] bg-[#060a0f] px-4 py-2.5 shadow-token-1 ${focusRingClass}`}
        >
          {items.map((label, idx) => {
            const itemActive = idx === 2 || (isActive && idx === 1);
            return (
              <button
                key={label}
                type="button"
                aria-current={itemActive ? 'page' : undefined}
                aria-disabled={isDisabled ? 'true' : undefined}
                onClick={() => setInteractiveNote(`Focused staged navigation item: ${label}`)}
                className={`relative min-h-[40px] py-2 text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isDisabled
                    ? 'cursor-not-allowed text-[#aaaaaa]/50'
                    : itemActive
                      ? 'cursor-pointer text-[#f1f5f9]'
                      : isHover && idx === 1
                        ? 'cursor-pointer text-[#81c5c9]'
                        : 'cursor-pointer text-[#aaaaaa] hover:text-[#f1f5f9]'
                }`}
              >
                {isLong && idx === 0 ? 'Alibaba OpenSandbox Overview Spec' : label}
                {itemActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#81c5c9]"
                  />
                )}
              </button>
            );
          })}
        </nav>
      );
    }

    if (selectedFamily === ComponentFamily.List) {
      if (isEmpty) {
        return (
          <div className="rounded-[10px] border border-white/12 bg-[#060a0f] p-5">
            <p className="text-[15.2px] font-medium text-[#f1f5f9]">0 checklist items in this filter</p>
            <p className="mt-1 text-[13px] text-[#aaaaaa]">
              Reset active filters to inspect all 54 marketing-surface list guidelines.
            </p>
          </div>
        );
      }

      return (
        <ol className="divide-y divide-white/10 rounded-[10px] bg-[#0d1117] px-4 shadow-token-1">
          {[
            {
              idx: '01.',
              text: isLong
                ? 'Enforce non-root UID execution with dropped Linux capabilities and ephemeral ReadOnlyRootFilesystem across all coding-agent sandboxes.'
                : 'Enforce non-root UID execution inside every sandbox container.',
              metric: 'MUST',
            },
            {
              idx: '02.',
              text: 'Destroy ephemeral sandbox filesystems on TTL expiration to guarantee zero cross-tenant bleed.',
              metric: 'MUST',
            },
          ].map((row) => (
            <li
              key={row.idx}
              className={`flex items-start justify-between gap-4 py-3.5 ${
                isDisabled ? 'opacity-55' : ''
              }`}
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <span className="font-mono text-[12px] text-[#81c5c9] tabular-nums pt-0.5">
                  {row.idx}
                </span>
                <span className="text-[15.2px] leading-[1.55] text-[#f1f5f9] break-words">
                  {row.text}
                </span>
              </div>
              <span className="font-mono text-[12px] text-[#aaaaaa] shrink-0">{row.metric}</span>
            </li>
          ))}
        </ol>
      );
    }

    // Link family
    return (
      <div className="space-y-3">
        <p className="prose-opensandbox text-[#aaaaaa]">
          Review the full self-hosting architecture boundaries in{' '}
          <a
            href="#main-content"
            onClick={(e) => {
              e.preventDefault();
              if (!isDisabled) {
                setInteractiveNote('Activated descriptive prose link with explicit underline + focus-visible ring.');
              }
            }}
            aria-disabled={isDisabled ? 'true' : undefined}
            className={`inline-flex items-center gap-1 underline underline-offset-[3px] transition-colors duration-150 ${focusRingClass} ${
              isDisabled
                ? 'cursor-not-allowed text-[#aaaaaa]/55 no-underline'
                : isError
                  ? 'text-[#f87171]'
                  : isHover || isActive
                    ? 'text-[#81c5c9]'
                    : 'text-[#f1f5f9] hover:text-[#81c5c9]'
            }`}
          >
            <span className={isOverflow ? 'break-all' : ''}>
              {isOverflow
                ? 'https://wavect.io/blog/opensandbox-ai-agent-sandbox-review/#runtime-boundaries-egress-and-credential-scoping'
                : isLong
                  ? 'Alibaba OpenSandbox Self-Hosting Runtime Boundaries & Credential Scoping Guide'
                  : 'Alibaba OpenSandbox Self-Hosting Review'}
            </span>
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
          </a>
          .
        </p>
        {isError && (
          <p className="text-[13px] text-[#f87171]">
            Unverified external reference: mark broken targets explicitly as [Unverified] instead of dead # anchors.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-14 pt-8">
      <header className="space-y-3">
        <p className="font-mono text-[12px] text-[#81c5c9]">
          03. Component State Guidelines &amp; Responsive Density
        </p>
        <h1 className="text-[clamp(1.85rem,3vw,2.6rem)] font-semibold tracking-tight text-[#f1f5f9]">
          Seven-State Interactive Matrix &amp; Layout Density Rulebook
        </h1>
        <p className="max-w-[74ch] text-[16px] leading-[1.65] text-[#aaaaaa]">
          Every component across the OpenSandbox marketing surface must satisfy all seven interactive states, keyboard navigation patterns, WCAG 2.2 AA pass/fail checks, and responsive edge-case rules using semantic tokens only.
        </p>
      </header>

      {/* Interactive Component & State Workbench */}
      <section
        aria-labelledby="state-lab-heading"
        className="rounded-[16px] bg-[#0d1117] p-5 md:p-7 shadow-token-1 space-y-6"
      >
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center">
          <div>
            <h2 id="state-lab-heading" className="text-[20px] font-semibold text-[#f1f5f9]">
              Interactive Component State &amp; Edge-Case Lab
            </h2>
            <p className="mt-1 font-mono text-[13px] text-[#aaaaaa] tabular-nums">
              {activeFamilyRule.title} · {activeFamilyRule.inventoryCount} instances on marketing surface
            </p>
          </div>

          {/* Responsive Viewport Width Switcher */}
          <div
            role="group"
            aria-label="Simulate responsive viewport width"
            className="flex flex-wrap gap-1 rounded-[8px] bg-[#060a0f] p-1 shadow-token-1"
          >
            {VIEWPORT_OPTIONS.map((vp) => {
              const active = viewportMode === vp.id;
              return (
                <button
                  key={vp.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setViewportMode(vp.id)}
                  className={`min-h-[36px] rounded-[6px] px-3 py-1.5 font-mono text-[12px] transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#0d1117] text-[#81c5c9] shadow-token-1'
                      : 'text-[#aaaaaa] hover:text-[#f1f5f9]'
                  }`}
                >
                  {vp.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 1: Component Family Selector */}
        <div className="space-y-2">
          <p className="font-mono text-[12px] text-[#aaaaaa]">Component Family (7 Surface Types)</p>
          <div
            role="group"
            aria-label="Select component family"
            className="flex flex-wrap gap-1.5"
          >
            {COMPONENT_FAMILY_RULES.map((fam) => {
              const selected = fam.family === selectedFamily;
              return (
                <button
                  key={fam.family}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelectFamily(fam.family)}
                  className={`min-h-[40px] rounded-[6px] border px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    selected
                      ? 'border-[#81c5c9] bg-[#81c5c9]/15 text-[#f1f5f9]'
                      : 'border-white/10 bg-[#060a0f] text-[#aaaaaa] hover:border-white/25 hover:text-[#f1f5f9]'
                  }`}
                >
                  {fam.title}{' '}
                  <span className="ml-1 font-mono text-[12px] opacity-80 tabular-nums">
                    ({fam.inventoryCount})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: 7-State Selector + Edge-Case Stressors */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-7">
            <p className="font-mono text-[12px] text-[#aaaaaa]">Mandatory 7 Component States</p>
            <div
              role="group"
              aria-label="Select component state"
              className="flex flex-wrap gap-1.5 rounded-[8px] bg-[#060a0f] p-1.5 shadow-token-1"
            >
              {STATE_OPTIONS.map((st) => {
                const selected = st.id === activeState;
                return (
                  <button
                    key={st.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveState(st.id)}
                    className={`min-h-[38px] rounded-[6px] px-3 py-1.5 font-mono text-[12.5px] transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                      selected
                        ? 'bg-[#0d1117] text-[#81c5c9] shadow-token-1'
                        : 'text-[#aaaaaa] hover:text-[#f1f5f9]'
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 lg:col-span-5">
            <p className="font-mono text-[12px] text-[#aaaaaa]">Edge-Case Stressors</p>
            <div
              role="group"
              aria-label="Select edge case stress mode"
              className="flex flex-wrap gap-1.5 rounded-[8px] bg-[#060a0f] p-1.5 shadow-token-1"
            >
              {STRESS_OPTIONS.map((st) => {
                const selected = st.id === stressMode;
                return (
                  <button
                    key={st.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setStressMode(st.id)}
                    className={`min-h-[38px] rounded-[6px] px-3 py-1.5 font-mono text-[12px] transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                      selected
                        ? 'bg-[#0d1117] text-[#81c5c9] shadow-token-1'
                        : 'text-[#aaaaaa] hover:text-[#f1f5f9]'
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Preview Stage */}
        <div className="rounded-[10px] border border-white/10 bg-[#000000] p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 font-mono text-[12px] text-[#aaaaaa]">
            <span>
              Stage: {activeFamilyRule.title} · State: {activeStateSpec.label} · Mode: {stressMode}
            </span>
            <span>Frame: {activeViewportConfig.label}</span>
          </div>

          <div
            className={`mx-auto w-full transition-all duration-200 ${activeViewportConfig.widthClass} ${
              viewportMode !== ViewportMode.Desktop
                ? 'rounded-[10px] border border-dashed border-[#81c5c9]/40 bg-[#060a0f]/60 p-4'
                : ''
            }`}
          >
            {renderLiveComponentStage()}
          </div>

          <p
            role="status"
            aria-live="polite"
            className="mt-5 border-t border-white/10 pt-3 font-mono text-[12px] text-[#81c5c9]"
          >
            {interactiveNote}
          </p>
        </div>

        {/* Reusable 7-State Guidance Panel (Synced to Active State) */}
        <div className="border-t border-white/10 pt-6">
          <StateGuidance
            activeState={activeState}
            onSelectState={setActiveState}
            title={`Active State Guidance · ${activeFamilyRule.title}`}
            subtitle="Inspect semantic tokens, keyboard/pointer/touch interaction requirements, and WCAG 2.2 AA pass/fail acceptance checks synchronized with the live component stage above."
          />
        </div>

        {/* Active Family Anatomy, Responsive & Edge-Case Rules */}
        <div className="grid grid-cols-1 gap-5 border-t border-white/10 pt-6 md:grid-cols-3">
          <div className="space-y-2">
            <p className="font-mono text-[12px] text-[#81c5c9]">Anatomy &amp; Token Bindings</p>
            <p className="font-mono text-[12px] text-[#f1f5f9]">
              Type: {activeFamilyRule.typographyTokens.join(' · ')}
            </p>
            <p className="font-mono text-[12px] text-[#aaaaaa]">
              Space: {activeFamilyRule.spacingTokens.join(' · ')}
            </p>
            <ul className="mt-2 space-y-1 text-[13px] text-[#aaaaaa]">
              {activeFamilyRule.anatomy.map((part) => (
                <li key={part}>· {part}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[12px] text-[#81c5c9]">
              Responsive Rule ({activeViewportConfig.label})
            </p>
            <p className="text-[13.5px] leading-[1.6] text-[#f1f5f9]">
              {activeFamilyRule.responsiveBehavior[viewportMode]}
            </p>
            <p className="pt-1 font-mono text-[12px] text-[#aaaaaa]">
              Shortcuts: {activeFamilyRule.keyboardShortcuts.join(' · ')}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[12px] text-[#81c5c9]">Long Content, Overflow &amp; Empty</p>
            <p className="text-[13px] leading-[1.55] text-[#aaaaaa]">
              <strong className="font-medium text-[#f1f5f9]">Long content:</strong>{' '}
              {activeFamilyRule.edgeCases.longContent}
            </p>
            <p className="text-[13px] leading-[1.55] text-[#aaaaaa]">
              <strong className="font-medium text-[#f1f5f9]">Overflow:</strong>{' '}
              {activeFamilyRule.edgeCases.overflow}
            </p>
            <p className="text-[13px] leading-[1.55] text-[#aaaaaa]">
              <strong className="font-medium text-[#f1f5f9]">Empty state:</strong>{' '}
              {activeFamilyRule.edgeCases.emptyState}
            </p>
          </div>
        </div>
      </section>

      {/* Complete 7-State Normative Reference Table */}
      <section aria-labelledby="all-states-matrix-heading" className="space-y-5">
        <div className="space-y-1.5">
          <p className="font-mono text-[12px] text-[#81c5c9]">Normative 7-State Specification</p>
          <h2 id="all-states-matrix-heading" className="text-[22px] font-semibold text-[#f1f5f9]">
            Complete Component State Matrix (Tokens · Keyboard · Testable WCAG Criteria)
          </h2>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label="Seven-state component guidelines reference table"
          className="overflow-x-auto rounded-[10px] bg-[#0d1117] shadow-token-1"
        >
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#060a0f]">
                <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">State</th>
                <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">Required Semantic Tokens</th>
                <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">Keyboard &amp; Touch Pattern</th>
                <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">Testable Accessibility Pass Criterion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 text-[13px]">
              {STATE_GUIDELINES.map((row) => {
                const isSelected = row.state === activeState;
                return (
                  <tr
                    key={row.state}
                    className={`transition-colors duration-150 ${
                      isSelected ? 'bg-[#81c5c9]/8' : 'hover:bg-[#060a0f]/75'
                    }`}
                  >
                    <td className="px-4 py-3.5 align-top whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setActiveState(row.state)}
                        className="font-mono text-[13px] font-semibold text-[#81c5c9] hover:underline cursor-pointer"
                      >
                        {row.label}
                      </button>
                      <div className="mt-1 font-mono text-[11.5px] text-[#aaaaaa]">
                        {row.wcagRefs[0]}
                      </div>
                    </td>
                    <td className="max-w-[260px] px-4 py-3.5 align-top font-mono text-[12px] leading-[1.55] text-[#f1f5f9]">
                      <div>{row.semanticTokens.surface}</div>
                      <div className="mt-1 text-[#81c5c9]">{row.semanticTokens.borderAndShadow}</div>
                    </td>
                    <td className="max-w-[280px] px-4 py-3.5 align-top leading-[1.55] text-[#aaaaaa]">
                      {row.keyboardPattern}
                    </td>
                    <td className="max-w-[280px] px-4 py-3.5 align-top leading-[1.55] text-[#f1f5f9]">
                      {row.passCriterion}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Responsive Breakpoints & Layout Density Rulebook */}
      <section aria-labelledby="responsive-rules-heading" className="space-y-5">
        <div className="space-y-1.5">
          <p className="font-mono text-[12px] text-[#81c5c9]">
            Responsive Component Behavior &amp; Layout Density
          </p>
          <h2 id="responsive-rules-heading" className="text-[22px] font-semibold text-[#f1f5f9]">
            Breakpoint Contracts, Spacing Rhythm &amp; Typography Scaling
          </h2>
          <p className="max-w-[72ch] text-[15.2px] leading-[1.65] text-[#aaaaaa]">
            Layout density across marketing surfaces must derive spacing from explicit multiples of <code className="font-mono text-[#f1f5f9]">space.1</code>–<code className="font-mono text-[#f1f5f9]">space.8</code> (1.82px–7.2px) and preserve typography scale legibility from <code className="font-mono text-[#f1f5f9]">font.size.xs</code> (12px) through <code className="font-mono text-[#f1f5f9]">font.size.base</code> (18.88px).
          </p>
        </div>

        <ResponsiveDensityPanel
          selectedFamily={selectedFamily}
          onSelectFamily={onSelectFamily}
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {RESPONSIVE_BREAKPOINTS.map((bp) => (
            <article
              key={bp.id}
              className="flex flex-col justify-between rounded-[10px] bg-[#0d1117] p-5 shadow-token-1"
            >
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <p className="font-mono text-[12px] text-[#81c5c9] tabular-nums">{bp.range}</p>
                  <h3 className="mt-1 text-[17.28px] font-semibold text-[#f1f5f9]">{bp.label}</h3>
                </div>

                <dl className="space-y-3 text-[13px] leading-[1.55]">
                  <div>
                    <dt className="font-mono text-[11.5px] text-[#aaaaaa]">Container &amp; Columns</dt>
                    <dd className="mt-0.5 text-[#f1f5f9]">
                      {bp.containerMaxWidth} · {bp.columns}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11.5px] text-[#aaaaaa]">Spacing &amp; Touch Targets</dt>
                    <dd className="mt-0.5 text-[#aaaaaa]">
                      {bp.sectionRhythm}. {bp.touchTargetMin}.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11.5px] text-[#aaaaaa]">Typography Token Rule</dt>
                    <dd className="mt-0.5 text-[#aaaaaa]">{bp.typographyAdjustment}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11.5px] text-[#aaaaaa]">Sticky Cap &amp; Overflow</dt>
                    <dd className="mt-0.5 text-[#f1f5f9]">
                      {bp.stickyBudget}. {bp.overflowPolicy}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
