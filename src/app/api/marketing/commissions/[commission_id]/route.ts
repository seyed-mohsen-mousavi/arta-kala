import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import api from "@/services/api";

export async function GET(_: Request, { params }: { params: { commission_id: string } }) {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) return NextResponse.json({ error: "توکن یافت نشد" }, { status: 401 });

    try {
        const result = await api.get(`/marketing/commissions/${params.commission_id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return NextResponse.json(result.data);
    } catch (error: any) {
        return NextResponse.json({ errors: error?.response?.data }, { status: error?.response?.status || 400 });
    }
}
