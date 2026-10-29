import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  Sliders, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink,
  Save,
  RotateCcw
} from 'lucide-react';
import { ProjectOpportunity, PitchTemplate, TrackedPitch } from '../types';
import { PITCH_TEMPLATES } from '../data/web3Data';

interface PitchStudioProps {
  initialProject?: ProjectOpportunity | null;
  onSaveToTracker: (pitch: Omit<TrackedPitch, 'id' | 'lastUpdated'>) => void;
  projects: ProjectOpportunity[];
}

type HookType = 'gas-invariant' | 'frontend-twa' | 'dev-tooling' | 'security-poc' | 'dune-tokenomics' | 'devrel-docs';

export const PitchStudio: React.FC<PitchStudioProps> = ({
  initialProject,
  onSaveToTracker,
  projects
}) => {
  const [subTab, setSubTab] = useState<'generator' | 'playbook'>('generator');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tg-cold-dm');

  // Generator form state
  const [targetProtocol, setTargetProtocol] = useState(initialProject?.protocol || 'AuraFi Liquidity Labs');
  const [targetProjectTitle, setTargetProjectTitle] = useState(initialProject?.title || 'Uniswap v4 Dynamic Fee Hook');
  const [targetChannel, setTargetChannel] = useState<'Telegram' | 'DAO Forum' | 'Farcaster / X' | 'Security Bounty'>('Telegram');
  const [selectedHook, setSelectedHook] = useState<HookType>('gas-invariant');
  const [contributorHandle, setContributorHandle] = useState('alex_builder.eth');
  const [powLink, setPowLink] = useState('github.com/alex-builder/v4-hook-gas-demo');
  const [compAsk, setCompAsk] = useState(initialProject?.comp || '$4,500 USDC on delivery');
  const [timeline, setTimeline] = useState('by Friday');
  
  // Custom generated text
  const [generatedPitch, setGeneratedPitch] = useState('');
  const [copied, setCopied] = useState(false);
  const [savedToTrackerSuccess, setSavedToTrackerSuccess] = useState(false);

  // Update fields if initialProject changes
  useEffect(() => {
    if (initialProject) {
      setTargetProtocol(initialProject.protocol);
      setTargetProjectTitle(initialProject.title);
      setCompAsk(initialProject.comp);
      if (initialProject.channelType === 'Forum') {
        setTargetChannel('DAO Forum');
      } else if (initialProject.channelType === 'Farcaster') {
        setTargetChannel('Farcaster / X');
      } else {
        setTargetChannel('Telegram');
      }
    }
  }, [initialProject]);

  // Generate the pitch dynamically based on parameters
  useEffect(() => {
    let text = '';
    if (targetChannel === 'Telegram') {
      if (selectedHook === 'gas-invariant') {
        text = `Hey team — noticed ${targetProtocol}'s router deployment is spending extra gas in the execution loop due to multiple storage reads.

I built a working Foundry invariant test with an optimized transient storage implementation that reduces overhead by ~32%:
${powLink}

Can ship a production PR with full branch coverage and gas comparison benchmarks ${timeline} for ${compAsk}. Mind if I send over a quick 2-minute Loom walkthrough?`;
      } else if (selectedHook === 'frontend-twa') {
        text = `Hey ${targetProtocol} team — tested your recent web app on mobile Telegram and noticed a ~4.2s delay during wallet connection.

I drafted a lightweight Telegram Mini App prototype using @twa-dev/sdk and embedded wallets with sub-150ms instant trade feedback:
${powLink}

Would love to ship this client interface ${timeline} for ${compAsk}. Can I send the interactive preview link?`;
      } else if (selectedHook === 'security-poc') {
        text = `Hey security lead @${targetProtocol} — while reviewing contract commit state on your repository, noticed an edge case where extreme volatility with low oracle liquidity can lead to delayed settlement.

I wrote an isolated Foundry test reproducing this locally on a fork without affecting any network:
${powLink}

Happy to share the mitigations and test cases. Have capacity starting ${timeline} for ${compAsk}. Prefer to continue via PGP or private TG?`;
      } else if (selectedHook === 'dune-tokenomics') {
        text = `Hey team — built a live Dune dashboard tracking ${targetProtocol}'s liquidity retention and bribe efficiency across pools:
${powLink}

Found that 3 validator gauges are currently under-allocating emissions. Can formalize a complete quantitative gauge model and weekly tracking suite ${timeline} for ${compAsk}. Mind if I share the query breakdown?`;
      } else {
        text = `Hey @${targetProtocol} — went through your developer docs and noticed developers are encountering setup friction with local RPC simulation.

Created a 1-click Foundry template with runnable tests and markdown quickstart that solves this:
${powLink}

Happy to contribute this to your official ecosystem guides ${timeline} for ${compAsk}. Mind if I send the PR draft?`;
      }
    } else if (targetChannel === 'DAO Forum') {
      text = `## [RFC] ${targetProjectTitle} · Ecosystem Implementation Proposal

### 1. Executive Summary
A dedicated contribution to accelerate ${targetProtocol}'s developer adoption and technical infrastructure, delivering tested, open-source tooling and smart contracts.

### 2. Problem Statement & Motivation
Currently, ecosystem participants building on ${targetProtocol} face friction in contract verification, gas profiling, and automated testing. This proposal solves this bottleneck by providing production-ready tooling.

### 3. Verifiable Proof-of-Work & Track Record
- Primary reference implementation: ${powLink}
- Prior onchain contributor history: ${contributorHandle}

### 4. Milestone Schedule & Escrowed Tranches
- **Milestone 1 (50% - ${compAsk.includes('$') ? '$' + (parseInt(compAsk.replace(/[^0-9]/g, '')) * 0.5 || 5000).toLocaleString() + ' USDC' : '50%'})**: Core smart contracts & test suite achieving >95% branch coverage.
- **Milestone 2 (50% - ${compAsk.includes('$') ? '$' + (parseInt(compAsk.replace(/[^0-9]/g, '')) * 0.5 || 5000).toLocaleString() + ' USDC' : '50%'})**: Public deployment, developer documentation, and live testnet integration.

Delivery target: Complete execution ${timeline}.

### 5. Multisig & Governance Details
All funds to be disbursed upon verifiable GitHub release milestones reviewed by DAO community delegates.`;
    } else if (targetChannel === 'Farcaster / X') {
      text = `Hey @${targetProtocol.toLowerCase().replace(/\s+/g, '')} — loved the launch!

Noticed community members were asking for an easier way to interact on mobile without leaving their feed, so I built this live tool today:
${powLink}

Open source and handles live transactions. Happy to transfer ownership to your team or maintain it ${timeline} for ${compAsk}. Let me know if you'd like the repo transfer!`;
    } else {
      // Security Bounty
      text = `[RESPONSIBLE DISCLOSURE NOTICE]
Target: ${targetProtocol} Smart Contracts
Researcher: ${contributorHandle}

Summary:
Identified an invariant inconsistency that can cause state slippage or collateral locking under extreme oracle delay.

Proof of Concept:
Created a clean Foundry test suite reproducing this isolated on a local Anvil fork:
${powLink}

Mitigation & Retainer:
Included proposed fix diff in the encrypted report. Available to verify patches and assist with full protocol invariant testing ${timeline} for ${compAsk}.

Let me know your preferred encrypted channel (PGP/Telegram) to transmit the full disclosure.`;
    }
    setGeneratedPitch(text);
  }, [targetProtocol, targetProjectTitle, targetChannel, selectedHook, contributorHandle, powLink, compAsk, timeline]);

  // Quality checks
  const wordCount = generatedPitch.trim().split(/\s+/).length;
  const hasPoW = generatedPitch.includes('github.com') || generatedPitch.includes('dune.com') || generatedPitch.includes('http');
  const hasSpecificHook = !generatedPitch.includes('[insert');
  const isOptimalLength = targetChannel === 'Telegram' || targetChannel === 'Farcaster / X' 
    ? wordCount <= 160 
    : wordCount >= 100;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedPitch], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `pitch_${targetProtocol.toLowerCase().replace(/\s+/g, '_')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendToTracker = () => {
    onSaveToTracker({
      projectTitle: targetProjectTitle,
      protocol: targetProtocol,
      role: selectedHook === 'security-poc' ? 'Security & Audits' : selectedHook === 'frontend-twa' ? 'Frontend & DApps' : selectedHook === 'dune-tokenomics' ? 'Tokenomics & BD' : 'Smart Contracts',
      platform: targetChannel,
      contactHandle: `@${targetProtocol.toLowerCase().replace(/\s+/g, '')}`,
      amount: compAsk,
      status: 'Draft',
      notes: `Generated in Pitch Studio with ${selectedHook} hook. Proof of work: ${powLink}`,
      pitchContent: generatedPitch
    });
    setSavedToTrackerSuccess(true);
    setTimeout(() => setSavedToTrackerSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation tabs */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('generator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              subTab === 'generator'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            Interactive Pitch Drafter
          </button>
          <button
            onClick={() => setSubTab('playbook')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              subTab === 'playbook'
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            Web3 Pitch Playbook & Teardowns
          </button>
        </div>

        <div className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
          {subTab === 'generator' ? 'Tailored to Web3 founder psychology' : 'Deconstructed from $1.2M+ in closed bounties'}
        </div>
      </div>

      {subTab === 'generator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-zinc-500" />
                <span>Pitch Parameters</span>
              </h3>
              <span className="text-[11px] text-zinc-400 font-mono">Real-time compilation</span>
            </div>

            {/* Target Protocol */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Target Protocol or Client
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={targetProtocol}
                  onChange={(e) => setTargetProtocol(e.target.value)}
                  placeholder="e.g. AuraFi, Drift, Monad, Base"
                  className="flex-1 px-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
                <select
                  onChange={(e) => {
                    const found = projects.find((p) => p.protocol === e.target.value);
                    if (found) {
                      setTargetProtocol(found.protocol);
                      setTargetProjectTitle(found.title);
                      setCompAsk(found.comp);
                    }
                  }}
                  className="px-2 py-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 cursor-pointer"
                >
                  <option value="">Load from list...</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.protocol}>
                      {p.protocol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Channel */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Outreach Platform & Tone
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['Telegram', 'DAO Forum', 'Farcaster / X', 'Security Bounty'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setTargetChannel(ch)}
                    className={`px-2.5 py-1.5 text-xs rounded-md text-left font-medium transition-colors ${
                      targetChannel === ch
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                        : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Value Hook Angle */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Value Hook Angle (What gives you leverage)
              </label>
              <select
                value={selectedHook}
                onChange={(e) => setSelectedHook(e.target.value as HookType)}
                className="w-full px-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer"
              >
                <option value="gas-invariant">Gas Optimization & Invariant Testing</option>
                <option value="frontend-twa">Telegram Mini App / Mobile Interface</option>
                <option value="security-poc">Security Review & Isolated Vulnerability PoC</option>
                <option value="dune-tokenomics">Dune Dashboard & Quantitative Tokenomics</option>
                <option value="devrel-docs">Developer Quickstart Repo & Docs Overhaul</option>
              </select>
            </div>

            {/* Proof of work link */}
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Your Proof-of-Work Link (PR, GitHub, Dune, Live URL)
              </label>
              <input
                type="text"
                value={powLink}
                onChange={(e) => setPowLink(e.target.value)}
                placeholder="github.com/handle/project-demo"
                className="w-full px-3 py-1.5 text-xs font-mono bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>

            {/* Compensation & Timeline */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Budget Ask / Tranche
                </label>
                <input
                  type="text"
                  value={compAsk}
                  onChange={(e) => setCompAsk(e.target.value)}
                  placeholder="$5,000 USDC on milestone"
                  className="w-full px-3 py-1.5 text-xs font-mono bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Target Delivery
                </label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="by Friday / within 7 days"
                  className="w-full px-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Output & Pitch Canvas Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Draft Output · {targetChannel}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700">·</span>
                  <span className="text-xs font-mono tabular-nums text-zinc-400">
                    {wordCount} words
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Pitch</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownload}
                    className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Download as Markdown"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Editable Pitch Area */}
              <div className="pt-4">
                <textarea
                  value={generatedPitch}
                  onChange={(e) => setGeneratedPitch(e.target.value)}
                  rows={targetChannel === 'DAO Forum' ? 14 : 9}
                  className="w-full p-3 font-mono text-xs leading-relaxed bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 resize-y"
                />
              </div>

              {/* Pitch Readiness Checklist (Anti-Fluff Discipline) */}
              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Web3 Pitch Readiness Verification
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                    {hasPoW ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    <span className="truncate">Proof of Work link</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                    {isOptimalLength ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    <span className="truncate">{targetChannel === 'Telegram' ? 'Under 160 words' : 'Comprehensive'}</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                    {compAsk ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    <span className="truncate">Clear Milestone Tranche</span>
                  </div>
                </div>
              </div>

              {/* Send to Tracker Action */}
              <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Ready to send? Log this proposal into your active pipeline.
                </div>
                <button
                  onClick={handleSendToTracker}
                  className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  {savedToTrackerSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Logged to Tracker!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Proposal to Tracker</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Playbook & Teardowns View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {PITCH_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplateId(tmpl.id)}
                className={`p-4 rounded-xl border text-left transition-colors flex flex-col justify-between ${
                  selectedTemplateId === tmpl.id
                    ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/40'
                }`}
              >
                <div>
                  <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    {tmpl.channel}
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-snug mb-2">
                    {tmpl.title}
                  </h4>
                </div>
                <div className="pt-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  {tmpl.conversionRate}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Template Deep-Dive */}
          {(() => {
            const tmpl = PITCH_TEMPLATES.find((t) => t.id === selectedTemplateId) || PITCH_TEMPLATES[0];
            return (
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Ideal Length: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{tmpl.idealLength}</span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                      {tmpl.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setGeneratedPitch(tmpl.samplePitch);
                      setSubTab('generator');
                    }}
                    className="px-3.5 py-2 text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors self-start sm:self-auto shrink-0"
                  >
                    Load into Drafter
                  </button>
                </div>

                {/* 5 Structural Pillars */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Structural Breakdown
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
                    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">1. The Hook</div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                        {tmpl.structure.hook}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">2. Proof of Work</div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                        {tmpl.structure.proof}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">3. Deliverable</div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                        {tmpl.structure.value}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">4. Milestones</div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                        {tmpl.structure.milestone}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">5. Low-Friction CTA</div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                        {tmpl.structure.cta}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real battle-tested sample */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Battle-Tested Verbatim Example
                  </h4>
                  <pre className="p-4 rounded-lg bg-zinc-900 text-zinc-100 text-xs font-mono whitespace-pre-wrap leading-relaxed border border-zinc-800">
                    {tmpl.samplePitch}
                  </pre>
                </div>

                {/* Insider Tips */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Golden Rules for Web3 Outreach
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {tmpl.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-zinc-900 dark:text-zinc-100 font-bold shrink-0">·</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
