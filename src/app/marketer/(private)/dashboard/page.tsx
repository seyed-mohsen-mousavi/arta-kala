import { GetUserDashboard } from "@/services/authActions";
import { marketing_profile_list } from "@/services/marketingActions";
import { formatShamsiDateString } from "@/utils/formatShamsiDateString";
import { Activity, ArrowDown, CircleAlert, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getBankClass } from "@/data/iranianBanks";
import { convertPersianToEnglish } from "@/utils/converNumbers";
import "iranianbanklogos/dist/ibl.css";
import SettlementBox from "./SettlementBox";

import Chart from "./Chart";

function toPersianNumber(input: string) {
  const enToFa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.replace(/\d/g, (d) => enToFa[+d]);
}

function formatCardNumber(value: string) {
  const enOnly = value.replace(/\D/g, "").slice(0, 16);
  const withSpaces = enOnly.replace(/(.{4})/g, "$1 ").trim();
  return toPersianNumber(withSpaces);
}
async function page() {
  const { identity: user } = await GetUserDashboard();
  const res = await marketing_profile_list();
  if (!res.success || !res.data) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-red-500">
          خطا در بارگذاری اطلاعات بازاریاب
        </h1>
        <p className="text-zinc-500">لطفاً بعداً دوباره تلاش کنید.</p>
        <p className="text-zinc-500">
          اگر مشکل ادامه داشت، با پشتیبانی تماس بگیرید.
        </p>
        <Link
          href={"/"}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  const data = res.data;
  const cardNumberFormatted = formatCardNumber(data.card_number || "");
  const bankClass = data.card_number
    ? getBankClass(convertPersianToEnglish(data.card_number))
    : null;
  return (
    <section>
      <h1 className="text-5xl font-bold py-2">داشبورد بازاریاب </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 w-full mt-4 gap-5">
        <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-3 bg-white p-4 rounded-xl">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="bg-red-200 rounded-lg w-5 h-10" />
              <h2 className="font-semibold text-xl">نمای کلی</h2>
            </div>
          </div>

          <div className="p-1.5 rounded-xl bg-zinc-100 flex max-md:flex-col font-pelak">
            <div className="w-full h-full bg-white flex p-3 items-start gap-2 rounded-lg shadow justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-200  p-2 rounded-full">
                  <ShoppingBag className="text-zinc-700" />
                </div>
                <div className="space-y-2">
                  <p className="text-zinc-500 inline-flex items-center gap-3">
                    تعداد سفارش‌ها
                    <CircleAlert className="size-5 fill-zinc-500 text-white" />
                  </p>
                  <h3 className="text-5xl font-semibold">
                    {data.orders?.length ?? 0}
                  </h3>
                </div>
              </div>
              <div>
                {/* اینجا می‌تونی درصد تغییر رو اضافه کنی اگر داری */}
                <div className="bg-red-100 text-orange-400  px-1 rounded-lg flex items-center font-semibold">
                  33%
                  <ArrowDown className="size-5" />
                </div>
              </div>
            </div>

            <div className="w-full h-full flex p-3 items-start gap-2 rounded-lg  justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-purple-300  p-2 rounded-full">
                  <Activity className="text-zinc-700" />
                </div>
                <div className="space-y-2">
                  <p className="text-zinc-500 inline-flex items-center gap-3">
                    کل پورسانت
                    <CircleAlert className="size-5 fill-zinc-500 text-white" />
                  </p>
                  <h3 className="text-5xl font-semibold">
                    {data.total_commission ?? 0}%
                  </h3>
                </div>
              </div>
              {/* <div>
                <div className="bg-zinc-50 text-green-400  px-1 rounded-lg flex items-center font-semibold">
                  33%
                  <ArrowUp className="size-5" />
                </div>
              </div> */}
            </div>
          </div>

          <div className="flex items-center gap-2 justify-between mt-2">
            <p className="text-zinc-500 text-sm max-w-sm">
              خوش آمدید، شما{" "}
              <b className="text-black">{res.data.orders.length} سفارش</b>{" "}
              دارید.
            </p>
            <button className="border border-zinc-400 text-zinc-500 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors ">
              مشاهده همه سفارش‌ها
            </button>
          </div>
        </div>

        <div className="sm:col-span-2 ">
          <div className="bg-white p-4 rounded-xl h-full ">
            <div className="flex items-center gap-2 ">
              <div className="bg-green-200 rounded-lg w-5 h-10" />
              <h2 className="font-semibold text-xl">گزارش مالی</h2>
            </div>
            <div className="mt-4 flex justify-between font-pelak">
              <div className="space-y-4 ">
                <p>
                  کل پورسانت: <b>{data.total_commission ?? 0}</b> تومان
                </p>
                <p>
                  پورسانت پرداخت‌شده: <b>{data.total_paid_commission ?? 0}</b>{" "}
                  تومان
                </p>
                <p>
                  درصد پورسانت: <b>{data.commission_percentage ?? "نامشخص"}</b>
                </p>
              </div>
              {/* data.available_commission > 0 && */}

              <SettlementBox
                available_commission={data.available_commission ?? 0}
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2 ">
          <div className="bg-white p-6 rounded-2xl h-full flex flex-col">
            <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
              <div className="bg-blue-200 rounded-lg w-6 h-12 flex items-center justify-center">
                <i className="fas fa-credit-card text-green-600 text-xl" />
              </div>
              <h2 className="font-semibold text-2xl text-gray-800">
                اطلاعات مالی
              </h2>
            </div>

            <div className="mt-5 flex flex-col gap-4 text-gray-700 flex-grow">
              <p>
                کدملی:{" "}
                <b className="text-gray-900">
                  {toPersianNumber(user.national_code)}
                </b>
              </p>
              <p>
                کدپستی:{" "}
                <b className="text-gray-900">
                  {toPersianNumber(user.postal_code)}
                </b>
              </p>

              <div className="pt-3 border-t border-gray-200">
                <p>
                  وضعیت کارت:{" "}
                  <b
                    className={
                      data.is_verified_card
                        ? "text-green-600 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {data.is_verified_card ? "تأیید شده" : "تأیید نشده"}
                  </b>
                </p>
                <div className="flex items-center gap-2 mt-1 ">
                  شماره کارت:{" "}
                  <p className="border border-zinc-200 p-2 rounded-lg flex items-center gap-2 h-16">
                    <span
                      dir="ltr"
                      className="font-dana tracking-widest text-xl font-semibold text-gray-900 mr-2"
                    >
                      {cardNumberFormatted || "-"}
                    </span>
                    {bankClass && (
                      <i
                        className={`ibl64 ${bankClass} scale-50 -mx-5`}
                        title="لوگوی بانک"
                      />
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <div className="bg-white p-4 rounded-xl h-full ">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-200 rounded-lg w-5 h-10" />
              <h2 className="font-semibold text-xl">اطلاعات فروشگاه</h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                نام فروشگاه (فارسی): <b>{data.store_name_persian}</b>
              </p>
              <p>
                نام فروشگاه (انگلیسی): <b>{data.store_name_english}</b>
              </p>
              <p>
                وضعیت حساب: <b>{data.status}</b>
              </p>
              <p>
                <span className=" text-zinc-900">تاریخ ایجاد:</span>{" "}
                <b>{formatShamsiDateString(res.data.created_at)}</b>
              </p>
              <p className="mt-1">
                <span className=" text-zinc-900">آخرین بروزرسانی:</span>{" "}
                <b>{formatShamsiDateString(res.data.updated_at)}</b>
              </p>
            </div>
          </div>
        </div>

        {/* <Chart /> */}
      </div>
    </section>
  );
}

export default page;
