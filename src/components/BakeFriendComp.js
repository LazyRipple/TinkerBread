import toast from 'react-hot-toast'

export const handdleAddItem = async (session, id, GGBs_id, item_name, position, message) => {
  try {
    // TODO : better way to fetch ?
    const res = await (
      await fetch(`/api/gingerbread/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          GGBs_id: GGBs_id,
          item_id: '1', // TODO : change to item_name
          item_message: message,
          position: position,
        }),
      })
    ).json()

    if (res.message == 'failed') {
      throw new Error(res.error)
    }
    toast.success('Done baking the decoration!')
  } catch (error) {
    toast.error(error.message)
  }
}

export const modelInstances = [
  { position: [2.3, 0, -0.9], scale: 0.1 },
  { position: [2.9, 0, -0.9], scale: 0.1 },
  { position: [3.5, 0, -0.9], scale: 0.1 },
]

export const data = {
  ggbType: 'ggb1',
  thanks_message: 'thank you! merry christmas!!',
  items: [
    { ggbId: '0000', item: { head: 'christmas_hat', 'left hand': null, 'right hand': null } },
    { ggbId: 1, item: { head: null, 'left hand': null, 'right hand': null } },
    { ggbId: 2, item: { head: null, 'left hand': null, 'right hand': null } },
    { ggbId: 3, item: { head: null, 'left hand': null, 'right hand': null } },
    { ggbId: '4444', item: { head: 'reindeer', 'left hand': null, 'right hand': null } },
    { ggbId: 5, item: { head: null, 'left hand': null, 'right hand': null } },
    { ggbId: 6, item: { head: null, 'left hand': null, 'right hand': null } },
    { ggbId: 7, item: { head: 'earpuff', 'left hand': null, 'right hand': null } },
    { ggbId: 8, item: { head: null, 'left hand': null, 'right hand': null } },
  ],
}
