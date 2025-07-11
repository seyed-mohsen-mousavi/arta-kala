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
      <h4 className="text-2xl font-semibold text-[#666666] text-right flex items-center gap-2">
        <div className="bg-[#fec001] size-3 rounded-full" />
        {title}
      </h4>
      {links.length > 0 && (
        <ul className="list-none mt-4 text-right space-y-3 md:space-y-2">
          {links.map((link, index) => (
            <li key={index} className="border-b border-zinc-100 px-2 py-3">
              <a href={link.href} className="text-zinc-700">
                {link.label}
              </a>
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
      { href: "https://abzarmart.com/about-us/", label: "درباره ما" },
      { href: "https://abzarmart.com/contact-us/", label: "تماس با ما" },
      { href: "https://abzarmart.com/join-us/", label: "فرصت های شغلی" },
      { href: "https://abzarmart.com/abzarmart-rent/", label: "خرید قسطی" },
    ],
  },
  {
    title: "راهنمای خرید",
    links: [
      {
        href: "https://abzarmart.com/payment-method/",
        label: "روش های پرداخت",
      },
      {
        href: "https://abzarmart.com/customer-service/",
        label: "شرایط ارسال سفارشات",
      },
      {
        href: "https://abzarmart.com/purchasing-process/",
        label: "راهنمای خرید از تکنو صاف",
      },
      {
        href: "https://abzarmart.com/proform-invoice/",
        label: "راهنمای پیش فاکتور",
      },
    ],
  },
  {
    title: "خدمات پس از فروش",
    links: [
      { href: "https://abzarmart.com/guarantee/", label: "خدمات پس از فروش" },
      {
        href: "https://abzarmart.com/return-conditions/",
        label: "شرایط بازگشت کالا",
      },
    ],
    content: (
      <div className="mt-6 text-center">
        <a
          href="https://emalls.ir/Shop/833/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://service.emalls.ir/neshan?id=833"
            alt="نشان اعتباری ایمالز"
            className="m-3"
          />
        </a>
      </div>
    ),
  },
];

function Footer() {
  return (
    <footer className="w-full bg-[#fed75c] block font-pelak font-medium py-7 shrink-0">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="p-4 rounded-lg ">
          <h4 className="text-2xl font-semibold text-[#666666] text-right flex items-center gap-2">
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
        <div
          id="wz-section-footer"
          className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-between max-w-screen-xl"
        >
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
      <div id="wze60" className="text-center pt-10 mx-auto">
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
