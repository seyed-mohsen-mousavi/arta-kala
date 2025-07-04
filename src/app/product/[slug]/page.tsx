import BreadcrumbsBox, {
  findCategoryPath,
} from "@/components/Products/BreadcrumbsBox";
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const { data } = await GetProductBySlug(decodedSlug);
  const result = await GetShopCategoriesTreeList();
  const categories: CategoryNode[] = result?.data;
  const product = data;
  const categoryFind = categories.find(
    (category: CategoryNode) => category.name === product.category
  );
  let breadcrumb: CategoryNode[] = [];
  console.log(categoryFind);
  if (data?.category && categoryFind) {
    const path = findCategoryPath(categories, categoryFind.id);
    if (path) breadcrumb = path;
  }
  return (
    <div>
      <BreadcrumbsBox name={data.name} breadcrumb={breadcrumb} />
      <div className="bg-white shadow-lg shadow-black/10 rounded-[5px] px-5 py-4 flex flex-col lg:flex-row justify-between w-full mt-7 text-sm">
        <div className="w-full lg:w-1/3 h-full flex">
          <Image
            src={data.cover_image}
            alt={data.name}
            width={200}
            height={200}
            className="border-l-[1px] border-zinc-100 m-1 w-full h-full object-cover"
          />
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
              <AddToCart productId={data.id} stock={data.stock} />
            </div>
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
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-black/10 rounded-[5px]  flex flex-col lg:flex-row justify-between w-full mt-7 text-sm">
        <TabsBox description_2={data.description_2} />
      </div>
    </div>
  );
}
