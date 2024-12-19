'use client'
import { Button } from "@/components/Button"
import Link from "next/link"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"
import { signIn, useSession } from 'next-auth/react';

export default function Page() {
  const {data:session, status} = useSession()

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center space-y-4 pt-20">
        <h1 className="font-bold">This is Home</h1>
      
        <div className="flex flex-col space-y-4">
        {
          status == 'authenticated' ? 
          (
          <Link href={`/bake/${session.user.link_id}`}>
            <Button text="My TingerBread" />
          </Link>
          )
          :
          <GoogleSignInButton />
        }
        
        
        <Link href="/bake/me">
            <Button text="Bake me" />
        </Link>
        <Link href="/bake/friend">
            <Button text="Bake friend" />
        </Link>
        <Link href="/setting">
            <Button text="setting" />
        </Link>
        </div>
      </div>
    </>
  )
}
