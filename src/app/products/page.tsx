export const dynamic = "force-dynamic";

import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";

// type Props = {
//   searchParams: Record<string, string | string[]>;
// };

export default async function ProductsPage({ searchParams }: any) {
  const data = await GetProducts(searchParams);
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

export async function generateMetadata() {
  return { title: "محصولات - صفحه اول" };
}
