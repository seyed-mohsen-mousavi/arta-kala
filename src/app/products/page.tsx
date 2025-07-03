import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { data } = await GetProducts(searchParams);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];

  return (
    <LayoutShell
      categories={categories}
      products={data?.results || []}
      pagination={{
        count: data?.count || 0,
        page: data?.page || 1,
      }}
      searchParams={searchParams}
    />
  );
}
