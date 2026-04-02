import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    if (path.startsWith('/admin')) {
        // Allow access to login page
        if (path.startsWith('/admin/login')) {
            return NextResponse.next()
        }

        // Check for auth cookie
        const authCookie = request.cookies.get('auth_token')

        if (!authCookie) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
