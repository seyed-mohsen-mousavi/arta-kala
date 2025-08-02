import BlogCard from "@/components/BlogCard";
import ErrorMessage from "@/components/ErrorMessage";
import { GetBlogPosts } from "@/services/blogActions";

async function page() {
  const result = await GetBlogPosts();
  if (!result || !result.data) return <ErrorMessage />;
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
