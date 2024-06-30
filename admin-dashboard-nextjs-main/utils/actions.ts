'use server'
import {redirect} from 'next/navigation';
//import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../pages/api/auth/[...nextauth]"
export async function saveObject(formData: FormData) {
 // try {
    console.log("IN SAVEOBJECT")
    //const router = useRouter()
    const objectTarget = formData!.get("objectTarget") as string
    const session = await getServerSession(authOptions);  
    const objectId = formData!.get("objectId") as string
        const returnTarget = formData!.get("cancelTarget") as string
        const key = formData!.get("objectKey") as string
        if (!session) redirect(returnTarget)
        const token =  session.accessToken as string;
        const viewSetstr = formData!.get("viewSet") as string 
        const viewSet = viewSetstr.split('|');
        const defaultValuestr = formData!.get("defaultValues") as string 
        
       
        console.log("formData")
        
       
        //console.log(formData)
        var thisformData = {
           id : objectId,
           key: key,
           fields : [{}]
        }
        var fields = [{}];
        fields.pop();
        for (var fieldName in viewSet) {
            if(formData.get(viewSet[fieldName])) {
               // if (event.target[viewSet[fieldName]].value) {
                  //thisformData[viewSet[fieldName]] = formData.get(viewSet[fieldName])
                  var thisE = {name : viewSet[fieldName] , value : String(formData.get(viewSet[fieldName])) };
                  fields.push(thisE)
               // } 
                
            }
           
           
        }

        if (defaultValuestr) {
          const defaultValue = defaultValuestr.split('|');
          for (var AddField in defaultValue) {
           
            //console.log("AddField")
            var fnStr = defaultValue[AddField] as string
            console.log(fnStr);
            var name = fnStr.split('#')[0];
            var val = fnStr.split('#')[1]; 
            var thisE = {name : name , value : val};
            //console.log(name);
            //console.log(val);
            fields.push(thisE);
  
          }

        }
        
        thisformData.fields = fields;
        console.log("IN thisformData")
        console.log(thisformData)
        
        const response = await fetch(objectTarget, {
          method: 'POST',
          body: JSON.stringify(thisformData),
          
          headers: {
            'x-api-key' : `${process.env.BLACKSTONEAPI}` 
            ,'Content-Type' :  'application/json' 
            ,'Authorization' :  token
          }
        }).then(response => {
          revalidatePath('/')
          redirect(returnTarget)
          //redirect('http://localhost:3000')
      })
 
      // Handle response if necessary
     // const data = await response.json();
     // console.log("my response")
      //console.log(data)
     // const [responseData] = await Promise.all([data])
     //revalidatePath('/')
      //console.log(`redircting ${returnTarget}`)
      
      //router.push(returnTarget);
  //} catch (e) {
    //return { message: 'Failed to create' }
  //  console.log(e)
   // redirect('http://localhost:3000')
  //}
}