import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    // Run migrations first
    try {
      await execAsync('npx prisma migrate deploy');
    } catch (migrateError) {
      console.error('Migration error:', migrateError);
    }

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@parand.com' }
    });

    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'مدیر قبلاً ساخته شده',
        email: 'admin@parand.com',
        password: 'Admin@2026!Parand'
      });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@2026!Parand', 10);
    
    const admin = await prisma.user.create({
      data: {
        name: 'مدیر سیستم',
        email: 'admin@parand.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    return NextResponse.json({ 
      message: 'مدیر سیستم با موفقیت ایجاد شد',
      email: admin.email,
      name: admin.name,
      password: 'Admin@2026!Parand',
      warning: '⚠️ لطفاً بعد از اولین ورود، رمز عبور را تغییر دهید!'
    });
  } catch (error: any) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user', details: error.message },
      { status: 500 }
    );
  }
}
