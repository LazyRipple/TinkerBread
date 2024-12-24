'use client'

import React, { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import { useSession, status } from 'next-auth/react'
import Loading from '../Loading'
import { BakeSessionProvider, useSessionContext } from './SessionContext'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import { Canvas } from '@react-three/fiber'
import { handdleAddItem } from '@/components/BakeFriendComp'
import '@/style/bake.css'
import { Snow } from '@/components/Snow.jsx'
import { CameraController } from '@/components/CameraController.jsx'
import { Scene } from '@/components/Scene.jsx'
import { Gingerbread } from '@/components/Gingerbread.jsx'
import { Arrow3D } from '@/components/Arrow'
import { modelInstances } from '@/components/BakeFriendComp'

export default function Page() {
  const { friend_link_id } = useParams()
  if (status === 'unauthenticated') {
    return notFound()
  }
  return (
    <BakeSessionProvider>
      <BakePage friend_link_id={friend_link_id} />
    </BakeSessionProvider>
  )
}

export function BakePage({ friend_link_id }) {
  // Mode state
  const { GGBs, load_status } = useSessionContext(friend_link_id)
  const { data: session } = useSession()
  const [selectedMode, setSelectedMode] = useState('inspect') // inspect, view, choosePos, chooseDress, message, thankyou
  const [focusedIndex, setFocusedIndex] = useState(null)
  const [canDecorateIndex, setCanDecorateIndex] = useState(0)

  const handleClick = (index) => {
    // console.log('Clicked index:', index);
    // console.log('Current mode before click:', selectedMode);

    // console.log(`can decorate index = ${canDecorateIndex}`);

    recalculateIndex()

    if (selectedMode !== 'inspect') {
      // console.log(`Gingerbread ${index} clicked in ${selectedMode} mode!`);
      return
    }

    setFocusedIndex(index)
    setSelectedMode('view')

    // console.log(`Gingerbread ${index} clicked and mode changed to view`);
  }

  const handleBack = () => {
    // console.log('Handle back clicked, current mode:', selectedMode);

    setFocusedIndex(null)
    setSelectedMode('inspect')
    setSelectedPart(null)
    setMessage(null)
    setSelectedDress(null)

    setTempPartsInGingerBread(JSON.parse(JSON.stringify(partsInGingerbread)))

    // console.log('Mode changed to inspect');
  }

  const handleGetDecorated = () => {
    if (focusedIndex !== canDecorateIndex) return
    setSelectedMode('choosePos')
  }

  const handleSelectPart = (part) => {
    // console.log("Part selected:", part);
    setSelectedPart(part)
    setSelectedMode('chooseDress')
    setTempPartsInGingerBread(JSON.parse(JSON.stringify(partsInGingerbread)))
  }

  const handleSelectDress = (dress) => {
    setSelectedDress(dress)
    updateSelectDress({ index: focusedIndex, part: selectedPart, dress: dress })
  }

  const updateSelectDress = ({ index, part, dress }) => {
    if (!dress) return
    // console.log('called');
    // console.log('index = ', index);

    const updatedParts = { ...tempPartsInGingerbread }
    updatedParts[index][part] = dress
    setTempPartsInGingerBread(updatedParts)
  }

  const handleConfirmDress = () => {
    setSelectedMode('message')
  }

  const handleSendMessage = () => {
    setSelectedMode('thankyou')
    // save to database
    const itemName = selectedDress
    const tempL = selectedPart.split(' ')
    const position = `${tempL[0]}${focusedIndex + 1}${tempL.length > 1 ? '_' + tempL[1] : ''}`
    const id = GGBs.items[3 * currentPage + focusedIndex].ggbId
    const res = handdleAddItem(session, id, GGBs.GGBs_id, itemName, position, message)
    if (res == 'success') {
      setPartsInGingerBread(JSON.parse(JSON.stringify(tempPartsInGingerbread)))
      GGBs.is_decorate = 'T'
    } else {
      setTempPartsInGingerBread(JSON.parse(JSON.stringify(partsInGingerbread)))
    }
  }

  const handleInputChange = (event) => {
    setMessage(event.target.value)
  }

  // choose parts
  const [currentPage, setCurrentPage] = useState(0)
  const gingerbreadsPerPage = 3

  let getParts = (page) => {
    const startIndex = page * gingerbreadsPerPage
    const endIndex = startIndex + gingerbreadsPerPage
    const selectedItems = []

    const initialParts = []
    selectedItems.forEach((item) => {
      initialParts.push(item.item)
    })

    return initialParts
  }

  useEffect(() => {
    if (GGBs == null) return
    getParts = (page) => {
      const startIndex = page * gingerbreadsPerPage
      const endIndex = startIndex + gingerbreadsPerPage
      const selectedItems = GGBs.items.slice(startIndex, endIndex)

      const initialParts = []
      selectedItems.forEach((item) => {
        initialParts.push(item.item)
      })

      return initialParts
    }
    setPartsInGingerBread(getParts(currentPage))
    setTempPartsInGingerBread(getParts(currentPage))
  }, [GGBs])

  const parts = ['head', 'left hand', 'right hand']
  const [partsInGingerbread, setPartsInGingerBread] = useState(getParts(currentPage)) // parts that already been saved
  const [tempPartsInGingerbread, setTempPartsInGingerBread] = useState(JSON.parse(JSON.stringify(partsInGingerbread)))

  const [selectedPart, setSelectedPart] = useState(null)
  const [selectedDress, setSelectedDress] = useState(null)
  const [message, setMessage] = useState('')

  const dressOptions = {
    head: ['christmas_hat', 'reindeer', 'earpuff'],
    'left hand': ['candy', 'red_present', 'cup'],
    'right hand': ['candy2', 'christmas_tree', 'green_present'],
  }

  const recalculateIndex = () => {
    for (const part of Object.values(partsInGingerbread[canDecorateIndex])) {
      if (part === null) return
    }
    setCanDecorateIndex((prev) => prev + 1)
  }

  const isThisCanDecorate = (index) => {
    const tmp = currentPage * gingerbreadsPerPage + index
    return tmp === canDecorateIndex
  }

  function isPartFull(part) {
    return partsInGingerbread[focusedIndex][part] !== null
  }

  const handlePrev = () => {
    setCurrentPage((prevPage) => {
      if (prevPage > 0) {
        const newPage = prevPage - 1
        setPartsInGingerBread(getParts(newPage))
        setTempPartsInGingerBread(getParts(newPage))
        return newPage
      }
      return prevPage
    })
  }

  const handleNext = () => {
    // console.log('next');

    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1
      if (newPage * gingerbreadsPerPage < GGBs.items.length) {
        setPartsInGingerBread(getParts(newPage))
        setTempPartsInGingerBread(getParts(newPage))
        return newPage
      }
      return prevPage
    })
  }

  const hasPrev = currentPage > 0
  const [hasNext, setHasNext] = useState(false)
  useEffect(() => {
    if (GGBs == null) return
    const next = currentPage < Math.ceil(GGBs.items.length / gingerbreadsPerPage) - 1
    setHasNext(next)
  }, [GGBs, currentPage])

  const canDisplayPrev = hasPrev && selectedMode === 'inspect'
  const canDisplayNext = hasNext && selectedMode === 'inspect'

  if (load_status == 'loading') return <Loading />
  if (!GGBs) return notFound()
  return (
    <div className='gradient-container relative flex size-full min-h-screen flex-col gap-6 bg-blue-50  text-blue-800 shadow-lg'>
      <Toaster />
      <p className='absolute top-16 z-30 w-full text-center font-bold text-white'>{`${GGBs?.owner}'s TinkerBreads`}</p>
      <Canvas>
        <ambientLight intensity={4.5} />
        {/* <ambientLight color={'#ffa35c'} intensity={1} /> */}
        <Snow count={500} area={{ x: [-5, 5], y: [-5, 10], z: [-15, -2] }} />
        <Scene />

        {modelInstances.map((instance, index) => (
          <Gingerbread
            key={index}
            ggbType={GGBs.ggbType}
            instance={instance}
            index={index}
            handleClick={handleClick}
            tempAccessoryOfThis={tempPartsInGingerbread}
            selectedPart={selectedPart}
            selectedDress={selectedDress}
            updateSelectDress={updateSelectDress}
          />
        ))}

        <CameraController focusedIndex={focusedIndex} modelInstances={modelInstances} />
        {/* <OrbitControls /> */}
        {canDisplayPrev && (
          <Arrow3D
            key={'prev'}
            arrow={'prev'}
            position={[4.75, 0, 0.2]}
            rotation={[0, (Math.PI * 3) / 2, 0]}
            onClick={handlePrev}
          />
        )}
        {canDisplayNext && (
          <Arrow3D
            key={'next'}
            arrow={'next'}
            position={[6.3, 0, 0.2]}
            rotation={[0, (Math.PI * 3) / 2, 0]}
            onClick={handleNext}
          />
        )}
      </Canvas>

      {/* Home */}
      {selectedMode === 'inspect' && (
        <Link href={'/'} className='absolute left-3 top-3 font-semibold hover:underline'>
          <button
            className='absolute left-3 top-3 size-12 rounded-full border-2 border-white bg-red-800 p-3 text-white shadow-lg transition duration-300 hover:bg-red-900'
            onClick={handleBack}
          >
            <img src='/icon/home.webp' alt='Home' className='size-full' />
          </button>
        </Link>
      )}

      {/* Back */}
      {selectedMode !== 'inspect' && (
        <button
          className='absolute left-3 top-3 size-12 rounded-full border-2 border-white bg-red-800 p-3 text-white shadow-lg transition duration-300 hover:bg-red-900'
          onClick={handleBack}
        >
          <img src='/icon/back.webp' alt='Back' className='size-full' />
        </button>
      )}

      {selectedMode === 'view' && GGBs.is_decorate == 'F' && isThisCanDecorate(focusedIndex) && (
        <div className='absolute left-7 top-20 w-80 rounded-xl border-2 border-white bg-[#FFD889] p-5 text-pink-900 shadow-lg'>
          <p className='mb-4 text-center text-lg font-semibold'>
            Ready to help dress up your friend&apos;s gingerbread? 🎄🍪
          </p>
          <button
            className='mx-auto block rounded-lg bg-green-700 px-5 py-2 text-white shadow-md transition duration-300 hover:bg-green-800'
            onClick={handleGetDecorated}
          >
            Yes, Let&apos;s Go! 🌟
          </button>
        </div>
      )}

      {selectedMode === 'choosePos' && (
        <div className='absolute left-5 top-20 z-10 w-72 rounded-xl border-2 border-white bg-[#FFD889] p-4 text-pink-900 shadow-lg'>
          {/* Title */}
          <p className='mb-4 text-center text-lg font-semibold'>Choose your position 🎨</p>

          {/* Position selection buttons */}
          <div className='flex flex-col items-center justify-center gap-2'>
            {parts.map((part, index) => {
              return (
                !isPartFull(part) && (
                  <button
                    key={index}
                    onClick={() => handleSelectPart(part)}
                    className='w-full rounded-lg bg-green-700 p-2 text-white shadow-md transition duration-300 hover:bg-green-800'
                  >
                    {part}
                  </button>
                )
              )
            })}
          </div>
        </div>
      )}

      {selectedMode === 'chooseDress' && selectedPart && (
        <div className='absolute left-5 top-20 z-10 w-60 rounded-xl border-2 border-white bg-[#FFD889] p-4 text-pink-900 shadow-lg'>
          {/* Title */}
          <div className='mb-4 text-center text-lg font-semibold'>{`Choose an accessory 🎨`}</div>

          {/* Dress options */}
          <div className='flex w-full flex-col items-center justify-center gap-3'>
            {dressOptions[selectedPart].map((dress) => (
              <button
                key={dress}
                onClick={() => handleSelectDress(dress)}
                className={`w-full rounded-lg p-2 shadow-md transition duration-300 ${
                  dress === selectedDress
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
              >
                {dress}
              </button>
            ))}
          </div>

          {/* Confirm button */}
          <button
            className='mx-auto mt-4 block w-full rounded-lg bg-red-700 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-red-800'
            onClick={handleConfirmDress}
          >
            Confirm 🌟
          </button>
        </div>
      )}

      {selectedMode === 'message' && (
        <div className='absolute left-5 top-20 z-10 w-60 rounded-xl border-2 border-white bg-[#FFD889] p-4 text-pink-900 shadow-lg'>
          {/* Title */}
          <div className='mb-3 text-center text-lg font-semibold'>Send some messages🎄</div>

          {/* Message input area */}
          <textarea
            className='h-32 w-full resize-none rounded-md border-2 border-pink-900 p-3 text-pink-900 placeholder:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-700'
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= 100) {
                handleInputChange(e)
              }
            }}
            placeholder='Type your message here...'
          />

          {/* Send button */}
          <button
            className='mx-auto mt-4 block rounded-lg bg-green-700 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-green-800'
            onClick={handleSendMessage}
          >
            Send 🌟
          </button>
        </div>
      )}

      {selectedMode === 'thankyou' && (
        <div className='absolute left-7 top-20 w-80 rounded-xl border-2 border-white bg-[#FFD889] p-5 text-pink-900 shadow-lg'>
          <p className='mb-4 text-center text-lg font-semibold'>{GGBs.thanks_message}</p>
          <button
            className='mx-auto block rounded-lg bg-green-700 px-5 py-2 text-white shadow-md transition duration-300 hover:bg-green-800'
            onClick={handleBack}
          >
            Back to kitchen
          </button>
        </div>
      )}
    </div>
  )
}
