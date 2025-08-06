// app/payment/verify/page.tsx
import { FaSpinner } from "react-icons/fa6";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50">
      <FaSpinner className="animate-spin text-primary-500 size-16 mb-6" />

      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        در حال بررسی پرداخت شما هستیم...
      </h1>

      <p className="text-gray-600">
        لطفاً منتظر بمانید، در حال تأیید وضعیت پرداخت با بانک هستیم.
      </p>
    </div>
  );
}
