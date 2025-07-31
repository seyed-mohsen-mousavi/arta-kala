import Order from "./Order";
import { GetUserDashboard } from "@/services/authActions";
import { notFound } from "next/navigation";

async function Page({ params }: any) {
  const data = await GetUserDashboard();
  const orderId = Number((await params).id);
  const foundOrder = data.orders.find((order: any) => order.id === orderId);
  if (!foundOrder) return notFound();

  return (
    <div>
      <Order order={foundOrder} />
    </div>
  );
}

export default Page;
