'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';

import session from 'express-session'
import { PATCH } from '@/api/gingerbread/[GGB_id]/route';

export default function Page() {
  const [newName, setNewName] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const router = useRouter()
const handleSubmit = async (e) => {
    e.preventDefault()    
    const user_id = "86a05bca-b01d-44a5-ae11-0c3ec9fec484"
    
    try {
      if (!newName || !newMessage) {
        throw new Error("please fill out form")
      }

      const res = await (await fetch(`api/user`, {
        method: "PATCH",
        body: JSON.stringify({
          user_id,
          newname: newName,
          thanks_message: newMessage 
        }),
      })).json()
      console.log(res);
      
      if(res.message == 'failed'){
        throw new Error(res.error)
      }
    } catch (error) {      
       toast.error(error.message)
    }
  }
  return (
    <>
    <Toaster />
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
      This is Setting pages

      <form
        onSubmit={handleSubmit}
        className="rounded-md bg-white p-6 shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="newName">username</label>
          <input
            id="newNameText"
            type="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2" // Added border
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newMessage">thanks message</label>
          <input
            id="newMessageText"
            type="newMessage"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2" // Added border
          />
        </div>
        <button
          type="submit"
          className="mb-4 w-full rounded bg-blue-500 py-2 text-white"
        >
          Sign In
        </button>{' '}
      </form>
      </div>
    </>
  )
}
