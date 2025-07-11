import {
  GetBlogBySlug,
  GetBlogCategoriesMenuStructure,
  GetLatestBlogPosts,
} from "@/services/blogActions";
import Article from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFolderOpen } from "react-icons/fa6";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import moment from "moment-jalaali";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await GetBlogBySlug(decodedSlug);
  const categories = await GetBlogCategoriesMenuStructure();
  const latestPosts = await GetLatestBlogPosts();
  if (!data) return notFound();
  const formatPersianDate = (jalaliDate: string) => {
    moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
    return moment(jalaliDate, "jYYYY-jMM-jDD").format("jDD jMMMM jYYYY");
  };
  return (
    <div className="flex items-start gap-10 p-5 font-pelak">
      <div className="w-3/4 bg-white py-10 px-20 shadow-xl rounded-2xl">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
        <div className="flex items-center gap-5 text-primary-700">
          <p className="flex items-center gap-1">
            <HiMiniCalendarDateRange className="size-5" />

            <span>{formatPersianDate(data.jalali_created)}</span>
          </p>
          <Link
            href={`/articles?category_id=${data.category.id}`}
            className="flex items-center gap-1"
          >
            <FaFolderOpen className="size-5" />
            <span>{data.category.title}</span>
          </Link>
        </div>
        <p className="text-zinc-600 mb-1 mt-5">{data.introduction}</p>
        <Image
          src={data.thumbnail}
          alt={data.title}
          width={720}
          height={445}
          priority
          className="object-cover w-full h-auto aspect-video "
        />
        <div className="prose text-sm [&_a]:spoiler-link max-w-full mt-7">
          {parse(sanitizeHtml(data.content))}
        </div>
      </div>
      <div className="w-3/12 flex flex-col gap-5 sticky top-20">
        <div className="bg-white shadow-2xl p-4 rounded-xl">
          <h2 className="text-3xl py-4 font-pelak text-[#d55931] font-bold">
            {" "}
            دسته بندی ها
          </h2>
          <ul className="font-pelak">
            {categories?.map((cat , key) => (
              <li key={key} className="text-lg">
                <Link href={`/articles/${cat.id}`}>{cat.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-2xl p-4 rounded-xl">
          <h2 className="text-3xl py-4 mb-3 font-pelak text-[#d55931] font-bold">
            {" "}
            آخرین مطالب
          </h2>

          <ul className="font-pelak">
            {latestPosts?.map((post: Article) => (
              <li key={post.id} className="text-lg flex items-start gap-4">
                <Link href={`/article/${post.slug}`}>
                  <Image
                    src={`https://mpttools.co${post.thumbnail}`}
                    alt=""
                    width={100}
                    height={100}
                    className="w-32 h-20 object-cover rounded-2xl"
                  />
                </Link>
                <div>
                  <Link href={`/articles/${post.id}`} className="font-semibold">
                    {post.title}
                  </Link>
                  <p className=" p-1 bg-primary-100 text-primary-600 font-semibold text-sm">
                    {formatPersianDate(post.jalali_created)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
