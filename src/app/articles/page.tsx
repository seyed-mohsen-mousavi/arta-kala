import BlogCard from "@/components/BlogCard";
import ErrorMessage from "@/components/ErrorMessage";
import { GetBlogPosts } from "@/services/blogActions";
import { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const getCashedBlogPosts = async (searchParams: any) => {
  const search = await searchParams;
  return await GetBlogPosts(search);
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const category = (await searchParams).category;

  let title = "مقالات تکنو صاف";
  let description = "آخرین مقالات و اخبار مرتبط با تکنو صاف را اینجا بخوانید.";
  if (category) {
    title = `مقالات دسته‌بندی ${category} | تکنو صاف`;
    description = `مقالات مرتبط با دسته‌بندی شماره ${category} در فروشگاه تکنو صاف.`;
  }

  return {
    title,
    description,
    keywords: [
      "مقالات",
      "تکنو صاف",
      "اخبار تکنو صاف",
      ...(category ? [`دسته‌بندی ${category}`] : []),
    ],
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/articles${category ? `?category=${category}` : ""}`,
      siteName: "تکنو صاف",
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function page({ searchParams }: PageProps) {
  const result = await getCashedBlogPosts(searchParams);
  if (!result || !result.data) return <ErrorMessage />;
  const posts = result.data;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <BlogCard key={post.id} item={post} />
      ))}
    </div>
  );
}

export default page;
