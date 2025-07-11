"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
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

function SliderSkeleton() {
  return <div className="w-full h-full animate-pulse bg-zinc-300 rounded-2xl" />;
}

const HomeSlider = dynamic(() => import("@/components/HomeSlider"), {
  ssr: false,
  loading: () => <SliderSkeleton />,
});

function HomeHeroSection() {
  return (
    <header className="flex flex-col md:flex-row gap-4 w-full h-full py-4 lg:max-h-[500px] overflow-hidden">
      {/* اسلایدر */}
      <div className="relative w-full md:w-2/3 flex justify-center items-center h-72 sm:min-h-[250px] md:h-auto">
        <Suspense fallback={<SliderSkeleton />}>
          <HomeSlider images={images} />
        </Suspense>
      </div>

      {/* دو تصویر کناری */}
      <div className="flex flex-col space-y-4 w-full h-full md:w-1/3">
        <Link href="/some-page">
          <Image
            src="/dep.jpg"
            alt="تصویر بزرگ اول"
            width={200}
            height={200}
            loading="lazy"
            className="object-cover w-full h-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </Link>

        <Link href="/some-page">
          <Image
            src="/dep2.webp"
            alt="تصویر بزرگ دوم"
            width={200}
            height={200}
            loading="lazy"
            className="object-cover w-full h-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </Link>
      </div>
    </header>
  );
}

export default HomeHeroSection;
