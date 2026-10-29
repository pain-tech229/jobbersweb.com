import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar, TabType } from './components/Sidebar';
import { Header } from './components/Header';
import { ExploreProjects } from './components/ExploreProjects';
import { PitchStudio } from './components/PitchStudio';
import { ProtocolNeedsIntel } from './components/ProtocolNeedsIntel';
import { PitchTracker } from './components/PitchTracker';
import { RateCalculator } from './components/RateCalculator';
import { INITIAL_PROJECTS, INITIAL_TRACKED_PITCHES } from './data/web3Data';
import { ProjectOpportunity, TrackedPitch } from './types';

export function AppContent() {
  const [currentTab, setCurrentTab] = useState<TabType>('explore');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pitchInitialProject, setPitchInitialProject] = useState<ProjectOpportunity | null>(null);

  // Persistent tracked pitches
  const [trackedPitches, setTrackedPitches] = useState<TrackedPitch[]>(() => {
    try {
      const saved = localStorage.getItem('jobber3_tracked_pitches');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TRACKED_PITCHES;
  });

  // Persistent saved project IDs
  const [savedProjectIds, setSavedProjectIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('jobber3_saved_project_ids');
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
    return new Set(['proj-1', 'proj-3']);
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jobber3_tracked_pitches', JSON.stringify(trackedPitches));
    } catch (e) {
      console.error(e);
    }
  }, [trackedPitches]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'jobber3_saved_project_ids',
        JSON.stringify(Array.from(savedProjectIds))
      );
    } catch (e) {
      console.error(e);
    }
  }, [savedProjectIds]);

  // Handlers
  const handleOpenPitch = (project: ProjectOpportunity) => {
    setPitchInitialProject(project);
    setCurrentTab('pitch-studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSaveProject = (project: ProjectOpportunity) => {
    setSavedProjectIds((prev) => {
      const next = new Set(prev);
      if (next.has(project.id)) {
        next.delete(project.id);
      } else {
        next.add(project.id);
      }
      return next;
    });
  };

  const handleAddTrackedPitch = (pitchData: Omit<TrackedPitch, 'id' | 'lastUpdated'>) => {
    const newEntry: TrackedPitch = {
      ...pitchData,
      id: `pitch-${Date.now()}`,
      lastUpdated: 'Just now'
    };
    setTrackedPitches((prev) => [newEntry, ...prev]);
  };

  const handleUpdatePitchStatus = (id: string, newStatus: TrackedPitch['status']) => {
    setTrackedPitches((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: newStatus, lastUpdated: 'Just now' } : p
      )
    );
  };

  const handleUpdatePitchNotes = (id: string, notes: string) => {
    setTrackedPitches((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, notes, lastUpdated: 'Just now' } : p
      )
    );
  };

  const handleDeletePitch = (id: string) => {
    setTrackedPitches((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDraftWithSkill = (category: string, suggestedPoW: string) => {
    const matchingProj = INITIAL_PROJECTS.find(
      (p) => p.roleCategory === category || p.whatTheyNeed.some(w => w.includes('Solidity') || w.includes('Rust'))
    ) || INITIAL_PROJECTS[0];
    
    setPitchInitialProject(matchingProj);
    setCurrentTab('pitch-studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col lg:flex-row transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openCount={INITIAL_PROJECTS.length}
        trackedCount={trackedPitches.length}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onQuickPitch={() => {
            setPitchInitialProject(null);
            setCurrentTab('pitch-studio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentTab === 'explore' && (
            <ExploreProjects
              projects={INITIAL_PROJECTS}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenPitch={handleOpenPitch}
              onSaveToTracker={handleToggleSaveProject}
              savedProjectIds={savedProjectIds}
            />
          )}

          {currentTab === 'pitch-studio' && (
            <PitchStudio
              initialProject={pitchInitialProject}
              onSaveToTracker={handleAddTrackedPitch}
              projects={INITIAL_PROJECTS}
            />
          )}

          {currentTab === 'protocol-intel' && (
            <ProtocolNeedsIntel
              onDraftPitchWithSkill={handleDraftWithSkill}
            />
          )}

          {currentTab === 'tracker' && (
            <PitchTracker
              pitches={trackedPitches}
              onUpdateStatus={handleUpdatePitchStatus}
              onUpdateNotes={handleUpdatePitchNotes}
              onDeletePitch={handleDeletePitch}
              onAddPitch={handleAddTrackedPitch}
            />
          )}

          {currentTab === 'calculator' && (
            <RateCalculator />
          )}
        </main>

        {/* Minimalist, quiet footer */}
        <footer className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Jobber3</span>
            <span>·</span>
            <span>Web3 Contributor Dispatch & Pitch Workbench</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span>Arbitrum · Base · Solana · Monad · Sui · Berachain</span>
            <span>·</span>
            <span>All bounties in USDC & native escrow</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
