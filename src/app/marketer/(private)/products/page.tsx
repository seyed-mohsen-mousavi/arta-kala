import ProductsPage from "@/app/products/page";
import { marketing_products_list } from "@/services/marketingActions";
import React from "react";

async function page({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const res = await marketing_products_list();

  return (
    <div className="w-full">
      <ProductsPage
        items={res.data}
        searchParams={searchParams}
        isShow={true}
      />
    </div>
  );
}

export default page;
