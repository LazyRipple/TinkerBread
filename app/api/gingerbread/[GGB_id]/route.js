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
      data: JSON.stringify({ GGB }),
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
