import Brand from "@/components/Brand";
import HomeSlider from "@/components/HomeSlider";
import QuickBlogCard from "@/components/QuickBlogCard";
import Slider from "@/components/Slider";
import api from "@/services/api";
import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/Products/Card";
import { GetProducts } from "@/services/shopActions";
import FlipClock from "@/components/CountdownTimer";

const targetTime = new Date("2025-07-10T00:00:00");
export type Image = {
  id: number;
  src: string;
  alt: string;
  link: string;
};
const images = [
  {
    id: 1,
    src: "/slider/1.webp",
    alt: "عکس ۱",
    link: "",
  },
  {
    id: 2,
    src: "/slider/2.webp",
    alt: "عکس ۲",
    link: "",
  },
  {
    id: 3,
    src: "/slider/3.webp",
    alt: "عکس ۳",
    link: "",
  },
  {
    id: 4,
    src: "/slider/4.webp",
    alt: "عکس ۴",
    link: "",
  },
];

const quickCategories: { label: string; image: string }[] = [
  {
    label: "فرز",
    image: "/quick-category/1.jpg",
  },
  {
    label: "​جارو شارژی و کارواش",
    image: "/quick-category/2.jpg",
  },
  {
    label: "شیرآلات",
    image: "/quick-category/3.png",
  },
  {
    label: "​شستشو و نظافت",
    image: "/quick-category/4.jpg",
  },
  {
    label: "روشنایی",
    image: "/quick-category/5.jpg",
  },
  {
    label: "​دریل",
    image: "/quick-category/6.jpg",
  },
];
const brands: { link: string; name: string; image: string }[] = [
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/1.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/2.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/3.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/1.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/2.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/3.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/1.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/2.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/3.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/1.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/2.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/3.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/1.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/2.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/3.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/1.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/2.jpg",
  },
  {
    link: "/",
    name: "نمیدانم",
    image: "/brands/3.jpg",
  },
];
const blogs: { id: number; title: string; image: string }[] = [
  {
    id: 1,
    image: "/blog.jpg",
    title: "آشنایی با انواع فرز و کاربرد آنها",
  },
  {
    id: 2,
    image: "/blog.jpg",
    title: "آشنایی با انواع فرز و کاربرد آنها",
  },
  {
    id: 3,
    image: "/blog.jpg",
    title: "آشنایی با انواع فرز و کاربرد آنها",
  },
  {
    id: 4,
    image: "/blog.jpg",
    title: "آشنایی با انواع فرز و کاربرد آنها",
  },
  {
    id: 5,
    image: "/blog.jpg",
    title: "آشنایی با انواع فرز و کاربرد آنها",
  },
  {
    id: 6,
    image: "/blog.jpg",
    title: "آشنایی با انواع فرز و کاربرد آنها",
  },
];
export default async function Home() {
  const { data } = await GetProducts();
  const products: ProductType[] = data.results;
  console.log(products);
  return (
    <div className="w-full">
      {/* Header  */}
      <section className="flex flex-col md:flex-row gap-4 w-full h-full py-4">
        <div className="w-full md:w-2/3 flex justify-center items-center sm:min-h-[250px] md:h-auto">
          <HomeSlider images={images} />
        </div>

        <div className="flex flex-col space-y-4 w-full md:w-1/3">
          <Link href={""}>
            <Image
              src={"/dep.jpg"}
              alt=""
              width={200}
              height={200}
              className="object-cover w-full  h-full rounded-md"
            />
          </Link>
          <Link href={""}>
            <Image
              src={"/dep2.webp"}
              alt=""
              width={200}
              height={200}
              className="object-cover w-full  h-full rounded-md"
            />
          </Link>
        </div>
      </section>
      {/* Main */}
      <section className="max-w-[1270px] mx-auto space-y-2">
        {/* Quick Categories */}
        <div className="flex flex-row-reverse flex-wrap md:gap-5 items-center w-full justify-around py-5">
          {quickCategories.map((qc, index) => (
            <Link
              key={index}
              href={"/"}
              className="flex flex-col items-center gap-1 "
            >
              <Image
                src={qc.image}
                alt={qc.label}
                width={200}
                height={200}
                loading="lazy"
                className="object-fill size-24 md:size-32"
              />
              <p className="font-bold text-xs">{qc.label}</p>
            </Link>
          ))}
        </div>
        {/* OFF Mart */}
        <div className="bg-primary-500 rounded-3xl p-4 shadow-[0px_9px_14px_0px_rgba(254,192,1,0.2)] grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="w-full col col-span-1 flex flex-col items-center gap-6 justify-between pr-10">
            <div className="flex flex-row lg:flex-col w-full h-full justify-between font-dana">
              <h2 className="text-red-600 text-4xl lg:text-[42px] font-bold w-full font-dana">
                آف مارت
              </h2>
              <FlipClock targetDate={new Date("2025-07-07T00:00:00")} />
            </div>
            <button className="hidden lg:block bg-red-600 text-white px-7 py-1.5 rounded-full border-2 border-red-700 hover:bg-red-700 transition-colors ease-in-out">
              مشاهده همه آف ها
            </button>
          </div>
          <div className="w-full lg:col-span-4 px-4 rounded-2xl">
            <Slider items={products} Card={Card} />
          </div>
          <button className="lg:hidden block mx-auto bg-red-600 text-white px-7 py-1.5 rounded-full border-2 border-red-700 hover:bg-red-700 transition-colors ease-in-out">
            مشاهده همه آف ها
          </button>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-5 lg:gap-10 lg:h-48 my-7">
          <Image
            src={"/c1.jpg"}
            alt="تبلیغ"
            width={480}
            height={180}
            className="w-full rounded-3xl object-cover h-full"
          />
          <Image
            src={"/c2.jpg"}
            alt="تبلیغ"
            width={480}
            height={180}
            className="w-full rounded-3xl object-cover h-full"
          />
        </div>
        {/* New  */}
        <div className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white">
          <div className="w-full flex justify-between px-4">
            <h4 className="font-semibold text-2xl">جدیدترین</h4>{" "}
            <Link href={"/"} className="underline text-lg">
              مشاهده بیشتر محصولات​​​​​​​
            </Link>
          </div>
          <div className="px-12 mt-5">
            <Slider
              spaceBetween={35}
              className="!text-primary"
              items={products}
              Card={Card}
            />
          </div>
        </div>
        <Image
          src={"/ads.jpg"}
          alt="تبلیغ"
          width={1160}
          height={200}
          className="w-full rounded-xl lg:rounded-3xl mb-5"
        />
        {/* Populer */}
        <div className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white">
          <div className="w-full flex justify-between px-4">
            <h4 className="font-semibold text-2xl">پرفروش ها</h4>{" "}
            <Link href={"/"} className="underline text-lg">
              مشاهده بیشتر محصولات​​​​​​​
            </Link>
          </div>
          <div className="px-12 mt-5">
            <Slider
              spaceBetween={35}
              className="!text-primary"
              items={products}
              Card={Card}
            />
          </div>
        </div>
        {/* Blog */}
        <div className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white flex lg:flex-row flex-col">
          <div className="w-full flex lg:flex-col justify-between gap-5 px-4">
            <h4 className="font-semibold text-2xl">بلاگ</h4>
            <div className="hidden  gap-0.5 lg:flex flex-col">
              <Link href={"/"}>دانستنی‌های ابزار دستی(۲۲)</Link>
              <Link href={"/"}>دانستنی های ابزار برقی و شارژی(۶۰)</Link>
              <Link href={"/"}>دانستنی‌های ابزار بادی و بنزینی(۱)</Link>
              <Link href={"/"}>دانستنی های ابزار الکتریک و روشنایی(۱)</Link>
            </div>
            <Link href={"/"} className="underline text-lg">
              مشاهده مطالب بیشتر
            </Link>
          </div>
          <div className="px-12 mt-5 lg:max-w-3/4">
            <Slider
              spaceBetween={10}
              className="!text-primary"
              items={blogs}
              Card={QuickBlogCard}
              slidesPerView={3}
            />
          </div>
        </div>
        {/* Brands */}
        <div className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white mt-10">
          <div className="px-12  h-full">
            <Slider
              spaceBetween={35}
              className="!text-primary"
              items={brands}
              Card={Brand}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
