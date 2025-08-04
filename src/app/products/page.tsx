export const dynamic = "force-dynamic";

import LayoutShell from "@/components/Products/LayoutShell";
import { GetProducts, GetShopCategoriesTreeList } from "@/services/shopActions";

// type Props = {
//   searchParams: Record<string, string | string[]>;
// };

export default async function ProductsPage({
  searchParams,
  isShow,
  items,
}: any) {
  const data = await GetProducts(searchParams);
  const categoryRes = await GetShopCategoriesTreeList();
  const categories = categoryRes?.data || [];
  return (
    <LayoutShell
      items={items}
      isShow={isShow}
      categories={categories}
      products={data.results || []}
      pagination={{ count: data.count, page: data?.page || 1 }}
      searchParams={await searchParams}
    />
  );
}

export async function generateMetadata() {
  return { title: "محصولات - صفحه اول" };
}
