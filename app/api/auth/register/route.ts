import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { registerLimiter, rateLimitCheck } from '@/lib/rateLimit'
import {
  validatePasswordStrength,
  validateEmail,
  sanitizeInput,
  detectSQLInjection,
  logSecurityEvent,
} from '@/lib/security'

export async function POST(request: Request) {
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown'

  try {
    // Rate Limiting
    const limitCheck = await rateLimitCheck(registerLimiter, clientIP)
    if (!limitCheck.success) {
      logSecurityEvent('Register Rate Limit Exceeded', { ip: clientIP }, 'warning')
      return NextResponse.json({ error: limitCheck.error }, { status: 429 })
    }

    const body = await request.json()
    let { name, email, password } = body

    // اعتبارسنجی ورودی‌ها
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'لطفا تمام فیلدها را پر کنید' },
        { status: 400 }
      )
    }

    // پاکسازی ورودی‌ها
    name = sanitizeInput(name)
    email = sanitizeInput(email.toLowerCase())

    // بررسی SQL Injection
    if (detectSQLInjection(name) || detectSQLInjection(email)) {
      logSecurityEvent('SQL Injection Attempt', { ip: clientIP, name, email }, 'critical')
      return NextResponse.json(
        { error: 'ورودی نامعتبر شناسایی شد' },
        { status: 400 }
      )
    }

    // اعتبارسنجی ایمیل
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'فرمت ایمیل صحیح نیست' },
        { status: 400 }
      )
    }

    // اعتبارسنجی قدرت رمز عبور
    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: 'رمز عبور ضعیف است', details: passwordValidation.errors },
        { status: 400 }
      )
    }

    // بررسی ایمیل تکراری
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      logSecurityEvent('Duplicate Email Registration Attempt', { ip: clientIP, email }, 'info')
      return NextResponse.json(
        { error: 'این ایمیل قبلاً ثبت شده است' },
        { status: 400 }
      )
    }

    // هش کردن پسورد با bcrypt (cost factor 12 برای امنیت بالاتر)
    const hashedPassword = await bcrypt.hash(password, 12)

    // ایجاد کاربر جدید با نقش USER (بدون دسترسی)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    logSecurityEvent('User Registered Successfully', {
      userId: user.id,
      email: user.email,
      ip: clientIP,
    }, 'info')

    return NextResponse.json(
      {
        message: 'ثبت‌نام با موفقیت انجام شد',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    logSecurityEvent('Register Error', {
      ip: clientIP,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, 'critical')

    return NextResponse.json(
      { error: 'خطا در ثبت‌نام. لطفا دوباره تلاش کنید' },
      { status: 500 }
    )
  }
}
