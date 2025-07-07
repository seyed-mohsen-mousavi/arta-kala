"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import PaginationBox from "./PaginationBox";
import { GetProducts } from "@/services/shopActions";
import ProductType from "@/types/product";
import CardSkeleton from "./CardSkeleton";

function Products({ searchParams }: { searchParams: any }) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pagination, setPagination] = useState<{ count: number; page: number }>(
    { count: 0, page: 1 }
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const productsRes = await GetProducts(searchParams);
        setProducts(productsRes?.data?.results || []);
        setPagination({
          count: productsRes?.data?.count || 0,
          page: productsRes?.data?.page || 1,
        });
      } catch (e) {
        console.error(e);
        setError("خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchParams]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => <Card key={product.id} item={product} />)
        ) : (
          <div className="col-span-4 text-zinc-500 bg-white shadow rounded-xs p-5">
            <p className="px-4 py-2 rounded-xs bg-primary/20 w-full border border-primary/40 text-primary-800 text-base my-4">
              جستجو برای این ترکیب از فیلترها با هیچ کالایی هم‌خوانی نداشت.
            </p>
            <p>تلاش کنید</p>
            <p>- تعدادی از فیلتر ها را حذف کنید.</p>
            <p>- در جستجو از عبارت‌های متداول‌تر استفاده کنید.</p>
          </div>
        )}
      </div>

      <div
        className="bg-white shadow p-3 rounded-sm flex justify-between items-center"
        dir="rtl"
      >
        <PaginationBox
          searchParams={searchParams}
          count={pagination?.count || 0}
          page={pagination?.page || 1}
        />
        <div>
          <span>مجموع نتایج : </span>
          <span>{pagination?.count || 0}</span>
        </div>
      </div>

      {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded mt-4">
          {error}
        </div>
      )}
    </>
  );
}

export default Products;
