"use client"
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { signIn, signOut } from 'next-auth/react';
export default function SignInOutButton({label, type, provider} : {label : string, type : string, provider : string}) {
     const router = useRouter();  
    
if (type == 'SIGNOUT') {

    return (
        <button className='px-3 rounded-lg text-white bg-ctgreen hover:bg-cthovergreen active:bg-ctgreen focus:outline-none focus:ring focus:ring-ctgreen'   onClick={() => signOut()} > {label}</button>
    )

} else 
{
    return (
        <button className='px-3 rounded-lg text-white bg-ctgreen hover:bg-cthovergreen active:bg-ctgreen focus:outline-none focus:ring focus:ring-ctgreen'   onClick={() => signIn(provider)} > {label}</button>
    )

}
    
}