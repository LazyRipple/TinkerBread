const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function POST(request) {
  // please send this 3 in body

  try {
    const { username, gmail, thanks_message, GGB_type } = await request.json()

    // find if user already signin
    const same_gmail_user = await prisma.user.findFirst({
      where: {
        gmail: gmail,
      },
    })
    if (same_gmail_user != null) {
      return NextResponse.json(
        {
          message: 'this gmail already signup',
        },
        {
          status: 400,
        },
      )
    }

    // create new user
    const new_gingerbread1 = await prisma.gingerbread.create({
      data: {},
    })

    const new_gingerbreads = await prisma.gingerbreads.create({
      data: {
        thanks_message,
        GGB_type,
        GGB_1_id: new_gingerbread1.id,
      },
    })

    const new_user = await prisma.user.create({
      data: {
        username,
        gmail,
        GGBs_id: new_gingerbreads.id,
      },
    })
    return NextResponse.json({
      message: 'success',
      data: new_user.id,
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
