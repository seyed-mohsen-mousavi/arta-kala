import { formatShamsiDateString } from "@/utils/formatShamsiDateString";
import { FaPercent } from "react-icons/fa";
import { marketing_commissions_list } from "@/services/marketingActions";
import CommissionRequests from "./CommissionRequests";

export default async function Commissions() {
  const res = await marketing_commissions_list();

  if (!res || !res.success) {
    return <p>خطا در دریافت داده‌ها</p>;
  }

  const {
    commissions,
    total_commission,
    total_paid_commission,
    available_commission,
  } = res.data;

  if (!Array.isArray(commissions)) {
    return <p>داده‌ها به شکل درست دریافت نشد.</p>;
  }

  const mappedCommissions = commissions.map((item: any) => ({
    id: item.id,
    orderNumber: item.order_number,
    commissionBaseAmount: item.commission_base_amount || 0,
    totalCommission: item.total_commission || 0,
    paidCommission: item.paid_commission || 0,
    availableCommission: item.available_commission || 0,
    status: item.status,
    statusDisplay: item.status_display,
    createdAt: item.created_at,
    createdAtFormatted: formatShamsiDateString(item.created_at),
    detailsLink: `/marketer/commissions/${item.id}`,
  }));

  return (
    <div>
      <h1 className="flex items-center gap-1 font-semibold text-xl mb-5">
        <FaPercent className="size-8 text-zinc-700" />
        <span className="pt-1">پورسانت‌ها</span>
      </h1>

      <div className="mb-6 flex gap-6 text-sm">
        <div>
          مجموع پورسانت: <b>{total_commission.toLocaleString("fa-IR")}</b>
        </div>
        <div>
          پرداخت شده: <b>{total_paid_commission.toLocaleString("fa-IR")}</b>
        </div>
        <div>
          قابل برداشت: <b>{available_commission.toLocaleString("fa-IR")}</b>
        </div>
      </div>

      <CommissionRequests items={mappedCommissions} />
    </div>
  );
}
