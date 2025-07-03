import Link from "next/link";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="pb-14">
        <div className="py-5 w-full shadow absolute right-0 bg-white">
          <div className="container mx-auto flex items-center gap-3">
            <strong className="text-base">محصولات</strong>
            <p className="text-sm text-zinc-500">
              <Link href={"/"}>خانه</Link>
              <span className="px-1">/</span>
              <Link href={"/products"}>محصولات</Link>
            </p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
