"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Image as ImageType } from "@/app/page";
import Link from "next/link";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function Slider({ images }: { images: ImageType[] }) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-full">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={false}
        navigation={false}
        autoplay={images.length > 1}
        keyboard={{ enabled: true }}
        modules={[Keyboard, Autoplay, Navigation]}
        className="size-full rounded-2xl"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} className="w-full h-full">
            <Link href={image.link} className="relative block w-full h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                className="object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => swiperRef.current?.slideTo(index)}
            className={`w-2 h-2 rounded-full cursor-pointer shadow-sm transition-all ease-soft-spring duration-300 ${
              index === activeIndex ? "bg-primary w-5" : "bg-zinc-100"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="hidden sm:block absolute top-1/2 left-1 md:left-2 -translate-y-1/2 text-[#a4a4a4] z-20 drop-shadow-xl hover:-translate-x-2 transition-transform ease-in-out"
        aria-label="Previous Slide"
      >
        <GoChevronLeft className="size-8 sm:size-10 lg:size-12" />
      </button>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="hidden sm:block absolute top-1/2 right-1 md:right-2 -translate-y-1/2 text-[#a4a4a4] z-20 drop-shadow-xl hover:translate-x-2 transition-transform ease-in-out"
        aria-label="Next Slide"
      >
        <GoChevronRight className="size-8 sm:size-10 lg:size-12" />
      </button>
    </div>
  );
}
export default Slider;
