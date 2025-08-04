"use client";
import Card from "@/components/Products/Card";
import { marketing_products_remove_delete } from "@/services/marketingActions";
import React from "react";

function Cards({ items }: { items: any[] }) {
  const hanldeClick = async (e: any, id: any) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmation = confirm(
      "آیا مطمئن هستید که می‌خواهید این محصول را از لیست محصولات انتخاب شده حذف کنید؟"
    );
    if (!confirmation) return;
    const res = await marketing_products_remove_delete(id);
    if (res.success) {
      alert("محصول با موفقیت حذف شد.");
      window.location.reload();
    } else {
      alert("خطا در حذف محصول. لطفاً دوباره تلاش کنید.");
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-6 p-6">
      {items.map((item: any) => (
        <div key={item.id} className="relative">
          <button
            onClick={(e) => hanldeClick(e, item.id)}
            className="absolute top-2 left-2 bg-danger text-white  justify-center shadow-md hover:bg-danger/90 px-2 py-1 rounded-full transition-all ease-initial z-10"
          >
            حذف از محصولات
          </button>
          <Card item={item.product} />
        </div>
      ))}
    </div>
  );
}

export default Cards;
