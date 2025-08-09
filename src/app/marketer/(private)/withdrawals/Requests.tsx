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
  pending: { label: " در انتظار تایید", color: "warning" },
  approved: { label: "تایید شده", color: "secondary" },
  rejected: { label: "رد شده", color: "danger" },
  paid: { label: "پرداخت  شده", color: "success" },
};

interface ReqItem {
  id: number | string;
  amount: number;
  amountFormatted: string;
  status: string;
  statusDisplay: string;
  createdAt: string;
  createdAtFormatted: string;
  updatedAt: string;
  paidAt: string;
  detailsLink: string;
}

export default function Requests({ items }: { items: ReqItem[] }) {
  const list = useAsyncList<ReqItem>({
    async load() {
      return { items };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: [...items].sort((a, b) => {
          let first = a[sortDescriptor.column as keyof ReqItem];
          let second = b[sortDescriptor.column as keyof ReqItem];

          if (sortDescriptor.column === "amount") {
            first = Number(first);
            second = Number(second);
          }

          if (sortDescriptor.column === "date") {
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
      aria-label="Order list table"
      classNames={{ table: "min-h-[400px]" }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      isHeaderSticky
      isVirtualized
    >
      <TableHeader>
        <TableColumn key="order_number" allowsSorting>
          شماره درخواست
        </TableColumn>
        <TableColumn key="amount" allowsSorting>
          مبلغ کل
        </TableColumn>

        <TableColumn key="statusDisplay"> وضعیت</TableColumn>
        <TableColumn key="createdAt" allowsSorting>
          تاریخ ایجاد
        </TableColumn>
        <TableColumn key="updatedAt" allowsSorting>
          تاریخ بروزرسانی
        </TableColumn>
        <TableColumn key="paidAt" allowsSorting>
          تاریخ پرداخت
        </TableColumn>
        {/* <TableColumn>جزئیات</TableColumn> */}
      </TableHeader>

      <TableBody
        items={list.items}
        emptyContent={"شما هیچ درخواستی نداشته اید"}
        loadingContent={<Spinner variant="simple" label="در حال بارگذاری..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.amountFormatted}</TableCell>
            {/* <TableCell>
              <Chip
                color={statusMap[item.status]?.color || "default"}
                variant="flat"
                size="sm"
              >
                {statusMap[item.status]?.label || item.status}
              </Chip>
            </TableCell> */}
            <TableCell>
              <Chip
                color={statusMap[item.status]?.color || "default"}
                variant="flat"
                size="sm"
              >
                {item.statusDisplay}
              </Chip>
            </TableCell>
            <TableCell>{item.createdAtFormatted}</TableCell>
            <TableCell>{item.updatedAt}</TableCell>
            <TableCell>{item.paidAt}</TableCell>
            {/* <TableCell>
              <Link
                href={item.detailsLink}
                className="underline underline-offset-2"
              >
                جزییات درخواست
              </Link>
            </TableCell> */}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
