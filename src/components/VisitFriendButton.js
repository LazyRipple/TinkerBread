'use client'
import { useState } from 'react'

export function VisitFriendButton() {
  const [open, setOpen] = useState(false)
  const [friendLink, setFriendLink] = useState('')

  return (
    <div className='w-full rounded-xl border-2 border-white bg-red-800 px-4 py-2 text-center font-semibold text-white shadow-lg transition duration-300'>
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
            className='w-full border p-1 text-black'
            placeholder='Link (ex:1dfsz82d4f2e)'
          />
          <div className='flex items-center justify-center space-x-2'>
            <button
              onClick={() => {
                if (friendLink) {
                  window.open(`/bake/${friendLink}`, '_blank')
                }
              }}
              className='rounded-lg border-2 p-2 px-6 font-semibold'
            >
              Visit
            </button>
            <button onClick={() => setOpen(false)} className='rounded-lg border-2 bg-red-500 p-2 px-6 font-semibold '>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
