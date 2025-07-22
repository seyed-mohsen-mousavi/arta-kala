import { homeGalleryList } from "@/services/homeActions";
import Image from "next/image";
import GalleryPage from "./Gallery";
import BreadcrumbsBox from "@/components/Products/BreadcrumbsBox";

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

export default async function Gallery() {
  const data = await homeGalleryList();
  console.log(data);
  return (
    <>
      <BreadcrumbsBox
        title="گالری"
        items={[{ label: "خانه", href: "/" }, { label: "گالری" }]}
      />
      <div className="p-5">
        <h1 className="text-3xl font-bold mb-4">گالری </h1>
        <GalleryPage galleries={data} />
      </div>
    </>
  );
}
