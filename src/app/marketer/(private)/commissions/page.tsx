import { marketing_commissions_list } from "@/services/marketingActions";
import Link from "next/link";
import React from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

interface Commission {
  id: number;
  name: string;
  amount: number;
}

async function Commissions() {
  let result;
  try {
    result = await marketing_commissions_list();
  } catch {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-danger border border-red-100 rounded-xl h-full max-w-md mx-auto">
        <FaExclamationTriangle className="text-danger mb-4" size={48} />
        <p className="text-lg font-semibold">
          خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.
        </p>
      </div>
    );
  }
  if (!result?.success || !result.data) {
    return (
      <div className="flex flex-col items-center justify-center p-8  h-screen max-w-md mx-auto">
        <div className=" rounded-xl flex flex-col items-center justify-center p-8 text-danger border border-red-100">
          <FaExclamationTriangle
            className="text-danger xl:size-20 mb-4"
            size={48}
          />
          <p className="text-lg xl:text-2xl font-semibold">
            خطا در بارگذاری داده‌ها.
          </p>
        </div>
      </div>
    );
  }

  const { commissions }: { commissions: Commission[] } = result.data;

  if (commissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto">
        <div className="text-gray-500 bg-gray-100 rounded-xl flex flex-col items-center justify-center p-8">
          <FaInfoCircle className="text-gray-500 xl:size-20 mb-4" size={48} />
          <p className="text-lg xl:text-2xl font-semibold">
            هیچ کمیسیونی موجود نیست.
          </p>
          <Link
            href={"/marketer/dashboard"}
            className="mt-4 px-6 py-2 text-blue-500 underline underline-offset-2 rounded-lg hover:text-blue-600 transition-colors"
          >
            بازگشت به داشبورد
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>کمیسیون‌ها</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {commissions.map((comm) => (
          <li
            key={comm.id}
            style={{
              background: "#e9f7ef",
              marginBottom: "0.5rem",
              padding: "0.75rem 1rem",
              borderRadius: 8,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <span>{comm.name}</span>
            <span style={{ color: "#198754" }}>
              {comm.amount.toLocaleString()} تومان
            </span>
            <FaCheckCircle color="#198754" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Commissions;
