const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(request, { params }) {
  try {
    const link_id = params.link_id

    // if user not in database
    const user = await prisma.user.findFirst({
      where: {
        link_id,
      },
    })

    if (user == null) {
      throw new Error('no user with this user_id')
    }

    return NextResponse.json({
      message: 'success',
      data: user,
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
