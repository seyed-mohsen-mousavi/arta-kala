"use client";

import { useState, useEffect } from "react";
import { convertNumberToPersian } from "@/utils/converNumbers";
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { SwiperSlide, Swiper } from "swiper/react";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ImageType = {
  id: number;
  image: string;
  order: number;
};

type Gallery = {
  id: number;
  title: string;
  description: string;
  footer_text: string;
  images: ImageType[];
};

export default function GalleryPage({ galleries }: { galleries: Gallery[] }) {
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  const handleOpenGallery = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setLoadingImages(true);
    setLoadedCount(0);
    onOpen();
  };

  // وقتی همه تصاویر بارگذاری شدند، لودینگ false میشه
  useEffect(() => {
    if (selectedGallery && loadedCount === selectedGallery.images.length) {
      setLoadingImages(false);
    }
  }, [loadedCount, selectedGallery]);

  // فول‌اسکرین کردن تصویر (از Fullscreen API)
  const openFullscreen = (src: string) => {
    // ساخت یک المان img در داکیومنت برای fullscreen
    const img = document.createElement("img");
    img.src = src;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.style.backgroundColor = "black";

    const fullscreenDiv = document.createElement("div");
    fullscreenDiv.style.position = "fixed";
    fullscreenDiv.style.top = "0";
    fullscreenDiv.style.left = "0";
    fullscreenDiv.style.width = "100vw";
    fullscreenDiv.style.height = "100vh";
    fullscreenDiv.style.backgroundColor = "black";
    fullscreenDiv.style.display = "flex";
    fullscreenDiv.style.justifyContent = "center";
    fullscreenDiv.style.alignItems = "center";
    fullscreenDiv.style.zIndex = "9999";
    fullscreenDiv.appendChild(img);

    // کلیک روی div برای خروج از fullscreen
    fullscreenDiv.onclick = () => {
      document.body.removeChild(fullscreenDiv);
    };

    document.body.appendChild(fullscreenDiv);

    // اگر مرورگر از Fullscreen API پشتیبانی کرد:
    if (fullscreenDiv.requestFullscreen) {
      fullscreenDiv.requestFullscreen();
    }
  };

  // Skeleton ساده
  const Skeleton = () => (
    <div className="animate-pulse bg-gray-300 rounded-md w-full h-[450px]" />
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {galleries.map((gallery) => {
          const firstImage = gallery.images
            .slice()
            .sort((a, b) => a.order - b.order)[0];

          if (!firstImage) return null;

          return (
            <div key={gallery.id} className="flex flex-col items-center">
              <button
                onClick={() => handleOpenGallery(gallery)}
                className="overflow-hidden rounded-3xl shadow-xl"
              >
                <Image
                  src={firstImage.image}
                  alt={gallery.title}
                  width={300}
                  height={200}
                  className="w-full h-72 object-cover rounded-3xl hover:scale-105 transition"
                />
              </button>

              <h3 className="mt-3 text-center font-semibold text-2xl line-clamp-1">
                {gallery.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {convertNumberToPersian(gallery.images.length)} تصویر
              </p>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="5xl"
        classNames={{
          body: "py-6",
          base: "border-[#292f46] bg-white text-[#a8b0d3]",
          header: "border-b-[1px] border-zinc-200",
          footer: "border-t-[1px] border-zinc-200",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-bold text-black">
                {selectedGallery?.title}
              </ModalHeader>
              <ModalBody className="space-y-4">
                <div className="relative w-full h-full">
                  {selectedGallery && typeof window !== "undefined" && (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      spaceBetween={10}
                      slidesPerView={1}
                      className="rounded-xl overflow-hidden"
                    >
                      {selectedGallery.images
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((img) => (
                          <SwiperSlide key={img.id}>
                            <div className="relative w-full h-[450px]">
                              <Image
                                src={img.image}
                                alt={selectedGallery.title}
                                fill
                                style={{ objectFit: "cover" }}
                                onLoadingComplete={() =>
                                  setLoadedCount((c) => c + 1)
                                }
                                sizes="(max-width: 768px) 100vw,
                                       (max-width: 1200px) 50vw,
                                       33vw"
                                priority
                              />
                              <button
                                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded px-2 py-1 text-sm hover:bg-opacity-75 transition"
                                onClick={() => openFullscreen(img.image)}
                                aria-label="نمایش فول اسکرین"
                                type="button"
                              >
                                Fullscreen
                              </button>
                            </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  )}
                </div>

                {selectedGallery?.description && (
                  <div className="prose text-sm [&_a]:spoiler-link max-w-full mt-7">
                    {parse(sanitizeHtml(selectedGallery.description))}
                  </div>
                )}

                {selectedGallery?.footer_text && (
                  <div className="prose text-sm [&_a]:spoiler-link max-w-full mt-7 ">
                    {parse(sanitizeHtml(selectedGallery.footer_text))}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
