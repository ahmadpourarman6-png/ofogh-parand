import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contracts = await prisma.contract.findMany({
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(contracts)
  } catch (error) {
    console.error('Error fetching contracts:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      contractType,
      partyName, 
      partyId, 
      partyAddress,
      partyPhone,
      position, 
      salary,
      salaryType,
      commission,
      projectTitle,
      projectAmount,
      deliveryDays,
      supportMonths,
      paymentTerms,
      startDate, 
      endDate, 
      terms,
      notes
    } = body

    // پیدا کردن کاربر از روی email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // ایجاد شماره قرارداد
    const contractNo = `CON-${Date.now()}`

    const contract = await prisma.contract.create({
      data: {
        contractNo,
        contractType,
        partyName,
        partyId,
        partyAddress,
        partyPhone,
        position,
        salary,
        salaryType,
        commission,
        projectTitle,
        projectAmount,
        deliveryDays,
        supportMonths,
        paymentTerms,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        terms,
        notes,
        createdById: user.id,
      },
    })

    return NextResponse.json(contract, { status: 201 })
  } catch (error) {
    console.error('Error creating contract:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
