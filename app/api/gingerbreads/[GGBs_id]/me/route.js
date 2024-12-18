const { PrismaClient } = require('@prisma/client')
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function GET(request, { params }) {
  const GGBs_id = params.GGBs_id
  try {
    const GGBs = await prisma.gingerbreads.findFirst({
      where: {
        id: GGBs_id,
      },
    })
    if (GGBs == null) {
      return NextResponse.json(
        {
          message: 'no gingerbreads with this id',
        },
        {
          status: 400,
        },
      )
    }

    let data = {
      GGB_type: GGBs.GGB_type,
      thanks_message: GGBs.thanks_message,
    }
    data['GGB1'] =
      GGBs.GGB_1_id == 'none' ? 'none' : await prisma.gingerbread.findFirst({ where: { id: GGBs.GGB_1_id } })
    data['GGB2'] =
      GGBs.GGB_2_id == 'none' ? 'none' : await prisma.gingerbread.findFirst({ where: { id: GGBs.GGB_2_id } })
    data['GGB3'] =
      GGBs.GGB_3_id == 'none' ? 'none' : await prisma.gingerbread.findFirst({ where: { id: GGBs.GGB_3_id } })

    return NextResponse.json({
      message: 'success',
      data: JSON.stringify(data),
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
