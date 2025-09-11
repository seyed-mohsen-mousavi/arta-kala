import type { Metadata } from "next";
import "@/styles/globals.css";
import { GetShopCategoriesTreeList } from "@/services/shopActions";
import Providers from "./providers";
import { UserProvider } from "@/context/UserContext";
import { GetUserDashboard } from "@/services/authActions";
import { AuthModalProvider } from "@/context/AuthModalProvider";
import AuthModal from "@/components/AuthModal";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { CartProvider } from "@/context/CartContextProvider";
import { dana, iranyekan, noora, pelak } from "@/utils/fonts";
import LayoutWrapper from "./LayoutWrapper";
import ConsoleLog from "@/components/ConsoleLog";

export const metadata: Metadata = {
  title: "آرتاکالا | فروشگاه آنلاین با تضمین کیفیت",
  description:
    "آرتاکالا، فروشگاه تخصصی با بهترین قیمت و تضمین کیفیت. ارسال سریع، تخفیف‌های ویژه، و مقالات آموزشی تخصصی.",
  keywords: [
    "آرتاکالا",
    "فروشگاه آنلاین",
    "خرید آنلاین",
    "قیمت مناسب",
    "تضمین کیفیت",
    "تخفیف ویژه",
  ],
  openGraph: {
    title: "آرتاکالا",
    description: "خرید آنلاین با تضمین کیفیت و ارسال سریع از آرتاکالا",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: "آرتاکالا",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "آرتاکالا",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "آرتاکالا",
    description: "خرید آنلاین با تضمین کیفیت و ارسال سریع از آرتاکالا",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.jpg`],
  },
  icons: {
    icon: [
      { url: "/assets/icons/icon.png", type: "image/png", sizes: "16x16" },
      { url: "/assets/icons/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/assets/icons/icon.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      {
        url: "/assets/icons/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
      {
        url: "/assets/icons/apple-icon.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/assets/icons/apple-icon.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/assets/icons/apple-icon.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await GetShopCategoriesTreeList();
  const user = (await GetUserDashboard()) || undefined;

  return (
    <html lang="fa-IR" dir="rtl" className="scroll-smooth bg-[#f9f9f9] ">
      <body
        className={`${iranyekan.variable} ${pelak.variable} ${noora.variable} ${dana.variable} ${iranyekan.className} w-full min-h-screen relative antialiased text-[#212529] flex flex-col overflow-x-hidden`}
      >
        <ConsoleLog />
        <UserProvider initialUser={user}>
          <AuthModalProvider>
            <CartProvider>
              {!user && <AuthModal />}
              <CategoriesProvider categories={result?.data}>
                <LayoutWrapper>
                  <Providers>{children}</Providers>
                </LayoutWrapper>
              </CategoriesProvider>
            </CartProvider>
          </AuthModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
