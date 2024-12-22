import Link from 'next/link'

export function BackButton() {
  return (
    <Link href={'/bake/me'} className='absolute left-3 top-3 font-semibold hover:underline'>
      Back
    </Link>
  )
}
