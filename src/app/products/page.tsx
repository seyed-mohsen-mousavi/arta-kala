export const dynamic = "force-dynamic";

import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";
import { Metadata } from "next";
import { cache } from "react";
import { CategoryNode } from "@/types/categories";
import { breadcrumbSchema, productsSchema } from "@/components/Schema";
import Script from "next/script";

const getCashedProducts = cache(GetProducts);
export default async function ProductsPage({ searchParams }: any) {
  const search = await searchParams;
  const data = await getCashedProducts(search);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];
  const breadcrumbs = [
    { name: "خانه", url: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
    { name: "محصولات", url: `${process.env.NEXT_PUBLIC_SITE_URL}/products` },
  ];
  const schema = [
    ...productsSchema(data.results || []),
    breadcrumbSchema(breadcrumbs),
  ];
  return (
    <>
      <Script
        id="products-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <LayoutShell
        categories={categories}
        products={data.results || []}
        pagination={{ count: data.count, page: data?.page || 1 }}
        searchParams={search}
      />
    </>
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

    const title = `${categoryTitle} | خرید انواع ${categoryTitle} با بهترین قیمت | آرتا کالا`;
    const description = `خرید اینترنتی ${categoryTitle} از فروشگاه آرتا کالا با بهترین قیمت و ارسال سریع. بررسی و فیلتر محصولات ${categoryTitle}.`;

    return {
      title,
      description,
      keywords: [
        categoryTitle,
        "فروشگاه آرتا کالا",
        "خرید آنلاین",
        "قیمت مناسب",
      ],
      openGraph: {
        title,
        description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/products?category_id=${categoryId}`,
        siteName: "آرتا کالا",
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
    title: "خرید محصولات | آرتا کالا",
    description:
      "مشاهده و خرید جدیدترین محصولات با بهترین قیمت از فروشگاه آرتا کالا. فیلتر بر اساس قیمت، موجودی، ویژگی و ...",
    keywords: ["فروشگاه آرتا کالا", "خرید آنلاین", "محصولات", "قیمت مناسب"],
    openGraph: {
      title: "خرید محصولات | فروشگاه آرتا کالا",
      description:
        "فروشگاه آرتا کالا ارائه‌دهنده انواع محصولات با بهترین قیمت و تضمین کیفیت. خرید آنلاین آسان و سریع.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products`,
      siteName: "آرتا کالا",
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "خرید محصولات | آرتا کالا",
      description:
        "محصولات متنوع با قیمت مناسب از فروشگاه اینترنتی آرتا کالا. خرید سریع، امن و مطمئن.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
