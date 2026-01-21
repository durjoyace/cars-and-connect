import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const active = searchParams.get('active')
    const theme = searchParams.get('theme')
    const type = searchParams.get('type')

    const where: any = {}

    if (active === 'true') {
      const now = new Date()
      where.isActive = true
      where.startsAt = { lte: now }
      where.endsAt = { gte: now }
    }

    if (theme) {
      where.theme = theme
    }

    if (type) {
      where.type = type
    }

    const challenges = await prisma.challenge.findMany({
      where,
      orderBy: { startsAt: 'desc' },
      include: {
        _count: {
          select: { submissions: true },
        },
      },
    })

    return NextResponse.json(challenges)
  } catch (error) {
    console.error('Failed to fetch challenges:', error)
    return NextResponse.json(
      { error: 'Failed to fetch challenges' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const challenge = await prisma.challenge.create({
      data: {
        title: body.title,
        description: body.description,
        theme: body.theme,
        type: body.type,
        budgetLimit: body.budgetLimit,
        eraStart: body.eraStart,
        eraEnd: body.eraEnd,
        movieReference: body.movieReference,
        difficulty: body.difficulty || 'medium',
        points: body.points || 100,
        imageUrl: body.imageUrl,
        startsAt: new Date(body.startsAt),
        endsAt: new Date(body.endsAt),
      },
    })

    return NextResponse.json(challenge)
  } catch (error) {
    console.error('Failed to create challenge:', error)
    return NextResponse.json(
      { error: 'Failed to create challenge' },
      { status: 500 }
    )
  }
}
