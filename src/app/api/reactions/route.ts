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

    const { submissionId, type } = await req.json()

    // Check if reaction already exists
    const existingReaction = await prisma.reaction.findUnique({
      where: {
        userId_submissionId: {
          userId: session.user.id,
          submissionId,
        },
      },
    })

    if (existingReaction) {
      // Update reaction type
      const reaction = await prisma.reaction.update({
        where: { id: existingReaction.id },
        data: { type },
      })
      return NextResponse.json(reaction)
    }

    // Create new reaction
    const reaction = await prisma.reaction.create({
      data: {
        userId: session.user.id,
        submissionId,
        type,
      },
    })

    // Check for reaction milestone unlocks
    const reactionsGiven = await prisma.reaction.count({
      where: { userId: session.user.id },
    })

    if (reactionsGiven >= 25) {
      await prisma.unlock.upsert({
        where: {
          userId_type_itemId: {
            userId: session.user.id,
            type: 'feature',
            itemId: 'custom_reactions',
          },
        },
        create: {
          userId: session.user.id,
          type: 'feature',
          itemId: 'custom_reactions',
        },
        update: {},
      })
    }

    return NextResponse.json(reaction)
  } catch (error) {
    console.error('Failed to create reaction:', error)
    return NextResponse.json(
      { error: 'Failed to create reaction' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const submissionId = searchParams.get('submissionId')

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Submission ID required' },
        { status: 400 }
      )
    }

    await prisma.reaction.delete({
      where: {
        userId_submissionId: {
          userId: session.user.id,
          submissionId,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete reaction:', error)
    return NextResponse.json(
      { error: 'Failed to delete reaction' },
      { status: 500 }
    )
  }
}
