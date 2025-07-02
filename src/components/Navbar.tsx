"use client";

const categories: Category[] = [
  {
    id: 1,
    name: "ابزار دستی",
    children: [
      { id: 2, name: "آچار" },
      { id: 3, name: "چکش" },
      { id: 4, name: "پیچ‌گوشتی" },
      { id: 5, name: "سوهان" },
      { id: 6, name: "انبردست" },
      { id: 7, name: "متر" },
      { id: 8, name: "کاتر" },
      { id: 9, name: "رنده" },
      { id: 5, name: "سوهان" },
      { id: 6, name: "انبردست" },
      { id: 7, name: "متر" },
      { id: 8, name: "کاتر" },
      { id: 9, name: "رنده" },
      { id: 5, name: "سوهان" },
      { id: 6, name: "انبردست" },
      { id: 7, name: "متر" },
      { id: 8, name: "کاتر" },
      { id: 9, name: "رنده" },
      { id: 5, name: "سوهان" },
      { id: 6, name: "انبردست" },
      { id: 7, name: "متر" },
      { id: 8, name: "کاتر" },
      { id: 9, name: "رنده" },
      { id: 5, name: "سوهان" },
      { id: 6, name: "انبردست" },
      { id: 7, name: "متر" },
      { id: 8, name: "کاتر" },
      { id: 9, name: "رنده" },
      { id: 5, name: "سوهان" },
      { id: 6, name: "انبردست" },
      { id: 7, name: "متر" },
      { id: 8, name: "کاتر" },
      { id: 9, name: "رنده" },
      { id: 5, name: "سوهان" },
      { id: 6, name: "انبردست" },
      { id: 7, name: "متر" },
      { id: 8, name: "کاتر" },
      { id: 9, name: "رنده" },
      { id: 5, name: "سوهان" },
      { id: 6, name: "انبردست" },
      { id: 7, name: "متر" },
      { id: 8, name: "کاتر" },
      { id: 9, name: "رنده" },
      { id: 5, name: "سوهان" },
      { id: 6, name: "انبردست" },
      { id: 7, name: "متر" },
      { id: 8, name: "کاتر" },
      { id: 9, name: "رنده" },
    ],
  },
  {
    id: 10,
    name: "ابزار برقی",
    children: [
      { id: 11, name: "دریل" },
      { id: 12, name: "سنگ فرز" },
      { id: 13, name: "دستگاه جوش" },
      { id: 14, name: "سنباده برقی" },
      { id: 15, name: "پیچ‌گوشتی برقی" },
      { id: 16, name: "میخ‌کوب" },
      { id: 17, name: "اره برقی" },
      { id: 18, name: "پمپ باد" },
    ],
  },
  {
    id: 19,
    name: "ابزار باغبانی",
    children: [
      { id: 20, name: "بیل" },
      { id: 21, name: "چاقوی باغبانی" },
      { id: 22, name: "قیچی باغبانی" },
      { id: 23, name: "علف‌زن" },
      { id: 24, name: "سم‌پاش" },
      { id: 25, name: "چرخ دستی" },
      { id: 26, name: "نازل آبپاش" },
      { id: 27, name: "شن‌کش" },
    ],
  },
];
const jobs = [
  {
    id: 1,
    name: "ابزار نجاری",
  },
  {
    id: 1,
    name: "ابزار مکانیکی",
  },
];
import { Category } from "@/types/categories";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoChevronDown, GoChevronLeft, GoChevronUp } from "react-icons/go";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [jobIsOpen, setJobIsOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const renderCategories = (categories: Category[]) => {
    return (
      <ul className="relative">
        {categories.map((category, index) => (
          <li
            key={index}
            className="group relative hover:bg-[#525d66] whitespace-nowrap"
          >
            <Link
              href={`/`}
              className="font-normal flex items-center justify-between px-4 w-full h-full py-2"
            >
              {category.name}
              <GoChevronLeft className="size-4 fill-[#98aab3]" />
            </Link>
            {category.children && category.children.length > 0 && (
              <div className="absolute top-0 right-full bg-white text-[#3d464d] rounded-xs shadow-lg group-hover:visible group-hover:opacity-100 invisible opacity-0 transition-all duration-200 z-50 p-4">
                <ul className=" flex flex-wrap   min-w-[500px] list-disc pr-5">
                  {category.children.map((child, index) => (
                    <li
                      key={index}
                      className="relative max-w-[25%] flex-[0_0_25%] w-full py-px"
                    >
                      <Link href="/" className="hover:text-primary transition">
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div className="h-20"></div>
      <div
        className={`w-full z-50 h-[54px] bg-primary text-[#3d464d] transition-all duration-300 shadow  ${
          scrolled ? "fixed top-0 " : "relative"
        }`}
      >
        <div className="container customSm:max-w-[566px] mx-auto w-full h-full">
          <div className="flex items-center justify-between relative h-full">
            <div className="shrink-0">
              <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="relative lg:w-[230px]  xl:w-[260px] 2xl:w-80 h-[42px]"
              >
                <div className="absolute bg-[#3d464d] top-0  size-full rounded-xs pt-10">
                  <ul
                    className={`bg-[#3d464d] text-white ransition-all duration-400 ease-in-out ${
                      isOpen ? "max-h-[500px] visible" : "max-h-0 invisible"
                    }`}
                  >
                    {renderCategories(categories)}
                  </ul>
                </div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative p-0 px-4 text-white z-[1] size-full text-right text-[.987rem] flex items-center justify-between group/button border-none outline-none"
                >
                  <div className="flex items-center gap-1">
                    <HiOutlineMenuAlt2 className="size-7" />
                    دسته بندی کالاها
                  </div>
                  <GoChevronUp
                    className={`size-5 ${
                      isOpen ? "-rotate-180" : "rotate-0"
                    } transition-transform ease-linear`}
                  />
                </button>
              </div>
            </div>

            <div className="mr-4 flex">
              <button
                onMouseEnter={() => setJobIsOpen(true)}
                onMouseLeave={() => setJobIsOpen(false)}
                className=" relative p-2 hover:bg-white/50 transition-colors ease-out mr-10 flex items-center gap-1"
              >
                مشاغل
                <GoChevronDown className="size-4" />
                <div
                  className={`absolute top-[46px] right-0 bg-white text-[#3d464d] rounded-b-xs shadow  ${
                    jobIsOpen ? "visible opacity-100 -translate-y-0" : "invisible opacity-0 -translate-y-1"
                  }  transition-all duration-200 z-50 p-2 min-w-30`}
                >
                  <ul className="list-disc pr-5">
                    {jobs.map((job, index) => (
                      <li
                        key={index}
                        className="relative"
                      >
                        <Link
                          href="/"
                          className=""
                        >
                          {job.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
              <Link
                href={"/"}
                className="p-2 hover:bg-white/50 rounded-xs transition-colors ease-out"
              >
                فروش به شرکت ها
              </Link>
              <Link
                href={"/"}
                className="p-2 hover:bg-white/50 rounded-xs transition-colors ease-out"
              >
                فروش همکاری{" "}
              </Link>
              <Link
                href={"/"}
                className="p-2 hover:bg-white/50 rounded-xs transition-colors ease-out"
              >
                {" "}
                آموزه های ابزار
              </Link>
              <Link
                href={"/"}
                className="p-2 hover:bg-white/50 rounded-xs transition-colors ease-out"
              >
                برند ها
              </Link>
              <Link
                href={"/"}
                className="p-2 hover:bg-white/50 rounded-xs transition-colors ease-out"
              >
                دریافت کاتالوگ
              </Link>
              <Link
                href={"/"}
                className="p-2 hover:bg-white/50 rounded-xs transition-colors ease-out"
              >
                خرید اقساطی
              </Link>
              <Link
                href={"/"}
                className="p-2 hover:bg-white/50 rounded-xs transition-colors ease-out"
              >
                درباره ما
              </Link>
              <Link
                href={"/"}
                className="p-2 hover:bg-white/50 rounded-xs transition-colors ease-out"
              >
                تماس با ما
              </Link>
            </div>
            <div className="space-x-2 flex items-center">
              <Link
                className="py-1 px-3 rounded-2xl bg-white text-black font-semibold"
                href={"/"}
              >
                ورود / عضویت{" "}
              </Link>
              <Link
                className="py-1 px-3 rounded-2xl bg-white text-black font-semibold"
                href={"/"}
              >
                بازاریاب شو
              </Link>
              <button>
                <CiSearch className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-black/30 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } fixed top-0 right-0 w-full h-full transition-all ease-linear`}
      ></div>
    </div>
  );
}

export default Navbar;
