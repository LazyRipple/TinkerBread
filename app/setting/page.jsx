'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FormLoading } from '@/components/FormLoading';

export default  function Page() {
  const {data:session} = useSession()
  const [newName, setNewName] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  
  useEffect(()=>{
    const fetchUser = async () =>{
      const user = await (await fetch(`/api/user/${session.user.link_id}`)).json()
      
      setNewName(user.data?.username??"")
      const GGB = await (await fetch(`/api/gingerbreads/${user.data?.GGBs_id ?? ""}/me`)).json()
      setNewMessage(GGB.data?.thanks_message??"")
      setLoaded(true)
    }
    fetchUser()
  }, [session.user.user_id, session.user.link_id])

  const handleSubmit = async (e) => {
      e.preventDefault()    
      try {
        if (!newName || !newMessage) {
          throw new Error("please fill out form")
        }
        
        // TODO : better way to fetch ?
        const res = await (await fetch(`api/user`, {
          method: "PATCH",
          body: JSON.stringify({
            user_id : session.user.id,
            newname: newName,
            thanks_message: newMessage 
          }),
        })).json()
        
        if(res.message == 'failed'){
          throw new Error(res.error)
        }
        router.push(`/bake/${session.user.link_id}`)
      } catch (error) {      
        toast.error(error.message)
      }
    }
  return (
    <>
    <Toaster />
      <div className='mx-auto flex w-full flex-col  items-center space-y-4 py-10'>
        <p>This is Setting pages</p>
      
    {loaded ? 
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
            className="w-full rounded border border-gray-300 px-3 py-2" 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newMessage">thanks message</label>
          <input
            id="newMessageText"
            type="newMessage"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2" 
          />
        </div>
        <button
          type="submit"
          className="mb-4 w-full rounded bg-blue-500 py-2 text-white"
        >
          Save Change
        </button>{' '}
      </form>
      :
      <FormLoading />
    }
      </div>
    </>
  )
}
