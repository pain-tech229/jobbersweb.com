import React from 'react';
import { Menu, Sun, Moon, Plus, Sparkles, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TabType } from './Sidebar';

interface HeaderProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onQuickPitch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenMobileSidebar,
  searchQuery,
  setSearchQuery,
  onQuickPitch
}) => {
  const { theme, toggleTheme } = useTheme();

  const getTabTitle = () => {
    switch (currentTab) {
      case 'explore':
        return 'Verified Project Radar';
      case 'pitch-studio':
        return 'Pitch Studio & Playbook';
      case 'protocol-intel':
        return 'Protocol Needs & Market Intel';
      case 'tracker':
        return 'Pitch Pipeline Tracker';
      case 'calculator':
        return 'Web3 Rate & Retainer Calculator';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-16 px-4 md:px-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Zone 1: Breadcrumb Title */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 lg:hidden rounded-md"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-zinc-400 hidden sm:inline">Jobber3</span>
          <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">/</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
            {getTabTitle()}
          </span>
        </div>
      </div>

      {/* Zone 2: Search or contextual quick filter */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search protocols, skills (Foundry, Rust, Viem), or chains..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
          />
        </div>
      </div>

      {/* Zone 3: Actions (Theme Toggle & Primary Action) */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle light/dark theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-700" />
          )}
        </button>

        <button
          onClick={onQuickPitch}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Pitch</span>
        </button>
      </div>
    </header>
  );
};
