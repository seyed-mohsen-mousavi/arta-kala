"use client";
import {
  Checkbox,
  InputOtp,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiXMark } from "react-icons/hi2";
import { MdChevronLeft } from "react-icons/md";
import {
  LoginFormValues,
  loginSchema,
  OtpFormValues,
  otpSchema,
  SignupFormValues,
  signupSchema,
} from "@/schemas/authSchema";
import { convertPersianToEnglish } from "@/utils/converNumbers";
import { login, sendOtp, verifyOtp } from "@/services/usersActions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuthModal } from "@/context/AuthModalProvider";
import api from "@/services/api";

export default function AuthModal() {
  const { isOpen, onOpenChange, onClose } = useAuthModal();
  const [step, setStep] = useState<"PHONE" | "OTP" | "PASSWORD">("PHONE");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const phoneForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const checkPhoneNumber = async ({ phone_number }: SignupFormValues) => {
    const converted = convertPersianToEnglish(phone_number);
    setPhoneNumber(converted);

    // فرضی: چک می‌کنیم آیا کاربر وجود دارد یا نه
    const result = await sendOtp(converted);

    if (result?.status === 200) {
      setStep(result?.data?.exists ? "PASSWORD" : "OTP");
    }
  };

  const onPasswordLogin = async ({
    phone_number,
    password,
  }: LoginFormValues) => {
    const result = await login(convertPersianToEnglish(phone_number), password);
    if (result?.status === 200) {
      loginForm.reset();
      onClose();
      const params = new URLSearchParams(searchParams.toString());
      if (params.has("AuthRequired")) params.delete("AuthRequired");
      router.replace(params.toString() ? `${pathName}?${params}` : pathName);
    }
  };

  const onOtpSubmit = async (data: OtpFormValues) => {
    await verifyOtp(phoneNumber, data.code, data.referral_code);
    onClose();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "OTP" && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, canResend]);

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      className="max-w-full max-h-full h-full m-0 sm:max-w-lg sm:h-auto"
    >
      <ModalContent className="text-sm rounded-sm overflow-auto h-full">
        {(onClose) => (
          <form
            onSubmit={
              step === "PHONE"
                ? phoneForm.handleSubmit(checkPhoneNumber)
                : step === "OTP"
                  ? otpForm.handleSubmit(onOtpSubmit)
                  : loginForm.handleSubmit(onPasswordLogin)
            }
            className="w-full h-full flex flex-col justify-between"
          >
            <ModalHeader className="flex items-center justify-between">
              <p>ورود | ثبت‌نام</p>
              <button type="button" onClick={onClose}>
                <HiXMark className="size-6" />
              </button>
            </ModalHeader>

            <ModalBody>
              {step === "PHONE" && (
                <>
                  <label htmlFor="phone_number">شماره تلفن</label>
                  <input
                    {...phoneForm.register("phone_number")}
                    maxLength={11}
                    className="input"
                    id="phone_number"
                    inputMode="numeric"
                  />
                  {phoneForm.formState.errors.phone_number && (
                    <p className="text-xs text-red-500">
                      {phoneForm.formState.errors.phone_number.message}
                    </p>
                  )}
                </>
              )}

              {step === "PASSWORD" && (
                <>
                  <label>رمز عبور</label>
                  <input
                    {...loginForm.register("password")}
                    type="password"
                    className="input"
                    id="password"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-red-500">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </>
              )}

              {step === "OTP" && (
                <>
                  <div className="bg-green-100 border border-green-200 p-4 text-zinc-600 rounded-sm">
                    کد تایید برای شماره {phoneNumber} ارسال شد
                  </div>
                  <label>کد تایید</label>
                  <InputOtp
                    {...otpForm.register("code")}
                    errorMessage={otpForm.formState.errors?.code?.message}
                    isInvalid={!!otpForm.formState.errors.code}
                    length={6}
                    dir="ltr"
                    id="otp_code"
                    classNames={{
                      input: "w-full",
                      base: "w-full",
                      wrapper: "w-full",
                      segmentWrapper: "w-full",
                      segment: "input w-full !py-6",
                      errorMessage: "text-right",
                    }}
                  />
                  <label>کد معرف (اختیاری)</label>
                  <input
                    {...otpForm.register("referral_code")}
                    maxLength={11}
                    className="input"
                  />
                </>
              )}
            </ModalBody>

            <ModalFooter className="mb-4">
              <button type="submit" className="w-full btn-primary">
                {step === "PHONE" ? "ادامه" : step === "OTP" ? "تایید" : "ورود"}
              </button>
              {step === "OTP" && (
                <button
                  type="button"
                  className="text-xs text-cyan-500 mt-2"
                  onClick={() => sendOtp(phoneNumber)}
                  disabled={!canResend}
                >
                  {canResend
                    ? "ارسال مجدد کد"
                    : `ارسال مجدد بعد از ${Math.floor(resendTimer / 60)}:${String(
                        resendTimer % 60
                      ).padStart(2, "0")}`}
                </button>
              )}
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
