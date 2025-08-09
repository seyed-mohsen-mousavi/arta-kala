"use client";
import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { CiImageOff } from "react-icons/ci";

export default function Card({
  item,
  href,
  className,
}: {
  item: ProductType;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href ? href : `/product/${item.slug}`}
      key={item.id}
      title={item.name}
      className="size-full flex relative group/card h-full "
    >
      <div
        className={`bg-white shadow rounded-2xl p-3.5 sm:p-5 hover:shadow-lg transition-shadow group/card w-full flex flex-col relative h-96 ${className ?? ""}`}
      >
        <div className="relative">
          {item.cover_image ? (
            <Image
              width={380}
              height={180}
              src={
                item.cover_image.startsWith("/media")
                  ? `${process.env.NEXT_PUBLIC_BACK_END}${item.cover_image}`
                  : item.cover_image
              }
              alt={`${item.name} - مجموعه فروش ابزار و آموزش صافکاری تکنوصاف `}
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

        <h3 className="font-semibold text-zinc-700 line-clamp-2 text-lg sm:">
          {item.name}
        </h3>
        {item.is_available ? (
          <div className="relative mt-auto flex justify-end gap-2">
            {item.isDiscounted && item.final_price !== undefined ? (
              <div>
                <div className="flex items-center">
                  <p className="line-through text-zinc-500 ml-2 text-sm">
                    {item.price.toLocaleString("fa-IR")} تومان
                  </p>
                  <span className="px-2 text-white bg-danger rounded-full">
                    {item.discount_percentage?.toLocaleString("fa-IR")}%
                  </span>
                </div>
                <p className="font-medium text-xl">
                  {item.final_price.toLocaleString("fa-IR")} تومان
                </p>
              </div>
            ) : (
              <p className="font-bold text-xl ">
                {item.price.toLocaleString("fa-IR")} تومان
              </p>
            )}
          </div>
        ) : (
          <div className="w-full pt-[7.5px] pb-[7.5px]">
            <div className="inline-flex items-center justify-center w-full relative text-zinc-500">
              <hr className="w-full h-px my-0 bg-zinc-600 border-0 rounded-sm" />
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
