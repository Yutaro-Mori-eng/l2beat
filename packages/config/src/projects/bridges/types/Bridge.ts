import { ProjectId, UnixTime } from '@l2beat/shared-pure'

import {
  KnowledgeNugget,
  Milestone,
  ScalingProjectContracts,
  ScalingProjectEscrow,
  ScalingProjectLinks,
  ScalingProjectPermission,
  ScalingProjectRiskViewEntry,
  ScalingProjectTechnologyChoice,
} from '../../../common'

export interface Bridge {
  type: 'bridge'
  id: ProjectId
  /** Date of creation of the file (not the project) */
  createdAt: UnixTime
  isArchived?: boolean
  isUpcoming?: boolean
  isUnderReview?: boolean
  display: BridgeDisplay
  config: BridgeConfig
  riskView: BridgeRiskView
  technology: BridgeTechnology
  contracts?: ScalingProjectContracts
  permissions?: ScalingProjectPermission[] | 'UnderReview'
  nativePermissions?: Record<string, ScalingProjectPermission[]> | 'UnderReview'
  milestones?: Milestone[]
  knowledgeNuggets?: KnowledgeNugget[]
}

export interface BridgeDisplay {
  name: string
  shortName?: string
  slug: string
  warning?: string
  description: string
  detailedDescription?: string
  category: 'Token Bridge' | 'Liquidity Network' | 'Hybrid'
  links: Partial<ScalingProjectLinks>
  architectureImage?: string
}

export interface BridgeConfig {
  associatedTokens?: string[]
  escrows: ScalingProjectEscrow[]
}

export interface BridgeRiskView {
  validatedBy: ScalingProjectRiskViewEntry
  sourceUpgradeability?: ScalingProjectRiskViewEntry
  destinationToken?: ScalingProjectRiskViewEntry
}

export interface BridgeTechnology {
  canonical?: boolean
  destination: string[]
  principleOfOperation?: ScalingProjectTechnologyChoice
  validation?: ScalingProjectTechnologyChoice
  destinationToken?: ScalingProjectTechnologyChoice
  isUnderReview?: boolean
}
