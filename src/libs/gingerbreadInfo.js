import { NextResponse } from 'next/server'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function GingerbreadInfo(GGB_id) {
  if (GGB_id == 'none') {
    return NextResponse.json({
      data: 'none',
    })
  }

  // get gingerbread infomation
  const res = await (await fetch(`${process.env.BASEURL}/api/gingerbread/${GGB_id}`)).json()
  if (res.message == 'no gingerbread with this id') {
    return NextResponse.json({
      data: 'none',
    })
  }

  const GGB_res = res.data

  // get each item infomation
  let GGB = {}
  GGB['head1'] = await processItemDataInfo(GGB_res.head1_id)
  GGB['left1'] = await processItemDataInfo(GGB_res.left1_hand_id)
  GGB['right1'] = await processItemDataInfo(GGB_res.right1_hand_id)
  GGB['head2'] = await processItemDataInfo(GGB_res.head2_id)
  GGB['left2'] = await processItemDataInfo(GGB_res.left2_hand_id)
  GGB['right2'] = await processItemDataInfo(GGB_res.right2_hand_id)
  GGB['head3'] = await processItemDataInfo(GGB_res.head3_id)
  GGB['left3'] = await processItemDataInfo(GGB_res.left3_hand_id)
  GGB['right3'] = await processItemDataInfo(GGB_res.right3_hand_id)
  return NextResponse.json({
    data: GGB,
  })
}

const processItemDataInfo = async (item_id) => {
  if (item_id == 0) return 'none'

  // find itemData data
  const res = await prisma.itemData.findFirst({
    where: {
      id: item_id,
    },
  })
  if (res == null) return 'none'

  // get item data
  const item = await prisma.item.findFirst({
    where: {
      id: res.itemId,
    },
  })

  // get item data
  const sender = await prisma.user.findFirst({
    where: {
      id: res.senderId,
    },
  })
  return {
    message: res.message,
    sender: sender.username,
    item: item,
  }
}
