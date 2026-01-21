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

    const userId = session.user.id

    // Fetch all stats in parallel
    const [
      user,
      totalChallenges,
      invitesSent,
      invitesAccepted,
      garagesCreated,
      totalReactions,
      unlocksEarned,
    ] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { points: true, streak: true },
      }),
      prisma.challengeParticipation.count({
        where: { userId, completedAt: { not: null } },
      }),
      prisma.invite.count({
        where: { senderId: userId },
      }),
      prisma.invite.count({
        where: { senderId: userId, status: 'accepted' },
      }),
      prisma.garage.count({
        where: { userId },
      }),
      prisma.reaction.count({
        where: { userId },
      }),
      prisma.unlock.count({
        where: { userId },
      }),
    ])

    return NextResponse.json({
      totalChallenges,
      currentStreak: user?.streak || 0,
      longestStreak: user?.streak || 0, // Would need separate tracking
      totalPoints: user?.points || 0,
      invitesSent,
      invitesAccepted,
      garagesCreated,
      totalReactions,
      unlocksEarned,
    })
  } catch (error) {
    console.error('Failed to fetch user stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    )
  }
}
