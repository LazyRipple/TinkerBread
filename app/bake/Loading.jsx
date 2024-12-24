import '@/style/bake.css'
export default function Loading() {
  return (
    <div className='gradient-container relative flex size-full min-h-screen flex-col items-center justify-center gap-6 bg-red-900 p-8 text-blue-800 shadow-lg '>
      <div className='flex animate-bounce flex-col items-center justify-center space-y-4 pt-20 text-lg font-semibold text-white'>
        Prepare kitchen to bake the TinkerBreads
      </div>
    </div>
  )
}
