
import { getItem } from '../../../utils/layout-get-item'
import { useSearchParams } from 'next/navigation'
import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';

import ObjectTable from "../../table";
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { signIn, signOut } from 'next-auth/react';
import { Button } from "@tremor/react";

import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import ReturnButton from '../../returnbutton'
import Search from '../../search';
import SignInComponent from '../../signincomponent';


export default async function ObjectPage({
  params,
  searchParams
}: {
  params: { apiname: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {


   
   const session = await getServerSession(authOptions);
  
    if (!session ) return <SignInComponent />
    const pageInitData  = await getItem(params.apiname); //TODO pass user.cognitoclientId
   const [pageData] = await Promise.all([pageInitData])
   // if (!searchParams) return <div>Failed to load </div>
    //const apiname = searchParams.get('apiname');
    if (!params.apiname) return<SignInComponent />
   //const { pageData, isLoading, isError } = getObjectData(`${process.env.COGNITO_CLIENT_ID}` ,apiname); //TODO pass user.cognitoclientId
   

     // if (isLoading) return <div>Is Loading ...  </div>
     // if (isError) return <div>Failed to load </div>
      if (!pageData) return <p>No Data , review config!</p>
      var myPageData = pageData.response[0]
      myPageData.companyId = session.companyId
      myPageData.accessToken = session.accessToken
     
      //if (status === "authenticated") {9

        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                 <Title>{pageData.response[0].PageName}</Title>
                 <div>
                 <ReturnButton retURL={myPageData.CreateTarget} label='Add'/>
                 <Search />
                 </div>
             <Card className="mt-6">
               <ObjectTable objectData={myPageData} />
             </Card>
       
            </main>
           );
    //  } // end auth
     // return (  <Button  variant="secondary" onClick={() => signIn('cognito')} >
   //   Please Sign In
  //  </Button> )
   
}