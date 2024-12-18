const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(request, { params }) {
  const GGB_id = params.GGB_id

  try {
    const GGB = await prisma.gingerbread.findFirst({
      where: {
        id: GGB_id,
      },
    })
    if (GGB == null) {
      return NextResponse.json(
        {
          message: 'no gingerbread with this id',
        },
        {
          status: 400,
        },
      )
    }

    return NextResponse.json({
      message: 'success',
      data: GGB,
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
  const GGB_id = params.GGB_id
  const { user_id, receiver_id, item_id, item_message, position } = await request.json()
  try {
    // check if user valid and not already decorate
    const res = await (await fetch(`${process.env.BASEURL}/api/gingerbreads/${receiver_id}/${user_id}`)).json()
    if (res.message == 'failed') {
      return NextResponse.json(
        {
          message: 'failed',
          error: res.error,
        },
        {
          status: 400,
        },
      )
    }
    console.log(res.data)

    if (res.data.is_decorate == 'T') {
      return NextResponse.json(
        {
          message: 'failed',
          error: 'this user already decorate receiver gingerbread',
        },
        {
          status: 400,
        },
      )
    }

    // TODO : check if GGB_id valid in user
    // if (!(res.data.GGB1 == GGB_id || res.data.GGB2 == GGB_id || res.data.GGB3 == GGB_id)) {
    //   return NextResponse.json(
    //     {
    //       message: 'failed',
    //       error: 'GGB id not belong with this receiver user',
    //     },
    //     {
    //       status: 400,
    //     },
    //   )
    // }

    // check if item valid
    const is_item_id_valid =
      (await prisma.item.findFirst({
        where: {
          id: parseInt(item_id),
        },
      })) == null
    if (is_item_id_valid) {
      return NextResponse.json(
        {
          message: 'failed',
          error: 'item_id not valid',
        },
        {
          status: 400,
        },
      )
    }

    // check if position valid
    if (!positions.includes(position)) {
      return NextResponse.json(
        {
          message: 'failed',
          error: 'position not valid',
        },
        {
          status: 400,
        },
      )
    }

    // add new Item data
    const position_text = position + '_id'
    const new_item = await prisma.itemData.create({
      data: {
        itemId: parseInt(item_id),
        senderId: user_id,
        message: item_message,
      },
    })
    const GGB = await prisma.gingerbread.update({
      where: {
        id: GGB_id,
      },
      data: { [position_text]: new_item.id },
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
