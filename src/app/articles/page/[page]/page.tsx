export const dynamic = "force-dynamic";

import BlogCard from "@/components/BlogCard";
import ErrorMessage from "@/components/ErrorMessage";
import PaginationBox from "@/components/Products/PaginationBox";
import { GetBlogPosts } from "@/services/blogActions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
  params: Promise<{ page?: string }>;
}

const getCashedBlogPosts = async (searchParams: any, page?: string) => {
  try {
    const search = await searchParams;
    return await GetBlogPosts(search, page);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
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

export default async function ProductsPage({ params, searchParams }: any) {
  const { page } = await params;
  const search = await searchParams;
  const result = await getCashedBlogPosts(search, page);

  if (!result) {
    return notFound();
  }

  if (!result.data || result.data.length === 0) {
    notFound();
  }

  const posts = result.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <BlogCard key={post.id} item={post} />
      ))}

      <PaginationBox
        href="articles"
        searchParams={search}
        total={+result.total_pages || 1}
        page={Number(page) || 1}
      />
    </div>
  );
}
