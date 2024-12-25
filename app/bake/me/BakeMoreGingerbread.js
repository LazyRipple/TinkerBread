'use client'
import { Button } from '../../../src/components/Button'
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function BakeMoreGingerbread({ session }) {
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldown((prev) => (prev === 0 ? 0 : prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <button
      onClick={() => {
        if (cooldown != 0) {
          toast.dismiss()
          toast.error('please wait')
          return
        }
        setCooldown(5)
        handdleAddGGB(session)
      }}
    >
      <Button text='Bake More' />
    </button>
  )
}

const handdleAddGGB = async (session) => {
  try {
    // TODO : better way to fetch ?
    const res = await (
      await fetch(`/api/gingerbread`, {
        method: 'POST',
      })
    ).json()

    if (res.message == 'failed') {
      throw new Error(res.error)
    }
    window.location.reload()
  } catch (error) {
    toast.error(error.message)
  }
}

export const Textbox = () => {
  const [open, setOpen] = useState(true)
  return (
    <>
      {open && (
        <div className='absolute  left-5 top-24 z-10 flex w-72 items-center rounded-xl border-2 border-white bg-[#FFD889] p-4 text-red-800 shadow-lg'>
          {/* Title */}
          <p className='mb-2 mt-3 text-center text-lg font-semibold text-red-800'>
            Tap on the accessory to view the message!{' '}
          </p>

          <button
            onClick={() => {
              setOpen(false)
            }}
            className='absolute right-2 top-2 flex size-6 items-center justify-center rounded-full border-2 border-white bg-red-800 text-white transition duration-300 hover:bg-[#FFD889] hover:text-red-800'
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}
