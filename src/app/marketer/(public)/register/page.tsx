export const metadata = { layout: false };
export const dynamic = 'force-dynamic';

import RegisterForm from "@/components/Marketer/RegisterForm";
import { marketing_profile_list } from "@/services/marketingActions";
import Image from "next/image";
import { redirect } from "next/navigation";
async function Register() {
  const res = await marketing_profile_list();
  const marketer = res.data;
  if (marketer?.status === "pending") {
    redirect("/marketer/pending");
  } else if (marketer?.status === "rejected") {
    redirect("/marketer/rejected");
  } else if (marketer?.status === "approved") {
    redirect("/marketer/dashboard");
  }
  return (
    <div className="relative flex size-full max-h-full flex-1">
      <div className="w-full lg:w-3/4 h-screen flex flex-col py-20 px-5 sm:px-10 md:px-20 lg:px-32 justify-center  ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          ساخت حساب بازاریاب
        </h1>
        <p className="text-zinc-800 max-w-6xl text-xs md:text-base lg:text-lg pt-1 leading-relaxed font-light">
          با ایجاد حساب بازاریاب، می‌توانید از طریق معرفی محصولات و جذب مشتری،
          به کسب درآمد بپردازید. پس از تکمیل فرم زیر و تأیید اطلاعات، پنل
          اختصاصی همکاری در فروش برای شما فعال خواهد شد.
        </p>
        <RegisterForm />
      </div>
      <div className="hidden lg:flex relative w-full h-screen">
        <Image
          src={"/register.jpg"}
          width={1920}
          height={1080}
          alt="Marketer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-10 text-center">
          <h2 className="text-5xl font-bold mb-3">
            همکاری در فروش با درآمد بالا
          </h2>
          <p className="text-lg max-w-md">
            فقط با معرفی مشتری، پورسانت دریافت کنید و رشد مالی را تجربه کنید.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
