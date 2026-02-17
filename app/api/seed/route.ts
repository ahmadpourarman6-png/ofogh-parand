import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log('شروع seed کردن دیتابیس...');

    // ایجاد مدیر پیش‌فرض با رمز قوی
    const hashedPassword = await bcrypt.hash('Admin@2026!Parand', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@parand.com' },
      update: {},
      create: {
        email: 'admin@parand.com',
        name: 'مدیر سیستم',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({ 
      success: true, 
      message: 'مدیر سیستم با موفقیت ایجاد شد',
      credentials: {
        email: 'admin@parand.com',
        password: 'Admin@2026!Parand',
        warning: '⚠️ لطفاً بعد از اولین ورود، رمز عبور را تغییر دهید!'
      }
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    await prisma.$disconnect();
    
    return NextResponse.json({ 
      success: false, 
      error: error.message
    }, { status: 500 });
  }
}
