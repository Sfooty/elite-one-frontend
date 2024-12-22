import {getPayload} from "payload";
import configPromise from "@payload-config";
import {FeaturedPostCard} from "src/components/FeaturedPostCard";


export const FeaturedPostBlock: React.FC = async ({}) => {
  const payload = await getPayload({config: configPromise})
  const post = await payload.find({
    collection: 'posts',
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 1,
  })
  return (
    <FeaturedPostCard post={post}/>
  )
}
