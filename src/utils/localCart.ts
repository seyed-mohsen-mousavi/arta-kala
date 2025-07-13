import { CartItem } from "@/types/cartItem";

const CART_KEY = "guest_cart";

export const getLocalCart = () => {
    if (typeof window === "undefined")
        return {
            total_items: 0,
            total_quantity: 0,
            total_price: 0,
            items: [],
        };

    const raw = localStorage.getItem(CART_KEY);
    const cart: CartItem[] = raw ? JSON.parse(raw) : [];

    const total_items = cart.length;
    const total_quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const total_price = cart.reduce((acc, item) => acc + item.total_price, 0);

    return {
        total_items,
        total_quantity,
        total_price,
        items: cart.map((item) => ({
            id: item.id,
            product_id: item.product_id,
            product_name: item.product_name,
            product_cover_image: item.product_cover_image,
            unit_price: item.unit_price,
            quantity: item.quantity,
            total_price: item.total_price,
            stock: item.stock
        })),
    };
};

export const setLocalCart = (cart: CartItem[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
};
