"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

function SortBox() {
  const sortOptions = [
    { label: "جدیدترین", value: "newest" },
    { label: "محبوب ترین", value: "popularity" },
    { label: "ارزان ترین", value: "price_asc" },
    { label: "گران ترین", value: "price_desc" },
  ];

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentSort = searchParams.get("sort");

  return (
    <div className="flex items-center">
      <p className="text-zinc-400 font-light select-none">مرتب‌سازی بر اساس:</p>
      <div className="flex items-center mr-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className={`text-zinc-500 font-light text-sm px-3 py-1 rounded-full  transition-colors ${
              currentSort === option.value ? "bg-primary hover:bg-primary-500 text-black cursor-default" : "hover:text-zinc-600"
            }`}
            onClick={() => handleSortChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SortBox;
