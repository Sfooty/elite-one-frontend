import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  labels: {
    singular: {
      en: 'Form Block',
      es: 'Bloque de formulario',
      fr: 'Bloc de formulaire',
    },
    plural: {
      en: 'Form Blocks',
      es: 'Bloques de formulario',
      fr: 'Blocs de formulaire',
    },
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label:{
        en: 'Enable Intro Content',
        es: 'Habilitar contenido introductorio',
        fr: 'Activer le contenu introductif',
      },
    },
    {
      name: 'introContent',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label:{
        en: 'Intro Content',
        es: 'Contenido introductorio',
        fr: 'Contenu introductif',
      },
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
}
