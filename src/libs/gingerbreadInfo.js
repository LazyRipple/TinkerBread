import { NextResponse } from 'next/server'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function GingerbreadInfo(GGB_id) {
  if (GGB_id == 'none') {
    return NextResponse.json({
      data: 'none',
    })
  }
  const res = await (await fetch(`http://localhost:3000/api/gingerbread/${GGB_id}`)).json()
  if (res.message == 'no gingerbread with this id') {
    return NextResponse.json({
      data: 'none',
    })
  }
  let GGB = {}
  GGB['head1'] = await processItemDataInfo(res.head1_id)
  GGB['left1'] = await processItemDataInfo(res.left1_id)
  GGB['right1'] = await processItemDataInfo(res.right1_id)
  GGB['head2'] = await processItemDataInfo(res.head2_id)
  GGB['left2'] = await processItemDataInfo(res.left2_id)
  GGB['right2'] = await processItemDataInfo(res.right2_id)
  GGB['head3'] = await processItemDataInfo(res.head3_id)
  GGB['left3'] = await processItemDataInfo(res.left3_id)
  GGB['right3'] = await processItemDataInfo(res.right3_id)

  return NextResponse.json({
    data: GGB,
  })
}

const processItemDataInfo = async (item_id) => {
  const res = await prisma.itemData.findFirst({
    where: {
      itemId: item_id,
    },
  })
  if (res == null) {
    return 'none'
  }
  const item = await prisma.item.findFirst({
    where: {
      id: res.itemId,
    },
  })

  return {
    message: res.message,
    item: item,
  }
}
