const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()
export async function POST(request) {
  try {
    // TODO : change this when on production
    const allowedOrigins = ['http://localhost:3000']
    const origin = request.headers.get('origin')
    if (!allowedOrigins.includes(origin)) {
      throw new Error('Forbidden: Invalid origin')
    }
    const user = (await request.json()).payload

    // find if user already signin
    const same_email_user = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    })

    if (same_email_user != null) {
      throw new Error('this email already signup')
    }
    // create new user
    const new_gingerbread1 = await prisma.gingerbread.create({
      data: {},
    })
    const new_gingerbreads = await prisma.gingerbreads.create({
      data: {
        thanks_message: user.thanks_message,
        GGB_type: user.GGB_type,
        GGB_1_id: new_gingerbread1.id,
      },
    })
    const new_user = await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        GGBs_id: new_gingerbreads.id,
      },
    })
    return NextResponse.json({
      message: 'success',
      data: new_user.link_id,
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
