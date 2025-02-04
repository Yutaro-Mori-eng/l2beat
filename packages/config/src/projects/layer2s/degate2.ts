import {
  assert,
  EthereumAddress,
  ProjectId,
  UnixTime,
} from '@l2beat/shared-pure'
import { utils } from 'ethers'
import { Badge } from '../badges'

import {
  DA_BRIDGES,
  DA_LAYERS,
  DA_MODES,
  EXITS,
  FORCE_TRANSACTIONS,
  NEW_CRYPTOGRAPHY,
  OPERATOR,
  RISK_VIEW,
  STATE_CORRECTNESS,
  TECHNOLOGY_DATA_AVAILABILITY,
  addSentimentToDataAvailability,
} from '../../common'
import { ProjectDiscovery } from '../../discovery/ProjectDiscovery'
import type { Layer2 } from '../../types'
import { getStage } from './common/stages/getStage'

const discovery = new ProjectDiscovery('degate2')

const forcedWithdrawalDelay = discovery.getContractValue<{
  [key: string]: number
}>('ExchangeV3', 'getConstants').MAX_AGE_FORCED_REQUEST_UNTIL_WITHDRAW_MODE

const maxAgeDepositUntilWithdrawable = discovery.getContractValue<number>(
  'ExchangeV3',
  'getMaxAgeDepositUntilWithdrawable',
)

const forcedWithdrawalFee = discovery.getContractValue<number>(
  'LoopringV3',
  'forcedWithdrawalFee',
)

const maxForcedWithdrawalFee = discovery.getContractValue<{
  [key: string]: number
}>('ExchangeV3', 'getConstants').MAX_FORCED_WITHDRAWAL_FEE

const maxForcedWithdrawalFeeString = `${utils.formatEther(
  maxForcedWithdrawalFee,
)} ETH`

export const degate2: Layer2 = {
  isArchived: true,
  type: 'layer2',
  id: ProjectId('degate2'),
  capability: 'appchain',
  addedAt: new UnixTime(1684838286), // 2023-05-23T10:38:06Z
  badges: [
    Badge.VM.AppChain,
    Badge.DA.EthereumCalldata,
    Badge.Fork.LoopringFork,
  ],
  display: {
    name: 'DeGate V1 Legacy',
    slug: 'degate2',
    headerWarning: 'This project is in shutdown mode and no longer active.',
    description:
      'DeGate is an app-specific ZK Rollup that enables a trustless, fast and low-fee decentralized order book exchange, helping users to trade easy and sleep easy. DeGate smart contracts are forked from Loopring V3.',
    purposes: ['Exchange'],
    stack: 'Loopring',
    category: 'ZK Rollup',

    links: {
      websites: ['https://degate.com/'],
      apps: ['https://app.degate.com/'],
      documentation: ['https://docs.degate.com/'],
      repositories: ['https://github.com/degatedev/protocols'],
      socialMedia: [
        'https://twitter.com/DeGateDex',
        'https://discord.gg/degate',
        'https://youtube.com/@degatedex1718',
        'https://medium.com/degate',
        'https://mirror.xyz/0x078a601f492043C8e7D0E15B0F8815f58b4c342f',
      ],
    },
  },
  config: {
    associatedTokens: ['DG'],
    escrows: [
      discovery.getEscrowDetails({
        address: EthereumAddress('0xF13e21653AEB763595D5E4baA1dC115689Da49b9'),
        sinceTimestamp: new UnixTime(1693304807),
        tokens: '*',
      }),
    ],
    trackedTxs: [
      {
        uses: [
          { type: 'liveness', subtype: 'stateUpdates' },
          { type: 'l2costs', subtype: 'stateUpdates' },
        ],
        query: {
          formula: 'functionCall',
          address: EthereumAddress(
            '0x2CFd271e9b4d0344Fd2Aa0cb1ffd4f6b85c0B215',
          ),
          selector: '0x377bb770',
          functionSignature:
            'function submitBlocks(bool isDataCompressed,bytes data)',
          sinceTimestamp: new UnixTime(1693304819),
          untilTimestamp: new UnixTime(1699766508),
        },
      },
    ],
  },
  dataAvailability: addSentimentToDataAvailability({
    layers: [DA_LAYERS.ETH_CALLDATA],
    bridge: DA_BRIDGES.ENSHRINED,
    mode: DA_MODES.STATE_DIFFS,
  }),
  riskView: {
    stateValidation: RISK_VIEW.STATE_ZKP_SN,
    dataAvailability: RISK_VIEW.DATA_ON_CHAIN,
    exitWindow: RISK_VIEW.EXIT_WINDOW_NON_UPGRADABLE,
    sequencerFailure: RISK_VIEW.SEQUENCER_FORCE_VIA_L1_LOOPRING(
      forcedWithdrawalDelay,
      forcedWithdrawalFee,
      maxAgeDepositUntilWithdrawable,
    ),
    proposerFailure: RISK_VIEW.PROPOSER_USE_ESCAPE_HATCH_MP,
  },
  stage: getStage({
    stage0: {
      callsItselfRollup: true,
      stateRootsPostedToL1: true,
      dataAvailabilityOnL1: true,
      rollupNodeSourceAvailable: 'UnderReview',
    },
    stage1: {
      stateVerificationOnL1: true,
      fraudProofSystemAtLeast5Outsiders: null,
      usersHave7DaysToExit: null,
      usersCanExitWithoutCooperation: true,
      securityCouncilProperlySetUp: null,
    },
    stage2: {
      proofSystemOverriddenOnlyInCaseOfABug: null,
      fraudProofSystemIsPermissionless: null,
      delayWith30DExitWindow: [
        true,
        'Users have at least 30d to exit as the system cannot be upgraded.',
      ],
    },
  }),
  technology: {
    stateCorrectness: {
      ...STATE_CORRECTNESS.VALIDITY_PROOFS,
      references: [
        {
          title: 'Operator - DeGate design doc',
          url: 'https://github.com/degatedev/protocols/blob/degate_mainnet/DeGate%20Protocol%20Specification%20Document.md#operator',
        },
      ],
    },
    newCryptography: {
      ...NEW_CRYPTOGRAPHY.ZK_SNARKS,
      references: [
        {
          title: 'Operator - DeGate design doc',
          url: 'https://github.com/degatedev/protocols/blob/degate_mainnet/DeGate%20Protocol%20Specification%20Document.md#operator',
        },
      ],
    },
    dataAvailability: {
      ...TECHNOLOGY_DATA_AVAILABILITY.ON_CHAIN_CALLDATA,
      references: [
        {
          title: 'Introduction - DeGate design doc',
          url: 'https://github.com/degatedev/protocols/blob/degate_mainnet/DeGate%20Protocol%20Specification%20Document.md#design-features',
        },
      ],
    },
    operator: {
      ...OPERATOR.CENTRALIZED_OPERATOR,
      references: [
        {
          title: 'ExchangeV3.sol#L341-L348 - DeGate source code',
          url: 'https://etherscan.io/address/0x9C8f884B15a1fcd5B4bcEb8647DC2D15165906c7#code#F1#L341',
        },
        {
          title: 'LoopringIOExchangeOwner.sol#L98-L101 - DeGate source code',
          url: 'https://etherscan.io/address/0x2CFd271e9b4d0344Fd2Aa0cb1ffd4f6b85c0B215#code#F1#L98',
        },
      ],
    },
    forceTransactions: {
      ...FORCE_TRANSACTIONS.WITHDRAW_OR_HALT(),
      references: [
        {
          title: 'Forced Withdrawals - DeGate design doc',
          url: 'https://github.com/degatedev/protocols/blob/degate_mainnet/Smart%20Contract%20Design.md#force-withdrawal',
        },
      ],
    },
    exitMechanisms: [
      {
        ...EXITS.REGULAR_WITHDRAWAL('zk'),
        references: [
          {
            title: 'Withdraw - DeGate design doc',
            url: 'https://github.com/degatedev/protocols/blob/degate_mainnet/Smart%20Contract%20Design.md#normal-withdrawal',
          },
        ],
      },
      {
        ...EXITS.FORCED_WITHDRAWAL(),
        references: [
          {
            title: 'Forced Request Handling - DeGate design doc',
            url: 'https://github.com/degatedev/protocols/blob/degate_mainnet/Smart%20Contract%20Design.md#force-withdrawal',
          },
          {
            title:
              'ExchangeV3.sol#L392 - DeGate source code, forceWithdraw function',
            url: 'https://etherscan.io/address/0x9C8f884B15a1fcd5B4bcEb8647DC2D15165906c7#code#F1#L392',
          },
        ],
      },
      {
        ...EXITS.EMERGENCY(
          'Withdrawal Mode',
          'merkle proof',
          forcedWithdrawalDelay,
        ),
        references: [
          {
            title: 'Forced Request Handling - DeGate design doc',
            url: 'https://github.com/degatedev/protocols/blob/degate_mainnet/Smart%20Contract%20Design.md#exodus-mode',
          },

          {
            title:
              'ExchangeV3.sol#L420 - DeGate source code, withdrawFromMerkleTree function',
            url: 'https://etherscan.io/address/0x9C8f884B15a1fcd5B4bcEb8647DC2D15165906c7#code#F1#L420',
          },
        ],
      },
    ],
  },
  permissions: {
    [discovery.chain]: {
      actors: [
        {
          name: 'DefaultDepositContract Owner',
          accounts: (() => {
            const owner1 = discovery.getAddressFromValue(
              'DefaultDepositContract',
              'owner',
            )
            const owner2 = discovery.getAddressFromValue(
              'LoopringIOExchangeOwner',
              'owner',
            )
            const owner3 = discovery.getAddressFromValue('LoopringV3', 'owner')

            // making sure that the description is correct
            assert(owner1 === owner2 && owner2 === owner3 && owner3, 'DeGate')

            const permissionedAccount =
              discovery.formatPermissionedAccount(owner1)

            // if it was updated, we should add multisig participants
            assert(permissionedAccount.type === 'EOA', 'DeGate')

            return [permissionedAccount]
          })(),
          description: `This address is the owner of the following contracts: LoopringIOExchangeOwner, LoopringV3, DefaultDepositContract. Can add or remove block submitters. Can change the forced withdrawal fee up to ${maxForcedWithdrawalFeeString}. Can change a way that balance is calculated per contract during the deposit, allowing the support of non-standard tokens.`,
        },
        {
          name: 'BlockVerifier Owner',
          description:
            'This address is the owner of the BlockVerifier contract.',
          accounts: discovery.getPermissionedAccounts('BlockVerifier', 'owner'),
        },
        {
          name: 'Block Submitters',
          accounts: discovery.getPermissionedAccounts(
            'LoopringIOExchangeOwner',
            'blockSubmitters',
          ),
          description:
            'Actors who can submit new blocks, updating the L2 state on L1.',
        },
      ],
    },
  },
  contracts: {
    addresses: {
      [discovery.chain]: [
        discovery.getContractDetails('ExchangeV3', 'Main ExchangeV3 contract.'),
        discovery.getContractDetails(
          'LoopringIOExchangeOwner',
          'Contract used by the Prover to submit exchange blocks with zkSNARK proofs that are later processed and verified by the BlockVerifier contract.',
        ),
        discovery.getContractDetails(
          'DefaultDepositContract',
          'ERC 20 token basic deposit contract. Handles user deposits and withdrawals.',
        ),
        discovery.getContractDetails(
          'LoopringV3',
          'Contract for setting exchange fee parameters.',
        ),
        discovery.getContractDetails(
          'BlockVerifier',
          'zkSNARK Verifier based on ethsnarks library.',
        ),
      ],
    },
    risks: [],
  },
  milestones: [
    {
      title: 'DeGate Redeploy',
      url: 'https://medium.com/degate/degate-mainnet-beta-redeployment-update-a0f1a6b7350c',
      date: '2023-09-14T00:00:00Z',
      description: 'DeGate redeploys the contracts to fix a bug.',
      type: 'general',
    },
  ],
}
