import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PrintProjectContract from '@/components/PrintProjectContract'
import PrintEmploymentContract from '@/components/PrintEmploymentContract'
import PrintNDAContract from '@/components/PrintNDAContract'

export default async function PrintContractPage({ params }: { params: { id: string } }) {
  const contract = await prisma.contract.findUnique({
    where: { id: params.id },
  })

  if (!contract) {
    notFound()
  }

  // Convert Decimal to number for display
  const contractData = {
    ...contract,
    projectAmount: contract.projectAmount ? Number(contract.projectAmount) : null,
    salary: contract.salary ? Number(contract.salary) : null,
    commission: contract.commission ? Number(contract.commission) : null,
  }

  return (
    <>
      {contract.contractType === 'PROJECT' && <PrintProjectContract contract={contractData} />}
      {contract.contractType === 'EMPLOYMENT' && <PrintEmploymentContract contract={contractData} />}
      {contract.contractType === 'NDA' && <PrintNDAContract contract={contractData} />}
    </>
  )
}
