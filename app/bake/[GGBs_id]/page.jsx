'use client'

import React from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSession, status } from 'next-auth/react'
import Loading from './Loading'
import { BakeSessionProvider, useSessionContext } from './SessionContext'
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/Button'

export default function Page() {
  const { GGBs_id } = useParams()
  if (status === 'unauthenticated') {        
     return notFound()
  }
  // Move BakeSessionProvider to wrap the entire content
  return (
    <BakeSessionProvider>
      <PageContent GGBs_id={GGBs_id} />
    </BakeSessionProvider>
  )
}

function PageContent({ GGBs_id }) {
  const { GGBs, load_status } = useSessionContext(GGBs_id)
  const { data: session } = useSession()

 
  if (load_status == 'loading') return <Loading /> 
  if (!GGBs) return notFound()

  return (
    <div className='flex w-full flex-col items-center justify-center space-y-4 pt-20'>
      <Toaster />
      <p>{`${GGBs.owner} Gingerbreads Kitchen`}</p>
      
      {GGBs.is_decorate == "F" && 
      
        <div>
          <button
            onClick={() => {
              handdleAddItem(session, GGBs.GGB1.id, GGBs.GGBs_id)
            }}
          >
            <Button text='Decorate GGB1' />
          </button>
        </div>
        }
      
    </div>
  )
}
const handdleAddItem = async (session, id, GGBs_id) => {
  try {
    // TODO : better way to fetch ?    
    const res = await (await fetch(`/api/gingerbread/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        user_id : session.user.id,
        GGBs_id : GGBs_id,
        item_id : "1",
        item_message : "haha",
        position : "left2_hand"
      }),
    })).json()
    
    if(res.message == 'failed'){
      throw new Error(res.error)
    }
    toast.success('Done baking the decoration!')
  } catch (error) {      
    toast.error(error.message)
  }
}
