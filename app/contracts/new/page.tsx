'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import moment from 'jalali-moment'

type ContractType = 'EMPLOYMENT' | 'PROJECT' | 'NDA'

export default function NewContractPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [contractType, setContractType] = useState<ContractType>('EMPLOYMENT')
  
  const [formData, setFormData] = useState({
    partyName: '',
    partyId: '',
    partyAddress: '',
    partyPhone: '',
    position: '',
    salary: 0,
    salaryType: 'FIXED', // FIXED, COMMISSION, MIXED
    commission: 0, // درصد پورسانت
    projectTitle: '',
    projectAmount: 0,
    deliveryDays: 0,
    supportMonths: 0,
    paymentTerms: '',
    startDate: moment().format('YYYY-MM-DD'), // تاریخ امروز
    endDate: '',
    contractDuration: 12, // مدت قرارداد به ماه
    terms: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractType,
          ...formData,
        }),
      })

      if (response.ok) {
        router.push('/contracts')
      } else {
        alert('خطا در ایجاد قرارداد')
      }
    } catch (error) {
      alert('خطا در ایجاد قرارداد')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/contracts" className="text-green-600 hover:text-green-700 mb-4 inline-block">
            ← بازگشت به لیست قراردادها
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">ایجاد قرارداد جدید</h1>
          <p className="mt-2 text-gray-600">نوع قرارداد را انتخاب کرده و اطلاعات را وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* انتخاب نوع قرارداد */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">نوع قرارداد</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setContractType('PROJECT')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  contractType === 'PROJECT'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="font-bold">قرارداد پروژه</div>
                  <div className="text-xs text-gray-600 mt-1">طراحی و توسعه نرم‌افزار</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setContractType('EMPLOYMENT')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  contractType === 'EMPLOYMENT'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">👤</div>
                  <div className="font-bold">قرارداد استخدام</div>
                  <div className="text-xs text-gray-600 mt-1">جذب نیروی انسانی</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setContractType('NDA')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  contractType === 'NDA'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 hover:border-red-400'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="font-bold">قرارداد محرمانگی</div>
                  <div className="text-xs text-gray-600 mt-1">حفاظت از اطلاعات</div>
                </div>
              </button>
            </div>
          </div>

          {/* اطلاعات طرف قرارداد */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              اطلاعات {contractType === 'PROJECT' ? 'کارفرما (مشتری)' : 'طرف قرارداد'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  نام {contractType === 'PROJECT' ? 'کارفرما' : contractType === 'EMPLOYMENT' ? 'کارمند' : 'فرد'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.partyName}
                  onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="خانم/آقای یا نام شرکت"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  شماره ملی / شناسه ملی *
                </label>
                <input
                  type="text"
                  required
                  value={formData.partyId}
                  onChange={(e) => setFormData({ ...formData, partyId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  آدرس
                </label>
                <input
                  type="text"
                  value={formData.partyAddress}
                  onChange={(e) => setFormData({ ...formData, partyAddress: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  شماره تماس
                </label>
                <input
                  type="text"
                  value={formData.partyPhone}
                  onChange={(e) => setFormData({ ...formData, partyPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* فیلدهای مخصوص قرارداد پروژه */}
          {contractType === 'PROJECT' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">اطلاعات پروژه</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    عنوان پروژه *
                  </label>
                  <input
                    type="text"
                    required={contractType === 'PROJECT'}
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="مثال: طراحی سایت فروشگاهی"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    مبلغ قرارداد (ریال) *
                  </label>
                  <input
                    type="number"
                    required={contractType === 'PROJECT'}
                    value={formData.projectAmount}
                    onChange={(e) => setFormData({ ...formData, projectAmount: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    مدت تحویل (روز کاری)
                  </label>
                  <input
                    type="number"
                    value={formData.deliveryDays}
                    onChange={(e) => setFormData({ ...formData, deliveryDays: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    مدت پشتیبانی (ماه)
                  </label>
                  <input
                    type="number"
                    value={formData.supportMonths}
                    onChange={(e) => setFormData({ ...formData, supportMonths: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    شرایط پرداخت
                  </label>
                  <textarea
                    value={formData.paymentTerms}
                    onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="مثال: 30% پیش‌پرداخت، 40% پس از تایید طرح، 30% تسویه نهایی"
                  />
                </div>
              </div>
            </div>
          )}

          {/* فیلدهای مخصوص قرارداد استخدام */}
          {contractType === 'EMPLOYMENT' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">اطلاعات شغلی</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    سمت شغلی *
                  </label>
                  <input
                    type="text"
                    required={contractType === 'EMPLOYMENT'}
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="مثال: برنامه‌نویس Back-end"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    نوع حقوق *
                  </label>
                  <select
                    value={formData.salaryType}
                    onChange={(e) => setFormData({ ...formData, salaryType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="FIXED">حقوق ثابت</option>
                    <option value="COMMISSION">پورسانتی</option>
                    <option value="MIXED">ترکیبی (حقوق + پورسانت)</option>
                  </select>
                </div>
                {(formData.salaryType === 'FIXED' || formData.salaryType === 'MIXED') && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      حقوق ماهانه (ریال) *
                    </label>
                    <input
                      type="number"
                      required={contractType === 'EMPLOYMENT' && (formData.salaryType === 'FIXED' || formData.salaryType === 'MIXED')}
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}
                {(formData.salaryType === 'COMMISSION' || formData.salaryType === 'MIXED') && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      درصد پورسانت *
                    </label>
                    <input
                      type="number"
                      required={contractType === 'EMPLOYMENT' && (formData.salaryType === 'COMMISSION' || formData.salaryType === 'MIXED')}
                      value={formData.commission}
                      onChange={(e) => setFormData({ ...formData, commission: parseFloat(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="مثال: 10"
                      min="0"
                      max="100"
                      step="0.5"
                    />
                    <p className="text-xs text-gray-500 mt-1">درصد از فروش یا درآمد</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* مدت قرارداد */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">مدت قرارداد</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  تاریخ شروع (شمسی) *
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                  {formData.startDate ? moment(formData.startDate).locale('fa').format('jYYYY/jMM/jDD') : 'امروز'}
                </div>
                <input type="hidden" name="startDate" value={formData.startDate} required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  مدت قرارداد (ماه) {contractType === 'NDA' && '(اختیاری)'}
                </label>
                <input
                  type="number"
                  value={formData.contractDuration}
                  onChange={(e) => {
                    const duration = parseInt(e.target.value) || 0
                    setFormData({ 
                      ...formData, 
                      contractDuration: duration,
                      endDate: duration > 0 
                        ? moment(formData.startDate).add(duration, 'months').format('YYYY-MM-DD')
                        : ''
                    })
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="مثال: 12"
                />
              </div>
              {formData.contractDuration > 0 && formData.endDate && (
                <div className="md:col-span-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      <strong>تاریخ پایان:</strong>{' '}
                      {moment(formData.endDate).locale('fa').format('jYYYY/jMM/jDD')}
                      {' '}({formData.contractDuration} ماه بعد)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* شرایط و مفاد قرارداد */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">شرایط و مفاد قرارداد</h2>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                متن قرارداد *
              </label>
              <textarea
                required
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="شرایط و مفاد قرارداد را به تفصیل بنویسید..."
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                یادداشت‌های داخلی
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="یادداشت‌های داخلی که در قرارداد چاپی نمایش داده نمی‌شود"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 space-x-reverse">
            <Link
              href="/contracts"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              انصراف
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-teal-700 disabled:opacity-50"
            >
              {loading ? 'در حال ایجاد...' : 'ایجاد قرارداد'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
