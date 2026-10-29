import React, { useState, useMemo } from 'react';
import { 
  Radar, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  TrendingUp, 
  Code2, 
  ArrowRight,
  Shield,
  Layers,
  Terminal,
  Compass
} from 'lucide-react';
import { PROTOCOL_NEEDS_INTEL } from '../data/web3Data';
import { ProtocolNeedInsight } from '../types';

interface ProtocolNeedsIntelProps {
  onDraftPitchWithSkill?: (category: string, suggestedPoW: string) => void;
}

const ALL_SKILLS = [
  'Solidity 0.8.24+',
  'Foundry',
  'Uniswap v4 Hooks',
  'Rust',
  'Anchor Framework',
  'Solana Web3.js v2',
  'Token-2022',
  'React / Next.js',
  'Viem / Wagmi v2',
  'Telegram Mini Apps',
  'Privy / Dynamic',
  'Tailwind CSS',
  'Invariant Fuzzing',
  'Slither & Aderyn',
  'DeFi Attack Vectors',
  'Dune Analytics',
  'Technical Writing',
  'Python'
];

export const ProtocolNeedsIntel: React.FC<ProtocolNeedsIntelProps> = ({
  onDraftPitchWithSkill
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(PROTOCOL_NEEDS_INTEL[0].id);
  const [userSkills, setUserSkills] = useState<string[]>([
    'Solidity 0.8.24+',
    'Foundry',
    'React / Next.js',
    'Viem / Wagmi v2'
  ]);

  const toggleSkill = (skill: string) => {
    if (userSkills.includes(skill)) {
      setUserSkills(userSkills.filter((s) => s !== skill));
    } else {
      setUserSkills([...userSkills, skill]);
    }
  };

  const activeInsight = useMemo(() => {
    return PROTOCOL_NEEDS_INTEL.find((i) => i.id === selectedCategory) || PROTOCOL_NEEDS_INTEL[0];
  }, [selectedCategory]);

  // Calculate skill matches for each category
  const categoryMatches = useMemo(() => {
    return PROTOCOL_NEEDS_INTEL.map((cat) => {
      const matchingCount = cat.hotSkills.filter((s) => userSkills.includes(s)).length;
      const matchPercentage = Math.round((matchingCount / cat.hotSkills.length) * 100);
      return {
        id: cat.id,
        category: cat.category,
        matchPercentage,
        matchingCount,
        total: cat.hotSkills.length
      };
    });
  }, [userSkills]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Market Intelligence & Protocol Expectations
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              What Web3 Founders Actually Need in 2026
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
              Unfiltered feedback from 140+ protocol leads, DAO grant allocators, and foundation committees on what commands retainers versus what gets rejected.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs">
              <span className="text-zinc-400 block text-[10px] uppercase font-medium">Top Surging Need</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Solidity Hooks & Invariant Fuzzing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Skill Matcher Drawer */}
      <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-zinc-500" />
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Interactive Readiness & Skill Matcher
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            {userSkills.length} skills selected
          </span>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Select the technologies you have built with to calculate your match score against live protocol demand:
        </p>

        {/* Skill selection chips (Interactive buttons) */}
        <div className="flex flex-wrap gap-1.5">
          {ALL_SKILLS.map((skill) => {
            const isSelected = userSkills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium shadow-2xs'
                    : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>

        {/* Match breakdown bars */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {categoryMatches.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={`p-2.5 rounded-lg border cursor-pointer transition-colors ${
                selectedCategory === item.id
                  ? 'border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-800'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="text-[11px] text-zinc-500 truncate mb-1">
                {item.category.split('&')[0]}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-mono tabular-nums text-zinc-900 dark:text-zinc-100">
                  {item.matchPercentage}%
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {item.matchingCount}/{item.total}
                </span>
              </div>
              {/* Progress track */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${item.matchPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Category Detail Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Category List Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          {PROTOCOL_NEEDS_INTEL.map((insight) => (
            <button
              key={insight.id}
              onClick={() => setSelectedCategory(insight.id)}
              className={`w-full p-4 rounded-xl text-left border transition-colors flex flex-col justify-between ${
                selectedCategory === insight.id
                  ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span className="font-mono">{insight.demandLevel} Demand</span>
                  <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                    {insight.avgHourly}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {insight.category}
                </h4>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Insight Deep-Dive (8 cols) */}
        <div className="lg:col-span-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <div className="text-xs text-zinc-400 font-mono">
                Median Rate: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{activeInsight.avgRetainer}</span>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                {activeInsight.category}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-400 font-medium">Protocols actively hiring:</span>
              <div className="flex flex-wrap gap-1 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                {activeInsight.keyProtocolsLooking.slice(0, 3).map((p) => (
                  <span key={p} className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Unspoken Wishlist */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Founder's Unspoken Wishlist (What Lands The Retainer)</span>
            </div>
            <div className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              {activeInsight.unspokenWishlist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dealbreakers */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-2.5">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>Instant Dealbreakers (What Causes An Immediate 'Pass')</span>
            </div>
            <div className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              {activeInsight.dealBreakers.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800">
                  <span className="font-mono text-rose-600 dark:text-rose-400 font-bold shrink-0">
                    ✕
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested High-Leverage Proof of Work */}
          <div className="p-4 rounded-xl bg-zinc-100/70 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-zinc-500" />
                <span>Recommended Proof-of-Work to Build This Week</span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Build Before Pitching</span>
            </div>

            <div className="space-y-2">
              {activeInsight.suggestedPoW.map((pow, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs"
                >
                  <span className="text-zinc-800 dark:text-zinc-200">{pow}</span>
                  {onDraftPitchWithSkill && (
                    <button
                      onClick={() => onDraftPitchWithSkill(activeInsight.category, pow)}
                      className="text-xs text-zinc-900 dark:text-zinc-100 hover:underline flex items-center gap-1 shrink-0 ml-3 font-medium"
                    >
                      <span>Draft Pitch</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
