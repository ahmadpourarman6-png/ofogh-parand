import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('شروع seed کردن دیتابیس...')

  // ایجاد مدیر پیش‌فرض با رمز قوی
  const hashedPassword = await bcrypt.hash('Admin@2026!Parand', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@parand.com' },
    update: {},
    create: {
      email: 'admin@parand.com',
      name: 'مدیر سیستم',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('\n✅ مدیر سیستم ایجاد شد:')
  console.log('   📧 ایمیل: admin@parand.com')
  console.log('   🔑 رمز عبور: Admin@2026!Parand')
  console.log('   ⚠️  لطفاً بعد از اولین ورود، رمز عبور را تغییر دهید!\n')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
