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

    data['GGB1'] = (await (await GingerbreadInfo(GGBs.GGB_1_id, user_id)).json()).data
    data['GGB2'] = (await (await GingerbreadInfo(GGBs.GGB_2_id, user_id)).json()).data
    data['GGB3'] = (await (await GingerbreadInfo(GGBs.GGB_3_id, user_id)).json()).data

    // is_decorate
    let is_decorate = false
    is_decorate |= data['GGB1'] == 'none' ? false : data['GGB1'].is_decorate
    is_decorate |= data['GGB2'] == 'none' ? false : data['GGB2'].is_decorate
    is_decorate |= data['GGB3'] == 'none' ? false : data['GGB3'].is_decorate
    data['is_decorate'] = is_decorate ? 'T' : 'F'

    // drop is_decorate in GGB
    delete data['GGB1'].is_decorate
    delete data['GGB2'].is_decorate
    delete data['GGB3'].is_decorate

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
