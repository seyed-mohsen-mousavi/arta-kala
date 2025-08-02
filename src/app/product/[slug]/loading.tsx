import React from "react";

export default function Loading() {
  return (
    <div className="container customSm:max-w-[566px]">
      <div className="w-full h-6 bg-zinc-200 rounded animate-pulse my-4 max-w-[400px]" />

      <div className="bg-white shadow-lg shadow-black/10 rounded-[5px] px-5 py-4 w-full mt-7 text-sm">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full lg:w-1/3 h-96 bg-zinc-200 animate-pulse rounded" />
          <div className="w-full lg:w-2/3 p-2 flex flex-col items-start space-y-5 px-4">
            <div className="h-8 bg-zinc-200 rounded w-1/2 animate-pulse" />
            {/* <div className="h-4 bg-zinc-200 rounded w-1/12 animate-pulse" />
            <div className="h-4 bg-zinc-200 rounded w-1/12 animate-pulse" />
            <div className="h-5 bg-zinc-200 rounded w-1/10 animate-pulse" />
            <div className="h-10 bg-zinc-200 rounded w-1/2 animate-pulse" /> */}
            <div className="space-y-3 w-full">
              <div className="h-4 bg-zinc-200 rounded w-1/3 animate-pulse" />
              <div className="h-4 bg-zinc-200 rounded w-1/2 animate-pulse" />
            </div>
            <div className="space-y-2 w-full">
              <div className="h-4 bg-zinc-200 rounded w-1/4 animate-pulse" />
              <div className="h-44 bg-zinc-100 w-2/3 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>

      <div className="bg-white shadow-lg shadow-black/10 rounded-[5px] w-full mt-7 text-sm p-5 space-y-4">
        <div className="flex items-center gap-5">
          <div className="h-5 w-32 bg-zinc-200 rounded animate-pulse" />
          <div className="h-5 w-32 bg-zinc-200 rounded animate-pulse" />
        </div>
        <div className="h-24 w-full bg-zinc-100 rounded animate-pulse" />
      </div>
    </div>
  );
}
