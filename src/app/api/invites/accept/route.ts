import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { code } = await req.json()

    // Find the invite
    const invite = await prisma.invite.findUnique({
      where: { code },
    })

    if (!invite) {
      return NextResponse.json(
        { error: 'Invalid invite code' },
        { status: 400 }
      )
    }

    if (invite.status !== 'pending') {
      return NextResponse.json(
        { error: 'Invite has already been used' },
        { status: 400 }
      )
    }

    if (new Date() > invite.expiresAt) {
      return NextResponse.json(
        { error: 'Invite has expired' },
        { status: 400 }
      )
    }

    if (invite.senderId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot accept your own invite' },
        { status: 400 }
      )
    }

    // Update the invite
    const updatedInvite = await prisma.invite.update({
      where: { id: invite.id },
      data: {
        receiverId: session.user.id,
        status: 'accepted',
        usedAt: new Date(),
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    // Check if sender should get any unlocks
    const acceptedInvites = await prisma.invite.count({
      where: {
        senderId: invite.senderId,
        status: 'accepted',
      },
    })

    // Grant unlocks based on invite milestones
    const unlockMilestones = [
      { count: 1, type: 'sticker_pack', itemId: 'jdm_pack' },
      { count: 2, type: 'feature', itemId: 'provenance_mode' },
      { count: 3, type: 'garage_theme', itemId: 'tokyo_drift_neon' },
      { count: 5, type: 'badge', itemId: 'social_butterfly' },
    ]

    for (const milestone of unlockMilestones) {
      if (acceptedInvites >= milestone.count) {
        await prisma.unlock.upsert({
          where: {
            userId_type_itemId: {
              userId: invite.senderId,
              type: milestone.type,
              itemId: milestone.itemId,
            },
          },
          create: {
            userId: invite.senderId,
            type: milestone.type,
            itemId: milestone.itemId,
          },
          update: {},
        })
      }
    }

    return NextResponse.json({
      success: true,
      sender: updatedInvite.sender,
    })
  } catch (error) {
    console.error('Failed to accept invite:', error)
    return NextResponse.json(
      { error: 'Failed to accept invite' },
      { status: 500 }
    )
  }
}
