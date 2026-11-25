import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Keyboard,
  MousePointerClick,
  Smartphone,
} from 'lucide-react';
import { STATE_GUIDELINES } from '../data/componentStatesData';
import { ComponentState, StateGuidelineSpec } from '../types';

interface StateGuidanceProps {
  activeState?: ComponentState;
  onSelectState?: (state: ComponentState) => void;
  title?: string;
  subtitle?: string;
}

type GuidanceTab = 'tokens' | 'requirements' | 'testing';

const GUIDANCE_TABS: { id: GuidanceTab; label: string }[] = [
  { id: 'tokens', label: 'Semantic Tokens' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'testing', label: 'Accessibility Tests' },
];

export const StateGuidance: React.FC<StateGuidanceProps> = ({
  activeState: controlledState,
  onSelectState,
  title = 'Seven-State Component Guidance',
  subtitle = 'Normative semantic tokens, keyboard/pointer/touch interaction requirements, and testable WCAG 2.2 AA pass/fail criteria for every interactive component state.',
}) => {
  const [uncontrolledState, setUncontrolledState] = useState<ComponentState>(
    ComponentState.Default
  );
  const [activeTab, setActiveTab] = useState<GuidanceTab>('requirements');

  const currentState = controlledState ?? uncontrolledState;
  const handleStateChange = (next: ComponentState) => {
    if (onSelectState) {
      onSelectState(next);
    } else {
      setUncontrolledState(next);
    }
  };

  const activeSpec: StateGuidelineSpec =
    STATE_GUIDELINES.find((spec) => spec.state === currentState) ?? STATE_GUIDELINES[0];

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextTab = GUIDANCE_TABS[(index + 1) % GUIDANCE_TABS.length];
      setActiveTab(nextTab.id);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevTab = GUIDANCE_TABS[(index - 1 + GUIDANCE_TABS.length) % GUIDANCE_TABS.length];
      setActiveTab(prevTab.id);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveTab(GUIDANCE_TABS[0].id);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveTab(GUIDANCE_TABS[GUIDANCE_TABS.length - 1].id);
    }
  };

  const getTouchSpecificGuidance = (spec: StateGuidelineSpec): string => {
    switch (spec.state) {
      case ComponentState.Default:
        return 'Touch targets must measure at least 44×44px on narrow/touch viewports with minimum space.8 (7.2px) spacing between neighboring interactive controls.';
      case ComponentState.Hover:
        return 'Wrap hover surface promotions inside @media (hover: hover) so touch taps never leave sticky hover states after finger lift.';
      case ComponentState.FocusVisible:
        return 'External Bluetooth keyboards and switch devices on tablets must expose the exact 2px color.border.strong focus-visible outline without clipping.';
      case ComponentState.Active:
        return 'Touch press provides immediate grounded feedback within motion.duration.instant (150ms); sliding finger off target cancels activation cleanly.';
      case ComponentState.Disabled:
        return 'Tap events must be strictly ignored on disabled controls while preserving nearby helper copy explaining why the control is unavailable.';
      case ComponentState.Loading:
        return 'Prevent double-tap submissions with aria-busy="true" while keeping target geometry locked within <= 2px so mobile toolbars never jump.';
      case ComponentState.Error:
        return 'Inline recovery buttons (e.g., Retry or Reset) must meet >= 44×44px touch height and scroll cleanly into view above virtual keyboards.';
      default:
        return spec.pointerAndTouchPattern;
    }
  };

  return (
    <section
      aria-labelledby="state-guidance-heading"
      className="rounded-[12px] bg-[var(--color-surface-strong)] p-5 md:p-6 shadow-token-1 space-y-6"
    >
      {/* Header */}
      <div className="space-y-1.5 border-b border-[var(--color-border-muted-hairline)] pb-4">
        <p className="font-mono text-[12px] text-[var(--color-border-strong)]">
          Reusable State Contract · 7 Mandatory States
        </p>
        <h3
          id="state-guidance-heading"
          className="text-[18.24px] font-semibold text-[var(--color-text-primary)]"
        >
          {title}
        </h3>
        <p className="max-w-[72ch] text-[14px] leading-[1.6] text-[var(--color-text-inverse)]">
          {subtitle}
        </p>
      </div>

      {/* 7 Mandatory State Selector Rail */}
      <div className="space-y-2">
        <p className="font-mono text-[12px] text-[var(--color-text-inverse)]">
          Select State Specification (Default → Error)
        </p>
        <div
          role="group"
          aria-label="Select one of the seven mandatory component states"
          className="flex flex-wrap gap-1.5 rounded-[8px] bg-[var(--color-surface-muted)] p-1.5 shadow-token-1"
        >
          {STATE_GUIDELINES.map((item) => {
            const isSelected = item.state === currentState;
            return (
              <button
                key={item.state}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleStateChange(item.state)}
                className={`min-h-[38px] rounded-[6px] px-3 py-1.5 font-mono text-[12.5px] transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--color-surface-strong)] text-[var(--color-border-strong)] shadow-token-1'
                    : 'text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* State Summary Header + Tablist */}
      <div className="flex flex-col justify-between gap-4 border-b border-[var(--color-border-muted-hairline)] pb-4 md:flex-row md:items-end">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-[var(--color-text-inverse)]">
            <span className="text-[var(--color-border-strong)]">State: {activeSpec.label}</span>
            <span aria-hidden="true">·</span>
            <span>{activeSpec.wcagRefs.join(' · ')}</span>
          </div>
          <p className="max-w-[66ch] text-[14.5px] leading-[1.6] text-[var(--color-text-primary)]">
            {activeSpec.summary}
          </p>
        </div>

        {/* Accessible Tablist (Semantic Tokens / Requirements / Accessibility Tests) */}
        <div
          role="tablist"
          aria-label="State guidance specification views"
          className="flex shrink-0 items-center gap-1 rounded-[8px] bg-[var(--color-surface-muted)] p-1 shadow-token-1"
        >
          {GUIDANCE_TABS.map((tab, idx) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`state-guidance-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`state-guidance-panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`min-h-[38px] rounded-[6px] px-3.5 py-1.5 text-[13.5px] font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--color-surface-strong)] text-[var(--color-border-strong)] shadow-token-1'
                    : 'text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panel 1: Semantic Tokens */}
      {activeTab === 'tokens' && (
        <div
          id="state-guidance-panel-tokens"
          role="tabpanel"
          aria-labelledby="state-guidance-tab-tokens"
          className="grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          <dl className="divide-y divide-[var(--color-border-muted-hairline)] rounded-[10px] bg-[var(--color-surface-muted)] px-4 text-[13px] shadow-token-1 lg:col-span-7">
            <div className="py-3">
              <dt className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
                Surface Semantic Token
              </dt>
              <dd className="mt-1 font-mono text-[var(--color-text-primary)]">
                {activeSpec.semanticTokens.surface}
              </dd>
            </div>
            <div className="py-3">
              <dt className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
                Ink Semantic Token
              </dt>
              <dd className="mt-1 font-mono text-[var(--color-text-primary)]">
                {activeSpec.semanticTokens.ink}
              </dd>
            </div>
            <div className="py-3">
              <dt className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
                Border, Radius &amp; Shadow Tokens
              </dt>
              <dd className="mt-1 font-mono text-[var(--color-border-strong)]">
                {activeSpec.semanticTokens.borderAndShadow}
              </dd>
            </div>
            <div className="py-3">
              <dt className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
                Motion Duration Token
              </dt>
              <dd className="mt-1 font-mono text-[var(--color-text-primary)]">
                {activeSpec.semanticTokens.motion}
              </dd>
            </div>
          </dl>

          <div className="space-y-4 rounded-[10px] bg-[var(--color-surface-muted)] p-4 shadow-token-1 lg:col-span-5">
            <div>
              <p className="font-mono text-[12px] text-[var(--color-border-strong)]">
                Non-Negotiable Rules (MUST)
              </p>
              <ul className="mt-2 space-y-2 text-[13.5px] leading-[1.55] text-[var(--color-text-primary)]">
                {activeSpec.mustRules.map((rule) => (
                  <li key={rule}>· {rule}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[var(--color-border-muted-hairline)] pt-3">
              <p className="font-mono text-[12px] text-[var(--color-text-inverse)]">
                Recommendations (SHOULD)
              </p>
              <ul className="mt-2 space-y-2 text-[13.5px] leading-[1.55] text-[var(--color-text-inverse)]">
                {activeSpec.shouldRules.map((rule) => (
                  <li key={rule}>· {rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 2: Requirements (Keyboard, Pointer, Touch) */}
      {activeTab === 'requirements' && (
        <div
          id="state-guidance-panel-requirements"
          role="tabpanel"
          aria-labelledby="state-guidance-tab-requirements"
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <article className="flex flex-col justify-between rounded-[10px] bg-[var(--color-surface-muted)] p-4 shadow-token-1">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-[12px] text-[var(--color-border-strong)]">
                <Keyboard className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Keyboard Interaction</span>
              </div>
              <p className="text-[13.5px] leading-[1.6] text-[var(--color-text-primary)]">
                {activeSpec.keyboardPattern}
              </p>
            </div>
            <p className="mt-4 border-t border-[var(--color-border-muted-hairline)] pt-2.5 font-mono text-[11.5px] text-[var(--color-text-inverse)]">
              Required keys: Tab · Shift+Tab · Enter · Space · Escape
            </p>
          </article>

          <article className="flex flex-col justify-between rounded-[10px] bg-[var(--color-surface-muted)] p-4 shadow-token-1">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-[12px] text-[var(--color-border-strong)]">
                <MousePointerClick className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Pointer Interaction</span>
              </div>
              <p className="text-[13.5px] leading-[1.6] text-[var(--color-text-primary)]">
                {activeSpec.pointerAndTouchPattern}
              </p>
            </div>
            <p className="mt-4 border-t border-[var(--color-border-muted-hairline)] pt-2.5 font-mono text-[11.5px] text-[var(--color-text-inverse)]">
              Motion cap: motion.duration.instant (150ms) · 0px CLS
            </p>
          </article>

          <article className="flex flex-col justify-between rounded-[10px] bg-[var(--color-surface-muted)] p-4 shadow-token-1">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-mono text-[12px] text-[var(--color-border-strong)]">
                <Smartphone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Touch Interaction</span>
              </div>
              <p className="text-[13.5px] leading-[1.6] text-[var(--color-text-primary)]">
                {getTouchSpecificGuidance(activeSpec)}
              </p>
            </div>
            <p className="mt-4 border-t border-[var(--color-border-muted-hairline)] pt-2.5 font-mono text-[11.5px] text-[var(--color-text-inverse)]">
              Touch floor: &gt;= 44×44px · Gap &gt;= space.8 (7.2px)
            </p>
          </article>
        </div>
      )}

      {/* Tab Panel 3: Accessibility Pass/Fail Test Criteria */}
      {activeTab === 'testing' && (
        <div
          id="state-guidance-panel-testing"
          role="tabpanel"
          aria-labelledby="state-guidance-tab-testing"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="rounded-[10px] border border-[var(--color-feedback-pass)]/30 bg-[var(--color-surface-muted)] p-4 space-y-2">
            <p className="flex items-center gap-2 font-mono text-[12px] text-[var(--color-feedback-pass)]">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>PASS Acceptance Criterion ({activeSpec.label})</span>
            </p>
            <p className="text-[14px] leading-[1.6] text-[var(--color-text-primary)]">
              {activeSpec.passCriterion}
            </p>
            <p className="pt-2 font-mono text-[11.5px] text-[var(--color-text-inverse)]">
              References: {activeSpec.wcagRefs.join(' · ')}
            </p>
          </div>

          <div className="rounded-[10px] border border-[var(--color-feedback-error)]/30 bg-[var(--color-surface-muted)] p-4 space-y-2">
            <p className="flex items-center gap-2 font-mono text-[12px] text-[var(--color-feedback-error)]">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>FAIL Rejection Condition ({activeSpec.label})</span>
            </p>
            <p className="text-[14px] leading-[1.6] text-[var(--color-text-primary)]">
              {activeSpec.failCriterion}
            </p>
            <p className="pt-2 font-mono text-[11.5px] text-[var(--color-text-inverse)]">
              Gate Enforcement: Blocks PR merge until remediated.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
