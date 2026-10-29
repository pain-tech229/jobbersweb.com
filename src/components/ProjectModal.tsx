import React, { useState } from 'react';
import { 
  X, 
  Send, 
  ExternalLink, 
  Check, 
  Copy, 
  AlertCircle, 
  CheckCircle2, 
  Users, 
  Clock, 
  Coins, 
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { ProjectOpportunity } from '../types';

interface ProjectModalProps {
  project: ProjectOpportunity | null;
  onClose: () => void;
  onPitch: (project: ProjectOpportunity) => void;
  onSaveToTracker: (project: ProjectOpportunity) => void;
  isSaved?: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onPitch,
  onSaveToTracker,
  isSaved = false
}) => {
  const [copiedContact, setCopiedContact] = useState(false);

  if (!project) return null;

  const handleCopyContact = () => {
    navigator.clipboard.writeText(project.contactChannel);
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{project.protocol}</span>
              <span>·</span>
              <span>{project.chain}</span>
              <span>·</span>
              <span>{project.protocolType}</span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Key metrics bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800/80 text-xs">
            <div>
              <div className="text-zinc-400 text-[10px] uppercase font-medium">Compensation</div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 font-mono tabular-nums mt-0.5">
                {project.comp}
              </div>
            </div>
            <div>
              <div className="text-zinc-400 text-[10px] uppercase font-medium">Contract Type</div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {project.scopeType}
              </div>
            </div>
            <div>
              <div className="text-zinc-400 text-[10px] uppercase font-medium">Applicants</div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 font-mono tabular-nums mt-0.5">
                {project.applicantsCount} active
              </div>
            </div>
            <div>
              <div className="text-zinc-400 text-[10px] uppercase font-medium">Urgency</div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {project.urgency}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Project Overview
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
              {project.description}
            </p>
          </div>

          {/* What They Need (Crucial Web3 requirement) */}
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/10 p-4">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-semibold text-xs mb-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>What They Need & Expect</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              {project.whatTheyNeed.map((need, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What They Reject (Crucial Web3 pitfalls) */}
          <div className="rounded-lg border border-rose-500/20 bg-rose-50/40 dark:bg-rose-950/10 p-4">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-semibold text-xs mb-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>What Gets Pitches Instantly Rejected</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              {project.whatTheyReject.map((reject, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">✕</span>
                  <span>{reject}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Concrete Milestone Deliverables
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
              {project.deliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-600 dark:text-zinc-400 shrink-0">
                    {idx + 1}
                  </span>
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact and Direct Channel */}
          <div className="p-4 rounded-lg bg-zinc-100/70 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400">
                Official Submission Channel ({project.channelType})
              </div>
              <div className="font-mono text-xs text-zinc-900 dark:text-zinc-100 mt-0.5 select-all font-medium">
                {project.contactChannel}
              </div>
            </div>
            <button
              onClick={handleCopyContact}
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-md transition-colors flex items-center gap-1.5 self-start sm:self-center shrink-0"
            >
              {copiedContact ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Handle</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/70 flex items-center justify-between gap-3">
          <button
            onClick={() => onSaveToTracker(project)}
            className="px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Saved to Tracker</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save to Tracker</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onPitch(project);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Draft Pitch in Studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
