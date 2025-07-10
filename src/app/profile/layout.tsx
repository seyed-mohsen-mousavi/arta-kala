import { ReactNode } from "react";
import { GetUserDashboard } from "@/services/authActions";
import { redirect } from "next/navigation";
import {
  CiFileOn,
  CiShoppingCart,
  CiShoppingBasket,
  CiUser,
} from "react-icons/ci";
import ProfileSideBar from "@/components/Profile/ProfileSideBar";
export type NavLink = {
  name: string;
  href: string;
  icon: ReactNode;
};
const links: NavLink[] = [
  {
    name: "پروفایل",
    href: "/profile/dashboard",
    icon: <CiUser className="size-5 stroke-1" />,
  },
  {
    name: "سبد خرید",
    href: "/profile/cart",
    icon: <CiShoppingBasket className="size-5 stroke-1" />,
  },
  {
    name: "پیش فاکتور های من",
    href: "/profile/pre-invoices",
    icon: <CiFileOn className="size-5 stroke-1" />,
  },
  {
    name: "سفارش  های من",
    href: "/profile/orders",
    icon: <CiShoppingCart className="size-5 stroke-1" />,
  },
];
async function Layout({ children }: { children: ReactNode }) {
  const user = await GetUserDashboard();
  console.log(user);
  if (!user) redirect("/?authRequired=1");
  return (
    <section className="flex  gap-5 h-full p-5">
      <ProfileSideBar links={links} />
      <div className="w-3/4 bg-white h-full p-5 rounded-2xl shadow border border-zinc-200">
        {children}
      </div>
    </section>
  );
}

export default Layout;
