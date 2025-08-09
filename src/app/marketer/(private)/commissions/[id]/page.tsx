import { marketing_commissions_read } from "@/services/marketingActions";
import { notFound } from "next/navigation";
import Commission from "./Commission";

export default async function Page({ params }: any) {
  if (params.id === undefined) return notFound();
  const { id } = await params;
  const res = await marketing_commissions_read(id);
  if (!res) return notFound();
  if (!res.data && !res.success)
    return (
      <div>
        <h1 className="text-center text-red-500">
          خطا در دریافت اطلاعات درخواست
        </h1>
        <p>{res.message || "خطای ناشناخته"}</p>
      </div>
    );
  return (
    <div>
      <Commission order={res.data} />
    </div>
  );
}
