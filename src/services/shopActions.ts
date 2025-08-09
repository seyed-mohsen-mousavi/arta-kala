
import api from "./api";

// Products ----

export async function GetShopCategoriesTreeList() {
    try {
        const result = await api.get("/shop/categories/tree/")
        return result
    } catch (error) {
        console.log(error)
    }
}
interface GetProductsParams {
    category_id?: number;
    min_price?: number;
    max_price?: number;
    is_available?: boolean;
    is_featured?: boolean;
    search?: string;
    new_days?: number;
    sort?: string;
    page?: number;
}
export async function GetProducts(
    params?: GetProductsParams,
    page?: number,
    onlyDiscounted?: boolean
): Promise<any> {
    try {
        const searchParams = params || {};
        const query = new URLSearchParams();

        if (searchParams?.category_id !== undefined) query.append("category_id", searchParams.category_id.toString());
        if (searchParams?.min_price !== undefined) query.append("min_price", searchParams.min_price.toString());
        if (searchParams?.max_price !== undefined) query.append("max_price", searchParams.max_price.toString());
        if (searchParams?.is_available !== undefined) query.append("is_available", String(searchParams.is_available));
        if (searchParams?.is_featured !== undefined) query.append("is_featured", String(searchParams.is_featured));
        if (searchParams?.search) query.append("search", searchParams.search);
        if (searchParams?.new_days !== undefined) query.append("new_days", searchParams.new_days.toString());
        if (searchParams?.sort) query.append("sort", searchParams.sort);
        if (page) query.append("page", String(page));

        const [resNormal, resDiscounted] = await Promise.all([
            api.get(`/shop/products?${query.toString()}`),
            api.get(`/home/discounted-products/`)
        ]);

        const normalData = resNormal.data;
        const normalProducts = normalData.results || [];
        const discountedList = resDiscounted.data || [];

        const discountedMap = new Map(
            discountedList.map((item: any) => [item.slug, item])
        );

        const merged = normalProducts.map((product: any) => {
            const discount: any = discountedMap.get(product.slug);
            if (discount) {
                return {
                    ...product,
                    isDiscounted: true,
                    discount_percentage: discount.discount_percentage,
                    final_price: discount.final_price
                };
            }
            return product;
        });

        const finalResults = onlyDiscounted
            ? merged.filter((p: any) => p.isDiscounted)
            : merged;

        return {
            ...normalData,
            results: finalResults
        };

    } catch (error) {
        return {
            count: 0,
            next: null,
            previous: null,
            results: []
        };
    }
}




export async function GetLatestProducts(): Promise<any> {
    try {
        const [resLatest, resDiscounted] = await Promise.all([
            api.get(`/shop/latest-products`),
            api.get(`/home/discounted-products/`)
        ]);

        const latestData = resLatest.data;
        const latestProducts = latestData.latest_products || [];
        const discountedList = resDiscounted.data || [];
        const discountedMap = new Map(
            discountedList.map((item: any) => [item.slug, item])
        );

        const merged = latestProducts.map((product: any) => {
            const discount: any = discountedMap.get(product.slug);
            if (discount) {
                return {
                    ...product,
                    isDiscounted: true,
                    discount_percentage: discount.discount_percentage,
                    final_price: discount.final_price
                };
            }
            return product;
        });
        return {
            data: {
                ...latestData,
                results: merged
            }
        };
    } catch (error) {
        console.log(error);
        return {
            data: {
                count: 0,
                next: null,
                previous: null,
                results: []
            }
        };
    }
}


export async function GetProductBySlug(slug: string): Promise<any> {
    try {
        const productRes = await api.get(`/shop/products/${slug}/`);
        const product = productRes.data;
        try {
            const discountRes = await api.get(`/home/discounted-products/${slug}/`);
            const discount = discountRes.data;
            if (discount) {
                return {
                    ...product,
                    isDiscounted: true,
                    final_price: discount.final_price,
                };
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
        }

        return product;
    } catch (error) {
        console.error('GetProductBySlug error:', error);
        return null;
    }
}


export async function GetFeaturedProducts(): Promise<any> {
    try {
        const result = await api.get(`/shop/featured-products`);
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

// CART
export async function GetShopCartList(): Promise<{
    total_items: number;
    total_quantity: number;
    total_price: number;
    items: any[];
} | null> {
    try {
        const [normalRes, discountedRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/shop/cart`, {
                method: "GET",
            }),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/shop/discounted-cart/`, {
                method: "GET",
            }),
        ]);

        if (!normalRes.ok || !discountedRes.ok) {
            throw new Error("خطا در دریافت سبد خرید");
        }

        const normalData = await normalRes.json();
        const discountedData = await discountedRes.json();
        const normalItems = normalData.items || [];
        const discountedItems = discountedData.items || [];

        const mergedItemsMap = new Map<number, any>();

        [...normalItems, ...discountedItems].forEach((item) => {
            const productId = item.product_id;
            const existing = mergedItemsMap.get(productId);

            if (existing) {
                mergedItemsMap.set(productId, {
                    ...existing,
                    quantity: existing.quantity + item.quantity,
                    unit_price: item.unit_price || existing.unit_price,
                    final_price: item.final_price ?? existing.final_price,
                    is_discounted: item.is_discounted || existing.is_discounted,
                });
            } else {
                mergedItemsMap.set(productId, item);
            }
        });

        const allItems = Array.from(mergedItemsMap.values());

        const total_quantity = allItems.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0
        );

        const total_price = allItems.reduce(
            (sum, item) =>
                sum +
                (item.quantity || 0) *
                (item.is_discounted ? item.final_price : item.unit_price),
            0
        );

        return {
            total_items: allItems.length,
            total_quantity,
            total_price,
            items: allItems,
        };
    } catch (error) {
        console.log("GetShopCartList error:", error);
        return null;
    }
}



export async function PostShopCart(item: {
    product_id: number;
    quantity: number;
    is_discounted?: boolean;
    store_name_english?: string
}) {
    const url = item.is_discounted
        ? "/api/shop/discounted-cart/"
        : "/api/shop/cart/";

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });

        const data = await res.json();
        if (!res.ok) return { error: data.error || "خطا در افزودن به سبد خرید" };

        return data;
    } catch (error: any) {
        return { error: error.message || "خطا در ارتباط با سرور" };
    }
}


export async function PatchShopCart(id: number, data: { quantity: number, is_discounted?: boolean },
) {
    const url = data?.is_discounted
        ? "/api/shop/discounted-cart/"
        : "/api/shop/cart/";

    try {
        const res = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                ...data,
            }),
        });

        const result = await res.json();
        if (!res.ok) {
            if (res.status === 400 || res.status === 409) {
                return { error: result?.error || "خطا در بروزرسانی کالا" };
            }
            throw new Error(result?.error || "Failed to update cart item");
        }

        return result;
    } catch (error: any) {
        return { error: error.message };
    }
}



export async function DeleteShopCart(id: string, is_discounted?: boolean) {
    const url = is_discounted ? "/api/shop/discounted-cart" : "/api/shop/cart";
    try {
        const res = await fetch(`${url}?id=${encodeURIComponent(id)}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error(`Failed to delete item, status: ${res.status}`);

        return await res.json();
    } catch (error) {
        console.error("DeleteShopCart error:", error);
        return null;
    }
}
export async function ClearShopCart() {
    try {
        const res = await fetch(`/api/shop/cart/clear`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete item");

        return await res.json();
    } catch (error) {
        console.log("DeleteShopCart error:", error);
        return null;
    }
}

export async function createDiscountedOrder(data: any) {
    try {
        const res = await fetch(`/api/shop/order/discounted`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const json = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: json.message || "خطا در ثبت سفارش تخفیف‌دار",
            };
        }

        return {
            success: true,
            data: json,
            message: json.message || "سفارش تخفیف‌دار با موفقیت ثبت شد",
        };
    } catch (error: any) {
        return { success: false, message: error.message || "خطای ناشناخته" };
    }
}

export async function createNormalOrder(data: any) {
    try {
        const res = await fetch(`/api/shop/order/normal`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const json = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: json.message || "خطا در ثبت سفارش عادی",
            };
        }

        return {
            success: true,
            data: json,
            message: json.message || "سفارش عادی با موفقیت ثبت شد",
        };
    } catch (error: any) {
        return { success: false, message: error.message || "خطای ناشناخته" };
    }
}
export async function marketing_create_order(data: any, store_name_english: string) {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/marketing/store/${store_name_english}/order/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const json = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: json.message || "خطا در ثبت سفارش مارکتینگ",
            };
        }

        return {
            success: true,
            data: json,
            message: json.message || "سفارش مارکتینگ با موفقیت ثبت شد",
        };
    } catch (error: any) {
        return { success: false, message: error.message || "خطای ناشناخته" };
    }
}


export async function GetShippingServices() {
    try {
        const result = await api.get(`/shop/shipping-services `);
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
// Comments
export async function GetComments(product_id: number) {
    const response = await api.get(`/shop/products/${product_id}/comments/`);
    return response.data;
}


export async function PostComment(product_id: number, data: { text: string; parent?: number | null }) {
    const res = await fetch(`/api/shop/comments/${String(product_id)}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "ارسال نظر با خطا مواجه شد");
    }

    return res.json();
}
export async function DeleteComment(commentId: number) {
    const res = await fetch(`/api/shop/comments/delete/${commentId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "خطا در حذف نظر");
    }

    return true;
}

