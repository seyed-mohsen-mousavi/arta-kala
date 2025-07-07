"use client";
import FilterBox from "@/components/Products/FilterBox";
import SortBox from "@/components/Products/SortBox";
import BreadcrumbsBox from "./BreadcrumbsBox";
import { CategoryNode } from "@/types/categories";
import ProductType from "@/types/product";
import Products from "./Products";
type LayoutShellProps = {
  products: ProductType[];
  searchParams: Record<string, string | string[]>;
  pagination?: { count: number; page: number };
  categories: CategoryNode[];
};
export default function LayoutShell({ searchParams }: LayoutShellProps) {
  const selected =
    Object.keys(searchParams).length > 0 && !("sort" in searchParams);

  return (
    <div className="space-y-5">
      <BreadcrumbsBox
        title="محصولات"
        items={[
          { label: "خانه", href: "/" },
          { label: "محصولات", href: "/products" },
          { label: "کفش ورزشی" },
        ]}
      />
      <section className="flex gap-4 w-full h-full ">
        <FilterBox selected={selected} />
        <div className="size-full space-y-5">
          <SortBox />
          <Products searchParams={searchParams} />
        </div>
      </section>
    </div>
  );
}
