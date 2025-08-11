export const dynamic = "force-dynamic";

import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";
import { Metadata } from "next";
import { cache } from "react";
import { CategoryNode } from "@/types/categories";

const getCashedProducts = cache(GetProducts);
export default async function ProductsPage({ searchParams }: any) {
  const search = await searchParams;
  const data = await getCashedProducts(search, 1, true);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];
  return (
    <LayoutShell
      categories={categories}
      products={data.results || []}
      pagination={{ count: data.count, page: data?.page || 1 }}
      searchParams={search}
      href="products/offers"
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "تخفیف‌های شگفت‌انگیز | فروشگاه تکنو صاف";
  const description =
    "جدیدترین پیشنهادهای ویژه و تخفیف‌های شگفت‌انگیز فروشگاه تکنو صاف! خرید محصولات منتخب با قیمت باورنکردنی و ارسال سریع.";
  const keywords = [
    "تخفیف ویژه",
    "پیشنهاد شگفت‌انگیز",
    "حراج",
    "فروش ویژه",
    "قیمت باورنکردنی",
    "فروشگاه تکنو صاف",
    "خرید آنلاین ارزان",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/amazing-offers`,
      siteName: "تکنو صاف",
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
