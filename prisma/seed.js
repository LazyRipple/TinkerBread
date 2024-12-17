const { PrismaClient } = require('@prisma/client')

async function main() {
  // Create Gingerbread parts
  const prisma = new PrismaClient()

  const gingerbread0 = await prisma.gingerbread.create({
    data: {},
  })
  const gingerbread1 = await prisma.gingerbread.create({
    data: { head1_id: 1, left1_hand_id: 2, right1_hand_id: 3 },
  })

  // Create Gingerbreads
  const gingerbreads1 = await prisma.gingerbreads.create({
    data: {
      GGB_type: 'holiday Special',
      thanks_message: 'Thank you for your support!',
      GGB_1_id: gingerbread0.id,
      GGB_2_id: gingerbread1.id,
    },
  })

  const gingerbreads2 = await prisma.gingerbreads.create({
    data: {
      GGB_type: 'girl',
      thanks_message: 'Ho Ho Ho',
    },
  })

  const gingerbreads3 = await prisma.gingerbreads.create({
    data: {
      GGB_type: 'normal',
      thanks_message: 'Three to Missiltoe',
    },
  })

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      username: 'UserOne',
      gmail: 'userOne@gmail.com',
      GGBs_id: gingerbreads1.id,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      username: 'UserTwo',
      gmail: 'UserTwo@gmail.com',
      GGBs_id: gingerbreads2.id,
    },
  })

  const user3 = await prisma.user.create({
    data: {
      username: 'UserThree',
      gmail: 'UserThree@gmail.com',
      GGBs_id: gingerbreads3.id,
    },
  })

  // Create Items
  const item1 = await prisma.item.create({
    data: {
      item_name: 'Candy Cane',
      item_model: 'model_1',
      item_description: 'A sweet candy cane.',
      item_position: 'left hand',
      x_position: 1.0,
      y_position: 1.0,
      z_position: 1.0,
      x_rotation: 0.0,
      y_rotation: 90.0,
      z_rotation: 0.0,
      scale: 1.0,
    },
  })

  const item2 = await prisma.item.create({
    data: {
      item_name: 'Crownd',
      item_model: 'crownd_1',
      item_description: 'crownd',
      item_position: 'head',
      x_position: 1.0,
      y_position: 1.0,
      z_position: 1.0,
      x_rotation: 45.0,
      y_rotation: 56.0,
      z_rotation: 54.0,
      scale: 1.0,
    },
  })

  const item3 = await prisma.item.create({
    data: {
      item_name: 'Pie',
      item_model: 'pie_1',
      item_description: 'yummy',
      item_position: 'right_hand',
      x_position: 1.0,
      y_position: 2.0,
      z_position: 3.0,
      x_rotation: 0.0,
      y_rotation: 5.0,
      z_rotation: 2.8,
      scale: 1.0,
    },
  })

  // Create ItemData
  const itemData1 = await prisma.itemData.create({
    data: {
      itemId: item1.id,
      senderId: user1.id,
      message: 'Happy Holidays!',
    },
  })

  const itemData2 = await prisma.itemData.create({
    data: {
      itemId: item2.id,
      senderId: user2.id,
      message: 'Ho Ho Ho',
    },
  })

  console.log('Mock data created successfully!')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
