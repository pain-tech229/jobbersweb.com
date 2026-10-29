import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  ExternalLink, 
  MessageSquare, 
  DollarSign, 
  Clock, 
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { TrackedPitch } from '../types';

interface PitchTrackerProps {
  pitches: TrackedPitch[];
  onUpdateStatus: (id: string, newStatus: TrackedPitch['status']) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onDeletePitch: (id: string) => void;
  onAddPitch: (pitch: Omit<TrackedPitch, 'id' | 'lastUpdated'>) => void;
}

const STATUS_OPTIONS: TrackedPitch['status'][] = [
  'Draft',
  'Sent',
  'In Discussion',
  'Milestone Active',
  'Awarded',
  'Passed'
];

export const PitchTracker: React.FC<PitchTrackerProps> = ({
  pitches,
  onUpdateStatus,
  onUpdateNotes,
  onDeletePitch,
  onAddPitch
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // New pitch form
  const [newTitle, setNewTitle] = useState('');
  const [newProtocol, setNewProtocol] = useState('');
  const [newRole, setNewRole] = useState('Smart Contracts');
  const [newPlatform, setNewPlatform] = useState('Telegram');
  const [newHandle, setNewHandle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const filteredPitches = pitches.filter((p) => {
    if (filterStatus !== 'All' && p.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.projectTitle.toLowerCase().includes(q) ||
        p.protocol.toLowerCase().includes(q) ||
        p.notes.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreatePitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newProtocol.trim()) return;

    onAddPitch({
      projectTitle: newTitle,
      protocol: newProtocol,
      role: newRole,
      platform: newPlatform,
      contactHandle: newHandle || '@team',
      amount: newAmount || '$5,000 USDC',
      status: 'Draft',
      notes: newNotes || 'Initial pitch drafted'
    });

    setNewTitle('');
    setNewProtocol('');
    setNewHandle('');
    setNewAmount('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const getStatusBadge = (status: TrackedPitch['status']) => {
    switch (status) {
      case 'Awarded':
        return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
      case 'In Discussion':
        return 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
      case 'Milestone Active':
        return 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800';
      case 'Sent':
        return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
      case 'Passed':
        return 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700';
      default:
        return 'text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Personal Pitch & Outreach Pipeline
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Track and manage your active Web3 proposals, Telegram chats, and grant disbursements.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Track New Pitch</span>
        </button>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterStatus === 'All'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            All ({pitches.length})
          </button>
          {STATUS_OPTIONS.map((st) => {
            const count = pitches.filter((p) => p.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  filterStatus === st
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>

        <div className="text-zinc-400 font-mono text-[11px]">
          {filteredPitches.length} entries
        </div>
      </div>

      {/* Pitch List Cards */}
      {filteredPitches.length > 0 ? (
        <div className="space-y-3">
          {filteredPitches.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.protocol}</span>
                  <span>·</span>
                  <span>{item.role}</span>
                  <span>·</span>
                  <span className="font-mono text-zinc-400">{item.platform}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status Dropdown */}
                  <select
                    value={item.status}
                    onChange={(e) => onUpdateStatus(item.id, e.target.value as TrackedPitch['status'])}
                    className={`text-xs px-2.5 py-1 rounded-md border font-medium cursor-pointer ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => onDeletePitch(item.id)}
                    className="p-1 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 rounded transition-colors"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Amount */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.projectTitle}
                </h3>
                <div className="font-mono text-xs font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                  {item.amount}
                </div>
              </div>

              {/* Notes or inline editing */}
              <div className="text-xs">
                {editingNotesId === item.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      rows={2}
                      className="w-full p-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onUpdateNotes(item.id, tempNotes);
                          setEditingNotesId(null);
                        }}
                        className="px-2.5 py-1 text-xs bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded font-medium"
                      >
                        Save Notes
                      </button>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="px-2.5 py-1 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setEditingNotesId(item.id);
                      setTempNotes(item.notes);
                    }}
                    className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex items-start justify-between gap-2"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Follow-up Notes:</span>
                      <p className="line-clamp-2">{item.notes}</p>
                    </div>
                    <span className="text-[10px] text-zinc-400 shrink-0 self-start">Edit</span>
                  </div>
                )}
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                <span className="font-mono">Contact: {item.contactHandle}</span>
                <span className="font-mono">Updated: {item.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
          <CheckSquare className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            No pitches in this view
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-4">
            Draft a pitch in Pitch Studio or add a manual entry to start tracking your outreach pipeline.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Create New Pitch Entry
          </button>
        </div>
      )}

      {/* Add New Pitch Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Track a New Web3 Outreach or Proposal
            </h3>

            <form onSubmit={handleCreatePitch} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                  Project / Gig Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Invariant Fuzzing Suite"
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                    Protocol / DAO *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProtocol}
                    onChange={(e) => setNewProtocol(e.target.value)}
                    placeholder="e.g. AuraFi Labs"
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                    Platform
                  </label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md"
                  >
                    <option value="Telegram">Telegram</option>
                    <option value="DAO Forum">DAO Forum</option>
                    <option value="Discord">Discord</option>
                    <option value="Farcaster">Farcaster</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                    Contact Handle
                  </label>
                  <input
                    type="text"
                    value={newHandle}
                    onChange={(e) => setNewHandle(e.target.value)}
                    placeholder="@founder_tg"
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                    Compensation Ask
                  </label>
                  <input
                    type="text"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="$10,000 USDC"
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">
                  Next Step / Notes
                </label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows={2}
                  placeholder="Need to record 1-minute Loom walkthrough..."
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-lg font-semibold"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
