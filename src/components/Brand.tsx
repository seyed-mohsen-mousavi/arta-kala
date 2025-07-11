"use client";

import Image from "next/image";
import Link from "next/link";

export default function Brand({ item }: { item: any }) {
  return (
    <Link href={item?.link} className="size-full">
      <Image
        className="h-full block mx-auto object-contain w-full max-h-32"
        width={150}
        src={item.image}
        alt={item.name}
        title={item.name}
        height={150}
        loading="lazy"
        fetchPriority="low"
      />
    </Link>
  );
}
