"use client";

import Article from "@/types/blog";
import Image from "next/image";

function QuickBlogCard({ item }: { item: Article }) {
  console.log(item)
  return (
    <article className="relative size-full">
      <Image
        width={100}
        height={100}
        loading="lazy"
        src={`${process.env.NEXT_PUBLIC_BACK_END}${item.thumbnail}`}
        alt={item.title}
        className="size-full object-cover"
      />
      <div className="w-full bg-white/80 text-gray-800 absolute z-10 bottom-0 py-2">
        {item.title}
      </div>
    </article>
  );
}

export default QuickBlogCard;
