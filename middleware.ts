import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const locale = request.nextUrl.pathname === '/es' || request.nextUrl.pathname.startsWith('/es/')
    ? 'es'
    : 'en';
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-socialpulse-locale', locale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Language', locale);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
