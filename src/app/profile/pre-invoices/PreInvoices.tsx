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
import { GetUserDashboard } from "../../../services/authActions";
import Link from "next/link";
import { GetShippingServices } from "../../../services/shopActions";

type PreInvoiceItem = {
  id: number;
  order_number: string;
  amount: string;
  status: string;
  city: string;
  date: string;
  shipping_service: string;
};

const statusLabels: Record<string, { fa: string; color: string }> = {
  pending: { fa: "در انتظار تایید", color: "bg-yellow-100 text-yellow-800 " },
  approved: { fa: "تایید شده", color: "bg-green-100 text-green-800" },
  rejected: { fa: "رد شده", color: "bg-red-100 text-red-800" },
  processed: { fa: "پردازش شده", color: "bg-blue-100 text-blue-800" },
};

export default function PreInvoices() {
  const [isLoading, setIsLoading] = React.useState(true);

  const list = useAsyncList<PreInvoiceItem>({
    async load() {
      const { data: shippingServices }: any = await GetShippingServices();
      const data = await GetUserDashboard();
      setIsLoading(false);
      return {
        items: data.pre_invoices.map((invoice: any) => {
          const shipping = shippingServices.find(
            (s: any) => s.id === invoice.shipping_service
          );

          return {
            id: invoice.id,
            order_number: invoice.order_number,
            amount: invoice.total_amount.toLocaleString("fa-IR"),
            status: invoice.status,
            city: invoice.items.length > 0 ? "" : "",
            shipping_service: shipping?.name || "نامشخص",
            date: new Date(invoice.created_at).toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              second: "numeric",
              minute: "numeric",
              hourCycle: "h23",
            }),
          };
        }),
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: [...items].sort((a, b) => {
          const first = a[sortDescriptor.column as keyof PreInvoiceItem];
          const second = b[sortDescriptor.column as keyof PreInvoiceItem];

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
      isVirtualized
    >
      <TableHeader>
        <TableColumn key="order_number" allowsSorting>
          شماره پیش فاکتور
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
        <TableColumn key="shipping_service">روش ارسال</TableColumn>

        <TableColumn key="date" allowsSorting>
          تاریخ
        </TableColumn>
        <TableColumn key="actions">جزئیات</TableColumn>
      </TableHeader>

      <TableBody
        isLoading={isLoading}
        items={list.items}
        loadingContent={<Spinner variant="simple" label="در حال بارگذاری..." />}
        emptyContent={"پیش فاکتوری هنوز ثبت نشده."}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              if (columnKey === "status") {
                const label = statusLabels[item.status] || {
                  fa: item.status,
                  color: "bg-gray-100 text-gray-800",
                };
                return (
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-sm rounded-full font-pelak text-nowrap whitespace-nowrap ${label.color}`}
                    >
                      {label.fa}
                    </span>
                  </TableCell>
                );
              }
              if (columnKey === "shipping_service") {
                return (
                  <TableCell className="font-dana text-nowrap whitespace-nowrap">
                    {item.shipping_service}
                  </TableCell>
                );
              }
              if (columnKey === "actions") {
                return (
                  <TableCell className="text-nowrap whitespace-nowrap">
                    <Link
                      className="btn font-pelak underline underline-offset-4"
                      href={`/profile/pre-invoices/${item.id}`}
                    >
                      جزییات پیش فاکتور
                    </Link>

                    {item.status === "approved" && (
                      <Link
                        href={`/payment/pre-invoice/${item.id}`}
                        className="btn-primary bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm mr-2"
                      >
                        پرداخت
                      </Link>
                    )}
                  </TableCell>
                );
              }

              return (
                <TableCell className="font-dana text-nowrap whitespace-nowrap">
                  {getKeyValue(item, columnKey)}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
