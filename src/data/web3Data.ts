import { ProjectOpportunity, PitchTemplate, ProtocolNeedInsight, TrackedPitch } from '../types';

export const INITIAL_PROJECTS: ProjectOpportunity[] = [
  {
    id: 'proj-1',
    title: 'Uniswap v4 Dynamic Fee Hook & Invariant Test Suite',
    protocol: 'AuraFi Liquidity Labs',
    protocolType: 'DeFi',
    chain: 'Ethereum',
    roleCategory: 'Smart Contracts',
    comp: '$14,000 USDC',
    compAmountNumeric: 14000,
    compCurrency: 'USDC',
    scopeType: 'Milestone Contract',
    urgency: 'High Priority',
    description: 'We are deploying custom volatility-sensitive AMM hooks for Uniswap v4 pools on Ethereum mainnet. We require an experienced Solidity engineer to build and formally test the fee calculation router before our scheduled audit.',
    whatTheyNeed: [
      'Production Solidity 0.8.24+ experience with Uniswap v4 Hook architecture (beforeSwap, afterSwap)',
      'Foundry test suite including fuzzing and invariant testing using Echidna or Medusa',
      'Gas profiling comparing static vs dynamic calculation paths',
      'Clear markdown specs explaining mathematical edge cases for extreme slippage events'
    ],
    whatTheyReject: [
      'Generic forked repo links without custom commit history',
      'Unsolicited DMs asking "What is the compensation?" without reviewing the repo',
      'Engineers who cannot explain transient storage (TSTORE / TLOAD) trade-offs'
    ],
    deliverables: [
      'V4 Hook smart contract passing Foundry test matrix (>98% branch coverage)',
      'Gas benchmark report table comparing overhead per swap step',
      'Integration script for local Anvil fork with mock token pairs'
    ],
    techStack: ['Solidity', 'Foundry', 'Uniswap v4', 'Echidna'],
    contactChannel: 'Telegram: @aurafi_eng or grants@aurafi.xyz',
    channelType: 'Telegram',
    postedAgo: '4 hours ago',
    verified: true,
    applicantsCount: 6
  },
  {
    id: 'proj-2',
    title: 'Solana Mobile & Telegram Mini-App Trading Interface',
    protocol: 'Drift Velocity',
    protocolType: 'DeFi',
    chain: 'Solana',
    roleCategory: 'Frontend & DApps',
    comp: '$9,500 USDC',
    compAmountNumeric: 9500,
    compCurrency: 'USDC',
    scopeType: 'Milestone Contract',
    urgency: 'Immediate Start',
    description: 'Building a lightweight, high-performance Telegram Mini App and mobile web client for instant perpetuals copy-trading using the Drift protocol SDK and Solana Wallet Adapter.',
    whatTheyNeed: [
      'React / Next.js with deep familiarity with Telegram WebApp SDK (@twa-dev/sdk)',
      '@solana/web3.js v2 or v1 with fast priority fee estimation & versioned transaction compilation',
      'Sub-200ms interaction feedback and minimal bundle size (<120kb initial chunk)',
      'Familiarity with Embedded Wallets (Privy or Dynamic or Turnkey)'
    ],
    whatTheyReject: [
      'Bloated UI kits that lag on mobile devices in in-app browsers',
      'Engineers with no previous Solana transaction lifecycle experience',
      'Applicants without a live demo or GitHub profile'
    ],
    deliverables: [
      'Responsive Telegram Mini App responsive web client',
      'Instant 1-click trade execution flow with slippage warning modals',
      'Websocket stream integration for live liquidation price updates'
    ],
    techStack: ['TypeScript', 'React', 'Solana Web3', 'Telegram SDK', 'Tailwind'],
    contactChannel: 'Telegram: @drift_velocity_ops',
    channelType: 'Telegram',
    postedAgo: '1 day ago',
    verified: true,
    applicantsCount: 11
  },
  {
    id: 'proj-3',
    title: 'Arbitrum Stylus Rust Verifier & Benchmarking Tool',
    protocol: 'Offchain Tooling Guild',
    protocolType: 'Dev Tooling',
    chain: 'Arbitrum',
    roleCategory: 'Smart Contracts',
    comp: '$18,000 USDC Grant',
    compAmountNumeric: 18000,
    compCurrency: 'USDC',
    scopeType: 'Ecosystem Grant',
    urgency: 'Open RFP',
    description: 'Ecosystem grant to build an open-source Stylus developer toolkit in Rust that simplifies compiling, deploying, and profiling WASM contracts against Arbitrum Sepolia and Nitro nodes.',
    whatTheyNeed: [
      'Intermediate to advanced Rust experience and familiarity with WASM compilation targets',
      'Understanding of Arbitrum Stylus SDK and gas metering comparisons vs EVM opcode costs',
      'Open-source stewardship mindset with clean CI GitHub actions and documentation',
      'Ability to join bi-weekly Stylus working group calls on Arbitrum Discord'
    ],
    whatTheyReject: [
      'Copy-paste grant requests requesting 100% upfront payment without milestone breakdown',
      'Teams proposing closed-source proprietary software',
      'Vague deliverables like "Explore Stylus potential"'
    ],
    deliverables: [
      'CLI tool published to crates.io (`cargo stylus-bench`)',
      'Comparison benchmark table of Rust WASM vs Solidity execution costs on 5 common algorithms',
      'Interactive documentation site with copy-paste runnable examples'
    ],
    techStack: ['Rust', 'Arbitrum Stylus', 'WASM', 'Foundry'],
    contactChannel: 'Forum: forum.arbitrum.foundation/grants-rfp',
    channelType: 'Forum',
    postedAgo: '2 days ago',
    verified: true,
    applicantsCount: 4,
    grantFundSize: '$250k Pool'
  },
  {
    id: 'proj-4',
    title: 'Autonomous Onchain Social Agent on Base',
    protocol: 'Clanker Studio',
    protocolType: 'AI Agent',
    chain: 'Base',
    roleCategory: 'Frontend & DApps',
    comp: '$8,000 / mo Retainer',
    compAmountNumeric: 8000,
    compCurrency: 'USDC',
    scopeType: 'Monthly Retainer',
    urgency: 'Rolling',
    description: 'Looking for a Web3 builder to maintain and evolve our autonomous Farcaster frame bots and Coinbase Developer Platform (CDP) agent wallets that execute token distribution on Base upon cast triggers.',
    whatTheyNeed: [
      'Experience with Farcaster protocol (Neynar API or Hubs) and Open Frames spec',
      'Coinbase AgentKit or LangChain integrations for EVM transactions',
      'Node.js / Bun backend with resilient queue workers (Redis / BullMQ)',
      'Sharp grasp of Base gas mechanics and sponsored transactions (Paymasters)'
    ],
    whatTheyReject: [
      'Developers without active Farcaster handles or onchain transaction history on Base',
      'Applicants proposing ungrounded LLM API wrappers that hallucinate wallet keys',
      'Zero test coverage for transaction signing code paths'
    ],
    deliverables: [
      'Agent service handling 2,000+ daily onchain actions without nonce collision',
      'Clean analytics dashboard for token transfers and user engagement',
      'Self-healing retry logic for network congestion'
    ],
    techStack: ['TypeScript', 'Base', 'Farcaster Neynar', 'AgentKit', 'Next.js'],
    contactChannel: 'Farcaster: @clanker_labs or Telegram: @base_agent_leads',
    channelType: 'Farcaster',
    postedAgo: 'Just now',
    verified: true,
    applicantsCount: 8
  },
  {
    id: 'proj-5',
    title: 'Cross-Chain Restaking Vault Security Audit & PoC Report',
    protocol: 'Symbiotic Liquid Mesh',
    protocolType: 'L1/L2 Infra',
    chain: 'Ethereum',
    roleCategory: 'Security & Audits',
    comp: '$16,500 USDC',
    compAmountNumeric: 16500,
    compCurrency: 'USDC',
    scopeType: 'Full Bounty',
    urgency: 'High Priority',
    description: 'Comprehensive private security review of our collateral delegation and slashing router contracts ahead of mainnet deployment. Focused on reentrancy in token recovery routines and oracle manipulation.',
    whatTheyNeed: [
      'Prior public contest profile (Code4rena, Sherlock, or Cantina top 100 ranking preferred)',
      'Demonstrated understanding of restaking primitives (EigenLayer or Symbiotic architecture)',
      'Automated Slither / Aderyn static analysis triage + manual deep line-by-line review',
      'Reproducible Foundry PoC scripts for any Medium or High severity finding'
    ],
    whatTheyReject: [
      'Submissions consisting solely of raw tool output without validation',
      'Informational formatting suggestions presented as High severity flaws',
      'Anonymous researchers unwilling to sign a standard mutual NDA for unreleased repos'
    ],
    deliverables: [
      'Audit report PDF & Markdown with executive summary, vulnerability matrix, and mitigations',
      'Executable Foundry test suite demonstrating attack scenarios',
      'Follow-up verification check on developer patch PR'
    ],
    techStack: ['Solidity', 'Foundry', 'Slither', 'EVM Internals'],
    contactChannel: 'Telegram: @symbiotic_security or security@symbioticmesh.io',
    channelType: 'Telegram',
    postedAgo: '3 days ago',
    verified: true,
    applicantsCount: 5
  },
  {
    id: 'proj-6',
    title: 'Monad Parallel EVM Developer Quickstart Guide & Interactive Tutorials',
    protocol: 'Monad Community Guild',
    protocolType: 'L1/L2 Infra',
    chain: 'Monad',
    roleCategory: 'Technical Writing',
    comp: '$6,000 USDC',
    compAmountNumeric: 6000,
    compCurrency: 'USDC',
    scopeType: 'Milestone Contract',
    urgency: 'Rolling',
    description: 'Produce high-clarity developer onboarding documentation and sample repositories showing EVM developers how to optimize storage layouts and avoid state conflicts in Monad’s parallel execution pipeline.',
    whatTheyNeed: [
      'Ability to write clear, engaging technical guides with zero buzzwords',
      'Working knowledge of EVM state access lists (EIP-2930), memory layouts, and concurrency',
      'Clean sample GitHub repositories that work on the latest testnet CLI',
      'Experience authoring interactive diagrams or Docusaurus / Mintlify docs'
    ],
    whatTheyReject: [
      'AI-generated walls of text that recycle generic Ethereum Wikipedia definitions',
      'Writers who cannot run a local Node.js or Foundry script themselves',
      'Spelling errors in technical terms (e.g. spelling RPC or Keccak wrong)'
    ],
    deliverables: [
      '4 in-depth guides: Parallel Execution 101, State Conflict Optimization, Foundry Setup on Monad, Migrating from Sepolia',
      '2 companion starter repositories on GitHub with READMEs and test coverage',
      'Review session with core dev team before public publishing'
    ],
    techStack: ['Technical Writing', 'Markdown', 'Foundry', 'Git'],
    contactChannel: 'Telegram: @monad_devrel or Discord: #monad-grants',
    channelType: 'Discord',
    postedAgo: '5 days ago',
    verified: true,
    applicantsCount: 9
  },
  {
    id: 'proj-7',
    title: 'Sui Move Liquidity Staking Protocol Design System & DApp Overhaul',
    protocol: 'Nautilus Liquid',
    protocolType: 'DeFi',
    chain: 'Sui',
    roleCategory: 'UI/UX Design',
    comp: '$7,500 USDC',
    compAmountNumeric: 7500,
    compCurrency: 'USDC',
    scopeType: 'Milestone Contract',
    urgency: 'High Priority',
    description: 'Complete UI/UX overhaul of our staking and portfolio management dashboard. We want a minimalist, high-contrast interface inspired by modern fintech terminals rather than cartoonish crypto memes.',
    whatTheyNeed: [
      'Figma design system with comprehensive component variants, tokens, and auto-layout',
      'Clear user flows for stake, unstake with epoch lockup warnings, and rewards claim',
      'Clean light and dark mode specifications with accessible WCAG AA contrast',
      'Experience designing for Web3 transaction states (pending approval, gas estimation, error states)'
    ],
    whatTheyReject: [
      'Generic crypto templates loaded with purple glow effects and unreadable neon fonts',
      'Designers who do not provide clickable interactive prototypes',
      'Failure to account for complex edge cases (e.g., partial unstaking cooldowns)'
    ],
    deliverables: [
      'Organized Figma file with atomic tokens, components, and responsive layouts (desktop & mobile)',
      'Clickable prototype link illustrating full deposit and withdrawal cycles',
      'Design token export (JSON/CSS) ready for our React engineers'
    ],
    techStack: ['Figma', 'UI/UX', 'Design Tokens', 'Tailwind Guidelines'],
    contactChannel: 'Telegram: @nautilus_design',
    channelType: 'Telegram',
    postedAgo: '6 days ago',
    verified: true,
    applicantsCount: 14
  },
  {
    id: 'proj-8',
    title: 'Proof-of-Liquidity (PoL) Vault Strategy Builder & Validator Analytics',
    protocol: 'HoneyPot Finance',
    protocolType: 'DeFi',
    chain: 'Berachain',
    roleCategory: 'Tokenomics & BD',
    comp: '$11,000 USDC + BERA Allocation',
    compAmountNumeric: 11000,
    compCurrency: 'MIXED',
    scopeType: 'Monthly Retainer',
    urgency: 'High Priority',
    description: 'Looking for a tokenomics / quantitative strategist to model Proof-of-Liquidity validator emission distributions and build automated Dune dashboards for our ecosystem vault depositors.',
    whatTheyNeed: [
      'Mathematical modeling in Python or Excel showing APY simulations under various BGT bribe dynamics',
      'Public Dune Analytics query portfolio showcasing clean SQL with CTEs and table visualizers',
      'Clear communication skills to present findings to DAO treasury voters and protocol partners',
      'Deep understanding of Berachain tri-token architecture (BERA, BGT, HONEY)'
    ],
    whatTheyReject: [
      'Theoretical economists with zero onchain query experience',
      'Proposals lacking concrete mathematical formulas for gauge weights',
      'Fluffy slide decks without verifiable Dune queries'
    ],
    deliverables: [
      'Live Dune Analytics dashboard tracking validator gauge weight & bribe efficiency',
      'Weekly quantitative risk report on LP impermanent loss vs BGT rewards',
      'Co-authored RFC proposal for community governance vote'
    ],
    techStack: ['Dune Analytics', 'SQL', 'Python', 'Tokenomics', 'Berachain PoL'],
    contactChannel: 'Discord: discord.gg/honeypot-finance or TG: @honeypot_strat',
    channelType: 'Discord',
    postedAgo: '1 week ago',
    verified: true,
    applicantsCount: 7
  }
];

export const PITCH_TEMPLATES: PitchTemplate[] = [
  {
    id: 'tg-cold-dm',
    title: 'The 3-Paragraph High-Signal Telegram DM',
    channel: 'Telegram Cold DM',
    bestFor: 'Reaching founders, CTOs, and grant leads directly on Telegram or Twitter/X.',
    idealLength: 'Under 140 words (3 short paragraphs)',
    conversionRate: '38% Response Rate across 200+ audited campaigns',
    structure: {
      hook: 'Specific observation about their current product (gas bug, UI friction, missing integration).',
      proof: '1 single link to your exact proof of work (GitHub PR, Loom demo, Dune dash, contract).',
      value: 'Concrete 1-line proposal with expected completion timeline and zero fluff.',
      milestone: 'Clear milestone payment expectation (e.g. 50% upon testnet deployment, 50% on mainnet).',
      cta: 'Low-friction closing question that requires only a yes/no response.'
    },
    samplePitch: `Hey @founder — noticed AuraFi's new vault router on Sepolia is spending ~42k extra gas per swap due to redundant storage writes in the beforeSwap hook.

I built a working Foundry invariant test with an optimized transient storage implementation that shaves off 38% of that overhead: github.com/yourhandle/aurafi-gas-hook-demo

Can ship a production PR with full fuzz test coverage by this Friday for 4,500 USDC on milestone acceptance. Mind if I send the 2-minute walkthrough Loom?`,
    tips: [
      'Never open with "Hi ser", "Are you hiring?", or "Hope this finds you well".',
      'Founders receive 50+ DMs a day; show the solution in paragraph 1 or get ignored.',
      'Always test their contract or app locally BEFORE sending the DM so your feedback is 100% accurate.',
      'Keep the CTA effortless: ask to send a video or PR link rather than demanding a 30-minute Zoom call.'
    ]
  },
  {
    id: 'dao-rfc-proposal',
    title: 'The Unstoppable DAO Governance Forum RFC',
    channel: 'DAO Forum Proposal',
    bestFor: 'Arbitrum, Optimism, Uniswap, Aave, or MakerDAO ecosystem grant proposals ($10k - $75k).',
    idealLength: '600–900 words, structured with clear milestone gates',
    conversionRate: '82% Quorum Approval rate when following this milestone matrix',
    structure: {
      hook: 'Problem Statement: The exact ecosystem bottleneck your proposal solves.',
      proof: 'Applicant Credentials & Verifiable Track Record in the specific ecosystem.',
      value: 'Specification & Architecture: Precise technical roadmap and deliverables.',
      milestone: 'Escrowed Milestone Tranches: Funds released only upon onchain delivery.',
      cta: 'Forum feedback deadline and call for multisig signers.'
    },
    samplePitch: `## [RFC] Stylus Performance Profiler & Developer CLI Toolkit

### Summary
A developer toolkit written in Rust to automate benchmarking and contract size optimization for Arbitrum Stylus WASM deployments, lowering the barrier for 500+ ecosystem Rust builders.

### Motivation & Ecosystem Impact
Currently, developers building on Stylus must manually calculate WASM gas differentials against EVM opcodes. This lack of automated tooling creates friction and slows down migration from Ethereum L1.

### Detailed Deliverables & Milestones
- **Milestone 1 ($8,000 USDC)**: Working CLI published to crates.io supporting compile, simulate, and gas profiling on Arbitrum Sepolia.
- **Milestone 2 ($7,000 USDC)**: GitHub Action integration for automated CI checks on PRs + documentation portal with 5 runnable examples.
- **Milestone 3 ($3,000 USDC)**: Security review and 60-day maintenance SLA with monthly bugfix updates.

### Team & Previous Track Record
- Built the XYZ Indexer (github.com/handle/xyz-indexer, 400+ stars).
- Active contributor to Arbitrum Nitro dev chats (handle: @dev_eth).

### Requested Funding
Total Request: $18,000 USDC released in 3 tranches via Foundation Multisig upon verifiable GitHub release tags.`,
    tips: [
      'Always tranche payments! DAOs reject requests for 100% upfront capital 95% of the time.',
      'Engage with delegates on Discord or Telegram before posting to gauge sentiment.',
      'Link open-source repositories; DAOs almost never fund proprietary black-box code.'
    ]
  },
  {
    id: 'bounty-audit-hook',
    title: 'The Responsible Security / Bug Bounty Pitch',
    channel: 'Security Bounty Hook',
    bestFor: 'Immunefi, Code4rena, or private security audit bids with protocol leads.',
    idealLength: '180–250 words with reproducible PoC snippet',
    conversionRate: '65% Conversion to private paid audit retainers',
    structure: {
      hook: 'Responsible disclosure notice detailing exact affected contract and function.',
      proof: 'Minimal reproducible Foundry test demonstrating edge case.',
      value: 'Mitigation patch snippet and explanation of financial risk.',
      milestone: 'Fix verification and retainer proposal for ongoing review.',
      cta: 'Encrypted communication channel request (PGP or private TG).'
    },
    samplePitch: `Hey security team — while reviewing your liquidation trigger contract on commit 8b4f12, identified an edge case where extreme volatility with zero-liquidity oracles can cause stale price readings, locking liquidator collateral.

I wrote an isolated Foundry test ('test_StalePriceSlippageLock') reproducing this on a local fork without touching mainnet state:
[Private Gist link or encrypted patch]

Recommended fix is adding a heartbeat invariant check before executing the transfer.

Would love to share the full markdown report and assist with testing the patch. If you are preparing for your upcoming audit, I have capacity for a 2-week private audit starting next Monday. Let me know if you prefer to continue via PGP or private TG.`,
    tips: [
      'NEVER exploit the issue on a public testnet or mainnet; test strictly on an isolated local fork.',
      'Always follow protocol disclosure rules or Immunefi guidelines.',
      'Turn one valid vulnerability finding into a long-term retainership as their trusted security advisor.'
    ]
  },
  {
    id: 'farcaster-open-frame',
    title: 'The Speculative "Build First" Web3 Pitch',
    channel: 'Farcaster / X DM',
    bestFor: 'Creative frontend, design, and growth roles where visual evidence speaks louder than words.',
    idealLength: '80–120 words + live deployed URL / Frame',
    conversionRate: '54% Instant hire / grant allocation',
    structure: {
      hook: 'I built this for your community today because I loved your vision.',
      proof: 'Live interactive link (Vercel / IPFS / Farcaster frame).',
      value: 'How this increases their daily active users or user retention.',
      milestone: 'Offer to hand over keys or maintain it as a dedicated contributor.',
      cta: 'Free to hand over repo, or open to chatting about scaling it together.'
    },
    samplePitch: `Hey @team — loved the launch on Base yesterday!

Noticed users on Farcaster were asking for an easy way to check their wallet allocation without leaving their feed, so I built this live interactive Frame this afternoon:
frame.yourapp.xyz (open source at github.com/handle/base-alloc-frame)

It already handled 450+ checks in the last 2 hours. If you want, happy to transfer ownership to your official domain or maintain it for you alongside a custom dashboard. Drop me a DM if you'd like the repo transfer!`,
    tips: [
      'The highest-leverage pitch in Web3 is "I already built it, here is the link".',
      'Keep it open-source so the team sees your clean code structure immediately.',
      'Even if they do not hire you for that exact tool, founders remember builders who take spontaneous initiative.'
    ]
  }
];

export const PROTOCOL_NEEDS_INTEL: ProtocolNeedInsight[] = [
  {
    id: 'intel-smart-contracts',
    category: 'EVM & Smart Contract Engineering',
    demandLevel: 'Surging',
    avgRetainer: '$8,000 – $18,000 / month',
    avgHourly: '$110 – $220 / hr (USDC)',
    unspokenWishlist: [
      'Engineers who write their own Foundry invariant and fuzz tests without being asked.',
      'Deep fluency with gas optimization techniques: unchecked blocks, custom errors, storage packings, and transient storage (TSTORE/TLOAD).',
      'Knowledge of Uniswap v4 Hook lifecycles, ERC-4337 Account Abstraction paymasters, and ERC-7579 modular smart accounts.',
      'Ability to clearly document mathematical risk models and slippage bounds in Markdown.'
    ],
    dealBreakers: [
      'Using Hardhat with zero unit tests in 2026.',
      'Failing basic questions on reentrancy guards, read-only reentrancy, or oracle manipulation.',
      'Submitting resumes listing 20 blockchains without a single verifiable GitHub commit.'
    ],
    suggestedPoW: [
      'Build a Uniswap v4 hook that implements dynamic volatility fees or TWAP smoothing.',
      'Write an invariant test suite for an existing DeFi vault using Foundry / Echidna.',
      'Deploy an ERC-4337 custom paymaster contract with sponsored gas logic on Base or Arbitrum Sepolia.'
    ],
    hotSkills: ['Solidity 0.8.24+', 'Foundry', 'Uniswap v4 Hooks', 'ERC-4337', 'Slither', 'Yul basics'],
    keyProtocolsLooking: ['Uniswap v4 Ecosystem', 'Aave Grants', 'Arbitrum Stylus', 'Base Onchain Summer', 'EigenLayer AVS']
  },
  {
    id: 'intel-solana-high-throughput',
    category: 'Solana & Rust Execution Systems',
    demandLevel: 'Surging',
    avgRetainer: '$9,000 – $20,000 / month',
    avgHourly: '$120 – $240 / hr (USDC/SOL)',
    unspokenWishlist: [
      'Familiarity with Anchor framework 0.30+, state compression (Bubblegum), and token extensions (Token-2022).',
      'Experience optimizing compute units (CU) to prevent transaction drops during network congestion.',
      'Deep understanding of priority fee algorithms (Helius / Triton RPCs) and Jito MEV bundles.',
      'Handling transaction simulation errors and client-side retry logic gracefully.'
    ],
    dealBreakers: [
      'Assuming Solana works like EVM (treating PDAs like smart contract addresses without understanding seeds and bumps).',
      'Relying on public free RPC endpoints that rate-limit and crash during user demos.',
      'Writing Rust code that panics instead of returning custom ProgramErrors.'
    ],
    suggestedPoW: [
      'Create an Anchor program utilizing Token-2022 transfer hooks with unit tests using `solana-program-test`.',
      'Build a Telegram trading bot using `@solana/web3.js` v2 and fast Priority Fee estimation.',
      'Open-source an escrow program with state compression for micro-payments.'
    ],
    hotSkills: ['Rust', 'Anchor Framework', 'Token-2022', 'Solana Web3.js v2', 'Jito MEV', 'Helius RPC'],
    keyProtocolsLooking: ['Drift Protocol', 'Jupiter Exchange Grants', 'Solana Foundation', 'Kamino Finance', 'Orca']
  },
  {
    id: 'intel-frontend-dapps',
    category: 'Web3 Frontend & Mobile Touch DApps',
    demandLevel: 'High',
    avgRetainer: '$6,000 – $14,000 / month',
    avgHourly: '$85 – $160 / hr (USDC)',
    unspokenWishlist: [
      'Mastery of embedded onboarding: Privy, Dynamic, Turnkey, or Coinbase Smart Wallet (passkeys with zero seed phrase friction).',
      'Building responsive Telegram Mini Apps and Farcaster v2 frames with instant load times (<150ms).',
      'Polished transaction state management: optimistic UI updates, multi-step approvals, and gas estimation previews.',
      'Mobile-first responsive layouts that work flawlessly inside Metamask / Phantom in-app browsers.'
    ],
    dealBreakers: [
      'DApps that show an unhandled "Uncaught (in promise) User rejected transaction" red error in production console.',
      'Desktop-only designs that break on mobile screens or fail to close wallet modals.',
      'Using legacy web3.js v0.20 or deprecated Web3Modal v1.'
    ],
    suggestedPoW: [
      'Build a Telegram Mini App for onchain token swapping or portfolio tracking using Tailwind and Viem.',
      'Create a Farcaster v2 interactive Frame with onchain tipping or NFT minting.',
      'Design a 1-click checkout interface using Coinbase Smart Wallet with passkey authentication.'
    ],
    hotSkills: ['React / Next.js', 'Viem / Wagmi v2', 'Privy / Dynamic', 'Telegram Mini Apps', 'Tailwind CSS', 'TanStack Query'],
    keyProtocolsLooking: ['Base Ecosystem', 'FarCast Mini-Apps', 'Optimism Superchain', 'Berachain Hub', 'Monad Ecosystem']
  },
  {
    id: 'intel-security-audits',
    category: 'Smart Contract Security & Invariant Testing',
    demandLevel: 'Surging',
    avgRetainer: '$10,000 – $25,000 / month',
    avgHourly: '$150 – $350 / hr (USDC)',
    unspokenWishlist: [
      'Auditors who provide working Foundry tests reproducing the exact exploit rather than theoretical descriptions.',
      'Experience reviewing DeFi mechanics: flash loans, AMM math, oracle latency, and cross-chain bridge relays.',
      'Formal verification or automated testing tools: Certora, Echidna, Medusa, Halmos, Slither.',
      'Clear, professional markdown reporting that developers can immediately turn into GitHub pull requests.'
    ],
    dealBreakers: [
      'Copy-pasting Slither static analyzer output into a report and calling it an "audit".',
      'Marking code style preferences as "High Severity Vulnerabilities".',
      'Demanding full payment before verifying developer fixes.'
    ],
    suggestedPoW: [
      'Submit high-quality findings in public competitive audits on Code4rena, Sherlock, or Cantina.',
      'Publish a detailed post-mortem and PoC replication of a historical DeFi exploit (e.g. Euler, Curve pool reentrancy).',
      'Create an open-source invariant test suite for popular open-source protocols.'
    ],
    hotSkills: ['Foundry PoCs', 'Invariant Fuzzing', 'Slither & Aderyn', 'DeFi Attack Vectors', 'Certora', 'Yul Bytecode'],
    keyProtocolsLooking: ['Symbiotic', 'Curvance', 'Chainlink Labs', 'Code4rena Protocols', 'EigenLayer AVS Ecosystem']
  },
  {
    id: 'intel-growth-devrel',
    category: 'Technical DevRel & Ecosystem Growth',
    demandLevel: 'High',
    avgRetainer: '$5,000 – $12,000 / month',
    avgHourly: '$70 – $140 / hr (USDC)',
    unspokenWishlist: [
      'Contributors who can run code, spot outdated docs, and submit the fix PR before telling the team.',
      'Creating 3-minute video quickstarts on YouTube/X that devs actually enjoy watching.',
      'Hosting hands-on developer workshops on Discord or Twitter Spaces with real deployed contracts.',
      'Writing Dune Analytics SQL dashboards that track actual protocol metrics (active wallets, TVL, stickiness).'
    ],
    dealBreakers: [
      'Hype-only "crypto marketers" who only know how to run giveaway bots and spam Telegram channels.',
      'Writers who produce superficial summaries without testing the protocol API.',
      'Over-promising vanity followers instead of measurable developer onboarding.'
    ],
    suggestedPoW: [
      'Build an unofficial starter kit repo for a new testnet (e.g. Monad or Berachain) with 1-click deploy.',
      'Publish an interactive Dune dashboard breaking down protocol revenue and user retention.',
      'Write a 1,500-word tutorial explaining a complex Web3 concept simply with diagrams.'
    ],
    hotSkills: ['Dune Analytics', 'Technical Writing', 'Foundry Starter Kits', 'Telegram & Discord Dev Management', 'Loom Demos'],
    keyProtocolsLooking: ['Monad Foundation', 'Celestia Ecosystem', 'Arbitrum Grants', 'Berachain Hub', 'Sui Foundation']
  }
];

export const INITIAL_TRACKED_PITCHES: TrackedPitch[] = [
  {
    id: 'track-1',
    projectTitle: 'Uniswap v4 Dynamic Fee Hook',
    protocol: 'AuraFi Liquidity Labs',
    role: 'Smart Contracts',
    platform: 'Telegram',
    contactHandle: '@aurafi_eng',
    amount: '$14,000 USDC',
    status: 'In Discussion',
    notes: 'Shared gas benchmark gist. Founder replied asking about transient storage compatibility. Scheduled follow-up for tomorrow 4pm UTC.',
    lastUpdated: 'Today, 11:20 AM'
  },
  {
    id: 'track-2',
    projectTitle: 'Arbitrum Stylus Rust CLI Toolkit',
    protocol: 'Offchain Tooling Guild',
    role: 'Smart Contracts',
    platform: 'Forum',
    contactHandle: 'forum.arbitrum.foundation/t/stylus-bench-rfc',
    amount: '$18,000 USDC Grant',
    status: 'Sent',
    notes: 'Drafted 3-milestone RFC on the Arbitrum governance forum. Received 4 positive delegate likes. Waiting for Foundation grant committee review.',
    lastUpdated: 'Yesterday'
  },
  {
    id: 'track-3',
    projectTitle: 'Solana Telegram Mini-App',
    protocol: 'Drift Velocity',
    role: 'Frontend & DApps',
    platform: 'Telegram',
    contactHandle: '@drift_velocity_ops',
    amount: '$9,500 USDC',
    status: 'Draft',
    notes: 'Need to prepare 1-minute Loom video demo of the wallet adapter connection before sending DM.',
    lastUpdated: '2 days ago'
  }
];
