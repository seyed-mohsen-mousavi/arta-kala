"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "iranianbanklogos/dist/ibl.css";
import { getBankClass } from "@/data/iranianBanks";
import { marketing_register_create } from "@/services/marketingActions";
import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";

function toPersianNumber(input: string) {
  const enToFa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.replace(/\d/g, (d) => enToFa[+d]);
}

function formatCardNumber(value: string) {
  const enOnly = value.replace(/\D/g, "").slice(0, 16);
  const withSpaces = enOnly.replace(/(.{4})/g, "$1 ").trim();
  return toPersianNumber(withSpaces);
}

const RegisterSchema = z.object({
  store_name_persian: z
    .string()
    .min(3, "نام فروشگاه (فارسی) الزامی است")
    .regex(
      /^[\u0600-\u06FF\s]+$/,
      "نام فروشگاه فارسی فقط باید شامل حروف فارسی باشد"
    ),

  store_name_english: z
    .string()
    .min(3, "نام فروشگاه (انگلیسی) الزامی است")
    .regex(
      /^[a-zA-Z\s]+$/,
      "نام فروشگاه انگلیسی فقط باید شامل حروف انگلیسی باشد"
    ),

  card_number: z
    .string()
    .length(16, "شماره کارت باید ۱۶ رقم باشد")
    .regex(/^\d+$/, "شماره کارت فقط باید شامل ارقام باشد"),
});
type RegisterInputs = z.infer<typeof RegisterSchema>;

function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formattedCard, setFormattedCard] = useState("");
  const [bankClass, setBankClass] = useState<string | null>(null);
  const [showCompleteProfileModal, setShowCompleteProfileModal] =
    useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterInputs>({
    resolver: zodResolver(RegisterSchema),
  });

  const cardNumberRaw = watch("card_number");

  React.useEffect(() => {
    if (!cardNumberRaw) {
      setFormattedCard("");
      setBankClass(null);
      return;
    }

    const digitsOnly = cardNumberRaw.replace(/\D/g, "").slice(0, 16);
    setValue("card_number", digitsOnly, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setFormattedCard(formatCardNumber(digitsOnly));

    if (digitsOnly.length >= 6) {
      const cls = getBankClass(digitsOnly);
      setBankClass(cls);
    } else {
      setBankClass(null);
    }
  }, [cardNumberRaw, setValue]);

  const onSubmit = async (data: RegisterInputs) => {
    setIsSubmitting(true);
    const res = await marketing_register_create(data);
    if (!res.success && res.errors && res.status === 400) {
      setShowCompleteProfileModal(true);
    } else {
      router.push("/marketer");
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4 mt-10"
    >
      {showCompleteProfileModal && (
        <CompleteProfileModal
          onClose={() => setShowCompleteProfileModal(false)}
        />
      )}

      <div>
        <input
          type="text"
          placeholder="نام فروشگاه (فارسی)"
          {...register("store_name_persian")}
          className={`input !bg-white ${errors.store_name_persian ? "border !border-danger !text-danger" : ""}`}
        />
        {errors.store_name_persian && (
          <p className="text-red-500 text-sm">
            {errors.store_name_persian.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="نام فروشگاه (انگلیسی)"
          {...register("store_name_english")}
          className={`input !bg-white ${errors.store_name_english ? "border !border-danger !text-danger" : ""}`}
        />
        {errors.store_name_english && (
          <p className="text-red-500 text-sm">
            {errors.store_name_english.message}
          </p>
        )}
      </div>

      <div className="col-span-2 relative">
        <input
          type="text"
          placeholder="شماره کارت ۱۶ رقمی"
          maxLength={19}
          value={formattedCard}
          onChange={(e) => {
            const persianDigits = [
              "۰",
              "۱",
              "۲",
              "۳",
              "۴",
              "۵",
              "۶",
              "۷",
              "۸",
              "۹",
            ];
            const englishValue = e.target.value.replace(/[۰-۹]/g, (d) =>
              persianDigits.indexOf(d).toString()
            );
            const onlyDigits = englishValue.replace(/\D/g, "").slice(0, 16);
            setValue("card_number", onlyDigits, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          className={`input !bg-white w-full ${bankClass ? "!pr-16" : ""} transition-all ease-linear ${errors.card_number ? "border !border-danger !text-danger" : ""} `}
          style={{ direction: "ltr", textAlign: "right" }}
        />
        {errors.card_number && (
          <p className="text-red-500 text-sm">{errors.card_number.message}</p>
        )}
        {bankClass && (
          <i
            className={`ibl64 ${bankClass} absolute -top-4 -right-5 scale-50`}
            title="لوگوی بانک"
          />
        )}
      </div>

      <button
        type="submit"
        className="btn-primary w-full font-bold text-base md:text-lg col-span-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "در حال ثبت..." : "ثبت نام به عنوان بازاریاب"}
      </button>
    </form>
  );
}

export default RegisterForm;
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function CompleteProfileModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-fade-in">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md text-center relative"
      >
        <FaExclamationTriangle className="text-primary-500 text-7xl mx-auto mb-3" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          اطلاعات شما کامل نیست
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
          لطفاً ابتدا اطلاعات هویتی خود را تکمیل کنید، سپس می‌توانید برای
          ثبت‌نام به عنوان بازاریاب اقدام کنید.
        </p>
        <Link
          href="/profile/dashboard"
          className="inline-block bg-primary text-white font-semibold rounded-lg px-4 py-2 hover:bg-primary-600 transition"
        >
          تکمیل اطلاعات حساب
        </Link>
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 transition"
          aria-label="بستن مودال"
        >
          ×
        </button>
      </div>
    </div>
  );
}
