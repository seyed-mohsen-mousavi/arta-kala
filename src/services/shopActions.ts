"use server";
import api from "./api";
import { AxiosResponse } from "axios";
// Shop ----
const fakeProducts = [
    {
        id: 1,
        name: "محصول 1",
        originalPrice: 16_900_000,
        currentPrice: 14_260_900,
        cover_image: "/product/a1.jpg",
        slug: "product-1",
        category: "category-1",
        isAmazing: true,
    },
    {
        id: 2,
        name: "محصول 2",
        originalPrice: 200000,
        currentPrice: 84000,
        slug: "product-2",
        category: "category-2",
        cover_image: "/product/d1.jpg",
        isAmazing: false,
    },
    {
        id: 3,
        name: "محصول 3",
        originalPrice: 15_900_000,
        currentPrice: 11_260_900,
        cover_image: "/product/a2.jpg",
        slug: "product-3",
        category: "category-1",
        isAmazing: false,
    },
    {
        id: 4,
        name: "محصول 4",
        originalPrice: 200000,
        currentPrice: 84000,
        cover_image: "/product/d2.jpg",
        slug: "product-4",
        category: "category-2",
        isAmazing: true,
    },
];
const fakeCategories = [
    {
        id: 1, name: "دسته بندی 1", slug: "category-1", children: [
            { id: 5, name: "زیر دسته 1-1", slug: "subcategory-1-1" },
            { id: 6, name: "زیر دسته 1-2", slug: "subcategory-1-2" },
            { id: 7, name: "زیر دسته 1-3", slug: "subcategory-1-3" },
            { id: 8, name: "زیر دسته 1-4", slug: "subcategory-1-4" },
            { id: 9, name: "زیر دسته 1-5", slug: "subcategory-1-5" },
        ]
    },
    {
        id: 2, name: "دسته بندی 2", slug: "category-2", children: [
            { id: 10, name: "زیر دسته 2-1", slug: "subcategory-2-1" },
            { id: 11, name: "زیر دسته 2-2", slug: "subcategory-2-2" },
            { id: 12, name: "زیر دسته 2-3", slug: "subcategory-2-3" },
            { id: 13, name: "زیر دسته 2-4", slug: "subcategory-2-4" },
            { id: 14, name: "زیر دسته 2-5", slug: "subcategory-2-5" },
        ]
    },
    {
        id: 3, name: "دسته بندی 3", slug: "category-3", children: [
            { id: 15, name: "زیر دسته 3-1", slug: "subcategory-3-1" },
            { id: 16, name: "زیر دسته 3-2", slug: "subcategory-3-2" },
            { id: 17, name: "زیر دسته 3-3", slug: "subcategory-3-3" },
            { id: 18, name: "زیر دسته 3-4", slug: "subcategory-3-4" },
            { id: 19, name: "زیر دسته 3-5", slug: "subcategory-3-5" },
        ]
    },
    {
        id: 4, name: "دسته بندی 4", slug: "category-4", children: [
            { id: 20, name: "زیر دسته 4-1", slug: "subcategory-4-1" },
        ]
    },
    {
        id: 5, name: "دسته بندی 5", slug: "category-5", children: [
            { id: 20, name: "زیر دسته 5-1", slug: "subcategory-5-1" },
        ]
    },
];
export async function GetShopCategoriesTreeList() {
    try {
        // const result = await api.get("/shop/categories/tree/")
        const result: { data: any[] } = { data: fakeCategories };
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

        // const result = await api.get(`/shop/products?${query.toString()}`);
        const result = await { data: { results: fakeProducts, count: fakeProducts.length, page: 1 } }
        return result
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function GetProductBySlug(slug: string): Promise<any> {
    try {
        // const result = await api.get(`/shop/products/${slug}/`);
        const result = await { data: fakeProducts.find(product => product.slug === slug) };
        return result
    } catch (error) {
        console.error(error);
        throw error;
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