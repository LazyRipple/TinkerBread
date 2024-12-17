const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function PATCH(request) {
  // please send this 2 in body
  try {
    const { user_id, newname } = await request.json()

    // find if user already signin
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (user == null) {
      return NextResponse.json(
        {
          message: 'no user with this user_id',
        },
        {
          status: 400,
        },
      )
    }

    const update_user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        username: newname,
      },
    })
    return NextResponse.json({
      message: 'success',
      data: update_user.id,
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
