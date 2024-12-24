import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const Standings: Block = {
  slug: 'standingsBlock',
  interfaceName: 'StandingsBlock',
  fields: [
    {
      name: 'size',
      type: 'select',
      options:[
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
      ]
    }
  ],
  labels: {
    plural:{
      en: 'Standings',
      es: 'Clasificación',
      fr: 'Classements',
    },
    singular:{
      en: 'Standing',
      es: 'Clasificación',
      fr: 'Classement',
    },
  },
}
