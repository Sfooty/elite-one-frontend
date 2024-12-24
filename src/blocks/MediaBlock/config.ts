import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular:{
      en: 'Media Block',
      es: 'Bloque de medios',
      fr: 'Bloc média',
    },
    plural: {
      en: 'Media Blocks',
      es: 'Bloques de medios',
      fr: 'Blocs média',
    },
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
