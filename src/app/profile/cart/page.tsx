"use client";
import { useCart } from "@/context/CartContextProvider";
import { CartItem } from "@/types/cartItem";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  NumberInput,
  Spinner,
} from "@heroui/react";
import { CiImageOff } from "react-icons/ci";
import { addToast } from "@heroui/toast";
import { IoCartOutline } from "react-icons/io5";
import EmptyCart from "@/components/EmptyCart";
function Page() {
  const { cart, loading } = useCart();
  return (
    <div className="grid md:grid-cols-5 items-start gap-5 p-4 ">
      {loading ? (
        <div className="col-span-3 w-full h-full p-5 flex items-center justify-center">
          درحال دریافت اطلاعات سبد خرید ...
        </div>
      ) : cart.total_items > 0 ? (
        <ul className="col-span-3 rounded-sm p-5 flex flex-col gap-4 shadow divide-y-1 divide-zinc-200 border border-zinc-300 max-h-[650px] w-full">
          {cart.items.map((item: CartItem, key) => (
            <CartLi item={item} key={key} />
          ))}
        </ul>
      ) : (
        <div className="col-span-5 p-5">
          <EmptyCart />
        </div>
      )}

      {cart.total_items > 0 && (
        <div className="col-span-3 md:col-span-2 shadow rounded-lg h-auto p-5 space-y-2 border border-zinc-300 sticky">
          <div className="flex items-center justify-between ">
            <p>قیمت کالاها ({cart.total_items.toLocaleString("fa-IR")} کالا)</p>
            <p className="font-semibold">
              {cart.total_price.toLocaleString("fa-IR")}
              <span className="pr-1 text-xs">تومان</span>
            </p>
          </div>
          <div className="flex items-center justify-between ">
            <p>قیمت کالاها ({cart.total_items.toLocaleString("fa-IR")} کالا)</p>
            <p className="font-semibold">
              {cart.total_price.toLocaleString("fa-IR")}
              <span className="pr-1 text-xs">تومان</span>
            </p>
          </div>
          <div className="flex items-center justify-between ">
            <p>جمع خرید</p>
            <p className="font-semibold">
              {cart.total_price.toLocaleString("fa-IR")}
              <span className="pr-1 text-xs">تومان</span>
            </p>
          </div>
          <div className="flex items-center justify-between ">
            <p>مالیات بر ارزش افزوده</p>
            <p className="font-semibold">
              ۰ <span className="pr-1 text-xs">تومان</span>
            </p>
          </div>
          <hr className="text-zinc-300 my-3" />
          <div className="flex items-center justify-between text-lg font-semibold">
            <p>مبلغ قابل پرداخت</p>
            <p className="font-semibold">
              {cart.total_price.toLocaleString("fa-IR")}
              <span className="text-sm pr-1">تومان</span>
            </p>
          </div>
          <hr className="text-zinc-300 my-3" />
          <div className="flex flex-col gap-2 w-full">
            <Link
              href="/profile/order/create"
              className="btn-primary w-full relative font-semibold text-center"
            >
              ادامه ثبت سفارش{" "}
              <IoCartOutline className="size-8 absolute right-5 top-2.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function CartLi({ item }: { item: CartItem }) {
  const { removeFromCart, setQuantityToItem, loading } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const [newQuantity, setNewQuantity] = useState<number | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (item.quantity !== quantity) {
      setQuantityToItem(item.product_id, quantity);
    }
  }, [item.product_id, quantity]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropDownOpen(false);
      }
    };

    if (dropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownOpen]);
  return (
    <>
      <li className="flex items-center justify-between p-4 relative">
        {loading && (
          <div className="absolute top-o right-0 size-full bg-white/80 opa z-20 flex items-center justify-center cursor-wait">
            <Spinner
              size="lg"
              variant="simple"
              color="default"
              className="z-30"
            />
          </div>
        )}
        <div className="flex flex-col  justify-center text-center w-28">
          <Link
            href={`/product/${item.product_name}}`}
            className="min-h-28 flex items-center justify-center relative"
          >
            {item.product_cover_image ? (
              <Image
                src={item.product_cover_image}
                alt={item.product_name}
                width={100}
                height={100}
                className="object-cover w-28 min-h-28 max-w-full overflow-hidden"
              />
            ) : (
              <div className="w-28 min-h-28 h-full max-w-full bg-zinc-200 rounded-md flex items-center justify-center mb-2">
                <CiImageOff className="size-15" />
              </div>
            )}
          </Link>
          <div className="relative mx-auto" ref={dropdownRef}>
            <button
              onClick={() => setDropDownOpen(!dropDownOpen)}
              className={`w-full p-3 flex items-center justify-between font-bold border border-zinc-300 z-20 font-dana`}
            >
              {quantity} عدد
              <span>
                <MdChevronLeft className="w-5 h-5 text-zinc-500 -rotate-90" />
              </span>
            </button>
            {dropDownOpen && (
              <div className="animate-fade-up animate-duration-300 animate-ease-linear animate-normal bottom-0 sm:bottom-auto right-0 sm:top-11 fixed sm:absolute bg-white w-full sm:w-44 z-10 border-t border-zinc-300 text-zinc-700 sm:shadow-lg shadow-2xl rounded-t-2xl sm:rounded-none transition-all ease-linear">
                <div className="sm:hidden flex items-center justify-between p-5">
                  <p className="font-semibold">انتخاب مقدار</p>
                  <button type="button" onClick={() => setDropDownOpen(false)}>
                    <HiXMark className="size-6" />
                  </button>
                </div>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    className={`w-full p-3 flex items-center justify-between font-bold hover:bg-primary-200 font-dana ${
                      num === quantity ? "bg-primary-200" : ""
                    }`}
                    onClick={() => {
                      if (num > item.stock) {
                        addToast({
                          title: "موجودی کافی نیست",
                          description: `تنها ${item.stock} عدد موجود است.`,
                          color: "warning",
                        });
                        return;
                      }
                      setQuantity(num);
                      setDropDownOpen(false);
                    }}
                  >
                    {num} عدد
                  </button>
                ))}

                <button
                  onClick={() => {
                    onOpen();
                    setDropDownOpen(false);
                  }}
                  className="w-full p-3 flex items-center justify-between font-bold hover:bg-primary-200 text-nowrap text-ellipsis"
                >
                  وارد کردن مقدار دلخواه
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between w-[80%] h-full items-start pr-2">
          <div className="flex flex-col justify-between h-full">
            <p className="font-semibold text-lg">{item.product_name}</p>
            <div>
              <p className="text-black">
                <span className="text-zinc-600">قیمت کل :</span>
                {item.total_price.toLocaleString("fa-IR")}
              </p>
              <p className="text-black">
                <span className="text-zinc-600">قیمت واحد :</span>
                {item.unit_price.toLocaleString("fa-IR")}
              </p>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.product_id)}
            className="bg-zinc-200 text-zinc-500 p-2 rounded"
          >
            <FaRegTrashAlt className="size-5" />
          </button>
        </div>
      </li>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        hideCloseButton
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            },
            exit: {
              opacity: 0,
              y: 100,
              transition: {
                duration: 0.1,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
        size="lg"
        placement="bottom-center"
        className="max-w-full m-0 sm:max-w-lg animate-fade-up animate-duration-300 animate-ease-linear animate-normal"
      >
        <ModalContent className="text-sm rounded-sm">
          {(onClose) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!newQuantity) return;

                if (newQuantity > item.stock) {
                  addToast({
                    title: "موجودی کافی نیست",
                    description: `تنها ${item.stock} عدد موجود است.`,
                    color: "warning",
                  });
                  return;
                }

                setQuantity(newQuantity);
                onClose();
              }}
            >
              <ModalHeader className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDropDownOpen(true);
                      onClose();
                    }}
                    className="flex sm:hidden"
                  >
                    <MdChevronRight className="size-6" />
                  </button>
                  <p>وارد کردن مقدار دلخواه</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="hidden sm:block"
                >
                  <HiXMark className="size-6" />
                </button>
              </ModalHeader>
              <ModalBody>
                <p className="font-semibold sm:mt-4">
                  لطفا مقدار مورد نیاز را وارد کنید
                </p>
                <div className="relative">
                  <NumberInput
                    value={newQuantity || undefined}
                    onValueChange={(value: number) => setNewQuantity(value)}
                    hideStepper
                    size="sm"
                    classNames={{
                      inputWrapper: "input !rounded-full",
                      input: "input font-dana  border-none",
                    }}
                    minValue={1}
                    aria-label="مقدار سبد خرید"
                    id="quantity"
                    inputMode="numeric"
                  />
                  <label
                    htmlFor="quantity"
                    className="absolute top-3.5 left-4 text-zinc-600"
                  >
                    عدد
                  </label>
                </div>
                <p className="text-xs">*واحد شمارش بر اساس عدد است.</p>
              </ModalBody>
              <ModalFooter>
                <button className="w-full btn-primary" type="submit">
                  اعمال مقدار
                </button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default Page;
