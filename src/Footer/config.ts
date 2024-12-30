import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      labels: {
        singular:{
          en: 'Nav Item',
          fr: 'Élément de navigation',
          es: 'Elemento de navegación',
        },
        plural: {
          en: 'Nav Items',
          fr: 'Éléments de navigation',
          es: 'Elementos de navegación',
        },
      },
      localized: true,
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
