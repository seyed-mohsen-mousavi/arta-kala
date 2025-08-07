"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ReactNode, useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Autoplay } from "swiper/modules";
import ErrorMessage from "./ErrorMessage";

function ProductSlider({
  items,
  Card,
  spaceBetween = 20,
  className,
  slidesPerView = 4,
  firstItem,
}: {
  items: any[];
  Card: any;
  spaceBetween?: number;
  slidesPerView?: number;
  className?: string;
  firstItem?: ReactNode;
}) {
  const swiperRef: any = useRef(null);
  const safeItems = Array.isArray(items) ? items : [];

  if (safeItems.length === 0) {
    return <ErrorMessage />;
  }
  const enableLoop = items.length > slidesPerView + 1;
  const enableAutoplay = items.length > 1;
  return items?.length > 0 ? (
    <div className="relative w-full h-full">
      <Swiper
        navigation={false}
        spaceBetween={spaceBetween}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={enableLoop}
        autoplay={enableAutoplay}
        modules={[Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1224: {
            slidesPerView: slidesPerView,
          },
        }}
      >
        {firstItem && (
          <SwiperSlide className="p-3 hidden md:block">{firstItem}</SwiperSlide>
        )}

        {items.map((item: any, index: number) => (
          <SwiperSlide key={item.id || index} className="p-3">
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه‌ها */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={`
    absolute top-1/2 -left-6 md:-left-10 -translate-y-1/2 
    z-20 
    w-12 h-12 md:w-14 md:h-14
    rounded-full 
    bg-white bg-opacity-90 
    flex items-center justify-center 
    text-primary-600 
    shadow-sm 
    hover:shadow-md 
    transition-shadow duration-200 ease-in-out 
    active:outline-none active:ring-2 active:ring-primary-400 
    ${className}
  `}
        aria-label="Next Slide"
      >
        <GoChevronLeft className="size-8 md:size-10" />
      </button>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`
    absolute top-1/2 -right-6 md:-right-10 -translate-y-1/2 
    z-20 
    w-12 h-12 md:w-14 md:h-14
    rounded-full 
    bg-white bg-opacity-90 
    flex items-center justify-center 
    text-primary-600 
    shadow-sm 
    hover:shadow-md 
    transition-shadow duration-200 ease-in-out 
    active:outline-none active:ring-2 active:ring-primary-400 
    ${className}
  `}
        aria-label="Previous Slide"
      >
        <GoChevronRight className="size-8 md:size-10" />
      </button>
    </div>
  ) : (
    "خطا در دریافت اطلاعات"
  );
}

export default ProductSlider;
