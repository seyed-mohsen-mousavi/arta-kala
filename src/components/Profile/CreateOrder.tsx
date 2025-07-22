"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useCart } from "@/context/CartContextProvider";
import { useUser } from "@/context/UserContext";
import { addToast } from "@heroui/toast";
import provincesWithCitiesRaw from "@/data/iran.json";

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

  const [formData, setFormData] = useState<FormData>({
    name_receiver: `${user?.identity.first_name || ""} ${user?.identity.last_name || ""}`,
    receiver_phone: user?.identity.phone_number || "",
    receiver_province: user?.identity.province || "",
    receiver_city: user?.identity.city || "",
    address_receiver: user?.identity.address || "",
    receiver_postal_code: user?.identity.postal_code || "",
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
    const requiredFields = [
      "name_receiver",
      "receiver_phone",
      "receiver_province",
      "receiver_city",
      "address_receiver",
      "receiver_postal_code",
    ];

    const newErrors: Errors = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof FormData])
        newErrors[field] = "این فیلد ضروری است";
    });

    if (formData.name_receiver && formData.name_receiver.trim().length < 3) {
      newErrors.name_receiver = "نام گیرنده باید حداقل ۳ کاراکتر باشد.";
    }

    const phoneRegex = /^09\d{9}$/;
    if (formData.receiver_phone && !phoneRegex.test(formData.receiver_phone)) {
      newErrors.receiver_phone =
        "شماره موبایل معتبر نیست (باید با 09 شروع شود و 11 رقم باشد).";
    }

    const postalCodeRegex = /^\d{10}$/;
    if (
      formData.receiver_postal_code &&
      !postalCodeRegex.test(formData.receiver_postal_code)
    ) {
      newErrors.receiver_postal_code = "کد پستی باید دقیقاً ۱۰ رقم باشد.";
    }

    if (!selectedShippingServiceId) {
      newErrors.shipping_service = "لطفاً سرویس باربری را انتخاب کنید";
    }

    if (!cart || cart.total_items === 0) {
      addToast({
        title: "سبد خرید خالی است",
        description: "لطفاً ابتدا محصولی به سبد خرید اضافه کنید.",
        color: "warning",
      });
      return false;
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

    const logData = {
      shipping_service_id: selectedShippingServiceId,
      discount_code: formData.discount_code || "",
      name_receiver: formData.name_receiver,
      receiver_phone: formData.receiver_phone,
      receiver_province: formData.receiver_province,
      receiver_city: formData.receiver_city,
      address_receiver: formData.address_receiver,
      receiver_postal_code: formData.receiver_postal_code,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        title: "سفارش آماده ثبت است",
        description: "می‌توانید ادامه دهید...",
        color: "success",
      });
      console.log("📦 سفارش آماده ارسال:", JSON.stringify(logData, null, 2));
    }, 1500);
  };

  return (
    <form
      onSubmit={createOrder}
      className="grid md:grid-cols-5 gap-6 p-5  rounded max-w-7xl mx-auto"
    >
      <div className="col-span-3 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-4">مشخصات گیرنده سفارش</h1>

        <div className="space-y-1">
          <label className="block">نام گیرنده</label>
          <input
            name="name_receiver"
            value={formData.name_receiver}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${errors.name_receiver ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
          />
          {errors.name_receiver && <p className="text-red-500 text-sm">{errors.name_receiver}</p>}
        </div>

        <div className="space-y-1">
          <label className="block">شماره موبایل</label>
          <input
            name="receiver_phone"
            value={formData.receiver_phone}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${errors.receiver_phone ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
          />
          {errors.receiver_phone && <p className="text-red-500 text-sm">{errors.receiver_phone}</p>}
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
          {errors.receiver_province && <p className="text-red-500 text-sm">{errors.receiver_province}</p>}
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
          {errors.receiver_city && <p className="text-red-500 text-sm">{errors.receiver_city}</p>}
        </div>

        <div className="space-y-1">
          <label className="block">آدرس کامل</label>
          <textarea
            name="address_receiver"
            value={formData.address_receiver}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${errors.address_receiver ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
          />
          {errors.address_receiver && <p className="text-red-500 text-sm">{errors.address_receiver}</p>}
        </div>

        <div className="space-y-1">
          <label className="block">کد پستی</label>
          <input
            name="receiver_postal_code"
            value={formData.receiver_postal_code}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 ${errors.receiver_postal_code ? "!border-red-500 placeholder:text-red-300" : "border-gray-300"} input`}
          />
          {errors.receiver_postal_code && <p className="text-red-500 text-sm">{errors.receiver_postal_code}</p>}
        </div>

        <div className="space-y-1">
          <label className="block">کد تخفیف (اختیاری)</label>
          <input
            name="discount_code"
            value={formData.discount_code}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 border-gray-300"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium">سرویس باربری</label>
          {shippingServices.map((service) => (
            <label
              key={service.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="shipping_service"
                value={service.id}
                checked={selectedShippingServiceId === service.id}
                onChange={() => setSelectedShippingServiceId(service.id)}
              />
              <span>{service.name}</span>
              {service.description && (
                <small className="text-gray-500">({service.description})</small>
              )}
            </label>
          ))}
          {errors.shipping_service && (
            <p className="text-sm text-red-600">{errors.shipping_service}</p>
          )}
        </div>
      </div>
      <div className="col-span-3 md:col-span-2 shadow rounded-lg h-auto p-5 space-y-2 border border-zinc-300 sticky mb-auto">
        <div className="flex items-center justify-between ">
          <p>قیمت کالاها ({cart.total_items.toLocaleString("fa-IR")} کالا)</p>
          <p className="font-semibold">
            {cart.total_price.toLocaleString("fa-IR")}
            <span className="pr-1 text-xs">تومان</span>
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <p>قیمت کالاها ({cart.total_items.toLocaleString("fa-IR")} کالا)</p>
          <p className="font-semibold">
            {cart.total_price.toLocaleString("fa-IR")}
            <span className="pr-1 text-xs">تومان</span>
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <p>جمع خرید</p>
          <p className="font-semibold">
            {cart.total_price.toLocaleString("fa-IR")}
            <span className="pr-1 text-xs">تومان</span>
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <p>مالیات بر ارزش افزوده</p>
          <p className="font-semibold">
            ۰ <span className="pr-1 text-xs">تومان</span>
          </p>
        </div>
        <hr className="text-zinc-300 my-3" />
        <div className="flex items-center justify-between text-lg font-semibold">
          <p>مبلغ قابل پرداخت</p>
          <p className="font-semibold">
            {cart.total_price.toLocaleString("fa-IR")}
            <span className="text-sm pr-1">تومان</span>
          </p>
        </div>
        <hr className="text-zinc-300 my-3" />
        <button
          type="submit"
          className="btn-primary w-full relative font-semibold"
        >
          ثبت نهایی{" "}
          {/* <IoCartOutline className="size-8 absolute right-5 top-2.5" /> */}
        </button>
      </div>
    </form>
  );
};

export default CreateOrder;
