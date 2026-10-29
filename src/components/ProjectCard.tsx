import React from 'react';
import { ExternalLink, ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { ProjectOpportunity } from '../types';

interface ProjectCardProps {
  project: ProjectOpportunity;
  onSelect: (project: ProjectOpportunity) => void;
  onPitch: (project: ProjectOpportunity) => void;
  isSaved?: boolean;
  onToggleSave?: (project: ProjectOpportunity) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  onPitch,
  isSaved = false,
  onToggleSave
}) => {
  return (
    <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col justify-between">
      <div>
        {/* Top line metadata: unboxed text with typographic separators */}
        <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2.5">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">{project.protocol}</span>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>{project.chain}</span>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>{project.roleCategory}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onToggleSave && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(project);
                }}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title={isSaved ? 'Remove from saved' : 'Save opportunity'}
                aria-label="Save project"
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            )}
            <span className="text-[11px] text-zinc-400 font-mono">{project.postedAgo}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelect(project)}
          className="text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-snug mb-2 text-balance"
        >
          {project.title}
        </h3>

        {/* Short description */}
        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* What they need preview (1 high signal hook) */}
        <div className="mb-4 text-xs bg-zinc-50 dark:bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 mb-1">
            Core Requirement
          </div>
          <div className="text-zinc-700 dark:text-zinc-300 truncate">
            {project.whatTheyNeed[0]}
          </div>
        </div>

        {/* Tech stack inline text list */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5 text-[11px] text-zinc-500 dark:text-zinc-400">
          {project.techStack.map((tech, idx) => (
            <span 
              key={tech} 
              className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[10px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row: Compensation & Action buttons */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
            {project.scopeType}
          </div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono tabular-nums">
            {project.comp}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(project)}
            className="px-2.5 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => onPitch(project)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1"
          >
            <span>Pitch</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
