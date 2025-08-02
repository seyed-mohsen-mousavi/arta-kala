import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

type ErrorMessageProps = {
  message?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: {
    icon: 24,
    title: "text-lg",
    desc: "text-sm",
    padding: "py-6",
  },
  md: {
    icon: 40,
    title: "text-xl",
    desc: "text-base",
    padding: "py-10",
  },
  lg: {
    icon: 60,
    title: "text-3xl",
    desc: "text-lg",
    padding: "py-16",
  },
};

export default function ErrorMessage({
  message = "خطا در دریافت اطلاعات",
  description = "موردی برای نمایش وجود ندارد یا خطایی در دریافت داده‌ها رخ داده است. لطفاً بعداً دوباره تلاش کنید.",
  size = "md",
  className = "",
}: ErrorMessageProps) {
  const { icon, title, desc, padding } = sizeMap[size];

  return (
    <div
      className={`w-full flex flex-col items-center justify-center ${padding} px-4 text-center text-red-700 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <AiOutlineWarning
        className="text-red-500 mb-4"
        size={icon}
        aria-hidden="true"
      />
      <h2 className={`font-semibold mb-2 ${title}`}>{message}</h2>
      <p className={`${desc} text-red-600 max-w-md`}>{description}</p>
    </div>
  );
}
