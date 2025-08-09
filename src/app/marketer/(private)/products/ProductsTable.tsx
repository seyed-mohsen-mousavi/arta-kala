"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Chip,
  Selection,
  addToast,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { marketing_products_select_create } from "@/services/marketingActions";
import ProductType from "@/types/product";
import { SearchIcon } from "lucide-react";
type ProductsTableProps = {
  products: ProductType[];
  total: number;
  page: number;
  rowsPerPage: number;
  searchValue: string;
  initiallySelected: number[];
};
export default function ProductsTable({
  products,
  total,
  page,
  rowsPerPage,
  searchValue,
  initiallySelected,
}: ProductsTableProps) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(initiallySelected.map(String))
  );
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState(searchValue);
  const [isClient, setIsClient] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const handleApply = async () => {
    // تبدیل initialSelected به Set رشته‌ای برای مقایسه
    const initialSet = new Set(initiallySelected.map(String));

    if (
      selectedKeys !== "all" &&
      selectedKeys.size === initialSet.size &&
      Array.from(selectedKeys).every((key) => initialSet.has(String(key)))
    ) {
      addToast({
        title: "هیچ تغییری اعمال نشده است",
        color: "warning",
      });
      return;
    }

    setLoading(true);
    const ids = Array.from(selectedKeys).map((id) => Number(id));
    try {
      const res = await marketing_products_select_create({ product_ids: ids });

      if (!res.success) {
        addToast({
          title: res.errors || "خطا در اعمال تغییرات",
          description: "لطفاً دوباره تلاش کنید.",
          color: "danger",
        });
        return;
      }

      router.refresh();

      addToast({
        title: "تغییرات با موفقیت اعمال شد",
        color: "success",
      });
    } catch {
      addToast({
        title: "خطا در اعمال تغییرات",
        description: "لطفاً بعدا دوباره تلاش کنید.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    router.push(`?search=${value}&page=1`);
  };

  const handleSort = (column: string, direction: string) => {
    router.push(
      `?search=${search}&page=${page}&ordering=${direction === "descending" ? "-" : ""}${column}`
    );
  };

  if (!isClient) {
    return (
      <div className="p-4 text-center text-gray-500">در حال بارگذاری...</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Input
          isClearable
          placeholder="جستجوی محصول..."
          startContent={<SearchIcon />}
          value={search}
          onClear={() => handleSearch("")}
          onValueChange={handleSearch}
          className="max-w-sm"
        />
        <Button color="primary" onPress={handleApply} isLoading={loading}>
          اعمال تغییرات
        </Button>
      </div>

      <Table
        aria-label="لیست محصولات بازاریاب"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(newSelection) => {
          const initialSet = new Set(initiallySelected.map(String));
          const newSet = new Set(newSelection);
          initialSet.forEach((key) => newSet.add(key));

          setSelectedKeys(newSet);
        }}
        onSortChange={({ column, direction }) =>
          handleSort(String(column), direction)
        }
      >
        <TableHeader>
          <TableColumn key="id" allowsSorting>
            ID
          </TableColumn>
          <TableColumn key="name" allowsSorting>
            نام
          </TableColumn>
          <TableColumn key="category">دسته‌بندی</TableColumn>
          <TableColumn key="price" allowsSorting>
            قیمت
          </TableColumn>
          <TableColumn key="is_available">موجودی</TableColumn>
          <TableColumn key="discount_percentage">تخفیف</TableColumn>
          <TableColumn key="final_price">قیمت نهایی</TableColumn>
        </TableHeader>
        <TableBody emptyContent="محصولی یافت نشد" items={products}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price.toLocaleString()} تومان</TableCell>
              <TableCell>
                <Chip
                  color={item.is_available ? "success" : "danger"}
                  className="z-0"
                >
                  {item.is_available ? "موجود" : "ناموجود"}
                </Chip>
              </TableCell>
              <TableCell>
                {item.discount_percentage
                  ? `${item.discount_percentage}%`
                  : "-"}
              </TableCell>
              <TableCell>
                {item.final_price
                  ? item.final_price.toLocaleString()
                  : item.price.toLocaleString()}{" "}
                تومان
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* صفحه‌بندی */}
      <Pagination
        total={Math.ceil(total / rowsPerPage)}
        page={page}
        onChange={(p) => router.push(`?search=${search}&page=${p}`)}
      />
    </div>
  );
}
