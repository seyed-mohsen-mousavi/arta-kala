import Order from "./Order";
import { GetDiscountedOrder } from "@/services/homeActions";
import { notFound } from "next/navigation";

async function Page({ params }: any) {
  const orderNumber = String(params.order_number);
  const order = await GetDiscountedOrder(orderNumber);
  if (!order) return notFound();

  return (
    <div>
      <Order order={order} />
    </div>
  );
}

export default Page;
