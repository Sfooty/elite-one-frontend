import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { getServerSideURL } from '@/utilities/getURL'
import { FieldHook, ValidationError } from 'payload';


// Hook to ensure only one featured post
const restrictSingleFeaturedPost: FieldHook = async ({ value, originalDoc, req }) => {
  if (value === true) { // Check if the current post is being marked as featured
    const { payload } = req;
    const existingFeaturedPost = await payload.find({
      collection: 'posts',
      where: {
        featured: {
          equals: true,
        },
      },
      limit: 1,
    });

    const currentPostId = originalDoc?.id;

    if (
      existingFeaturedPost.docs.length > 0 &&
      existingFeaturedPost.docs[0].id !== currentPostId
    ) {
      await payload.update({
        collection: 'posts',
        id: existingFeaturedPost.docs[0].id,
        data: {
          featured: false,
        },
      });
    }
  }
  return value;
};

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  labels: {
    singular: {
      en: 'Post',
      fr: 'Article',
      es: 'Artículo',
    },
    plural: {
      en: 'Posts',
      fr: 'Articles',
      es: 'Artículos',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'featured', 'updatedAt'],
    livePreview: {
      url: ({ data, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          locale: locale.code,
        });

        return `${getServerSideURL()}${path}`;
      },
    },
    preview: (data, {locale}) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        locale,
      });

      return `${getServerSideURL()}${path}`;
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label : {
          en: 'Title',
          fr: 'Titre',
          es: 'Título',
      }
    },
    {
      name: 'featured',
      type: 'checkbox',
      admin: {
        description: {
          en: 'Mark this post as featured.',
          fr: 'Marquez cet article comme en vedette.',
          es: 'Marcar este artículo como destacado.',
        },
        position: 'sidebar',
      },
      label: {
        en: 'Featured',
        fr: 'En vedette',
        es: 'Destacado',
      },
      hooks: {
        beforeChange: [restrictSingleFeaturedPost],
      },
      defaultValue: false,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: {
            en: 'Content',
            fr: 'Contenu',
            es: 'Contenido',
          },
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              label:{
                en: 'Categories',
                fr: 'Catégories',
                es: 'Categorías',
              },
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
          ],
          label: {
            en: 'Meta',
            fr: 'Méta',
            es: 'Meta',
          },
        },
        {
          name: 'meta',
          label: {
            en: 'SEO',
            fr: 'SEO',
            es: 'SEO',
          },
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: {
        en: 'Publish Date',
        fr: 'Date de Publication',
        es: 'Fecha de Publicación',
      },
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'authors',
      label: {
        en: 'Authors',
        fr: 'Auteurs',
        es: 'Autores',
      },
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
};
