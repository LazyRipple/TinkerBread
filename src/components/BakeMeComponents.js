'use client'
import { signOut } from 'next-auth/react'
import { VisitFriendButton } from '@/components/VisitFriendButton'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import Link from 'next/link'

export function BakeMeComponents({ shareLink }) {
  const router = useRouter()
  return (
    <div className='flex flex-col space-y-4'>
      <VisitFriendButton />
      <Link href='/setting'>
        <Button text='Setting' />
      </Link>
      <button
        onClick={() => {
          signOut()
          router.push('/')
        }}
      >
        <Button text='Sign Out' />
      </button>

      <button
        onClick={() => {
          toast.success(`copied link: "${shareLink}"`)
          const link = `http://localhost:3000/bake/${shareLink}`
          navigator.clipboard.writeText(link)
        }}
      >
        <Button text='Copy Share Link' />
      </button>
    </div>
  )
}
