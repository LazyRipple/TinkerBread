import { NextResponse } from 'next/server'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function GingerbreadInfo(GGB_id, user_id) {
  if (GGB_id == 'none') {
    return NextResponse.json({
      data: 'none',
    })
  }

  // get gingerbread infomation
  const res = await (await fetch(`http://localhost:3000/api/gingerbread/${GGB_id}`)).json()
  if (res.message == 'no gingerbread with this id') {
    return NextResponse.json({
      data: 'none',
    })
  }

  const GGB_res = res.data

  // get each item infomation
  let GGB = {}
  GGB['head1'] = await processItemDataInfo(GGB_res.head1_id, user_id)
  GGB['left1'] = await processItemDataInfo(GGB_res.left1_hand_id, user_id)
  GGB['right1'] = await processItemDataInfo(GGB_res.right1_hand_id, user_id)
  GGB['head2'] = await processItemDataInfo(GGB_res.head2_id, user_id)
  GGB['left2'] = await processItemDataInfo(GGB_res.left2_hand_id, user_id)
  GGB['right2'] = await processItemDataInfo(GGB_res.right2_hand_id, user_id)
  GGB['head3'] = await processItemDataInfo(GGB_res.head3_id, user_id)
  GGB['left3'] = await processItemDataInfo(GGB_res.left3_hand_id, user_id)
  GGB['right3'] = await processItemDataInfo(GGB_res.right3_hand_id, user_id)
  if (user_id != 'me') {
    GGB['is_decorate'] = checkIfDecorate(GGB)
  }
  delIfDecorate(GGB)
  return NextResponse.json({
    data: GGB,
  })
}

const processItemDataInfo = async (item_id, user_id) => {
  if (item_id == 0) return 'none'

  // find itemData data
  const res = await prisma.itemData.findFirst({
    where: {
      itemId: item_id,
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
    is_decorate: sender.id == user_id,
    item: item,
  }
}

const checkIfDecorate = (GGB) => {
  let is_decorate = false
  is_decorate |= GGB['head1'] == 'none' ? false : GGB['head1'].is_decorate
  is_decorate |= GGB['left1'] == 'none' ? false : GGB['left1'].is_decorate
  is_decorate |= GGB['right1'] == 'none' ? false : GGB['right1'].is_decorate
  is_decorate |= GGB['head2'] == 'none' ? false : GGB['head2'].is_decorate
  is_decorate |= GGB['left2'] == 'none' ? false : GGB['left2'].is_decorate
  is_decorate |= GGB['right2'] == 'none' ? false : GGB['right2'].is_decorate
  is_decorate |= GGB['head3'] == 'none' ? false : GGB['head3'].is_decorate
  is_decorate |= GGB['left3'] == 'none' ? false : GGB['left3'].is_decorate
  is_decorate |= GGB['right3'] == 'none' ? false : GGB['right3'].is_decorate
  return is_decorate
}

const delIfDecorate = (GGB) => {
  delete GGB['head1'].is_decorate
  delete GGB['left1'].is_decorate
  delete GGB['right1'].is_decorate
  delete GGB['head2'].is_decorate
  delete GGB['left2'].is_decorate
  delete GGB['right2'].is_decorate
  delete GGB['head3'].is_decorate
  delete GGB['left3'].is_decorate
  delete GGB['right3'].is_decorate
}
