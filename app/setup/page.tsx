export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">
              🚀 راه‌اندازی اولیه سیستم
            </h1>
            <p className="text-teal-100 text-center mt-2">
              سیستم مدیریت کسب و کار افق روشن پرند
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-yellow-50 border-r-4 border-yellow-500 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="mr-3">
                  <h3 className="text-lg font-bold text-yellow-800">توجه مهم!</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    این صفحه فقط برای راه‌اندازی اولیه است. بعد از تکمیل مراحل، این صفحه را حذف کنید.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="bg-teal-100 text-teal-600 w-8 h-8 rounded-full flex items-center justify-center ml-3">1</span>
                دسترسی به دیتابیس PostgreSQL
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">از پنل Liara، به دیتابیس PostgreSQL خود متصل شوید:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>وارد پنل Liara شوید</li>
                  <li>روی دیتابیس <code className="bg-gray-200 px-2 py-1 rounded">samanehparand</code> کلیک کنید</li>
                  <li>از قسمت &quot;دسترسی از راه دور&quot; یا &quot;Console&quot; استفاده کنید</li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="bg-teal-100 text-teal-600 w-8 h-8 rounded-full flex items-center justify-center ml-3">2</span>
                دریافت SQL Migrations
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">فایل SQL شامل تمام جداول و کاربر مدیر:</p>
                <a 
                  href="/api/migrations-sql"
                  target="_blank"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl"
                >
                  📥 دانلود فایل SQL
                </a>
                <p className="text-sm text-gray-500 mt-3">
                  این فایل شامل تمام migrations و ساخت کاربر مدیر است.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="bg-teal-100 text-teal-600 w-8 h-8 rounded-full flex items-center justify-center ml-3">3</span>
                اجرای SQL در دیتابیس
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">محتوای فایل SQL را در Console دیتابیس اجرا کنید:</p>
                <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>psql -U root -d postgres -h samanehparand.iran.liara.ir -p 5432 -f migrations.sql</pre>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  یا محتوای فایل را کپی کرده و در SQL Editor پنل Liara paste کنید.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center ml-3">✓</span>
                ورود به سیستم
              </h2>
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="font-bold text-green-800 mb-3">اطلاعات ورود:</h3>
                <div className="space-y-2 bg-white p-4 rounded border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ایمیل:</span>
                    <code className="bg-gray-100 px-3 py-1 rounded font-mono">admin@parand.com</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">رمز عبور:</span>
                    <code className="bg-gray-100 px-3 py-1 rounded font-mono">Admin@2026!Parand</code>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <a 
                    href="/login"
                    className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold text-center hover:from-teal-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    🔑 ورود به سیستم
                  </a>
                  <a 
                    href="/change-password"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold text-center transition-all shadow-lg hover:shadow-xl"
                  >
                    🔐 تغییر رمز عبور
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🔒</span>
                </div>
                <div className="mr-3">
                  <h3 className="text-lg font-bold text-red-800">نکات امنیتی</h3>
                  <ul className="text-sm text-red-700 mt-2 space-y-1 list-disc list-inside">
                    <li>بعد از ورود، حتماً رمز عبور را تغییر دهید</li>
                    <li>این صفحه setup را بعد از راه‌اندازی حذف کنید</li>
                    <li>از رمز عبور قوی استفاده کنید</li>
                    <li>کاربران جدید را از بخش &quot;کاربران&quot; اضافه کنید</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>© ۲۰۲۶ افق روشن پرند - سیستم مدیریت کسب و کار</p>
        </div>
      </div>
    </div>
  )
}
