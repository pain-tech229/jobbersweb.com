import React from 'react';
import { 
  Compass, 
  Send, 
  Radar, 
  CheckSquare, 
  Calculator, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export type TabType = 'explore' | 'pitch-studio' | 'protocol-intel' | 'tracker' | 'calculator';

interface SidebarProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  openCount: number;
  trackedCount: number;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  openCount,
  trackedCount,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const { theme, toggleTheme } = useTheme();

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    { 
      id: 'explore', 
      label: 'Explore Projects', 
      icon: <Compass className="w-4 h-4 shrink-0" />,
      badge: openCount
    },
    { 
      id: 'pitch-studio', 
      label: 'Pitch Studio', 
      icon: <Send className="w-4 h-4 shrink-0" />,
      badge: 'Playbook'
    },
    { 
      id: 'protocol-intel', 
      label: 'What They Need', 
      icon: <Radar className="w-4 h-4 shrink-0" />,
      badge: 'Intel'
    },
    { 
      id: 'tracker', 
      label: 'Pitch Tracker', 
      icon: <CheckSquare className="w-4 h-4 shrink-0" />,
      badge: trackedCount
    },
    { 
      id: 'calculator', 
      label: 'Rate Calculator', 
      icon: <Calculator className="w-4 h-4 shrink-0" />
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800
        flex flex-col transition-transform duration-200 lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 font-bold text-sm">
              J3
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-zinc-900 dark:text-white">
                Jobber<span className="text-zinc-400 font-normal">3</span>
              </span>
              <div className="text-[10px] text-zinc-500 font-medium">Web3 Contributor Radar</div>
            </div>
          </div>

          <button 
            onClick={toggleTheme}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-3 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            Workspace
          </div>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-900'}
                `}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`
                    text-[11px] font-mono tabular-nums px-2 py-0.5 rounded
                    ${isActive 
                      ? 'bg-zinc-800 text-zinc-300 dark:bg-zinc-700 dark:text-zinc-200' 
                      : 'bg-zinc-200/60 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-6 px-3 py-2 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            Ecosystem Hotspots
          </div>
          <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center justify-between px-3 py-1.5 rounded hover:bg-zinc-200/40 dark:hover:bg-zinc-900/60">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Base Onchain Apps
              </span>
              <span className="font-mono text-[11px] text-zinc-400">14 Gigs</span>
            </div>
            <div className="flex items-center justify-between px-3 py-1.5 rounded hover:bg-zinc-200/40 dark:hover:bg-zinc-900/60">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                Solana Mini-Apps
              </span>
              <span className="font-mono text-[11px] text-zinc-400">19 Gigs</span>
            </div>
            <div className="flex items-center justify-between px-3 py-1.5 rounded hover:bg-zinc-200/40 dark:hover:bg-zinc-900/60">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Berachain PoL
              </span>
              <span className="font-mono text-[11px] text-zinc-400">8 Gigs</span>
            </div>
            <div className="flex items-center justify-between px-3 py-1.5 rounded hover:bg-zinc-200/40 dark:hover:bg-zinc-900/60">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                Arbitrum Stylus
              </span>
              <span className="font-mono text-[11px] text-zinc-400">11 Gigs</span>
            </div>
          </div>
        </div>

        {/* User Contributor Profile Footer */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
          <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-3">
            <img 
              src="/src/assets/images/avatar_contributor_pro_1793266740040.jpg"
              alt="Contributor avatar"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-zinc-300 dark:ring-zinc-700"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                alex_builder.eth
              </div>
              <div className="text-[11px] text-zinc-500 truncate">
                Solidity & Fullstack DApps
              </div>
            </div>
            <div className="shrink-0" title="Verified Contributor">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
