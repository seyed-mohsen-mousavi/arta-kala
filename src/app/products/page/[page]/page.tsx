export const dynamic = "force-dynamic";

import LayoutShell from "@/components/Products/LayoutShell";
import { breadcrumbSchema, productsSchema } from "@/components/Schema";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";
import { CategoryNode } from "@/types/categories";
import { Metadata } from "next";
import Script from "next/script";

export default async function ProductsPage({ params, searchParams }: any) {
  const { page } = await params;
  const search = await searchParams;
  const currentPage = Number(params.page) || 1;
  const filters = { ...search, page: currentPage };
  const data = await GetProducts(filters, page);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];
  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "محصولات", url: "/products" },
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
        pagination={{ count: data?.count || 0, page: data?.page || 1 }}
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
