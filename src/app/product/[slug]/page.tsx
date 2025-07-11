import BreadcrumbsBox from "@/components/Products/BreadcrumbsBox";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GetProductBySlug,
  GetShopCategoriesTreeList,
} from "@/services/shopActions";
import { CategoryNode } from "@/types/categories";
import ProductType from "@/types/product";
import ProductClient from "@/components/Products/ProductClientPC";
import ProductClientTabs from "@/components/Products/ProductClientTabs";
import ProductClientMobile from "@/components/Products/ProductClientMobile";

function findCategory(
  categories: CategoryNode[],
  targetName: string
): CategoryNode | undefined {
  for (const category of categories) {
    if (category.name === targetName) {
      return category;
    }
    if (category.children) {
      const foundInChildren = findCategory(category.children, targetName);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return undefined;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const res = await GetProductBySlug(decodedSlug);
  if (!res) return notFound();

  const { data }: { data: ProductType } = res;

  const result = await GetShopCategoriesTreeList();
  const categories: CategoryNode[] = result?.data || [];

  const categoryFind = findCategory(categories, data.category);

  return (
    <div>
      <BreadcrumbsBox
        title={data.name}
        items={[
          { label: "خانه", href: "/" },
          { label: "محصولات", href: "/products" },
          {
            label: data.category,
            href: `/products/?category_id=${categoryFind?.id}`,
          },
          { label: data.name },
        ]}
      />

      {/* بخش اصلی: عکس و توضیحات + تب‌ها */}
      <div className="bg-white shadow-lg shadow-black/10 rounded-[5px] px-5 py-4 w-full mt-7 text-sm">
        {/* flex ستون عمودی */}
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full lg:w-1/3 h-full flex">
            {data.cover_image ? (
              <Image
                src={data.cover_image}
                alt={data.name}
                width={200}
                height={200}
                priority
                className="border-l-[1px] border-zinc-100 m-1 w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-zinc-200 rounded-md flex items-center justify-center border-l-[1px] border-zinc-100 m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="w-full lg:w-2/3 p-2 flex flex-col items-start space-y-5 px-4">
            <h1 className="text-2xl font-bold">{data.name}</h1>

            <div className="text-sm flex flex-col items-start gap-3">
              <div>
                <span>دسته :‌</span>{" "}
                <Link
                  href={`/products/?category_id=${categoryFind?.id}`}
                  className="text-cyan-400 spoiler-link relative"
                >
                  {data.category}
                </Link>
              </div>
              <div>
                <span>مشاهده انواع </span>{" "}
                <Link
                  href={`/products/?category_id=${categoryFind?.id}`}
                  className="text-cyan-400 spoiler-link relative"
                >
                  {data.category}
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold text-base mb-2">توضیحات</p>
              <div
                className="prose text-sm [&_a]:spoiler-link"
                dangerouslySetInnerHTML={{ __html: data.description_1 }}
              />
            </div>
          </div>
          <ProductClient product={data} />
        </div>
      </div>
      <ProductClientMobile product={data} />

      <div className="bg-white shadow-lg shadow-black/10 rounded-[5px] w-full mt-7 text-sm">
        <ProductClientTabs description_2={data.description_2} />
      </div>
    </div>
  );
}
