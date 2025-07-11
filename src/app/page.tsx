import Brand from "@/components/Brand";
import QuickBlogCard from "@/components/QuickBlogCard";
import Slider from "@/components/Slider";
import ProductType from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/Products/Card";
import {
  GetFeaturedProducts,
  GetLatestProducts,
  GetProducts,
} from "@/services/shopActions";
import { GetLatestArticles } from "@/services/blogActions";
import HomeHeroSection from "@/components/HomeHeroSection";
import FlipClock from "@/components/FlipClockWrapper";

export type Image = {
  id: number;
  src: string;
  alt: string;
  link: string;
};

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

export default async function Home() {
  let products: ProductType[] = [];
  let latest_products: ProductType[] = [];
  let featured_products: ProductType[] = [];
  let latest_articles = [];

  try {
    const [
      { data },
      { data: latestData },
      { data: featuredData },
      { data: articles },
    ] = await Promise.all([
      GetProducts(),
      GetLatestProducts(),
      GetFeaturedProducts(),
      GetLatestArticles(),
    ]);
    products = data.results || [];
    latest_products = latestData.latest_products || [];
    featured_products = featuredData.featured_products || [];
    latest_articles = articles || [];
  } catch (error) {
    console.error("Fetch Faild : ", error);
  }

  return (
    <div className="w-full">
      <HomeHeroSection />
      <section className="max-w-[1270px] mx-auto space-y-2">
        <div className="flex flex-row-reverse flex-wrap md:gap-5 items-center w-full justify-around py-5">
          {quickCategories.map((qc, index) => (
            <Link
              key={index}
              href={"/"}
              className="flex flex-col items-center gap-2 "
            >
              <Image
                src={qc.image}
                alt={qc.label || ""}
                width={200}
                height={200}
                loading="lazy"
                className="object-fill size-24 md:size-32"
              />
              <p className="font-bold text-base font-pelak ">{qc.label}</p>
            </Link>
          ))}
        </div>
        <div className="bg-primary-500 rounded-3xl p-4 shadow-[0px_9px_14px_0px_rgba(254,192,1,0.2)] grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="w-full col col-span-1 flex flex-col items-center gap-6 justify-between pr-10 py-10">
            <div className="flex flex-row lg:flex-col w-full h-full justify-between font-dana">
              <h2 className="text-red-600 text-6xl lg:text-5xl font-bold w-full font-pelak text-center flex items-center justify-center">
                آف صاف
              </h2>
              <FlipClock targetDate={new Date("9999-12-31T23:59:59")} />
            </div>
            <button className="hidden lg:block bg-red-600 text-white px-7 py-1.5 rounded-full border-2 border-red-700 hover:bg-red-700 transition-colors ease-in-out">
              مشاهده همه آف ها
            </button>
          </div>
          <div className="w-full lg:col-span-4 px-4 rounded-2xl">
            <Slider items={products} Card={Card} />
          </div>
          <button className="font-pelak lg:hidden block mx-auto bg-red-600 text-white px-7 py-1.5 rounded-full border-2 border-red-700 hover:bg-red-700 transition-colors ease-in-out">
            مشاهده همه آف ها
          </button>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-5 lg:gap-10 lg:h-48 my-7">
          <Image
            src={"/c1.jpg"}
            alt="تبلیغ"
            width={480}
            height={180}
            loading="lazy"
            fetchPriority="low"
            className="w-full rounded-3xl object-cover h-full"
          />
          <Image
            src={"/c2.jpg"}
            alt="تبلیغ"
            width={480}
            height={180}
            loading="lazy"
            fetchPriority="low"
            className="w-full rounded-3xl object-cover h-full"
          />
        </div>
        <div className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white">
          <div className="w-full flex justify-between px-4">
            <h4 className="font-semibold text-2xl">جدیدترین</h4>{" "}
            <Link href={"/products?sort=newest"} className="underline text-lg">
              مشاهده بیشتر محصولات​​​​​​​
            </Link>
          </div>
          <div className="px-12 mt-5">
            <Slider
              spaceBetween={35}
              className="!text-primary"
              items={latest_products}
              Card={Card}
            />
          </div>
        </div>
        <Image
          src={"/ads.jpg"}
          alt="تبلیغ"
          width={1000}
          height={200}
          fetchPriority="low"
          loading="lazy"
          className="w-full rounded-xl lg:rounded-3xl mb-5"
        />
        {featured_products.length > 0 && (
          <div className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white">
            <div className="w-full flex justify-between px-4">
              <h4 className="font-semibold text-2xl">پر فروش ترین ها</h4>{" "}
              <Link href={"/products"} className="underline text-lg">
                مشاهده بیشتر محصولات​​​​​​​
              </Link>
            </div>
            <div className="px-12 mt-5">
              <Slider
                spaceBetween={35}
                className="!text-primary"
                items={featured_products}
                Card={Card}
              />
            </div>
          </div>
        )}
        <div className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white flex lg:flex-row flex-col">
          <div className="flex lg:flex-col justify-between gap-5 px-4 text-nowrap">
            <h4 className="font-semibold text-2xl">بلاگ</h4>
            <div className="hidden  gap-0.5 lg:flex flex-col">
              <Link href={"/"}>دانستنی‌های ابزار دستی(۲۲)</Link>
              <Link href={"/"}>دانستنی های ابزار برقی و شارژی(۶۰)</Link>
              <Link href={"/"}>دانستنی‌های ابزار بادی و بنزینی(۱)</Link>
              <Link href={"/"}>دانستنی های ابزار الکتریک و روشنایی(۱)</Link>
            </div>
            <Link href={"/articles"} className="underline text-lg">
              مشاهده مطالب بیشتر
            </Link>
          </div>
          <div className="px-12 mt-5 lg:max-w-full w-full">
            <Slider
              spaceBetween={10}
              className="!text-primary"
              items={latest_articles}
              Card={QuickBlogCard}
              slidesPerView={3}
            />
          </div>
        </div>
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
