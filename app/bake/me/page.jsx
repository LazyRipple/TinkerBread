'use client'

import React from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSession, status } from 'next-auth/react'
import { BakeMeComponents } from "@/components/BakeMeComponents"
import Loading from './Loading'
import { BakeSessionProvider, useSessionContext } from './SessionContext'
import { Button } from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast';


export default function Page() {
  const { GGBs_id } = useParams()


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

  if (load_status == 'loading') return <Loading /> 
  if (!GGBs) return notFound()

  return (
    <div className='flex w-full flex-col items-center justify-center space-y-4 pt-20'>
      <Toaster />
        <p>{`${user?.username}'s Gingerbreads Kitchen`}</p>
        <BakeMeComponents />
        <button
          onClick={() => {
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
      method: "POST",
      body: JSON.stringify({
        user_id : session.user.id,
      }),
    })).json()
    
    if(res.message == 'failed'){
      throw new Error(res.error)
    }
    router.push(`/bake/me`)
  } catch (error) {      
    toast.error(error.message)
  }
}
