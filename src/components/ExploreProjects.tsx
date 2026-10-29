import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Layers, 
  Sparkles, 
  ArrowUpRight, 
  DollarSign, 
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { ProjectOpportunity, Chain, RoleCategory, ScopeType } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

interface ExploreProjectsProps {
  projects: ProjectOpportunity[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenPitch: (project: ProjectOpportunity) => void;
  onSaveToTracker: (project: ProjectOpportunity) => void;
  savedProjectIds: Set<string>;
}

const CHAINS: Chain[] = [
  'All Chains',
  'Ethereum',
  'Solana',
  'Arbitrum',
  'Base',
  'Monad',
  'Sui',
  'Berachain'
];

const ROLES: RoleCategory[] = [
  'All Roles',
  'Smart Contracts',
  'Frontend & DApps',
  'Security & Audits',
  'Growth & Community',
  'Technical Writing',
  'UI/UX Design',
  'Tokenomics & BD'
];

export const ExploreProjects: React.FC<ExploreProjectsProps> = ({
  projects,
  searchQuery,
  setSearchQuery,
  onOpenPitch,
  onSaveToTracker,
  savedProjectIds
}) => {
  const [selectedChain, setSelectedChain] = useState<Chain>('All Chains');
  const [selectedRole, setSelectedRole] = useState<RoleCategory>('All Roles');
  const [selectedScope, setSelectedScope] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectOpportunity | null>(null);

  // Filtered list
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Chain filter
      if (selectedChain !== 'All Chains' && project.chain !== selectedChain) {
        return false;
      }
      // Role filter
      if (selectedRole !== 'All Roles' && project.roleCategory !== selectedRole) {
        return false;
      }
      // Scope filter
      if (selectedScope !== 'All' && project.scopeType !== selectedScope) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesProtocol = project.protocol.toLowerCase().includes(query);
        const matchesTech = project.techStack.some((t) => t.toLowerCase().includes(query));
        const matchesDesc = project.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesProtocol && !matchesTech && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [projects, selectedChain, selectedRole, selectedScope, searchQuery]);

  // Aggregate stats
  const totalFunding = useMemo(() => {
    const sum = projects.reduce((acc, curr) => acc + curr.compAmountNumeric, 0);
    return `$${sum.toLocaleString()} USDC`;
  }, [projects]);

  const resetFilters = () => {
    setSelectedChain('All Chains');
    setSelectedRole('All Roles');
    setSelectedScope('All');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Editorial Overview Section */}
      <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white">
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <img 
            src="/src/assets/images/web3_nodes_minimal_1793266738835.jpg" 
            alt="Web3 architectural infrastructure"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
          <div className="max-w-xl">
            <div className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-2">
              Contributor Dispatch · Q4 2026
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2.5 text-balance">
              Find high-signal Web3 projects, grants, and bounty retainers.
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg">
              Curated opportunities with transparent compensation, verified protocol contacts, and explicit technical expectations before you reach out.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-6 p-4 rounded-xl bg-zinc-950/70 backdrop-blur-md border border-white/10 shrink-0">
            <div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Open Bounties & Grants</div>
              <div className="text-xl font-bold font-mono tabular-nums text-white mt-0.5">
                {totalFunding}
              </div>
            </div>
            <div className="w-px h-8 bg-zinc-800"></div>
            <div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Active Roles</div>
              <div className="text-xl font-bold font-mono tabular-nums text-emerald-400 mt-0.5">
                {projects.length} Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and segmented tabs bar */}
      <div className="space-y-3">
        {/* Role Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`
                px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors
                ${selectedRole === role
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200/70 dark:hover:bg-zinc-800'}
              `}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Secondary Chain & Scope Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Chain Selector */}
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-800">
              <span className="text-[11px] text-zinc-400 px-2 font-medium">Chain:</span>
              <select
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value as Chain)}
                className="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs px-2 py-1 rounded border-0 focus:outline-none cursor-pointer"
              >
                {CHAINS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Scope Filter */}
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-800">
              <span className="text-[11px] text-zinc-400 px-2 font-medium">Type:</span>
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs px-2 py-1 rounded border-0 focus:outline-none cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Milestone Contract">Milestone Contract</option>
                <option value="Monthly Retainer">Monthly Retainer</option>
                <option value="Ecosystem Grant">Ecosystem Grant</option>
                <option value="Full Bounty">Full Bounty</option>
              </select>
            </div>

            {(selectedChain !== 'All Chains' || selectedRole !== 'All Roles' || selectedScope !== 'All' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 rounded transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tabular-nums">
            Showing {filteredProjects.length} of {projects.length} opportunities
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
              onPitch={onOpenPitch}
              isSaved={savedProjectIds.has(project.id)}
              onToggleSave={onSaveToTracker}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-500">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            No opportunities match your filter
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-4">
            Try adjusting your chain, role, or search term to discover available Web3 bounties and grants.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Detailed Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPitch={onOpenPitch}
        onSaveToTracker={onSaveToTracker}
        isSaved={selectedProject ? savedProjectIds.has(selectedProject.id) : false}
      />
    </div>
  );
};
