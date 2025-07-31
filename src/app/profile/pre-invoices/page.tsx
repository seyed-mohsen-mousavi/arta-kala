import React from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import PreInvoices from "./PreInvoices";

async function Page() {
  return (
    <div>
      <h1 className="flex items-center gap-1 font-semibold text-xl mb-5">
        <MdShoppingCartCheckout className="size-8 text-primary" />
        <span className="pt-1">پیش فاکتور ها</span>
      </h1>
      <PreInvoices />
    </div>
  );
}

export default Page;
