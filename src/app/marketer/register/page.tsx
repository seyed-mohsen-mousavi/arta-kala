import Image from "next/image";

async function Register() {
  return (
    <div className="relative flex size-full max-h-full flex-1">
      <div className="w-full">
        <Image
          src={"/register.png"}
          alt="بازاریاب ثبت نام"
          className="object-cover h-screen p-5 rounded-4xl "
          width={1920}
          height={1080}
        />
      </div>
      <div className="w-full flex flex-col px-5 py-20">
        <h1 className="text-5xl  font-bold">ساخت حساب بازاریاب</h1>
        <p className="text-zinc-800 max-w-6xl text-lg pt-1 leading-relaxed font-light">
          با ایجاد حساب بازاریاب، می‌توانید از طریق معرفی محصولات و جذب مشتری،
          به کسب درآمد بپردازید. پس از تکمیل فرم زیر و تأیید اطلاعات، پنل
          اختصاصی همکاری در فروش برای شما فعال خواهد شد.
        </p>{" "}
        <form action="" className="grid grid-cols-2">
          <button type="submit" className="btn-primary w-full font-bold text-lg col-span-2">ثبت نام به عنوان بازاریاب</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
