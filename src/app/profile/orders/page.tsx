// page.tsx
import { GetDiscountedOrders } from "@/services/homeActions";
import { GetUserDashboard } from "@/services/authActions";
import { formatToPersianTimeAgo } from "@/utils/formatToPersianTimeAgo";
import { MdShoppingCartCheckout } from "react-icons/md";
import Orders from "./Orders";

export default async function Page() {
  const discountedOrders = await GetDiscountedOrders();
  const { orders } = await GetUserDashboard();

  const mapOrders = (data: any[]) =>
    data.map((order) => ({
      id: order.id,
      order_number: order?.order_number,
      amount: order.total_amount || order.discounted_amount || 0, // عددی
      amountFormatted:
        (order.total_amount || order.discounted_amount)?.toLocaleString(
          "fa-IR"
        ) || "۰",
      status: order?.status,
      date: order.order_date,
      dateFormatted: formatToPersianTimeAgo(order.order_date),
      detailsLink: order.discounted_amount
        ? `/profile/dis-orders/${order.order_number}`
        : `/profile/orders/${order.order_number}`,
    }));

  const items = [...mapOrders(orders), ...mapOrders(discountedOrders)];

  return (
    <div>
      <h1 className="flex items-center gap-1 font-semibold text-xl mb-5">
        <MdShoppingCartCheckout className="size-8 text-primary" />
        <span className="pt-1">سفارشات</span>
      </h1>
      <Orders items={items} />
    </div>
  );
}
