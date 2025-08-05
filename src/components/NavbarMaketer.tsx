"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  Package,
  Percent,
  Wallet,
  Store,
  LayoutDashboard,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMarketer } from "@/context/MarketerContext";
import { User } from "@heroui/react";

function NavbarMaketer({
  setMobileOpen,
}: {
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const { marketer } = useMarketer();
  const [productsOpen, setProductsOpen] = useState(
    pathname.startsWith("/marketer/products")
  );

  const navLinks = [
    {
      href: "/marketer/dashboard",
      label: "داشبورد",
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: "/marketer/commissions",
      label: "پورسانت ها",
      icon: <Percent size={18} />,
    },
    {
      href: "/marketer/withdrawal",
      label: "تسویه حساب ها",
      icon: <Wallet size={18} />,
    },
    {
      href: `/store/${marketer.store_name_english}`,
      label: "ویترین فروشگاه",
      icon: <Store size={18} />,
    },
  ];

  const NavContent = () => (
    <ul className="space-y-2 pt-5">
      {navLinks.map(({ href, label, icon }) => {
        if (href === "/marketer/dashboard") {
          return (
            <React.Fragment key="dashboard-group">
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    "flex items-center gap-2 py-3 px-3 rounded-xl hover:bg-white hover:shadow-2xs transition",
                    pathname === href && "bg-white shadow-xs"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </li>
              <li key="products-parent">
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className={clsx(
                    "flex items-center gap-2 py-3 px-3 rounded-xl w-full text-right hover:bg-white hover:shadow-2xs transition",
                    pathname.startsWith("/marketer/products") &&
                      "bg-white shadow-xs"
                  )}
                >
                  <Package size={18} />
                  <span>محصولات</span>
                  <span className="mr-auto">
                    {productsOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronLeft size={16} />
                    )}
                  </span>
                </button>
                {productsOpen && (
                  <ul className="mr-6 mt-2 space-y-1 text-sm">
                    <li key="products-index">
                      <Link
                        href="/marketer/products"
                        className={clsx(
                          "block py-2 px-3 rounded-lg hover:bg-white hover:shadow-xs0",
                          pathname === "/marketer/products" &&
                            "bg-white shadow-xs"
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        انتخاب محصول
                      </Link>
                    </li>
                    <li key="products-selected">
                      <Link
                        href="/marketer/products/selected"
                        className={clsx(
                          "block py-2 px-3 rounded-lg hover:bg-white hover:shadow-2xs",
                          pathname === "/marketer/products/selected" &&
                            "bg-white shadow-2xs font-semibold"
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        محصولات انتخاب شده
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </React.Fragment>
          );
        }

        return (
          <li key={href}>
            <Link
              href={href}
              className={clsx(
                "flex items-center gap-2 py-3 px-3 rounded-xl hover:bg-white hover:shadow-2xs transition",
                pathname === href && "bg-white shadow-xs"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <nav className="w-64 p-4 min-h-screen sticky top-0 flex flex-col items-start justify-between">
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <Image alt="تکنو صاف" src="/logo.png" width={48} height={48} />
            <span className="font-bold text-lg">تکنو صاف</span>
          </div>
          <NavContent />
        </div>
      </nav>
    </>
  );
}

export default NavbarMaketer;
