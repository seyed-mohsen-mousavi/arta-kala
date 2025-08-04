import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const token = body.token;

        if (!token) {
            return NextResponse.json({ success: false, message: "Missing captcha token" }, { status: 400 });
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;

        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secretKey}&response=${token}`,
        });

        const data = await res.json();

        if (!data.success) {
            return NextResponse.json({ success: false, message: "Captcha verification failed" }, { status: 403 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, message: "Internal error" }, { status: 500 });
    }
}
