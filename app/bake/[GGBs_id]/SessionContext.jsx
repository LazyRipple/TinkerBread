import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'


const SessionContext = createContext(undefined)
export const BakeSessionProvider= ({ children }) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [GGBs, setGGBs] = useState<any | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      if (status === 'authenticated' && session?.user?.link_id) {
        const userRes = await fetch(`/api/user/${session.user.link_id}`)
        const userData = await userRes.json()
        setUser(userData?.data ?? null)

        if (userData?.data?.GGBs_id) {
          const GGBRes = await fetch(`/api/gingerbreads/${userData.data.GGBs_id}/me`)
          const GGBData = await GGBRes.json()
          setGGBs(GGBData?.data ?? null)
        }
      }
    }

    fetchUser()
  }, [status, session?.user?.link_id])

  return <BakeSessionProvider.Provider value={{ session, status, user, GGBs }}>{children}</BakeSessionProvider.Provider>
}

export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider')
  }
  return context
}
