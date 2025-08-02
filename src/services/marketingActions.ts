import { cookies } from "next/headers";
import api from "./api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
export const marketing_commissions_list = async () => {
    try {
        const response = await fetch(`${SITE_URL}/api/marketing/commissions/`);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || "خطا در دریافت کمیسیون‌ها");
        }
        return { success: true, data: result };
    } catch (err) {
        console.error("خطا در marketing_commissions_list:", err);
        return { success: false, errors: {}, message: "خطا در ارتباط با سرور" };
    }
};

export const marketing_commissions_read = async (commission_id: string) => {
    try {
        const response = await fetch(`${SITE_URL}/api/marketing/commissions/${commission_id}/`);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || "خطا در دریافت جزئیات کمیسیون");
        }
        return { success: true, data: result };
    } catch (err) {
        console.error("خطا در marketing_commissions_read:", err);
        return { success: false, errors: {}, message: "خطا در ارتباط با سرور" };
    }
};

export const marketing_products_list = async () => {
    try {
        const response = await fetch(`${SITE_URL}/api/marketing/products/`);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || "خطا در دریافت محصولات");
        }
        return { success: true, data: result };
    } catch (err) {
        console.error("خطا در marketing_products_list:", err);
        return { success: false, errors: {}, message: "خطا در ارتباط با سرور" };
    }
};

export const marketing_products_remove_delete = async (product_id: string) => {
    try {
        const response = await fetch(`${SITE_URL}/api/marketing/products/remove/${product_id}/`, {
            method: "DELETE",
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || "خطا در حذف محصول");
        }
        return { success: true, data: result };
    } catch (err) {
        console.error("خطا در marketing_products_remove_delete:", err);
        return { success: false, errors: {}, message: "خطا در ارتباط با سرور" };
    }
};

export const marketing_products_select_create = async (data: any) => {
    try {
        const response = await fetch(`${SITE_URL}/api/marketing/products/select/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || "خطا در انتخاب محصول");
        }
        return { success: true, data: result };
    } catch (err) {
        console.error("خطا در marketing_products_select_create:", err);
        return { success: false, errors: {}, message: "خطا در ارتباط با سرور" };
    }
};
export const marketing_profile_list = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    try {
        const response = await api.get("/marketing/profile/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return {
            success: true,
            data: response.data,
        };

    } catch (err: any) {
        if (err.response?.status === 404 && err.response?.data?.message) {
            return {
                success: false,
                message: err.response.data.message,
                data: null,
            };
        }

        console.error("خطا در marketing_profile_list:", err);
        return {
            success: false,
            errors: {},
            message: "خطا در ارتباط با سرور",
        };
    }
};


export const marketing_register_create = async (data: any) => {
    try {
        const response = await fetch(`${SITE_URL}/api/marketing/register/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || "خطا در ثبت‌نام");
        }
        return { success: true, data: result };
    } catch (err) {
        console.error("خطا در marketing_register_create:", err);
        return { success: false, errors: {}, message: "خطا در ارتباط با سرور" };
    }
};

export const marketing_store_read = async (
    store_name_english: string,
    product_slug?: string
) => {
    const url = product_slug
        ? `${SITE_URL}/api/marketing/store/${store_name_english}/${product_slug}/`
        : `${SITE_URL}/api/marketing/store/${store_name_english}/`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || "خطا در دریافت فروشگاه یا محصول");
        }
        return { success: true, data: result };
    } catch (err) {
        console.error("خطا در marketing_store_read:", err);
        return { success: false, errors: {}, message: "خطا در ارتباط با سرور" };
    }
};

export const marketing_withdrawal_request_create = async (data: any) => {
    try {
        const response = await fetch(`${SITE_URL}/api/marketing/withdrawal/request/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || "خطا در ثبت درخواست برداشت");
        }
        return { success: true, data: result };
    } catch (err) {
        console.error("خطا در marketing_withdrawal_request_create:", err);
        return { success: false, errors: {}, message: "خطا در ارتباط با سرور" };
    }
};
