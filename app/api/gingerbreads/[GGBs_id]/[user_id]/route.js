const { PrismaClient } = require('@prisma/client')
import GingerbreadInfo from '../../../../../src/libs/gingerbreadInfo'
import { NextResponse } from 'next/server'

const prisma = global.prisma || new PrismaClient()

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

    const user = await prisma.user.findFirst({
      where: {
        GGBs_id: GGBs.id,
      },
    })

    const SendUser = await prisma.user.findFirst({
      where: {
        link_id: user_id,
      },
    })

    let data = {
      GGB_type: GGBs.GGB_type,
      thanks_message: GGBs.thanks_message,
    }

    data['GGB1'] = (await (await GingerbreadInfo(GGBs.GGB_1_id, 'friend')).json()).data
    data['GGB2'] = (await (await GingerbreadInfo(GGBs.GGB_2_id, 'friend')).json()).data
    data['GGB3'] = (await (await GingerbreadInfo(GGBs.GGB_3_id, 'friend')).json()).data
    data['is_decorate'] = GGBs.senders.indexOf(SendUser.id) == -1 ? 'F' : 'T'
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
