
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import api from "@/services/api";
export async function POST(request: Request) {
    const token = (await cookies()).get("access_token")?.value;
    if (!token) return NextResponse.json({ error: "توکن یافت نشد" }, { status: 401 });

    const body = await request.json();
    try {
        const result = await api.post("/marketing/products/select/", body, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return NextResponse.json(result.data);
    } catch (error: any) {
        return NextResponse.json({ errors: error?.response?.data }, { status: error?.response?.status || 400 });
    }
}
