import { cache } from "react";
import { homeGalleryList } from "@/services/homeActions";
import GalleryModal from "@/components/GalleryModal";
import Detail from "../../Detail";
import type { Metadata } from "next";

const getGalleryList = cache(() => homeGalleryList());

export async function generateMetadata({
  params,
}: {
  params: Promise<{ galleryId: string }>;
}): Promise<Metadata> {
  const { galleryId } = await params;
  const data = await getGalleryList();
  const selected = data.find((g: any) => g.id === Number(galleryId));

  if (!selected) {
    return {
      title: "گالری پیدا نشد | تکنو صاف",
      description: "گالری مورد نظر یافت نشد.",
    };
  }

  const title = `${selected.title} | گالری تصاویر تکنو صاف`;
  const description = `مشاهده تصاویر مربوط به ${selected.title} در گالری تکنو صاف.`;
  const images =
    selected.images
      ?.sort((a: any, b: any) => a.order - b.order)
      .map((img: any) => ({
        url: img.image,
        alt: selected.title,
      })) || [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery/${selected.id}`,
      siteName: "تکنو صاف",
      locale: "fa_IR",
      type: "website",
      images: images.length > 0 ? images : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.length > 0 ? [images[0].url] : undefined,
    },
  };
}

type Props = {
  params: Promise<{ galleryId: string }>;
};

async function page({ params }: Props) {
  const { galleryId } = await params;
  const data = await getGalleryList();
  const selected = data.find((g: any) => g.id === Number(galleryId));

  if (!selected?.id) {
    return <GalleryModal>چنین گالری با این آیدی وجود ندارد</GalleryModal>;
  }

  return (
    <GalleryModal>
      <Detail data={selected} />
    </GalleryModal>
  );
}

export default page;
