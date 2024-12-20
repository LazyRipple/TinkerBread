'use client'
import Link from "next/link"
import { Button } from "@/components/Button"
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { VisitFriendButton } from "@/components/visitFriendButton";
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react';


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
      
      {
        session.user.link_id == GGBs_id ? 
          (
          <div className="flex flex-col space-y-4">
          <VisitFriendButton />
            <Link href="/setting">
                <Button text="Setting" />
            </Link>
          <button
            onClick={()=> {signOut()}}>
              <Button text="Sign Out" />
          </button>
          </div>
          ) :
          <p>no me</p>
      }
      
      </div>
      
    </>
  )
}
