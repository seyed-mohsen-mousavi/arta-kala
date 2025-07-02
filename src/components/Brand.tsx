"use client";

import Image from "next/image";
import Link from "next/link";

export default function Brand({ item }: { item: any }) {
  return (
    <Link href={item?.link}>
      <Image
        className="h-32 block mx-auto object-contain w-full"
        width={200}
        src={item.image}
        alt={item.name}
        title={item.name}
        height={200}
      />
    </Link>
  );
}
