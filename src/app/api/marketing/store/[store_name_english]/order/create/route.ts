import api from "@/services/api";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ store_name_english: string }>}
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;
        if (!token) return new Response("Unauthorized", { status: 401 });

        const { store_name_english } = await params;
        const body = await req.json();
        console.log(token, store_name_english, body);
        const res = await api.post(
            `/marketing/store/${store_name_english}/order/create/`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return new Response(JSON.stringify(res.data), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || "خطای ناشناخته";
        const statusCode = error?.response?.status || 500;
        // console.log(errorMessage, statusCode, error);
        // console.error("Axios error response:", error.response?.data);
        return new Response(
            JSON.stringify({ success: false, message: errorMessage }),
            {
                status: statusCode,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
