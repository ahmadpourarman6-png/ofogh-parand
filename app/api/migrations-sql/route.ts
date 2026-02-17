import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read all migration files
    const migrationsDir = path.join(process.cwd(), 'prisma', 'migrations');
    const migrationFolders = fs.readdirSync(migrationsDir).filter(f => 
      fs.statSync(path.join(migrationsDir, f)).isDirectory()
    );

    let allSQL = '';
    
    for (const folder of migrationFolders) {
      const sqlFile = path.join(migrationsDir, folder, 'migration.sql');
      if (fs.existsSync(sqlFile)) {
        const sql = fs.readFileSync(sqlFile, 'utf-8');
        allSQL += `-- Migration: ${folder}\n${sql}\n\n`;
      }
    }

    // Also add the admin user creation
    allSQL += `
-- Create Admin User
DO $$
DECLARE
    user_exists INTEGER;
BEGIN
    -- Check if admin already exists
    SELECT COUNT(*) INTO user_exists FROM users WHERE email = 'admin@parand.com';
    
    IF user_exists = 0 THEN
        INSERT INTO users (id, name, email, password, role, "createdAt", "updatedAt")
        VALUES (
            gen_random_uuid()::text,
            'مدیر سیستم',
            'admin@parand.com',
            '$2a$10$RnZJUuAuZr5kV17soLoM.e9x4E.Tob1Gw49bWGr6Ri56w9sbk7v2a',
            'ADMIN',
            NOW(),
            NOW()
        );
        RAISE NOTICE 'Admin user created successfully';
    ELSE
        RAISE NOTICE 'Admin user already exists';
    END IF;
END $$;

-- Login credentials:
-- Email: admin@parand.com
-- Password: Admin@2026!Parand
`;

    return new NextResponse(allSQL, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'inline; filename="migrations.sql"'
      }
    });

  } catch (error: any) {
    return NextResponse.json({ 
      error: 'خطا در خواندن فایل‌های migration',
      details: error.message 
    }, { status: 500 });
  }
}
