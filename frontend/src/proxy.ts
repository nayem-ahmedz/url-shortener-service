import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    // Get the cookies
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value;
    const { pathname } = request.nextUrl;
    console.log('pathname in proxy mid', pathname)

    // Protect the Dashboard
    if (pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Prevent logged-in users from seeing Login/Register again
    if ((pathname === '/login' || pathname === '/register') && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// 4. Configuration: Only run on specific paths to keep the app fast
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register'
    ],
};