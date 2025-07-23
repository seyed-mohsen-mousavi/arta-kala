import { homeGalleryList } from "@/services/homeActions";
import Detail from "../Detail";
import BreadcrumbsBox from "@/components/Products/BreadcrumbsBox";

type Props = {
  params: Promise<{
    galleryId: string;
  }>;
};
async function page({ params }: Props) {
  const { galleryId } = await params;
  const data = await homeGalleryList();
  const selected = data.find((g: any) => g.id === Number(galleryId));

  return (
    <div>
      <BreadcrumbsBox
        title="گالری"
        items={[
          { label: "خانه", href: "/" },
          { label: "گالری", href: "/gallery" },
          { label: selected.title },
        ]}
      />
      <Detail data={selected} />
    </div>
  );
}

export default page;
