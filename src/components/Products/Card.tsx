"use client";
import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { CiImageOff } from "react-icons/ci";

export default function Card({
  item,
  href,
  isShow,
  items,
}: {
  item: ProductType;
  href?: string;
  isShow?: boolean;
  items?: any;
}) {
  return (
    <Link
      href={href ? href : `/product/${item.slug}`}
      key={item.id}
      title={item.name}
      className="size-full flex relative group/card"
    >
      {isShow && <SelectBox items={items} item={item} />}
      <div className="bg-white shadow rounded-lg p-3.5 sm:p-5 hover:shadow-lg transition-shadow group/card w-full h-full flex flex-col relative">
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
          <div className="relative mt-auto pt-3 flex justify-between items-center gap-2">
            <button></button>

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
              <p className="font-bold text-xl">
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
import { useEffect, useState } from "react";
import { marketing_products_select_create } from "@/services/marketingActions";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

function SelectBox({ item, items }: { item: ProductType; items: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAlreadySelected, setIsAlreadySelected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const already = items.some((entry: any) => entry.product?.id === item.id);
    setIsAlreadySelected(already);
  }, [items, item.id]);

  const handleSelect = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await marketing_products_select_create({
        product_ids: [item.id],
      });

      if (!res.success) {
        setMessage("خطا در انتخاب محصول");
        addToast({
          title: res.errors || "خطا در انتخاب محصول",
          description: "لطفاً دوباره تلاش کنید.",
          color: "danger",
        });
        return;
      }

      router.refresh();
      setIsAlreadySelected(true);
      setMessage("محصول با موفقیت انتخاب شد");
    } catch (error) {
      setMessage("ارسال با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`absolute z-10 top-2 left-2 ${isAlreadySelected ? "bg-green-300 rounded-sm" : "bg-white rounded-br-xl"} p-2 flex flex-col gap-2`}
    >
      {isAlreadySelected ? (
        <p className="text-xs text-green-700 pointer-events-none font-semibold text-center">
          قبلاً انتخاب شده
        </p>
      ) : (
        <button
          onClick={handleSelect}
          disabled={loading}
          className="btn-primary text-sm px-2 py-1 rounded disabled:opacity-50"
        >
          {loading ? "لطفا شکیبا باشید ..." : "انتخاب این محصول"}
        </button>
      )}

      {message && (
        <p className="text-xs text-center text-zinc-600">{message}</p>
      )}
    </div>
  );
}
