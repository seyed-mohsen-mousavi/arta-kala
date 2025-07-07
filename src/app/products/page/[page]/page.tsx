import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";

type Props = {
  params: Promise<{ page: string }>;
  searchParams: Promise<Record<string, string | string[]>>;
};

export default async function ProductsPage({ params, searchParams }: Props) {
  const currentPage = Number((await params).page) || 1;

  const filters = {
    ...searchParams,
    page: currentPage,
  };

  const { data } = await GetProducts(filters);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];

  return (
    <LayoutShell
      categories={categories}
      products={data.results || []}
      pagination={{
        count: data?.count || 0,
        page: data?.page || 1,
      }}
      searchParams={searchParams}
    />
  );
}
