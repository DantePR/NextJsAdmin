"use client"
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/solid';
export default function ReturnButton({retURL, label} : {retURL : string, label : string}) {
     const router = useRouter();  
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> , url: string) => {
       
        e?.preventDefault();
        //alert('clicked ' + url);
       router.push(url);
      };
   if (label == 'Add'){

    return (
        <button className='px-3 rounded-lg text-white bg-ctgreen hover:bg-cthovergreen active:bg-ctgreen focus:outline-none focus:ring focus:ring-ctgreen'  onClick={(e) => handleClick(e, retURL)} > {label}</button>
    )

   } else 
   {
    return (
        <button className='px-3 rounded-lg shadow-lg hover:shadow-xl active:bg-ctgreen focus:outline-none focus:ring focus:ring-ctgreen'  onClick={(e) => handleClick(e, retURL)} > {label}</button>
    )  
  
   }
    
}