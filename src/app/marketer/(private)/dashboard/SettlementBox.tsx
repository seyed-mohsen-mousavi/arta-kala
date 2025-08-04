"use client";
import { useState } from "react";
import { addToast } from "@heroui/toast";
import { marketing_withdrawal_request_create } from "@/services/marketingActions";

export default function SettlementBox({
  available_commission,
}: {
  available_commission: number;
}) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const numericAmount = parseInt(amount);
    if (numericAmount <= 0 || numericAmount > available_commission) {
      return;
    }

    setLoading(true);
    const res = await marketing_withdrawal_request_create({
      amount: numericAmount,
    });
    setLoading(false);

    if (res.success) {
      addToast({
        title: "درخواست تسویه ثبت شد.",
        description: "درخواست شما با موفقیت ثبت شد و در حال بررسی است.",
        color: "success",
      });
      setAmount("");
    } else {
      const errors = res?.data || res?.errors || {};
      const nonFieldErrors = errors?.non_field_errors;

      addToast({
        title: nonFieldErrors?.[0] || res.message || "خطا در ارسال درخواست",
        color: "danger",
      });
    }
  };

  return (
    <div className="space-y-4">
      <p>موجودی قابل برداشت: {available_commission.toLocaleString()} تومان</p>

      <input
        type="number"
        className="input w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        placeholder={
          available_commission === 0
            ? "شما در حال حاضر درآمدی برای تسویه ندارید"
            : "غیر فعال"
        }
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min={0}
        max={available_commission}
        readOnly={
          loading ||
          !amount ||
          parseInt(amount) <= 0 ||
          parseInt(amount) > available_commission ||
          available_commission === 0
        }
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-transparent border border-green-400 text-green-600  py-2 rounded-lg hover:bg-green-100 transition-colors disabled:pointer-events-none disabled:opacity-50"
        disabled={
          loading ||
          !amount ||
          parseInt(amount) <= 0 ||
          parseInt(amount) > available_commission
        }
      >
        {loading ? "در حال ارسال..." : "درخواست تسویه حساب"}
      </button>
    </div>
  );
}
