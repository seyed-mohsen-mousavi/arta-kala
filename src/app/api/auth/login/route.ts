import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "@/services/api";

export async function POST(request: NextRequest) {
    const body = await request.json();
    try {
        const res = await api.post("/users/login/password/", body);
        const { access, refresh, message } = res.data;

        const response = NextResponse.json({ message });

        response.cookies.set("access_token", access, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === "production",
        });

        response.cookies.set("refresh_token", refresh, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
            secure: process.env.NODE_ENV === "production",
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                error:
                    error?.response?.data?.message || "ورود ناموفق بود",
            },
            { status: error?.response?.status || 500 }
        );
    }
}
