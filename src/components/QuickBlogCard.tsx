"use client";

import Image from "next/image";

function QuickBlogCard({ item }: { item: { image: string; title: string } }) {
  return (
    <div className="relative size-full">
      <Image
        width={100}
        height={100}
        loading="lazy"
        src={item.image}
        alt={item.title}
        className="size-full object-cover"
      />
      <div className="w-full bg-white/80 text-gray-800 absolute z-10 bottom-0 py-2">{item.title}</div>
    </div>
  );
}

export default QuickBlogCard;
