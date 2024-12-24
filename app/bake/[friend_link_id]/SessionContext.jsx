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
          const GGBs = GGBData?.data
          const prepData = [
            { ggbId: GGBs.GGB1.id, item: { head:  GGBs.GGB1.head1, 'left hand': GGBs.GGB1.left1_hand, 'right hand': GGBs.GGB1.right1_hand } },
            { ggbId: GGBs.GGB1.id, item: { head:  GGBs.GGB1.head2, 'left hand': GGBs.GGB1.left2_hand, 'right hand': GGBs.GGB1.right2_hand } },
            { ggbId: GGBs.GGB1.id, item: { head:  GGBs.GGB1.head3, 'left hand': GGBs.GGB1.left3_hand, 'right hand': GGBs.GGB1.right3_hand } },
            { ggbId: GGBs.GGB2.id, item: { head:  GGBs.GGB2.head1, 'left hand': GGBs.GGB2.left1_hand, 'right hand': GGBs.GGB2.right1_hand } },
            { ggbId: GGBs.GGB2.id, item: { head:  GGBs.GGB2.head2, 'left hand': GGBs.GGB2.left2_hand, 'right hand': GGBs.GGB2.right2_hand } },
            { ggbId: GGBs.GGB2.id, item: { head:  GGBs.GGB2.head3, 'left hand': GGBs.GGB2.left3_hand, 'right hand': GGBs.GGB2.right3_hand } },
            { ggbId: GGBs.GGB3.id, item: { head:  GGBs.GGB3.head1, 'left hand': GGBs.GGB3.left1_hand, 'right hand': GGBs.GGB3.right1_hand } },
            { ggbId: GGBs.GGB3.id, item: { head:  GGBs.GGB3.head2, 'left hand': GGBs.GGB3.left2_hand, 'right hand': GGBs.GGB3.right2_hand } },
            { ggbId: GGBs.GGB3.id, item: { head:  GGBs.GGB3.head3, 'left hand': GGBs.GGB3.left3_hand, 'right hand': GGBs.GGB3.right3_hand } },
          ]
          setGGBs({
            ggbType : GGBs.GGB_type,
            GGBs_id : GGBs.GGBs_id,
            thanks_message : GGBs.thanks_message,
            GGBs_id : GGBs.GGBs_id,
            is_decorate : GGBs.is_decorate,
            owner : GGBs.owner,
            items:prepData
          })          
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