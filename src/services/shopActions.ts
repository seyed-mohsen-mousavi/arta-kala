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
        const result = await api.get(`/shop/featured-products `);
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
// Cart ----
export async function GetShopCartList() {
    try {
        const result = await api.get("/shop/cart/")
        return result
    } catch (error) {
        console.log(error)
    }
}
export async function PostShopCart() {
    try {
        const result = await api.post("/shop/cart/")
        return result
    } catch (error) {
        console.log(error)
    }
}
export async function DeleteShopCart() {
    try {
        const result = await api.delete("/shop/cart/delete")
        return result
    } catch (error) {
        console.log(error)
    }
}
// Comments ---

// export async function GetComments(product_slug: string) {

// }