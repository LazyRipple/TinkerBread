const { PrismaClient } = require('@prisma/client')
import GingerbreadInfo from '@/libs/gingerbreadInfo'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET : get your gingerbread infomation
export async function GET(request, { params }) {
  const GGBs_id = params.GGBs_id
  const user_id = params.user_id
  try {
    const GGBs = await prisma.gingerbreads.findFirst({
      where: {
        id: GGBs_id,
      },
    })
    if (GGBs == null) {
      throw new Error('no gingerbreads with this id')
    }

    let data = {
      GGB_type: GGBs.GGB_type,
      thanks_message: GGBs.thanks_message,
    }

    data['GGB1'] = (await (await GingerbreadInfo(GGBs.GGB_1_id)).json()).data
    data['GGB2'] = (await (await GingerbreadInfo(GGBs.GGB_2_id)).json()).data
    data['GGB3'] = (await (await GingerbreadInfo(GGBs.GGB_3_id)).json()).data
    data['is_decorate'] = GGBs.senders.indexOf(user_id) == -1 ? 'F' : 'T'

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
