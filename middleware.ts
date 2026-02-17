import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // اجازه دسترسی به صفحه اصلی برای همه
    if (path === '/') {
      return NextResponse.next()
    }

    // اگر کاربر لاگین نکرده به صفحه لاگین هدایت شود
    if (!token && path !== '/login' && path !== '/register') {
      const loginUrl = new URL('/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    // اگر کاربر لاگین کرده و به صفحه لاگین یا ثبت‌نام برود، به داشبورد هدایت شود
    if (token && (path === '/login' || path === '/register')) {
      const dashboardUrl = new URL('/dashboard', req.url)
      return NextResponse.redirect(dashboardUrl)
    }

    // فقط ADMIN به همه چیز دسترسی دارد
    if (token && token.role !== 'ADMIN') {
      // کاربران عادی فقط به داشبورد دسترسی دارند
      if (path !== '/dashboard' && !path.startsWith('/api/auth')) {
        const dashboardUrl = new URL('/dashboard', req.url)
        return NextResponse.redirect(dashboardUrl)
      }
    }

    // اضافه کردن Security Headers
    const response = NextResponse.next()
    
    // محافظت از XSS
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    
    // محافظت از Clickjacking
    response.headers.set('Content-Security-Policy', "frame-ancestors 'none'")
    
    // HTTPS enforcement (فقط در production)
    if (process.env.NODE_ENV === 'production') {
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    }
    
    // Referrer Policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    // Permissions Policy
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // اجازه دسترسی به صفحه اصلی و login و register بدون توکن
        const path = req.nextUrl.pathname
        if (path === '/' || path === '/login' || path === '/register') {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/invoices/:path*',
    '/contracts/:path*',
    '/users/:path*',
    '/login',
    '/register',
  ],
}
