//'use client'
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

import { PencilSquareIcon } from '@heroicons/react/24/solid';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link'
import { Button } from "@tremor/react";
import { getDataItem } from '../utils/data-get-item'


interface PageData {
  Id: number;
  WebPageId: string;
  PageName: string;
  targetURI: string;
  MainObject: string;
  MainQuery: string;
  ViewSet: string;
  APIName: string;
  Created: string;
  LastUpdated: string;
  PageType: string;
  CognitoClientId: string;
  recordId: string;
  DisplayViewSet: string;
  companyId : string;
  accessToken : string;

}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export default async function ObjectTable({ objectData } : { objectData: PageData }) {
  const active = true
 const displayViewSet = objectData.DisplayViewSet.split('|');
 //console.log(displayViewSet);
 const apiViewSet = objectData.ViewSet.split('|');
 const buttonData = {
  active : true
 }
 const pageInitData1  = await getDataItem(`${process.env.DATA_CLIENT_API}${objectData.MainQuery.replace("{companyId}",objectData.companyId)}`,objectData.accessToken ); //TODO pass user.cognitoclientId
   const [responseData] = await Promise.all([pageInitData1])
 //console.log(apiViewSet);
 //const session = await getServerSession(authOptions);
 if (!objectData.accessToken) return (  <Button  variant="secondary" onClick={() => signIn('cognito')} >
 Please Sign In
  </Button> )
 //const { accessToken } = session;
 
 console.log(responseData);
 
 if (!responseData) return (

  <Button  variant="secondary" onClick={() => signIn('cognito')} >
          Please Sign In
        </Button>


 )

 
 

 //happy path response
  return (
    <Table >
      <TableHead>
        <TableRow>
        <TableHeaderCell key={"00"}></TableHeaderCell>
        {displayViewSet.map((label, index) => (
          <TableHeaderCell key={index}>{label}</TableHeaderCell>
        ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {responseData.response.map((objectRecord, index) => (
         
         <TableRow key={'row' + objectRecord[objectData.recordId]} className='odd:bg-white even:bg-slate-50'>
            <TableCell key={'cell'+ objectRecord[objectData.recordId] + index}>
            <Link 
            key={objectRecord[objectData.recordId]}
            href={objectData.targetURI.replace("{id}",objectRecord[objectData.recordId])}
            className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    
                    <PencilSquareIcon
            className="mr-3 h-4 w-4 text-gray-400"
            aria-hidden="true"
          /> </Link>

            </TableCell>
            {displayViewSet.map((label, vindex) => (
              <TableCell key={label+vindex}>{objectRecord[apiViewSet[vindex]]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>   
    </Table>
  );
}
