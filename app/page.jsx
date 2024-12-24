'use client'
import { Button } from '@/components/Button'
import Link from 'next/link'
import { GoogleSignInButton } from '@/components/GoogleSignInButton'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { TutorialModal } from '@/components/Tutorial'
import { CreditsModal } from '@/components/Credits'
import { signOut } from 'next-auth/react'
export default function Page() {
  const [isModalVisible, setModalVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { data: session, status } = useSession()

  return (
    <>
      <video autoPlay muted loop playsInline className='bg-video'>
        <source src='/Tinkerbread_home.mp4' type='video/mp4' />
      </video>
      <div className='relative flex size-full min-h-screen flex-col items-center justify-center gap-6 overflow-visible text-white shadow-lg'>
        <div
          className='my-3 animate-bounce text-4xl font-bold tracking-wider text-white'
          style={{ animationDuration: '1.5s' }}
        >
          Tinkerbread
        </div>
        {status == 'authenticated' ? (
          <Link href={`/bake/me`}>
            <button className='w-44 rounded-xl border-2 border-white bg-red-800 px-4 py-2 text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-[#FFD889] hover:text-red-800 hover:shadow-xl focus:outline-none'>
              My TinkerBread
            </button>
          </Link>
        ) : (
          <GoogleSignInButton />
        )}

        <button
          onClick={() => setModalVisible(true)}
          className='w-44 rounded-xl border-2 border-white bg-red-800 px-4 py-2 text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-[#FFD889] hover:text-red-800 hover:shadow-xl focus:outline-none'
        >
          Tutorial
        </button>
        <button
          onClick={() => setShowModal(true)}
          className='w-44 rounded-xl border-2 border-white bg-red-800 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-[#FFD889] hover:text-red-800'
        >
          Credits
        </button>
        {status == 'authenticated' && (
          <button
            onClick={() => signOut()}
            className='w-44 rounded-xl border-2 border-white bg-red-800 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-[#FFD889] hover:text-red-800'
          >
            signOut
          </button>
        )}
      </div>

      <TutorialModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} tutorialPages={tutorialPages} />

      {showModal && <CreditsModal onClose={() => setShowModal(false)} />}
    </>
  )
}

const tutorialPages = [
  {
    topic: 'Make a gingerbread.',
    description: 'Create your little gingerbread character.',
    image: '/images/tutorial1.png',
  },
  {
    topic: 'Share your ID.',
    description: 'Hit ‘Copy ID’ and send it to your friend.',
    image: '/images/tutorial2.png',
  },
  {
    topic: 'Visit your friend’s kitchen.',
    description: 'Got their ID? Paste it into the box and check out their kitchen!',
    image: '/images/tutorial3.png',
  },
  {
    topic: 'Decorate their gingerbread.',
    description: 'Pick a gingerbread,  some cute accessories, and send a message!',
    image: '/images/tutorial3.png',
  },
  {
    topic: 'Check your kitchen.',
    description: 'Messages show up in your kitchen. Click on the accessories to see them!',
    image: '/images/tutorial3.png',
  },
  {
    topic: 'Bake more gingerbread!',
    description:
      'If all of your gingerbread is fully dressed , hit ‘Bake More’ to make a new one. You can see it by clicking on the gloves!',
    image: '/images/tutorial3.png',
  },
]
