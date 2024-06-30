"use client"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function SubmitButton() {
    const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending} disabled={pending} className='px-3 rounded-lg text-white bg-ctgreen hover:bg-cthovergreen active:bg-ctgreen focus:outline-none focus:ring focus:ring-ctgreen'>
      Save
    </button>
  )
}