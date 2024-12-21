import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { StandingsBlock } from '@/blocks/Standings/Component'
import {FeaturedPostBlock} from "@/blocks/FeaturedPostBlock/Component";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  standingsBlock: StandingsBlock,
  featuredPostBlock: FeaturedPostBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  paddingTop?: boolean
}> = (props) => {
  const { blocks, paddingTop } = props
  if (paddingTop === undefined) {
    props.paddingTop = true
  }
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={`${paddingTop ? "mt-16" : ""} mb-16`} key={index}>
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
