import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import FormView from "../../../form";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../pages/api/auth/[...nextauth]"
import { getItem } from '../../../../utils/layout-get-item'
import SignInComponent from '../../../signincomponent';
export default async function ViewPage({
  params,
  searchParams
}: {
  params: { apiname: string, id : string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
    
    const session = await getServerSession(authOptions);
    if (!session) return <SignInComponent />
   
    
    const apiname = params.apiname
    const recordId = params.id
    if (!apiname) return <div>Failed to load </div>
  
    const pageInitData  = await getItem(params.apiname);
    const [pageData] = await Promise.all([pageInitData])  
      
      if (!pageData) return <p>No Data , review config!</p>
      var formParams = pageData.response[0];
      formParams.idValue = recordId;
      formParams.companyId = session.companyId;
     

        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                 <Title>{pageData.response[0].PageName}</Title>
                
             <Card className="mt-6">
               <FormView objectData={formParams} />
             </Card>
       
            </main>
           );
    
     
   
}