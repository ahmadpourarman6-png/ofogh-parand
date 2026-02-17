'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ChangePasswordPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('رمز عبور جدید و تکرار آن یکسان نیستند')
      return
    }

    if (newPassword.length < 8) {
      setError('رمز عبور باید حداقل ۸ کاراکتر باشد')
      return
    }

    if (!/[A-Z]/.test(newPassword)) {
      setError('رمز عبور باید حداقل یک حرف بزرگ داشته باشد')
      return
    }

    if (!/[a-z]/.test(newPassword)) {
      setError('رمز عبور باید حداقل یک حرف کوچک داشته باشد')
      return
    }

    if (!/[0-9]/.test(newPassword)) {
      setError('رمز عبور باید حداقل یک عدد داشته باشد')
      return
    }

    if (!/[!@#$%^&*]/.test(newPassword)) {
      setError('رمز عبور باید حداقل یک کاراکتر خاص داشته باشد (!@#$%^&*)')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('رمز عبور با موفقیت تغییر یافت')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError(data.error || 'خطا در تغییر رمز عبور')
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور')
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              🔐 تغییر رمز عبور
            </h2>
            <p className="mt-2 text-center text-sm text-teal-100">
              برای امنیت بیشتر، رمز عبور قوی انتخاب کنید
            </p>
          </div>

          <div className="px-6 py-8">
            {error && (
              <div className="mb-4 bg-red-50 border-r-4 border-red-500 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mr-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-50 border-r-4 border-green-500 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mr-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="current-password" className="block text-sm font-bold text-gray-700 mb-2">
                  رمز عبور فعلی
                </label>
                <input
                  id="current-password"
                  name="current-password"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="رمز عبور فعلی خود را وارد کنید"
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-bold text-gray-700 mb-2">
                  رمز عبور جدید
                </label>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="رمز عبور جدید"
                />
                <p className="mt-2 text-xs text-gray-500">
                  حداقل ۸ کاراکتر، شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص
                </p>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-bold text-gray-700 mb-2">
                  تکرار رمز عبور جدید
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="رمز عبور جدید را دوباره وارد کنید"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  ← بازگشت
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:from-teal-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      در حال تغییر...
                    </>
                  ) : (
                    'تغییر رمز عبور'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-blue-900 mb-2">💡 نکات امنیتی:</h3>
          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
            <li>از رمز عبورهای ساده و قابل حدس اجتناب کنید</li>
            <li>رمز عبور خود را با کسی به اشتراک نگذارید</li>
            <li>هر ۳ ماه یکبار رمز عبور را تغییر دهید</li>
            <li>از رمز عبور یکسان در سایت‌های مختلف استفاده نکنید</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
