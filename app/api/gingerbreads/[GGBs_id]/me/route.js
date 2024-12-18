const { PrismaClient } = require('@prisma/client')
import GingerbreadInfo from '@/libs/gingerbreadInfo'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET : get your gingerbread infomation
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
          message: 'failed',
          error: 'no gingerbreads with this id',
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

    data['GGB1'] = (await (await GingerbreadInfo(GGBs.GGB_1_id, 'me')).json()).data
    data['GGB2'] = (await (await GingerbreadInfo(GGBs.GGB_2_id, 'me')).json()).data
    data['GGB3'] = (await (await GingerbreadInfo(GGBs.GGB_3_id, 'me')).json()).data
    return NextResponse.json({
      message: 'success',
      data: data,
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
