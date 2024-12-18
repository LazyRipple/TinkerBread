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
  const { user_id, receiver_id } = await request.json()
  try {
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
