'use client'
import { Button } from "@/components/Button"
import Link from "next/link"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"
import { useSession } from 'next-auth/react';

export default function Page() {
  const {data:session, status} = useSession()

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center space-y-4 pt-20">
        <h1 className="font-bold">This is Home</h1>

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
 
      </div>
    </>
  )
}
