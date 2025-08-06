export const dynamic = "force-dynamic";

import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";
import { Metadata } from "next";
import { cache } from "react";
import { CategoryNode } from "@/types/categories";

const getCashedProducts = cache(GetProducts);
export default async function ProductsPage({
  searchParams,
  isShow,
  items,
}: any) {
  const search = await searchParams;
  const data = await getCashedProducts(search);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];
  return (
    <LayoutShell
      items={items}
      isShow={isShow}
      categories={categories}
      products={data.results || []}
      pagination={{ count: data.count, page: data?.page || 1 }}
      searchParams={search}
    />
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: any;
}): Promise<Metadata> {
  const categoryId = searchParams?.category_id;

  if (categoryId) {
    const categoryRes = await GetShopCategoriesTreeList();
    const categories = categoryRes?.data || [];
    const category = categories.find(
      (cat: CategoryNode) => cat.id === +categoryId
    );

    const categoryTitle = category?.name || "دسته‌بندی انتخاب‌شده";

    const title = `${categoryTitle} | خرید انواع ${categoryTitle} با بهترین قیمت | تکنو صاف`;
    const description = `خرید اینترنتی ${categoryTitle} از فروشگاه تکنو صاف با بهترین قیمت و ارسال سریع. بررسی و فیلتر محصولات ${categoryTitle}.`;

    return {
      title,
      description,
      keywords: [
        categoryTitle,
        "فروشگاه تکنو صاف",
        "خرید آنلاین",
        "قیمت مناسب",
      ],
      openGraph: {
        title,
        description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/products?category_id=${categoryId}`,
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

  return {
    title: "خرید محصولات | فروشگاه تکنو صاف",
    description:
      "مشاهده و خرید جدیدترین محصولات با بهترین قیمت از فروشگاه تکنو صاف. فیلتر بر اساس قیمت، موجودی، ویژگی و ...",
    keywords: ["فروشگاه تکنو صاف", "خرید آنلاین", "محصولات", "قیمت مناسب"],
    openGraph: {
      title: "خرید محصولات | فروشگاه تکنو صاف",
      description:
        "فروشگاه تکنو صاف ارائه‌دهنده انواع محصولات با بهترین قیمت و تضمین کیفیت. خرید آنلاین آسان و سریع.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products`,
      siteName: "تکنو صاف",
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "خرید محصولات | تکنو صاف",
      description:
        "محصولات متنوع با قیمت مناسب از فروشگاه اینترنتی تکنو صاف. خرید سریع، امن و مطمئن.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
