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
  const swiperRef: any = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-full">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={false}
        navigation={false}
        autoplay
        
        keyboard={{ enabled: true }}
        modules={[Keyboard, Autoplay, Navigation]}
        className="size-full h-[200px] sm:h-[300px] md:h-full"
        
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {images.map((image) => (
          <SwiperSlide
            key={image.id}
            className="w-full h-full overflow-hidden relative"
          >
            <Link href={image.link}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                className="w-full h-full object-cover aspect-video"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 shadow-sm rounded-full cursor-pointer ${
              index === activeIndex ? "bg-primary w-5" : "bg-zinc-100"
            } transition-all ease-soft-spring duration-300`}
            onClick={() => swiperRef.current?.slideTo(index)}
          />
        ))}
      </div>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-1/2 left-1 md:left-2 -translate-y-1/2  text-[#a4a4a4]  z-20 drop-shadow-xl hover:-translate-x-2 transition-transform ease-in-out"
        aria-label="Previous Slide"
      >
        <GoChevronLeft className="size-8 sm:size-10 lg:size-12" />
      </button>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-1/2  right-1 md:right-2 -translate-y-1/2  text-[#a4a4a4]  z-20 drop-shadow-xl hover:translate-x-2 transition-transform ease-in-out"
        aria-label="Next Slide"
      >
        <GoChevronRight className="size-8 sm:size-10 lg:size-12" />
      </button>
    </div>
  );
}
export default Slider;
