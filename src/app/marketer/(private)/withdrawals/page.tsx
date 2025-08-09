import Requests from "./Requests";
import { marketing_withdrawal_requests } from "@/services/marketingActions";
import { FaMoneyBillWave } from "react-icons/fa6";
import { formatShamsiDateString } from "@/utils/formatShamsiDateString";

export default async function Withdrawal() {
  const res = await marketing_withdrawal_requests();

  if (!res || !res.success) {
    return <p>خطا در دریافت داده‌ها</p>;
  }

  const { data } = res;

  const mappedRequests = data.map((request: any) => ({
    id: request.id,
    amount: request.amount || 0,
    amountFormatted: (request.amount || 0).toLocaleString("fa-IR"),
    status: request.status || "pending",
    statusDisplay: request.status_display || "",
    createdAt: request.created_at,
    createdAtFormatted: formatShamsiDateString(request.created_at),
    updatedAt: formatShamsiDateString(request.updated_at),
    paidAt: request.paid_at ? formatShamsiDateString(request.paid_at) : "",
    detailsLink: `/marketer/withdrawals/${request.id}`,
  }));
  return (
    <div>
      <h1 className="flex items-center gap-1 font-semibold text-xl mb-5">
        <FaMoneyBillWave className="size-8 text-zinc-700" />
        <span className="pt-1">درخواست‌های تسویه</span>
      </h1>
      <Requests items={mappedRequests} />
    </div>
  );
}
