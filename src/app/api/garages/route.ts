import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const garages = await prisma.garage.findMany({
      where: { userId: session.user.id },
      include: {
        entries: {
          include: {
            car: true,
          },
          orderBy: { position: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(garages)
  } catch (error) {
    console.error('Failed to fetch garages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch garages' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()

    const garage = await prisma.garage.create({
      data: {
        name: body.name,
        description: body.description,
        theme: body.theme,
        isPublic: body.isPublic ?? true,
        userId: session.user.id,
        entries: {
          create: body.carIds?.map((carId: string, index: number) => ({
            carId,
            position: index,
          })) || [],
        },
      },
      include: {
        entries: {
          include: {
            car: true,
          },
        },
      },
    })

    return NextResponse.json(garage)
  } catch (error) {
    console.error('Failed to create garage:', error)
    return NextResponse.json(
      { error: 'Failed to create garage' },
      { status: 500 }
    )
  }
}
