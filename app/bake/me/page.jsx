'use client'

import React, {useState, useEffect} from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSession, status } from 'next-auth/react'
import { BakeMeComponents } from "@/components/BakeMeComponents"
import Loading from '../Loading'
import { BakeSessionProvider, useSessionContext } from './SessionContext'
import { Button } from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast';


export default function Page() {
  const { GGBs_id } = useParams()
  const shareLink = `http://localhost:3000/bake/${GGBs_id}`


  if (status === 'unauthenticated') {        
     return notFound()
  }
  return (
    <BakeSessionProvider>
      <PageContent GGBs_id={GGBs_id} />
    </BakeSessionProvider>
  )
}

function PageContent({ GGBs_id }) {
  const { user, GGBs, load_status } = useSessionContext()
  const { data: session } = useSession()
  const [cooldown, setCooldown] = useState(0)
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldown((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  if (load_status == 'loading') return <Loading /> 
  if (!GGBs) return notFound()
  
  const shareLink = `${session.user.link_id}`
  return (
    <div className='flex w-full flex-col items-center justify-center space-y-4 pt-20'>
      <Toaster />
        <p>{`${user?.username}'s Gingerbreads Kitchen`}</p>
        <BakeMeComponents shareLink={shareLink} />
        <button
          onClick={() => {
            if(cooldown!=0){
              toast.error("please wait")
              return
            }
            setCooldown(5)
            handdleAddGGB(session)
          }}
        >
          <Button text='Bake More Gingerbread' />
        </button>
    </div>
  )
}

const handdleAddGGB = async (session) => {
  try {
    // TODO : better way to fetch ?
    const res = await (await fetch(`/api/gingerbread`, {
      method: "POST"
    })).json()
    
    if(res.message == 'failed'){
      throw new Error(res.error)
    }
    router.push(`/bake/me`)
  } catch (error) {      
    toast.error(error.message)
  }
}
