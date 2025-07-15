"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Image as ImageType } from "@/app/page";
import Link from "next/link";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function Slider({ images }: { images: ImageType[] }) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => swiperRef.current?.slidePrev(), []);
  const goPrev = useCallback(() => swiperRef.current?.slideNext(), []);

  return (
    <div className="relative w-full h-full xl:h-[420px]">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={false}
        autoplay={
          images.length > 1
            ? { delay: 4000, disableOnInteraction: false }
            : false
        }
        keyboard={{ enabled: true }}
        modules={[Keyboard, Autoplay, Navigation]}
        className="size-full rounded-2xl"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} className="w-full h-full">
            <Link
              href={image.link}
              className="relative block w-full  rounded-2xl overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={400}
                priority={index === 0 || index === 1}
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover size-full"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <div className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 gap-2 z-20">
          {images.map((_, index) => (
            <SlideDot
              key={index}
              active={index === activeIndex}
              onClick={() => swiperRef.current?.slideTo(index)}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="hidden sm:block absolute top-1/2 left-1 md:left-2 -translate-y-1/2 text-[#a4a4a4] z-20 drop-shadow-xl hover:-translate-x-2 transition-transform ease-in-out"
            aria-label="Previous Slide"
          >
            <GoChevronLeft className="size-8 sm:size-10 lg:size-12" />
          </button>

          <button
            onClick={goNext}
            className="hidden sm:block absolute top-1/2 right-1 md:right-2 -translate-y-1/2 text-[#a4a4a4] z-20 drop-shadow-xl hover:translate-x-2 transition-transform ease-in-out"
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
export default Slider;
