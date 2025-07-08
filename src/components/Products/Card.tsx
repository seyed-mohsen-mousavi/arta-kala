"use client";
import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import { CiImageOff } from "react-icons/ci";

function Card({ item }: { item: ProductType }) {
  // const discountPercent =
  //   ((item.originalPrice - item.currentPrice) / item.originalPrice) *
  //   100;
  return (
    <Link
      href={`/product/${item.slug}`}
      key={item.id}
      title={item.name}
      className="size-full flex"
    >
      <div className="bg-white shadow rounded-lg p-3.5 sm:p-5 hover:shadow-lg transition-shadow group/card w-full h-full flex flex-col">
        <div className="relative">
          {item.cover_image ? (
            <Image
              width={500}
              height={500}
              src={item.cover_image}
              alt={item.name}
              className="w-full h-56 object-cover rounded-t-lg"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            />
          ) : (
            <div className="w-full h-56 bg-zinc-200 rounded-md flex items-center justify-center">
              <CiImageOff className="size-15" />
            </div>
          )}
        </div>
        <h3 className="font-semibold mt-2 mb-10 text-zinc-700 line-clamp-2">
          {item.name}
        </h3>
        {item.is_available ? (
          <div className="relative mt-auto pt-3">
            {/* دکمه افزودن به سبد خرید */}
            <button className="absolute bottom-0 right-0 group-hover/card:bg-danger group-hover/card:text-white text-zinc-400 rounded-full p-2.5 hover:bg-red-600 flex items-center gap-2 transition-colors duration-300 ease-in-out overflow-hidden">
              <BsCart3 className="w-5 h-5" />
              <p className="text-[10px] xl:text-xs font-semibold whitespace-nowrap max-w-0 opacity-0 group-hover/card:max-w-[120px] group-hover/card:opacity-100 transition-[max-width,opacity] duration-300 ease-in-out overflow-hidden">
                افزودن به سبد خرید
              </p>
            </button>

            {/* قیمت */}
            <div className="flex justify-end">
              <div className="flex flex-col items-end">
                <p className="font-bold">
                  <span className="text-xl">
                    {item.price.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-sm"> تومان</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          // حالت ناموجود بدون تغییر
          <div className="w-full pt-[7.5px] pb-[7.5px]">
            <div className="inline-flex items-center justify-center w-full relative text-zinc-400">
              <hr className="w-full h-px my-0 bg-zinc-400 border-0 rounded-sm" />
              <p className="absolute px-2 pb-0.5 -translate-x-1/2 bg-white left-1/2 text-ellipsis text-nowrap whitespace-nowrap font-semibold">
                در حال حاضر موجود نیست
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Card;
{
  /* {item.isAmazing && (
          <span className="absolute top-2 left-2 bg-danger px-2 py-1  rounded-sm text-white text-sm">
            {Math.round(discountPercent)}% جشنواره
          </span>
        )} */
}
{
  /* <span className="rounded-full text-sm bg-danger text-white px-2 py-1">
              {Math.round(discountPercent).toLocaleString("fa-IR")}%
            </span> */
}
{
  /* <span>
              <span className="line-through text-zinc-500 ml-2">
                {item.price.toLocaleString("fa-IR")}
              </span>
            </span> */
}
