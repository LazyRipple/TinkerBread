import { createContext, useContext, useEffect, useState } from 'react'
import { useSession, status } from 'next-auth/react'

const SessionContext = createContext(undefined)
export const BakeSessionProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [GGBs, setGGBs] = useState(null)
  const [load_status, setLoadStatus] = useState('loading')
  useEffect(() => {
    const fetchUser = async () => {      
      if (status === 'authenticated' && session?.user?.link_id) {
        try {
          const userRes = await fetch(`/api/user/${session.user.link_id}`)
          const userData = await userRes.json()
          setUser(userData?.data ?? null)
          
          if (userData?.data?.GGBs_id) {
            const GGBRes = await fetch(`/api/gingerbreads/${userData.data.GGBs_id}/me`)
            const GGBData = await GGBRes.json()
            
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

export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionContext must be used within a BakeSessionProvider')
  }
  return context
}