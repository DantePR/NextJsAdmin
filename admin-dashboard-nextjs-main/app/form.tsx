//'use client'
//'use server'
import {
  Table,
  Divider,
  SearchSelectItem,
  SearchSelect,
  SelectItem,
  Select,
  TextInput,
  Text
} from '@tremor/react';
import { Flex } from "@tremor/react";


import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { Card, List, ListItem, Title } from "@tremor/react";
import { Button } from "@tremor/react";
import { signIn, signOut } from 'next-auth/react';
import SelectOptions from './selectOptions';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { getDataItem } from '../utils/data-get-item'
import ReturnButton from './returnbutton'
import SubmitButton from './submitbutton'
import { saveObject } from '../utils/actions'
  
interface FormViewData {
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
  idValue : string;
  TypeViewSet : string;
  CancelReturn : string;
  CommitReturn : string;
  CreateTarget : string;
  DefaultValues : string;
  companyId : string
}

export default async function FormView({ objectData } : { objectData: FormViewData}) {
   
 const displayViewSet = objectData.DisplayViewSet.split('|');
 //console.log(displayViewSet);
 const apiViewSet = objectData.ViewSet.split('|');
 const typeViewSet = objectData.TypeViewSet.split('|');
console.log('########');
console.log(objectData);
 //console.log(`apiViewSet ${apiViewSet}`);
 //console.log(`typeViewSet ${typeViewSet}`);
//const { data: session, status } = useSession();
 const session = await getServerSession(authOptions);
 if (!session) return <div><a href="/pages/api/auth/signin">Sign in</a> </div>
 
 const urlPostTarget = `${process.env.DATA_CLIENT_API}${objectData.targetURI.replace("{companyId}",objectData.companyId)}`

 const accessToken  = session.accessToken;
 if (!accessToken) return <div><a href="/pages/api/auth/signin">Sign in</a> </div>
 if (objectData.idValue){ // its update
  const urlTarget = `${process.env.DATA_CLIENT_API}${objectData.MainQuery.replace("{companyId}",objectData.companyId).replace("{recordId}",objectData.idValue)}` 
    const pageInitData1  =  await getDataItem(urlTarget,accessToken ); //TODO pass user.cognitoclientId
    const [responseData] = await Promise.all([pageInitData1])
   
   
  
  //  if (!responseData.response) return (  <Button  variant="secondary" onClick={() => signIn('cognito')} >
 //Please Sign In
//</Button> )
    const objectRec = responseData.response[0];
   
    return (
        <Card className="max-w-m">
        <Title>{objectData.PageName}</Title>
        <Divider />
        <div className="text-center sm:text-left">
        <form action={saveObject}>
            <input type="hidden" name="cancelTarget" id="cancelTarget" value={objectData.CancelReturn} />
            <input type="hidden" name="objectTarget" id="objectTarget" value={urlPostTarget} />
            <input type="hidden" name="objectId" id="objectTarget" value={objectData.idValue} />
            <input type="hidden" name="objectKey" id="key" value={objectData.recordId} />
            <input type="hidden" name="viewSet" id="viewSet" value={objectData.ViewSet} />
            <input type="hidden" name="defaultValues" id="viewSet" value={objectData.DefaultValues} />
            {displayViewSet.map((item, index) => (
              
             <div className="block" key={'row' +index}>
                <span className="block text-sm font-medium text-slate-700" key={'column1' + index}>{item}</span>
                
                
                {
                  typeViewSet[index] == "IText" &&  <input className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-50' defaultValue={objectRec[apiViewSet[index]]} key={apiViewSet[index]} name={apiViewSet[index]} id={apiViewSet[index]} placeholder='Enter Value ...'/> 
               }
                {
                  typeViewSet[index] == "RText" &&  <input  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-50' defaultValue={objectRec[apiViewSet[index]]} key={apiViewSet[index]} id={apiViewSet[index]} name={apiViewSet[index]} disabled={true}/> 
               }
               {
                  typeViewSet[index] == "Flag" &&   <select className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-50' name={apiViewSet[index]} key={apiViewSet[index]} id={apiViewSet[index]} defaultValue={objectRec[apiViewSet[index]]} ><option value="" key={item+"sel"} >Select ...</option>
                  <option value="1" key={item+"yes"} >Yes</option>
                  <option value="0" key={item+"No"} >No</option>
                  
                   </select>
               }
               {  typeViewSet[index].includes(":")  && <select className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-50' name={apiViewSet[index]} key={apiViewSet[index]} id={apiViewSet[index]} defaultValue={objectRec[apiViewSet[index]]}><option value="" key={item+"sel2"} >Select ...</option>{typeViewSet[index].split(':').map((itemx, indexx) => (
                                                       <option key={item+itemx} value={itemx}>{itemx}</option> 

                                                    ))}</select>
               }   
               {  typeViewSet[index].includes("#")  && <SelectOptions  params ={ {"objectName" : typeViewSet[index].split('#')[0], "fieldName": typeViewSet[index].split('#')[1], "fieldId" : typeViewSet[index].split('#')[2] , "selectedVal" : objectRec[apiViewSet[index]] , "accessToken" : accessToken , "keyField" : apiViewSet[index], "companyId" : objectData.companyId } }/>
               }
                </div>
                
            
             
           ))}  
           <div className="flex flex-row py-3" >
           <div className="basis-1/4" >
               
           </div>
           <div className="basis-1/4" >
               <ReturnButton retURL={objectData.CancelReturn} label='Close'/>
           </div>
           <div className="basis-1/4" >
           <SubmitButton/>
               </div>

               <div className="basis-1/4" >
               
               </div>
          </div>

       </form>
       


       
        </div>
       
       
       
      </Card>
     );

    } // end if id present
    else {
        
      //INSERT 

      return (
        <Card className="max-w-m">
        <Title>{objectData.PageName}</Title>
        <Divider />
        <div className="text-center sm:text-left">
        <form action={saveObject}>
            <input type="hidden" name="cancelTarget" id="cancelTarget" value={objectData.CancelReturn} />
            <input type="hidden" name="objectTarget" id="objectTarget" value={urlPostTarget} />
            <input type="hidden" name="objectKey" id="key" value={objectData.recordId} />
            <input type="hidden" name="viewSet" id="viewSet" value={objectData.ViewSet} />
            <input type="hidden" name="defaultValues" id="viewSet" value={objectData.DefaultValues} />
            {displayViewSet.map((item, index) => (
              
             <div className="block" key={'row' +index}>
                <span className="block text-sm font-medium text-slate-700" key={'column1' + index}>{item}</span>
                
                
                {
                  typeViewSet[index] == "IText" &&  <input className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-50'  key={apiViewSet[index]} name={apiViewSet[index]} id={apiViewSet[index]} placeholder='Enter Value ...'/> 
               }
                
               {
                  typeViewSet[index] == "Flag" &&   <select className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-50' name={apiViewSet[index]} key={apiViewSet[index]} id={apiViewSet[index]}  ><option value="" key={item+"sel"} >Select ...</option>
                  <option value="1" key={item+"yes"} >Yes</option>
                  <option value="0" key={item+"No"} >No</option>
                  
                   </select>
               }
               {  typeViewSet[index].includes(":")  && <select className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                  invalid:border-pink-500 invalid:text-pink-600
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-50' name={apiViewSet[index]} key={apiViewSet[index]} id={apiViewSet[index]} ><option value="" key={item+"sel2"} >Select ...</option>{typeViewSet[index].split(':').map((itemx, indexx) => (
                                                       <option key={item+itemx} value={itemx}>{itemx}</option> 

                                                    ))}</select>
               }   
               {  typeViewSet[index].includes("#")  && <SelectOptions  params ={ {"objectName" : typeViewSet[index].split('#')[0], "fieldName": typeViewSet[index].split('#')[1], "fieldId" : typeViewSet[index].split('#')[2] , "selectedVal" : "" , "accessToken" : accessToken , "keyField" : apiViewSet[index], "companyId" : objectData.companyId } }/>
               }
                </div>
                
            
             
           ))}  
           <div className="flex flex-row py-3" >
           <div className="basis-1/4" >
               
           </div>
           <div className="basis-1/4" >
               <ReturnButton retURL={objectData.CancelReturn} label='Close'/>
           </div>
           <div className="basis-1/4" >
           <SubmitButton/>
               </div>

               <div className="basis-1/4" >
               
               </div>
          </div>

       </form>
       


       
        </div>
       
       
       
      </Card>
     );

    } // else no id insert
    
    
}
