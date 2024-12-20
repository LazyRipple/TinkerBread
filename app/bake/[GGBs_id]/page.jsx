'use client'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { useSession} from "next-auth/react"
import { BakeMeComponents } from "@/components/BakeMeComponents"


export default function Page() {
  const { GGBs_id } = useParams()
  const {data:session} = useSession()
  
  
  // TODO : if no GGBs_id send to 404
  const found_GGBs = true
  if (!found_GGBs) {
		return notFound()
	}
  return (
    <>
      <div className='flex w-full flex-col items-center justify-center space-y-4 pt-20'>
      <p>This is bake pages {GGBs_id}</p>
      
      { session.user.link_id == GGBs_id && <BakeMeComponents />}
      
      </div>
      
    </>
  )
}
