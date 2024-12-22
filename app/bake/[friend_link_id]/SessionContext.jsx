import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

const SessionContext = createContext(undefined)
export const BakeSessionProvider = ({ children }) => {
  const { friend_link_id } = useParams() 
  const { data: session, status } = useSession()
  const [GGBs, setGGBs] = useState(null)
  const [load_status, setLoadStatus] = useState('loading')
  useEffect(() => {
    const fetchUser = async () => {      
      
      if (status === 'authenticated' && session?.user?.link_id) {
        try {
          const userRes = await fetch(`/api/user/${friend_link_id}`)
          const userData = await userRes.json()          
          
          const GGBRes = await fetch(`/api/gingerbreads/${userData.data.GGBs_id}/${session?.user?.link_id}`)
          const GGBData = await GGBRes.json()
          
          setGGBs(GGBData?.data ?? null)
          setLoadStatus('loaded')
          
          
        } catch (error) {
          setLoadStatus('error')
        }
      }
    }
    fetchUser()
  }, [status, session?.user?.link_id])
  

  return (
    <SessionContext.Provider value={{ session, status, GGBs, load_status }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSessionContext = ({friend_link_id}) => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionContext must be used within a BakeSessionProvider')
  }
  return context
}