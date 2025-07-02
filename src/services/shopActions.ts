"use server";
import api from "./api";

export async function GetShopCategoriesTreeList() {
    try {
        const result = await api.get("/shop/categories/tree/")
        return result
    } catch (error) {
        console.log(error)
    }
}