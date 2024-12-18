'use client'
import { Button } from "@/components/Button"
import Link from "next/link"


export default function Page() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center space-y-4 pt-20">
        <h1 className="font-bold">This is Home</h1>
      
        <div className="flex flex-col space-y-4">
        <Button text="google login" />
        <Link href="/signin">
            <Button text="sign in" />
        </Link>
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
