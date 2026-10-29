import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Copy, 
  Check, 
  DollarSign, 
  Coins, 
  Layers, 
  ShieldAlert, 
  TrendingUp,
  FileText
} from 'lucide-react';

export const RateCalculator: React.FC = () => {
  const [role, setRole] = useState<'smart-contracts' | 'frontend' | 'security' | 'growth' | 'design'>('smart-contracts');
  const [seniority, setSeniority] = useState<'mid' | 'senior' | 'specialist'>('senior');
  const [riskTier, setRiskTier] = useState<'mainnet-vault' | 'testnet-dapp' | 'tooling-bot'>('mainnet-vault');
  const [tokenMix, setTokenMix] = useState<'100-usdc' | '70-30' | '50-50'>('100-usdc');
  const [model, setModel] = useState<'retainer' | 'hourly' | 'fixed-milestone'>('fixed-milestone');
  const [estimatedHours, setEstimatedHours] = useState<number>(60);
  const [copied, setCopied] = useState(false);

  // Rate baseline matrix
  const calculation = useMemo(() => {
    let baseHourly = 95;
    if (role === 'smart-contracts') baseHourly = 135;
    if (role === 'security') baseHourly = 195;
    if (role === 'frontend') baseHourly = 95;
    if (role === 'growth') baseHourly = 85;
    if (role === 'design') baseHourly = 90;

    // Seniority multiplier
    let seniorityMultiplier = 1.0;
    if (seniority === 'mid') seniorityMultiplier = 0.85;
    if (seniority === 'senior') seniorityMultiplier = 1.15;
    if (seniority === 'specialist') seniorityMultiplier = 1.45;

    // Risk multiplier
    let riskMultiplier = 1.0;
    if (riskTier === 'mainnet-vault') riskMultiplier = 1.25;
    if (riskTier === 'testnet-dapp') riskMultiplier = 1.0;
    if (riskTier === 'tooling-bot') riskMultiplier = 0.9;

    // Token mix adjustment (if receiving illiquid/native token, contractors demand higher nominal reward to compensate for volatility)
    let tokenVolPremium = 1.0;
    if (tokenMix === '70-30') tokenVolPremium = 1.15;
    if (tokenMix === '50-50') tokenVolPremium = 1.35;

    const hourlyRate = Math.round(baseHourly * seniorityMultiplier * riskMultiplier);
    const totalRaw = Math.round(hourlyRate * estimatedHours * tokenVolPremium);
    const monthlyRetainer = Math.round(hourlyRate * 35 * 4 * tokenVolPremium);

    let usdcAmount = totalRaw;
    let tokenAmount = 0;
    if (tokenMix === '70-30') {
      usdcAmount = Math.round(totalRaw * 0.7);
      tokenAmount = Math.round(totalRaw * 0.3);
    } else if (tokenMix === '50-50') {
      usdcAmount = Math.round(totalRaw * 0.5);
      tokenAmount = Math.round(totalRaw * 0.5);
    }

    // Milestones tranches
    const milestone1 = Math.round(totalRaw * 0.35);
    const milestone2 = Math.round(totalRaw * 0.45);
    const milestone3 = totalRaw - milestone1 - milestone2;

    return {
      hourlyRate,
      totalEstimate: totalRaw,
      monthlyRetainer,
      usdcAmount,
      tokenAmount,
      milestone1,
      milestone2,
      milestone3
    };
  }, [role, seniority, riskTier, tokenMix, estimatedHours]);

  const proposalSnippet = `### Pricing & Milestone Structure
Total Compensation: $${calculation.totalEstimate.toLocaleString()} (${tokenMix === '100-usdc' ? '100% USDC' : `$${calculation.usdcAmount.toLocaleString()} USDC + $${calculation.tokenAmount.toLocaleString()} in Protocol Tokens`})
Effective Rate: $${calculation.hourlyRate}/hr across ~${estimatedHours} estimated hours.

Milestone Breakdown:
1. **Architecture & Invariant Tests (35%)**: $${calculation.milestone1.toLocaleString()} upon passing testnet verification
2. **Core Implementation & Staging Deploy (45%)**: $${calculation.milestone2.toLocaleString()} upon functional delivery
3. **Audit Mitigations & Mainnet Handover (20%)**: $${calculation.milestone3.toLocaleString()} upon final verification`;

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(proposalSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Web3 Contributor Compensation Estimator
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Web3 Rate & Retainer Calculator
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
              Model fair, market-tested rates based on smart contract risk, tech stack rarity, and stablecoin vs token payment distributions.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs">
            <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase font-medium">Market Benchmark</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 font-mono tabular-nums">
                $110 - $220/hr median
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Parameters (6 cols) */}
        <div className="lg:col-span-6 space-y-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            Project & Contributor Variables
          </h3>

          {/* Role */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Domain / Specialization
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
              {[
                { id: 'smart-contracts', label: 'Solidity / Rust' },
                { id: 'security', label: 'Security & Audits' },
                { id: 'frontend', label: 'Frontend & DApps' },
                { id: 'growth', label: 'DevRel & Growth' },
                { id: 'design', label: 'UI/UX Design' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as any)}
                  className={`p-2 rounded-lg text-left font-medium transition-colors ${
                    role === r.id
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Seniority */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Experience Level
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { id: 'mid', label: 'Mid (1-3 yrs)' },
                { id: 'senior', label: 'Senior (3-5 yrs)' },
                { id: 'specialist', label: 'Staff / Niche' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSeniority(s.id as any)}
                  className={`p-2 rounded-lg text-center font-medium transition-colors ${
                    seniority === s.id
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Tier */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Onchain Risk & Security Exposure
            </label>
            <select
              value={riskTier}
              onChange={(e) => setRiskTier(e.target.value as any)}
              className="w-full p-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer"
            >
              <option value="mainnet-vault">Mainnet Protocol / Vault Contracts (High Financial Risk)</option>
              <option value="testnet-dapp">Testnet Prototype / DApp Frontend (Medium Risk)</option>
              <option value="tooling-bot">Internal Bot / Dev Tooling / Docs (Standard Risk)</option>
            </select>
          </div>

          {/* Payment Token Mix */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Payment Token Mix
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { id: '100-usdc', label: '100% USDC / USDT' },
                { id: '70-30', label: '70% USDC + 30% Token' },
                { id: '50-50', label: '50% USDC + 50% Token' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTokenMix(t.id as any)}
                  className={`p-2 rounded-lg text-center font-medium transition-colors ${
                    tokenMix === t.id
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scope Hours */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                Estimated Project Scope
              </span>
              <span className="font-mono tabular-nums text-zinc-500">
                {estimatedHours} hours (~{Math.round(estimatedHours / 20)} weeks)
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="160"
              step="5"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(parseInt(e.target.value))}
              className="w-full accent-zinc-900 dark:accent-zinc-100 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculation Summary & Proposal Block (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Recommended Compensation
              </h3>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                Fair Market Output
              </span>
            </div>

            {/* Big Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">Recommended Hourly Rate</div>
                <div className="text-2xl font-bold font-mono tabular-nums text-zinc-900 dark:text-zinc-100 mt-1">
                  ${calculation.hourlyRate}
                  <span className="text-xs text-zinc-400 font-normal ml-1">USDC / hr</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">Project Fixed Scope</div>
                <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
                  ${calculation.totalEstimate.toLocaleString()}
                  <span className="text-xs text-zinc-400 font-normal ml-1">Total</span>
                </div>
              </div>
            </div>

            {/* Token Allocation if mixed */}
            {tokenMix !== '100-usdc' && (
              <div className="p-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Stablecoin vs Token Split:</span>
                <span className="font-mono tabular-nums font-semibold text-zinc-900 dark:text-zinc-100">
                  ${calculation.usdcAmount.toLocaleString()} USDC + ${calculation.tokenAmount.toLocaleString()} in Protocol Tokens
                </span>
              </div>
            )}

            {/* Milestone Tranche Breakdown */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Escrowed Milestone Tranches (Standard Web3 Practice)
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Tranche 1 (35%) · </span>
                    <span className="text-zinc-500">Architecture & Invariant Tests</span>
                  </div>
                  <span className="font-mono font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                    ${calculation.milestone1.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Tranche 2 (45%) · </span>
                    <span className="text-zinc-500">Core Implementation & Testnet Deploy</span>
                  </div>
                  <span className="font-mono font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                    ${calculation.milestone2.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Tranche 3 (20%) · </span>
                    <span className="text-zinc-500">Audit Fixes & Mainnet Handover</span>
                  </div>
                  <span className="font-mono font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                    ${calculation.milestone3.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Copyable proposal snippet */}
            <div className="pt-2">
              <button
                onClick={handleCopyProposal}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Copied Proposal Pricing Snippet</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Proposal Pricing Snippet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
