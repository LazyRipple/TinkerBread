'use client'

import React from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSession, status } from 'next-auth/react'
import { BakeMeComponents } from "@/components/BakeMeComponents"
import Loading from '../Loading'
import { BakeSessionProvider, useSessionContext } from './SessionContext'
import toast, { Toaster } from 'react-hot-toast';
import BakeMoreGingerbread from '@/components/BakeMoreGingerbread'


export default function Page() {
  const { GGBs_id } = useParams()
  const shareLink = `http://localhost:3000/bake/${GGBs_id}`


  if (status === 'unauthenticated') {        
     return notFound()
  }
  return (
    <BakeSessionProvider>
      <PageContent GGBs_id={GGBs_id} />
    </BakeSessionProvider >
  )
}

function PageContent({ GGBs_id }) {
  const { user, GGBs, load_status } = useSessionContext()
  const { data: session } = useSession()
  


  if (load_status == 'loading') return <Loading /> 
  if (!GGBs) return notFound()
  
  const shareLink = `${session.user.link_id}`
  return (
    <div className='flex w-full flex-col items-center justify-center space-y-4 pt-20'>
      <Toaster />
        <p>{`${user?.username}'s Gingerbreads Kitchen`}</p>
        <BakeMeComponents shareLink={shareLink} />
        <BakeMoreGingerbread session={session} />
    </div>
  )
}

