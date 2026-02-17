// Rate Limiting برای جلوگیری از حملات Brute Force
import { RateLimiterMemory } from 'rate-limiter-flexible'

// محدودیت برای Login
export const loginLimiter = new RateLimiterMemory({
  points: 5, // تعداد تلاش
  duration: 15 * 60, // ۱۵ دقیقه
  blockDuration: 60 * 60, // ۱ ساعت block
})

// محدودیت برای Register
export const registerLimiter = new RateLimiterMemory({
  points: 3, // ۳ ثبت‌نام در هر IP
  duration: 60 * 60, // ۱ ساعت
  blockDuration: 24 * 60 * 60, // ۲۴ ساعت block
})

// محدودیت کلی API
export const apiLimiter = new RateLimiterMemory({
  points: 100, // ۱۰۰ درخواست
  duration: 60, // در هر دقیقه
})

export async function rateLimitCheck(
  limiter: RateLimiterMemory,
  key: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await limiter.consume(key)
    return { success: true }
  } catch (error: any) {
    if (error.msBeforeNext) {
      const minutes = Math.ceil(error.msBeforeNext / 1000 / 60)
      return {
        success: false,
        error: `تعداد تلاش‌های شما بیش از حد مجاز است. لطفاً ${minutes} دقیقه دیگر تلاش کنید.`,
      }
    }
    return {
      success: false,
      error: 'خطای سرور. لطفاً دوباره تلاش کنید.',
    }
  }
}
