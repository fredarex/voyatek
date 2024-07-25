import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("authData")
  const cookieValue = cookie?.value;
  let isLoggedIn = false

  if (cookieValue) {
    const parsedCookie = JSON.parse(cookieValue);
    isLoggedIn = parsedCookie.isLoggedIn;
    
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}