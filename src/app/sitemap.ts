import { GetBlogCategoriesMenuStructure, GetBlogPosts } from "@/services/blogActions";
import {
    GetProducts,
    GetShopCategoriesTreeList,
} from "@/services/shopActions";
import { BlogCategoryNode, CategoryNode } from "@/types/categories";
import ProductType from "@/types/product";
import { MetadataRoute } from "next";
import jalaali from "jalaali-js";
import Article from "@/types/blog";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
function convertJalaliToDate(jalaliStr: string): Date {
    const [jy, jm, jd] = jalaliStr.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).split("/").map(Number);
    const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
    return new Date(gy, gm - 1, gd);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogs = await GetBlogPosts();
    const products = await GetProducts();
    const categories = await GetShopCategoriesTreeList();
    const rawCategories = await GetBlogCategoriesMenuStructure();
    const blogcategories: BlogCategoryNode[] = Array.isArray(rawCategories)
        ? rawCategories
        : []; const blogPosts = blogs?.data || [];
    const productItems = products?.results || [];
    const categoryItems = categories?.data || [];

    const sitemap = [
        { url: `${baseUrl}/`, lastModified: new Date() },
        { url: `${baseUrl}/products`, lastModified: new Date() },
        { url: `${baseUrl}/articles`, lastModified: new Date() },
        { url: `${baseUrl}/gallery`, lastModified: new Date("2025-01-03") },
        { url: `${baseUrl}/about-us`, lastModified: new Date("2025-01-01") },
        { url: `${baseUrl}/contact-info`, lastModified: new Date("2025-01-02") },
    ];

    blogPosts.forEach((post: Article) => {
        sitemap.push({
            url: `${baseUrl}/articles/${post.slug}`,
            lastModified: convertJalaliToDate(post.jalali_created),
        });
    });
    blogcategories.forEach((blog) => {
        blog.children?.forEach(blogChild => {
            sitemap.push({
                url: `${baseUrl}/articles?category=${blogChild.slug}`,
                lastModified: new Date(),
            });
        })
        sitemap.push({
            url: `${baseUrl}/articles?category=${blog.slug}`,
            lastModified: new Date(),
        });
    });

    productItems.forEach((product: ProductType) => {
        sitemap.push({
            url: `${baseUrl}/product/${product.slug}`,
            lastModified: new Date(),
        });
    });

    categoryItems.forEach((category: CategoryNode) => {
        category.children?.forEach(childcategory => {
            sitemap.push({
                url: `${baseUrl}/products?category_id=${childcategory.id}`,
                lastModified: new Date(),
            });
        })
        sitemap.push({
            url: `${baseUrl}/products?category_id=${category.id}`,
            lastModified: new Date(),
        });
    });

    return sitemap;
}
