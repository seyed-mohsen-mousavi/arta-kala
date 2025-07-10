import Article from "@/types/blog"
import api from "./api"
import { BlogCategoryNode } from "@/types/categories";
type BlogPostsResponse = {
    data: Article[];
    next_page: string | null;
    total_pages: number;
};
export const GetBlogPosts = async (currentPage?: number): Promise<BlogPostsResponse | undefined> => {
    console.log(currentPage)
    try {
        const result = await api.get<BlogPostsResponse>("/blog/posts/")
        return result.data
    } catch (error) {
        console.error(error)
        return undefined
    }
}
export const GetBlogCategoriesMenuStructure = async (): Promise<BlogCategoryNode | undefined> => {
    try {
        const result = await api.get<BlogCategoryNode>("/blog/categories/menu_structure/")
        return result.data
    } catch (error) {
        console.error(error)
        return undefined
    }
}

export async function GetBlogBySlug(slug: string): Promise<any> {
    try {
        const result = await api.get(`/blog/posts/${slug}/`);
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
interface Search {
    search?: string;
    sort?: string;
    page?: number;
    category_id?: number;
}
export async function SearchBlogs(params: Search): Promise<any> {
    const searchParams = await params || {};
    const query = new URLSearchParams();
    if (searchParams?.search) query.append("q", searchParams?.search);
    if (searchParams?.sort) query.append("sort", searchParams?.sort);
    if (searchParams?.page !== undefined) query.append("page", searchParams?.page.toString());
    if (searchParams?.category_id !== undefined) query.append("category", searchParams?.category_id.toString());

    try {
        const result = await api.get(`/blog/posts/search?${query.toString()}`);
        return result.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export async function GetLatestArticles() : Promise<any>  {
    try {
        const result = await api.get("/blog/posts/latest");
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}