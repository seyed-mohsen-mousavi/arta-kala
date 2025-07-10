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
} from "@heroui/react";
import { CiImageOff } from "react-icons/ci";
import { addToast } from "@heroui/toast";
function Page() {
  const { cart } = useCart();

  return (
    <div className="grid grid-cols-4 items-start gap-5 p-4">
      <div className="col-span-3  rounded-sm p-5 flex flex-col gap-4  shadow divide-y-1 divide-zinc-500">
        {cart.items.map((item: CartItem, key) => (
          <CartLi item={item} key={key} />
        ))}
      </div>
      <div className="col-span-1 shadow rounded-sm h-auto p-5"></div>
    </div>
  );
}

function CartLi({ item }: { item: CartItem }) {
  const { removeFromCart, setQuantityToItem } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const [customQuantities, setCustomQuantities] = useState<number[]>([]);
  const [newQuantity, setNewQuantity] = useState<number | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setQuantityToItem(item.product_id, quantity);
  }, [quantity]);
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
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col min-w-[124px] w-auto text-center">
          <Link href={""} className="min-h-28 relative w-full mb-2">
            {item.product_cover_image ? (
              <Image
                src={item.product_cover_image}
                alt={item.name_product}
                width={100}
                height={100}
                className="object-cover w-28 min-h-28 max-w-full overflow-hidden"
              />
            ) : (
              <div className="w-28 min-h-28 h-full max-w-full bg-zinc-200 rounded-md flex items-center justify-center">
                <CiImageOff className="size-15" />
              </div>
            )}
          </Link>
          <div className="relative w-2/3" ref={dropdownRef}>
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
              <div className="animate-fade-up animate-duration-300 animate-ease-linear animate-normal bottom-0 sm:bottom-auto right-0 sm:top-11 fixed sm:absolute bg-white w-full z-10 border-t border-zinc-300 text-zinc-700 sm:shadow-lg shadow-2xl rounded-t-2xl sm:rounded-none transition-all ease-linear">
                <div className="sm:hidden flex items-center justify-between p-5">
                  <p className="font-semibold">انتخاب مقدار</p>
                  <button type="button" onClick={() => setDropDownOpen(false)}>
                    <HiXMark className="size-6" />
                  </button>
                </div>
                {[1, 2, 3, ...customQuantities.filter((q) => q > 3)].map(
                  (num) => (
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
                  )
                )}

                <button
                  onClick={() => {
                    onOpen();
                    setDropDownOpen(false);
                  }}
                  className="w-full p-3 flex items-center justify-between font-bold hover:bg-primary-200"
                >
                  وارد کردن مقدار دلخواه
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between w-[80%] h-full items-start">
          <div className="flex flex-col justify-between h-full">
            <p className="font-semibold text-lg">{item.name_product}</p>
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
      </div>
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
