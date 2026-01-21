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

    const unlocks = await prisma.unlock.findMany({
      where: { userId: session.user.id },
      orderBy: { unlockedAt: 'desc' },
    })

    return NextResponse.json(unlocks)
  } catch (error) {
    console.error('Failed to fetch unlocks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch unlocks' },
      { status: 500 }
    )
  }
}
