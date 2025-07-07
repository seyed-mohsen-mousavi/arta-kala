import { NextRequest, NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value
    const { pathname } = req.nextUrl

    // فقط مسیرهایی که باید محافظت بشن
    const PROTECTED_PATHS = ['/dashboard']

    const isProtected = PROTECTED_PATHS.some((path) =>
        pathname.startsWith(path),
    )

    // فقط اگر مسیر محافظت‌شده بود بررسی کنیم
    if (isProtected) {
        if (!token) {
            return redirectToHome(req)
        }

        try {
            verify(token, process.env.ACCESS_TOKEN_SECRET!)
            return NextResponse.next()
        } catch {
            return redirectToHome(req)
        }
    }

    return NextResponse.next()
}

function redirectToHome(req: NextRequest) {
    const redirectUrl = req.nextUrl.clone()

    // جلوگیری از لوپ: اگر خود home با authRequired بود، رد شو
    if (
        redirectUrl.pathname === '/' &&
        redirectUrl.searchParams.get('authRequired') === '1'
    ) {
        return NextResponse.next()
    }

    redirectUrl.pathname = '/'
    redirectUrl.searchParams.set('authRequired', '1')
    return NextResponse.redirect(redirectUrl)
}

export const config = {
    matcher: ['/dashboard/:path*'],
}