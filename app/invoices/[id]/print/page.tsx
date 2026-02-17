import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PrintInvoice from '@/components/PrintInvoice'

export default async function PrintInvoicePage({ params }: { params: { id: string } }) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: {
      items: true,
      createdBy: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  if (!invoice) {
    notFound()
  }

  // Convert Decimal to number
  const invoiceData = {
    ...invoice,
    totalAmount: Number(invoice.totalAmount),
    taxAmount: invoice.taxAmount ? Number(invoice.taxAmount) : null,
    discount: invoice.discount ? Number(invoice.discount) : null,
    items: invoice.items.map(item => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      totalPrice: Number(item.totalPrice),
    })),
  }

  return <PrintInvoice invoice={invoiceData} />
}
