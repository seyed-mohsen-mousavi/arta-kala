import BlogCard from "@/components/BlogCard";
import { GetBlogPosts } from "@/services/blogActions";

export default async function page({ params }: { params: { page: string } }) {
  const currentPage = Number(params.page) || 1;

  const result = await GetBlogPosts(currentPage);
  if (!result) return <div className=" my-10">خطا در دریافت اطلاعات</div>;
  const posts = result.data;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 ">
      {posts.map((post) => (
        <BlogCard key={post.id} item={post} />
      ))}
    </div>
  );
}
