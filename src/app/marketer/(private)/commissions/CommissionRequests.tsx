"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
} from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import Link from "next/link";

const statusMap: Record<
  string,
  { label: string; color: "warning" | "success" | "danger" | "secondary" }
> = {
  pending: { label: "در انتظار", color: "warning" },
  paid: { label: "پرداخت شده", color: "success" },
  rejected: { label: "رد شده", color: "danger" },
};

interface CommissionItem {
  id: number | string;
  orderNumber: string;
  commissionBaseAmount: number;
  totalCommission: number;
  paidCommission: number;
  availableCommission: number;
  status: string;
  statusDisplay: string;
  createdAt: string;
  createdAtFormatted: string;
  detailsLink: string;
}

export default function CommissionRequests({
  items,
}: {
  items: CommissionItem[];
}) {
  const list = useAsyncList<CommissionItem>({
    async load() {
      return { items };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: [...items].sort((a, b) => {
          let first = a[sortDescriptor.column as keyof CommissionItem];
          let second = b[sortDescriptor.column as keyof CommissionItem];

          if (
            [
              "commissionBaseAmount",
              "totalCommission",
              "paidCommission",
              "availableCommission",
            ].includes(String(sortDescriptor.column))
          ) {
            first = Number(first);
            second = Number(second);
          }

          if (sortDescriptor.column === "createdAt") {
            first = new Date(first as string).getTime();
            second = new Date(second as string).getTime();
          }

          let cmp = 0;
          if (first! < second!) cmp = -1;
          else if (first! > second!) cmp = 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Commission list table"
      classNames={{ table: "min-h-[400px]" }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      isHeaderSticky
      isVirtualized
    >
      <TableHeader>
        <TableColumn key="orderNumber" allowsSorting>
          شماره سفارش
        </TableColumn>
        <TableColumn key="commissionBaseAmount" allowsSorting>
          مبلغ پایه
        </TableColumn>
        <TableColumn key="totalCommission" allowsSorting>
          مجموع پورسانت
        </TableColumn>
        <TableColumn key="paidCommission" allowsSorting>
          پورسانت پرداخت شده
        </TableColumn>
        <TableColumn key="availableCommission" allowsSorting>
          پورسانت قابل برداشت
        </TableColumn>
        <TableColumn key="status">وضعیت</TableColumn>
        <TableColumn key="createdAt" allowsSorting>
          تاریخ ایجاد
        </TableColumn>
        <TableColumn>جزئیات</TableColumn>
      </TableHeader>

      <TableBody
        items={list.items}
        emptyContent={"پورسانتی برای نمایش وجود ندارد"}
        loadingContent={<Spinner variant="simple" label="در حال بارگذاری..." />}
      >
        {(item) => (
          <TableRow key={`${item.id}`}>
            <TableCell>{item.orderNumber}</TableCell>
            <TableCell>
              {item.commissionBaseAmount.toLocaleString("fa-IR")}
            </TableCell>
            <TableCell>
              {item.totalCommission.toLocaleString("fa-IR")}
            </TableCell>
            <TableCell>{item.paidCommission.toLocaleString("fa-IR")}</TableCell>
            <TableCell>
              {item.availableCommission.toLocaleString("fa-IR")}
            </TableCell>
            <TableCell>
              <Chip
                color={statusMap[item.status]?.color || "secondary"}
                variant="flat"
                size="sm"
              >
                {item.statusDisplay}
              </Chip>
            </TableCell>
            <TableCell>{item.createdAtFormatted}</TableCell>
            <TableCell>
              <Link
                href={item.detailsLink}
                className="underline underline-offset-2"
              >
                جزییات درخواست
              </Link>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
