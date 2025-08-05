import { homeGalleryList } from "@/services/homeActions";
import BreadcrumbsBox from "@/components/Products/BreadcrumbsBox";
import { convertNumberToPersian } from "@/utils/converNumbers";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type Image = {
  id: number;
  image: string;
  order: number;
};

type Gallery = {
  id: number;
  title: string;
  description: string;
  footer_text: string;
  images: Image[];
};
export const metadata: Metadata = {
  title: "گالری تصاویر | تکنو صاف",
  description:
    "گالری تصاویر فروشگاه تکنو صاف شامل مجموعه‌ای از عکس‌های باکیفیت محصولات و رویدادهای ما. تصاویر متنوع و جذاب برای دید بهتر شما.",
  keywords: [
    "گالری تصاویر",
    "تکنو صاف",
    "عکس محصولات تکنو صاف",
    "گالری فروشگاه تکنو صاف",
  ],
  openGraph: {
    title: "گالری تصاویر | تکنو صاف",
    description:
      "گالری تصاویر فروشگاه تکنو صاف شامل مجموعه‌ای از عکس‌های باکیفیت محصولات و رویدادهای ما. تصاویر متنوع و جذاب برای دید بهتر شما.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`,
    siteName: "تکنو صاف",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "گالری تصاویر | تکنو صاف",
    description:
      "گالری تصاویر فروشگاه تکنو صاف شامل مجموعه‌ای از عکس‌های باکیفیت محصولات و رویدادهای ما. تصاویر متنوع و جذاب برای دید بهتر شما.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default async function Gallery() {
  const data = await homeGalleryList();
  return (
    <>
      <BreadcrumbsBox
        title="گالری"
        items={[{ label: "خانه", href: "/" }, { label: "گالری" }]}
      />
      <div className="p-5">
        <h1 className="text-3xl font-bold mb-4">گالری </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.map((gallery: Gallery) => {
            const firstImage = gallery.images
              .slice()
              .sort((a, b) => a.order - b.order)[0];

            if (!firstImage) return null;

            return (
              <div key={gallery.id} className="flex flex-col items-center">
                <Link
                  href={`/gallery/${gallery.id}`}
                  className="overflow-hidden rounded-3xl shadow-xl"
                >
                  <Image
                    src={`${firstImage.image}`}
                    alt={`${gallery.title}`}
                    width={300}
                    height={200}
                    className="w-full h-72 object-cover rounded-3xl hover:scale-105 transition"
                  />
                </Link>

                <h3 className="mt-3 text-center font-semibold text-2xl line-clamp-1">
                  {gallery.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {convertNumberToPersian(gallery.images.length)} تصویر
                </p>
              </div>
            );
          })}
        </div>{" "}
      </div>
    </>
  );
}
