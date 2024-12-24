'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { FormLoading } from '@/components/FormLoading'
import Link from 'next/link'

export default function Page() {
  const { data: session } = useSession()
  const [newName, setNewName] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await (await fetch(`/api/user/${session.user.link_id}`)).json()
      setNewName(user.data?.username ?? '')
      const GGB = await (await fetch(`/api/gingerbreads/${user.data?.GGBs_id ?? ''}/me`)).json()
      setNewMessage(GGB.data?.thanks_message ?? '')
      setLoaded(true)
    }
    fetchUser()
  }, [session.user.user_id, session.user.link_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!newName || !newMessage) {
        throw new Error('please fill out form')
      }

      // TODO : better way to fetch ?
      const res = await (
        await fetch(`api/user`, {
          method: 'PATCH',
          body: JSON.stringify({
            newname: newName,
            thanks_message: newMessage,
          }),
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

  return (
    <div className='gradient-container relative flex size-full min-h-screen flex-col items-center justify-center p-8 text-white shadow-lg'>
      <Toaster />
      <Link href={'/bake/me'}>
        <button className='absolute left-3 top-3 size-12 rounded-full border-2 border-white bg-red-800 p-3 text-white shadow-lg transition duration-300 hover:bg-red-900'>
          <img src='/icon/back.webp' alt='Back' className='size-full' />
        </button>
      </Link>

      {loaded ? (
        <div className='flex min-w-[30vw] flex-col rounded-xl bg-black bg-opacity-30 px-10 py-6'>
          <h1 className='text-center text-4xl font-bold text-white'>Settings</h1>
          <div className='mt-6 flex w-full max-w-md flex-col items-center justify-center gap-6'>
            <label className='flex flex-col gap-2'>
              <span className='text-lg font-medium text-white'>Name:</span>
              <input
                type='text'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className='w-full max-w-md rounded-lg border-2 border-white bg-[#FFD889] px-4 py-3 text-red-800 shadow-lg transition-transform duration-300 placeholder:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFD889]'
                placeholder='Enter your name'
              />
            </label>
            <label className='flex flex-col gap-2'>
              <span className='text-lg font-medium text-white'>Thank You Message:</span>
              <input
                type='text'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className='w-full max-w-md rounded-lg border-2 border-white bg-[#FFD889] px-4 py-3 text-red-800 shadow-lg transition-transform duration-300 placeholder:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFD889]'
                placeholder='Enter your message'
              />
            </label>
            <div className='flex gap-4'>
              <button
                onClick={handleSubmit}
                className='rounded-full border-2 border-white bg-green-800 px-6 py-3 font-medium text-white shadow-lg hover:bg-[#FFD889] hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-[#FFD889]'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <FormLoading />
      )}
    </div>
  )
}
