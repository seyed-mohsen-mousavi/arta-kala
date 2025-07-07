"use client";
import { CategoryNode } from "@/types/categories";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  breadcrumb: CategoryNode[];
  name?: string;
  link?: string;
};
function BreadcrumbsBox({ breadcrumb, name, link }: Props) {
  const pathName = usePathname();
  return (
    <div className="pb-16">
      <div className="py-5 w-full shadow absolute right-0 bg-white">
        <div className="container mx-auto flex items-center gap-3">
          <strong className="text-base">{name}</strong>
          <div className="text-sm text-zinc-500 flex items-center gap-1 flex-wrap">
            <Link href="/">خانه</Link>
            {(pathName.startsWith("/products") ||
              pathName.startsWith("/product")) && (
              <>
                <span>/</span>
                <Link href="/products">محصولات</Link>
              </>
            )}
            {breadcrumb.map((cat, index) => (
              <span key={cat.id} className="flex items-center gap-1">
                <span>/</span>
                <Link href={`/products?category_id=${cat.id}`}>{cat.name}</Link>
              </span>
            ))}
            {name && !pathName.startsWith("/products") && (
              <>
                <span>/</span>
                <Link href={link || ""}>{name}</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadcrumbsBox;
