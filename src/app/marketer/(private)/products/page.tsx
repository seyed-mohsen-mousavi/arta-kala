import { marketing_products_list } from "@/services/marketingActions";
import { GetProducts } from "@/services/shopActions";
import ProductsTable from "./ProductsTable";
import ProductType from "@/types/product";

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    ordering?: string;
  }>;
}

interface ProductsResponse {
  count: number;
  results: ProductType[];
}

export default async function Page({ searchParams }: PageProps) {
  let selectedRes: any | null = null;
  let productRes: ProductsResponse | null = null;
  let errorMessage: string | null = null;
  const searching = await searchParams;
  const page = Number(searching.page) || 1;
  const search = searching.search || "";

  try {
    selectedRes = await marketing_products_list();

    productRes = await GetProducts({ search }, page);
  } catch (error) {
    console.error("خطا در دریافت داده‌ها:", error);
    errorMessage = "خطایی در بارگذاری داده‌ها رخ داد. لطفاً دوباره تلاش کنید.";
  }

  const selectedIds = Array.isArray(selectedRes?.data)
    ? selectedRes!.data.map((data: { product: ProductType }) => data.product.id)
    : [];
  console.log("Selected:", selectedIds);
  console.log(productRes, selectedRes);
  return (
    <div className="p-4">
      {errorMessage ? (
        <div className="p-4 mb-4 text-red-800 bg-red-100 border border-red-300 rounded">
          {errorMessage}
        </div>
      ) : productRes ? (
        <ProductsTable
          products={productRes.results}
          total={productRes.count}
          page={page}
          rowsPerPage={10}
          searchValue={search}
          initiallySelected={selectedIds}
        />
      ) : (
        <div>در حال بارگذاری...</div>
      )}
    </div>
  );
}
