'use client'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'


export default function Page() {
  const { GGBs_id } = useParams()
  
  // TODO : if no GGBs_id send to 404
  const found_GGBs = true
  if (!found_GGBs) {
		return notFound()
	}
  return (
    <>
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5'>
      This is bake pages {GGBs_id}
      </div>
    </>
  )
}
