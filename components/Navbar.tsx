'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 space-x-reverse">
              <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
              <span className="text-xl font-bold text-white">افق روشن پرند</span>
            </Link>
            {session && (
              <div className="mr-10 flex items-center space-x-2 space-x-reverse">
                <Link
                  href="/dashboard"
                  className={`${
                    isActive('/dashboard')
                      ? 'bg-white text-teal-600'
                      : 'text-white hover:bg-white/10'
                  } px-4 py-2 rounded-lg text-sm font-medium transition-all`}
                >
                  🏠 داشبورد
                </Link>
                {session.user.role === 'ADMIN' && (
                  <>
                    <Link
                      href="/invoices"
                      className={`${
                        isActive('/invoices')
                          ? 'bg-white text-blue-600'
                          : 'text-white hover:bg-white/10'
                      } px-4 py-2 rounded-lg text-sm font-medium transition-all`}
                    >
                      📄 فاکتورها
                    </Link>
                    <Link
                      href="/contracts"
                      className={`${
                        isActive('/contracts')
                          ? 'bg-white text-blue-600'
                          : 'text-white hover:bg-white/10'
                      } px-4 py-2 rounded-lg text-sm font-medium transition-all`}
                    >
                      💼 قراردادها
                    </Link>
                    <Link
                      href="/users"
                      className={`${
                        isActive('/users')
                          ? 'bg-white text-blue-600'
                          : 'text-white hover:bg-white/10'
                      } px-4 py-2 rounded-lg text-sm font-medium transition-all`}
                    >
                      👥 کاربران
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex items-center space-x-2 space-x-reverse bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-bold text-sm">
                      {session.user.name?.charAt(0)}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium">{session.user.name}</span>
                </div>
                <Link
                  href="/change-password"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl"
                >
                  🔐 تغییر رمز
                </Link>
                <button
                  onClick={() => {
                    signOut({ redirect: false }).then(() => {
                      window.location.href = '/login'
                    })
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl"
                >
                  🚪 خروج
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-white text-teal-600 hover:bg-teal-50 px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl"
              >
                🔑 ورود
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
