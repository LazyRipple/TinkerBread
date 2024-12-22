'use client'

import React from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSession, status } from 'next-auth/react'
import Loading from '../Loading'
import { BakeSessionProvider, useSessionContext } from './SessionContext'
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '../../../src/components/Button'
import { BackButton } from '../../../src/components/BackButton'

export default function Page() {
  const { friend_link_id } = useParams()
  if (status === 'unauthenticated') {        
     return notFound()
  }
  return (
    <BakeSessionProvider>
      <PageContent friend_link_id={friend_link_id} />
    </BakeSessionProvider>
  )
}

function PageContent({ friend_link_id }) {
  const { GGBs, load_status } = useSessionContext(friend_link_id)
  const { data: session } = useSession()

 
  if (load_status == 'loading') return <Loading /> 
  if (!GGBs) return notFound()

  return (
    <div className='relative flex w-full flex-col items-center justify-center space-y-4 pt-20'>
      <BackButton />
      
      <Toaster />
      <p>{`${GGBs.owner} Gingerbreads Kitchen`}</p>
      
      {GGBs.is_decorate == "F" ? 
      
        <div>
          <button
            onClick={() => {
              handdleAddItem(session, GGBs.GGB1.id, GGBs.GGBs_id)
            }}
          >
            <Button text='Decorate GGB1' />
          </button>
        </div>

        :
        <p>you already decorated</p>
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
        GGBs_id : GGBs_id,
        item_id : "1", // TODO : choose id here
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
