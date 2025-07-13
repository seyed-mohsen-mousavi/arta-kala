"use client";
import { useUser } from "@/context/UserContext";
import { convertNumberToPersian } from "@/utils/converNumbers";
import { FaRegEdit } from "react-icons/fa";
import { PiHandCoinsDuotone } from "react-icons/pi";
import provincesWithCities from "@/data/iran.json";
import { z } from "zod";
import { useState } from "react";
import { addToast } from "@heroui/toast";
import { editInfo } from "@/services/usersActions";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  first_name: z
    .string()
    .min(1, "نام الزامی است.")
    .regex(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است."),
  last_name: z.string().min(1, "نام خانوادگی الزامی است."),
  national_code: z.string().min(1, "کد ملی الزامی است."),
  job: z.string().min(1, "شغل الزامی است."),
  address: z.string().min(1, "آدرس الزامی است."),
  postal_code: z.string().min(1, "کد پستی الزامی است."),
  birth_date: z.string().min(1, "تاریخ تولد الزامی است."),
  province: z.string().min(1, "استان الزامی است."),
  city: z.string().min(1, "شهر الزامی است."),
  phone_number: z.string().optional(),
  referral_code: z.string().optional(),
  email: z.string().email("ایمیل معتبر نیست.").optional(),
});

type FormSchema = z.infer<typeof schema>;
type FieldKey = keyof FormSchema;

const inputTypes: Partial<Record<FieldKey, string>> = {
  email: "email",
  birth_date: "date",
  phone_number: "tel",
  postal_code: "number",
  national_code: "number",
};

function PersonalInfoForm() {
  const { user } = useUser();
  console.log(user)
  const identity = user?.identity;
  const defaultValues: FormSchema = {
    first_name: identity?.first_name || "",
    last_name: identity?.last_name || "",
    phone_number: identity?.phone_number || "",
    national_code: identity?.national_code || "",
    email: identity?.email || "",
    job: identity?.job || "",
    birth_date: identity?.birth_date || "",
    province: identity?.province || "",
    city: identity?.city || "",
    address: identity?.address || "",
    postal_code: identity?.postal_code || "",
    referral_code: identity?.referral_code || "",
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    setError,
  } = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(schema),
  });
const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const router = useRouter();
  const [editableFields, setEditableFields] = useState<
    Record<FieldKey, boolean>
  >(
    Object.keys(defaultValues).reduce(
      (acc, key) => {
        acc[key as FieldKey] = false;
        return acc;
      },
      {} as Record<FieldKey, boolean>
    )
  );

  const handleEditClick = (key: FieldKey) => {
    if (key === "phone_number" || key === "referral_code") return;
    setEditableFields((prev) => ({ ...prev, [key]: true }));
  };

  const onSubmit = async (data: FormSchema) => {
    try {
      const { phone_number, referral_code, ...filteredData } = data;

      const res = await editInfo(filteredData);

      if (res.success) {
        addToast({ title: "اطلاعات با موفقیت ویرایش شد", color: "success" });
        setIsSubmittedSuccessfully(true);
        router.refresh();
        setEditableFields(
          Object.keys(defaultValues).reduce(
            (acc, key) => {
              acc[key as FieldKey] = false;
              return acc;
            },
            {} as Record<FieldKey, boolean>
          )
        );
      } else {
        if (res.errors) {
          Object.entries(res.errors).forEach(([key, messages]) => {
            setError(key as FieldKey, {
              type: "server",
              message: Array.isArray(messages) ? messages[0] : messages,
            });
          });
        }
        if (res.message) {
          addToast({ title: res.message, color: "danger" });
        }
      }

      console.log(res);
    } catch (err) {
      addToast({ title: "خطا در ارسال اطلاعات", color: "danger" });
      console.error(err);
    }
  };

  const selectedProvince = watch("province");
  const cities =
    provincesWithCities[selectedProvince as keyof typeof provincesWithCities] ||
    [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2"
    >
      {(Object.entries(defaultValues) as [FieldKey, string][]).map(
        ([key, _]) => (
          <Controller
            key={key}
            name={key}
            control={control}
            render={({ field }) => (
              <div
                className={`flex flex-col gap-1 relative border bg-zinc-50 p-3 rounded-lg ${
                  errors[key] ? "border-red-500" : "border-zinc-300"
                }`}
              >
                <label className="text-lg font-semibold text-zinc-500">
                  {fieldLabel(key)}
                </label>

                {key === "province" ? (
                  <select
                    {...field}
                    disabled={!editableFields[key]}
                    className={` rounded-xl px-2 py-3 disabled:opacity-50 disabled:border-none border border-zinc-200 `}
                  >
                    <option value="">انتخاب کنید</option>
                    {Object.keys(provincesWithCities).map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                ) : key === "city" ? (
                  <select
                    {...field}
                    disabled={!editableFields[key] || !selectedProvince}
                    className={` rounded-xl px-2 py-3 disabled:opacity-50 disabled:border-none border border-zinc-200 `}
                  >
                    <option value="">انتخاب کنید</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    {...field}
                    type={inputTypes[key] || "text"}
                    disabled={!editableFields[key]}
                    placeholder={`${fieldLabel(key)} را وارد کنید`}
                    className={`w-full  rounded-xl px-2 py-3 placeholder:text-zinc-400 disabled:opacity-50 disabled:border-none border border-zinc-200 `}
                  />
                )}

                {errors[key] && (
                  <p className="text-red-500 text-sm">{errors[key]?.message}</p>
                )}

                {!editableFields[key] &&
                  key !== "phone_number" &&
                  key !== "referral_code" && (
                    <button
                      type="button"
                      className="mt-2 w-fit px-3 py-1 rounded text-primary-700 absolute left-2 top-2"
                      onClick={() => handleEditClick(key)}
                    >
                      <FaRegEdit className="inline size-4 ml-1" />
                    </button>
                  )}
              </div>
            )}
          />
        )
      )}

      <div className="col-span-2 text-left">
        <button
          type="submit"
          className="btn-primary rounded-lg !px-7 disabled:opacity-50"
          disabled={!isDirty || isSubmittedSuccessfully}
        >
          ویرایش اطلاعات
        </button>
      </div>

      <div className="absolute -top-4 left-0 bg-primary-100 border-primary text-zinc-600 animate-fade border px-4 py-1 rounded-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          <PiHandCoinsDuotone />
          <p className="text-sm font-semibold">امتیاز</p>
        </div>
        <span className="text-lg font-medium">
          {convertNumberToPersian(identity?.points || "")}
        </span>
      </div>
    </form>
  );
}

function fieldLabel(key: FieldKey): string {
  const labels: Record<FieldKey, string> = {
    first_name: "نام",
    last_name: "نام خانوادگی",
    national_code: "کد ملی",
    job: "شغل",
    address: "آدرس",
    postal_code: "کد پستی",
    birth_date: "تاریخ تولد",
    province: "استان",
    city: "شهر",
    phone_number: "شماره تلفن",
    referral_code: "کد معرف",
    email: "ایمیل",
  };
  return labels[key];
}

export default PersonalInfoForm;
