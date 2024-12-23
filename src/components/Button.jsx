export const Button = (props) => {
  return <div className='flex w-40 items-center justify-center rounded-lg border-2 p-2 font-semibold transition-all hover:-translate-y-2 hover:cursor-pointer'>{props?.text}</div>
}
