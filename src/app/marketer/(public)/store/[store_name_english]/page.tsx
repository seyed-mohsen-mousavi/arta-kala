import {
  marketing_profile_list,
  marketing_store_read,
} from "@/services/marketingActions";
import React from "react";
import Card from "@/components/Products/Card";
import Navbar from "@/components/Navbar";

async function Page({ params }: { params: { store_name_english: string } }) {
  const { store_name_english } = await params;
  const store = await marketing_store_read(store_name_english);
  const products = store?.data || [];
  const res = await marketing_profile_list();
  const profile = res.data;
  console.log(profile);
  return (
    <>
      <Navbar title={`فروشگاه ${profile.store_name_persian}`} />

      <div className="container mx-auto px-4 py-8">
        {profile && (
          <div className="mb-8">
            <p className="text-gray-600 text-sm">
              {products.length} محصول موجود
            </p>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center text-gray-500">محصولی یافت نشد.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((item: any) => (
              <Card
                key={item.id}
                item={item}
                href={`/marketer/store/${store_name_english}/${item.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
