import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Post } from '@/payload-types'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[],
  size?: 'M' | 'L',
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, size } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className={`grid grid-cols-4 sm:grid-cols-8 ${size == "L" ? "lg:grid-cols-16": ""}  gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8`}>
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
