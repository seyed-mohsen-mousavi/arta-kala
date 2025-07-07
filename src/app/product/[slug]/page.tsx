import BreadcrumbsBox from "@/components/Products/BreadcrumbsBox";
import {
  GetProductBySlug,
  GetShopCategoriesTreeList,
} from "@/services/shopActions";
import { CategoryNode } from "@/types/categories";
import Image from "next/image";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import Link from "next/link";
import AddToCart from "@/components/Products/AddToCart";
import TabsBox from "@/components/Products/TabsBox";
import ProductType from "@/types/product";
import { CiImageOff } from "react-icons/ci";
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
  const { data }: { data: ProductType } = await GetProductBySlug(decodedSlug);
  const result = await GetShopCategoriesTreeList();
  const categories: CategoryNode[] = result?.data;
  const product = data;

  const categoryFind = findCategory(categories, product.category);
  return (
    <div>
      <BreadcrumbsBox
        title={data.name}
        items={[
          { label: "خانه", href: "/" },
          { label: "محصولات", href: "/products" },
          {
            label: product.category,
            href: `/products/?category_id=${categoryFind?.id}`,
          },
          { label: product.name },
        ]}
      />
      <div className="bg-white shadow-lg shadow-black/10 rounded-[5px] px-5 py-4 flex flex-col md:flex-row justify-between w-full mt-7 text-sm">
        <div className="w-full lg:w-1/3 h-full flex">
          {product.cover_image ? (
            <Image
              src={data.cover_image}
              alt={data.name}
              width={200}
              height={200}
              className="border-l-[1px] border-zinc-100 m-1 w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-96 bg-zinc-200 rounded-md flex items-center justify-center border-l-[1px] border-zinc-100 m-1">
              <CiImageOff className="size-15" />
            </div>
          )}
        </div>
        <div className="w-full h-full space-y-3 flex justify-between">
          <div className="w-full lg:w-2/3 p-2 flex flex-col items-start space-y-5 px-4">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <div className="text-sm flex flex-col items-start gap-3">
              <div>
                <span>دسته :‌</span>{" "}
                <Link href={""} className="text-cyan-400 spoiler-link relative">
                  {data.category}
                </Link>
              </div>
              <div>
                <span>مشاهده انواع </span>{" "}
                <Link href={""} className="text-cyan-400 spoiler-link relative">
                  {data.category}
                </Link>
              </div>
            </div>
            <div>
              <p className="font-semibold text-base mb-2">توضیحات</p>
              <div className="prose text-sm [&_a]:spoiler-link">
                {parse(sanitizeHtml(data.description_1))}
              </div>
            </div>
          </div>
          <div className="w-5/12 h-full space-y-3  lg:block hidden">
            <div className="bg-zinc-100 border border-zinc-200 p-5 text-center space-y-4">
              {product.is_available && (
                <>
                  <div className="flex items-center justify-center mb-2">
                    <span>
                      <span className="line-through text-zinc-500 ml-2">
                        {product.price.toLocaleString("fa-IR")}
                      </span>
                    </span>
                    <p className="rounded-full text-sm bg-danger text-white px-4 py-2">
                      %{Math.round(60).toLocaleString("fa-IR")}
                    </p>
                  </div>
                  <p className="font-dana font-bold text-2xl">
                    {data.price.toLocaleString("fa-IR")}
                    <span className="font-light">تومان</span>
                  </p>
                </>
              )}
              <AddToCart
                is_available={data.is_available}
                productId={data.id}
                stock={data.stock}
              />
            </div>
            {product.is_available && (
              <>
                <Link href={""} className="text-cyan-400 spoiler-link relative">
                  آیا قیمت مناسب‌تری سراغ دارید؟
                </Link>
                <div className="bg-white border border-zinc-200 rounded-lg p-2 flex justify-between w-full mt-5 px-3 items-center">
                  <div>
                    <p className="text-zinc-800">ارسال رایگان سفارش</p>
                    <p className="font-light text-zinc-500 font-dana pt-1">
                      سفارش‌های بالای 5 میلیون تومان
                    </p>
                  </div>
                  <div className="size-14 relative">
                    <Image fill src="/free-delivery-free.svg" alt="" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hidden sm:block lg:hidden bg-zinc-100 border border-zinc-200 p-5 my-5 text-center space-y-4">
        {product.is_available && (
          <>
            <div className="flex items-center justify-center mb-2">
              <span>
                <span className="line-through text-zinc-500 ml-2">
                  {product.price.toLocaleString("fa-IR")}
                </span>
              </span>
              <p className="rounded-full text-sm bg-danger text-white px-4 py-2">
                %{Math.round(60).toLocaleString("fa-IR")}
              </p>
            </div>
            <p className="font-dana font-bold text-2xl">
              {data.price.toLocaleString("fa-IR")}
              <span className="font-light">تومان</span>
            </p>
          </>
        )}
        <AddToCart
          is_available={data.is_available}
          productId={data.id}
          stock={data.stock}
        />
      </div>
      {product.is_available && (
        <div className="my-10 w-full h-full space-y-3  block lg:hidden">
          <Link href={""} className="text-cyan-400 spoiler-link relative">
            آیا قیمت مناسب‌تری سراغ دارید؟
          </Link>
          <div className="bg-white border border-zinc-200 rounded-lg p-2 flex justify-between w-full mt-5 px-3 items-center">
            <div>
              <p className="text-zinc-800">ارسال رایگان سفارش</p>
              <p className="font-light text-zinc-500 font-dana pt-1">
                سفارش‌های بالای 5 میلیون تومان
              </p>
            </div>
            <div className="size-14 relative">
              <Image fill src="/free-delivery-free.svg" alt="" />
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 z-30 right-0 w-full space-y-3  bg-white shadow-2xl sm:hidden">
        <div className="p-3 text-center space-y-4 shadow-2xl">
          {product.is_available && (
            <>
              <div className="flex items-center justify-start mb-2">
                <p className="text-sm">
                  <span className="line-through text-zinc-500 ml-2">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </span>
                </p>
                <p className="rounded-full text-sm bg-danger text-white px-3 py-0.5">
                  %{Math.round(60).toLocaleString("fa-IR")}
                </p>
              </div>
              <p className="font-dana font-bold text-base text-right">
                <span className="font-bold font-iranyekan text-lg">
                  {data.price.toLocaleString("fa-IR")}
                </span>
                <span className="font-light">تومان</span>
              </p>
            </>
          )}
          <AddToCart
            is_available={data.is_available}
            productId={data.id}
            stock={data.stock}
          />
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-black/10 rounded-[5px]  flex flex-col lg:flex-row justify-between w-full mt-7 text-sm overflow-hidden mb-20 sm:mb-auto">
        <TabsBox description_2={data.description_2} />
      </div>
    </div>
  );
}
