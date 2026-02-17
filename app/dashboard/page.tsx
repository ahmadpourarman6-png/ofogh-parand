import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // اگر کاربر ADMIN نیست، فقط پیام خوش‌آمدگویی نمایش داده شود
  if (session.user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mt-20">
            <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <span className="text-white text-6xl font-bold">
                {session.user.name?.charAt(0)}
              </span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              خوش آمدید {session.user.name}! 👋
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              حساب کاربری شما با موفقیت ایجاد شده است
            </p>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className="flex items-start space-x-4 space-x-reverse mb-6">
                <div className="bg-teal-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">در حال حاضر دسترسی محدود دارید</h3>
                  <p className="text-gray-600 leading-relaxed">
                    حساب کاربری شما ایجاد شده اما هنوز دسترسی‌های لازم به شما اختصاص داده نشده است.
                    لطفاً با مدیر سیستم تماس بگیرید تا دسترسی‌های موردنیاز را برای شما فعال کنند.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                <h4 className="font-bold text-gray-900 mb-3">اطلاعات حساب کاربری:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">نام:</span>
                    <span className="font-medium text-gray-900">{session.user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ایمیل:</span>
                    <span className="font-medium text-gray-900">{session.user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">نقش:</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">کاربر</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            داشبورد
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            خوش آمدید {session.user.name} 👋
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">فاکتورهای امروز</p>
                <p className="text-4xl font-bold mt-2">۰</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">قراردادهای فعال</p>
                <p className="text-4xl font-bold mt-2">۰</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">فروش ماه جاری</p>
                <p className="text-4xl font-bold mt-2">۰</p>
                <p className="text-xs text-yellow-100 mt-1">تومان</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">کاربران فعال</p>
                <p className="text-4xl font-bold mt-2">۳</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-xl font-bold text-white">آخرین فاکتورها</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-lg mb-4">هنوز فاکتوری ثبت نشده است</p>
                <Link
                  href="/invoices"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  مشاهده فاکتورها ←
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
              <h2 className="text-xl font-bold text-white">فعالیت‌های اخیر</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-lg mb-4">هیچ فعالیتی ثبت نشده است</p>
                <Link
                  href="/dashboard"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  شروع کنید ←
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
