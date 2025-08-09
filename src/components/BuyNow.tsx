"use client";
import { NumberInput } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { HiXMark } from "react-icons/hi2";
import { IoIosNotifications } from "react-icons/io";
import ProductType from "@/types/product";
import ProductButton from "./ProductButton";
import CreateMarketerOrder from "./Marketer/CreateMarketerOrder";

function BuyNow({
  product,
  is_available,
  store_name_english,
}: {
  product: ProductType;
  is_available: boolean;
  store_name_english: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const [newQuantity, setNewQuantity] = useState<number | null>(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [customQuantities, setCustomQuantities] = useState<number[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isBuyOpen,
    onOpen: onBuyOpen,
    onOpenChange: onOpenBuyChange,
  } = useDisclosure();

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

  const handleQuantityChange = (value: number) => {
    if (!isNaN(value) && value > 0) {
      setQuantity(value);

      setCustomQuantities((prev) =>
        prev.includes(value) ? prev : [...prev, value]
      );
    }
  };

  return is_available ? (
    <div className="flex bg-white border border-zinc-200 rounded-sm">
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
            {[1, 2, 3, ...customQuantities.filter((q) => q > 3)].map((num) => (
              <button
                key={num}
                className={`w-full p-3 flex items-center justify-between font-bold hover:bg-primary-200 font-dana ${
                  num === quantity ? "bg-primary-200" : ""
                }`}
                onClick={() => {
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
              className="w-full p-3 flex items-center justify-between font-bold hover:bg-primary-200"
            >
              وارد کردن مقدار دلخواه
            </button>
          </div>
        )}
      </div>
      <ProductButton
        onClick={onBuyOpen}
        className="bg-danger text-sm sm:text-base font-semibold px-4 py-2 text-zinc-100 hover:bg-danger/95 transition-colors duration-300 ease-in-out w-full flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-wait"
      >
        خرید همین حالا
      </ProductButton>
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
                if (newQuantity) {
                  handleQuantityChange(newQuantity);
                  onClose();
                }
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
      <Modal
        isOpen={isBuyOpen}
        onOpenChange={onOpenBuyChange}
        size="5xl"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p>ثبت سفارش</p>
              </ModalHeader>
              <ModalBody>
                <CreateMarketerOrder
                  store_name_english={store_name_english}
                  product={product}
                  quantity={quantity}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  ) : (
    <div className="flex flex-col  sm:flex-row lg:flex-col items-center">
      <div className="hidden lg:inline-flex items-center justify-center w-full relative text-zinc-400 text-base lg:mt-10">
        <hr className="w-full h-px  my-0 bg-zinc-400 border-0 rounded-sm" />
        <p className="absolute px-2 pb-0.5 -translate-x-1/2 bg-zinc-100 left-1/2 text-ellipsis text-nowrap font-semibold ">
          در حال حاضر موجود نیست{" "}
        </p>
      </div>
      <p className="text-sm text-right text-zinc-600 sm:text-base font-light pb-4 lg:pt-5 text-nowrap sm:ml-20 lg:ml-0 w-full">
        متاسفانه این کالا در حال حاضر موجود نیست
      </p>
      <button className="btn-primary w-full relative font-semibold">
        موجود شد به من اطلاع بده{" "}
        <IoIosNotifications className="absolute left-4 top-2.5 size-6" />
      </button>
    </div>
  );
}

export default BuyNow;
