"use client";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight, GoChevronUp } from "react-icons/go";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiMenu3Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CategoryNode } from "@/types/categories";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import { HiXMark } from "react-icons/hi2";
import { useUser } from "@/context/UserContext";
function Navbar() {
  const categories = useCategories();

  const pathname = usePathname();
  const { onOpen }: any = useAuthModal();
  const links = [
    { href: "/", label: "صفحه اصلی" },
    { href: "/products", label: "محصولات" },
    { href: "/articles", label: "مقالات" },
    { href: "/about-us", label: "درباره ما" },
    { href: "/contact-info", label: "تماس با ما" },
  ];
  const user = useUser();
  console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const renderCategories = (categories: CategoryNode[]) => {
    return (
      <ul className="relative">
        {categories.map((category, index) => (
          <li
            key={index}
            className="group relative hover:bg-[#525d66] whitespace-nowrap pt-2"
          >
            <Link
              href={`/products/?category_id=${category.id}`}
              className="font-normal flex items-center justify-between px-4 w-full h-full py-2 text-sm"
            >
              {category.name}
              {category.children && category.children.length > 0 && (
                <GoChevronLeft className="size-4 fill-[#98aab3]" />
              )}
            </Link>
            {category.children && category.children.length > 0 && (
              <div className="absolute top-0 right-full bg-white text-[#3d464d] rounded-xs shadow-lg group-hover:visible group-hover:opacity-100 invisible opacity-0 transition-all duration-200 z-50 p-4">
                <ul className=" flex flex-wrap   min-w-[500px] list-disc pr-5">
                  {category.children.map((child, index) => (
                    <li
                      key={index}
                      className="relative max-w-[25%] flex-[0_0_25%] w-full py-px"
                    >
                      <Link
                        href={`/products/?category_id=${child.id}`}
                        className="hover:text-primary transition "
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <>
      <div className="h-20" />
      <div
        ref={navbarRef}
        className="sticky top-0 z-50 h-[54px]  backdrop-blur bg-primary/90 transition-all duration-300 shadow-md"
      >
        <div className="container customSm:max-w-[566px] px-4 lg:px-0 mx-auto w-full h-full">
          <div className="flex items-center justify-between relative h-full">
            <div className="hidden lg:flex items-center h-full ">
              <div className="w-22">
                <motion.div
                  animate={{
                    y: [0, -3.5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                  className="-ml-18 size-12 translate-y-1"
                >
                  <Image
                    alt="logo"
                    src={"/logo.png"}
                    width={50}
                    height={50}
                    className="object-contain h-full "
                  />
                </motion.div>
              </div>
              <div className="shrink-0">
                <div
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  className="relative sm:w-[190px] lg:w-[190px]  xl:w-[260px] 2xl:w-80 h-[35px]"
                >
                  <div className="absolute bg-[#3d464d] top-0  size-full rounded-xs pt-10">
                    <ul
                      className={`bg-[#3d464d] text-white ransition-all duration-400 ease-in-out ${
                        isOpen ? "max-h-[500px] visible" : "max-h-0 invisible"
                      }`}
                    >
                      {renderCategories(categories)}
                    </ul>
                  </div>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative p-0 px-4 text-white z-[1] size-full text-right sm:text-xs xl:text-[.987rem] flex items-center justify-between group/button border-none outline-none"
                  >
                    <div className="flex items-center gap-1">
                      <HiOutlineMenuAlt2 className="sm:size-5 xl:size-7" />
                      دسته بندی کالاها
                    </div>
                    <GoChevronUp
                      className={`sm:size-4 xl:size-5 ${
                        isOpen ? "-rotate-180" : "rotate-0"
                      } transition-transform ease-linear`}
                    />
                  </button>
                </div>
              </div>

              <nav className="mr-4 flex gap-2">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "p-2 rounded-xs transition-colors ease-out hover:bg-white/50",
                      pathname === href && "bg-white/70 font-bold"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            <MobileDrawer links={links} categories={categories} />
            <div className="bg-white absolute h-screen"></div>
            <div className="space-x-2 flex items-center ">
              <button
                onClick={onOpen}
                className="py-1 px-3 rounded-2xl bg-white text-black font-semibold outline-none ring-0 border-none"
              >
                ورود / عضویت{" "}
              </button>
              <Link
                className="py-1 px-3 rounded-2xl bg-white text-black font-semibold"
                href={"/"}
              >
                بازاریاب شو
              </Link>
              <button>
                <Image
                  alt="دکمه سرچ"
                  width={50}
                  height={50}
                  className="size-6 brightness-50"
                  src={"/search.png"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`bg-black/30 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } fixed top-0 right-0 w-full h-full transition-all ease-linear`}
      ></div>
    </>
  );
}

export default Navbar;
import { useDisclosure } from "@heroui/react";
import { useAuthModal } from "@/context/AuthModalProvider";
import { useCategories } from "@/context/CategoriesContext";

type MobileCategoryProps = {
  categories: CategoryNode[];
  level?: number;
  handleBack: () => void;
  setStack: React.Dispatch<React.SetStateAction<CategoryNode[][]>>;
  stack: CategoryNode[][];
  setCurrent: React.Dispatch<React.SetStateAction<CategoryNode[] | null>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onClose: any;
  current: CategoryNode[] | null;
};

function MobileCategory({
  categories,
  setStack,
  stack,
  setCurrent,
  current,
  setTitle,
  onClose,
}: MobileCategoryProps) {
  const handleEnter = (category: CategoryNode) => {
    if (category.children?.length) {
      setStack((prev) => [...prev, current ?? categories]);
      setCurrent(category.children);
      setTitle(() => {
        return category.name;
      });
    }
  };

  const handleShowRootCategories = () => {
    setCurrent(categories);
  };

  return (
    <div className="w-full bg-white overflow-hidden flex flex-col">
      <div
        className={`border-b border-zinc-200 text-zinc-600 font-light py-3 px-4 flex justify-between items-center `}
      >
        <button
          onClick={() => {
            handleShowRootCategories();
            setTitle("دسته بندی کالاها");
            setStack([]);
          }}
          className="text-lg active:opacity-50 w-full h-full text-right"
        >
          دسته‌بندی کالاها
        </button>
        <GoChevronLeft className="text-zinc-400 size-9 font-bold absolute left-2 pointer-events-none" />
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          {stack.map((cats, index) => (
            <motion.div
              key={`level-${index}`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white"
              style={{ zIndex: index }}
            >
              <ul className="flex flex-col gap-3">
                {cats.map((cat: CategoryNode) => (
                  <li
                    key={cat.id}
                    className="flex items-center justify-between border-b border-zinc-200 text-zinc-600 font-light py-3 px-4 active:opacity-50"
                  >
                    {cat.children?.length ? (
                      <button
                        className="text-lg text-right w-full h-full"
                        onClick={() => handleEnter(cat)}
                      >
                        {cat.name}
                      </button>
                    ) : (
                      <Link
                        onClick={onClose}
                        href={`/products/?category_id=${cat.id}`}
                        className="text-lg text-right w-full h-full"
                      >
                        {cat.name}
                      </Link>
                    )}

                    {cat.children?.length ? (
                      <GoChevronLeft className="text-zinc-400 size-9 font-bold absolute pointer-events-none left-3" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {current && (
            <motion.div
              key={`level-${stack.length}`}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white"
              style={{ zIndex: stack.length }}
            >
              <ul className="flex flex-col gap-3">
                {current.map((cat: CategoryNode) => (
                  <li
                    key={cat.id}
                    className="flex items-center justify-between border-b border-zinc-200 text-zinc-600 font-light py-3 px-4 active:opacity-50"
                  >
                    {cat.children?.length ? (
                      <button
                        className="text-lg text-right w-full h-full"
                        onClick={() => handleEnter(cat)}
                      >
                        {cat.name}
                      </button>
                    ) : (
                      <Link
                        onClick={onClose}
                        href={`/products/?category_id=${cat.id}`}
                        className="text-lg text-right w-full h-full"
                      >
                        {cat.name}
                      </Link>
                    )}

                    {cat.children?.length ? (
                      <GoChevronLeft className="text-zinc-400 size-9 font-bold absolute pointer-events-none left-3" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MobileDrawer({
  categories,
  links,
}: {
  categories: CategoryNode[];
  links: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [stack, setStack] = useState<CategoryNode[][]>([]);
  const [titleStack, setTitleStack] = useState<string[]>([]);
  const [current, setCurrent] = useState<CategoryNode[] | null>(null);
  const [title, setTitle] = useState("منوی دسترسی");
  const isRoot = current === null;

  const handleBack = () => {
    const prev = stack[stack.length - 1];
    const prevTitle = titleStack[titleStack.length - 1];

    setStack((prevStack) => prevStack.slice(0, -1));
    setTitleStack((prevTitles) => prevTitles.slice(0, -1));
    setCurrent(prev ?? null);
    setTitle(prevTitle ?? "منوی دسترسی");
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="hover:bg-white/50 active:bg-white/50 p-2 rounded-sm lg:hidden text-zinc-600 transition-colors ease-in-out"
      >
        <RiMenu3Fill className="size-7 sm:size-8 md:size-9" />
      </button>

      <Drawer hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 bg-[#f3f3f3] border-b border-b-zinc-300 text-zinc-500">
                <div className="flex items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-3">
                    {!isRoot && (
                      <button
                        className="text-sm text-zinc-600 flex items-center gap-1"
                        onClick={handleBack}
                      >
                        <GoChevronRight className="size-8 text-zinc-500" />
                      </button>
                    )}
                    <p>{title}</p>
                  </div>
                  <button type="button" onClick={onClose}>
                    <HiXMark className="size-8" />
                  </button>
                </div>
              </DrawerHeader>

              <DrawerBody className="relative overflow-hidden px-0">
                <MobileCategory
                  stack={stack}
                  setStack={setStack}
                  current={current}
                  setCurrent={setCurrent}
                  handleBack={handleBack}
                  categories={categories}
                  setTitle={(newTitle) => {
                    setTitleStack((prev) => [...prev, title]);
                    setTitle(newTitle);
                  }}
                  onClose={onClose}
                />
                {links.map((link: any) => (
                  <Link
                    key={link.href}
                    onClick={onClose}
                    className="border-b border-zinc-200 text-zinc-600 font-light pt-3 pb-4 px-4 flex justify-between items-center text-lg active:opacity-50"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </DrawerBody>

              <DrawerFooter />
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
