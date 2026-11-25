import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  CheckSquare,
  RotateCcw,
  Square,
  XCircle,
} from 'lucide-react';
import {
  ANTI_PATTERNS,
  ATTACHED_AUDIT_RECORDS,
  QA_CHECKLIST,
  TONE_EXAMPLES,
  WCAG_CRITERIA,
} from '../data/governanceData';
import { AuditDomain, QaChecklistItem } from '../types';

interface GovernanceSectionProps {
  checkedQaIds: string[];
  onToggleQaItem: (id: string) => void;
  onResetQaChecklist: () => void;
  onOpenExport: () => void;
  savedAuditIds: string[];
  onToggleSavedAudit: (id: string) => void;
}

const AUDIT_DOMAIN_OPTIONS: { id: AuditDomain; label: string }[] = [
  { id: AuditDomain.All, label: 'All Audits' },
  { id: AuditDomain.Fork78License, label: '78-Fork License Matrix' },
  { id: AuditDomain.GitHub416, label: 'GitHub 416-Repo Portfolio' },
  { id: AuditDomain.SpentaOS, label: 'Spenta Sovereign OS' },
  { id: AuditDomain.HelloKhata, label: 'HelloKhata Retail OS' },
];

type QaGroupFilter = 'All' | QaChecklistItem['group'];
const QA_GROUP_OPTIONS: QaGroupFilter[] = [
  'All',
  'Tokens',
  'States',
  'Responsive',
  'Accessibility',
  'Content',
];

export const GovernanceSection: React.FC<GovernanceSectionProps> = ({
  checkedQaIds,
  onToggleQaItem,
  onResetQaChecklist,
  onOpenExport,
  savedAuditIds,
  onToggleSavedAudit,
}) => {
  const [auditDomain, setAuditDomain] = useState<AuditDomain>(AuditDomain.All);
  const [auditSearch, setAuditSearch] = useState<string>('');
  const [qaGroupFilter, setQaGroupFilter] = useState<QaGroupFilter>('All');

  const filteredAudits = useMemo(() => {
    const query = auditSearch.trim().toLowerCase();
    return ATTACHED_AUDIT_RECORDS.filter((record) => {
      const matchesDomain = auditDomain === AuditDomain.All || record.domain === auditDomain;
      const matchesQuery =
        query.length === 0 ||
        record.entity.toLowerCase().includes(query) ||
        record.classification.toLowerCase().includes(query) ||
        record.licenseOrMetric.toLowerCase().includes(query) ||
        record.summary.toLowerCase().includes(query);
      return matchesDomain && matchesQuery;
    });
  }, [auditDomain, auditSearch]);

  const filteredQaItems = useMemo(() => {
    if (qaGroupFilter === 'All') return QA_CHECKLIST;
    return QA_CHECKLIST.filter((item) => item.group === qaGroupFilter);
  }, [qaGroupFilter]);

  return (
    <div className="space-y-16 pt-8">
      <header className="space-y-3">
        <p className="font-mono text-[12px] text-[#81c5c9]">
          05. Accessibility Acceptance, Attached Audits &amp; Release QA
        </p>
        <h1 className="text-[clamp(1.85rem,3vw,2.6rem)] font-semibold tracking-tight text-[#f1f5f9]">
          WCAG 2.2 AA Verification, Tone Standards &amp; Portfolio Audits
        </h1>
        <p className="max-w-[74ch] text-[16px] leading-[1.65] text-[#aaaaaa]">
          Every non-negotiable requirement uses <strong className="font-semibold text-[#f1f5f9]">must</strong> and every recommendation uses <strong className="font-semibold text-[#f1f5f9]">should</strong>. Verify implementation readiness across testable WCAG criteria, anti-patterns, and attached repository audits.
        </p>
      </header>

      {/* 1. WCAG 2.2 AA Testable Pass/Fail Acceptance Criteria */}
      <section aria-labelledby="wcag-criteria-heading" className="space-y-5">
        <div className="space-y-1.5">
          <p className="font-mono text-[12px] text-[#81c5c9]">01. Accessibility Requirements</p>
          <h2 id="wcag-criteria-heading" className="text-[22px] font-semibold text-[#f1f5f9]">
            Testable WCAG 2.2 AA Pass/Fail Acceptance Criteria
          </h2>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label="WCAG 2.2 AA acceptance criteria table"
          className="overflow-x-auto rounded-[10px] bg-[#0d1117] shadow-token-1"
        >
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-[#060a0f]">
                <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">Criterion</th>
                <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">Normative Requirement</th>
                <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">PASS Check</th>
                <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">FAIL Condition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 text-[13px]">
              {WCAG_CRITERIA.map((row) => (
                <tr key={row.id} className="hover:bg-[#060a0f]/75">
                  <td className="px-4 py-3.5 align-top whitespace-nowrap">
                    <div className="font-mono text-[13px] font-semibold text-[#81c5c9] tabular-nums">
                      WCAG {row.code} ({row.level})
                    </div>
                    <div className="mt-0.5 font-medium text-[#f1f5f9]">{row.title}</div>
                    <div className="mt-1 font-mono text-[11.5px] text-[#aaaaaa]">
                      {row.strength} · {row.appliesTo}
                    </div>
                  </td>
                  <td className="max-w-[260px] px-4 py-3.5 align-top leading-[1.55] text-[#f1f5f9]">
                    {row.requirement}
                  </td>
                  <td className="max-w-[260px] px-4 py-3.5 align-top leading-[1.55] text-[#6ee7b7]">
                    {row.passCheck}
                  </td>
                  <td className="max-w-[240px] px-4 py-3.5 align-top leading-[1.55] text-[#f87171]">
                    {row.failCheck}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Content & Tone Standards + Anti-Patterns */}
      <section aria-labelledby="tone-antipatterns-heading" className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-6">
          <div>
            <p className="font-mono text-[12px] text-[#81c5c9]">02. Content &amp; Tone Standards</p>
            <h2 id="tone-antipatterns-heading" className="mt-1 text-[22px] font-semibold text-[#f1f5f9]">
              Concise, Confident, Implementation-Focused Copy
            </h2>
          </div>

          <div className="divide-y divide-white/10 rounded-[10px] bg-[#0d1117] px-5 shadow-token-1">
            {TONE_EXAMPLES.map((ex) => (
              <div key={ex.id} className="py-4 space-y-2 text-[13.5px]">
                <p className="font-mono text-[12px] text-[#aaaaaa]">{ex.context}</p>
                <p className="flex items-start gap-2 text-[#f87171]">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Avoid: &ldquo;{ex.avoidCopy}&rdquo;</span>
                </p>
                <p className="flex items-start gap-2 text-[#6ee7b7]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Use: &ldquo;{ex.recommendedCopy}&rdquo;</span>
                </p>
                <p className="text-[13px] text-[#aaaaaa]">{ex.rationale}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5 lg:col-span-6">
          <div>
            <p className="font-mono text-[12px] text-[#81c5c9]">03. Anti-Patterns &amp; Migration</p>
            <h2 className="mt-1 text-[22px] font-semibold text-[#f1f5f9]">
              Prohibited Implementations
            </h2>
          </div>

          <div className="divide-y divide-white/10 rounded-[10px] bg-[#0d1117] px-5 shadow-token-1">
            {ANTI_PATTERNS.map((rule) => (
              <div key={rule.id} className="py-4 space-y-2 text-[13.5px]">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-[#f1f5f9]">{rule.title}</h3>
                  <span className="font-mono text-[11.5px] text-[#f87171]">{rule.strength} AVOID</span>
                </div>
                <p className="text-[#aaaaaa]">
                  <strong className="font-medium text-[#f87171]">Prohibited:</strong> {rule.prohibited}
                </p>
                <p className="text-[#f1f5f9]">
                  <strong className="font-medium text-[#81c5c9]">Compliant:</strong>{' '}
                  {rule.compliantAlternative}
                </p>
                <p className="font-mono text-[12px] text-[#aaaaaa]">
                  Migration: {rule.migrationNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Searchable Attached Audits Explorer */}
      <section aria-labelledby="audits-registry-heading" className="space-y-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[12px] text-[#81c5c9]">04. Attached Engineering Audits</p>
            <h2 id="audits-registry-heading" className="mt-1 text-[22px] font-semibold text-[#f1f5f9]">
              Repository Lineage, License Risks &amp; System Architecture Registry
            </h2>
            <p className="mt-1 font-mono text-[13px] text-[#aaaaaa] tabular-nums">
              Showing {filteredAudits.length} of {ATTACHED_AUDIT_RECORDS.length} curated audit records
            </p>
          </div>

          <div className="w-full md:w-[320px]">
            <label htmlFor="audit-search-input" className="sr-only">
              Search attached audits by repository, license, or architecture
            </label>
            <input
              id="audit-search-input"
              type="search"
              value={auditSearch}
              onChange={(e) => setAuditSearch(e.target.value)}
              placeholder="Search AGPL, OpenSandbox, Spenta, POS..."
              className="min-h-[44px] w-full rounded-[6px] border border-white/14 bg-[#0d1117] px-3.5 py-2 text-[16px] text-[#f1f5f9] placeholder:text-[#aaaaaa] shadow-token-1 hover:border-[#81c5c9]"
            />
          </div>
        </div>

        <div
          role="group"
          aria-label="Filter attached audits by source domain"
          className="flex flex-wrap gap-1.5 rounded-[8px] bg-[#060a0f] p-1.5 shadow-token-1"
        >
          {AUDIT_DOMAIN_OPTIONS.map((opt) => {
            const active = auditDomain === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={active}
                onClick={() => setAuditDomain(opt.id)}
                className={`min-h-[38px] rounded-[6px] px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#0d1117] text-[#81c5c9] shadow-token-1'
                    : 'text-[#aaaaaa] hover:text-[#f1f5f9]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {filteredAudits.length === 0 ? (
          <div className="rounded-[10px] border border-white/12 bg-[#060a0f] p-8 text-center">
            <h3 className="text-[16px] font-semibold text-[#f1f5f9]">
              No audit records match &ldquo;{auditSearch}&rdquo;
            </h3>
            <p className="mt-2 text-[14px] text-[#aaaaaa]">
              Reset filters to inspect all audited records across the GitHub 416-repo portfolio, 78-fork license audit, Spenta Sovereign OS, and HelloKhata Retail OS.
            </p>
            <button
              type="button"
              onClick={() => {
                setAuditSearch('');
                setAuditDomain(AuditDomain.All);
              }}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-[#81c5c9] bg-[#81c5c9]/12 px-4 py-2 text-[14px] font-medium text-[#f1f5f9] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-[#81c5c9]" aria-hidden="true" />
              <span>Reset Audit Filters</span>
            </button>
          </div>
        ) : (
          <div
            tabIndex={0}
            role="region"
            aria-label="Attached engineering audit registry table"
            className="overflow-x-auto rounded-[10px] bg-[#0d1117] shadow-token-1"
          >
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-[#060a0f]">
                  <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">Entity &amp; Domain</th>
                  <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">Posture</th>
                  <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">License / Metric</th>
                  <th scope="col" className="px-4 py-3 font-mono text-[12px] text-[#aaaaaa]">Audit Summary</th>
                  <th scope="col" className="px-4 py-3 text-right font-mono text-[12px] text-[#aaaaaa]">Queue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8 text-[13px]">
                {filteredAudits.map((record) => {
                  const isSaved = savedAuditIds.includes(record.id);
                  return (
                    <tr key={record.id} className="hover:bg-[#060a0f]/75">
                      <td className="px-4 py-3.5 align-top">
                        <div className="font-medium text-[#f1f5f9]">{record.entity}</div>
                        <div className="mt-0.5 font-mono text-[11.5px] text-[#aaaaaa]">
                          {record.domainLabel} · {record.classification}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 align-top whitespace-nowrap font-mono text-[12px]">
                        {record.riskOrPosture === 'Verified' && (
                          <span className="inline-flex items-center gap-1.5 text-[#6ee7b7]">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Verified</span>
                          </span>
                        )}
                        {record.riskOrPosture === 'Review Required' && (
                          <span className="inline-flex items-center gap-1.5 text-[#fbbf24]">
                            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Review Required</span>
                          </span>
                        )}
                        {record.riskOrPosture === 'High Risk' && (
                          <span className="inline-flex items-center gap-1.5 text-[#f87171]">
                            <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>High Risk</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 align-top font-mono text-[12px] text-[#81c5c9] whitespace-nowrap tabular-nums">
                        {record.licenseOrMetric}
                      </td>
                      <td className="max-w-[340px] px-4 py-3.5 align-top leading-[1.55] text-[#aaaaaa]">
                        <p>{record.summary}</p>
                        <p className="mt-1 font-mono text-[11.5px] text-[#f1f5f9]/70">
                          Source: {record.upstreamOrSpec}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 text-right align-top whitespace-nowrap">
                        <button
                          type="button"
                          aria-pressed={isSaved}
                          onClick={() => onToggleSavedAudit(record.id)}
                          className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-[6px] border px-3 py-1.5 font-mono text-[12px] transition-colors duration-150 cursor-pointer ${
                            isSaved
                              ? 'border-[#81c5c9] bg-[#81c5c9]/15 text-[#81c5c9]'
                              : 'border-white/12 bg-[#060a0f] text-[#aaaaaa] hover:border-[#81c5c9] hover:text-[#f1f5f9]'
                          }`}
                        >
                          <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 4. Interactive Release QA Checklist */}
      <section aria-labelledby="qa-checklist-heading" className="space-y-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[12px] text-[#81c5c9]">05. Release QA Gate</p>
            <h2 id="qa-checklist-heading" className="mt-1 text-[22px] font-semibold text-[#f1f5f9]">
              Interactive Implementation QA Checklist
            </h2>
            <p className="mt-1 font-mono text-[13px] text-[#aaaaaa] tabular-nums">
              {checkedQaIds.length} of {QA_CHECKLIST.length} checks verified ({Math.round((checkedQaIds.length / QA_CHECKLIST.length) * 100)}% complete)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onResetQaChecklist}
              className="min-h-[40px] rounded-[6px] border border-white/12 bg-[#0d1117] px-3.5 py-2 text-[13px] font-medium text-[#aaaaaa] hover:border-[#81c5c9] hover:text-[#f1f5f9] whitespace-nowrap cursor-pointer"
            >
              Reset Checklist
            </button>
            <button
              type="button"
              onClick={onOpenExport}
              className="min-h-[40px] rounded-[6px] border border-[#81c5c9] bg-[#81c5c9]/15 px-4 py-2 text-[13px] font-medium text-[#f1f5f9] hover:bg-[#81c5c9]/25 whitespace-nowrap cursor-pointer"
            >
              Export Signed Report (.md)
            </button>
          </div>
        </div>

        {/* Visual Progress Ring and Status Bar */}
        {(() => {
          const total = QA_CHECKLIST.length;
          const completed = checkedQaIds.length;
          const pct = Math.min(100, Math.max(0, Math.round((completed / total) * 100)));
          const radius = 18;
          const circ = 2 * Math.PI * radius;
          const strokeDashoffset = circ - (pct / 100) * circ;

          return (
            <div className="flex flex-col gap-3 rounded-[10px] bg-[#0d1117] p-4 shadow-token-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center shrink-0">
                  <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 44 44">
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="22"
                      cy="22"
                      r={radius}
                      stroke="#81c5c9"
                      strokeWidth="4"
                      strokeDasharray={circ}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="none"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <span className="absolute font-mono text-[11px] font-semibold text-[#f1f5f9] tabular-nums">
                    {pct}%
                  </span>
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-4 text-[13.5px]">
                    <span className="font-medium text-[#f1f5f9]">Release Readiness Progress</span>
                    <span className="font-mono text-[12px] text-[#81c5c9] tabular-nums">
                      {completed} / {total} verified
                    </span>
                  </div>
                  {/* Status Bar */}
                  <div
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="QA checklist completion percentage"
                    className="h-2 w-full max-w-[320px] overflow-hidden rounded-[999px] bg-white/10"
                  >
                    <div
                      className="h-full rounded-[999px] bg-[#81c5c9] transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <span className="font-mono text-[12px] text-[#aaaaaa] shrink-0">
                {pct === 100 ? '✨ All QA gates passed!' : 'Complete remaining verification checks'}
              </span>
            </div>
          );
        })()}

        <div
          role="group"
          aria-label="Filter QA checklist by category"
          className="flex flex-wrap gap-1.5 rounded-[8px] bg-[#060a0f] p-1.5 shadow-token-1"
        >
          {QA_GROUP_OPTIONS.map((group) => {
            const active = qaGroupFilter === group;
            return (
              <button
                key={group}
                type="button"
                aria-pressed={active}
                onClick={() => setQaGroupFilter(group)}
                className={`min-h-[36px] rounded-[6px] px-3 py-1.5 font-mono text-[12.5px] transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#0d1117] text-[#81c5c9] shadow-token-1'
                    : 'text-[#aaaaaa] hover:text-[#f1f5f9]'
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        <ul className="divide-y divide-white/10 rounded-[10px] bg-[#0d1117] shadow-token-1">
          {filteredQaItems.map((item) => {
            const checked = checkedQaIds.includes(item.id);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => onToggleQaItem(item.id)}
                  className="flex min-h-[56px] w-full items-start gap-3.5 px-4 py-4 text-left transition-colors duration-150 hover:bg-[#060a0f]/75 cursor-pointer"
                >
                  {checked ? (
                    <CheckSquare
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#81c5c9]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Square
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#aaaaaa]"
                      aria-hidden="true"
                    />
                  )}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-[#aaaaaa]">
                      <span className="text-[#81c5c9]">{item.strength}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.group}</span>
                      <span aria-hidden="true">·</span>
                      <span>{checked ? 'Verified' : 'Pending'}</span>
                    </div>
                    <p
                      className={`text-[14.5px] leading-[1.55] ${
                        checked ? 'text-[#aaaaaa] line-through' : 'text-[#f1f5f9]'
                      }`}
                    >
                      {item.check}
                    </p>
                    <p className="font-mono text-[12px] text-[#aaaaaa]">
                      Verification: {item.verificationMethod}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
