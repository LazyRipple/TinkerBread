const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
const prisma = new PrismaClient()
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.id) throw new Error('Unauthorized')
    const { thanks_message, newname } = await request.json()

    // if user not in database
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    })

    if (user == null) {
      throw new Error('no user with this user_id')
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: newname,
      },
    })
    await prisma.gingerbreads.update({
      where: {
        id: user.GGBs_id,
      },
      data: {
        thanks_message,
      },
    })
    return NextResponse.json({
      message: 'success',
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'failed',
        error: error?.data || error?.message || 'Unknown error',
      },
      {
        status: 400,
      },
    )
  }
}
