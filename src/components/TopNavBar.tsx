import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HubSection } from '../types';

interface TopNavBarProps {
  activeSection: HubSection;
  onSelectSection: (section: HubSection) => void;
  onOpenExport: () => void;
}

const NAV_ITEMS: { id: HubSection; label: string }[] = [
  { id: HubSection.Overview, label: 'Overview' },
  { id: HubSection.Tokens, label: 'Tokens' },
  { id: HubSection.Components, label: 'Components' },
  { id: HubSection.Pathway, label: 'Pathway' },
  { id: HubSection.Governance, label: 'WCAG & QA' },
];

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeSection,
  onSelectSection,
  onOpenExport,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (section: HubSection) => {
    onSelectSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-40 h-14 md:h-16 border-b border-white/10 bg-[#000000]/95 backdrop-blur-sm"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:rounded-[6px] focus:bg-[#0d1117] focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-[#f1f5f9] focus:shadow-token-3"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-8 px-4 md:px-6">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick(HubSection.Overview)}
          className="text-[17.28px] font-semibold tracking-tight text-[#f1f5f9] transition-colors duration-150 hover:text-[#81c5c9] whitespace-nowrap shrink-0 cursor-pointer"
        >
          OpenSandbox Spec
        </button>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav
          aria-label="Primary specification sections"
          className="hidden md:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-[14px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#f1f5f9]'
                    : 'text-[#aaaaaa] hover:text-[#f1f5f9]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-[2px] transition-opacity duration-150 ${
                    isActive ? 'bg-[#81c5c9] opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action (+ Mobile Disclosure Trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenExport}
            className="inline-flex min-h-[40px] items-center justify-center rounded-[6px] border border-[#81c5c9] bg-[#81c5c9]/12 px-4 py-2 text-[14px] font-medium text-[#f1f5f9] transition-colors duration-150 hover:bg-[#81c5c9]/22 active:scale-[0.985] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Export Spec
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-primary-nav"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-white/12 bg-[#0d1117] text-[#f1f5f9] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Disclosure */}
      {mobileMenuOpen && (
        <nav
          id="mobile-primary-nav"
          aria-label="Mobile section navigation"
          className="border-b border-white/12 bg-[#060a0f] px-4 py-3 shadow-token-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex min-h-[44px] w-full items-center justify-between rounded-[6px] px-3 text-left text-[15.2px] font-medium transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#0d1117] text-[#81c5c9] shadow-token-1'
                        : 'text-[#f1f5f9] hover:bg-[#0d1117]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="font-mono text-[12px] text-[#81c5c9]">Active</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};
