"use client";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  Badge,
  Spinner,
} from "@heroui/react";
import { HiXMark } from "react-icons/hi2";
import { useUser } from "../context/UserContext";
import { useDisclosure } from "@heroui/react";
import { useAuthModal } from "../context/AuthModalProvider";
import { useCategories } from "../context/CategoriesContext";
import SearchBox from "./SearchBox";
import { FiPhoneCall } from "react-icons/fi";
import { CiImageOff, CiLogin } from "react-icons/ci";
import { FaBasketShopping, FaBriefcase } from "react-icons/fa6";
import { CartFormat, useCart } from "../context/CartContextProvider";
import EmptyCart from "./EmptyCart";
import ProductButton from "./ProductButton";
import UserDropdown from "./UserMenu";
import { User } from "@/types/user";
import { convertNumberToPersian } from "@/utils/converNumbers";
import { LogOutIcon } from "lucide-react";

function Navbar({ title }: { title?: string }) {
  const categories = useCategories();
  const pathname = usePathname();
  const { onOpen }: any = useAuthModal();
  const links = [
    { href: "/", label: "صفحه اصلی" },
    { href: "/products", label: "محصولات" },
    { href: "/articles", label: "مقالات" },
    { href: "/gallery", label: "گالری" },
    { href: "/about-us", label: "درباره ما" },
    { href: "/contact-info", label: "ارتباط با ما" },
  ];
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const renderCategories = (categories: CategoryNode[]) => {
    return (
      <ul className="relative">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories?.map((category, index) => (
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
          ))
        ) : (
          <div className="py-2 px-3 w-full text-center">
            دسته بندی وجود ندارد
          </div>
        )}
      </ul>
    );
  };
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const stickyTopRef = useRef(0);

  useEffect(() => {
    if (!stickyRef.current) return;
    stickyTopRef.current = stickyRef.current.offsetTop;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY >= stickyTopRef.current) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <div className="flex justify-between py-5 px-3 items-center container">
        <MobileDrawer
          onAuthOpen={onOpen}
          user={user}
          links={links}
          categories={categories}
        />
        <Link href="/" className="flex items-center gap-3 group">
          <div className="logo-wrapper">
            <Image
              alt="لوگوی تکنو صاف"
              src="/logo.png"
              fill
              priority
              className="logo-float"
              sizes="(max-width: 768px) 40px, 48px"
            />
          </div>
          {pathname !== "/" ? (
            <h1 className="text-2xl font-bold text-zinc-700 group-hover:text-primary transition-colors ease-in-out">
              {title || "تکنو صاف"}
            </h1>
          ) : (
            <span className="text-3xl sm:text-4xl font-extrabold font-noora text-gray-800 transition-colors duration-300 float-text">
              {title ? title : "تکنو صاف"}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-10">
          <div className="hidden lg:flex items-center gap-2 text-zinc-600 text-base lg:text-lg font-medium">
            <span className="font-semibold">شماره تماس:</span>
            <Link
              href="tel:03591091009"
              className="text-lg lg:text-xl font-semibold text-black hover:text-primary-700 transition-colors"
            >
              ۰۳۵-۹۱۰۹۱۰۰۹
            </Link>
          </div>
          <Link
            href={"tel:03591091009"}
            className="lg:hidden"
            aria-label="تماس با ما"
          >
            <FiPhoneCall className="size-8 text-zinc-600" />
          </Link>
          <CartDrawer cart={cart} />
        </div>
      </div>
      <div
        ref={stickyRef}
        className={`transform-none z-50 min-h-[54px] backdrop-blur bg-primary/90 transition-transform duration-300 ease-in-out shadow-md ${
          isSticky ? "fixed left-0 right-0 top-0" : "relative"
        }`}
      >
        <div className="container customSm:max-w-[566px]  lg:px-0 mx-auto w-full h-full">
          <div className="flex items-center justify-between relative h-full">
            <div className="hidden lg:flex items-center h-full ">
              <div className="shrink-0">
                <div
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  className="relative sm:w-[190px] lg:w-[190px]  xl:w-[260px] 2xl:w-80 h-[35px]"
                >
                  <div className="absolute bg-[#3d464d] top-0  size-full rounded-xs pt-10">
                    {categories && (
                      <ul
                        className={`bg-[#3d464d] text-white ransition-all duration-400 ease-in-out ${
                          isOpen ? "max-h-[500px] visible" : "max-h-0 invisible"
                        }`}
                      >
                        {renderCategories(categories)}
                      </ul>
                    )}
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
              <nav className="mr-4 flex gap-2 text-xs lg:text-sm 2xl:text-base w-full text-nowrap space">
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
            <div className="lg:space-x-2 flex items-center w-full lg:w-auto">
              <SearchBox />
              <div className="flex justify-around  w-1/2 lg:w-auto gap-1">
                {user?.identity ? (
                  <UserDropdown user={user} />
                ) : (
                  <button
                    onClick={onOpen}
                    className="p-2.5 px-2.5 hidden lg:px-5 w-full font-bold rounded-full bg-white hover:bg-zinc-100 active:bg-zinc-200 transition-colors ease-in-out text-black text-center md:text-sm sm:flex text-nowrap items-center justify-center gap-1 sm:gap-3"
                    aria-label="ورود / عضویت"
                  >
                    <CiLogin className="size-5 md:size-6 stroke-1" />
                    <span className="">ورود </span>
                  </button>
                )}
                <ProductButton
                  href="/marketer/dashboard"
                  className="relative w-full group h-11 text-slate-950 transition-all font-bold flex items-center justify-center whitespace-nowrap rounded-full hover:rotate-[3deg] will-change-transform duration-300 shadow-lg hover:shadow-xl text-full pr-[4rem] pl-6 bg-white shadow-yellow-400/30 hover:shadow-yellow-400/30"
                  aria-label="بازاریاب شو"
                >
                  <div>بازاریاب شو</div>

                  <div className="absolute right-0 top-0 mt-1 mr-1 bg-primary p-[0.45rem] bottom-1 group-hover:w-[calc(100%-0.5rem)] transition-all rounded-full duration-300 h-9 w-9">
                    <FaBriefcase className="size-full text-neutral-700" />
                  </div>
                </ProductButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSticky && (
        <div style={{ height: stickyRef.current?.offsetHeight || 54 }}></div>
      )}

      <div
        className={`bg-black/30 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } fixed top-0 right-0 w-full h-full transition-all ease-linear`}
      ></div>
    </header>
  );
}

export default Navbar;

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
  user,
  onAuthOpen,
}: {
  categories: CategoryNode[];
  links: any;
  user: User | null;
  onAuthOpen: () => void;
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
  const name =
    user?.identity?.first_name && user?.identity?.last_name
      ? `${user.identity.first_name} ${user.identity.last_name}`
      : "بدون نام";
  const firstLetter =
    user?.identity?.first_name?.[0] || user?.identity?.phone_number?.[0] || "؟";
  const phone = user?.identity?.phone_number ?? "بدون شماره";

  return (
    <>
      <button
        onClick={onOpen}
        className="hover:bg-white/50 active:bg-white/50 p-2 rounded-sm lg:hidden text-zinc-600 transition-colors ease-in-out"
        aria-label="باز کردن منو"
      >
        <RiMenu3Fill className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
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

              <DrawerFooter>
                {user?.identity ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-row  gap-3 w-full">
                      <div className="size-14 text-xl ring-4 ring-primary-100 flex items-center justify-center rounded-full bg-primary text-white font-bold">
                        {firstLetter}
                      </div>
                      <div>
                        <p className="font-semibold text-base">{name}</p>
                        <p className="text-sm text-gray-500">
                          {convertNumberToPersian(phone)}
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-danger/10 text-danger p-3 rounded-xl"
                      onClick={async () => {
                        await fetch("/internal-api/auth/logout/", {
                          method: "POST",
                          credentials: "include",
                        });
                        location.replace("/");
                      }}
                    >
                      <LogOutIcon className="size-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onAuthOpen}
                    className="w-full btn-primary rounded-xl text-center font-semibold flex items-center justify-center gap-2"
                    aria-label="ورود / عضویت"
                  >
                    <CiLogin className="size-6" />
                    ورود / عضویت
                  </button>
                )}
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

function CartDrawer({ cart }: { cart: CartFormat }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { removeFromCart, incrementQuantity, decrementQuantity, loading } =
    useCart();

  return (
    <div className="relative inline-block group mt-1">
      <Badge
        color="warning"
        content={cart.items.length}
        placement="bottom-right"
        classNames={{ badge: "font-dana text-white bg-primary pt-1" }}
      >
        <ProductButton
          aria-label="cart"
          title="سبد خرید"
          onClick={onOpen}
          className={`group-hover:bg-primary/50 group-active:bg-primary/50 p-2 rounded-lg `}
        >
          <FaBasketShopping className="size-8 text-zinc-700" />
        </ProductButton>
      </Badge>
      <Drawer
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="transition-all ease-linear"
        radius="none"
      >
        <DrawerContent className="bg-zinc-100">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 bg-primary-600 border-b border-b-zinc-300 text-white">
                <div className="flex items-center justify-between gap-2 py-2">
                  <div className="flex items-center gap-3">
                    <p className="text-2xl font-bold">سبد خرید</p>
                  </div>
                  <button type="button" onClick={onClose}>
                    <HiXMark className="size-8" />
                  </button>
                </div>
              </DrawerHeader>

              <DrawerBody className="relative px-10 flex flex-col gap-2 overflow-auto">
                {cart.items.length > 0 ? (
                  cart.items.map((item, key) => {
                    return (
                      <div key={key} className="w-full flex items-start gap-1">
                        {item.product_cover_image?.length > 0 ? (
                          <Image
                            src={item.product_cover_image}
                            alt={item?.product_name}
                            width={100}
                            height={100}
                            className="size-22 object-cover"
                          />
                        ) : (
                          <div className="size-22 bg-zinc-200 rounded-md flex items-center justify-center">
                            <CiImageOff className="size-15" />
                          </div>
                        )}
                        <div className="flex flex-col w-full  gap-2 text-lg pr-2">
                          <p className="font-semibold text-zinc-500">
                            {item.product_name}
                          </p>
                          <div className="flex items-center gap-2 mb-2 font-pelak">
                            <p className="font-semibold">تعداد :</p>
                            <div className="bg-white flex items-center">
                              <button
                                onClick={() =>
                                  incrementQuantity(item.product_id)
                                }
                                className="px-3 py-2 border-l border-zinc-400"
                              >
                                +
                              </button>
                              <span className="px-4">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  decrementQuantity(item.product_id)
                                }
                                className="px-3 py-2 border-r border-zinc-400"
                              >
                                -
                              </button>
                            </div>
                          </div>

                          {item.final_price ? (
                            <div className="flex items-center gap-1 font-bold font-pelak">
                              <Badge
                                color="danger"
                                content={`${item.discount_percentage}%`}
                                classNames={{
                                  badge: "font-dana pt-1",
                                }}
                              >
                                <div className="pr-4">
                                  <div className="flex items-center gap-2">
                                    <p className="line-through text-zinc-400 text-sm">
                                      {item.total_price.toLocaleString("fa-IR")}{" "}
                                      تومان
                                    </p>
                                  </div>
                                  <p className="font-bold text-lg text-black">
                                    {item.final_price.toLocaleString("fa-IR")}{" "}
                                    تومان
                                  </p>
                                </div>
                              </Badge>
                            </div>
                          ) : (
                            <p className="font-bold text-lg font-pelak">
                              {item.unit_price.toLocaleString("fa-IR")} تومان
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="bg-white border border-zinc-400 text-zinc-600 p-1 rounded-full"
                        >
                          <HiXMark className="size-4" />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <EmptyCart />
                )}
                {loading && (
                  <div className="absolute top-0 left-0 size-full bg-zinc-100/80 flex flex-col justify-center items-center">
                    <Spinner
                      className=""
                      variant="simple"
                      color="default"
                      size="lg"
                    />
                  </div>
                )}
              </DrawerBody>

              {cart.items.length > 0 && (
                <DrawerFooter className="flex flex-col w-full px-0">
                  <div className="flex items-center justify-between w-full px-2 text-xl font-semibold">
                    <p className="text-zinc-600">جمع کل :‌</p>
                    <p>{cart.total_price.toLocaleString("fa-IR")} تومان</p>
                  </div>
                  <hr className="text-zinc-400 my-2" />
                  <div className="w-full px-2 h-full flex">
                    <Link
                      onClick={onClose}
                      href="/profile/cart"
                      className="btn-primary w-full rounded-xl text-center font-semibold"
                    >
                      مشاهده سبد خرید
                    </Link>
                  </div>
                </DrawerFooter>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
