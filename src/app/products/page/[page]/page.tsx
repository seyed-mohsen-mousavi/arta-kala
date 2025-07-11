export const dynamic = "force-dynamic";

import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";

export default async function ProductsPage({ params, searchParams }: any) {
  const currentPage = Number(params.page) || 1;
  const filters = { ...searchParams, page: currentPage };
  const { data } = await GetProducts(filters);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];
  return (
    <LayoutShell
      categories={categories}
      products={data.results || []}
      pagination={{ count: data?.count || 0, page: data?.page || 1 }}
      searchParams={await searchParams}
    />
  );
}
