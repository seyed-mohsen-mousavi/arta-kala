import Link from "next/link";
import React from "react";

const FooterSection = ({
  title,
  links,
  children,
}: {
  links: { href: string; label: string }[];
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`p-4 rounded-lg ${title === "خدمات پس از فروش" ? "mr-10" : ""}`}
    >
      <h4 className="text-2xl font-semibold text-[#424242] text-right flex items-center gap-2">
        <div className="bg-[#fec001] size-3 rounded-full" />
        {title}
      </h4>
      {links.length > 0 && (
        <ul className="list-none mt-4 text-right space-y-3 md:space-y-2">
          {links.map((link, index) => (
            <li key={index} className="border-b border-zinc-100 px-2 py-3">
              <Link href={link.href} className="text-zinc-700">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {children && children}
    </div>
  );
};

const footerData = [
  {
    title: "ارتباط با تکنو صاف",
    links: [
      { href: "/about-us", label: "درباره ما" },
      { href: "/contact-info", label: "تماس با ما" },
    ],
  },
  {
    title: "راهنمای خرید",
    links: [
      {
        href: "#payment-method",
        label: "روش های پرداخت",
      },
      {
        href: "#customer-service",
        label: "شرایط ارسال سفارشات",
      },
      {
        href: "#purchasing-process",
        label: "راهنمای خرید از تکنو صاف",
      },
      {
        href: "#proform-invoice",
        label: "راهنمای پیش فاکتور",
      },
    ],
  },
  {
    title: "خدمات پس از فروش",
    links: [
      { href: "#guarantee", label: "خدمات پس از فروش" },
      {
        href: "#return-conditions",
        label: "شرایط بازگشت کالا",
      },
    ],
    content: (
      <div className="mt-6 text-center">
        <Link
          href="https://trustseal.enamad.ir/?id=403156&Code=f2vcEIt1dlWn7fD4fETvbnOfiPWwNZtq"
          target="_blank"
          referrerPolicy="origin"
          rel="noopener noreferrer"
          className="cursor-pointer p-2 lg:p-4 flex items-center justify-center border-neutral-200 rounded"
        >
          <div className="size-[75px] leading-0">
            <img
              src="https://trustseal.enamad.ir/logo.aspx?id=403156&Code=f2vcEIt1dlWn7fD4fETvbnOfiPWwNZtq"
              alt="نماد اعتماد الکترونیکی"
              className="cursor-pointer rounded-md border border-[#424242] p-1 hover:shadow-md transition object-contain"
              referrerPolicy="origin"
              loading="lazy"
              width={75}
              height={75}
              title="نماد اعتماد الکترونیکی"
            />
          </div>
        </Link>
      </div>
    ),
  },
];

function Footer() {
  return (
    <footer className="w-full bg-[#fed75c] block font-pelak font-medium py-7 shrink-0">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="p-4 rounded-lg ">
          <h4 className="text-2xl font-semibold text-[#424242] text-right flex items-center gap-2">
            <div className="bg-[#fec001] size-3 rounded-full" />
            فروشگاه تکنو صاف
          </h4>
          <p className="text-lg font-medium text-black mt-10 max-w-[460px]">
            تکنو صاف با فراهم آوردن تنوع معقولی از محصولات در کنار عرضه با قیمت
            مناسب آن‌ها، به دنبال خرید راحت و رضایت‌بخش ابزارآلات برای همراهان
            خودش است و این مهم را با مهیا کردن امکان بررسی فنی و کاربردی
            ابزارآلات و ارائه محتوای مناسب و غنی محقق می‌سازد.
          </p>
        </div>
        <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-between max-w-screen-xl">
          {footerData.map((section, index) => (
            <FooterSection
              key={index}
              title={section.title}
              links={section.links || []}
            >
              {section.content}
            </FooterSection>
          ))}
        </div>
      </div>
      <div id="wze60" className="text-center pt-10 mx-auto mt-5">
        <p
          className="text-lg text-gray-600 -mt-16"
          style={{ fontFamily: "pelak,tahoma,serif" }}
        >
          تمام حقوق این سایت نزد تکنو صاف محفوظ است.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
