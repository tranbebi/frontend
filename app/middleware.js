import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/dangnhap',   ));
  }

  try {
    const res = await fetch('http://localhost:3000/user/checktoken', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL('/dangnhap', request.url));
    }

    const user = await res.json();

    if (user.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/dangnhap', request.url));
  }
}

export const config = {
  matcher: ['/menu', '/info', '/cart', '/admin'],
};