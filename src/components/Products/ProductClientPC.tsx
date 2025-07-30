"use client";

import dynamic from "next/dynamic";
import ProductType from "@/types/product";

const AddToCart = dynamic(() => import("./AddToCart"), {
  loading: () => <p>در حال بارگذاری...</p>,
});

interface Props {
  product: ProductType;
}

export default function ProductClientPC({ product }: Props) {
  return (
    <>
      <div className="w-5/12 h-full space-y-3 lg:block hidden">
        <div className="bg-zinc-100 border border-zinc-200 p-5 text-center space-y-4 rounded-md">
          {product.is_available && product.stock > 0 && (
            <>
              <div className="flex items-center justify-center mb-2">
                <span className="line-through text-zinc-500 ml-2">
                  {product.price.toLocaleString("fa-IR")}
                </span>
                {product.discount_percentage && (
                  <p className="rounded-full text-sm bg-danger text-white px-4 py-2">
                    %{product.discount_percentage.toLocaleString("fa-IR")}
                  </p>
                )}
              </div>
              {product.final_price && (
                <p className="font-dana font-bold text-2xl">
                  {product.final_price.toLocaleString("fa-IR")}
                  <span className="font-light">تومان</span>
                </p>
              )}
            </>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <p
              className={`text-right font-bold font-dana ${
                product.stock <= 2 ? "text-danger" : "text-warning"
              }`}
            >
              تنها {product.stock === 1 ? "یک" : product.stock + " عدد"} در
              انبار باقی مانده
            </p>
          )}
          <AddToCart
            is_available={product.is_available && product.stock > 0}
            product={product}
          />
        </div>

        {product.is_available && product.stock > 0 && (
          <>
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
          </>
        )}
      </div>
    </>
  );
}
