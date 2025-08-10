"use server";

import { cookies } from "next/headers";
import api from "./api";

type ApiResponse<T> = Promise<{
    success: boolean;
    data?: T | null;
    message?: string;
    errors?: any;
    status?: number;
    store_name?: string
}>;

async function getToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get("access_token")?.value;
}

export async function getAuthHeaders() {
    const token = await getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function handleError(err: any, fallbackMsg = "خطا در ارتباط با سرور") {
    if (err.response) {
        console.error("Data:", err.response.data);
        return {
            success: false,
            data: err.response.data,
            message: "درخواست با خطا مواجه شد.",
        };
    } else if (err.request) {
        console.error("درخواست ارسال شد ولی پاسخی دریافت نشد:", err.request);
    } else {
        console.error("خطای ناشناخته:", err.message);
    }
    return {
        success: false,
        errors: {},
        message: fallbackMsg,
    };
}


export const marketing_commissions_list: () => ApiResponse<any> = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get("/marketing/commissions/", { headers });
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
};

export async function marketing_commissions_read(commission_id: any): ApiResponse<any> {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get(`/marketing/commissions/${commission_id}/`, { headers });
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
}

export const marketing_products_list = async (): ApiResponse<any[]> => {
    try {
        const headers = await getAuthHeaders();

        const [resMarketing, resDiscounted] = await Promise.all([
            api.get(`/marketing/products/`, { headers }),
            api.get(`/home/discounted-products/`),
        ]);

        const marketingData = resMarketing.data || [];
        const discountedList = resDiscounted.data || [];

        const discountedMap = new Map(
            discountedList.map((item: any) => [item.slug, item])
        );

        const merged = marketingData.map((item: any) => {
            const discount: any = discountedMap.get(item.product.slug);
            if (discount) {
                return {
                    ...item,
                    product: {
                        ...item.product,
                        isDiscounted: true,
                        discount_percentage: discount.discount_percentage,
                        final_price: discount.final_price,
                    },
                };
            }
            return item;
        });

        return { success: true, data: merged };
    } catch (err) {
        console.error("خطا در marketing_products_list:", err);
        return {
            success: false,
            errors: {},
            message: "خطا در ارتباط با سرور",
        };
    }
};

interface MarketingProductRemoveResponse {
    [key: string]: any;
}

export const marketing_products_remove_delete: (
    product_id: string | number
) => ApiResponse<MarketingProductRemoveResponse> = async (product_id) => {
    try {
        console.log(`/marketing/products/remove/${product_id}/`)
        const headers = await getAuthHeaders();
        const response = await api.delete<MarketingProductRemoveResponse>(`/marketing/products/remove/${product_id}/`, { headers });
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
};

export const marketing_products_select_create: (data: { product_ids: number[]; }) => ApiResponse<any> = async (data) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.post(`/marketing/products/select/`, data, { headers });
        return { success: true, data: response.data };
    } catch (err: any) {
        if (err.response) {
            console.error("Data:", err.response.data);
            return {
                success: false,
                errors: err.response.data.errors ? err.response.data.errors[0] : {},
                message: err.message || "خطا در ارتباط با سرور",
            };
        }
        return {
            success: false,
            errors: {},
            message: "خطا در ارتباط با سرور",
        };
    }
};

export const marketing_profile_list: () => ApiResponse<any> = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get("/marketing/profile/", { headers });
        return { success: true, data: response.data };
    } catch (err: any) {
        if (err.response?.status === 404 && err.response?.data?.message) {
            return {
                success: false,
                message: err.response.data.message,
                data: null,
            };
        }
        return {
            success: false,
            errors: {},
            message: "خطا در ارتباط با سرور",
        };
    }
};

export const marketing_register_create: (data: { store_name_persian: string; store_name_english: string; card_number: string; }) => ApiResponse<any> = async (data) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.post("/marketing/register/", data, { headers });
        return { success: true, data: response.data };
    } catch (err: any) {
        const status = err.response?.status;
        const responseData = err.response?.data;

        if ((status === 400 || status === 422) && responseData) {
            return {
                success: false,
                errors: responseData,
                status,
                message: "لطفاً خطاهای زیر را بررسی کنید",
            };
        }

        if (status === 404 && responseData?.message) {
            return {
                success: false,
                message: responseData.message,
                data: null,
            };
        }

        console.error("خطا در marketing_register_create:", err);
        return {
            success: false,
            errors: {},
            message: "خطا در ارتباط با سرور",
        };
    }
};

export async function marketing_store_read(
    store_name_english: string,
    product_slug?: string | undefined
): ApiResponse<any> {
    try {
        const headers = await getAuthHeaders();

        const url = product_slug
            ? `/marketing/store/${store_name_english}/${product_slug}/`
            : `/marketing/store/${store_name_english}/`;

        const [resStore, resDiscounted] = await Promise.all([
            api.get(url, { headers }),
            api.get(`/home/discounted-products/`),
        ]);

        const storeData = resStore.data;
        const discountedList = resDiscounted.data || [];
        const discountedMap: any = new Map(
            discountedList.map((item: any) => [item.slug, item])
        );

        if (product_slug) {
            const discount = discountedMap.get(storeData.slug);
            const merged = discount
                ? {
                    ...storeData,
                    isDiscounted: true,
                    discount_percentage: discount.discount_percentage,
                    final_price: discount.final_price,
                }
                : storeData;

            return { success: true, data: merged };
        }

        const mergedList = (storeData.products || []).map((item: any) => {
            const discount = discountedMap.get(item.slug);
            if (discount) {
                return {
                    ...item,
                    isDiscounted: true,
                    discount_percentage: discount.discount_percentage,
                    final_price: discount.final_price,
                };
            }
            return item;
        });


        const store_name = storeData?.store_name_persian || ""
        return { success: true, data: mergedList, store_name };
    } catch (err) {
        console.error("خطا در marketing_store_read:", err);
        return {
            success: false,
            errors: {},
            message: "خطا در ارتباط با سرور",
        };
    }
};

export const marketing_withdrawal_request_create: (data: { amount: number; }) => ApiResponse<any> = async (data) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.post("/marketing/withdrawal/request/", data, { headers });
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
};

export const marketing_withdrawal_requests: () => ApiResponse<any> = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get("/marketing/withdrawal-requests/", { headers });
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
};
export const marketing_withdrawal_request: (id: string) => ApiResponse<any> = async (id) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get(`/marketing/withdrawal-requests/${id}/`, { headers });
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
};
export const marketing_orders: () => ApiResponse<any> = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get("/marketing/my-orders/", { headers });
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
};
export const marketing_order: (id: string) => ApiResponse<any> = async (id) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get(`/marketing/my-orders/${id}/`, { headers });
        return { success: true, data: response.data };
    } catch (err) {
        return handleError(err);
    }
};

