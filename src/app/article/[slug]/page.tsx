// import { GetBlogBySlug } from "@/services/blogActions";
// import Article from "@/types/blog";
// import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  // const { slug } = await params;
  // const decodedSlug = decodeURIComponent(slug);
  // const res = await GetBlogBySlug(decodedSlug);
  // if (!res) return notFound();
  // const { data }: { data: Article } = res;
  return <div>page</div>;
}

export default page;
