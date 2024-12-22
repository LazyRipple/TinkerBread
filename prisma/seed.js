const { PrismaClient } = require('@prisma/client')

async function main() {
  // Create Gingerbread parts
  const prisma = new PrismaClient()

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

  const user1 = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({
      username: 'aisha',
      email: 'aisha@gmail.com',
      thanks_message: 'aisha say thx',
      GGB_type: 'girl',
    }),
  })

  const user2 = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({
      username: 'aida',
      email: 'aida@gmail.com',
      thanks_message: 'aida say thx',
      GGB_type: 'girl',
    }),
  })
  console.log('Mock data created successfully!')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
