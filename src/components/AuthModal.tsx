import {
  Checkbox,
  InputOtp,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React, { useState } from "react";
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
import { sendOtp, verifyOtp } from "@/services/usersActions";

interface FormValues {
  otp: string;
}

export default function AuthModal({ isOpen, onOpenChange }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [isSendOtp, setIsSendOtp] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });
  const {
    handleSubmit: handleOtpSubmit,
    register: registerOtp,
    formState: { errors: otpErrors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });
  const onLoginSubmit = (data: LoginFormValues) => {
    console.log("🔐 Login Data:", data);
  };

  const onSignupSubmit = async ({ phone_number }: SignupFormValues) => {
    const result = await sendOtp(convertPersianToEnglish(phone_number));
    if (result?.status === 200) {
      setPhoneNumber(phone_number);
      setIsSendOtp(true);
      reset();
    }
  };

  const onOtpSubmit = async (data: OtpFormValues) => {
    console.log({ ...data, phoneNumber });
    await verifyOtp(
      convertPersianToEnglish(phoneNumber),
      data.code,
      data.referral_code
    );
  };
  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onOpenChange}
      className="max-w-full max-h-full h-full m-0 sm:max-w-lg sm:h-auto "
    >
      <ModalContent className="text-sm rounded-sm overflow-auto h-full">
        {(onClose) => (
          <div className="flex w-full h-full">
            {isSendOtp ? (
              <form
                onSubmit={handleOtpSubmit(onOtpSubmit)}
                className="w-full h-full flex justify-between flex-col"
              >
                <ModalHeader className="flex items-center justify-between">
                  <p>ورود به حساب کاربری</p>
                  <button type="button" onClick={onClose}>
                    <HiXMark className="size-6" />
                  </button>
                </ModalHeader>
                <ModalBody>
                  <div className="bg-green-100 border border-green-200 p-4 text-zinc-600 rounded-sm">
                    کد تایید برای شماره همراه ۰۹۹۳۵۰۷۱۵۱۹ ارسال گردید
                  </div>
                  <label htmlFor="referral_code">کد معرف (اختیاری)</label>

                  <input
                    maxLength={11}
                    {...registerOtp("referral_code")}
                    className="input"
                    id="referral_code"
                  />
                  {otpErrors.referral_code && (
                    <p className="text-xs text-red-500">
                      {otpErrors.referral_code.message}
                    </p>
                  )}
                  <label htmlFor="otp_code" className="font-semibold">
                    {" "}
                    کد تایید
                  </label>
                  <InputOtp
                    {...registerOtp("code")}
                    errorMessage={otpErrors?.code?.message}
                    isInvalid={!!otpErrors.code}
                    variant="bordered"
                    className="font-dana"
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
                    length={6}
                  />
                </ModalBody>
                <ModalFooter className="mb-4">
                  <button type="submit" className="w-full btn-primary ">
                    تکمیل ثبت نام
                  </button>
                  <div className="w-full py-4 text-xs flex justify-start px-2">
                    <button
                      type="button"
                      className="text-zinc-400 flex items-center gap-1 relative font-dona disabled:pointer-events-none"
                      onClick={() => setIsLogin(true)}
                      disabled
                    >
                      ارسال مجدد کد تایید بعد از 01:55{" "}
                    </button>
                  </div>
                </ModalFooter>
              </form>
            ) : isLogin ? (
              <form
                onSubmit={handleLoginSubmit(onLoginSubmit)}
                className="w-full h-full flex justify-between flex-col"
              >
                <ModalHeader className="flex items-center justify-between">
                  <p>ورود به حساب کاربری</p>
                  <button type="button" onClick={onClose}>
                    <HiXMark className="size-6" />
                  </button>
                </ModalHeader>
                <div>
                  <ModalBody>
                    <label htmlFor="phone_number">شماره تلفن</label>
                    <input
                      {...registerLogin("phone_number")}
                      maxLength={11}
                      className="input"
                      id="phone_number"
                    />
                    {loginErrors.phone_number && (
                      <p className="text-xs text-red-500">
                        {loginErrors.phone_number.message}
                      </p>
                    )}

                    <label htmlFor="password">رمز عبور</label>
                    <input
                      {...registerLogin("password")}
                      type="password"
                      className="input"
                      id="password"
                    />
                    {loginErrors.password && (
                      <p className="text-xs text-red-500">
                        {loginErrors.password.message}
                      </p>
                    )}

                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox classNames={{ label: "text-small" }}>
                        مرا به خاطر داشته باش
                      </Checkbox>
                    </div>
                  </ModalBody>
                  <ModalFooter className="mb-4">
                    <button type="submit" className="w-full btn-primary">
                      ورود به حساب
                    </button>
                  </ModalFooter>
                </div>
                <div className="w-full bg-[#f9f9f9] border-t border-zinc-200 py-8 text-center text-xs">
                  کاربر جدید هستید؟{" "}
                  <button
                    className="spoiler-link text-cyan-400 relative"
                    type="button"
                    onClick={() => setIsLogin(false)}
                  >
                    همین الان عضو بشید
                  </button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleSignupSubmit(onSignupSubmit)}
                className="w-full h-full flex justify-between flex-col"
              >
                <ModalHeader className="flex items-center justify-between">
                  <p>ثبت‌نام</p>
                  <button type="button" onClick={onClose}>
                    <HiXMark className="size-6" />
                  </button>
                </ModalHeader>
                <div>
                  <ModalBody>
                    <label htmlFor="phone_number">شماره تلفن</label>
                    <input
                      maxLength={11}
                      {...registerSignup("phone_number")}
                      className="input"
                      id="phone_number"
                    />
                    {signupErrors.phone_number && (
                      <p className="text-xs text-red-500">
                        {signupErrors.phone_number.message}
                      </p>
                    )}

                    {/* <label htmlFor="password">رمز عبور</label>
                  <input
                    {...registerSignup("password")}
                    type="password"
                    className="input"
                    id="password"
                  />
                  {signupErrors.password && (
                    <p className="text-xs text-red-500">
                      {signupErrors.password.message}
                    </p>
                  )}

                  <label htmlFor="confirm_password">تکرار رمز عبور</label>
                  <input
                    {...registerSignup("confirm_password")}
                    id="confirm_password"
                    type="password"
                    className="input"
                  />
                  {signupErrors.confirm_password && (
                    <p className="text-xs text-red-500">
                      {signupErrors.confirm_password.message}
                    </p>
                  )}

                  {signupErrors.confirm_password && (
                    <p className="text-xs text-red-500">
                      {signupErrors.confirm_password.message}
                    </p>
                  )} */}
                  </ModalBody>
                  <ModalFooter className="mb-4">
                    <button type="submit" className="w-full btn-primary">
                      ثبت‌نام
                    </button>
                  </ModalFooter>
                </div>
                <div className="w-full bg-[#f9f9f9] border-t border-zinc-200 py-8 text-xs flex justify-end px-2">
                  <button
                    type="button"
                    className="spoiler-link text-zinc-400 flex items-center gap-1 relative"
                    onClick={() => setIsLogin(true)}
                  >
                    ورود به حساب کاربری
                    <MdChevronLeft className="size-5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
