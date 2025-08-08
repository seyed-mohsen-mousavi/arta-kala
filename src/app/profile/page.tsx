import { GetUserDashboard } from "@/services/authActions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  FaCheckCircle,
  FaTruck,
  FaClipboardList,
  FaReceipt,
} from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

export default async function UserDashboard() {
  const {
    pre_invoices,
    orders,
  }: { pre_invoices: any; orders: any; joined_at: string } =
    await GetUserDashboard();

  const deliveredCount = orders.filter(
    (o: { status: string }) => o.status === "delivered"
  ).length;

  const lastOrders = orders.slice(0, 3);
  const lastPreInvoices = pre_invoices.slice(0, 3);
  const totalOrders = orders.length;
  const totalPreInvoices = pre_invoices.length;

  const statusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "processed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-10 space-y-2 font-pelak text-gray-900">
      <section className="w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">سوابق من</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 rounded-2xl  p-8 w-full">
          <Link
            href={"/profile/orders"}
            className="flex items-center gap-5 bg-white w-full rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <div className="bg-green-100 text-green-500 rounded-xl p-4 text-3xl">
              <FaClipboardList />
            </div>
            <div>
              <div className="text-gray-500 text-sm">سفارش‌ها</div>
              <div className="text-gray-900 font-semibold text-lg">
                {totalOrders.toLocaleString("fa-IR")}
              </div>
            </div>
          </Link>

          <Link
            href={"/profile/pre-invoices"}
            className="flex items-center gap-5 bg-white w-full rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <div className="bg-yellow-100 text-yellow-700 rounded-xl p-4 text-3xl ">
              <FaReceipt />
            </div>
            <div>
              <div className="text-gray-500 text-sm">پیش‌فاکتورها</div>
              <div className="text-gray-900 font-semibold text-lg">
                {totalPreInvoices.toLocaleString("fa-IR")}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-5 bg-white w-full rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
            <div className="bg-purple-100 text-purple-700 rounded-xl p-4 text-3xl ">
              <FaCheckCircle />
            </div>
            <div>
              <div className="text-gray-500 text-sm">سفارشات تحویل شده</div>
              <div className="text-gray-900 font-semibold text-lg">
                {deliveredCount.toLocaleString("fa-IR")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <div className="p-8">
          <div className="w-full flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold  flex items-center gap-4 text-zinc-600">
              <FaTruck className="text-zinc-500 " /> آخرین سفارشات
            </h3>
            <Link href={"/profile/orders"} className="flex items-center gap-2">
              مشاهده همه سفارش ها <ArrowLeft className="size-4" />
            </Link>
          </div>
          {lastOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-12 text-lg font-medium">
              سفارشی موجود نیست
            </p>
          ) : (
            <ul className="divide-y divide-gray-300">
              {lastOrders.map((order: any) => (
                <li
                  key={order.id}
                  className="py-6 rounded-sm cursor-pointer hover:bg-zinc-100 transition-all duration-300 px-6"
                >
                  <Link
                    href={`/profile/orders/${order.id}`}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full h-full"
                  >
                    <div className="space-y-2">
                      <div className="font-semibold text-gray-900 text-xl tracking-wide">
                        {order.order_number}
                      </div>
                      <div className="text-gray-600 text-base">
                        {order.receiver_name} - {order.receiver_city}
                      </div>
                    </div>
                    <div
                      className={`mt-4 sm:mt-0 px-4 py-2 rounded-full text-sm font-semibold ${statusColor(
                        order.status
                      )}`}
                    >
                      {order.status === "delivered"
                        ? "تحویل شده"
                        : order.status === "shipped"
                          ? "در حال ارسال"
                          : order.status === "pending"
                            ? "در انتظار"
                            : order.status === "cancelled"
                              ? "لغو شده"
                              : order.status === "processed"
                                ? "پردازش شده"
                                : "نامشخص"}
                    </div>
                    <div className="mt-4 sm:mt-0 text-gray-800 font-semibold text-base">
                      مجموع:{" "}
                      <span className="text-gray-900">
                        {order.total_amount.toLocaleString()} تومان
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="flex justify-center text-zinc-400">
                <IoIosMore className="size-10" />
              </li>
            </ul>
          )}
        </div>
        <div className="p-8">
          <div className="w-full flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold  flex items-center gap-4 text-zinc-600">
              <FaTruck className="text-zinc-500 " /> آخرین پیش فاکتور ها
            </h3>
            <Link
              href={"/profile/pre-invoices"}
              className="flex items-center gap-2"
            >
              مشاهده همه پیش فاکتور ها <ArrowLeft className="size-4" />
            </Link>
          </div>
          {lastPreInvoices.length === 0 ? (
            <p className="text-gray-500 text-center py-12 text-lg font-medium">
              پیش فاکتوری موجود نیست
            </p>
          ) : (
            <ul className="divide-y divide-gray-300">
              {lastPreInvoices.map((order: any) => (
                <li
                  key={order.id}
                  className="py-6 rounded-sm cursor-pointer hover:bg-zinc-100 transition-all duration-300 px-6"
                >
                  <Link
                    href={`/profile/pre-invoices/${order.id}`}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full h-full"
                  >
                    <div className="space-y-2">
                      <div className="font-semibold text-gray-900 text-xl tracking-wide">
                        {order.order_number}
                      </div>
                      <div className="text-gray-600 text-base">
                        {order.receiver_name} - {order.receiver_city}
                      </div>
                    </div>
                    <div
                      className={`mt-4 sm:mt-0 px-4 py-2 rounded-full text-sm font-semibold ${statusColor(
                        order.status
                      )}`}
                    >
                      {order.status === "delivered"
                        ? "تحویل شده"
                        : order.status === "shipped"
                          ? "در حال ارسال"
                          : order.status === "pending"
                            ? "در انتظار"
                            : order.status === "cancelled"
                              ? "لغو شده"
                              : order.status === "processed"
                                ? "پردازش شده"
                                : "نامشخص"}
                    </div>
                    <div className="mt-4 sm:mt-0 text-gray-800 font-semibold text-base">
                      مجموع:{" "}
                      <span className="text-gray-900">
                        {order.total_amount.toLocaleString()} تومان
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="flex justify-center text-zinc-400">
                <IoIosMore className="size-10" />
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
