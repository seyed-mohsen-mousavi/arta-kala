"use client";
import React from "react";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import GallerySlider from "../../components/GallerySlider";

function Detail({ data }: { data: any }) {
  const images =
    data.images
      ?.sort((a: any, b: any) => a.order - b.order)
      .map((img: any) => ({
        id: img.id,
        src: img.image,
        alt: data.title,
      })) || [];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 container mx-auto py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b border-zinc-200 pb-3">
        {data?.title}
      </h1>

      <div className="mt-5 space-y-6">
        {images.length > 0 ? (
          <div className="relative w-full rounded overflow-hidden">
            <GallerySlider images={images} />
          </div>
        ) : (
          <div className="w-full aspect-video bg-gray-100 flex items-center justify-center rounded text-gray-400 text-sm">
            تصویری برای نمایش وجود ندارد
          </div>
        )}

        {data?.description && (
          <div className="prose prose-lg max-w-none text-gray-700">
            {parse(sanitizeHtml(data.description))}
          </div>
        )}

        {data?.footer_text && (
          <div className="prose prose-base max-w-none text-gray-600 border-t pt-4 ">
            {parse(sanitizeHtml(data.footer_text))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
