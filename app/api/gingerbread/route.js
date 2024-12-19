const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function POST(request) {
  try {
    const { user_id } = await request.json()

    // find if user already signin
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })
    if (user == null) {
      throw new Error('no user_id in database')
    }

    const GGBs = await prisma.gingerbreads.findFirst({
      where: {
        id: user.GGBs_id,
      },
    })

    if (GGBs == null) {
      throw new Error('GGBs_id is wrong')
    }

    if (GGBs.GGB_3_id != 'none') {
      throw new Error('GGBs already at the limit 3 GGBs')
    }

    // create new gingerbread
    const new_gingerbread = await prisma.gingerbread.create({
      data: {},
    })
    let key = ''
    if (GGBs.GGB_2_id == 'none') {
      key = 'GGB_2_id'
    } else {
      key = 'GGB_3_id'
    }
    await prisma.gingerbreads.update({
      where: {
        id: user.GGBs_id,
      },
      data: {
        [key]: new_gingerbread.id,
      },
    })
    return NextResponse.json({
      message: 'success',
      data: new_gingerbread.id,
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
