import Link from "next/link";
import React from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FooterSection = ({
  title,
  links,
  children,
}: {
  links: { href: string; label: string; icon?: React.ReactNode }[];
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`p-4 rounded-lg ${title === "دسترسی سریع" ? "mr-10" : ""}`}>
      <h4 className="text-2xl font-semibold text-[#424242] text-right flex items-center gap-2 mb-4">
        <div className="bg-primary-400 w-3 h-3 rounded-full" />
        {title}
      </h4>

      {links.length > 0 && (
        <ul className="list-none mt-2 text-right space-y-3 md:space-y-2">
          {links.map((link, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b border-zinc-100 px-2 py-3 hover:bg-gray-50 transition rounded-md"
            >
              <Link
                href={link.href}
                className="text-zinc-700 flex items-center gap-2"
              >
                {link.icon && (
                  <span className="text-primary-500">{link.icon}</span>
                )}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {children && (
        <div className="mt-4 flex gap-4 justify-end">{children}</div>
      )}
    </div>
  );
};

const footerData = [
  {
    title: "شماره های ارتباطی",
    links: [
      { href: "tel:03536264264", label: "۰۳۵-۳۶۲۶۴۲۶۴", icon: <FaPhoneAlt /> },
      { href: "tel:09130176574", label: "۰۹۱۳۰۱۷۶۵۷۴", icon: <FaPhoneAlt /> },
    ],
  },
  {
    title: "آدرس شرکت",
    links: [
      {
        href: "#",
        label: "یزد-خیابان شهید رجایی-نبش کوچه 30-آرتاکالا",
        icon: <FaMapMarkerAlt />,
      },
    ],
  },
  {
    title: "لینک مفید",
    links: [
      { href: "#", label: "کالاهای دارای تخفیف" },
      { href: "#", label: "کالاهای ویژه" },
      { href: "#", label: "کالاهای پرفروش" },
      { href: "#", label: "محصولات دارای تخفیف" },
      { href: "#", label: "محصولات ویژه" },
    ],
  },
  {
    title: "دسترسی سریع",
    links: [
      { href: "#", label: "مقالات" },
      { href: "#", label: "ورود به حساب" },
    ],
  },
  {
    title: "فروشگاه در رسانه ها",
    links: [
      {
        href: "https://www.instagram.com/https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwie9ci72ciEAxWE9gIHHfB7CaMQFnoECA0QAw&url=https%3A%2F%2Fwww.instagram.com%2Farta_kalaa%2F%3Fhl%3Dfa&usg=AOvVaw38WwvFwsYB6p_aeEA3VZnU&opi=89978449",
        label: "اینستاگرام",
        icon: <FaInstagram />,
      },
      {
        href: "https://api.whatsapp.com/send?phone=989199750828",
        label: "واتساپ",
        icon: <FaWhatsapp />,
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="w-full bg-white shadow-2xl block font-pelak font-medium py-10 shrink-0">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex flex-wrap flex-col sm:flex-row justify-center md:justify-between max-w-screen-xl w-full">
          {footerData.map((section, index) => (
            <FooterSection
              key={index}
              title={section.title}
              links={section.links || []}
            />
          ))}
        </div>
      </div>
      <div className="text-center pt-10 mx-auto mt-5">
        <p
          className="text-lg text-gray-600"
          style={{ fontFamily: "pelak, tahoma, serif" }}
        >
          تمام حقوق این سایت نزد آرتا کالا محفوظ است.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
