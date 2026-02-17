import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-2xl font-semibold text-gray-700 mt-4">
            صفحه مورد نظر یافت نشد
          </p>
          <p className="text-gray-500 mt-2">
            متأسفانه صفحه‌ای که دنبال آن هستید وجود ندارد
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 space-x-reverse">
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link
            href="/dashboard"
            className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-all hover:bg-gray-50"
          >
            رفتن به داشبورد
          </Link>
        </div>
      </div>
    </div>
  )
}
