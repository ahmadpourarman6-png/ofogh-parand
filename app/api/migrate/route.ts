import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    console.log('Starting migration...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    // Run migrations using node directly
    const { stdout, stderr } = await execAsync('node /app/node_modules/prisma/build/index.js migrate deploy', {
      env: { ...process.env },
      cwd: '/app'
    });
    
    console.log('Migration stdout:', stdout);
    if (stderr) console.error('Migration stderr:', stderr);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Migrations completed successfully',
      output: stdout
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
