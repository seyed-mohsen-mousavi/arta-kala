import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";
type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[]>>;
};
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const search = await searchParams;
  const { data } = await GetProducts(search);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];
  console.log(data);
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
