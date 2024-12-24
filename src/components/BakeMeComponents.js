'use client'
import { VisitFriendButton } from '@/components/VisitFriendButton'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import Link from 'next/link'

export function BakeMeComponents({ shareLink }) {
  const router = useRouter()
  return (
    <div className='flex flex-col space-y-2'>
      <VisitFriendButton />
      <Link href='/setting'>
        <Button text='Setting' />
      </Link>
    </div>
  )
}
