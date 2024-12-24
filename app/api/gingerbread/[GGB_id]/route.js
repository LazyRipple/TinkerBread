const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import authOptions from '../auth/[...nextauth]/authOption'

const prisma = new PrismaClient()
export async function GET(request, { params }) {
  try {
    const GGB_id = params.GGB_id
    const GGB = await prisma.gingerbread.findFirst({
      where: {
        id: GGB_id,
      },
    })
    if (GGB == null) {
      throw new Error('gingerbread id is incorrect')
    }

    let fulled = true
    positions.map((pos) => {
      if (GGB[`${pos}_id`] == '') {
        fulled = false
      }
    })

    return NextResponse.json({
      message: 'success',
      data: GGB,
      fulled,
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

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.id) throw new Error('Unauthorized')

    const GGB_id = params.GGB_id
    const { GGBs_id, itemName, message, position } = await request.json()
    // check if user valid and not already decorate
    const GGBs = await prisma.gingerbreads.findFirst({
      where: {
        id: GGBs_id,
      },
    })

    if (GGBs == null) {
      throw new Error('gingerbreads id is incorrect')
    }

    // check if user already sent decoration
    if (GGBs.senders.indexOf(session.user.id) != -1) {
      throw new Error('this user already decorate receiver gingerbread')
    }

    // check if GGB_id is in GGBs
    if (GGBs.GGB_1_id != GGB_id && GGBs.GGB_2_id != GGB_id && GGBs.GGB_3_id != GGB_id) {
      throw new Error('gingerbread id is incorrect')
    }

    // check if GGB already has item in position
    if (!positions.includes(position)) {
      throw new Error('position not valid')
    }
    const GGB = await prisma.gingerbread.findFirst({
      where: {
        id: GGB_id,
      },
    })
    const position_text = position + '_id'
    if (!(GGB[position_text] == '' || GGB[position_text] == 0)) {
      throw new Error('those position already decorated')
    }

    // add new Item data
    const new_item = await prisma.itemData.create({
      data: {
        itemName,
        senderName: session.user.username,
        message: message,
      },
    })

    await prisma.gingerbread.update({
      where: { id: GGB.id },
      data: {
        [position_text]: new_item.id,
      },
    })
    await prisma.gingerbreads.update({
      where: { id: GGBs.id },
      data: {
        senders: `${GGBs.senders}, ${session.user.id}`,
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

const positions = [
  'head1',
  'left1_hand',
  'right1_hand',
  'head2',
  'left2_hand',
  'right2_hand',
  'head3',
  'left3_hand',
  'right3_hand',
]
