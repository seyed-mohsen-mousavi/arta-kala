import Article from "@/types/blog"
import api from "./api"
import { BlogCategoryNode } from "@/types/categories";
type BlogPostsResponse = {
    data: Article[];
    next_page: string | null;
    total_pages: number;
};
export const GetBlogPosts = async (currentPage?: number): Promise<BlogPostsResponse | undefined> => {
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
        return null
    }
}