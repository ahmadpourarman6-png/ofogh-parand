import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { loginLimiter, rateLimitCheck } from './rateLimit'
import { logSecurityEvent, sanitizeInput } from './security'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'ایمیل', type: 'email' },
        password: { label: 'رمز عبور', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('اطلاعات ورود نامعتبر است')
        }

        const email = sanitizeInput(credentials.email.toLowerCase())
        const clientIP = (req as any)?.headers?.['x-forwarded-for'] || 'unknown'

        // Rate Limiting برای جلوگیری از Brute Force
        const limitCheck = await rateLimitCheck(loginLimiter, email)
        if (!limitCheck.success) {
          logSecurityEvent('Login Rate Limit Exceeded', {
            email,
            ip: clientIP,
          }, 'warning')
          throw new Error(limitCheck.error || 'تعداد تلاش‌های ناموفق بیش از حد')
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user || !user?.password) {
          logSecurityEvent('Failed Login - User Not Found', {
            email,
            ip: clientIP,
          }, 'warning')
          throw new Error('کاربر یافت نشد')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          logSecurityEvent('Failed Login - Invalid Password', {
            email,
            ip: clientIP,
            userId: user.id,
          }, 'warning')
          throw new Error('رمز عبور اشتباه است')
        }

        // ثبت ورود موفق
        logSecurityEvent('Successful Login', {
          userId: user.id,
          email: user.email,
          ip: clientIP,
        }, 'info')

        return user
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // ۲۴ ساعت
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
}
