export const dynamic = "force-dynamic";

import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";

export default async function ProductsPage({ params, searchParams }: any) {
  const { page } = await params;
  const search = await searchParams;
  const currentPage = Number(params.page) || 1;
  const filters = { ...search, page: currentPage };
  const data = await GetProducts(filters , page);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];
  return (
    <LayoutShell
      categories={categories}
      products={data.results || []}
      pagination={{ count: data?.count || 0, page: data?.page || 1 }}
      searchParams={search}
    />
  );
}
