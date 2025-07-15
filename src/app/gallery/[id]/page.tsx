// import { GetBlogBySlug } from "@/services/blogActions";
// import Link from "next/link";
// import { HiMiniCalendarDateRange } from "react-icons/hi2";
// import parse from "html-react-parser";
// import sanitizeHtml from "sanitize-html";
// import { FaFolderOpen } from "react-icons/fa6";

// async function page({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const decodedSlug = decodeURIComponent(slug);
//   const data = await GetBlogBySlug(decodedSlug);

//   return (
//     <div className="flex items-start gap-10 p-5 font-pelak">
//       <div className="w-full bg-white py-10 px-20 shadow-xl rounded-2xl">
//         <h1 className="text-3xl font-semibold">{data.title}</h1>
//         <div className="flex items-center gap-5 text-primary-700">
//           <p className="flex items-center gap-1">
//             <HiMiniCalendarDateRange className="size-5" />

//             {/* <span>{formatPersianDate(data.jalali_created)}</span> */}
//           </p>
//           <Link
//             href={`/articles?category_id=${data.category.id}`}
//             className="flex items-center gap-1"
//           >
//             <FaFolderOpen className="size-5" />
//             <span>{data.category.title}</span>
//           </Link>
//         </div>
//         <p className="text-zinc-600 mb-1 mt-5">{data.introduction}</p>
//         {/* <Image
//           src={data.thumbnail}
//           alt={data.title}
//           width={720}
//           height={445}
//           priority
//           className="object-cover w-full h-auto aspect-video "
//         /> */}
//         <div className="prose text-sm [&_a]:spoiler-link max-w-full mt-7">
//           {parse(sanitizeHtml(data.content))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default page;
// app/gallery/[id]/page.tsx
export default function ImageFullPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="p-10">
      {/* <h1>Full Image View: {params?.id}</h1> */}
      {/* Full screen image */}
    </div>
  );
}
