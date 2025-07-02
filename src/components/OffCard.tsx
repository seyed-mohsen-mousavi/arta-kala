"use client";

import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";

function OffCard({ item }: { item: ProductType }) {
  return (
    <div className="bg-white w-full h-full px-2 py-5 rounded-2xl flex flex-col gap-4 items-center group/item ">
      <Link href="/" className="block w-full relative  ">
        {" "}
        <div className="relative w-full h-full pt-[56%]">
          {item.images.map((image, index) => (
            <Image
              key={index}
              fill
              src={image}
              alt={item.name}
              className={`object-contain rounded-xl transition-opacity ease-in-out duration-300 ${
                index === 1
                  ? "visible opacity-100 group-hover/item:invisible group-hover/item:opacity-0"
                  : "invisible opacity-0 group-hover/item:visible group-hover/item:opacity-100"
              }`}
            />
          ))}
        </div>
      </Link>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center">
          <p className="line-clamp-1 text-[#444444] text-[10px]">{item.name}</p>
          {item.originalPrice && (
            <p className="line-through text-sm text-gray-400">
              {item.originalPrice.toLocaleString("fa-IR")} تومان
            </p>
          )}
          <p className={`text-lg ${item.originalPrice ? "text-red-500" : ""}`}>
            {item.currentPrice.toLocaleString("fa-IR")} تومان
          </p>
        </div>
        <button className="bg-red-600 text-white px-7 py-1.5 rounded-full border-2 border-red-700 hover:bg-red-700 transition-colors ease-in-out">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}

export default OffCard;
