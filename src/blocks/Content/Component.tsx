import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import {RenderBlocks} from "@/blocks/RenderBlocks";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, paddingTop } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    oneQuarter: '3',
    twoThirds: '8',
    threeQuarters: '9',
  }

  return (
    <div className={`${paddingTop ? "mt-16" : "" } container mb-16`}>
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 {/*gap-x-4*/}">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, block } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && <RichText content={richText} enableGutter={false} />}
                {block && RenderBlocks({ blocks: block })}
                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
