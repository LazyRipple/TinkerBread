'use client'
import '@/style/bake.css'
import { useState } from 'react'

export default function Test() {
  const [showMessage, setShowMessage] = useState(false)
  return (
    <div className='gradient-container relative flex size-full min-h-screen flex-col items-center justify-center gap-6 bg-red-900 p-4 text-blue-800 shadow-lg '>
      <div className='flex animate-bounce flex-col items-center justify-center pt-20 text-center text-2xl font-semibold text-white'>
        Prepare TinkerBreads Kitchen
      </div>
      <div className='flex flex-col items-center justify-center pt-6 text-center text-sm font-semibold text-white'>
        If the site feels slow, we apologize
      </div>
      <div className='flex flex-col items-center justify-center text-center text-sm font-semibold  text-white'>
        this is a learning project for <span className='text-yellow-300'>educational purposes</span>
      </div>
      <div className='flex max-w-[90%] flex-col items-center justify-center break-words text-center text-sm font-semibold text-white'>
        Thank you for your patience and understanding! 🙏✨
      </div>
      <button
        className='w-48 rounded-xl border-2 border-white bg-red-800 px-4 py-2 text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-[#FFD889] hover:text-red-800 hover:shadow-xl focus:outline-none'
        onClick={() => setShowMessage(!showMessage)}
      >
        Want to load faster?
      </button>
      {showMessage && (
        <div className='flex flex-col space-y-3'>
          <img src='/swappingTabs.gif' />
          <div className='flex max-w-[90%] flex-col items-center justify-center break-words text-center text-sm font-semibold text-white'>
            Try swapping tabs in the browser😢
          </div>
        </div>
      )}
    </div>
  )
}
