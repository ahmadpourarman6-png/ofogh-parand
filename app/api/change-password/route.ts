import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'لطفاً ابتدا وارد شوید' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'لطفاً تمام فیلدها را پر کنید' },
        { status: 400 }
      );
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'رمز عبور باید حداقل ۸ کاراکتر باشد' },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(newPassword)) {
      return NextResponse.json(
        { error: 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد' },
        { status: 400 }
      );
    }

    if (!/[a-z]/.test(newPassword)) {
      return NextResponse.json(
        { error: 'رمز عبور باید حداقل یک حرف کوچک داشته باشد' },
        { status: 400 }
      );
    }

    if (!/[0-9]/.test(newPassword)) {
      return NextResponse.json(
        { error: 'رمز عبور باید حداقل یک عدد داشته باشد' },
        { status: 400 }
      );
    }

    if (!/[!@#$%^&*]/.test(newPassword)) {
      return NextResponse.json(
        { error: 'رمز عبور باید حداقل یک کاراکتر خاص داشته باشد (!@#$%^&*)' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'رمز عبور فعلی اشتباه است' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: 'رمز عبور با موفقیت تغییر یافت',
    });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'خطا در تغییر رمز عبور' },
      { status: 500 }
    );
  }
}
