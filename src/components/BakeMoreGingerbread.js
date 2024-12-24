'use client'
import { Button } from './Button'
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
          toast.error('please wait')
          return
        }
        setCooldown(5)
        handdleAddGGB(session)
      }}
    >
      <Button text='Bake More Gingerbread' />
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
    router.push(`/bake/me`)
  } catch (error) {
    toast.error(error.message)
  }
}
