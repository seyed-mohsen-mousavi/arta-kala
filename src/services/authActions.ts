"use server"
import { cookies } from 'next/headers';
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