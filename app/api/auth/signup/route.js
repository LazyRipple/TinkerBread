const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'
const prisma = new PrismaClient()
export async function POST(request) {
  // TODO : jwt check
  let decoded
  try {
    const { token } = await request.json()
    const SECRET_KEY = process.env.JWT_SECRET
    decoded = jwt.verify(token, SECRET_KEY)
  } catch (error) {
    return NextResponse.json(
      {
        message: 'failed',
        error: 'invalid token',
      },
      {
        status: 400,
      },
    )
  }
  try {
    // find if user already signin
    const same_email_user = await prisma.user.findFirst({
      where: {
        email: decoded.email,
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
        thanks_message: decoded.thanks_message,
        GGB_type: decoded.GGB_type,
        GGB_1_id: new_gingerbread1.id,
      },
    })

    const new_user = await prisma.user.create({
      data: {
        username: decoded.username,
        email: decoded.email,
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
