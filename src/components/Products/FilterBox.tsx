"use client";
import Image from "next/image";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { BiSearch } from "react-icons/bi";
import { MdChevronLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import { GoChevronUp } from "react-icons/go";
import { NumberInput, Slider, SliderValue } from "@heroui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const minPrice = 3000;
const maxPrice = 459420000;

export default function FilterBox({
  categories,
  selected,
}: {
  categories: any[];
  selected?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["1"]));
  const [selectedKeys2, setSelectedKeys2] = useState<any>(new Set(["1"]));
  const [value, setValue] = useState<SliderValue>([
    searchParams?.get("min_price") || minPrice,
    searchParams?.get("max_price") || maxPrice,
  ]);
  const [minInput, setMinInput] = useState(minPrice);
  const [maxInput, setMaxInput] = useState(maxPrice);
  const [searchCategory, setSearchCategory] = useState<string>("");

  useEffect(() => {
    if (Array.isArray(value)) {
      setMinInput(value[0]);
      setMaxInput(value[1]);
    }
  }, [value]);

  const reverseValue = (val: SliderValue) => {
    if (Array.isArray(val)) {
      return [maxPrice - (val[1] - minPrice), maxPrice - (val[0] - minPrice)];
    }
    return maxPrice - ((val as number) - minPrice);
  };

  const handleSliderChange = (val: SliderValue) => {
    if (Array.isArray(val)) setValue(reverseValue(val));
  };

  const handleMinChange = (val: number) => {
    setMinInput(val);
    setValue([val, maxInput]);
  };

  const handleMaxChange = (val: number) => {
    setMaxInput(val);
    setValue([minInput, val]);
  };

  const applyFilters = (params: Record<string, any>) => {
    const query = new URLSearchParams(searchParams);

    if (params.category_id !== undefined)
      query.set("category_id", params.category_id.toString());
    if (params.min_price !== undefined)
      query.set("min_price", params.min_price.toString());
    if (params.max_price !== undefined)
      query.set("max_price", params.max_price.toString());
    if (params.is_available !== undefined) {
      if (params.is_available === false) {
        query.delete("is_available");
      } else {
        query.set("is_available", String(params.is_available));
      }
    }
    if (params.is_featured !== undefined)
      query.set("is_featured", String(params.is_featured));
    if (params.search) query.set("search", params.search);
    if (params.new_days !== undefined)
      query.set("new_days", params.new_days.toString());
    if (params.sort) query.set("sort", params.sort);
    if (params.page !== undefined) query.set("page", params.page.toString());
    router.push(`${pathname}?${query.toString()}`);
  };

  const searchedCategories = categories.filter((i) =>
    i.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div className="h-full w-1/3 hidden md:flex flex-col gap-2 sticky">
      {/* Free Delivery Box */}
      <div className="bg-white shadow rounded-sm p-2 flex justify-between w-full px-3 items-center">
        <div>
          <p className="text-zinc-800">ارسال رایگان سفارش</p>
          <p className="font-light text-zinc-500">
            سفارش‌های بالای 5 میلیون تومان
          </p>
        </div>
        <div className="size-14 relative">
          <Image fill src="/free-delivery-free.svg" alt="" />
        </div>
      </div>
      {/* Delete Filters */}
      <button>
        {selected && (
          <div
            onClick={() => {
              router.push(pathname);
            }}
            className="text-white bg-red-400 py-3 font-semibold text-base rounded-xs"
          >
            حذف فیلتر ها
          </div>
        )}
      </button>
      {/* Available Switch */}
      <div className="bg-white shadow rounded-sm px-3 py-2 flex gap-3 items-center text-zinc-700">
        <div className="switch-container">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={searchParams.get("is_available") === "true" || false}
            onChange={(e) => applyFilters({ is_available: e.target.checked })}
          />
          <label className="switch" htmlFor="checkbox">
            <span className="slider"></span>
          </label>
        </div>
        <p className="text-light">نمایش کالا های موجود</p>
      </div>
      {/* Category Accordion */}
      <div className="bg-white shadow rounded-sm px-3 py-0 text-zinc-700 relative">
        <GoChevronUp
          className={`size-5 absolute top-5 left-5 transition-transform duration-300 ${
            selectedKeys.size === 1 ? "-rotate-180" : "rotate-0"
          }`}
        />
        <Accordion
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          showDivider={false}
          hideIndicator
        >
          <AccordionItem key="1" title="دسته بندی دقیق تر">
            <div className="relative w-full flex items-center">
              <input
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                autoComplete="off"
                autoFocus
                type="search"
                placeholder="جستجو ..."
                className="p-2 pr-10 border border-zinc-300 rounded-xs w-full outline-none"
              />
              <BiSearch className="size-6 absolute top-3 right-2 text-zinc-400" />
            </div>
            <ul className="overflow-y-auto max-h-64 text-zinc-500 pt-4">
              {searchedCategories.map((i) => (
                <li key={i.id}>
                  <button
                    onClick={() => applyFilters({ category_id: i.id })}
                    className="py-2 flex items-center gap-0.5"
                  >
                    <MdChevronLeft className="size-5" />
                    <span>{i.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Price Accordion */}
      <div className="relative bg-white shadow rounded-sm py-0 text-zinc-700">
        <GoChevronUp
          className={`size-5 absolute top-5 left-5 transition-transform duration-300 ${
            selectedKeys2.size === 1 ? "-rotate-180" : "rotate-0"
          }`}
        />
        <Accordion
          selectedKeys={selectedKeys2}
          onSelectionChange={setSelectedKeys2}
          showDivider={false}
          hideIndicator
          className="!px-0"
        >
          <AccordionItem
            key="1"
            title="محدوده قیمت مورد نظر"
            classNames={{ title: "pr-5" }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                applyFilters({ min_price: minInput, max_price: maxInput });
              }}
              className="flex flex-col w-full"
            >
              <Slider
                className="max-w-md border-none px-6 mb-4"
                maxValue={maxPrice}
                minValue={minPrice}
                renderThumb={(props) => (
                  <div
                    {...props}
                    className="group p-px top-1/2 bg-zinc-400 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  >
                    <span className="transition-transform bg-white shadow-small rounded-full size-6 block scale-50 group-data-[dragging=true]:scale-70" />
                  </div>
                )}
                classNames={{
                  filler: "bg-zinc-400",
                  track: "bg-zinc-300 h-1 rounded-sm !border-none",
                }}
                hideValue
                value={reverseValue(value)}
                onChange={handleSliderChange}
                dir="rtl"
                aria-label="Volume"
                aria-labelledby="price-range-label"
              />

              <div className="flex w-full justify-between items-center border-t border-b border-zinc-200 my-2 px-3">
                <div className="flex flex-col items-center gap-2 text-default-500 font-medium text-small w-full p-5 border-l border-zinc-200">
                  <label>از</label>
                  <NumberInput
                    value={minInput}
                    onValueChange={handleMinChange}
                    hideStepper
                    size="sm"
                    classNames={{
                      inputWrapper:
                        "border border-zinc-300 p-1 rounded-full w-full text-center bg-transparent shadow-none",
                      input:
                        "outline-none border-none !text-zinc-500 text-center font-dana",
                    }}
                    minValue={minPrice}
                    maxValue={maxPrice}
                    aria-label="Minimum Price"
                  />
                  <p>تومان</p>
                </div>
                <div className="h-full w-5 bg-zinc-200" />
                <div className="flex flex-col items-center gap-2 text-default-500 font-medium text-small w-full p-5 ">
                  <label>تا</label>
                  <NumberInput
                    size="sm"
                    value={maxInput}
                    onValueChange={handleMaxChange}
                    hideStepper
                    classNames={{
                      inputWrapper:
                        "border border-zinc-300 p-3 rounded-full w-full text-center bg-transparent shadow-none",
                      input:
                        "outline-none border-none !text-zinc-500 text-center font-dana",
                    }}
                    minValue={minPrice}
                    maxValue={maxPrice}
                    aria-label="Maximum Price"
                    className="font-iranyekan"
                  />
                  <p>تومان</p>
                </div>
              </div>
              <button
                className="bg-primary mx-auto p-3 font-light rounded-xs"
                type="submit"
              >
                اعمال محدوده قیمت مورد نظر
              </button>
            </form>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
