export const FormLoading = () => {
  return (
    <form className='animate-pulse rounded-md bg-white p-6 shadow-md'>
      <div className='mb-4'>
        <label htmlFor='newName'>username</label>
        <input className='w-full rounded border border-gray-300 px-3 py-2' />
      </div>
      <div className='mb-4'>
        <label htmlFor='newMessage'>thanks message</label>
        <input className='w-full rounded border border-gray-300 px-3 py-2' />
      </div>
      <button type='submit' className='mb-4 w-full rounded bg-blue-500 py-2 text-white'>
        Save Change
      </button>
    </form>
  )
}
