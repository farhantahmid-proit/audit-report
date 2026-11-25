import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  DESIGN_INTENT_STATEMENT,
  SURFACE_DENSITY_INVENTORY,
} from '../data/tokensData';
import { ComponentFamily, HubSection } from '../types';

interface OverviewSectionProps {
  onNavigate: (section: HubSection) => void;
  onInspectFamily: (family: ComponentFamily) => void;
  qaProgress: { passed: number; total: number };
}

const AUDIT_SUMMARY_CARDS = [
  {
    index: '01.',
    meta: 'Self-Hosting Review · Wavect Engineering',
    title: 'Four-Layer Sandbox Isolation & Control Split',
    body: 'Alibaba OpenSandbox separates a FastAPI lifecycle server from an injected Go execd daemon across Docker and Kubernetes. Production self-hosting must enforce gVisor/Kata microVM isolation, per-request credential scoping, default-deny egress policies, and zero-reuse container cleanup.',
    metric: '4 Runtime Layers · 5 SDK Languages',
    target: HubSection.Pathway,
    actionLabel: 'Trace Execution Pathway',
  },
  {
    index: '02.',
    meta: 'Normative UI Contract · WCAG 2.2 AA',
    title: 'Seven-State Parity & Token Discipline',
    body: 'Every component family across the 564-element marketing surface must specify semantic tokens, keyboard patterns, and pass/fail test criteria for default, hover, focus-visible, active, disabled, loading, and error states without raw hex overrides.',
    metric: '7 States · 44px Mobile Targets',
    target: HubSection.Components,
    actionLabel: 'Inspect State Matrix',
  },
  {
    index: '03.',
    meta: 'Attached Portfolio Audit · 416 GitHub Repos',
    title: '78 Upstream-Verified Forks & License Risk Matrix',
    body: 'Deduplicating 507 raw lines isolates 416 GitHub repositories (346 across Farhan handles including dual-mirrored OpenSandbox, plus 70 third-party). Deep license triage flags AGPL-3.0, GPL-3.0, FSL-1.1, and deprecated forks prior to container bundling.',
    metric: '416 Repos · 78 Forks Audited',
    target: HubSection.Governance,
    actionLabel: 'Open Audit Registry',
  },
  {
    index: '04.',
    meta: 'Sovereign & Retail Architecture Blueprints',
    title: 'Spenta 0.88 OPA Gate & HelloKhata Draft-Verify-Commit',
    body: 'Integrates Spenta Sovereign OS hardware-enclave governance (AMD SEV-SNP/TDX, >= 0.88 OPA HITL gate, < 35ms LAN) and HelloKhata voice POS Draft-Verify-Commit workflows as live multi-hop traces inside the Architecture Pathway.',
    metric: '0.88 HITL Gate · Zero Blind Writes',
    target: HubSection.Pathway,
    actionLabel: 'Run Hop Walkthrough',
  },
];

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onNavigate,
  onInspectFamily,
  qaProgress,
}) => {
  const totalSurfaceElements = SURFACE_DENSITY_INVENTORY.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="space-y-16">
      {/* Hero Band */}
      <section aria-labelledby="hero-heading" className="pt-8 md:pt-12">
        <div className="max-w-[820px] space-y-6">
          <p className="font-mono text-[13px] text-[#aaaaaa]">
            Alibaba OpenSandbox Review: Self · Design System &amp; Technical Audit Hub · WCAG 2.2 AA
          </p>

          <h1
            id="hero-heading"
            className="text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.12] tracking-tight text-[#f1f5f9]"
          >
            Token-Driven UI Guidance &amp; Self-Hosting Architecture Specification
          </h1>

          <p className="prose-opensandbox max-w-[72ch] text-[#aaaaaa]">
            {DESIGN_INTENT_STATEMENT}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate(HubSection.Components)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-[#81c5c9] bg-[#81c5c9]/15 px-5 py-2.5 text-[15.2px] font-medium text-[#f1f5f9] transition-colors duration-150 hover:bg-[#81c5c9]/25 active:scale-[0.985] whitespace-nowrap cursor-pointer"
            >
              <span>Open 7-State Component Matrix</span>
              <ArrowRight className="h-4 w-4 text-[#81c5c9]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate(HubSection.Pathway)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-white/12 bg-[#0d1117] px-5 py-2.5 text-[15.2px] font-medium text-[#f1f5f9] shadow-token-1 transition-colors duration-150 hover:border-[#81c5c9] hover:shadow-token-2 active:scale-[0.985] whitespace-nowrap cursor-pointer"
            >
              <span>Explore Architecture Pathway</span>
            </button>
          </div>
        </div>

        {/* Full-Width 4-Column Architectural Metric Strip */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-y border-white/10 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1">
            <p className="font-mono text-[12px] text-[#aaaaaa]">Marketing Surface Inventory</p>
            <p className="font-mono text-[24px] font-semibold text-[#f1f5f9] tabular-nums">
              {totalSurfaceElements}
            </p>
            <p className="text-[13px] text-[#aaaaaa]">Mapped elements across 7 component families</p>
          </div>

          <div className="space-y-1">
            <p className="font-mono text-[12px] text-[#aaaaaa]">Normative State Coverage</p>
            <p className="font-mono text-[24px] font-semibold text-[#f1f5f9] tabular-nums">
              7 / 7
            </p>
            <p className="text-[13px] text-[#aaaaaa]">Default through Error with WCAG pass/fail checks</p>
          </div>

          <div className="space-y-1">
            <p className="font-mono text-[12px] text-[#aaaaaa]">Audited Repository Lineage</p>
            <p className="font-mono text-[24px] font-semibold text-[#f1f5f9] tabular-nums">
              416
            </p>
            <p className="text-[13px] text-[#aaaaaa]">78 upstream-verified forks &amp; license posture</p>
          </div>

          <div className="space-y-1">
            <p className="font-mono text-[12px] text-[#aaaaaa]">Release QA Verification</p>
            <p className="font-mono text-[24px] font-semibold text-[#81c5c9] tabular-nums">
              {qaProgress.passed} / {qaProgress.total}
            </p>
            <p className="text-[13px] text-[#aaaaaa]">Interactive checks persisted locally</p>
          </div>
        </div>
      </section>

      {/* Unified Pillars Grid (Single-Elevation Cards) */}
      <section aria-labelledby="pillars-heading" className="relative overflow-hidden space-y-6">
        {/* Decorative low-opacity SVG watermark */}
        <div aria-hidden="true" className="absolute -right-12 -top-12 opacity-5 pointer-events-none text-[#81c5c9]">
          <svg className="w-72 h-72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[12px] text-[#81c5c9]">01. Scope &amp; Technical Context</p>
            <h2 id="pillars-heading" className="mt-1 text-[24px] font-semibold text-[#f1f5f9]">
              Unified Engineering Surface &amp; Attached Audits
            </h2>
          </div>
          <p className="text-[14px] text-[#aaaaaa]">
            Source reference: wavect.io/blog/opensandbox-ai-agent-sandbox-review
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {AUDIT_SUMMARY_CARDS.map((card) => {
            const isFirst = card.index === '01.';
            return (
              <article
                key={card.index}
                className={`flex flex-col justify-between rounded-[10px] bg-[#0d1117] p-6 shadow-token-1 transition-all duration-200 ${
                  isFirst
                    ? 'hover:scale-[1.02] hover:brightness-110 hover:border hover:border-[#81c5c9]/50'
                    : 'hover:shadow-token-2'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 font-mono text-[12px] text-[#aaaaaa]">
                    <span>
                      {card.index} {card.meta}
                    </span>
                  </div>
                  <h3 className="text-[18.24px] font-semibold text-[#f1f5f9]">
                    {card.title}
                  </h3>
                  <p className="text-[15.2px] leading-[1.65] text-[#aaaaaa]">
                    {card.body}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="font-mono text-[12px] text-[#aaaaaa] tabular-nums">
                    {card.metric}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate(card.target)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 text-[14px] font-medium text-[#81c5c9] transition-colors duration-150 hover:text-[#f1f5f9] whitespace-nowrap cursor-pointer"
                  >
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Known Page Component Density Table */}
      <section aria-labelledby="density-inventory-heading" className="space-y-6">
        <div className="space-y-2">
          <p className="font-mono text-[12px] text-[#81c5c9]">02. Surface Component Density</p>
          <h2 id="density-inventory-heading" className="text-[24px] font-semibold text-[#f1f5f9]">
            Marketing Site Element Distribution &amp; Density Governance
          </h2>
          <p
            style={{
              borderColor: 'var(--color-border-strong)',
              backgroundColor: 'rgba(129, 197, 201, 0.05)',
            }}
            className="max-w-[70ch] text-[15.2px] leading-[1.65] text-[#f1f5f9] p-4 rounded-[6px] border-l-2"
          >
            Every element count measured across the OpenSandbox marketing review surface maps directly to explicit typography, spacing, overflow, and empty-state rules. Select any row to inspect its seven-state matrix.
          </p>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label="Marketing site component density inventory"
          className="overflow-x-auto rounded-[10px] bg-[#0d1117] shadow-token-1"
        >
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#060a0f]">
                <th scope="col" className="px-4 py-3 font-mono text-[12px] font-medium text-[#aaaaaa]">
                  Component Family
                </th>
                <th scope="col" className="px-4 py-3 text-right font-mono text-[12px] font-medium text-[#aaaaaa]">
                  Density Count
                </th>
                <th scope="col" className="px-4 py-3 font-mono text-[12px] font-medium text-[#aaaaaa]">
                  Typography &amp; Spacing Tokens
                </th>
                <th scope="col" className="px-4 py-3 font-mono text-[12px] font-medium text-[#aaaaaa]">
                  Responsive &amp; Overflow Constraint
                </th>
                <th scope="col" className="px-4 py-3 text-right font-mono text-[12px] font-medium text-[#aaaaaa]">
                  Lab Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 text-[14px]">
              {SURFACE_DENSITY_INVENTORY.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors duration-150 hover:bg-[#060a0f]/75"
                >
                  <td className="px-4 py-3.5 font-medium text-[#f1f5f9] whitespace-nowrap">
                    {row.component}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-[14px] text-[#81c5c9] tabular-nums whitespace-nowrap">
                    {row.count}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-mono text-[12px] text-[#f1f5f9]">
                      {row.typographyTokens.join(' · ')}
                    </div>
                    <div className="mt-0.5 font-mono text-[12px] text-[#aaaaaa]">
                      {row.spacingTokens.join(' · ')}
                    </div>
                  </td>
                  <td className="max-w-[340px] px-4 py-3.5 text-[13px] leading-[1.55] text-[#aaaaaa]">
                    {row.responsiveRule}
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onInspectFamily(row.family)}
                      className="inline-flex min-h-[36px] items-center gap-1 rounded-[6px] border border-white/12 px-3 py-1.5 text-[13px] font-medium text-[#f1f5f9] transition-colors duration-150 hover:border-[#81c5c9] hover:text-[#81c5c9] cursor-pointer"
                    >
                      <span>Test States</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
