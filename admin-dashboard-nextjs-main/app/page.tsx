'use client'
import { Card, Title, Text } from '@tremor/react';


import { queryBuilder } from '../lib/planetscale';
import Search from './search';
import UsersTable from './table';
import { useSession } from "next-auth/react";
import SignInComponent from './signincomponent';
export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
 
    const users = [{id: 0, name : "Ramon" , username : "RER", email :"ramon.e.ramirez@wellsfargo.com"}, 
                   {id: 1, name : "Ramon 2" , username : "RER", email : "ramon.e.ramirez@wellsfargo.com"}]

    const { data: session, status } = useSession();
    //console.log(session);
    const user  = session?.user;

    if (status === "authenticated") {
      return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
          <Title>Welcome back , {user?.name}</Title>
          <div className="shadow-2xl p-4">
          <Text>
           {user?.email}
          </Text>

          </div>
          
          
        </main>
      );
      
    }

  return (
    <SignInComponent />
  );
}
