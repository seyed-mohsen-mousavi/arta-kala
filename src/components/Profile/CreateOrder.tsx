"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCart } from "@/context/CartContextProvider";
import { useUser } from "@/context/UserContext";
import { addToast } from "@heroui/toast";
import provincesWithCitiesRaw from "@/data/iran.json";
import { Checkbox, Radio, RadioGroup } from "@heroui/react";
import {
  createDiscountedOrder,
  createNormalOrder,
} from "@/services/shopActions";
import Link from "next/link";

const provincesWithCities: Record<string, string[]> =
  provincesWithCitiesRaw as Record<string, string[]>;

interface ShippingService {
  id: number;
  name: string;
  description?: string;
  is_default?: boolean;
}

interface CreateOrderProps {
  shippingServices: ShippingService[];
}

interface FormData {
  name_receiver: string;
  receiver_phone: string;
  receiver_province: string;
  receiver_city: string;
  address_receiver: string;
  receiver_postal_code: string;
  discount_code: string;
}

interface Errors {
  [key: string]: string;
}

const CreateOrder = ({ shippingServices }: CreateOrderProps) => {
  const { user } = useUser();
  const { cart } = useCart();
  const [isSelfReceiver, setIsSelfReceiver] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name_receiver: "",
    receiver_phone: "",
    receiver_province: "",
    receiver_city: "",
    address_receiver: "",
    receiver_postal_code: "",
    discount_code: "",
  });

  const [selectedShippingServiceId, setSelectedShippingServiceId] = useState<
    number | null
  >(
    shippingServices.find((s) => s.is_default)?.id ||
      (shippingServices.length > 0 ? shippingServices[0].id : null)
  );

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedProvince = formData.receiver_province;
  const cities: string[] = provincesWithCities[selectedProvince] || [];
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [checkingDiscount, setCheckingDiscount] = useState(false);

  const handleSelfReceiverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsSelfReceiver(checked);

    if (checked && user?.identity) {
      setFormData((prev) => ({
        ...prev,
        name_receiver: `${user.identity.first_name || ""} ${user.identity.last_name || ""}`,
        receiver_phone: user.identity.phone_number || "",
        receiver_province: user.identity.province || "",
        receiver_city: user.identity.city || "",
        address_receiver: user.identity.address || "",
        receiver_postal_code: user.identity.postal_code || "",
      }));
      setErrors({});
    } else if (!checked) {
      setFormData((prev) => ({
        ...prev,
        name_receiver: "",
        receiver_phone: "",
        receiver_province: "",
        receiver_city: "",
        address_receiver: "",
        receiver_postal_code: "",
      }));
    }
  };

  const handleCheckDiscount = async () => {
    if (!formData.discount_code) return;

    setCheckingDiscount(true);
    try {
      const res = await fetch("/api/shop/discount/check/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: formData.discount_code }),
      });

      const result = await res.json();

      if (!res.ok || !result?.data?.discount_percentage) {
        throw new Error(result.message || "کد تخفیف معتبر نیست.");
      }

      const discountData = result.data;

      const calculatedDiscount = Math.floor(
        (cart.total_price * discountData.discount_percentage) / 100
      );

      setDiscountAmount(calculatedDiscount);
      setDiscountApplied(true);
      addToast({
        title: "کد تخفیف اعمال شد",
        description: `٪${discountData.discount_percentage} تخفیف معادل ${calculatedDiscount.toLocaleString(
          "fa-IR"
        )} تومان از سبد خرید کسر شد.`,
        color: "success",
      });
    } catch (error: any) {
      setDiscountApplied(false);
      setDiscountAmount(0);
      addToast({
        title: "خطا در کد تخفیف",
        description: error.message || "کد تخفیف معتبر نیست.",
        color: "danger",
      });
    } finally {
      setCheckingDiscount(false);
    }
  };

  const removeDiscount = () => {
    setDiscountApplied(false);
    setDiscountAmount(0);
    setFormData((prev) => ({
      ...prev,
      discount_code: "",
    }));
    addToast({
      title: "کد تخفیف حذف شد",
      description: "کد تخفیف از سفارش شما حذف شد.",
      color: "warning",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!cart || cart.total_items === 0) {
      addToast({
        title: "سبد خرید خالی است",
        description: "لطفاً ابتدا محصولی به سبد خرید اضافه کنید.",
        color: "warning",
      });
      return false;
    }

    if (!selectedShippingServiceId) {
      newErrors.shipping_service = "لطفاً سرویس باربری را انتخاب کنید";
    }

    if (isSelfReceiver) {
      if (
        !user?.identity?.first_name ||
        !user?.identity?.last_name ||
        !user?.identity?.phone_number ||
        !user?.identity?.province ||
        !user?.identity?.city ||
        !user?.identity?.address ||
        !user?.identity?.postal_code
      ) {
        addToast({
          title: "اطلاعات گیرنده ناقص است",
          description:
            "برای ثبت سفارش به عنوان گیرنده خودتان، لطفاً اطلاعات شخصی خود را در پروفایل کامل کنید.",
          color: "warning",
          endContent: (
            <Link
              href="/profile/dashboard"
              className="bg-primary text-white px-3 py-2 rounded-xs hover:brightness-90 transition-colors duration-300 ease-in-out text-[10px]"
            >
              پروفایل
            </Link>
          ),
        });
        return false;
      }
    } else {
      const requiredFields = [
        "name_receiver",
        "receiver_phone",
        "receiver_province",
        "receiver_city",
        "address_receiver",
        "receiver_postal_code",
      ];

      requiredFields.forEach((field) => {
        if (!formData[field as keyof FormData])
          newErrors[field] = "این فیلد ضروری است";
      });

      if (formData.name_receiver && formData.name_receiver.trim().length < 3) {
        newErrors.name_receiver = "نام گیرنده باید حداقل ۳ کاراکتر باشد.";
      }

      const phoneRegex = /^09\d{9}$/;
      if (
        formData.receiver_phone &&
        !phoneRegex.test(formData.receiver_phone)
      ) {
        newErrors.receiver_phone = "شماره موبایل معتبر نیست.";
      }

      const postalCodeRegex = /^\d{10}$/;
      if (
        formData.receiver_postal_code &&
        !postalCodeRegex.test(formData.receiver_postal_code)
      ) {
        newErrors.receiver_postal_code = "کد پستی باید دقیقاً ۱۰ رقم باشد.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !user.identity) {
      addToast({
        title: "خطا",
        description: "اطلاعات کاربری یافت نشد.",
        color: "danger",
      });
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    const discountedItems = cart.items.filter((item) => item.final_price);
    const normalItems = cart.items.filter((item) => !item.final_price);

    const basePayload = {
      shipping_service_id: selectedShippingServiceId,
      discount_code: formData.discount_code || "",
      name_receiver: isSelfReceiver
        ? `${user.identity.first_name || ""} ${user.identity.last_name || ""}`
        : formData.name_receiver,
      receiver_phone: isSelfReceiver
        ? user.identity.phone_number || ""
        : formData.receiver_phone,
      receiver_province: isSelfReceiver
        ? user.identity.province || ""
        : formData.receiver_province,
      receiver_city: isSelfReceiver
        ? user.identity.city || ""
        : formData.receiver_city,
      address_receiver: isSelfReceiver
        ? user.identity.address || ""
        : formData.address_receiver,
      receiver_postal_code: isSelfReceiver
        ? user.identity.postal_code || ""
        : formData.receiver_postal_code,
    };

    const requests = [];

    if (discountedItems.length > 0) {
      requests.push(
        createDiscountedOrder({
          ...basePayload,
          cart_items: discountedItems,
        })
      );
    }

    if (normalItems.length > 0) {
      requests.push(
        createNormalOrder({
          ...basePayload,
          cart_items: normalItems,
        })
      );
    }
    const responses = await Promise.all(requests);
    setIsSubmitting(false);

    const allSuccessful = responses.every((res) => res && res.success);
    if (allSuccessful) {
      let redirectUrl = "/profile/pre-invoices";
      if (responses[0]?.data?.id) {
        redirectUrl = `/profile/orders/${responses[0].data.id}`;
      } else if (responses[1]?.data?.id) {
        redirectUrl = `/profile/orders/${responses[1].data.id}`;
      }

      addToast({
        title: "سفارش با موفقیت ثبت شد",
        description: "متشکریم از خرید شما!",
        color: "success",
      });

      location.replace(redirectUrl);
    } else {
      const failed = responses.find((res) => !res.success);
      addToast({
        title: "خطا در ثبت سفارش",
        description: failed?.message || "مشکلی پیش آمد، دوباره تلاش کنید.",
        color: "danger",
      });
    }
  };

  return (
    <form
      onSubmit={createOrder}
      className="grid md:grid-cols-5 gap-6 p-5 rounded max-w-7xl mx-auto"
    >
      <div className="col-span-3 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-4">مشخصات گیرنده سفارش</h1>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isSelfReceiver}
            onChange={handleSelfReceiverChange}
            defaultSelected
            id="selfReceiver"
          >
            گیرنده خودم هستم
          </Checkbox>
        </div>
        {!isSelfReceiver && (
          <>
            <div className="space-y-1">
              <label className="block">نام و نام خانوادگی گیرنده</label>
              <input
                name="name_receiver"
                value={formData.name_receiver}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.name_receiver ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
              />
              {errors.name_receiver && (
                <p className="text-red-500 text-sm">{errors.name_receiver}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block">شماره موبایل</label>
              <input
                name="receiver_phone"
                value={formData.receiver_phone}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.receiver_phone ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
              />
              {errors.receiver_phone && (
                <p className="text-red-500 text-sm">{errors.receiver_phone}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block">استان</label>
              <select
                name="receiver_province"
                value={formData.receiver_province}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.receiver_province ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
              >
                <option value="">انتخاب استان</option>
                {Object.keys(provincesWithCities).map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.receiver_province && (
                <p className="text-red-500 text-sm">
                  {errors.receiver_province}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block">شهر</label>
              <select
                name="receiver_city"
                value={formData.receiver_city}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.receiver_city ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
                disabled={!formData.receiver_province}
              >
                <option value="">انتخاب شهر</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.receiver_city && (
                <p className="text-red-500 text-sm">{errors.receiver_city}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block">آدرس کامل</label>
              <textarea
                name="address_receiver"
                value={formData.address_receiver}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.address_receiver ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
              />
              {errors.address_receiver && (
                <p className="text-red-500 text-sm">
                  {errors.address_receiver}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block">کد پستی</label>
              <input
                name="receiver_postal_code"
                value={formData.receiver_postal_code}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${errors.receiver_postal_code ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
              />
              {errors.receiver_postal_code && (
                <p className="text-red-500 text-sm">
                  {errors.receiver_postal_code}
                </p>
              )}
            </div>
          </>
        )}
        <div className="space-y-1">
          <label className="block">کد تخفیف (اختیاری)</label>
          <div className="flex gap-2">
            <input
              name="discount_code"
              value={formData.discount_code}
              onChange={handleChange}
              className="input flex-1 border rounded px-3 py-2 border-gray-300"
              readOnly={discountApplied}
            />
            <button
              type="button"
              onClick={discountApplied ? removeDiscount : handleCheckDiscount}
              className={`transition disabled:pointer-events-none rounded-md ${
                discountApplied
                  ? "bg-danger/10 border border-danger/40 text-danger/80  px-4 py-2"
                  : "btn-primary !px-4 py-2"
              }`}
              disabled={checkingDiscount}
            >
              {discountApplied
                ? "حذف کد تایید"
                : checkingDiscount
                  ? "در حال بررسی..."
                  : "بررسی کد"}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">سرویس باربری</label>
          <RadioGroup
            value={selectedShippingServiceId?.toString() || ""}
            onValueChange={(value) =>
              setSelectedShippingServiceId(Number(value))
            }
          >
            {shippingServices.map((service) => (
              <Radio
                key={service.id}
                value={service.id.toString()}
                className="flex items-start gap-2 p-2 rounded-md  w-full"
              >
                <div className="flex flex-col">
                  <span>{service.name}</span>
                  {service.description && (
                    <small className="text-gray-500">
                      {service.description}
                    </small>
                  )}
                </div>
              </Radio>
            ))}
          </RadioGroup>
          {errors.shipping_service && (
            <p className="text-sm text-red-600">{errors.shipping_service}</p>
          )}
        </div>
      </div>

      <div className="col-span-3 md:col-span-2 shadow rounded-lg h-auto p-5 space-y-2 border border-zinc-300 sticky mb-auto">
        <div className="flex items-center justify-between">
          <p>قیمت کالاها ({cart.total_items.toLocaleString("fa-IR")} کالا)</p>
          <p className="font-semibold">
            {cart.total_price.toLocaleString("fa-IR")}
            <span className="pr-1 text-xs">تومان</span>
          </p>
        </div>

        {discountAmount > 0 && (
          <div className="flex items-center justify-between text-green-700">
            <p>تخفیف</p>
            <p className="font-semibold">
              -{discountAmount.toLocaleString("fa-IR")}
              <span className="pr-1 text-xs">تومان</span>
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p>مالیات بر ارزش افزوده</p>
          <p className="font-semibold">
            ۰ <span className="pr-1 text-xs">تومان</span>
          </p>
        </div>

        <hr className="text-zinc-300 my-3" />

        <div className="flex items-center justify-between text-lg font-semibold">
          <p>مبلغ قابل پرداخت</p>
          <p className="font-semibold">
            {(cart.total_price - discountAmount).toLocaleString("fa-IR")}
            <span className="text-sm pr-1">تومان</span>
          </p>
        </div>

        <hr className="text-zinc-300 my-3" />

        <button
          type="submit"
          className="btn-primary w-full relative font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت نهایی"}
        </button>
      </div>
    </form>
  );
};

export default CreateOrder;
