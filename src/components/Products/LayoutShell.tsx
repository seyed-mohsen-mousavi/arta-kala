import FilterBox from "@/components/Products/FilterBox";
import SortBox from "@/components/Products/SortBox";
import Link from "next/link";
import PaginationBox from "./PaginationBox";
import Card from "./Card";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import BreadcrumbsBox from "./BreadcrumbsBox";
import { CategoryNode } from "@/types/categories";
import { findCategoryPath } from "@/app/product/[slug]/page";

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
  const params = await searchParams;
  const selected = Object.keys(params).length > 0 && !("sort" in params);

  let breadcrumb: CategoryNode[] = [];

  if (params?.category_id) {
    const path = findCategoryPath(categories, +params.category_id);
    if (path) breadcrumb = path;
  }

  return (
    <div className="space-y-5">
      <BreadcrumbsBox name="محصولات" breadcrumb={breadcrumb} />
      <section className="flex gap-4 w-full h-full ">
        <FilterBox categories={categories} selected={selected} />
        <div className="size-full space-y-5">
          <SortBox categories={categories} />
          {/* لیست محصولات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.length > 0 ? (
              products.map((product: any) => (
                <Card key={product.id} item={product} />
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
    </div>
  );
}
