const { PrismaClient } = require('@prisma/client')
import GingerbreadInfo from '../../../../../src/libs/gingerbreadInfo'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET : get your gingerbread infomation
export async function GET(request, { params }) {
  const GGBs_id = params.GGBs_id
  const user_id = params.user_id
  try {
    const GGBs = await prisma.gingerbreads.findFirst({
      where: {
        link_id: GGBs_id,
      },
    })

    if (GGBs == null) {
      throw new Error('no gingerbreads with this id')
    }

    const user = await prisma.user.findFirst({
      where: {
        GGBs_id: GGBs.id,
      },
    })

    let data = {
      GGB_type: GGBs.GGB_type,
      thanks_message: GGBs.thanks_message,
    }

    data['GGB1'] = (await (await GingerbreadInfo(GGBs.GGB_1_id)).json()).data
    data['GGB2'] = (await (await GingerbreadInfo(GGBs.GGB_2_id)).json()).data
    data['GGB3'] = (await (await GingerbreadInfo(GGBs.GGB_3_id)).json()).data
    data['is_decorate'] = GGBs.senders.indexOf(user.id) == -1 ? 'F' : 'T'
    data['owner'] = user.username
    data['GGBs_id'] = GGBs.id
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
