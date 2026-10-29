export type Chain = 
  | 'All Chains'
  | 'Ethereum'
  | 'Arbitrum'
  | 'Base'
  | 'Solana'
  | 'Monad'
  | 'Sui'
  | 'Polygon'
  | 'Berachain';

export type RoleCategory = 
  | 'All Roles'
  | 'Smart Contracts'
  | 'Frontend & DApps'
  | 'Security & Audits'
  | 'Growth & Community'
  | 'Technical Writing'
  | 'UI/UX Design'
  | 'Tokenomics & BD';

export type ScopeType = 'Full Bounty' | 'Monthly Retainer' | 'Ecosystem Grant' | 'Milestone Contract';

export type Urgency = 'High Priority' | 'Rolling' | 'Open RFP' | 'Immediate Start';

export interface ProjectOpportunity {
  id: string;
  title: string;
  protocol: string;
  protocolType: 'DeFi' | 'L1/L2 Infra' | 'AI Agent' | 'DePIN' | 'Dev Tooling' | 'Consumer Web3';
  chain: Chain;
  roleCategory: RoleCategory;
  comp: string;
  compAmountNumeric: number;
  compCurrency: 'USDC' | 'ETH' | 'SOL' | 'MIXED';
  scopeType: ScopeType;
  urgency: Urgency;
  description: string;
  whatTheyNeed: string[];
  whatTheyReject: string[];
  deliverables: string[];
  techStack: string[];
  contactChannel: string;
  channelType: 'Telegram' | 'Discord' | 'Forum' | 'Farcaster' | 'Email';
  postedAgo: string;
  verified: boolean;
  applicantsCount: number;
  grantFundSize?: string;
}

export interface PitchTemplate {
  id: string;
  title: string;
  channel: 'Telegram Cold DM' | 'DAO Forum Proposal' | 'Foundation Grant' | 'Security Bounty Hook' | 'Farcaster / X DM';
  bestFor: string;
  idealLength: string;
  conversionRate: string;
  structure: {
    hook: string;
    proof: string;
    value: string;
    milestone: string;
    cta: string;
  };
  samplePitch: string;
  tips: string[];
}

export interface ProtocolNeedInsight {
  id: string;
  category: string;
  demandLevel: 'Surging' | 'High' | 'Steady';
  avgRetainer: string;
  avgHourly: string;
  unspokenWishlist: string[];
  dealBreakers: string[];
  suggestedPoW: string[];
  hotSkills: string[];
  keyProtocolsLooking: string[];
}

export interface TrackedPitch {
  id: string;
  projectTitle: string;
  protocol: string;
  role: string;
  platform: string;
  contactHandle: string;
  amount: string;
  status: 'Draft' | 'Sent' | 'In Discussion' | 'Milestone Active' | 'Awarded' | 'Passed';
  notes: string;
  lastUpdated: string;
  pitchContent?: string;
}
