"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Image as ImageType } from "@/app/page";
import Link from "next/link";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function Slider({ images }: { images: ImageType[] }) {
  const [isClient, setIsClient] = useState(false);
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goNext = useCallback(() => swiperRef.current?.slidePrev(), []);
  const goPrev = useCallback(() => swiperRef.current?.slideNext(), []);

  if (!isClient) return <SliderSkeleton />;

  return (
    <div className="relative w-full h-[200px] lg:h-[420px] group">
      <Swiper
        spaceBetween={10}
        slidesPerView={1.3}
        centeredSlides={true}
        navigation={false}
        loop
        keyboard={{ enabled: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Keyboard, Autoplay, Navigation]}
        className="size-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} className="w-full h-full">
            <Link href={image.link || ""} className="block h-full w-full">
              <div className="left-1/2 -translate-x-1/2 top-0 max-w-[1920px] absolute h-full w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={400}
                  priority
                  quality={85}
                  className="object-cover size-full rounded-3xl sm:rounded-none inline-block"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <div className="flex absolute bottom-5 left-1/2 -translate-x-1/2 gap-2 z-20">
          {images.map((_, index) => (
            <SlideDot
              key={index}
              active={index === activeIndex}
              onClick={() => swiperRef.current?.slideToLoop(index)}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="block absolute top-1/2 left-1 md:left-2 -translate-y-1/2 bg-white rounded-full p-1 border border-zinc-400 text-[#a4a4a4] z-20 drop-shadow-xl lg:hover:-translate-x-2 ease-in-out opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label="Previous Slide"
          >
            <GoChevronLeft className="size-8 sm:size-10 lg:size-12" />
          </button>

          <button
            onClick={goNext}
            className="block absolute top-1/2 right-1 md:right-2 -translate-y-1/2 bg-white rounded-full p-1 border border-zinc-400 text-[#a4a4a4] z-20 drop-shadow-xl lg:hover:translate-x-2 ease-in-out opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label="Next Slide"
          >
            <GoChevronRight className="size-8 sm:size-10 lg:size-12" />
          </button>
        </>
      )}
    </div>
  );
}

type SlideDotProps = {
  active: boolean;
  onClick: () => void;
};

function SlideDot({ active, onClick }: SlideDotProps) {
  return (
    <div
      onClick={onClick}
      className={`w-2 h-2 rounded-full cursor-pointer shadow-sm transition-all duration-300 ${
        active ? "bg-primary w-5" : "bg-zinc-100"
      }`}
    />
  );
}

function SliderSkeleton() {
  return (
    <div className="relative w-full h-[300px] xl:h-[420px] animate-pulse overflow-hidden rounded-3xl bg-gray-200">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-gray-400" />
        ))}
      </div>
    </div>
  );
}

export default Slider;
