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

  let date = new Date();
  let options: Intl.DateTimeFormatOptions | undefined;
  if (fetchedPost?.publishedAt){
    date = new Date(fetchedPost.publishedAt)
    options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
  }
  return (
    <div className="container">
      <article className="max-w-full mx-auto" ref={card.ref}>
        <div  className="
          before:bg-gradient-to-t
          before:h-full
          before:z-10
          before:block
          before: top-0
          before:absolute
          hover:before:bg-none
          group relative
          cursor-pointer md:h-[500px]
          rounded-lg
          overflow-hidden
          before:w-full
          before:from-neutral-900
          before:from-10%
          before:transform
          before:transition-transform
          before:duration-1000"
        >
          {!metaImage && <div className="">No image</div>}
          {metaImage && typeof metaImage !== 'string' &&
              <Media
                className={"h-full duration-[2000ms]"}
                imgClassName={"w-full h-full transform transition-transform duration-[2000ms] group-hover:scale-110"}
                resource={metaImage} alt={fetchedPost?.meta?.description || "Featured post image"} />
          }
          <div className="absolute bottom-5 left-0 right-0 p-4 flex flex-col gap-4 z-20">
            <Link className="not-prose" href={href} ref={link.ref}><h2
              className="text-white text-[3rem] leading-[4rem]">{fetchedPost.title}</h2></Link>
            <div className={"flex flex-row gap-4"}>
              <span className={"bg-accent inline-block text-center py-1 px-3"}>FEATURE</span>
              <time className={"text-white inline-block py-1 px-3"}>{date.toLocaleString("fr-FR", options)}</time>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
