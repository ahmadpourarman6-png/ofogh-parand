'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewInvoicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    taxAmount: 0,
    discount: 0,
    notes: '',
  })
  const [items, setItems] = useState([
    { productName: '', description: '', quantity: 1, unitPrice: 0 }
  ])

  const addItem = () => {
    setItems([...items, { productName: '', description: '', quantity: 1, unitPrice: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.filter(item => item.productName && item.quantity > 0)
        }),
      })

      if (response.ok) {
        router.push('/invoices')
      } else {
        alert('خطا در ایجاد فاکتور')
      }
    } catch (error) {
      alert('خطا در ایجاد فاکتور')
    } finally {
      setLoading(false)
    }
  }

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  const finalAmount = totalAmount + formData.taxAmount - formData.discount

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/invoices" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← بازگشت به لیست فاکتورها
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">ایجاد فاکتور جدید</h1>
          <p className="mt-2 text-gray-600">اطلاعات فاکتور را وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">اطلاعات مشتری</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  شناسه مشتری *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  نام مشتری *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">آیتم‌ها</h2>
              <button
                type="button"
                onClick={addItem}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                + افزودن آیتم
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        نام محصول *
                      </label>
                      <input
                        type="text"
                        required
                        value={item.productName}
                        onChange={(e) => updateItem(index, 'productName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        تعداد *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        قیمت واحد *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      توضیحات
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      حذف آیتم
                    </button>
                  )}
                  <div className="mt-2 text-left">
                    <span className="text-sm text-gray-600">جمع: </span>
                    <span className="text-lg font-bold text-gray-900">
                      {(item.quantity * item.unitPrice).toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">محاسبات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  مالیات
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.taxAmount}
                  onChange={(e) => setFormData({ ...formData, taxAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  تخفیف
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">جمع کل:</span>
                <span className="font-medium">{totalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">مالیات:</span>
                <span className="font-medium">{formData.taxAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">تخفیف:</span>
                <span className="font-medium text-red-600">-{formData.discount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t pt-2 mt-2">
                <span>مبلغ نهایی:</span>
                <span className="text-blue-600">{finalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                یادداشت
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 space-x-reverse">
            <Link
              href="/invoices"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              انصراف
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            >
              {loading ? 'در حال ایجاد...' : 'ایجاد فاکتور'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
