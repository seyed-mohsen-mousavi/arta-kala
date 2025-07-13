import { NextRequest, NextResponse } from "next/server";
import api from "@/services/api";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { phone_number, code, referral_code } = body;

    try {
        const res = await api.post("/users/otp/verify/", {
            phone_number,
            code,
            referral_code: referral_code || "",
        });

        const { access, refresh, message } = res.data;

        const response = NextResponse.json({ message });

        response.cookies.set("access_token", access, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 روز
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
            { error: error?.response?.data?.error || "کد تأیید نامعتبر است" },
            { status: error?.response?.status || 500 }
        );
    }
}
