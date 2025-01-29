import { EthereumAddress, ProjectId, UnixTime } from '@l2beat/shared-pure'

import { ProjectDiscovery } from '../../discovery/ProjectDiscovery'
import type { Bridge } from '../../types'
import { RISK_VIEW } from './common'

const discovery = new ProjectDiscovery('orbiter')

export const orbiter: Bridge = {
  type: 'bridge',
  id: ProjectId('orbiter'),
  addedAt: new UnixTime(1662628329), // 2022-09-08T09:12:09Z
  display: {
    name: 'Orbiter',
    slug: 'orbiter',
    category: 'Liquidity Network',
    links: {
      websites: ['https://orbiter.finance/'],
      documentation: ['https://docs.orbiter.finance/'],
      repositories: ['https://github.com/Orbiter-Finance'],
      socialMedia: [
        'https://twitter.com/Orbiter_Finance',
        'https://orbiter-finance.medium.com/',
        'https://discord.gg/hJJvXP7C73',
        'https://reddit.com/r/OrbiterFinance/',
        'https://youtube.com/channel/UC8oEJxM3_4IAYtEeAzR2bog',
      ],
    },
    description:
      'Orbiter Bridge is a cross-rollup bridge that uses liquidity provided by Makers on supported chains to perform swaps.',
  },
  config: {
    // In Orbiter the escrows are EOAs
    // You can find the list here:
    // https://github.com/Orbiter-Finance/orbiter-sdk/blob/main/src/bridge/maker_list.mainnet.ts
    escrows: [
      {
        address: EthereumAddress('0x80C67432656d59144cEFf962E8fAF8926599bCF8'),
        sinceTimestamp: new UnixTime(1649170157),
        tokens: ['ETH'],
        chain: 'ethereum',
      },
      {
        address: EthereumAddress('0x41d3D33156aE7c62c094AAe2995003aE63f587B3'),
        sinceTimestamp: new UnixTime(1635067681),
        tokens: ['USDC'],
        chain: 'ethereum',
      },
      {
        address: EthereumAddress('0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC'),
        sinceTimestamp: new UnixTime(1654853887),
        tokens: ['USDT'],
        chain: 'ethereum',
      },
      {
        address: EthereumAddress('0x095D2918B03b2e86D68551DCF11302121fb626c9'),
        sinceTimestamp: new UnixTime(1666335431),
        tokens: ['DAI'],
        chain: 'ethereum',
      },
    ],
  },
  technology: {
    destination: [
      'ZKsync',
      'Polygon',
      'Arbitrum',
      'Arbitrum Nova',
      'Loopring',
      'Optimism',
      'ZKSpace',
      'Immutable X',
      'Metis',
      'dYdX',
      'Boba',
      'Starknet',
      'BNB Chain',
    ],
    principleOfOperation: {
      name: 'Principle of Operation',
      description:
        "Orbiter Bridge is a cross-rollup bridge that uses liquidity provided by Makers to perform swaps. Makers provide liquidity to their own accounts (EOAs) on supported chains. A user performing a swap deposits tokens to Maker's EOA on source chain and that Maker is supposed to release corresponding tokens from their EOA on the destination chain. Currently only Orbiter team is acting as Makers.",
      references: [
        {
          title: 'Documentation - Maker System',
          url: 'https://docs.orbiter.finance/makersystem',
        },
        {
          title: 'Documentation - Technology',
          url: 'https://docs.orbiter.finance/technology',
        },
      ],
      risks: [],
    },
    validation: {
      name: 'Validation',
      description:
        "Even though the Orbiter team has plans to deploy a set of contracts that will i.e. require independent makers to post bonds as safeguard against not meeting their obligations, currently the system relies on trust that Orbiter Makers will disburse required tokens on the destination chain after seeing user's deposit on the source chain.",
      references: [
        {
          title: 'Documentation - Maker System',
          url: 'https://docs.orbiter.finance/makersystem',
        },
      ],
      risks: [
        {
          category: 'Funds can be stolen if',
          text: "selected Maker decides to misuse user's funds.",
        },
        {
          category: 'Funds can be frozen if',
          text: "selected Maker doesn't act on user deposit.",
        },
        {
          category: 'Users can be censored if',
          text: "selected Maker doesn't act on user deposit.",
        },
      ],
    },
  },
  riskView: {
    validatedBy: {
      value: 'Third Party',
      description: 'Withdrawals are validated by EOA.',
      sentiment: 'bad',
    },
    sourceUpgradeability: RISK_VIEW.UPGRADABLE_NO,
    destinationToken: RISK_VIEW.CANONICAL,
  },
  contracts: {
    // For contracts, see:
    // https://github.com/Orbiter-Finance/orbiter-sdk/blob/main/src/config/contracts.ts
    addresses: [
      discovery.getContractDetails(
        'OBSource',
        "Proxies transfers into Makers' accounts (when using custom frontend via SDK).",
      ),
    ],
    risks: [],
  },
  permissions: [
    {
      accounts: [
        {
          address: EthereumAddress(
            '0x80C67432656d59144cEFf962E8fAF8926599bCF8',
          ),
          type: 'EOA',
        },
      ],
      name: 'ETH escrow',
      description: 'Maker account for ETH deposits/withdrawals',
    },
    {
      accounts: [
        {
          address: EthereumAddress(
            '0x41d3D33156aE7c62c094AAe2995003aE63f587B3',
          ),
          type: 'EOA',
        },
      ],
      name: 'USDC escrow',
      description: 'Maker account for USDC deposits/withdrawals',
    },
    {
      accounts: [
        {
          address: EthereumAddress(
            '0xd7Aa9ba6cAAC7b0436c91396f22ca5a7F31664fC',
          ),
          type: 'EOA',
        },
      ],
      name: 'USDT escrow',
      description: 'Maker account for USDT deposits/withdrawals',
    },
    {
      accounts: [
        {
          address: EthereumAddress(
            '0x095D2918B03b2e86D68551DCF11302121fb626c9',
          ),
          type: 'EOA',
        },
      ],
      name: 'DAI escrow',
      description: 'Maker account for DAI deposits/withdrawals',
    },
  ],
}
