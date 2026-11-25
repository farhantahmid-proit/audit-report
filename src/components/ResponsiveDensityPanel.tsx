import React, { useMemo, useState } from 'react';
import { SURFACE_DENSITY_INVENTORY } from '../data/tokensData';
import { ComponentFamily, DensityMode } from '../types';

interface ResponsiveDensityPanelProps {
  selectedFamily?: ComponentFamily;
  onSelectFamily?: (family: ComponentFamily) => void;
}

interface DensityTokenProfile {
  mode: DensityMode;
  label: string;
  description: string;
  containerPaddingCss: string;
  containerPaddingFormula: string;
  itemGapCss: string;
  itemGapFormula: string;
  controlPadYCss: string;
  controlPadYFormula: string;
  controlPadXCss: string;
  controlPadXFormula: string;
  rowPadYCss: string;
  rowPadYFormula: string;
  minTargetPx: string;
}

const DENSITY_PROFILES: Record<DensityMode, DensityTokenProfile> = {
  [DensityMode.Compact]: {
    mode: DensityMode.Compact,
    label: 'Compact',
    description:
      'High-density technical scan mode tuned for link directories (408), dense audit tables (4), and multi-filter control bars.',
    containerPaddingCss: 'calc(var(--space-8) * 2)',
    containerPaddingFormula: '2 × space.8 (14.4px)',
    itemGapCss: 'var(--space-6)',
    itemGapFormula: 'space.6 (5.44px)',
    controlPadYCss: 'var(--space-7)',
    controlPadYFormula: 'space.7 (6.4px)',
    controlPadXCss: 'calc(var(--space-8) * 2)',
    controlPadXFormula: '2 × space.8 (14.4px)',
    rowPadYCss: 'var(--space-6)',
    rowPadYFormula: 'space.6 (5.44px)',
    minTargetPx: '40px desktop / 44px touch',
  },
  [DensityMode.Comfortable]: {
    mode: DensityMode.Comfortable,
    label: 'Comfortable',
    description:
      'Editorial reading cadence optimized for long-form OpenSandbox review prose (font.size.base 18.88px), cards (8), and guided forms (24).',
    containerPaddingCss: 'calc(var(--space-8) * 3.5)',
    containerPaddingFormula: '3.5 × space.8 (25.2px)',
    itemGapCss: 'calc(var(--space-8) * 2)',
    itemGapFormula: '2 × space.8 (14.4px)',
    controlPadYCss: 'calc(var(--space-6) * 2)',
    controlPadYFormula: '2 × space.6 (10.88px)',
    controlPadXCss: 'calc(var(--space-8) * 3)',
    controlPadXFormula: '3 × space.8 (21.6px)',
    rowPadYCss: 'calc(var(--space-7) * 2)',
    rowPadYFormula: '2 × space.7 (12.8px)',
    minTargetPx: '44px desktop & touch',
  },
};

const CORE_FIVE_FAMILIES: ComponentFamily[] = [
  ComponentFamily.Link,
  ComponentFamily.Button,
  ComponentFamily.List,
  ComponentFamily.Input,
  ComponentFamily.Card,
];

export const ResponsiveDensityPanel: React.FC<ResponsiveDensityPanelProps> = ({
  selectedFamily,
  onSelectFamily,
}) => {
  const [densityMode, setDensityMode] = useState<DensityMode>(DensityMode.Comfortable);
  const [showAllSurfaces, setShowAllSurfaces] = useState<boolean>(false);

  const profile = DENSITY_PROFILES[densityMode];

  const visibleItems = useMemo(() => {
    if (showAllSurfaces) return SURFACE_DENSITY_INVENTORY;
    return SURFACE_DENSITY_INVENTORY.filter((item) =>
      CORE_FIVE_FAMILIES.includes(item.family)
    );
  }, [showAllSurfaces]);

  const maxCount = useMemo(
    () => Math.max(...SURFACE_DENSITY_INVENTORY.map((i) => i.count)),
    []
  );

  const totalCount = useMemo(
    () => visibleItems.reduce((sum, item) => sum + item.count, 0),
    [visibleItems]
  );

  return (
    <section
      aria-labelledby="responsive-density-panel-heading"
      className="rounded-[12px] bg-[var(--color-surface-strong)] shadow-token-1 transition-all duration-200"
      style={{ padding: profile.containerPaddingCss }}
    >
      {/* Header & Compact/Comfortable Mode Toggle */}
      <div className="flex flex-col justify-between gap-4 border-b border-[var(--color-border-muted-hairline)] pb-5 lg:flex-row lg:items-center">
        <div className="space-y-1">
          <p className="font-mono text-[12px] text-[var(--color-border-strong)]">
            Marketing Surface Layout Density · Live --space-* Token Driver
          </p>
          <h3
            id="responsive-density-panel-heading"
            className="text-[18.24px] font-semibold text-[var(--color-text-primary)]"
          >
            Responsive Density &amp; Surface Allocation Visualizer
          </h3>
          <p className="max-w-[66ch] text-[14px] leading-[1.6] text-[var(--color-text-inverse)]">
            {profile.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div
            role="group"
            aria-label="Toggle layout density mode"
            className="inline-flex rounded-[8px] bg-[var(--color-surface-muted)] p-1 shadow-token-1"
          >
            {[DensityMode.Compact, DensityMode.Comfortable].map((mode) => {
              const isActive = densityMode === mode;
              const modeLabel = DENSITY_PROFILES[mode].label;
              return (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setDensityMode(mode)}
                  className={`min-h-[38px] rounded-[6px] px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-surface-strong)] text-[var(--color-border-strong)] shadow-token-1'
                      : 'text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {modeLabel}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-pressed={showAllSurfaces}
            onClick={() => setShowAllSurfaces((prev) => !prev)}
            className="min-h-[40px] rounded-[6px] border border-[var(--color-border-muted-subtle)] bg-[var(--color-surface-muted)] px-3.5 py-2 font-mono text-[12px] text-[var(--color-text-primary)] transition-colors duration-150 hover:border-[var(--color-border-strong)] whitespace-nowrap cursor-pointer"
          >
            {showAllSurfaces ? 'Show Core 5 Families' : 'Include Nav & Tables (7)'}
          </button>
        </div>
      </div>

      {/* Live Spacing Token Formula Strip */}
      <dl
        className="mt-5 grid grid-cols-1 gap-3 rounded-[10px] bg-[var(--color-surface-muted)] shadow-token-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ padding: profile.containerPaddingCss }}
      >
        <div>
          <dt className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
            Container Outer Padding
          </dt>
          <dd className="mt-1 font-mono text-[13px] font-medium text-[var(--color-border-strong)] tabular-nums">
            {profile.containerPaddingFormula}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
            Sibling Element Gap
          </dt>
          <dd className="mt-1 font-mono text-[13px] font-medium text-[var(--color-text-primary)] tabular-nums">
            {profile.itemGapFormula}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
            Control Padding (Y / X)
          </dt>
          <dd className="mt-1 font-mono text-[13px] font-medium text-[var(--color-text-primary)] tabular-nums">
            {profile.controlPadYFormula} · {profile.controlPadXFormula}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
            Minimum Hit Target
          </dt>
          <dd className="mt-1 font-mono text-[13px] font-medium text-[var(--color-text-primary)] tabular-nums">
            {profile.minTargetPx}
          </dd>
        </div>
      </dl>

      {/* Proportional Density Distribution Bars + Live Specimen Preview */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Surface Density Rules Visualizer */}
        <div className="space-y-2 lg:col-span-7">
          <div className="flex items-center justify-between font-mono text-[12px] text-[var(--color-text-inverse)]">
            <span>Element Density Distribution ({visibleItems.length} families)</span>
            <span className="tabular-nums">{totalCount} total elements</span>
          </div>

          <ul
            className="flex flex-col"
            style={{ gap: profile.itemGapCss }}
            aria-label="Marketing site component density breakdown"
          >
            {visibleItems.map((item) => {
              const widthPct = Math.max(4, Math.round((item.count / maxCount) * 100));
              const isSelected = selectedFamily === item.family;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelectFamily?.(item.family)}
                    aria-pressed={isSelected}
                    className={`w-full rounded-[8px] border text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] shadow-token-3'
                        : 'border-[var(--color-border-muted-hairline)] bg-[var(--color-surface-muted)] hover:border-[var(--color-border-strong)]'
                    }`}
                    style={{
                      paddingTop: profile.rowPadYCss,
                      paddingBottom: profile.rowPadYCss,
                      paddingLeft: profile.controlPadXCss,
                      paddingRight: profile.controlPadXCss,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex min-w-0 items-baseline gap-2.5">
                        <span className="text-[14.5px] font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                          {item.component}
                        </span>
                        <span className="truncate font-mono text-[11.5px] text-[var(--color-text-inverse)]">
                          {item.spacingTokens.join(' · ')}
                        </span>
                      </div>
                      <span className="font-mono text-[14px] font-semibold text-[var(--color-border-strong)] tabular-nums shrink-0">
                        {item.count}
                      </span>
                    </div>

                    {/* Proportional Visual Bar */}
                    <div
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-full overflow-hidden rounded-[999px] bg-white/8"
                    >
                      <div
                        className="h-full rounded-[999px] bg-[var(--color-border-strong)] transition-all duration-200"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>

                    <p className="mt-2 text-[12.5px] leading-[1.5] text-[var(--color-text-inverse)]">
                      {item.responsiveRule}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Live Token-Driven Surface Specimen responding to Compact / Comfortable */}
        <div className="lg:col-span-5">
          <div
            className="flex h-full flex-col justify-between rounded-[10px] border border-[var(--color-border-muted-hairline)] bg-[var(--color-surface-base)] transition-all duration-200"
            style={{
              padding: profile.containerPaddingCss,
              gap: profile.itemGapCss,
            }}
          >
            <div className="space-y-1">
              <p className="font-mono text-[12px] text-[var(--color-border-strong)]">
                Live Spacing Specimen · {profile.label} Mode
              </p>
              <p className="text-[13px] text-[var(--color-text-inverse)]">
                Observe outer container padding, list rhythm, input spacing, and button density rescale via <code className="font-mono text-[var(--color-text-primary)]">--space-*</code> tokens.
              </p>
            </div>

            {/* Specimen Card */}
            <div
              className="rounded-[10px] bg-[var(--color-surface-strong)] shadow-token-1 transition-all duration-200"
              style={{
                padding: profile.containerPaddingCss,
                display: 'flex',
                flexDirection: 'column',
                gap: profile.itemGapCss,
              }}
            >
              {/* Specimen Link & List */}
              <div className="space-y-1">
                <p className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
                  Card (8) · Links (408) · Lists (54)
                </p>
                <a
                  href="#responsive-density-panel-heading"
                  onClick={(e) => e.preventDefault()}
                  className="inline-block text-[15.2px] font-medium text-[var(--color-text-primary)] underline underline-offset-[var(--space-3)] hover:text-[var(--color-border-strong)]"
                >
                  OpenSandbox Runtime Isolation Policy
                </a>
              </div>

              <ul
                className="border-y border-[var(--color-border-muted-hairline)] text-[13px] text-[var(--color-text-inverse)]"
                style={{
                  paddingTop: profile.rowPadYCss,
                  paddingBottom: profile.rowPadYCss,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: profile.itemGapCss,
                }}
              >
                <li className="flex items-center justify-between gap-2">
                  <span>01. Non-root execd sandbox</span>
                  <span className="font-mono text-[12px] text-[var(--color-border-strong)] tabular-nums">
                    gVisor
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>02. Default-deny egress</span>
                  <span className="font-mono text-[12px] text-[var(--color-text-primary)] tabular-nums">
                    Cilium L7
                  </span>
                </li>
              </ul>

              {/* Specimen Input */}
              <div className="space-y-1">
                <label
                  htmlFor="density-specimen-input"
                  className="block font-mono text-[12px] text-[var(--color-text-inverse)]"
                >
                  Input (24) · Min 16px mobile font
                </label>
                <input
                  id="density-specimen-input"
                  type="text"
                  readOnly
                  value="runtime.class=gvisor"
                  className="min-h-[40px] w-full rounded-[6px] border border-[var(--color-border-muted-subtle)] bg-[var(--color-surface-muted)] font-mono text-[16px] text-[var(--color-text-primary)] transition-all duration-200"
                  style={{
                    paddingTop: profile.controlPadYCss,
                    paddingBottom: profile.controlPadYCss,
                    paddingLeft: profile.controlPadXCss,
                    paddingRight: profile.controlPadXCss,
                  }}
                />
              </div>

              {/* Specimen Buttons */}
              <div
                className="flex flex-wrap items-center"
                style={{ gap: profile.itemGapCss }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setDensityMode((prev) =>
                      prev === DensityMode.Compact
                        ? DensityMode.Comfortable
                        : DensityMode.Compact
                    )
                  }
                  className="min-h-[40px] rounded-[6px] border border-[var(--color-border-strong)] bg-[var(--color-border-strong)]/15 text-[14px] font-medium text-[var(--color-text-primary)] transition-all duration-200 whitespace-nowrap cursor-pointer"
                  style={{
                    paddingTop: profile.controlPadYCss,
                    paddingBottom: profile.controlPadYCss,
                    paddingLeft: profile.controlPadXCss,
                    paddingRight: profile.controlPadXCss,
                  }}
                >
                  Switch to {densityMode === DensityMode.Compact ? 'Comfortable' : 'Compact'}
                </button>
                <span className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
                  Buttons (60) · Outer pad &gt;= inner gap
                </span>
              </div>
            </div>

            <p className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
              Spatial invariant verified: container padding ({profile.containerPaddingFormula}) always exceeds internal child gap ({profile.itemGapFormula}).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
