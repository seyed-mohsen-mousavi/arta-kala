"use client";

import { usePathname } from "next/navigation";
import NavbarMaketer from "@/components/NavbarMaketer";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const simplePaths = [
    "/marketer/pending",
    "/marketer/rejected",
    "/marketer/register",
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  if (simplePaths.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen md:flex relative max-sm:animate-fade-left">
      <aside className="hidden md:block w-72 shadow-xl ">
        <NavbarMaketer setMobileOpen={setMobileOpen} />
      </aside>

      <div className="md:hidden fixed top-0 w-full bg-white shadow z-20 flex items-center justify-between p-4">
        <span className="font-bold text-lg">تکنو صاف</span>
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 -left-10 z-40 flex md:hidden max-sm:animate-fade-left">
          <div className="w-72 bg-zinc-50 shadow-lg sm:p-4 h-full overflow-y-auto ">
            <NavbarMaketer setMobileOpen={setMobileOpen} />
            <button
              className="mt-4 text-sm text-blue-500"
              onClick={() => setMobileOpen(false)}
            >
              بستن منو
            </button>
          </div>
          <div
            className="flex-1 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      <main className="flex-1 h-full pt-16 md:pt-0">
        <section className="p-4 md:p-10">{children}</section>
      </main>
    </div>
  );
}
