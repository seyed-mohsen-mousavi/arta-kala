import api from "./api";
// Shop ----

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
    params?: GetProductsParams
): Promise<any> {
    try {
        const searchParams = await params || {};
        const query = new URLSearchParams();

        if (searchParams?.category_id !== undefined) query.append("category_id", searchParams?.category_id.toString());
        if (searchParams?.min_price !== undefined) query.append("min_price", searchParams?.min_price.toString());
        if (searchParams?.max_price !== undefined) query.append("max_price", searchParams?.max_price.toString());
        if (searchParams?.is_available !== undefined) query.append("is_available", String(searchParams?.is_available));
        if (searchParams?.is_featured !== undefined) query.append("is_featured", String(searchParams?.is_featured));
        if (searchParams?.search) query.append("search", searchParams?.search);
        if (searchParams?.new_days !== undefined) query.append("new_days", searchParams?.new_days.toString());
        if (searchParams?.sort) query.append("sort", searchParams?.sort);
        if (searchParams?.page !== undefined) query.append("page", searchParams?.page.toString());

        const result = await api.get(`/shop/products?${query.toString()}`);
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
export async function GetProductBySlug(slug: string): Promise<any> {
    try {
        const result = await api.get(`/shop/products/${slug}/`);
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
export async function GetLatestProducts(): Promise<any> {
    try {
        const result = await api.get(`/shop/latest-products `);
        return result
    } catch (error) {
        console.log(error)
        return null
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
export async function GetShopCartList() {
    try {
        const res = await fetch("/api/shop/cart", {
            method: "GET",
        });

        if (!res.ok) throw new Error("Failed to fetch cart");

        return await res.json();
    } catch (error) {
        console.log("GetShopCartList error:", error);
        return null;
    }
}

export async function PostShopCart(data: any) {
    try {
        const res = await fetch("/api/shop/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        if (!res.ok) {
            if (res.status === 400 || res.status === 409) {
                return { error: result?.error || "خطا در بروزرسانی کالا" };
            }
            throw new Error("Failed to add item to cart");
        }

        return await result
    } catch (error) {
        console.log("PostShopCart error:", error);
        return null;
    }
}
export async function PatchShopCart(id: number, data: { quantity: number }) {
    try {
        const res = await fetch("/api/shop/cart", {
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
        console.log(result.status)
        if (!res.ok) {
            if (res.status === 400 || res.status === 409) {
                return { error: result?.error || "خطا در بروزرسانی کالا" };
            }
            throw new Error(result?.error || "Failed to update cart item");
        }

        return result;
    } catch (error: any) {
        console.error("PatchShopCart error:", error.message);
        return { error: error.message };
    }
}



export async function DeleteShopCart(id: string) {
    try {
        const res = await fetch(`/api/shop/cart?id=${id}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete item");

        return await res.json();
    } catch (error) {
        console.log("DeleteShopCart error:", error);
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
// Comments ---

// export async function GetComments(product_slug: string) {

// }

// 
export async function createOrder(data: any) {
    try {
        const res = await fetch(`/api/order/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Failed to delete item");

        return await res.json();
    } catch (error) {
        console.log("DeleteShopCart error:", error);
        return null;
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
