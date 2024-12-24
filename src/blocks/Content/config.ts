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
    label: {
        en: 'Size',
        es: 'Tamaño',
        fr: 'Taille',
    },
    type: 'select',
    options: [
      {
        label: {
          en: 'One Third',
          fr: 'Un tiers',
          es: 'Un tercio',
        },
        value: 'oneThird',
      },
      {
        label:{
          en: 'Two Thirds',
          fr: 'Deux tiers',
          es: 'Dos tercios',
        },
        value: 'twoThirds',
      },
      {
        label: {
          en: 'One Quarter',
          fr: 'Un quart',
          es: 'Un cuarto',
        },
        value: 'oneQuarter',
      },
      {
        label: {
          en: 'Three Quarters',
          fr: 'Trois quarts',
          es: 'Tres cuartos',
        },
        value: 'threeQuarters',
      },
      {
        label:{
          en: 'Half',
          fr: 'Moitié',
          es: 'Mitad',
        },
        value: 'half',
      },
      {
        label: {
          en: 'Full',
          fr: 'Plein',
          es: 'Completo',
        },
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    localized: true,
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
    label: {
      en: 'Block',
      es: 'Bloque',
      fr: 'Bloc',
    },
    type: 'blocks',
    blocks: [Standings, FeaturedPostBlock, MediaBlock, Archive, CallToAction],
  },
  {
    name: 'enableLink',
    label: {
      en: 'Enable Link',
      es: 'Habilitar enlace',
      fr: 'Activer le lien',
    },
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
  labels: {
    singular: {
      en: 'Content',
      es: 'Contenido',
      fr: 'Contenu',
    },
    plural: {
      en: 'Content',
      es: 'Contenido',
      fr: 'Contenu',
    },
  },
  interfaceName: 'ContentBlock',
  fields: [
    {
      name:'paddingTop',
      label: {
        en: 'Padding Top',
        es: 'Relleno superior',
        fr: 'Rembourrage supérieur',
      },
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'columns',
      label: {
        en: 'Columns',
        es: 'Columnas',
        fr: 'Colonnes',
      },
      type: 'array',
      fields: columnFields,
    },
  ],
}
