'use client'

import moment from 'jalali-moment'

interface Contract {
  id: string
  contractNo: string
  contractType: string
  partyName: string
  partyId: string
  partyAddress: string | null
  partyPhone: string | null
  projectTitle: string | null
  projectAmount: number | null
  deliveryDays: number | null
  supportMonths: number | null
  paymentTerms: string | null
  startDate: Date
  endDate: Date | null
  status: string
  terms: string
  notes: string | null
  createdAt: Date
}

export default function PrintProjectContract({ contract }: { contract: Contract }) {
  const formatPersianDate = (date: Date) => {
    return moment(date).locale('fa').format('jYYYY/jMM/jDD')
  }

  return (
    <div className="max-w-[21cm] mx-auto bg-white" dir="rtl">
      <div className="no-print mb-4 text-center">
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          چاپ قرارداد
        </button>
      </div>

      {/* سربرگ */}
      <div className="border-b-4 border-green-600 pb-3 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              شرکت توسعه فناوری افق روشن پرند
            </h1>
            <div className="text-xs text-gray-600 space-y-0.5">
              <p>شناسه ملی: ۱۴۰۱۵۰۰۷۱۶۹ | شماره ثبت: ۶۳۰۳۷</p>
              <p>آدرس: تبریز، ولیعصر، برج تجارت جهانی، طبقه ۱۹، واحد ۹</p>
              <p>تلفن: ۹۹۹۲۵۵۵۶-۰۴۱</p>
            </div>
          </div>
          <img src="/logo.svg" alt="Logo" className="w-16 h-16" />
        </div>
      </div>

      {/* عنوان قرارداد */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          قرارداد انجام خدمات طراحی و توسعه نرم‌افزار
        </h2>
        <p className="text-sm text-gray-600 mt-1">شماره قرارداد: {contract.contractNo}</p>
      </div>

      {/* متن قرارداد */}
      <div className="text-sm leading-relaxed space-y-3">
        <p className="text-justify">
          این قرارداد در تاریخ{' '}
          <strong>{formatPersianDate(contract.startDate)}</strong> بین طرفین ذیل منعقد می‌گردد:
        </p>

        <div className="bg-gray-50 p-3 rounded space-y-1">
          <p>
            <strong>الف) کارفرما:</strong> {contract.partyName} به شناسه ملی/ملی {contract.partyId}
          </p>
          {contract.partyAddress && (
            <p className="text-xs">
              <strong>آدرس:</strong> {contract.partyAddress}
            </p>
          )}
          {contract.partyPhone && (
            <p className="text-xs">
              <strong>تلفن:</strong> {contract.partyPhone}
            </p>
          )}
        </div>

        <div className="bg-gray-50 p-3 rounded space-y-1">
          <p>
            <strong>ب) پیمانکار:</strong> شرکت توسعه فناوری افق روشن پرند
          </p>
          <p className="text-xs">
            <strong>شناسه ملی:</strong> ۱۴۰۱۵۰۰۷۱۶۹
          </p>
          <p className="text-xs">
            <strong>آدرس:</strong> تبریز، ولیعصر، برج تجارت جهانی، طبقه ۱۹، واحد ۹
          </p>
        </div>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۱ - موضوع قرارداد</h3>
        <p className="text-justify">
          پیمانکار متعهد می‌شود پروژه «<strong>{contract.projectTitle}</strong>» را طبق مشخصات فنی و الزامات
          مورد توافق، طراحی و توسعه داده و در مدت{' '}
          <strong>{contract.deliveryDays} روز کاری</strong> از تاریخ انعقاد قرارداد به کارفرما تحویل نماید.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۲ - مبلغ قرارداد</h3>
        <p className="text-justify">
          مبلغ کل این قرارداد{' '}
          <strong>
            {contract.projectAmount?.toLocaleString('fa-IR')} ریال
          </strong>{' '}
          می‌باشد که به شرح ذیل پرداخت می‌گردد:
        </p>
        {contract.paymentTerms && (
          <div className="bg-blue-50 p-3 rounded text-sm">
            {contract.paymentTerms}
          </div>
        )}

        <h3 className="font-bold text-gray-900 mt-4">ماده ۳ - تعهدات پیمانکار</h3>
        <ul className="list-disc list-inside space-y-1 mr-4">
          <li>انجام طراحی و توسعه نرم‌افزار با رعایت استانداردهای فنی</li>
          <li>تحویل کدهای منبع و مستندات فنی به کارفرما</li>
          <li>آموزش کاربران جهت استفاده از نرم‌افزار</li>
          {contract.supportMonths && contract.supportMonths > 0 && (
            <li>ارائه پشتیبانی فنی به مدت {contract.supportMonths} ماه پس از تحویل</li>
          )}
        </ul>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۴ - تعهدات کارفرما</h3>
        <ul className="list-disc list-inside space-y-1 mr-4">
          <li>پرداخت به موقع اقساط قرارداد</li>
          <li>تامین دسترسی‌های لازم (سرور، دامنه، و غیره)</li>
          <li>همکاری در تست و بررسی نرم‌افزار</li>
          <li>ارائه اطلاعات و مستندات مورد نیاز</li>
        </ul>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۵ - مالکیت معنوی</h3>
        <p className="text-justify">
          کلیه حقوق مالکیت معنوی نرم‌افزار پس از تسویه کامل مبلغ قرارداد، متعلق به کارفرما خواهد بود.
          پیمانکار موظف است کلیه کدهای منبع و مستندات را در اختیار کارفرما قرار دهد.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۶ - محرمانگی</h3>
        <p className="text-justify">
          هر یک از طرفین متعهد می‌شوند که اطلاعات محرمانه طرف مقابل را حفظ نموده و بدون اجازه کتبی، آن را
          در اختیار شخص ثالث قرار ندهند. این تعهد حتی پس از پایان قرارداد نیز لازم‌الاجرا می‌باشد.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۷ - فسخ قرارداد</h3>
        <p className="text-justify">
          در صورت تخلف هر یک از طرفین از تعهدات قراردادی و عدم رفع نقص پس از اخطار کتبی در مدت ۱۰ روز، طرف
          دیگر می‌تواند قرارداد را فسخ نماید.
        </p>

        {contract.terms && (
          <>
            <h3 className="font-bold text-gray-900 mt-4">سایر شرایط</h3>
            <div className="text-justify whitespace-pre-line bg-gray-50 p-3 rounded text-xs">
              {contract.terms}
            </div>
          </>
        )}

        <h3 className="font-bold text-gray-900 mt-4">ماده ۸ - حل اختلاف</h3>
        <p className="text-justify">
          در صورت بروز هرگونه اختلاف، ابتدا از طریق مذاکره حل و فصل خواهد شد. در غیر این صورت، مراجع قضایی
          شهرستان تبریز صالح به رسیدگی می‌باشند.
        </p>

        <p className="text-justify mt-4">
          این قرارداد در {contract.endDate ? `مدت معین تا تاریخ ${formatPersianDate(contract.endDate)}` : 'مدت نامعین'}{' '}
          تنظیم و در دو نسخه که هر دو دارای اعتبار یکسان می‌باشد، امضا و مبادله گردید.
        </p>
      </div>

      {/* امضاها */}
      <div className="grid grid-cols-2 gap-8 mt-8 text-sm">
        <div className="text-center">
          <p className="font-bold mb-1">کارفرما</p>
          <p className="text-xs text-gray-600 mb-8">{contract.partyName}</p>
          <div className="border-t border-gray-300 pt-1">
            <p className="text-xs text-gray-500">امضا و مهر</p>
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold mb-1">پیمانکار</p>
          <p className="text-xs text-gray-600 mb-8">شرکت توسعه فناوری افق روشن پرند</p>
          <div className="border-t border-gray-300 pt-1">
            <p className="text-xs text-gray-500">امضا و مهر</p>
          </div>
        </div>
      </div>
    </div>
  )
}
