'use client'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { useSession} from "next-auth/react"
import { BakeMeComponents } from "@/components/BakeMeComponents"
import { useSessionContext , BakeSessionProvider} from './SessionContext'

export default function Page() {
  const { GGBs_id } = useParams()
  const {data:session, status} = useSession()
  const { user, GGBs, load_status } = useSessionContext();

  if (load_status === "loading") return <div>Loading...</div>
  
  return (
    <BakeSessionProvider>
      <div className='flex w-full flex-col items-center justify-center space-y-4 pt-20'>
      <p>This is bake pages {GGBs_id}</p>
      <p>{`${user?.username}'s Gingerbreads Kitchen`}</p>
      { session.user.link_id == GGBs_id && <BakeMeComponents />}

      </div>
      
    </BakeSessionProvider>
  )
}
