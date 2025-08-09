// import Request from "./Request";
// import { marketing_withdrawal_request } from "@/services/marketingActions";
// import { notFound } from "next/navigation";

// async function Page({ params }: any) {
//   if (params.id === undefined) return notFound();
//   const { id } = await params;
//   const res = await marketing_withdrawal_request(id);
//   console.log(res)
//   if (!res) return notFound();
//   if (!res.data && !res.success)
//     return (
//       <div>
//         <h1 className="text-center text-red-500">
//           خطا در دریافت اطلاعات درخواست
//         </h1>
//         <p>{res.message || "خطای ناشناخته"}</p>
//       </div>
//     );
//   return (
//     <div>
//       <Request order={res.data} />
//     </div>
//   );
// }

// export default Page;
import { notFound } from "next/navigation";

function page() {
  return notFound();
}

export default page;
