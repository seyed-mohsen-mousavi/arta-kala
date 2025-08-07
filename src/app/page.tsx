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
import FlipClock from "@/components/FlipClockWrapper";
import { Metadata } from "next";

export type ImageType = {
  id: number;
  image: string;
  alt: string;
  link?: string;
  order?: number;
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

import HomeSlider from "@/components/HomeSlider";
import { homeSliderList } from "@/services/homeActions";

export const metadata: Metadata = {
  title: "تکنو صاف | فروشگاه آنلاین با تضمین کیفیت",
  description:
    "تکنو صاف، فروشگاه تخصصی با بهترین قیمت و تضمین کیفیت. ارسال سریع، تخفیف‌های ویژه، و مقالات آموزشی تخصصی.",
  keywords: [
    "تکنو صاف",
    "فروشگاه آنلاین",
    "خرید آنلاین",
    "قیمت مناسب",
    "تضمین کیفیت",
    "تخفیف ویژه",
  ],
  openGraph: {
    title: "تکنو صاف",
    description: "خرید آنلاین با تضمین کیفیت و ارسال سریع از تکنو صاف",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "تکنو صاف",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "تکنو صاف",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "تکنو صاف",
    description: "خرید آنلاین با تضمین کیفیت و ارسال سریع از تکنو صاف",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.jpg`],
  },
};

export default async function Home() {
  let products: ProductType[] = [];
  let latest_products: ProductType[] = [];
  let featured_products: ProductType[] = [];
  let latest_articles = [];
  const sliders = await homeSliderList();
  try {
    const [
      data,
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
    latest_products = latestData.results || [];
    featured_products = featuredData.featured_products || [];
    latest_articles = articles || [];
  } catch (error) {
    console.error("Fetch Faild : ", error);
  }
  const images = sliders
    ?.sort((a: { order: number }, b: { order: number }) => a.order - b.order)
    ?.map((item: ImageType) => ({
      id: item.id,
      src: item.image,
      alt: `بنر تبلیغاتی شماره ${item.order}`,
    }));
  return (
    <div className="w-full">
      {images?.length > 0 && (
        <header className="flex flex-col gap-4 w-full h-full max-h-[500px] overflow-hidden">
          <HomeSlider images={images} />
        </header>
      )}

      <section className="max-w-[1270px] mx-auto space-y-10 px-2 sm:px-6">
        <nav
          aria-label="دسته‌بندی‌های سریع"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full py-8"
        >
          {quickCategories.map((qc, index) => (
            <Link
              key={index}
              href="/"
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-zinc-100 shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              aria-label={`دسته‌بندی ${qc.label}`}
              title={qc.label}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-zinc-50 flex items-center justify-center border border-zinc-200 p-2">
                <Image
                  src={qc.image}
                  alt={qc.label || "دسته‌بندی"}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="font-bold  lg:text-lg text-center text-zinc-700 group-hover:text-primary-800 transition-colors duration-300">
                {qc.label}
              </p>
            </Link>
          ))}
        </nav>

        <section
          aria-labelledby="offers-title"
          className="bg-gradient-to-r from-primary via-yellow-200 to-primary rounded-3xl pl-5 grid grid-cols-1 lg:grid-cols-5  transition-transform py-2"
        >
          <div className="w-full col-span-1 flex flex-row md:flex-col items-center gap-6 justify-between md:py-10">
            <Link
              href={"#offers"}
              className="flex flex-row lg:flex-col md:w-full h-full justify-between items-center font-dana"
              role="region"
              aria-live="polite"
            >
              <Image
                src="/Amazings.svg"
                alt="آفرهای ویژه"
                width={200}
                height={200}
                className="w-full h-32 lg:h-40 object-contain"
              />
              <FlipClock targetDate={new Date("9999-12-31T23:59:59")} />
            </Link>

            <button
              type="button"
              className=" bg-white text-black text-xs sm:text-sm px-7 py-2 rounded-full ring-4 ring-primary-200 hover:ring-primary-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition shadow-lg hover:shadow-2xl"
            >
              مشاهده همه آف‌ها
            </button>
          </div>

          <div className="w-full lg:col-span-4 px-4 h-full flex flex-col items-center justify-center  md:pl-8 ">
            <Slider spaceBetween={0} items={products} Card={Card} />
          </div>

          {/* <button
            type="button"
            className="lg:hidden mx-auto bg-white text-black mb-2 text-sm px-7 py-2 rounded-full ring-4 ring-primary-200 hover:ring-primary-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition shadow-lg hover:shadow-2xl"
          >
            مشاهده همه تخفیف ها
          </button> */}
        </section>

        <section
          className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white"
          aria-labelledby="latest-products-title"
        >
          <div className="w-full flex justify-between px-4">
            <h4 id="latest-products-title" className="font-semibold text-2xl">
              جدیدترین
            </h4>
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
        </section>

        <Image
          src={"/ads.jpg"}
          alt="تبلیغ ویژه"
          width={1000}
          height={100}
          fetchPriority="low"
          loading="lazy"
          className="w-full rounded-xl lg:rounded-3xl my-5"
        />

        {featured_products.length > 0 && (
          <section
            className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white"
            aria-labelledby="featured-products-title"
          >
            <div className="w-full flex justify-between px-4">
              <h4
                id="featured-products-title"
                className="font-semibold text-2xl"
              >
                پر فروش ترین ها
              </h4>
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
          </section>
        )}

        <section
          className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white flex flex-col lg:flex-row overflow-hidden"
          aria-labelledby="articles-title"
        >
          <div className="w-full lg:w-1/3 flex flex-col lg:justify-between gap-5 px-2 lg:px-4">
            <h4 id="articles-title" className="font-semibold text-2xl">
              مقالات
            </h4>

            <nav
              className="hidden lg:flex flex-col gap-2"
              aria-label="دسته‌بندی مقالات"
            >
              <Link href={"/"}>دانستنی‌های ابزار دستی (۲۲)</Link>
              <Link href={"/"}>دانستنی‌های ابزار برقی و شارژی (۶۰)</Link>
              <Link href={"/"}>دانستنی‌های ابزار بادی و بنزینی (۱)</Link>
              <Link href={"/"}>دانستنی‌های ابزار الکتریک و روشنایی (۱)</Link>
            </nav>

            <Link href={"/articles"} className="underline text-lg">
              مشاهده مطالب بیشتر
            </Link>
          </div>

          <div className="mt-5 lg:w-2/3 px-4 lg:px-12">
            <Slider
              className="!text-primary"
              items={latest_articles}
              Card={QuickBlogCard}
              spaceBetween={10}
              slidesPerView={2.2}
            />
          </div>
        </section>

        <section
          className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white mt-10"
          aria-label="برندها"
        >
          <div className="px-12 h-full">
            <Slider
              spaceBetween={35}
              className="!text-primary"
              items={brands}
              Card={Brand}
            />
          </div>
        </section>
      </section>
    </div>
  );
}
