import { NextRequest, NextResponse } from 'next/server';
import { GetUserDashboard } from '@/services/authActions';

export async function middleware(request: NextRequest) {
    const user = await GetUserDashboard();

    if (!user && request.nextUrl.pathname.startsWith('/profile')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}