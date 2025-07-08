import BlogCard, { BlogCardSkeleton } from "@/components/BlogCard";
import { GetBlogPosts } from "@/services/blogActions";

async function page() {
  const result = await GetBlogPosts();
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

export default page;
