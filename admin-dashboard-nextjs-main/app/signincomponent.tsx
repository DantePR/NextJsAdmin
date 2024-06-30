"use client"
import { useRouter } from 'next/navigation';
import { Card, Title, Text } from '@tremor/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { signIn, signOut } from 'next-auth/react';
import SignInOutButton from './signinbutton';
export default function SignInComponent() {
     const router = useRouter();  
    
     return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
          <Title>Admin Site </Title>
    
         
          
          <div className="shadow-2xl p-4">
          <Text className='py-4'>
           Please Sign in 
          </Text>
          <SignInOutButton label='Sign In' type='SIGNIN' provider='cognito'></SignInOutButton>
          </div>
        </main>
      );
    
}