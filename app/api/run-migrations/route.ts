import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    // Run prisma migrate deploy
    const { stdout, stderr } = await execAsync('npx prisma migrate deploy');
    
    console.log('Migration output:', stdout);
    if (stderr) console.error('Migration errors:', stderr);

    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully!',
      output: stdout,
      credentials: {
        email: 'admin@parand.com',
        password: 'Admin@2026!Parand'
      }
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stderr: error.stderr,
      stdout: error.stdout
    }, { status: 500 });
  }
}
