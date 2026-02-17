// توابع امنیتی
import crypto from 'crypto'

// تولید Token امن
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

// Hash کردن با SHA-256
export function hashString(str: string): string {
  return crypto.createHash('sha256').update(str).digest('hex')
}

// اعتبارسنجی قدرت رمز عبور
export function validatePasswordStrength(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('رمز عبور باید حداقل ۸ کاراکتر باشد')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('رمز عبور باید شامل حروف کوچک باشد')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('رمز عبور باید شامل حروف بزرگ باشد')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('رمز عبور باید شامل اعداد باشد')
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push('رمز عبور باید شامل کاراکترهای خاص باشد (@#$%^&*)')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// اعتبارسنجی ایمیل
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// پاکسازی ورودی از XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
}

// بررسی SQL Injection
export function detectSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b)/i,
    /(--|#|\/\*|\*\/)/,
    /(\bOR\b.*=.*|1\s*=\s*1)/i,
  ]

  return sqlPatterns.some((pattern) => pattern.test(input))
}

// لاگ امنیتی
export function logSecurityEvent(
  event: string,
  details: any,
  level: 'info' | 'warning' | 'critical' = 'info'
) {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    level,
    event,
    details,
  }

  // در محیط production به یک سرویس لاگ ارسال شود
  console.log(`[SECURITY ${level.toUpperCase()}]`, JSON.stringify(logEntry))

  // در صورت critical، اعلان فوری
  if (level === 'critical') {
    // ارسال ایمیل یا پیامک به مدیر
    console.error('🚨 CRITICAL SECURITY EVENT:', logEntry)
  }
}
