import React, { useEffect, useState } from 'react';
import { Check, Copy, Download, X } from 'lucide-react';
import { generateMarkdownSpec } from '../data/governanceData';

interface ExportSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkedQaIds: string[];
}

export const ExportSpecModal: React.FC<ExportSpecModalProps> = ({
  isOpen,
  onClose,
  checkedQaIds,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const markdown = generateMarkdownSpec(checkedQaIds);

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(markdown).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'opensandbox-design-system-spec.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[86vh] w-full max-w-[780px] flex-col rounded-[16px] border border-white/14 bg-[#0d1117] shadow-token-4">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
          <div>
            <p className="font-mono text-[12px] text-[#81c5c9]">
              Implementation-Ready Markdown Export
            </p>
            <h2 id="export-modal-title" className="text-[18.24px] font-semibold text-[#f1f5f9]">
              Alibaba OpenSandbox Review: Self Specification
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close export modal"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/12 bg-[#060a0f] text-[#aaaaaa] hover:border-[#81c5c9] hover:text-[#f1f5f9] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <pre className="overflow-x-auto rounded-[10px] border border-white/10 bg-[#060a0f] p-4 font-mono text-[12.5px] leading-[1.6] text-[#f1f5f9]">
            {markdown}
          </pre>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
          <span role="status" aria-live="polite" className="font-mono text-[12px] text-[#aaaaaa]">
            {copied ? 'Specification copied to clipboard.' : 'Press Escape to close.'}
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-[6px] border border-white/14 bg-[#060a0f] px-4 py-2 text-[14px] font-medium text-[#f1f5f9] hover:border-[#81c5c9] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#6ee7b7]" aria-hidden="true" />
                  <span className="text-[#6ee7b7]">Copied Markdown</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-[#aaaaaa]" aria-hidden="true" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-[6px] border border-[#81c5c9] bg-[#81c5c9]/15 px-4 py-2 text-[14px] font-medium text-[#f1f5f9] hover:bg-[#81c5c9]/25 cursor-pointer"
            >
              <Download className="h-4 w-4 text-[#81c5c9]" aria-hidden="true" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
