'use client'

import { useEffect } from 'react'

interface InvoiceItem {
  id: string
  productName: string
  description: string | null
  quantity: number
  unitPrice: number
}

interface Invoice {
  id: string
  invoiceNo: string
  customerId: string
  customerName: string
  totalAmount: number
  taxAmount: number | null
  discount: number | null
  issueDate: Date
  dueDate: Date | null
  notes: string | null
  items: InvoiceItem[]
  createdBy: {
    name: string
    email: string
  }
}

export default function PrintInvoice({ invoice }: { invoice: Invoice }) {
  useEffect(() => {
    // چاپ خودکار بعد از لود شدن صفحه
    const timer = setTimeout(() => {
      window.print()
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * Number(item.unitPrice)), 0)
  const total = subtotal + Number(invoice.taxAmount) - Number(invoice.discount)

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
          .print-container {
            width: 210mm;
            min-height: 297mm;
            padding: 0;
            margin: 0;
          }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>

      <div className="print-container min-h-screen bg-white p-8" dir="rtl">
        {/* سربرگ شرکت */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg mb-4 shadow-lg print:rounded-none">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <img src="/logo.svg" alt="Logo" className="w-16 h-16 bg-white p-2 rounded-lg" />
              <div>
                <h1 className="text-3xl font-bold mb-1">شرکت توسعه فناوری افق روشن پرند</h1>
                <p className="text-lg opacity-90">Ofogh Roshan Parand Technology Development</p>
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs opacity-90">
            <p>📍 آدرس: تبریز - ولیعصر - برج تجارت جهانی - طبقه ۱۹ واحد ۹ | 📞 تلفن: ۹۹۹۲۵۵۵۶-۰۴۱</p>
          </div>
        </div>

        {/* اطلاعات فاکتور */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h2 className="text-base font-bold text-blue-900 mb-2 border-b-2 border-blue-300 pb-1">
              اطلاعات مشتری
            </h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">نام مشتری:</span>
                <span className="text-gray-900">{invoice.customerName}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">کد مشتری:</span>
                <span className="text-gray-900">{invoice.customerId}</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg">
            <h2 className="text-base font-bold text-purple-900 mb-2 border-b-2 border-purple-300 pb-1">
              اطلاعات فاکتور
            </h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">شماره فاکتور:</span>
                <span className="text-gray-900 font-bold">{invoice.invoiceNo}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">تاریخ صدور:</span>
                <span className="text-gray-900">{new Date(invoice.issueDate).toLocaleDateString('fa-IR')}</span>
              </div>
              {invoice.dueDate && (
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">سررسید:</span>
                  <span className="text-gray-900">{new Date(invoice.dueDate).toLocaleDateString('fa-IR')}</span>
                </div>
              )}
              <div className="flex">
                <span className="font-semibold text-gray-700 w-32">صادرکننده:</span>
                <span className="text-gray-900">{invoice.createdBy.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* جدول آیتم‌ها */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">اقلام فاکتور</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <th className="border border-blue-400 p-2 text-center w-12 text-sm">ردیف</th>
                <th className="border border-blue-400 p-2 text-right text-sm">شرح کالا / خدمات</th>
                <th className="border border-blue-400 p-2 text-center w-20 text-sm">تعداد</th>
                <th className="border border-blue-400 p-2 text-center w-28 text-sm">قیمت واحد</th>
                <th className="border border-blue-400 p-2 text-center w-28 text-sm">مبلغ کل</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 p-2 text-center font-medium text-sm">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="font-semibold text-gray-900">{item.productName}</div>
                    {item.description && (
                      <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 text-center text-sm">{item.quantity.toLocaleString('fa-IR')}</td>
                  <td className="border border-gray-300 p-2 text-left text-sm">
                    {Number(item.unitPrice).toLocaleString('fa-IR')} ریال
                  </td>
                  <td className="border border-gray-300 p-2 text-left font-semibold text-sm">
                    {(item.quantity * Number(item.unitPrice)).toLocaleString('fa-IR')} ریال
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* محاسبات نهایی */}
        <div className="flex justify-end mb-4">
          <div className="w-80 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-200">
            <div className="space-y-3">
              <div className="flex justify-between pb-2">
                <span className="text-gray-700 font-medium">جمع کل:</span>
                <span className="font-bold text-lg">{subtotal.toLocaleString('fa-IR')} ریال</span>
              </div>
              
              {invoice.taxAmount && invoice.taxAmount > 0 && (
                <div className="flex justify-between pb-2 border-t pt-2">
                  <span className="text-gray-700 font-medium">مالیات و عوارض:</span>
                  <span className="font-semibold text-green-600">
                    {Number(invoice.taxAmount).toLocaleString('fa-IR')} ریال
                  </span>
                </div>
              )}
              
              {invoice.discount && invoice.discount > 0 && (
                <div className="flex justify-between pb-2">
                  <span className="text-gray-700 font-medium">تخفیف:</span>
                  <span className="font-semibold text-red-600">
                    {Number(invoice.discount).toLocaleString('fa-IR')} ریال
                  </span>
                </div>
              )}
              
              <div className="flex justify-between pt-3 border-t-2 border-blue-400">
                <span className="text-gray-900 font-bold text-lg">مبلغ قابل پرداخت:</span>
                <span className="font-bold text-2xl text-blue-600">
                  {total.toLocaleString('fa-IR')} ریال
                </span>
              </div>
              
              <div className="bg-blue-100 p-3 rounded text-center mt-2">
                <span className="text-sm text-blue-900 font-medium">
                  {new Intl.NumberFormat('fa-IR', { 
                    style: 'decimal',
                    useGrouping: false 
                  }).format(total)} ریال
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* یادداشت‌ها */}
        {invoice.notes && (
          <div className="mb-4 bg-yellow-50 p-3 rounded-lg border-r-4 border-yellow-400">
            <h3 className="font-bold text-gray-900 mb-2">یادداشت:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{invoice.notes}</p>
          </div>
        )}

        {/* شرایط و امضا */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">شرایط و ضوابط:</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• فاکتور پس از صدور قابل برگشت نمی‌باشد</li>
              <li>• مهلت پرداخت حداکثر ۳۰ روز از تاریخ صدور می‌باشد</li>
              <li>• هرگونه اختلاف از طریق مراجع قانونی حل خواهد شد</li>
            </ul>
          </div>

          <div className="border-2 border-dashed border-gray-300 p-3 rounded-lg">
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-2">مهر و امضا فروشنده</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-2">مهر و امضا خریدار</p>
            </div>
          </div>
        </div>

        {/* فوتر */}
        <div className="mt-6 pt-3 border-t-2 border-gray-200 text-center text-xs text-gray-600">
          <p className="mb-1">این فاکتور توسط سیستم مدیریت کسب و کار شرکت توسعه فناوری افق روشن پرند صادر شده است</p>
          <p>📍 تبریز - ولیعصر - برج تجارت جهانی - طبقه ۱۹ واحد ۹ | 📞 ۹۹۹۲۵۵۵۶-۰۴۱</p>
        </div>

        {/* دکمه بازگشت فقط در حالت غیر چاپ */}
        <div className="no-print mt-8 text-center">
          <button
            onClick={() => window.close()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </>
  )
}
