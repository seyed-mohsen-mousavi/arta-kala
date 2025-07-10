"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Autoplay } from "swiper/modules";

function ProductSlider({
  items,
  Card,
  spaceBetween = 20,
  className,
  slidesPerView = 4,
}: {
  items: any[];
  Card: any;
  spaceBetween?: number;
  slidesPerView?: number;
  className?: string;
}) {
  const swiperRef: any = useRef(null);
  return items?.length > 0 ? (
    <div className="relative w-full h-full">
      <Swiper
        navigation={false}
        spaceBetween={spaceBetween}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={items?.length > 2}
        autoplay={items?.length > 1}
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
        {items.map((item: any, index: number) => (
          <SwiperSlide key={item.id || index} className="p-3">
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه‌ها */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`absolute top-1/2 -left-6 md:-left-10 -translate-y-1/2 text-red-500 ${className} z-20 drop-shadow-xl`}
        aria-label="Previous Slide"
      >
        <GoChevronLeft className="size-8 md:size-12" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={`absolute top-1/2 -right-6 md:-right-10 -translate-y-1/2 text-red-500 ${className} z-20 drop-shadow-xl`}
        aria-label="Next Slide"
      >
        <GoChevronRight className="size-8 md:size-12" />
      </button>
    </div>
  ) : (
    "خطا در دریافت اطلاعات"
  );
}

export default ProductSlider;
