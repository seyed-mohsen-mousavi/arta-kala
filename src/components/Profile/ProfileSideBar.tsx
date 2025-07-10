"use client";
import { NavLink } from "@/app/profile/layout";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";

function ProfileSideBar({ links }: { links: NavLink[] }) {
  const user = useUser();
  const pathname = usePathname();
  if (!user) return <>کاربر پیدا نشد</>;
  return (
    <div className="flex flex-col rounded-tr-[60px] rounded-xl w-1/4 h-full overflow-hidden">
      <div className="bg-primary-400 text-zinc-700 py-10 px-7 space-y-2">
        <div className="flex gap-2">
          <div className="size-20 rounded-full bg-white">
            
          </div>
          <div className="flex flex-col font-medium">
            <p className="font-semibold text-lg">
              {user.identity?.first_name} {user.identity?.last_name}
            </p>
            <p>{user.identity?.phone_number}</p>
            <p>{user.identity?.national_code}#</p>
            <button className="bg-white px-2 mt-2 py-1 rounded-lg text-red-500 flex items-center gap-0.5 active:scale-90">
              <MdOutlineLogout className="size-5" />
              خروج از حساب
            </button>
          </div>
        </div>
      </div>
      <ul className="bg-white border-l border-r border-b border-zinc-200 rounded-b-xl py-10 px-7 w-full font-semibold space-y-0.5">
        {links.map((link) => (
          <li className="w-full" key={link.href}>
            <Link
              href={link.href}
              className={`px-3 py-3.5 flex items-center gap-2 justify-start rounded-2xl hover:bg-zinc-100 w-full ${
                pathname === link.href ? "bg-zinc-100 text-primary-700" : ""
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileSideBar;
