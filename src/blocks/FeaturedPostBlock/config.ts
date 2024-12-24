import {Block} from "payload";

export const FeaturedPostBlock: Block = {
  slug: 'featuredPostBlock',
  interfaceName: 'FeaturedPostBlock',
  labels: {
    singular:{
      en: 'Featured Post',
      es: 'Publicación destacada',
      fr: 'Article en vedette',
    },
    plural:{
      en: 'Featured Posts',
      es: 'Publicaciones destacadas',
      fr: 'Articles en vedette',
    },
  },
  fields: [],
}
