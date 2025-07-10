"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types/cartItem";
import { getLocalCart, setLocalCart } from "@/utils/localCart";
import { addToast } from "@heroui/toast";
import Link from "next/link";

type CartFormat = {
  total_items: number;
  total_quantity: number;
  total_price: number;
  items: {
    id: number;
    product_id: number;
    name_product: string;
    product_cover_image: string;
    unit_price: number;
    quantity: number;
    total_price: number;
  }[];
};

type CartContextType = {
  cart: CartFormat;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const user = null; // یا از useUser()
  const [cart, setCart] = useState<CartFormat>({
    total_items: 0,
    total_quantity: 0,
    total_price: 0,
    items: [],
  });

  const fetchServerCart = async () => {
    // برای کاربران لاگین‌کرده
  };

  useEffect(() => {
    if (user) {
      fetchServerCart();
    } else {
      const localCart = getLocalCart();
      setCart(localCart);
    }
  }, [user]);

  const updateLocalStorage = (newItems: CartItem[]) => {
    setLocalCart(newItems);
    setCart(getLocalCart());
  };

  const addToCart = async (item: CartItem) => {
    if (user) {
      // مدیریت سبد خرید برای کاربران لاگین‌کرده
    } else {
      const existing = cart.items.find((i) => i.product_id === item.product_id);
      let updatedItems: CartItem[];

      const rawCart: CartItem[] = cart.items.map((i) => ({
        ...i,
        name: i.name_product,
      }));

      if (existing) {
        const newQuantity = existing.quantity + item.quantity;

        if (newQuantity > item.stock) {
          addToast({
            title: "موجودی کافی نیست",
            description: `تنها ${item.stock - existing.quantity} عدد دیگر موجود است.`,
            color: "warning",
          });
          return;
        }

        updatedItems = rawCart.map((i) =>
          i.product_id === item.product_id
            ? {
                ...i,
                quantity: newQuantity,
                total_price: newQuantity * i.unit_price,
              }
            : i
        );
      } else {
        if (item.quantity > item.stock) {
          addToast({
            title: "موجودی کافی نیست",
            description: `تنها ${item.stock} عدد موجود است.`,
            color: "warning",
          });
          return;
        }

        updatedItems = [...rawCart, item];
      }

      updateLocalStorage(updatedItems);

      addToast({
        hideIcon: true,
        title: "کالا با موفقیت به سبد خرید اضافه شد",
        endContent: (
          <Link
            href="/profile/cart"
            className="bg-danger text-white px-3 py-2 rounded-xs hover:brightness-90 transition-colors duration-300 ease-in-out text-[10px]"
          >
            رفتن به سبد خرید
          </Link>
        ),
      });
    }
  };

  const removeFromCart = (productId: number) => {
    if (user) {
      // مدیریت حذف برای کاربران لاگین‌کرده
    } else {
      const rawCart: CartItem[] = cart.items.map((i) => ({
        ...i,
        name: i.name_product,
      }));
      const updatedItems = rawCart.filter((item) => item.product_id !== productId);
      updateLocalStorage(updatedItems);
    }
  };

  const clearCart = () => {
    if (user) {
      // پاک‌سازی سبد برای کاربر لاگین‌کرده
    } else {
      updateLocalStorage([]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return ctx;
};
