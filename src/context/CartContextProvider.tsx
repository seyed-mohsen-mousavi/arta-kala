"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types/cartItem";
import { getLocalCart, setLocalCart } from "@/utils/localCart";
import { addToast } from "@heroui/toast";
import Link from "next/link";
import { useUser } from "./UserContext";
import {
  DeleteShopCart,
  GetShopCartList,
  PatchShopCart,
  PostShopCart,
} from "@/services/shopActions";

export type CartFormat = {
  total_items: number;
  total_quantity: number;
  total_price: number;
  items: {
    id: number;
    product_id: number;
    product_name: string;
    product_cover_image: string;
    unit_price: number;
    quantity: number;
    total_price: number;
    stock: number;
  }[];
};

type CartContextType = {
  cart: CartFormat;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  setQuantityToItem: (id: number, quantity: number) => void;
  loading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [cart, setCart] = useState<CartFormat>({
    total_items: 0,
    total_quantity: 0,
    total_price: 0,
    items: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchServerCart = async () => {
    setLoading(true);
    try {
      const data = await GetShopCartList();
      if (data) setCart(data);
    } catch (err) {
      console.error("خطا در دریافت سبد خرید:", err);
    } finally {
      setLoading(false);
    }
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

    const total_items = newItems.length;
    const total_quantity = newItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const total_price = newItems.reduce(
      (acc, item) => acc + item.quantity * item.unit_price,
      0
    );
    console.log(newItems);
    setCart({
      total_items,
      total_quantity,
      total_price,
      items: newItems.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_cover_image: item.product_cover_image,
        unit_price: item.unit_price,
        quantity: item.quantity,
        total_price: item.unit_price * item.quantity,
        stock: item.stock,
      })),
    });
  };

  const addToCart = async (item: CartItem) => {
    if (user) {
      setLoading(true);
      try {
        setLoading(true);
        const res = await PostShopCart({
          product_id: item.product_id,
          quantity: item.quantity,
        });

        if (res.error) {
          addToast({
            title: res.error,
            hideIcon: false,
            color: "danger",
          });
        } else {
          fetchServerCart();
          addToast({
            title: "کالا با موفقیت به سبد خرید اضافه شد",
            hideIcon: true,
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
      } catch (err) {
        console.error("خطا در افزودن کالا:", err);
      } finally {
        setLoading(false);
      }
    } else {
      const existing = cart.items.find((i) => i.product_id === item.product_id);
      let updatedItems: CartItem[];

      const rawCart: CartItem[] = cart.items.map((i) => ({
        ...i,
        name: i.product_name,
      }));

      if (existing) {
        const newQuantity = existing.quantity + item.quantity;

        if (item.stock && newQuantity > item.stock) {
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
        if (item.stock && item.quantity > item.stock) {
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

  const removeFromCart = async (productId: number) => {
    setLoading(true);
    if (user) {
      try {
        const item = cart.items.find((i) => i.product_id === productId);
        if (!item) return;

        await DeleteShopCart(String(item.id));
        fetchServerCart();
      } catch (err) {
        console.error("خطا در حذف آیتم از سبد:", err);
      } finally {
        setLoading(false);
      }
    } else {
      const rawCart: CartItem[] = cart.items.map((i) => ({
        ...i,
        name: i.product_name,
      }));
      const updatedItems = rawCart.filter(
        (item) => item.product_id !== productId
      );
      updateLocalStorage(updatedItems);
    }
  };

  const incrementQuantity = async (productId: number) => {
    if (user) {
      setLoading(true);
      const item = cart.items.find((i) => i.product_id === productId);
      if (!item) return;

      const newQuantity = item.quantity + 1;
      const res = await PatchShopCart(item.id, { quantity: newQuantity });
      setLoading(false);
      if (res?.error) {
        addToast({
          title: " خطا در بروزرسانی کالا !",
          description: res.error,
          color: "warning",
        });
        return;
      }
      fetchServerCart();
    } else {
    }
    const rawCart: CartItem[] = cart.items.map((i) => ({
      ...i,
      name: i.product_name,
    }));

    const updatedItems = rawCart.map((item) => {
      if (item.product_id === productId) {
        const newQuantity = item.quantity + 1;

        if (typeof item.stock === "number" && newQuantity > item.stock) {
          addToast({
            title: "موجودی کافی نیست",
            description: `تنها ${item.stock} عدد موجود است.`,
            color: "warning",
          });
          return item;
        }

        return {
          ...item,
          quantity: newQuantity,
          total_price: newQuantity * item.unit_price,
        };
      }
      return item;
    });

    updateLocalStorage(updatedItems);
  };

  const decrementQuantity = async (productId: number) => {
    if (user) {
      setLoading(true);
      const item = cart.items.find((i) => i.product_id === productId);
      if (!item) return;

      const newQuantity = item.quantity - 1;

      if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
      }

      try {
        await PatchShopCart(item.id, { quantity: newQuantity });
        fetchServerCart();
      } catch (error) {
        console.error("خطا در کاهش تعداد:", error);
      } finally {
        setLoading(false);
      }
    } else {
      const rawCart: CartItem[] = cart.items.map((i) => ({
        ...i,
        name: i.product_name,
      }));

      const updatedItems = rawCart
        .map((item) => {
          if (item.product_id === productId) {
            const newQuantity = item.quantity - 1;
            if (newQuantity <= 0) {
              return null;
            }
            return {
              ...item,
              quantity: newQuantity,
              total_price: newQuantity * item.unit_price,
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      updateLocalStorage(updatedItems);
    }
  };

  const clearCart = () => {
    if (user) {
    } else {
      updateLocalStorage([]);
    }
  };

  const setQuantityToItem = async (productId: number, quantity: number) => {
    if (user) {
      const item = cart.items.find((i) => i.product_id === productId);
      if (!item) return;

      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setLoading(true);
      try {
        const res = await PatchShopCart(item.id, { quantity });
        if (res?.error) {
          addToast({
            title: " خطا در بروزرسانی کالا !",
            description: res.error,
            color: "warning",
          });
          return;
        }
        fetchServerCart();
      } catch (error) {
        console.error("خطا در تنظیم تعداد:", error);
      } finally {
        setLoading(false);
      }
    } else {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      const updatedItems = cart.items.map((item) => {
        if (item.product_id === productId) {
          if (typeof item.stock === "number" && quantity > item.stock) {
            addToast({
              title: "موجودی کافی نیست",
              description: `تنها ${item.stock} عدد موجود است.`,
              color: "warning",
            });
            return item;
          }

          return {
            ...item,
            quantity,
            total_price: quantity * item.unit_price,
          };
        }
        return item;
      });

      updateLocalStorage(updatedItems);
    }
  };
  useEffect(() => {
    const syncAndFetch = async () => {
      const localCart = getLocalCart();

      if (user) {
        if (localCart.items.length > 0) {
          await Promise.all(
            localCart.items.map((item) =>
              PostShopCart({
                product_id: item.product_id,
                quantity: item.quantity,
              })
            )
          );
          setLocalCart([]);
        }

        await fetchServerCart();
      } else {
        setCart(localCart);
      }
    };

    syncAndFetch();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        setQuantityToItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart باید داخل CartProvider استفاده شود");
  return ctx;
};
