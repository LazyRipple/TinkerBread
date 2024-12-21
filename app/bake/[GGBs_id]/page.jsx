'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSession, status } from 'next-auth/react'
import { BakeMeComponents } from "@/components/BakeMeComponents"
import Loading from './Loading'

const SessionContext = createContext(undefined)
const BakeSessionProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [GGBs, setGGBs] = useState(null)
  const [load_status, setLoadStatus] = useState('loading')
  useEffect(() => {
    const fetchUser = async () => {
      console.log(session?.user?.link_id);
      
      if (status === 'authenticated' && session?.user?.link_id) {
        try {
          const userRes = await fetch(`/api/user/${session.user.link_id}`)
          const userData = await userRes.json()
          setUser(userData?.data ?? null)
          console.log("user", userData.data);
          
          if (userData?.data?.GGBs_id) {
            const GGBRes = await fetch(`/api/gingerbreads/${userData.data.GGBs_id}/me`)
            const GGBData = await GGBRes.json()
            console.log("GGB", GGBData.data);
            
            setGGBs(GGBData?.data ?? null)
            setLoadStatus('loaded')
          }
          
        } catch (error) {
          setLoadStatus('error')
        }
      }
    }
    fetchUser()
  }, [status, session?.user?.link_id])
  

  return (
    <SessionContext.Provider value={{ session, status, user, GGBs, load_status }}>
      {children}
    </SessionContext.Provider>
  )
}

const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionContext must be used within a BakeSessionProvider')
  }
  return context
}

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
  const { user, GGBs, load_status } = useSessionContext()
  const { data: session } = useSession()

 
  if (load_status == 'loading') return <Loading /> 
  if (!GGBs) return notFound()

  return (
    <div className='flex w-full flex-col items-center justify-center space-y-4 pt-20'>
      
          <p>This is bake pages {GGBs_id}</p>
          <p>{`${user?.username}'s Gingerbreads Kitchen`}</p>
          {session?.user?.link_id === GGBs_id && <BakeMeComponents />}
      
    </div>
  )
}
