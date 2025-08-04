import BreadcrumbsBox from "@/components/Products/BreadcrumbsBox";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GetComments,
  GetProductBySlug,
  GetShopCategoriesTreeList,
} from "@/services/shopActions";
import { CategoryNode } from "@/types/categories";
import ProductType from "@/types/product";
import TabsBox from "@/components/Products/TabsBox";
import AddToCart from "@/components/Products/AddToCart";

export function findCategory(
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

  const data: ProductType = res;
  const result = await GetShopCategoriesTreeList();
  const categories: CategoryNode[] = result?.data || [];

  const categoryFind = findCategory(categories, data.category);
  const comments = await GetComments(data.id);

  return (
    <>
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
      <div className="container customSm:max-w-[566px]">
        <div className="bg-white shadow-lg shadow-black/10 rounded-[5px] px-5 py-4 w-full mt-7 text-sm ">
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
            <div className="w-5/12 h-full space-y-3 lg:block hidden">
              <div className="bg-zinc-100 border border-zinc-200 p-5 text-center space-y-4 rounded-md">
                {data.is_available && data.stock > 0 && (
                  <>
                    {data.final_price ? (
                      <>
                        <div className="flex items-center justify-center mb-2">
                          <span className="line-through text-zinc-500 ml-2">
                            {data.price.toLocaleString("fa-IR")}
                          </span>
                        </div>
                        <p className="font-dana font-bold text-2xl">
                          {data.final_price.toLocaleString("fa-IR")}
                          <span className="font-light">تومان</span>
                        </p>
                      </>
                    ) : (
                      <p className="font-dana font-bold text-2xl">
                        {data.price.toLocaleString("fa-IR")}
                        <span className="font-light">تومان</span>
                      </p>
                    )}
                  </>
                )}
                {data.stock <= 5 && data.stock > 0 && (
                  <p
                    className={`text-right font-bold font-dana ${
                      data.stock <= 2 ? "text-danger" : "text-warning"
                    }`}
                  >
                    تنها {data.stock === 1 ? "یک" : data.stock + " عدد"} در
                    انبار باقی مانده
                  </p>
                )}
                <AddToCart
                  is_available={data.is_available && data.stock > 0}
                  product={data}
                />
              </div>

              {data.is_available && data.stock > 0 && (
                <>
                  <a href="#" className="text-cyan-400 spoiler-link relative">
                    آیا قیمت مناسب‌تری سراغ دارید؟
                  </a>
                  <div className="bg-white border border-zinc-200 rounded-lg p-2 flex justify-between w-full mt-5 px-3 items-center">
                    <div>
                      <p className="text-zinc-800">ارسال رایگان سفارش</p>
                      <p className="font-light text-zinc-500 font-dana pt-1">
                        سفارش‌های بالای 5 میلیون تومان
                      </p>
                    </div>
                    <div className="size-14 relative">
                      <img src="/free-delivery-free.svg" alt="ارسال رایگان" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="hidden sm:block lg:hidden bg-zinc-100 border border-zinc-200 p-5 my-5 text-center space-y-4 rounded-md">
          {data.is_available && data.stock > 0 && (
            <>
              <div className="flex items-center justify-center mb-2">
                <span className="line-through text-zinc-500 ml-2">
                  {data.price.toLocaleString("fa-IR")}
                </span>
              </div>
              <p className="font-dana font-bold text-2xl">
                {data.price.toLocaleString("fa-IR")}
                <span className="font-light">تومان</span>
              </p>
            </>
          )}
          <AddToCart
            is_available={data.is_available && data.stock > 0}
            product={data}
          />
        </div>
        {data.is_available && data.stock > 0 && (
          <div className="my-10 w-full h-full space-y-3 block lg:hidden px-4">
            <a href="#" className="text-cyan-400 spoiler-link relative">
              آیا قیمت مناسب‌تری سراغ دارید؟
            </a>
            <div className="bg-white border border-zinc-200 rounded-lg p-2 flex justify-between w-full mt-5 px-3 items-center">
              <div>
                <p className="text-zinc-800">ارسال رایگان سفارش</p>
                <p className="font-light text-zinc-500 font-dana pt-1">
                  سفارش‌های بالای 5 میلیون تومان
                </p>
              </div>
              <div className="size-14 relative">
                <img
                  src="/free-delivery-free.svg"
                  loading="lazy"
                  alt="ارسال رایگان"
                />
              </div>
            </div>
          </div>
        )}

        <div className="fixed bottom-0 z-30 right-0 w-full space-y-3 bg-white shadow-2xl sm:hidden p-3">
          {data.is_available && data.stock > 0 && (
            <>
              <div className="flex items-center justify-start mb-2">
                <p className="text-sm">
                  <span className="line-through text-zinc-500 ml-2">
                    {data.price.toLocaleString("fa-IR")} تومان
                  </span>
                </p>
              </div>
              <p className="font-dana font-bold text-base text-right">
                <span className="font-bold font-iranyekan text-lg">
                  {data.price.toLocaleString("fa-IR")}
                </span>
                <span className="font-light">تومان</span>
              </p>
              <AddToCart
                is_available={data.is_available && data.stock > 0}
                product={data}
              />
            </>
          )}
        </div>
        <div className="bg-white shadow-lg shadow-black/10 rounded-[5px] w-full mt-7 text-sm">
          <TabsBox
            comments={comments}
            productId={data.id}
            description_2={data.description_2}
          />
        </div>
      </div>
    </>
  );
}
