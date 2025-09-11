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
  GetShopCategoriesTreeList,
} from "@/services/shopActions";
import {
  GetBlogCategoriesMenuStructure,
  GetLatestArticles,
} from "@/services/blogActions";
import FlipClock from "@/components/FlipClockWrapper";
import { Metadata } from "next";

export type ImageType = {
  id: number;
  image: string;
  alt: string;
  link?: string;
  order?: number;
};
import { HiOutlineCube } from "react-icons/hi";

const brands = [
  {
    name: "بوش (BOSCH)",
    image: "/brands/d292c0fe-5ba9-4725-b6e5-1a80cf3f1c8aLogo_Bosch_Sicherheitssysteme_GmbH.png"
  },
  {
    name: "فیلیپس (PHILIPS)",
    image: "/brands/1687378b-4dce-4c5f-88b0-eaf175e96ec01820px-Philips-Crest-Logo.png"
  },
  {
    name: "تفال (TEFAL)",
    image: "/brands/1c6e27a7-0cb1-413e-87c9-3cb030c7b173410_tefal.jpg"
  },
  {
    name: "پاناسونیک (PANASONIC)",
    image: "/brands/d0eecc7a-e030-4dfa-b7d0-7380eba86b06Brand__Panasonic.jpg"
  },
  {
    name: "براون (BRAUN)",
    image: "/brands/b2eeba94-f502-4c0c-add8-3adacaa9e2d6original-braun-logo.jpg"
  },
  {
    name: "مولینکس (Moulinex)",
    image: "/brands/1254ca41-da94-4e80-9a5e-16a6bf746603135124971_uvXGhYOh0GEHIuVMB1z7dU5JK2ovACFcHB5eotxZ_28.jpg"
  },
  {
    name: "کلیکون (Clicon)",
    image: "/brands/5aa09b13-9922-485d-a75d-af9240151891images1.jpg"
  },
  {
    name: "دلونگی (DeLonghi)",
    image: "/brands/0dbecab9-c3da-49bc-bfdb-872db972ec81تعمیرات-دلونگی.jpeg"
  },
  {
    name: "بابلیس",
    image: "/brands/dc5afe24-8ca2-47e2-8a35-1776d6db8f46IMG_8799.png"
  }
];


import HomeSlider from "@/components/HomeSlider";
import { homeSliderList } from "@/services/homeActions";
import { ChevronLeft } from "lucide-react";
// import ProductSlider from "@/components/ProductSlider";

export const metadata: Metadata = {
  title: " آرتا کالا",
  description:
    "آرتا کالا، فروشگاه تخصصی با بهترین قیمت و تضمین کیفیت. ارسال سریع، تخفیف‌های ویژه، و مقالات آموزشی تخصصی.",
  keywords: [
    "آرتا کالا",
    "فروشگاه آنلاین",
    "خرید آنلاین",
    "قیمت مناسب",
    "تضمین کیفیت",
    "تخفیف ویژه",
  ],
  openGraph: {
    title: "آرتا کالا",
    description: "خرید آنلاین با تضمین کیفیت و ارسال سریع از آرتا کالا",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "آرتا کالا",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "آرتا کالا",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "آرتا کالا",
    description: "خرید آنلاین با تضمین کیفیت و ارسال سریع از آرتا کالا",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.jpg`],
  },
};
const features = [
  {
    img: "/assets/history.png",
    title: "ضمانت بازگشت وجه",
    desc: "در صورت عدم رضایت",
  },
  {
    img: "/assets/credit-card.png",
    title: "تضمین قیمت",
    desc: "کمترین قیمت بازار",
  },
  {
    img: "/assets/fast.png",
    title: "ارسال سریع",
    desc: "امن و مطمئن",
  },
  {
    img: "/assets/headphone.png",
    title: "پشتیبانی عالی",
    desc: "24 ساعته شبانه روز",
  },
  {
    img: "/assets/badge.png",
    title: "اصالت کالا",
    desc: "تضمین اصالت کالا",
  },
];
export default async function Home() {
  let products: ProductType[] = [];
  let latest_products: ProductType[] = [];
  let featured_products: ProductType[] = [];
  let latest_articles = [];
  const shopCategoriesResponse = await GetShopCategoriesTreeList();
  const blogCategoriesResponse = await GetBlogCategoriesMenuStructure();
  const shopCategories = shopCategoriesResponse?.data || [];
  const sliders = await homeSliderList();
  try {
    const [
      data,
      { data: latestData },
      { data: featuredData },
      { data: articles },
    ] = await Promise.all([
      GetProducts({}, 1, true),
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
        <header className="max-w-[1470px] py-5 mx-auto gap-4 w-full h-full max-h-[500px] overflow-hidden">
          {/* <div className="col-span-1">
            <div className="size-full">
              <ProductSlider />
            </div>
          </div> */}
          <div className="w-full  overflow-hidden rounded-2xl">
            <HomeSlider images={images} />
          </div>
        </header>
      )}
      <h1 className="sr-only">
        آرتا کالا| فروشگاه آنلاین ابزار با تضمین کیفیت
      </h1>
      <section className="max-w-[1470px] mx-auto space-y-3 px-2 sm:px-6">
        <section>
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-3 py-5 rounded-2xl bg-white shadow-md"
                >
                  <div className="w-12 sm:w-16 lg:w-20 flex-shrink-0">
                    <Image
                      width={200}
                      height={200}
                      src={item.img}
                      alt={item.title}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="ms-5 pr-2">
                    <h6 className="text-base sm:text-lg lg:text-xl font-semibold mb-1">
                      {item.title}
                    </h6>
                    <p className="text-gray-500  text-xs sm:text-sm lg:text-base m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
              navigation={false}
              slidesPerView={8}
            />
          </div>
        </section>
        <section className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white">
          <div className="mb-4 rounded-xl p-4 flex items-center justify-between flex-wrap">
            <div className="flex items-center">
              <Image
                src="/square.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <h5 className="text-[16px] mr-3 flex items-center font-bold">
                دسته بندی
                <span className="text-blue-500 ml-1">محصولات</span>
              </h5>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <nav
              aria-label="دسته‌بندی‌های سریع"
              className="inline-grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full place-content-center  justify-center py-8 "
            >
              {shopCategories.slice(0, 6).map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/products?category_id=${cat.id}`}
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-zinc-100 shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  aria-label={`دسته‌بندی ${cat.name}`}
                  title={cat.name}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-zinc-50 flex items-center justify-center border border-zinc-200 p-2">
                    {cat.icon ? (
                      <Image
                        src={cat.icon}
                        alt={`${cat.name} دسته‌بندی`}
                        width={96}
                        height={96}
                        loading="lazy"
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <HiOutlineCube className="w-12 h-12 text-zinc-400 group-hover:text-primary-700 transition-colors duration-300" />
                    )}
                  </div>
                  <p className="font-bold lg:text-lg text-center text-zinc-700 group-hover:text-primary-800 transition-colors duration-300">
                    {cat.name}
                  </p>
                </Link>
              ))}
            </nav>
          </div>
        </section>
        <section
          aria-labelledby="محصولات تخفیف دار"
          className="bg-gradient-to-r from-primary via-primary-300 to-primary rounded-3xl pl-5 grid grid-cols-1 lg:grid-cols-5  transition-transform py-2"
        >
          <div
            role="region"
            aria-label="مشاهده آفرهای ویژه"
            className="w-full col-span-1 flex flex-row md:flex-col items-center gap-6 justify-between md:py-10"
          >
            <Link
              href={"/products/offers"}
              className="flex flex-row lg:flex-col md:w-full h-full justify-between items-center font-dana"
            >
              <Image
                src="/Amazings.svg"
                alt="آفرهای ویژه"
                width={200}
                height={128}
                quality={60}
                className="w-full h-32 lg:h-40 object-contain"
              />
              <FlipClock targetDate={new Date("9999-12-31T23:59:59")} />
            </Link>

            <Link
              href="/products/offers"
              className="bg-white text-black text-xs sm:text-sm px-7 py-2 rounded-full ring-4 ring-primary-200 hover:ring-primary-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition shadow-lg hover:shadow-2xl"
            >
              مشاهده همه آف‌ها
            </Link>
          </div>

          <div className="w-full lg:col-span-4 px-4 h-full flex flex-col items-center justify-center  md:pl-8 ">
            <Slider
              spaceBetween={0}
              slidesPerView={3}
              items={products}
              Card={Card}
            />
          </div>
        </section>

        <section
          className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white"
          aria-labelledby="جدیدترین محصولات"
        >
          <div className="mb-4 rounded-xl p-4 flex items-center justify-between flex-wrap">
            <div className="flex items-center">
              <Image
                src="/square.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <h5 className="text-[16px] mr-3 flex items-center font-bold">
                <span className="text-blue-500 ml-1">جدیدترین</span>
                محصولات
              </h5>
            </div>
            <div>
              <Link
                href="/products?sort=newest"
                className="relative flex items-center font-bold text-blue-500 group"
              >
                مشاهده همه
                <ChevronLeft className="ml-1 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
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

        {featured_products.length > 0 && (
          <section
            className="w-full rounded-2xl border-2 border-gray-200 py-2 px-4 bg-white"
            aria-labelledby="featured-products-title"
          >
            <div className="mb-4 bg-white shadow-md rounded-xl p-4 flex items-center justify-between flex-wrap">
              <div className="flex items-center">
                <Image
                  src="/square.png"
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <h5 className="text-[16px] mr-3 flex items-center font-bold">
                  <span className="text-blue-500 ml-1">پرفروش ترین</span>
                  محصولات
                </h5>
              </div>
              <div>
                <Link
                  href="/products?sort=newest"
                  className="relative flex items-center font-bold text-blue-500 group"
                >
                  مشاهده همه
                  <ChevronLeft className="ml-1 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
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
          aria-labelledby="مقالات"
        >
          <div className="w-full lg:w-1/3 flex flex-col gap-5 px-2 lg:px-4">
            <div className="mb-4  rounded-xl p-4 flex items-center justify-between flex-wrap">
              <div className="flex items-center">
                <Image
                  src="/square.png"
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <h5 className="text-[16px] mr-3 flex items-center font-bold">
                  آخرین مطالب
                  <span className="text-blue-500 ml-1"> وبلاگ </span>
                </h5>
              </div>
              <div>
                <Link
                  href="/articles"
                  className="relative flex items-center font-bold text-blue-500 group"
                >
                  مشاهده همه
                  <ChevronLeft className="ml-1 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>

            <nav
              className="hidden lg:flex flex-col gap-2"
              aria-label="دسته‌بندی مقالات"
            >
              {blogCategoriesResponse?.slice(0, 4).map((cat) => (
                <Link key={cat.id} href={`/articles?category=${cat.slug}`}>{cat.title}</Link>
              ))}
            </nav>
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
      </section>
    </div>
  );
}
