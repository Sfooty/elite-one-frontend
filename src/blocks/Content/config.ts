import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import {Standings} from "@/blocks/Standings/config";
import {FeaturedPostBlock} from "@/blocks/FeaturedPostBlock/config";
import {MediaBlock} from "@/blocks/MediaBlock/config";
import {Archive} from "@/blocks/ArchiveBlock/config";
import {CallToAction} from "@/blocks/CallToAction/config";

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'One Quarter',
        value: 'oneQuarter',
      },
      {
        label: 'Three Quarters',
        value: 'threeQuarters',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'block',
    type: 'blocks',
    blocks: [Standings, FeaturedPostBlock, MediaBlock, Archive, CallToAction],
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name:'paddingTop',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
  ],
}
