import React, { useEffect, useRef } from 'react';
import {
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  RotateCcw,
  Trash2,
  X,
  XCircle,
} from 'lucide-react';
import { ATTACHED_AUDIT_RECORDS } from '../data/governanceData';
import { AuditRecord } from '../types';

interface SavedAuditsDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  savedAuditIds: string[];
  onRemoveAudit: (id: string) => void;
  onRestoreDefaults: () => void;
  onOpenRegistry: () => void;
  breadcrumbLabel: string;
}

export const SavedAuditsDrawer: React.FC<SavedAuditsDrawerProps> = ({
  isOpen,
  onToggle,
  onClose,
  savedAuditIds,
  onRemoveAudit,
  onRestoreDefaults,
  onOpenRegistry,
  breadcrumbLabel,
}) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  const savedRecords: AuditRecord[] = ATTACHED_AUDIT_RECORDS.filter((record) =>
    savedAuditIds.includes(record.id)
  );

  // Move focus into drawer when opened, and restore focus to trigger button on close
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else if (wasOpenRef.current) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // Escape closes drawer cleanly
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Explicit Enter and Space keyboard toggle handler for #saved-audits-drawer-button
  const handleDrawerButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Space' ||
      event.key === 'Spacebar' ||
      event.code === 'Space'
    ) {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <>
      {/* Quiet Workspace Context Bar (Non-sticky, zero mobile sticky height overhead) */}
      <div className="border-b border-[var(--color-border-muted-hairline)] bg-[var(--color-surface-muted)]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-2.5 md:px-6">
          <nav
            aria-label="Workspace breadcrumb"
            className="min-w-0 font-mono text-[12px] text-[var(--color-text-inverse)] truncate"
          >
            <span>OpenSandbox Spec</span>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-[var(--color-text-primary)]">{breadcrumbLabel}</span>
          </nav>

          <div className="relative flex items-center shrink-0">
            <button
              ref={triggerRef}
              id="saved-audits-drawer-button"
              type="button"
              title="Open saved audits drawer"
              aria-expanded={isOpen}
              aria-controls="saved-audits-drawer"
              aria-describedby="saved-audits-drawer-description"
              aria-label="Open saved audits drawer"
              onClick={onToggle}
              onKeyDown={handleDrawerButtonKeyDown}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-[6px] border border-[var(--color-border-muted-subtle)] bg-[var(--color-surface-strong)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--color-text-primary)] shadow-token-1 transition-all duration-150 hover:border-[var(--color-border-strong)] hover:shadow-token-2 focus:border-[var(--color-border-strong)] focus:shadow-token-3 focus-visible:border-[var(--color-border-strong)] focus-visible:shadow-token-3 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Bookmark
                className="h-3.5 w-3.5 text-[var(--color-border-strong)]"
                aria-hidden="true"
              />
              <span aria-hidden="true">Saved Audits</span>
              <span
                aria-hidden="true"
                className="font-mono text-[12px] text-[var(--color-border-strong)] tabular-nums"
              >
                ({savedRecords.length})
              </span>
              <span id="saved-audits-drawer-description" className="sr-only">
                Clicking this button opens the side drawer for saved engineering audit reports and progress dashboards.
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-Over Saved Audits Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <aside
            id="saved-audits-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="saved-audits-drawer-title"
            className="flex h-full w-full max-w-[460px] flex-col border-l border-[var(--color-border-muted-subtle)] bg-[var(--color-surface-strong)] shadow-token-4"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border-muted-hairline)] px-5 py-4">
              <div className="space-y-1">
                <p className="font-mono text-[12px] text-[var(--color-border-strong)]">
                  Saved Engineering Audits · Local Bookmark Queue
                </p>
                <h2
                  id="saved-audits-drawer-title"
                  className="text-[18.24px] font-semibold text-[var(--color-text-primary)]"
                >
                  Saved Audits ({savedRecords.length})
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close saved audits drawer"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-[var(--color-border-muted-subtle)] bg-[var(--color-surface-muted)] text-[var(--color-text-inverse)] transition-colors duration-150 hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] shrink-0 cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {savedRecords.length === 0 ? (
                <div className="rounded-[10px] border border-[var(--color-border-muted-hairline)] bg-[var(--color-surface-muted)] p-6 text-center space-y-3">
                  <p className="text-[16px] font-semibold text-[var(--color-text-primary)]">
                    No saved audits in your review queue
                  </p>
                  <p className="text-[13.5px] leading-[1.6] text-[var(--color-text-inverse)]">
                    Bookmark entries from the Attached Audits Registry or restore the default high-priority OpenSandbox and license risk set.
                  </p>
                  <button
                    type="button"
                    onClick={onRestoreDefaults}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-[var(--color-border-strong)] bg-[var(--color-border-strong)]/15 px-4 py-2 text-[14px] font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-border-strong)]/25 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4 text-[var(--color-border-strong)]" aria-hidden="true" />
                    <span>Restore Default Audits</span>
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-[var(--color-border-muted-hairline)]">
                  {savedRecords.map((record) => (
                    <li key={record.id} className="py-4 first:pt-0 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-0.5">
                          <p className="font-mono text-[11.5px] text-[var(--color-text-inverse)]">
                            {record.domainLabel} · {record.licenseOrMetric}
                          </p>
                          <p className="text-[15.2px] font-semibold text-[var(--color-text-primary)] break-words">
                            {record.entity}
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label={`Remove ${record.entity} from saved audits`}
                          onClick={() => onRemoveAudit(record.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-[var(--color-border-muted-hairline)] bg-[var(--color-surface-muted)] text-[var(--color-text-inverse)] hover:border-[var(--color-feedback-error)] hover:text-[var(--color-feedback-error)] shrink-0 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="font-mono text-[12px]">
                        {record.riskOrPosture === 'Verified' && (
                          <span className="inline-flex items-center gap-1.5 text-[var(--color-feedback-pass)]">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Verified</span>
                          </span>
                        )}
                        {record.riskOrPosture === 'Review Required' && (
                          <span className="inline-flex items-center gap-1.5 text-[var(--color-feedback-warn)]">
                            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Review Required</span>
                          </span>
                        )}
                        {record.riskOrPosture === 'High Risk' && (
                          <span className="inline-flex items-center gap-1.5 text-[var(--color-feedback-error)]">
                            <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>High Risk</span>
                          </span>
                        )}
                      </div>

                      <p className="text-[13px] leading-[1.55] text-[var(--color-text-inverse)]">
                        {record.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border-muted-hairline)] px-5 py-4">
              <span className="font-mono text-[12px] text-[var(--color-text-inverse)]">
                Enter / Space toggles · Esc closes
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRegistry();
                }}
                className="min-h-[40px] rounded-[6px] border border-[var(--color-border-strong)] bg-[var(--color-border-strong)]/15 px-3.5 py-2 text-[13px] font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-border-strong)]/25 whitespace-nowrap cursor-pointer"
              >
                Open Full Registry
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
