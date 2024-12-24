import { NextResponse } from 'next/server'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function GingerbreadInfo(GGB_id, meStr) {
  if (GGB_id == 'none') {
    return NextResponse.json({
      data: 'none',
    })
  }

  // get gingerbread infomation
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/gingerbread/${GGB_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())

  if (res.message == 'no gingerbread with this id') {
    return NextResponse.json({
      data: 'none',
    })
  }

  const GGB_res = res.data

  // get each item infomation
  let GGB = {}
  GGB['head1'] = await processItemDataInfo(GGB_res.head1_id, meStr)
  GGB['left1_hand'] = await processItemDataInfo(GGB_res.left1_hand_id, meStr)
  GGB['right1_hand'] = await processItemDataInfo(GGB_res.right1_hand_id, meStr)
  GGB['head2'] = await processItemDataInfo(GGB_res.head2_id, meStr)
  GGB['left2_hand'] = await processItemDataInfo(GGB_res.left2_hand_id, meStr)
  GGB['right2_hand'] = await processItemDataInfo(GGB_res.right2_hand_id, meStr)
  GGB['head3'] = await processItemDataInfo(GGB_res.head3_id, meStr)
  GGB['left3_hand'] = await processItemDataInfo(GGB_res.left3_hand_id, meStr)
  GGB['right3_hand'] = await processItemDataInfo(GGB_res.right3_hand_id, meStr)
  GGB['id'] = GGB_res.id
  return NextResponse.json({
    data: GGB,
  })
}

const processItemDataInfo = async (item_id, meStr) => {
  if (item_id == 0 || item_id == '') return null

  // find itemData data
  const res = await prisma.itemData.findFirst({
    where: {
      id: item_id,
    },
  })
  if (res == null) return 'none'

  if (meStr == 'me')
    return {
      message: res.message,
      sender: res.senderName,
      item: res.itemName,
    }
  return res.message
}
