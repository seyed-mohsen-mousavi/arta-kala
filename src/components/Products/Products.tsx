"use client";
import React from "react";
import Card from "./Card";
import PaginationBox from "./PaginationBox";
import ProductType from "@/types/product";

function Products({
  searchParams,
  products,
}: {
  searchParams: any;
  products: ProductType[];
}) {
  // const [pagination, setPagination] = useState<{ count: number; page: number }>(
  //   { count: 0, page: 1 }
  // );
  // const [error, setError] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => <Card key={product.id} item={product} />)
        ) : (
          <div className="col-span-4 text-zinc-500 bg-white shadow rounded-xs p-5">
            <p className="px-4 py-2 rounded-xs bg-primary/20 w-full border border-primary/40 text-primary-800 text-base my-4">
              جستجو برای این ترکیب از فیلترها با هیچ کالایی هم‌خوانی نداشت.
            </p>
            <p>تلاش کنید</p>
            <p>- تعدادی از فیلتر ها را حذف کنید.</p>
            <p>- در جستجو از عبارت‌های متداول‌تر استفاده کنید.</p>
          </div>
        )}
      </div>

      <div
        className="bg-white shadow p-3 rounded-sm flex justify-between items-center"
        dir="rtl"
      >
        <PaginationBox searchParams={searchParams} count={0} page={1} />
        <div>
          <span>مجموع نتایج : </span>
          <span>{0}</span>
        </div>
      </div>

      {/* {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded mt-4">
          {error}
        </div>
      )} */}
    </>
  );
}

export default Products;
