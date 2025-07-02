"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

function ProductSlider({
  items,
  Card,
  spaceBetween,
  className,
  slidesPerView,
}: {
  items: any[];
  Card: any;
  spaceBetween?: number;
  slidesPerView?: number;
  className?: string;
}) {
  const swiperRef: any = useRef(null);

  return (
    <div className="relative w-full h-full">
      <Swiper
        navigation={false}
        slidesPerView={slidesPerView || 4}
        spaceBetween={spaceBetween || 20}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {items.map((item: any, index: number) => (
          <SwiperSlide key={item.id || index}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={`absolute top-1/2 -left-12 -translate-y-1/2  text-red-500 ${className} z-20 drop-shadow-xl`}
        aria-label="Previous Slide"
      >
        <GoChevronLeft className="size-12" />
      </button>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`absolute top-1/2 -right-12 -translate-y-1/2  text-red-500 ${className} z-20 drop-shadow-xl`}
        aria-label="Next Slide"
      >
        <GoChevronRight className="size-12" />
      </button>
    </div>
  );
}

export default ProductSlider;
