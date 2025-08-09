import { marketing_profile_list } from "@/services/marketingActions";
import { redirect } from "next/navigation";

async function Rejected() {
  const res = await marketing_profile_list();
  if (!res.success || !res.data) {
    redirect("/marketer/register");
  }

  const marketer = res.data;
  if (marketer?.status === "pending") {
    redirect("/marketer/pending");
  } else if (marketer?.status == "approved") {
    redirect("/marketer/dashboard");
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <svg
          className="mx-auto mb-6 w-16 h-16 text-red-500 animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          درخواست رد شده
        </h1>
        <p className="text-gray-600">
          متأسفانه درخواست شما رد شده است. لطفاً اطلاعات خود را بررسی کنید و در
          صورت نیاز با تیم ما تماس بگیرید.
          <br />
          باتشکر از درخواست شما🌹
        </p>
      </div>
    </div>
  );
}

export default Rejected;
