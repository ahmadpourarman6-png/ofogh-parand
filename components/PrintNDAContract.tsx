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
  startDate: Date
  endDate: Date | null
  status: string
  terms: string
  notes: string | null
  createdAt: Date
}

export default function PrintNDAContract({ contract }: { contract: Contract }) {
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
          قرارداد محرمانگی اطلاعات (NDA)
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
            <strong>الف) طرف اول (افشاکننده اطلاعات):</strong> شرکت توسعه فناوری افق روشن پرند
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
            <strong>ب) طرف دوم (دریافت‌کننده اطلاعات):</strong> {contract.partyName} به شناسه
            ملی/ملی {contract.partyId}
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

        <h3 className="font-bold text-gray-900 mt-4">ماده ۱ - تعاریف</h3>
        <p className="text-justify">
          «اطلاعات محرمانه» به معنای هرگونه اطلاعات، داده‌ها، مستندات، نرم‌افزارها، کدهای منبع، طرح‌های
          تجاری، اسرار تجاری، اطلاعات مشتریان، روش‌های کاری، فناوری‌ها، و هر اطلاعات دیگری است که به صورت
          شفاهی، کتبی، الکترونیکی یا هر شکل دیگری توسط طرف اول در اختیار طرف دوم قرار می‌گیرد.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۲ - تعهد محرمانگی</h3>
        <p className="text-justify">
          طرف دوم متعهد می‌شود که:
        </p>
        <ul className="list-disc list-inside space-y-1 mr-4">
          <li>کلیه اطلاعات محرمانه دریافتی را به طور کامل محرمانه نگه دارد</li>
          <li>از اطلاعات محرمانه تنها برای اهداف مورد توافق استفاده نماید</li>
          <li>اطلاعات محرمانه را بدون اجازه کتبی طرف اول، در اختیار شخص ثالث قرار ندهد</li>
          <li>از اطلاعات محرمانه در جهت منافع شخصی یا رقیب طرف اول استفاده ننماید</li>
          <li>حداکثر تلاش را برای حفاظت از اطلاعات محرمانه به عمل آورد</li>
        </ul>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۳ - استثناها</h3>
        <p className="text-justify">
          تعهدات محرمانگی این قرارداد شامل اطلاعاتی نمی‌شود که:
        </p>
        <ul className="list-disc list-inside space-y-1 mr-4">
          <li>در زمان افشا، عمومی و در دسترس همگان بوده است</li>
          <li>پس از افشا، بدون تقصیر طرف دوم، عمومی شده باشد</li>
          <li>قبل از افشا، به طور قانونی در اختیار طرف دوم بوده است</li>
          <li>طرف دوم به طور مستقل و بدون استفاده از اطلاعات محرمانه آن را توسعه داده باشد</li>
          <li>افشای آن به موجب قانون یا دستور مقامات قضایی الزامی باشد</li>
        </ul>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۴ - محدودیت استفاده</h3>
        <p className="text-justify">
          طرف دوم تنها مجاز به استفاده از اطلاعات محرمانه برای اهداف تعیین شده در این قرارداد می‌باشد و
          نمی‌تواند از این اطلاعات برای اهداف دیگر، از جمله توسعه محصولات رقیب یا ارائه خدمات مشابه به دیگران
          استفاده نماید.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۵ - بازگشت اطلاعات</h3>
        <p className="text-justify">
          در صورت درخواست طرف اول یا پایان همکاری، طرف دوم موظف است فوراً کلیه اطلاعات محرمانه (اعم از اصل
          و کپی، در هر قالبی) را به طرف اول بازگرداند یا به تایید طرف اول، آن‌ها را نابود نماید.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۶ - مدت قرارداد</h3>
        <p className="text-justify">
          این قرارداد از تاریخ امضا{' '}
          {contract.endDate
            ? `تا تاریخ ${formatPersianDate(contract.endDate)}`
            : 'به صورت نامحدود'}{' '}
          معتبر بوده و تعهدات محرمانگی حتی پس از پایان همکاری نیز لازم‌الاجرا می‌باشد.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۷ - جبران خسارت</h3>
        <p className="text-justify">
          در صورت نقض تعهدات محرمانگی توسط طرف دوم، وی ملزم به جبران کلیه خسارات مستقیم و غیرمستقیم وارده به
          طرف اول می‌باشد. طرف اول می‌تواند علاوه بر مطالبه خسارت، از طریق مراجع قضایی صدور دستور موقت جهت
          جلوگیری از ادامه نقض را درخواست نماید.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۸ - عدم انتقال</h3>
        <p className="text-justify">
          طرف دوم نمی‌تواند حقوق و تعهدات ناشی از این قرارداد را به شخص ثالث منتقل نماید مگر با موافقت کتبی
          قبلی طرف اول.
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
          در صورت بروز هرگونه اختلاف در تفسیر یا اجرای این قرارداد، ابتدا از طریق مذاکره حل و فصل خواهد شد.
          در صورت عدم توافق، مراجع قضایی صالحه شهرستان تبریز صلاحیت رسیدگی را خواهند داشت.
        </p>

        <h3 className="font-bold text-gray-900 mt-4">ماده ۱۰ - قانون حاکم</h3>
        <p className="text-justify">
          این قرارداد تابع قوانین جمهوری اسلامی ایران می‌باشد و تفسیر و اجرای آن بر اساس قوانین کشور صورت
          خواهد گرفت.
        </p>

        <p className="text-justify mt-4">
          این قرارداد در دو نسخه که هر دو دارای اعتبار یکسان می‌باشد، تنظیم و امضا و مبادله گردید.
        </p>
      </div>

      {/* امضاها */}
      <div className="grid grid-cols-2 gap-8 mt-8 text-sm">
        <div className="text-center">
          <p className="font-bold mb-1">طرف اول</p>
          <p className="text-xs text-gray-600 mb-8">شرکت توسعه فناوری افق روشن پرند</p>
          <div className="border-t border-gray-300 pt-1">
            <p className="text-xs text-gray-500">امضا و مهر</p>
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold mb-1">طرف دوم</p>
          <p className="text-xs text-gray-600 mb-8">{contract.partyName}</p>
          <div className="border-t border-gray-300 pt-1">
            <p className="text-xs text-gray-500">امضا و اثر انگشت</p>
          </div>
        </div>
      </div>
    </div>
  )
}
