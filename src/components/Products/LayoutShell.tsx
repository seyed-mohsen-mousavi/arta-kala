import FilterBox from "@/components/Products/FilterBox";
import SortBox from "@/components/Products/SortBox";
import Image from "next/image";
import Link from "next/link";
import PaginationBox from "./PaginationBox";
import Card from "./Card";

export default async function LayoutShell({
  categories,
  products,
  searchParams,
  pagination,
}: {
  categories: any[];
  products: any;
  searchParams: { [key: string]: string | number | boolean };
  pagination?: { count: number; page: number };
}) {
  const selected =
    Object.keys(await searchParams).length > 0 && !("sort" in searchParams);
  return (
    <section className="flex gap-4 w-full h-full ">
      <FilterBox categories={categories} selected={selected} />
      <div className="size-full space-y-5">
        <SortBox />
        {/* لیست محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product: any) => (
              <Card key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-4  text-zinc-500 bg-white shadow rounded-xs p-5">
              <p className="px-4 py-2 rounded-xs bg-primary/20 w-full border border-primary/40 text-primary-800 text-base my-4">
                جستجو برای این ترکیب از فیلترها با هیچ کالایی هم‌خوانی نداشت.
              </p>
              <p>تلاش کنید</p>
              <p>- تعدادی از فیلتر ها را حذف کنید.</p>
              <p>- در جستجو از عبارت‌های متداول‌تر استفاده کنید.</p>
            </div>
          )}
        </div>
        {products.length > 0 && (
          <div
            className="bg-white shadow p-3 rounded-sm flex justify-between items-center"
            dir="rtl"
          >
            <PaginationBox
              count={pagination?.count || 0}
              page={pagination?.page || 1}
            />
            <div>
              <span>مجموع نتایج : </span>
              <span>{pagination?.count || 0}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
