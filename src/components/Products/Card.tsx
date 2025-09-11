"use client";
import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { CiImageOff } from "react-icons/ci";
import { ShoppingBasket } from "lucide-react";

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
    <div
      key={item.id}
      title={item.name}
      className={`bg-white rounded-2xl shadow-md p-3 flex flex-col justify-between gap-3 h-full transition hover:shadow-lg ${className ?? ""}`}
    >
      <div className="flex items-center justify-between">
        {item.isDiscounted && item.discount_percentage ? (
          <span className="bg-red-100 text-red-500 text-xl px-3 py-1 rounded-xl max-lg:text-sm">
            {item.discount_percentage.toLocaleString("fa-IR")}% تخفیف
          </span>
        ) : (
          <span />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-52 flex justify-center items-center overflow-hidden rounded-xl">
          {item.cover_image ? (
            <Image
              src={item.cover_image}
              alt={`${item.name} - آرتا کالا`}
              width={300}
              height={200}
              className="h-full object-contain transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <CiImageOff className="size-16 text-gray-400" />
          )}
        </div>

        <div>
          <p className="font-bold truncate text-lg text-zinc-800">
            {item.name}
          </p>
          <p className="text-sm text-zinc-400 py-1">{item.category}</p>
        </div>
      </div>

      {item.is_available ? (
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
          <div>
            {item.isDiscounted && item.final_price !== undefined ? (
              <div>
                <p className="line-through text-sm text-zinc-500">
                  {item.price?.toLocaleString("fa-IR")} تومان
                </p>
                <p className="font-bold text-xl text-zinc-800">
                  {item.final_price.toLocaleString("fa-IR")} تومان
                </p>
              </div>
            ) : (
              <p className="font-bold text-xl text-zinc-800">
                {item.price ? item.price.toLocaleString("fa-IR") : "۰"} تومان
              </p>
            )}
          </div>

          <Link
            href={href ? href : `/product/${item.slug}`}
            className="btn bg-primary  text-white py-3.5 px-5 rounded-2xl flex items-center gap-2 transition text-lg hover:bg-primary/90"
          >
            <ShoppingBasket className="size-6" />
            خرید محصول
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
          <div>
            <p className="font-bold text-xl text-zinc-800">ناموجود</p>
          </div>

          <Link
            href={href ? href : `/product/${item.slug}`}
            className="btn !bg-orange-400  text-white py-3.5 px-5 rounded-2xl flex items-center gap-2 transition text-lg "
          >
            <ShoppingBasket className="size-6" />
            مشاهده
          </Link>
        </div>
      )}
    </div>
  );
}
