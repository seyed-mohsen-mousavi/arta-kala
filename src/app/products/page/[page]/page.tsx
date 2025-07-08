import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";
// import { CategoryNode } from "@/types/categories";

// type Props = {
//   categories: CategoryNode[];
//   params: { page: string };
//   searchParams: Record<string, string | string[]>;
// };

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

// export default async function generateMetadata({
//   params,
// }: {
//   params: { page: string };
// }) {
//   return { title: `محصولات - صفحه ${params.page}` };
// }
