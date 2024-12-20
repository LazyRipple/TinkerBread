'use client'
import { useState } from 'react'

export function VisitFriendButton() {
  const [open, setOpen] = useState(false)
  const [friendLink, setFriendLink] = useState('')

  return (
    <div className='w-40 rounded-lg border-2 p-2'>
      {!open ? (
        <button onClick={() => setOpen(true)} className='w-full rounded-lg font-semibold'>
          Visit Friend
        </button>
      ) : (
        <div className='space-y-2'>
          <label htmlFor='friendLink' className='sr-only'>
            Friend Link
          </label>
          <input
            id='friendLink'
            value={friendLink}
            onChange={(e) => setFriendLink(e.target.value)}
            className='w-full border p-1'
            placeholder='Enter friend link'
          />
          <button
            onClick={() => {
              if (friendLink) {
                window.open(`/bake/${friendLink}`, '_blank')
              }
            }}
            className='w-full rounded-lg border-2 p-2 font-semibold'
          >
            Visit
          </button>
          <button onClick={() => setOpen(false)} className='w-full rounded-lg border-2 bg-red-500 p-2 font-semibold'>
            Close
          </button>
        </div>
      )}
    </div>
  )
}
