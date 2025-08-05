"use client";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = "6Lc9tJgrAAAAABuHALBXaMFS0_3wm8oWEoyCvedh";
import {
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
import {
  LoginFormValues,
  loginSchema,
  OtpFormValues,
  otpSchema,
  SignupFormValues,
  signupSchema,
} from "@/schemas/authSchema";
import { convertPersianToEnglish } from "@/utils/converNumbers";
import {
  checkPhoneExists,
  login,
  sendOtp,
  verifyOtp,
} from "@/services/usersActions";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthModal } from "@/context/AuthModalProvider";

export default function AuthModal() {
  const { isOpen, onOpenChange, onClose } = useAuthModal();
  const [step, setStep] = useState<"PHONE" | "OTP" | "PASSWORD">("PHONE");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const searchParams = useSearchParams();
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const router = useRouter();

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
    if (!captchaToken) {
      phoneForm.setError("phone_number", {
        message: "لطفاً کپچا را کامل کنید.",
      });
      return;
    }

    try {
      setLoading(true);

      const verifyRes = await fetch("/api/auth/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        phoneForm.setError("phone_number", {
          message: "اعتبارسنجی کپچا ناموفق بود",
        });
        return;
      }

      const converted = convertPersianToEnglish(phone_number);
      setPhoneNumber(converted);

      const exists = await checkPhoneExists(converted);
      if (exists) {
        setIsNewUser(false);
        setStep("PASSWORD");
      } else {
        setIsNewUser(true);
        const result = await sendOtp(converted);
        if (result?.status === 200) {
          setStep("OTP");
          setCanResend(false);
          setResendTimer(120);
        } else {
          phoneForm.setError("phone_number", {
            message: "ارسال کد تایید ناموفق بود",
          });
        }
      }
    } catch {
      phoneForm.setError("phone_number", {
        message: "خطایی در ارسال اطلاعات",
      });
    } finally {
      setLoading(false);
    }
  };

  const onPasswordLogin = async ({ password }: { password: string }) => {
    setHasPasswordError(false);
    setLoading(true);

    try {
      const result = await login(phoneNumber, password);
      if (result?.status === 200) {
        loginForm.reset();
        onClose();
        const redirectTo =
          searchParams.get("redirectTo") || "/profile/dashboard";
        console.log("redirecting to:", redirectTo);

        router.push(redirectTo);
      }
    } catch {
      loginForm.setError("password", {
        message: "رمز عبور اشتباه است",
      });
      setHasPasswordError(true);
    } finally {
      setLoading(false);
    }
  };

  const onOtpSubmit = async (data: OtpFormValues) => {
    setLoading(true);
    try {
      const result = await verifyOtp(
        phoneNumber,
        data.code,
        data.referral_code
      );
      if (result?.status === 200) {
        loginForm.reset();
        onClose();
        const redirectTo =
          searchParams.get("redirectTo") || "/profile/dashboard";
        router.push(redirectTo);
      }
    } catch {
      otpForm.setError("code", {
        message: "کد وارد شده اشتباه یا منقضی شده",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (step === "OTP") {
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    phoneForm.reset();
    otpForm.reset();
    loginForm.reset();
  }, [step]);

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

                  <div className="flex items-center w-full">
                    <div className="scale-75 -mr-12 -my-5">
                      <ReCAPTCHA
                        hl="fa"
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === "PASSWORD" && (
                <>
                  <label>رمز عبور</label>
                  <input
                    {...loginForm.register("password")}
                    type="password"
                    className="input"
                    placeholder="رمز عبور خود را وارد کنید "
                    id="password"
                  />
                  {!loading && hasPasswordError && (
                    <p className="text-xs text-red-500">
                      {loginForm.formState.errors.password?.message}
                    </p>
                  )}

                  <div className="flex items-start">
                    <button
                      type="button"
                      className="text-xs spoiler-link text-cyan-500 hover:text-cyan-400 relative"
                      onClick={async () => {
                        try {
                          setLoading(true);
                          const result = await sendOtp(phoneNumber);
                          if (result?.status === 200) {
                            setStep("OTP");
                            setCanResend(false);
                            setResendTimer(120);
                          }
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      ورود با کد تایید
                    </button>
                  </div>
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

                  {isNewUser && (
                    <>
                      <label>کد معرف (اختیاری)</label>
                      <input
                        {...otpForm.register("referral_code")}
                        maxLength={11}
                        className="input"
                      />
                    </>
                  )}
                </>
              )}
            </ModalBody>

            <ModalFooter className="mb-4 flex flex-col items-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-60 disabled:cursor-wait"
              >
                {loading
                  ? "لطفا صبر کنید..."
                  : step === "PHONE"
                    ? "ادامه"
                    : step === "OTP"
                      ? "تایید"
                      : "ورود"}
              </button>

              {step === "OTP" && (
                <button
                  type="button"
                  className="text-xs text-cyan-500 mt-2"
                  onClick={() => {
                    sendOtp(phoneNumber);
                    setCanResend(false);
                    setResendTimer(120);
                  }}
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
