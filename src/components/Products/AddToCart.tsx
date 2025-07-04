"use client";
import { NumberInput, Spinner } from "@heroui/react";
import { addToast } from "@heroui/toast";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdChevronLeft } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { HiXMark } from "react-icons/hi2";

type CartItem = {
  productId: string | number;
  quantity: number;
};

function AddToCart({
  productId,
  stock,
}: {
  productId: string | number;
  stock: number;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [newQuantity, setNewQuantity] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [customQuantities, setCustomQuantities] = useState<number[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
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

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const existingItem = cartItems.find(
        (item) => item.productId === productId
      );
      const currentQuantity = existingItem?.quantity || 0;
      const totalQuantity = currentQuantity + quantity;

      if (totalQuantity > stock) {
        addToast({
          title: "تعداد انتخاب‌شده بیشتر از موجودی کالا است.",
          color: "danger",
        });
        return;
      }
      if (existingItem) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCartItems((prevItems) => [...prevItems, { productId, quantity }]);
      }
      addToast({
        hideIcon: true,
        title: "کالا با موفقیت به سبد خرید اضافه شد",
        endContent: (
          <Link
            href={"/cart"}
            className="bg-danger  text-white px-3 py-2 rounded-xs hover:brightness-90 transition-colors duration-300 ease-in-out text-[10px]"
          >
            رفتن به سبد خرید
          </Link>
        ),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleQuantityChange = (value: number) => {
    if (!isNaN(value) && value > 0) {
      setQuantity(value);

      setCustomQuantities((prev) =>
        prev.includes(value) ? prev : [...prev, value]
      );
    }
  };

  return (
    <div className="flex bg-white border border-zinc-200 rounded-sm">
      <div className="relative w-2/3" ref={dropdownRef}>
        <button
          onClick={() => setDropDownOpen(!dropDownOpen)}
          className={`w-full p-3 flex items-center justify-between font-bold border border-zinc-300 z-20`}
        >
          {quantity} عدد
          <span>
            <MdChevronLeft className="w-5 h-5 text-zinc-500 -rotate-90" />
          </span>
        </button>
        {dropDownOpen && (
          <div className="top-11 absolute bg-white w-full z-10 border-t border-zinc-300 text-zinc-700 shadow-lg">
            {[1, 2, 3, ...customQuantities.filter((q) => q > 3)].map((num) => (
              <button
                key={num}
                className={`w-full p-3 flex items-center justify-between font-bold hover:bg-primary-200 ${
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
      <button
        onClick={handleAddToCart}
        className="bg-danger font-semibold px-4 py-2 text-zinc-100 hover:bg-danger/95 transition-colors duration-300 ease-in-out w-full flex items-center gap-2 justify-center"
      >
        افزودن به سبد خرید
        {isLoading ? (
          <Spinner
            classNames={{ label: "text-foreground mt-4" }}
            variant="simple"
            size="sm"
          />
        ) : (
          <svg
            className="size-5 text-zinc-400 !stroke-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <use href="#a" />
          </svg>
        )}
      </button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        hideCloseButton
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
        size="lg"
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
                <p>وارد کردن مقدار دلخواه</p>
                <button type="button" onClick={onClose}>
                  <HiXMark className="size-6" />
                </button>
              </ModalHeader>
              <ModalBody>
                <p className="font-semibold mt-4">
                  لطفا مقدار مورد نیاز را وارد کنید
                </p>
                <div className="relative">
                  <NumberInput
                    value={newQuantity || undefined}
                    onValueChange={(value: number) => setNewQuantity(value)}
                    hideStepper
                    size="sm"
                    classNames={{
                      inputWrapper:
                        "border border-zinc-300 p-1 rounded-xs w-full text-center bg-transparent shadow-none",
                      input:
                        "outline-none border-none !text-zinc-500 font-dana pr-2 focus:border-zinc-400",
                    }}
                    minValue={1}
                    aria-label="مقدار سبد خرید"
                    id="quantity"
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
                <button
                  className="w-full p-3 bg-primary text-zinc-700 "
                  type="submit"
                >
                  اعمال مقدار
                </button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddToCart;
