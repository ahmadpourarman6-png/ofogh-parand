'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  const validatePassword = (password: string) => {
    const errors: string[] = []
    if (password.length < 8) errors.push('حداقل ۸ کاراکتر')
    if (!/[a-z]/.test(password)) errors.push('حروف کوچک انگلیسی')
    if (!/[A-Z]/.test(password)) errors.push('حروف بزرگ انگلیسی')
    if (!/[0-9]/.test(password)) errors.push('اعداد')
    if (!/[^a-zA-Z0-9]/.test(password)) errors.push('کاراکتر خاص (@#$%)')
    setPasswordErrors(errors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن یکسان نیستند')
      return
    }

    if (passwordErrors.length > 0) {
      setError('رمز عبور الزامات امنیتی را ندارد')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/login?registered=true')
      } else {
        setError(data.error || 'خطا در ثبت‌نام')
      }
    } catch (error) {
      setError('خطایی رخ داده است')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/logo.svg" alt="Logo" className="w-16 h-16" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              ثبت‌نام در سیستم
            </h2>
            <p className="text-cyan-100">
              افق روشن پرند
            </p>
          </div>

          <div className="px-8 py-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-r-4 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                  <p className="font-medium">{error}</p>
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  نام و نام خانوادگی
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full pr-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="نام کامل خود را وارد کنید"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  ایمیل
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pr-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                  رمز عبور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      validatePassword(e.target.value)
                    }}
                    className="block w-full pr-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="رمز عبور قوی وارد کنید"
                  />
                </div>
                {formData.password && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-bold text-gray-700 mb-2">الزامات رمز عبور:</p>
                    <div className="space-y-1">
                      <div className={`text-xs flex items-center ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                        {formData.password.length >= 8 ? '✓' : '○'} حداقل ۸ کاراکتر
                      </div>
                      <div className={`text-xs flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                        {/[a-z]/.test(formData.password) ? '✓' : '○'} حروف کوچک (a-z)
                      </div>
                      <div className={`text-xs flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                        {/[A-Z]/.test(formData.password) ? '✓' : '○'} حروف بزرگ (A-Z)
                      </div>
                      <div className={`text-xs flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                        {/[0-9]/.test(formData.password) ? '✓' : '○'} اعداد (0-9)
                      </div>
                      <div className={`text-xs flex items-center ${/[^a-zA-Z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                        {/[^a-zA-Z0-9]/.test(formData.password) ? '✓' : '○'} کاراکتر خاص (@#$%)
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                  تکرار رمز عبور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="block w-full pr-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    placeholder="رمز عبور را مجددا وارد کنید"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      در حال ثبت‌نام...
                    </>
                  ) : (
                    'ثبت‌نام'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <Link href="/login" className="text-cyan-600 hover:text-cyan-700 font-medium">
                  وارد شوید
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white text-sm">
            © ۲۰۲۶ افق روشن پرند. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </div>
  )
}
