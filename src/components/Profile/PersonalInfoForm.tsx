"use client";
import { useUser } from "@/context/UserContext";
import { convertNumberToPersian } from "@/utils/converNumbers";
import { FaRegEdit } from "react-icons/fa";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { useState } from "react";
import { addToast } from "@heroui/toast";
import provincesWithCities from "@/data/iran.json";

type FieldKey = keyof typeof initialState;
type FieldTypeMap = {
  [key in FieldKey]?: string;
};

const inputTypes: FieldTypeMap = {
  email: "email",
  birth_date: "date",
  phone_number: "tel",
  postal_code: "number",
  national_code: "number",
};
const initialState = {
  first_name: "",
  last_name: "",
  phone_number: "",
  national_code: "",
  email: "",
  job: "",
  birth_date: "",
  province: "",
  city: "",
  address: "",
  postal_code: "",
  referral_code: "",
};

function InfoField({
  label,
  name,
  value,
  isEditable,
  onChange,
  onEditClick,
  cities,
  formData,
}: {
  label: string;
  name: FieldKey;
  value: string;
  isEditable: boolean;
  onChange: (name: FieldKey, value: string) => void;
  onEditClick: (name: FieldKey) => void;
  cities: any;
  formData: any;
}) {
  return (
    <div className="bg-zinc-50 border p-4 border-zinc-200 rounded flex justify-between items-start gap-2">
      <div className="flex flex-col gap-1 w-full">
        <label className="text-lg font-semibold text-zinc-500">{label}</label>
        {name === "province" ? (
          <select
            value={value}
            disabled={!isEditable}
            onChange={(e) => onChange(name, e.target.value)}
            className="bg-zinc-100 border border-zinc-400 disabled:bg-transparent disabled:border-none rounded-xl px-2 py-3"
          >
            <option value="">انتخاب کنید</option>
            {Object.keys(provincesWithCities).map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        ) : name === "city" ? (
          <select
            value={value}
            disabled={!isEditable || !formData.province}
            onChange={(e) => onChange(name, e.target.value)}
            className="bg-zinc-100 border border-zinc-400 disabled:bg-transparent disabled:border-none rounded-xl px-2 py-3"
          >
            <option value="">انتخاب کنید</option>
            {cities.map((city: any) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={inputTypes[name] || "text"}
            value={value.length > 0 ? value : isEditable ? "" : "تکمیل نشده"}
            disabled={!isEditable}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={`${label} را وارد کنید`}
            className={`w-full disabled:border-none focus:outline-none bg-zinc-100 border border-zinc-400 disabled:bg-transparent rounded-xl px-2 py-3 ${value.length === 0 ? "text-gray-400" : ""} placeholder:text-zinc-400`}
          />
        )}
      </div>
      {!isEditable && name !== "phone_number" && name !== "referral_code" && (
        <button
          type="button"
          className="bg-white p-2 rounded text-primary-700 shrink-0"
          onClick={() => onEditClick(name)}
        >
          <FaRegEdit className="size-5" />
        </button>
      )}
    </div>
  );
}

function PersonalInfoForm() {
  const { user } = useUser();

  const [formData, setFormData] = useState({ ...user?.identity });
  const [editableFields, setEditableFields] = useState<
    Record<FieldKey, boolean>
  >(
    Object.keys(initialState).reduce(
      (acc, key) => {
        acc[key as FieldKey] = false;
        return acc;
      },
      {} as Record<FieldKey, boolean>
    )
  );
  const [isChanged, setIsChanged] = useState(false);

  const identity = user?.identity;
  const cities =
    provincesWithCities[
      formData?.province as keyof typeof provincesWithCities
    ] || [];

  const handleFieldChange = (name: FieldKey, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (identity && value !== identity[name]) {
        setIsChanged(true);
      }
      return updated;
    });
  };

  const handleEditClick = (name: FieldKey) => {
    if (name === "phone_number" || name === "referral_code") return;
    setEditableFields((prev) => ({ ...prev, [name]: true }));
  };

  const isValidEmail = (email: string) => /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
  const isValidNationalCode = (code: string) => /^\d{10}$/.test(code);

  const handleSubmit = () => {
    if (!isValidNationalCode(formData?.national_code ?? "")) {
      addToast({ title: "کد ملی باید ۱۰ رقم باشد.", color: "danger" });
      return;
    }
    if (!isValidEmail(formData?.email ?? "")) {
      addToast({
        title: "ایمیل معتبر نیست.",
        description: "مثال : example@gmail.com",
        color: "danger",
      });
      return;
    }

    console.log("اطلاعات جدید:", formData);
    setIsChanged(false);
    setEditableFields(
      Object.keys(initialState).reduce(
        (acc, key) => {
          acc[key as FieldKey] = false;
          return acc;
        },
        {} as Record<FieldKey, boolean>
      )
    );
  };

  if (!user) {
    return <p>کاربری پیدا نشد</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
      {(
        [
          ["نام", "first_name"],
          ["نام خانوادگی", "last_name"],
          ["شماره تلفن", "phone_number"],
          ["کد ملی", "national_code"],
          ["ایمیل", "email"],
          ["شغل", "job"],
          ["تاریخ تولد", "birth_date"],
          ["استان", "province"],
          ["شهر", "city"],
          ["آدرس", "address"],
          ["کد پستی", "postal_code"],
          ["کد معرف", "referral_code"],
        ] as [string, FieldKey][]
      ).map(([label, key]) => (
        <InfoField
          cities={cities}
          key={key}
          label={label}
          name={key}
          value={formData[key] || ""}
          isEditable={editableFields[key]}
          onChange={handleFieldChange}
          onEditClick={handleEditClick}
          formData={formData}
        />
      ))}

      <div className="col-span-2 text-left">
        <button
          onClick={handleSubmit}
          className="btn-primary rounded-lg !px-7 disabled:opacity-50"
          disabled={!isChanged}
        >
          ویرایش اطلاعات
        </button>
      </div>

      {/* Badge امتیاز */}
      <div className="flex items-center justify-between gap-3 absolute -top-4 left-0 bg-primary-100 border-primary text-zinc-600 animate-fade border px-4 py-1 rounded-full">
        <div className="flex items-center gap-1">
          <PiHandCoinsDuotone />
          <p className="text-sm font-semibold">امتیاز</p>
        </div>
        <span className="text-lg font-medium">
          {convertNumberToPersian(identity?.points || "")}
        </span>
      </div>
    </div>
  );
}

export default PersonalInfoForm;
