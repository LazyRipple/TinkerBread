import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const { pathname } = request.nextUrl

  if (user && pathname.startsWith(`/bake/${user.link_id}`)) {
    return NextResponse.redirect(new URL('/bake/me', request.url))
  }

  if (!user && (pathname.startsWith('/bake') || pathname.startsWith('/setting'))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/signup') && user != null) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
