"use client";

import { useCategories } from "@/context/CategoriesContext";
import { SeachBlogs } from "@/services/blogActions";
import { GetProducts } from "@/services/shopActions";
import { BlogCategoryNode, CategoryNode } from "@/types/categories";
import ProductType from "@/types/product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { FaRegFileLines } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { CiImageOff } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="z-10 flex items-center p-2">
      <RiSearch2Line className="size-6 absolute right-5 text-zinc-400" />
      <input
        type="search"
        placeholder="نام محصول، مقاله یا دسته‌بندی را وارد کنید..."
        autoComplete="off"
        className="input !bg-white !rounded-full !border-zinc-200 !pr-10 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 text-black rounded px-1">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function SearchResults({
  loading,
  error,
  data,
  searchValue,
}: {
  loading: boolean;
  error: string | null;
  searchValue: string;
  data: {
    articles: BlogCategoryNode[];
    products: ProductType[];
    categories: CategoryNode[];
  };
}) {
  const hasResults =
    !!data.articles?.length ||
    !!data.products?.length ||
    !!data.categories?.length;

  return (
    <motion.div
      key="search-results"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-lg z-20 text-sm font-semibold overflow-auto"
    >
      {loading ? (
        <div className="p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 bg-zinc-200 rounded" />
              <div className="flex-1 h-4 bg-zinc-200 rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-5">{error}</div>
      ) : hasResults ? (
        <>
          {data.categories?.length > 0 && (
            <>
              <ul className="space-y-2 grid grid-cols-1">
                {data.categories.map((cat) => (
                  <li
                    key={cat.id}
                    className="hover:text-black text-zinc-600 cursor-pointer"
                  >
                    <Link
                      href={`/products?category_id=${cat.id}`}
                      className="size-full flex items-center justify-between hover:bg-zinc-100 p-3"
                    >
                      <p className="flex items-center gap-1">
                        همه ی کالا های دسته
                        <span className="text-blue-500">
                          {highlightMatch(cat.name, searchValue)}
                        </span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className="text-zinc-300" />
            </>
          )}
          {data.products?.slice(0, 6).length > 0 && (
            <>
              <ul>
                {data.products.map((product) => (
                  <li
                    key={product.id}
                    className="hover:text-black text-zinc-600 cursor-pointer"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="p-3 hover:bg-zinc-100 w-full flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1">
                        {product.cover_image ? (
                          <Image
                            src={product.cover_image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="size-10 rounded-sm"
                          />
                        ) : (
                          <div className="size-10 bg-zinc-200 rounded-md flex items-center justify-center">
                            <CiImageOff className="size-7" />
                          </div>
                        )}

                        {highlightMatch(product.name, searchValue)}
                      </div>
                      <p className="text-blue-500">
                        {product.price.toLocaleString("fa-IR")} تومان
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className="text-zinc-300" />
            </>
          )}
          {data.articles?.length > 0 && (
            <>
              <ul>
                {data.articles.map((article) => (
                  <li
                    key={article.id}
                    className="hover:text-black text-zinc-600 cursor-pointer"
                  >
                    <Link
                      href={`/article/${article.slug}`}
                      className="size-full flex items-center justify-between hover:bg-zinc-100 p-4"
                    >
                      <p className="flex items-center gap-1">
                        <FaRegFileLines className="size-5" />
                        {highlightMatch(article.title, searchValue)}
                      </p>
                      <FiExternalLink className="size-5" />
                    </Link>{" "}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <div className="p-5 text-center text-sm text-zinc-600">
          نتیجه‌ای یافت نشد
        </div>
      )}
    </motion.div>
  );
}

export default function SearchBox() {
  const [searchValue, setSearchValue] = useState("");
  const initialData = { articles: [], products: [], categories: [] };
  const [data, setData] = useState<{
    articles: BlogCategoryNode[];
    products: ProductType[];
    categories: CategoryNode[];
  }>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const categories = useCategories();

  useEffect(() => {
    if (searchValue.length > 2) {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
          const [articlesRes, productsRes] = await Promise.all([
            SeachBlogs({ search: searchValue }),
            GetProducts({ search: searchValue }),
          ]);

          const filteredCategories = categories?.filter((cat) =>
            cat.name.includes(searchValue)
          );

          setData({
            articles: articlesRes?.data || [],
            products: productsRes?.data?.results || [],
            categories: filteredCategories || [],
          });
        } catch (err) {
          console.error(err);
          setError("خطا در گرفتن اطلاعات");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setData(initialData);
    }
  }, [searchValue, categories]);

  return (
    <div className="relative min-w-96 hidden md:block">
      <SearchInput value={searchValue} onChange={setSearchValue} />
      <AnimatePresence>
        {searchValue.length > 2 && (
          <SearchResults
            searchValue={searchValue}
            loading={loading}
            error={error}
            data={data}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
