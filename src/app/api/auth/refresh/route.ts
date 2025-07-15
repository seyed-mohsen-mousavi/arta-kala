import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import api from '@/services/api'

export async function POST() {
    const cookieStore = await cookies()
    const refresh = cookieStore.get('refresh_token')?.value

    if (!refresh) {
        return NextResponse.json({ error: 'No refresh token' }, { status: 401 })
    }

    try {
        const { data } = await api.post('/users/token/refresh/', {
            refresh,
        })
        cookieStore.set('access_token', data.access, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 5,
        })

        if (data.refresh) {
            cookieStore.set('refresh_token', data.refresh, {
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
            })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Refresh failed' }, { status: 401 })
    }
}