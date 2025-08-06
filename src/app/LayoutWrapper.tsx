"use client";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/marketer") || pathname.startsWith("/payment")) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className=" flex-1 w-full mx-auto pb-20 px-2 lg:px-0 h-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
