'use client'

import React, { useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSession, status } from 'next-auth/react'
import Loading from '../Loading'
import { BakeSessionProvider, useSessionContext } from './SessionContext'
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/Button'
import { BackButton } from '@/components/BackButton'
import { Canvas } from '@react-three/fiber';
import { handdleAddItem } from '@/components/BakeFriendComp'
import '@/style/bake.css';
import { Snow } from '@/components/Snow.jsx';
import { CameraController } from '@/components/CameraController.jsx';
import { Scene } from '@/components/Scene.jsx';
import { Gingerbread } from '@/components/Gingerbread.jsx';
import { OrbitControls } from '@react-three/drei';
import { Arrow3D } from '@/components/Arrow';

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