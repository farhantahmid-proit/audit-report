import React, { useMemo, useState } from 'react';
import { Check, Copy, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  CONTRAST_BACKGROUND_TOKENS,
  CONTRAST_FOREGROUND_TOKENS,
  OPENSANDBOX_TOKENS,
  computeContrastRatio,
} from '../data/tokensData';
import { DesignToken } from '../types';

type TokenCategoryFilter = 'all' | DesignToken['category'];

const CATEGORY_OPTIONS: { id: TokenCategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Tokens' },
  { id: 'color', label: 'Color' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' },
  { id: 'shadow', label: 'Shadow' },
  { id: 'motion', label: 'Motion' },
];

export const TokensSection: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<TokenCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fgToken, setFgToken] = useState<string>(CONTRAST_FOREGROUND_TOKENS[0].token);
  const [bgToken, setBgToken] = useState<string>(CONTRAST_BACKGROUND_TOKENS[2].token);

  const filteredTokens = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return OPENSANDBOX_TOKENS.filter((item) => {
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesQuery =
        query.length === 0 ||
        item.token.toLowerCase().includes(query) ||
        item.cssVar.toLowerCase().includes(query) ||
        item.value.toLowerCase().includes(query) ||
        item.usage.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [categoryFilter, searchQuery]);

  const selectedFg =
    CONTRAST_FOREGROUND_TOKENS.find((t) => t.token === fgToken) ?? CONTRAST_FOREGROUND_TOKENS[0];
  const selectedBg =
    CONTRAST_BACKGROUND_TOKENS.find((t) => t.token === bgToken) ?? CONTRAST_BACKGROUND_TOKENS[0];

  const contrastRatio = useMemo(
    () => computeContrastRatio(selectedFg.hex, selectedBg.hex),
    [selectedFg.hex, selectedBg.hex]
  );

  const passesAaNormal = contrastRatio >= 4.5;
  const passesAaLarge = contrastRatio >= 3.0;
  const passesAaaNormal = contrastRatio >= 7.0;

  const handleCopyToken = (token: DesignToken) => {
    const snippet = `var(${token.cssVar})`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(snippet).catch(() => {});
    }
    setCopiedId(token.id);
    window.setTimeout(() => {
      setCopiedId((current) => (current === token.id ? null : current));
    }, 1800);
  };

  return (
    <div className="space-y-12 pt-8">
      <header className="space-y-3">
        <p className="font-mono text-[12px] text-[#81c5c9]">02. Design Tokens &amp; Foundations</p>
        <h1 className="text-[clamp(1.85rem,3vw,2.6rem)] font-semibold tracking-tight text-[#f1f5f9]">
          Semantic Token Contract &amp; Live Contrast Evaluator
        </h1>
        <p className="max-w-[72ch] text-[16px] leading-[1.65] text-[#aaaaaa]">
          Component implementations must bind to semantic CSS custom properties rather than raw hex literals or one-off spacing values. Click any token row to copy its <code className="font-mono text-[#f1f5f9]">var(--*)</code> reference.
        </p>
      </header>

      {/* Live WCAG 2.2 AA Relative Luminance Contrast Evaluator */}
      <section
        aria-labelledby="contrast-evaluator-heading"
        className="rounded-[10px] bg-[#0d1117] p-6 shadow-token-1"
      >
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end">
          <div>
            <h2 id="contrast-evaluator-heading" className="text-[18.24px] font-semibold text-[#f1f5f9]">
              Live Semantic Token Contrast Evaluator
            </h2>
            <p className="mt-1 text-[14px] text-[#aaaaaa]">
              Computes exact WCAG 2.2 relative luminance ratios across OpenSandbox foreground and obsidian surface tokens.
            </p>
          </div>
          <div className="font-mono text-[13px] text-[#aaaaaa] tabular-nums">
            Formula: (L1 + 0.05) / (L2 + 0.05)
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <div>
              <label
                htmlFor="fg-token-select"
                className="mb-1.5 block font-mono text-[13px] text-[#aaaaaa]"
              >
                Foreground Semantic Token
              </label>
              <select
                id="fg-token-select"
                value={fgToken}
                onChange={(e) => setFgToken(e.target.value)}
                className="min-h-[44px] w-full rounded-[6px] border border-white/14 bg-[#060a0f] px-3.5 py-2 font-mono text-[14px] text-[#f1f5f9] transition-colors duration-150 hover:border-[#81c5c9]"
              >
                {CONTRAST_FOREGROUND_TOKENS.map((item) => (
                  <option key={item.token} value={item.token}>
                    {item.token} ({item.hex})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="bg-token-select"
                className="mb-1.5 block font-mono text-[13px] text-[#aaaaaa]"
              >
                Surface Semantic Token
              </label>
              <select
                id="bg-token-select"
                value={bgToken}
                onChange={(e) => setBgToken(e.target.value)}
                className="min-h-[44px] w-full rounded-[6px] border border-white/14 bg-[#060a0f] px-3.5 py-2 font-mono text-[14px] text-[#f1f5f9] transition-colors duration-150 hover:border-[#81c5c9]"
              >
                {CONTRAST_BACKGROUND_TOKENS.map((item) => (
                  <option key={item.token} value={item.token}>
                    {item.token} ({item.hex})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className="flex h-full flex-col justify-between rounded-[10px] border border-white/12 p-5"
              style={{ backgroundColor: selectedBg.hex }}
            >
              <div className="space-y-2">
                <p
                  className="font-mono text-[12px]"
                  style={{ color: selectedFg.hex }}
                >
                  {selectedFg.token} on {selectedBg.token}
                </p>
                <p
                  className="text-[18.88px] font-light leading-[33.6064px]"
                  style={{ color: selectedFg.hex }}
                >
                  OpenSandbox isolates untrusted agent commands inside hardened runtime boundaries.
                </p>
                <p className="text-[14px]" style={{ color: selectedFg.hex }}>
                  Secondary specification copy at font.size.md (14px) verifying AA readability.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-4">
                <div>
                  <span className="font-mono text-[12px] text-[#aaaaaa]">Computed Ratio</span>
                  <p className="font-mono text-[26px] font-semibold text-[#f1f5f9] tabular-nums">
                    {contrastRatio.toFixed(2)}:1
                  </p>
                </div>

                <div className="flex flex-wrap gap-5 font-mono text-[13px] tabular-nums">
                  <div className="flex items-center gap-1.5">
                    {passesAaNormal ? (
                      <CheckCircle2 className="h-4 w-4 text-[#6ee7b7]" aria-hidden="true" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-[#f87171]" aria-hidden="true" />
                    )}
                    <span className={passesAaNormal ? 'text-[#6ee7b7]' : 'text-[#f87171]'}>
                      AA Normal (4.5:1): {passesAaNormal ? 'PASS' : 'FAIL'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {passesAaLarge ? (
                      <CheckCircle2 className="h-4 w-4 text-[#6ee7b7]" aria-hidden="true" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-[#f87171]" aria-hidden="true" />
                    )}
                    <span className={passesAaLarge ? 'text-[#6ee7b7]' : 'text-[#f87171]'}>
                      AA UI/Large (3.0:1): {passesAaLarge ? 'PASS' : 'FAIL'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {passesAaaNormal ? (
                      <CheckCircle2 className="h-4 w-4 text-[#6ee7b7]" aria-hidden="true" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-[#fbbf24]" aria-hidden="true" />
                    )}
                    <span className={passesAaaNormal ? 'text-[#6ee7b7]' : 'text-[#fbbf24]'}>
                      AAA (7.0:1): {passesAaaNormal ? 'PASS' : 'WARN'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Toolbar */}
      <section aria-labelledby="token-catalog-heading" className="space-y-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 id="token-catalog-heading" className="text-[20px] font-semibold text-[#f1f5f9]">
              Complete Semantic Token Catalog
            </h2>
            <p className="mt-1 font-mono text-[13px] text-[#aaaaaa] tabular-nums">
              Showing {filteredTokens.length} of {OPENSANDBOX_TOKENS.length} registered OpenSandbox tokens
            </p>
          </div>

          <div className="w-full md:w-[320px]">
            <label htmlFor="token-search-input" className="sr-only">
              Filter tokens by name, CSS variable, or usage
            </label>
            <input
              id="token-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tokens (e.g., space.8, shadow.3)..."
              className="min-h-[44px] w-full rounded-[6px] border border-white/14 bg-[#0d1117] px-3.5 py-2 text-[16px] text-[#f1f5f9] placeholder:text-[#aaaaaa] shadow-token-1 transition-colors duration-150 hover:border-[#81c5c9]"
            />
          </div>
        </div>

        {/* Interactive Category Segmented Filter */}
        <div
          role="group"
          aria-label="Filter tokens by foundation category"
          className="flex flex-wrap gap-1.5 rounded-[8px] bg-[#060a0f] p-1.5 shadow-token-1"
        >
          {CATEGORY_OPTIONS.map((opt) => {
            const isActive = categoryFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setCategoryFilter(opt.id)}
                className={`min-h-[38px] rounded-[6px] px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#0d1117] text-[#81c5c9] shadow-token-1'
                    : 'text-[#aaaaaa] hover:text-[#f1f5f9]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div role="status" aria-live="polite" className="sr-only">
          {copiedId ? 'Semantic CSS variable copied to clipboard.' : ''}
        </div>

        {/* Token Table with Keyboard Scroll & Empty State */}
        {filteredTokens.length === 0 ? (
          <div className="rounded-[10px] border border-white/12 bg-[#060a0f] p-8 text-center">
            <h3 className="text-[16px] font-semibold text-[#f1f5f9]">
              No tokens match &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="mt-2 text-[14px] text-[#aaaaaa]">
              Clear the search query or switch back to All Tokens to inspect the full OpenSandbox foundation contract.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-[6px] border border-[#81c5c9] bg-[#81c5c9]/12 px-4 py-2 text-[14px] font-medium text-[#f1f5f9] hover:bg-[#81c5c9]/22 cursor-pointer"
            >
              Reset Token Filters
            </button>
          </div>
        ) : (
          <div
            tabIndex={0}
            role="region"
            aria-label="Design tokens specification table"
            className="overflow-x-auto rounded-[10px] bg-[#0d1117] shadow-token-1"
          >
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-[#060a0f]">
                  <th scope="col" className="px-4 py-3 font-mono text-[12px] font-medium text-[#aaaaaa]">
                    Specimen
                  </th>
                  <th scope="col" className="px-4 py-3 font-mono text-[12px] font-medium text-[#aaaaaa]">
                    Semantic Token
                  </th>
                  <th scope="col" className="px-4 py-3 font-mono text-[12px] font-medium text-[#aaaaaa]">
                    Resolved Value
                  </th>
                  <th scope="col" className="px-4 py-3 font-mono text-[12px] font-medium text-[#aaaaaa]">
                    Implementation Rule
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-mono text-[12px] font-medium text-[#aaaaaa]">
                    Copy Var
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8 text-[13px]">
                {filteredTokens.map((item) => {
                  const isCopied = copiedId === item.id;
                  return (
                    <tr
                      key={item.id}
                      className="transition-colors duration-150 hover:bg-[#060a0f]/75"
                    >
                      <td className="px-4 py-3 align-middle">
                        {item.category === 'color' && (
                          <div
                            aria-hidden="true"
                            className="h-7 w-12 rounded-[6px] border border-white/20"
                            style={{ backgroundColor: item.value }}
                          />
                        )}
                        {item.category === 'spacing' && (
                          <div className="flex items-center gap-2">
                            <div
                              aria-hidden="true"
                              className="h-2.5 rounded-[2px] bg-[#81c5c9]"
                              style={{ width: `calc(${item.value} * 6)` }}
                            />
                          </div>
                        )}
                        {item.category === 'radius' && (
                          <div
                            aria-hidden="true"
                            className="h-7 w-11 border border-[#81c5c9] bg-[#060a0f]"
                            style={{ borderRadius: item.value }}
                          />
                        )}
                        {item.category === 'shadow' && (
                          <div
                            aria-hidden="true"
                            className="h-7 w-12 rounded-[6px] bg-[#0d1117]"
                            style={{ boxShadow: item.value }}
                          />
                        )}
                        {item.category === 'typography' && (
                          <span className="font-sans text-[15px] font-medium text-[#f1f5f9]">
                            Aa
                          </span>
                        )}
                        {item.category === 'motion' && (
                          <span className="font-mono text-[12px] text-[#81c5c9] tabular-nums">
                            {item.value}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <div className="font-mono text-[13px] font-medium text-[#f1f5f9] whitespace-nowrap">
                          {item.token}
                        </div>
                        <div className="font-mono text-[12px] text-[#aaaaaa] whitespace-nowrap">
                          {item.cssVar}
                        </div>
                      </td>
                      <td className="max-w-[220px] px-4 py-3 align-middle font-mono text-[12px] text-[#81c5c9] tabular-nums break-words">
                        {item.value}
                      </td>
                      <td className="max-w-[320px] px-4 py-3 align-middle text-[13px] leading-[1.55] text-[#aaaaaa]">
                        <p>{item.usage}</p>
                        {item.notes && (
                          <p className="mt-1 font-mono text-[12px] text-[#f1f5f9]/75">
                            {item.notes}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right align-middle whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleCopyToken(item)}
                          aria-label={`Copy CSS variable ${item.cssVar}`}
                          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-[6px] border border-white/12 bg-[#060a0f] px-3 py-1.5 font-mono text-[12px] text-[#f1f5f9] transition-colors duration-150 hover:border-[#81c5c9] cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-[#6ee7b7]" aria-hidden="true" />
                              <span className="text-[#6ee7b7]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 text-[#aaaaaa]" aria-hidden="true" />
                              <span>Copy</span>
                            </>
                          )}
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
    </div>
  );
};
