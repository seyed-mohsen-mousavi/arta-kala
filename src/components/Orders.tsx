"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import { GetUserDashboard } from "@/services/authActions";
import { formatToPersianTimeAgo } from "@/utils/formatToPersianTimeAgo";

// ✅ Type تعریف‌شده برای سفارش
type OrderItem = {
  id: number;
  order_number: string;
  amount: string;
  status: "pending" | "paid" | "canceled" | string;
  city: string;
  date: string;
};

const statusLabels: Record<string, { fa: string; color: string }> = {
  pending: { fa: "در انتظار پرداخت", color: "bg-yellow-100 text-yellow-800 " },
  delivered: { fa: "تحویل شده", color: "bg-green-100 text-green-800" },
  cancelled: { fa: "لغو شده", color: "bg-red-100 text-red-800" },
  shipped: { fa: "ارسال شده", color: "bg-blue-100 text-blue-800" }, // ✅ جدید
};

export default function Orders() {
  const [isLoading, setIsLoading] = React.useState(true);

  const list = useAsyncList<OrderItem>({
    async load() {
      const data = await GetUserDashboard();
      setIsLoading(false);

      return {
        items: data.orders.map((order: any) => ({
          id: order.id,
          order_number: order.order_number,
          amount: order.total_amount.toLocaleString(),
          status: order.status,
          city: order.receiver_city,
          date: formatToPersianTimeAgo(order.order_date),
        })),
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: [...items].sort((a, b) => {
          let first = a[sortDescriptor.column as keyof OrderItem];
          let second = b[sortDescriptor.column as keyof OrderItem];

          let cmp =
            (parseInt(first as string) || first) <
            (parseInt(second as string) || second)
              ? -1
              : 1;
          if (sortDescriptor.direction === "descending") cmp *= -1;
          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Order list table"
      classNames={{
        table: "min-h-[400px]",
      }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader>
        <TableColumn key="order_number" allowsSorting>
          شماره سفارش
        </TableColumn>
        <TableColumn key="amount" allowsSorting>
          مبلغ کل
        </TableColumn>
        <TableColumn key="status" allowsSorting>
          وضعیت
        </TableColumn>
        <TableColumn key="city" allowsSorting>
          شهر گیرنده
        </TableColumn>
        <TableColumn key="date" allowsSorting>
          تاریخ
        </TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={list.items}
        loadingContent={<Spinner variant="simple" label="در حال بارگذاری..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              const value = getKeyValue(item, columnKey);

              if (columnKey === "status") {
                const label = statusLabels[item.status] || {
                  fa: item.status,
                  color: "bg-gray-100 text-gray-800",
                };
                return (
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-sm rounded-full font-pelak ${label.color}`}
                    >
                      {label.fa}
                    </span>
                  </TableCell>
                );
              }

              return <TableCell className="font-dana">{value}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
