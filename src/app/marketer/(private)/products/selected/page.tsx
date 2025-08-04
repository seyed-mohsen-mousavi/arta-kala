import { marketing_products_list } from "@/services/marketingActions";
import Link from "next/link";
import React from "react";
import Cards from "./Cards";

async function Products() {
  const res = await marketing_products_list();
  if (!res.success || !res.data || res.data.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-500">
          خطا در بارگذاری محصولات بازاریاب
        </h1>
        <p className="text-zinc-500 mt-2">لطفاً بعداً دوباره تلاش کنید.</p>
        <p className="text-zinc-500">
          اگر مشکل ادامه داشت، با پشتیبانی تماس بگیرید.
        </p>
        <Link
          href={"/marketer"}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          بازگشت به داشبورد
        </Link>
      </div>
    );
  }

  return (
    <section>
      <h1 className="text-5xl font-bold py-2">محصولات انتخاب شده </h1>
      <Cards items={res.data} />
    </section>
  );
}

export default Products;
