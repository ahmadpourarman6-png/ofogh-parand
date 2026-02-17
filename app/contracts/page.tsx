import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import moment from 'jalali-moment'

const contractTypeLabels = {
  PROJECT: 'قرارداد پروژه',
  EMPLOYMENT: 'قرارداد استخدام',
  NDA: 'قرارداد محرمانگی',
}

const contractTypeColors = {
  PROJECT: 'bg-blue-100 text-blue-800',
  EMPLOYMENT: 'bg-green-100 text-green-800',
  NDA: 'bg-red-100 text-red-800',
}

export default async function ContractsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const contracts = await prisma.contract.findMany({
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">مدیریت قراردادها</h1>
            <p className="mt-2 text-gray-600">ایجاد و مدیریت قراردادها (پروژه، استخدام، محرمانگی)</p>
          </div>
          <Link
            href="/contracts/new"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
          >
            + قرارداد جدید
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-green-600 to-teal-600">
                <tr>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                    شماره
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                    نوع قرارداد
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                    طرف قرارداد
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                    جزئیات
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                    تاریخ شروع
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                    وضعیت
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contracts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 text-lg mb-4">هنوز قراردادی ثبت نشده است</p>
                        <Link
                          href="/contracts/new"
                          className="text-green-600 hover:text-green-700 font-medium"
                        >
                          اولین قرارداد را ایجاد کنید →
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  contracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{contract.contractNo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${contractTypeColors[contract.contractType as keyof typeof contractTypeColors]}`}>
                          {contractTypeLabels[contract.contractType as keyof typeof contractTypeLabels]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contract.partyName}</div>
                        <div className="text-xs text-gray-500">{contract.partyId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contract.contractType === 'EMPLOYMENT' && (
                          <div className="text-sm text-gray-700">
                            <div>{contract.position}</div>
                            <div className="text-xs text-green-600 font-semibold">
                              {Number(contract.salary).toLocaleString('fa-IR')} ریال
                            </div>
                          </div>
                        )}
                        {contract.contractType === 'PROJECT' && (
                          <div className="text-sm text-gray-700">
                            <div className="truncate max-w-xs">{contract.projectTitle}</div>
                            <div className="text-xs text-blue-600 font-semibold">
                              {Number(contract.projectAmount).toLocaleString('fa-IR')} ریال
                            </div>
                          </div>
                        )}
                        {contract.contractType === 'NDA' && (
                          <div className="text-xs text-gray-500">قرارداد محرمانگی</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {moment(contract.startDate).locale('fa').format('jYYYY/jMM/jDD')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {contract.status === 'ACTIVE' ? 'فعال' : contract.status === 'EXPIRED' ? 'منقضی' : 'تمدید شده'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2 space-x-reverse">
                        <Link
                          href={`/contracts/${contract.id}/print`}
                          target="_blank"
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors inline-block"
                        >
                          چاپ
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
