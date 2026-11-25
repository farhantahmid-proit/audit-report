import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TopNavBar } from './components/TopNavBar';
import { OverviewSection } from './components/OverviewSection';
import { TokensSection } from './components/TokensSection';
import { ComponentMatrixSection } from './components/ComponentMatrixSection';
import { PathwaySection } from './components/PathwaySection';
import { GovernanceSection } from './components/GovernanceSection';
import { ExportSpecModal } from './components/ExportSpecModal';
import { SavedAuditsDrawer } from './components/SavedAuditsDrawer';
import { QA_CHECKLIST } from './data/governanceData';
import { ComponentFamily, HubSection } from './types';

const QA_STORAGE_KEY = 'opensandbox_spec_qa_checked_v1';
const SAVED_AUDITS_STORAGE_KEY = 'opensandbox_spec_saved_audits_v1';

const DEFAULT_CHECKED_QA: string[] = [
  'qa-tokens-semantic',
  'qa-tokens-type',
  'qa-states-seven',
];

const DEFAULT_SAVED_AUDITS: string[] = [
  'audit-opensandbox-mirror',
  'audit-artex',
  'audit-spenta-core',
];

const SECTION_BREADCRUMBS: Record<HubSection, string> = {
  [HubSection.Overview]: 'Overview & Surface Density',
  [HubSection.Tokens]: 'Tokens & Contrast Lab',
  [HubSection.Components]: '7-State Matrix & Density',
  [HubSection.Pathway]: 'Architecture Pathway & Walkthrough',
  [HubSection.Governance]: 'WCAG 2.2 AA, Audits & QA',
};

function readStoredStringArray(key: string, fallback: string[]): string[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return parsed;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<HubSection>(HubSection.Overview);
  const [selectedFamily, setSelectedFamily] = useState<ComponentFamily>(ComponentFamily.Button);
  const [checkedQaIds, setCheckedQaIds] = useState<string[]>(() =>
    readStoredStringArray(QA_STORAGE_KEY, DEFAULT_CHECKED_QA)
  );
  const [savedAuditIds, setSavedAuditIds] = useState<string[]>(() =>
    readStoredStringArray(SAVED_AUDITS_STORAGE_KEY, DEFAULT_SAVED_AUDITS)
  );
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [exportOpen, setExportOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(checkedQaIds));
    } catch {
      // Ignore storage quota errors in restricted iframe environments
    }
  }, [checkedQaIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SAVED_AUDITS_STORAGE_KEY,
        JSON.stringify(savedAuditIds)
      );
    } catch {
      // Ignore storage quota errors in restricted iframe environments
    }
  }, [savedAuditIds]);

  const handleSelectSection = (section: HubSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectFamily = (family: ComponentFamily) => {
    setSelectedFamily(family);
    setActiveSection(HubSection.Components);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleQaItem = (id: string) => {
    setCheckedQaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetQaChecklist = () => {
    setCheckedQaIds([]);
  };

  const handleToggleSavedAudit = (id: string) => {
    setSavedAuditIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRemoveSavedAudit = (id: string) => {
    setSavedAuditIds((prev) => prev.filter((item) => item !== id));
  };

  const handleRestoreDefaultAudits = () => {
    setSavedAuditIds(DEFAULT_SAVED_AUDITS);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f1f5f9] flex flex-col">
      <TopNavBar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenExport={() => setExportOpen(true)}
      />

      <SavedAuditsDrawer
        isOpen={drawerOpen}
        onToggle={() => setDrawerOpen((prev) => !prev)}
        onClose={() => setDrawerOpen(false)}
        savedAuditIds={savedAuditIds}
        onRemoveAudit={handleRemoveSavedAudit}
        onRestoreDefaults={handleRestoreDefaultAudits}
        onOpenRegistry={() => handleSelectSection(HubSection.Governance)}
        breadcrumbLabel={SECTION_BREADCRUMBS[activeSection]}
      />

      <main
        id="main-content"
        className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-20 md:px-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeSection === HubSection.Overview && (
              <OverviewSection
                onNavigate={handleSelectSection}
                onInspectFamily={handleInspectFamily}
                qaProgress={{ passed: checkedQaIds.length, total: QA_CHECKLIST.length }}
              />
            )}

            {activeSection === HubSection.Tokens && <TokensSection />}

            {activeSection === HubSection.Components && (
              <ComponentMatrixSection
                selectedFamily={selectedFamily}
                onSelectFamily={setSelectedFamily}
              />
            )}

            {activeSection === HubSection.Pathway && <PathwaySection />}

            {activeSection === HubSection.Governance && (
              <GovernanceSection
                checkedQaIds={checkedQaIds}
                onToggleQaItem={handleToggleQaItem}
                onResetQaChecklist={handleResetQaChecklist}
                onOpenExport={() => setExportOpen(true)}
                savedAuditIds={savedAuditIds}
                onToggleSavedAudit={handleToggleSavedAudit}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer
        role="contentinfo"
        className="border-t border-white/10 bg-[#060a0f]"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-4 px-4 py-8 text-[13px] text-[#aaaaaa] md:flex-row md:items-center md:px-6">
          <div className="space-y-1">
            <p className="font-medium text-[#f1f5f9]">
              Alibaba OpenSandbox Review: Self — Design System &amp; Audit Hub
            </p>
            <p className="font-mono text-[12px] text-[#aaaaaa]">
              DM Sans · Obsidian &amp; Teal Semantic Tokens · WCAG 2.2 AA
            </p>
          </div>

          <nav aria-label="Footer quick links" className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => handleSelectSection(HubSection.Tokens)}
              className="min-h-[36px] text-[#aaaaaa] hover:text-[#f1f5f9] cursor-pointer"
            >
              Semantic Tokens
            </button>
            <button
              type="button"
              onClick={() => handleSelectSection(HubSection.Components)}
              className="min-h-[36px] text-[#aaaaaa] hover:text-[#f1f5f9] cursor-pointer"
            >
              7-State Matrix
            </button>
            <button
              type="button"
              onClick={() => handleSelectSection(HubSection.Pathway)}
              className="min-h-[36px] text-[#aaaaaa] hover:text-[#f1f5f9] cursor-pointer"
            >
              Architecture Pathway
            </button>
            <button
              type="button"
              onClick={() => handleSelectSection(HubSection.Governance)}
              className="min-h-[36px] text-[#aaaaaa] hover:text-[#f1f5f9] cursor-pointer"
            >
              WCAG &amp; QA
            </button>
          </nav>
        </div>
      </footer>

      <ExportSpecModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        checkedQaIds={checkedQaIds}
      />
    </div>
  );
}
