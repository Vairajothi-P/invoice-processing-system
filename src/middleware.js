import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Define public routes (auth page, assets, etc.)
    const isAuthPage = pathname.startsWith('/auth');
    const isPublicFile = pathname.match(/\.(.*)$/);
    const isNextInternal = pathname.startsWith('/_next');

    // Skip middleware for public files and internal next routes
    if (isPublicFile || isNextInternal) {
        return NextResponse.next();
    }

    // Placeholder auth check: Check for a mock auth cookie
    const isAuthenticated = request.cookies.get('auth_token');

    // If not authenticated and trying to access any protected route, redirect to /auth
    if (!isAuthenticated && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    // If authenticated and trying to access /auth, redirect to Dashboard
    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
