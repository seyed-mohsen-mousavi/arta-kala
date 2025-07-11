"use server"
import { cookies } from 'next/headers';
import { User } from '@/types/user';
export async function refreshAccessToken() {
    const { refreshCookie } = await getAuthTokens();
    if (!refreshCookie) throw new Error("No refresh token found");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshCookie.value }),
        credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to refresh token");

    const data = await response.json();
    return data.access;
}

export async function getAuthTokens() {
    const cookieStore = await cookies();
    const accessCookie = cookieStore.get('access_token');
    const refreshCookie = cookieStore.get('refresh_token');

    if (!accessCookie) {
        return { error: "NOT_LOGGED_IN" }
    }

    return { accessCookie, refreshCookie };

}
const user: User = {
    identity: {
        phone_number: "09123456789",
        first_name: "محسن",
        last_name: "موسوی",
        national_code: "1234567890",
        email: "mohsen@example.com",
        job: "برنامه‌نویس",
        address: "خیابان آزادی، تهران",
        postal_code: "1234567890",
        birth_date: "2006-01-01",
        province: "تهران",
        city: "تهران",
        referral_code: "ABC123",
        points: 150,
    },
    cart: {
        message: "سبد خرید شما دارای ۲ آیتم است.",
        items: [
            {
                id: 1,
                name: "محصول A",
                quantity: 2,
                price: 100000,
            },
            {
                id: 2,
                name: "محصول B",
                quantity: 1,
                price: 200000,
            },
        ],
    },
    pre_invoices: {
        message: "پیش‌فاکتور برای سفارش اخیر ایجاد شده است.",
    },
    orders: {
        message: "شما ۳ سفارش فعال دارید.",
    },
};

export const GetUserDashboard = async () => {
    // const cookieStore = await cookies();
    // const token = cookieStore.get('accessToken')?.value;

    // if (!token) {
    //     return null;
    // }

    try {
        // const result = await api.get("/users/dashboard/", {
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // });
        // return result.data;
        return user
    } catch (error: any) {
        console.error("Dashboard Error:", error?.response?.data || error?.message || error);
        return null;
    }
};
