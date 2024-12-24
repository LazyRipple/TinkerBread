'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react';
import ChatDialog from './chatDialog';

export default function Page() {
  const session = new useSession()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [username, setUsername] = useState(searchParams.get('username'))
  const [thxmessage, setThxMessage] = useState('thank you')
  const [GGBType, setGGBType] = useState('normal')

  
  const handleSubmit = async (e) => {
      e.preventDefault()    
     
      try {
        if (!username || !thxmessage) {
          throw new Error("please fill out form")
        }        

        const payload = {
          username,
          email,
          thanks_message: thxmessage,
          GGB_type: GGBType,
        }
        
        const res = await (await fetch(`api/auth/signup`, {
          method: "POST",
           headers: {
            'Content-Type': 'application/json',
            Origin: window.location.origin,
          },
          body: JSON.stringify({ payload }),
        })).json()
        
        if(res.message == 'failed'){
          throw new Error(res.error)
        }
                
        signIn('google')
      } catch (error) {      
        toast.error(error.message)
      }
    }
  return (
    <>
     <div className='mx-auto flex w-full flex-col  items-center'>
      <div className='absolute'><Toaster /></div>
      <ChatDialog username={username} setUsername={setUsername}
      thxmessage={thxmessage} setThxMessage={setThxMessage} GGBType={GGBType} setGGBType={setGGBType} email={email}/>
    </div>
    </>
  )
}