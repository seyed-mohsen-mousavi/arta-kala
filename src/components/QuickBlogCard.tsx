"use client";

import Article from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

function QuickBlogCard({ item }: { item: Article }) {
  return (
    <article className="relative w-full">
      <Link
        href={`/article/${item.slug}`}
        className="block relative w-full h-96 overflow-hidden rounded-sm"
      >
        <Image
          width={100}
          height={100}
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_BACK_END}${item.thumbnail}`}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="w-full bg-white/80 text-gray-800 absolute z-10 bottom-0 py-2 px-3 text-lg font-semibold">
          {item.title}
        </div>
      </Link>
    </article>
  );
}

export default QuickBlogCard;
