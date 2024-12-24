import type { CollectionConfig } from 'payload';

const isClubAdminOrAdmin = (user) => {
  return user?.roles?.includes('club admin') || user?.roles?.includes('admin');
};

export const Teams: CollectionConfig = {
  slug: 'teams',
  labels: {
    singular: {
      en: 'Team',
      es: 'Equipo',
      fr: 'Équipe',
    },
    plural: {
      en: 'Teams',
      es: 'Equipos',
      fr: 'Équipes',
    },
  },
  admin: {
    useAsTitle: 'team_name',
    defaultColumns: ['team_name', 'country', 'founded_year', 'updatedAt'],
  },
  access: {
    create: () => true, // Only 'club admin' or 'admin' can create
    read: () => true, // Everyone can read
    update: ({ req: {user }}) => isClubAdminOrAdmin(user), // Only 'club admin' or 'admin' can update
    delete: ({req:{ user }}) => isClubAdminOrAdmin(user), // Only 'club admin' or 'admin' can delete
  },
  fields: [
    {
      name: 'team_name',
      type: 'text',
      required: true,
      label: 'Team Name',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      localized: true,
      label: 'Country',
    },
    {
      name: 'founded_year',
      type: 'number',
      required: true,
      label: 'Founded Year',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
    },
    {
      name: 'coach_name',
      type: 'text',
      label: 'Coach Name',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website',
      validate: (value) => {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6})(\/[\w.-]*)*\/?$/;
        if (value && !urlRegex.test(value)) {
          return 'Invalid URL';
        }
        return true;
      },
    },
    {
      name: 'trophy_photo',
      type: 'relationship',
      relationTo: 'media', // Assuming you have a media collection for uploading images
      label: 'Trophy Photo',
    },
    {
      name: 'user_id',
      type: 'relationship',
      relationTo: 'users', // Assuming you have a user collection
      label: 'Associated User',
    },
  ],
  timestamps: true, // Auto generates createdAt and updatedAt fields
};
