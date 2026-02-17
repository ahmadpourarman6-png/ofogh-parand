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
  position: string | null
  salary: number | null
  salaryType: string | null
  commission: number | null
  startDate: Date
  endDate: Date | null
  status: string
  terms: string
  notes: string | null
  createdAt: Date
}

export default function PrintEmploymentContract({ contract }: { contract: Contract }) {
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
          قرارداد استخدام پرسنل
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
            <strong>الف) کارفرما:</strong> شرکت توسعه فناوری افق روشن پرند
          </p>
          <p className="text-xs">
            <strong>شناسه ملی:</strong> ۱۴۰۱۵۰۰۷۱۶۹
          </p>
          <p className="text-xs">
            <strong>آدرس:</strong> تبریز، ولیعصر، برج تجارت جهانی، طبقه ۱۹، واحد ۹
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded space-y-1">
          <p>
            <strong>ب) کارمند:</strong> {contract.partyName} به شماره ملی {contract.partyId}
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

        <h3 className="font-bold text-gray-900 mt-4">ماده ۱ - موضوع قرارداد</h3>
        <p className="text-justify">
          کارفرما، کارمند را به عنوان <strong>{contract.position}</strong> استخدام می‌نماید. کارمند موظف
          است وظایف محوله را با حسن نیت و دقت کامل انجام دهد و از دستورات و مقررات شرکت تبعیت نماید.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۲ - مدت قرارداد</h3>
        <p className="text-justify">
          این قرارداد از تاریخ <strong>{formatPersianDate(contract.startDate)}</strong>{' '}
          {contract.endDate
            ? `به مدت معین تا تاریخ ${formatPersianDate(contract.endDate)}`
            : 'به صورت نامعین'}{' '}
          منعقد می‌گردد.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۳ - حقوق و مزایا</h3>
        {contract.salaryType === 'COMMISSION' ? (
          <p className="text-justify">
            حقوق کارمند به صورت پورسانتی بوده و{' '}
            <strong>{contract.commission?.toLocaleString('fa-IR')}٪ از فروش یا درآمد</strong>{' '}
            را دریافت خواهد کرد. پرداخت پورسانت به صورت ماهانه بر اساس عملکرد واقعی محاسبه و به حساب وی واریز می‌گردد.
          </p>
        ) : contract.salaryType === 'MIXED' ? (
          <p className="text-justify">
            حقوق کارمند به صورت ترکیبی (حقوق ثابت + پورسانت) بوده و شامل مبلغ{' '}
            <strong>{contract.salary?.toLocaleString('fa-IR')} ریال حقوق پایه</strong>{' '}
            به علاوه{' '}
            <strong>{contract.commission?.toLocaleString('fa-IR')}٪ پورسانت از فروش</strong>{' '}
            می‌باشد. حقوق پایه به صورت ماهانه و پورسانت بر اساس عملکرد واقعی محاسبه و به حساب وی واریز خواهد شد.
          </p>
        ) : (
          <p className="text-justify">
            حقوق ماهانه کارمند مبلغ{' '}
            <strong>{contract.salary?.toLocaleString('fa-IR')} ریال</strong>{' '}
            می‌باشد که در پایان هر ماه به حساب وی واریز می‌گردد.
          </p>
        )}
        <p className="text-justify mt-2">
          علاوه بر این، کارمند از مزایای زیر بهره‌مند خواهد شد:
        </p>
        <ul className="list-disc list-inside space-y-1 mr-4">
          <li>بیمه تامین اجتماعی طبق قانون کار</li>
          <li>حق بیمه بیکاری</li>
          <li>عیدی و پاداش سالانه</li>
          <li>مرخصی استحقاقی ۲۶ روز در سال</li>
        </ul>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۴ - ساعت کار</h3>
        <p className="text-justify">
          ساعات کاری روزانه ۸ ساعت و هفتگی ۴۴ ساعت می‌باشد. روزهای کاری از شنبه تا چهارشنبه بوده و پنج‌شنبه
          و جمعه تعطیل رسمی می‌باشد. ساعات اضافه کاری طبق قانون کار محاسبه و پرداخت خواهد شد.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۵ - وظایف و مسئولیت‌های کارمند</h3>
        <ul className="list-disc list-inside space-y-1 mr-4">
          <li>انجام وظایف محوله با دقت و مسئولیت‌پذیری</li>
          <li>رعایت مقررات و ضوابط داخلی شرکت</li>
          <li>حفظ اسرار و اطلاعات محرمانه شرکت</li>
          <li>رعایت اصول اخلاق حرفه‌ای</li>
          <li>همکاری با سایر کارکنان و مدیریت</li>
        </ul>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۶ - محرمانگی اطلاعات</h3>
        <p className="text-justify">
          کارمند متعهد می‌شود کلیه اطلاعات، اسناد، مستندات، و اسرار تجاری شرکت را به طور کامل محرمانه تلقی
          نموده و حتی پس از پایان همکاری نیز، آن‌ها را در اختیار اشخاص ثالث قرار ندهد. نقض این ماده موجب
          مسئولیت کیفری و حقوقی کارمند خواهد بود.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۷ - عدم رقابت</h3>
        <p className="text-justify">
          کارمند متعهد می‌شود در طول مدت همکاری و یک سال پس از پایان آن، در هیچ شرکت یا موسسه رقیبی که فعالیت
          مشابه با کارفرما داشته باشد، کار نکند و از ایجاد رقابت مستقیم یا غیرمستقیم خودداری نماید.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۸ - فسخ قرارداد</h3>
        <p className="text-justify">
          هر یک از طرفین می‌توانند با اطلاع کتبی یک ماهه به طرف مقابل، قرارداد را فسخ نمایند. در صورت تخلف
          از تعهدات قراردادی، طرف ذی‌نفع می‌تواند بدون اطلاع قبلی، قرارداد را فسخ کند.
        </p>

        {contract.terms && (
          <>
            <h3 className="font-bold text-gray-900 mt-4">سایر شرایط</h3>
            <div className="text-justify whitespace-pre-line bg-gray-50 p-3 rounded text-xs">
              {contract.terms}
            </div>
          </>
        )}

        <h3 className="font-bold text-gray-900 mt-4">ماده ۹ - حل اختلاف</h3>
        <p className="text-justify">
          در صورت بروز هرگونه اختلاف، ابتدا از طریق مذاکره حل و فصل خواهد شد. در غیر این صورت، اختلافات در
          هیات حل اختلاف کارگری و مراجع قضایی صالحه شهرستان تبریز رسیدگی خواهد شد.
        </p>

        <p className="text-justify mt-4">
          این قرارداد در دو نسخه که هر دو دارای اعتبار یکسان می‌باشد، تنظیم و امضا و مبادله گردید.
        </p>
      </div>

      {/* امضاها */}
      <div className="grid grid-cols-2 gap-8 mt-8 text-sm">
        <div className="text-center">
          <p className="font-bold mb-1">کارفرما</p>
          <p className="text-xs text-gray-600 mb-8">شرکت توسعه فناوری افق روشن پرند</p>
          <div className="border-t border-gray-300 pt-1">
            <p className="text-xs text-gray-500">امضا و مهر</p>
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold mb-1">کارمند</p>
          <p className="text-xs text-gray-600 mb-8">{contract.partyName}</p>
          <div className="border-t border-gray-300 pt-1">
            <p className="text-xs text-gray-500">امضا و اثر انگشت</p>
          </div>
        </div>
      </div>
    </div>
  )
}
