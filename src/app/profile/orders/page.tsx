import Orders from "@/components/Orders";
import { GetUserDashboard } from "@/services/authActions";
import React from "react";
import { MdShoppingCartCheckout } from "react-icons/md";

async function Page() {
  const data = await GetUserDashboard();
  console.log(data);
  return (
    <div>
      <h1 className="flex items-center gap-1 font-semibold text-xl mb-5">
        <MdShoppingCartCheckout className="size-8 text-primary" />
        <span className="pt-1">سفارشات</span>
      </h1>
      <Orders />
    </div>
  );
}

export default Page;
