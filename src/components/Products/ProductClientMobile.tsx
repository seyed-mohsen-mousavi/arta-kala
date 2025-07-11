"use client";

import dynamic from "next/dynamic";
import ProductType from "@/types/product";

const AddToCart = dynamic(() => import("./AddToCart"), {
  loading: () => <p>در حال بارگذاری...</p>,
});

interface Props {
  product: ProductType;
}

export default function ProductClientMobile({ product }: Props) {
  return (
    <>
      <div className="hidden sm:block lg:hidden bg-zinc-100 border border-zinc-200 p-5 my-5 text-center space-y-4 rounded-md">
        {product.is_available && (
          <>
            <div className="flex items-center justify-center mb-2">
              <span className="line-through text-zinc-500 ml-2">
                {product.price.toLocaleString("fa-IR")}
              </span>
              <p className="rounded-full text-sm bg-danger text-white px-4 py-2">
                %{Math.round(60).toLocaleString("fa-IR")}
              </p>
            </div>
            <p className="font-dana font-bold text-2xl">
              {product.price.toLocaleString("fa-IR")}
              <span className="font-light">تومان</span>
            </p>
          </>
        )}
        <AddToCart is_available={product.is_available} product={product} />
      </div>
      {product.is_available && (
        <div className="my-10 w-full h-full space-y-3 block lg:hidden px-4">
          <a href="#" className="text-cyan-400 spoiler-link relative">
            آیا قیمت مناسب‌تری سراغ دارید؟
          </a>
          <div className="bg-white border border-zinc-200 rounded-lg p-2 flex justify-between w-full mt-5 px-3 items-center">
            <div>
              <p className="text-zinc-800">ارسال رایگان سفارش</p>
              <p className="font-light text-zinc-500 font-dana pt-1">
                سفارش‌های بالای 5 میلیون تومان
              </p>
            </div>
            <div className="size-14 relative">
              <img src="/free-delivery-free.svg" alt="ارسال رایگان" />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 z-30 right-0 w-full space-y-3 bg-white shadow-2xl sm:hidden p-3">
        {product.is_available && (
          <>
            <div className="flex items-center justify-start mb-2">
              <p className="text-sm">
                <span className="line-through text-zinc-500 ml-2">
                  {product.price.toLocaleString("fa-IR")} تومان
                </span>
              </p>
              <p className="rounded-full text-sm bg-danger text-white px-3 py-0.5">
                %{Math.round(60).toLocaleString("fa-IR")}
              </p>
            </div>
            <p className="font-dana font-bold text-base text-right">
              <span className="font-bold font-iranyekan text-lg">
                {product.price.toLocaleString("fa-IR")}
              </span>
              <span className="font-light">تومان</span>
            </p>
            <AddToCart is_available={product.is_available} product={product} />
          </>
        )}
      </div>
    </>
  );
}
