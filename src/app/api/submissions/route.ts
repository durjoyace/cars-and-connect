import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const challengeId = searchParams.get('challengeId')
    const userId = searchParams.get('userId')

    const where: any = {}

    if (challengeId) {
      where.challengeId = challengeId
    }

    if (userId) {
      where.userId = userId
    }

    const submissions = await prisma.garageSubmission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        challenge: true,
        reactions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Failed to fetch submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
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

    // Create the submission
    const submission = await prisma.garageSubmission.create({
      data: {
        userId: session.user.id,
        challengeId: body.challengeId,
        title: body.title,
        description: body.description,
        totalValue: body.totalValue,
        carIds: JSON.stringify(body.carIds),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Record participation
    await prisma.challengeParticipation.upsert({
      where: {
        userId_challengeId: {
          userId: session.user.id,
          challengeId: body.challengeId,
        },
      },
      create: {
        userId: session.user.id,
        challengeId: body.challengeId,
        completedAt: new Date(),
      },
      update: {
        completedAt: new Date(),
      },
    })

    // Update user points and streak
    const challenge = await prisma.challenge.findUnique({
      where: { id: body.challengeId },
    })

    if (challenge) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          points: { increment: challenge.points },
          lastActive: new Date(),
        },
      })
    }

    // Check for challenge completion unlocks
    const completedChallenges = await prisma.challengeParticipation.count({
      where: {
        userId: session.user.id,
        completedAt: { not: null },
      },
    })

    const challengeMilestones = [
      { count: 1, type: 'badge', itemId: 'first_challenge' },
      { count: 5, type: 'garage_theme', itemId: 'seinfeld' },
      { count: 7, type: 'feature', itemId: 'vin_lookup' },
      { count: 10, type: 'garage_theme', itemId: 'radwood' },
      { count: 15, type: 'challenge_type', itemId: 'expert_mode' },
    ]

    for (const milestone of challengeMilestones) {
      if (completedChallenges >= milestone.count) {
        await prisma.unlock.upsert({
          where: {
            userId_type_itemId: {
              userId: session.user.id,
              type: milestone.type,
              itemId: milestone.itemId,
            },
          },
          create: {
            userId: session.user.id,
            type: milestone.type,
            itemId: milestone.itemId,
          },
          update: {},
        })
      }
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Failed to create submission:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}
