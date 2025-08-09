import Order from "@/components/Order";
import { marketing_order } from "@/services/marketingActions";
import { notFound } from "next/navigation";

async function Page({ params }: any) {
  const orderId = String((await params).id);
  const order = await marketing_order(orderId);
  if (!order) return notFound();
  return (
    <div>
      <Order order={order.data} />
    </div>
  );
}

export default Page;
