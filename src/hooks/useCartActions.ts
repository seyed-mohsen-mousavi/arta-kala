import { useCallback } from "react";
import { addToast } from "@heroui/toast";
import {
    DeleteShopCart,
    GetShopCartList,
    PatchShopCart,
    PostShopCart,
} from "@/services/shopActions";
import { CartItem } from "@/types/cartItem";
import { useUser } from "@/context/UserContext";

export const useCartActions = (setCart: any, setLoading: any, cart: any) => {
    const { user } = useUser()
    const fetchCart = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const data = await GetShopCartList();
            if (data) setCart(data);
        } catch (err) {
            console.error("خطا در دریافت سبد خرید:", err);
        } finally {
            setLoading(false);
        }
    }, [user, setCart, setLoading]);

    const addToCart = async (item: CartItem) => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await PostShopCart({
                product_id: item.product_id,
                quantity: item.quantity,
                is_discounted: item.isDiscounted,
                store_name_english: item.store_name_english || "",
            });

            if (res?.error) {
                addToast({ title: res.error, color: "danger" });
            } else {
                await fetchCart();
                addToast({
                    title: "کالا با موفقیت به سبد خرید اضافه شد",
                    hideIcon: true,
                } as any);
            }
        }
        catch (err) {
            console.error("خطا در افزودن کالا:", err);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId: number) => {
        if (!user) return;
        const item = cart?.items?.find((i: any) => i.product_id === productId);
        if (!item) return;

        setLoading(true);
        try {
            await DeleteShopCart(String(item.id), item?.final_price);
            await fetchCart();
        } catch (err) {
            console.error("خطا در حذف آیتم:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId: number, quantity: number) => {
        if (!user) return;
        const item = cart?.items?.find((i: any) => i.product_id === productId);
        if (!item) return;

        if (quantity <= 0) return removeFromCart(productId);

        setLoading(true);
        try {
            const res = await PatchShopCart(item.id, {
                quantity,
                is_discounted: item?.final_price,
            });

            if (res?.error) {
                addToast({
                    title: "خطا در بروزرسانی کالا!",
                    description: res.error,
                    color: "warning",
                });
                return;
            }
            await fetchCart();
        } catch (err) {
            console.error("خطا در تنظیم تعداد:", err);
        } finally {
            setLoading(false);
        }
    };


    const increment = (id: number) => {
        const item = cart?.items?.find((i: any) => i.product_id === id);
        if (item) updateQuantity(id, item.quantity + 1);
    };

    const decrement = (id: number) => {
        const item = cart?.items?.find((i: any) => i.product_id === id);
        if (item) updateQuantity(id, item.quantity - 1);
    };

    return {
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        increment,
        decrement,
    };
}

