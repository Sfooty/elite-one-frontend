"use client";

import {PaginatedDocs} from "payload";
import {Post} from "@/payload-types";
import Link from "next/link";
import useClickableCard from "@/utilities/useClickableCard";
import {Media} from "@/components/Media";


type Props = {
  post: PaginatedDocs<Post>
}

export const FeaturedPostCard: React.FC<Props> = ({post}) => {
  const {card, link} = useClickableCard({})
  const fetchedPost = post?.docs[0];
  const {slug, publishedAt, featured, meta} = fetchedPost;
  const {description, image: metaImage} = meta || {}
  const href = `/posts/${slug}`;
  return (

    <article className="max-w-full mx-auto" ref={card.ref}>
      <div  className="group relative cursor-pointer w-[855px] h-[500px] rounded-lg overflow-hidden shadow-[inset_0px_-100px_87px_-14px_rgba(0,0,0,0.1)]">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' &&
            <Media
              imgClassName={"object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-110"}
              resource={metaImage} />
        }
        <div className="absolute bottom-0 left-0 right-0 p-4  {/*bg-gradient-to-t from-black opacity-80*/}">
          <Link className="not-prose" href={href} ref={link.ref}><h2
            className="text-white text-[4rem] leading-[5rem]">{fetchedPost.title}</h2></Link>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-10 bg-black bg-opacity-20 shadow-inner transition-shadow duration-1000 group-hover:shadow-sm rounded-b-lg"></div>
      </div>
    </article>
  )
}
