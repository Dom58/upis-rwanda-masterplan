// pages/_middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Define valid routes
    const validRoutes = [
        '/',
        '/not-found',
        // Add more valid routes here (if any)
    ];

    // Redirect to custom 404 page for invalid routes
    if (!validRoutes.includes(pathname) && !pathname.startsWith('/api')) {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    return NextResponse.next();
}
