import GalleryModal from "@/components/GalleryModal";
import { homeGalleryList } from "@/services/homeActions";

import Detail from "../../Detail";
type Props = {
  params: Promise<{
    galleryId: string;
  }>;
};
async function page({ params }: Props) {
  const { galleryId } = await params;
  const data = await homeGalleryList();
  const selected = data.find((g: any) => g.id === Number(galleryId));
  if (!selected?.id) {
    return <GalleryModal>چنین گالری با این ایدی وجود ندارد</GalleryModal>;
  }

  return (
    <GalleryModal>
      <Detail data={selected} />
    </GalleryModal>
  );
}

export default page;
