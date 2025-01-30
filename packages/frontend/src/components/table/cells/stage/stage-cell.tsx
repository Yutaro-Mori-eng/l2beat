import { type StageConfig } from '@l2beat/config'

import {
  StageBadge,
  getStageTextClassname,
} from '~/components/badge/stage-badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/core/tooltip/tooltip'
import { useIsMobile } from '~/hooks/use-breakpoint'
import { CircleQuestionMarkIcon } from '~/icons/circle-question-mark'
import { cn } from '~/utils/cn'
import { StageTooltip } from './stage-tooltip'

export interface StageCellProps {
  stageConfig: StageConfig
  isAppchain: boolean
}

export function StageCell({ stageConfig, isAppchain }: StageCellProps) {
  const isMobile = useIsMobile()

  if (stageConfig.stage === 'NotApplicable' || isMobile) {
    return (
      <StageBadge
        stage={stageConfig.stage}
        isAppchain={isAppchain}
        className="pb-[5px] pt-2"
      />
    )
  }
  const hasNotice =
    stageConfig.stage !== 'UnderReview' &&
    !!stageConfig.additionalConsiderations
  return (
    <Tooltip>
      <TooltipTrigger className="flex gap-1">
        <StageBadge stage={stageConfig.stage} isAppchain={isAppchain} />
        {hasNotice && (
          <CircleQuestionMarkIcon
            className={cn(
              'mt-px size-5 fill-current',
              getStageTextClassname(stageConfig.stage),
            )}
          />
        )}
      </TooltipTrigger>
      <TooltipContent className="max-w-[360px]">
        <StageTooltip stageConfig={stageConfig} isAppchain={isAppchain} />
      </TooltipContent>
    </Tooltip>
  )
}
