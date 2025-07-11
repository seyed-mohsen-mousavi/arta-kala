import dynamic from "next/dynamic";

interface Props {
  description_2: string;
}
const TabsBox = dynamic(() => import("./TabsBox"), {
  loading: () => <p>در حال بارگذاری...</p>,
});

export default function ProductClientTabs({ description_2 }: Props) {
  return <TabsBox description_2={description_2} />;
}
