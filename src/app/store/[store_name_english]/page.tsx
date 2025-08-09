import { marketing_store_read } from "@/services/marketingActions";
import React from "react";
import Card from "@/components/Products/Card";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ store_name_english: string }>;
}): Promise<Metadata> {
  const { store_name_english } = await params;
  const store = await marketing_store_read(store_name_english);
  // console.log(store);
  const products = store?.data || [];

  return {
    title: `فروشگاه ${store_name_english}`,
    description: `${products.length} محصول از ${store_name_english} در فروشگاه موجود است.`,
    openGraph: {
      title: `فروشگاه ${store_name_english}`,
      description: `${products.length} محصول موجود است.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function Page({
  params,
}: {
  params: Promise<{ store_name_english: string }>;
}) {
  const { store_name_english } = await params;
  const store = await marketing_store_read(store_name_english);
  const products = store?.data || [];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* {profile && (
          <div className="mb-8">
            <h1 className="lg:text-3xl 2xl:text-4xl text-2xl font-bold">
              فروشگاه {profile.store_name_persian}
            </h1>
            <p className="text-gray-600 text-sm pt-1">
              {products.length} محصول موجود
            </p>
          </div>
        )} */}

        {products.length === 0 ? (
          <div className="text-center text-gray-500">محصولی یافت نشد.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((item: any) => (
              <Card
                key={item.id}
                item={item}
                href={`/store/${store_name_english}/${item.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
