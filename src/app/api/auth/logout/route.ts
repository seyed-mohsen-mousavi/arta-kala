import { NextResponse } from 'next/server'

export async function POST() {
    const response = new NextResponse(JSON.stringify({ message: 'Logged out' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const isProd = process.env.NODE_ENV === "production";

    const cookieOptions = {
        httpOnly: true,
        path: "/",
        secure: isProd,
        sameSite: "lax" as "lax", // اگر هنگام ست کردن ست نشده، حذفش کن
        expires: new Date(0), // برای حذف کوکی
    };

    response.cookies.set("access_token", "", cookieOptions);
    response.cookies.set("refresh_token", "", cookieOptions);

    return response;
}
