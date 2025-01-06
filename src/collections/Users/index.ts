import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      es: 'Usuario',
      fr: 'Utilisateur',
    },
    plural: {
      en: 'Users',
      es: 'Usuarios',
      fr: 'Utilisateurs',
    },
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'first name',
  },
  auth: true,
  fields: [
    {
      name: 'first name',
      type: 'text',
    },
    {
      name: 'last name',
      type: 'text',
    },
  ],
  timestamps: true,
}
