"use client";

import type { PaginationItemRenderProps } from "@heroui/react";

import React from "react";
import { cn, Pagination, PaginationItemType } from "@heroui/react";
import { GoChevronLeft } from "react-icons/go";
import { useRouter } from "next/navigation";

export default function PaginationBox({
  page,
  count,
  searchParams,
}: {
  page?: number;
  count: number;
  searchParams: any;
}) {
  const router = useRouter();
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    page,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "hover:bg-default-200/50 rounded-xs min-w-8 w-8 h-8"
          )}
          onClick={onNext}
        >
          <GoChevronLeft />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "hover:bg-default-200/50 rounded-xs min-w-8 w-8 h-8"
          )}
          onClick={onPrevious}
        >
          <GoChevronLeft className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button
          key={key}
          className={`${className} !text-sm hover:bg-default-200/50 `}
        >
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          `${className} hover:bg-default-200/50 text-sm rounded-xs`,
          isActive &&
            "text-white bg-primary hover:bg-primary/80 active:bg-primary-500 font-bold rounded-xs"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };
  return (
    <Pagination
      dir="rtl"
      disableCursorAnimation
      showControls
      className="gap-2"
      initialPage={page || 1}
      radius="full"
      renderItem={renderItem}
      total={Math.ceil(count / 24)}
      boundaries={3}
      variant="light"
      onChange={(page) => {
        const params = new URLSearchParams(searchParams).toString();
        router.push(`/products/page/${page}?${params}`);
      }}
    />
  );
}
