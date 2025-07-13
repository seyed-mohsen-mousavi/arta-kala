"use server";

import { cookies } from "next/headers";
import api from "./api";

export const GetUserDashboard = async () => {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('access_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!accessToken) {
        return null;
    }

    try {
        // تلاش اول با access token فعلی
        const result = await api.get("/users/dashboard/", {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return result.data;

    } catch (error: any) {
        const originalError = error?.response?.data || error?.message;

        console.error("Dashboard Error:", originalError);
        return null;
    }
};
