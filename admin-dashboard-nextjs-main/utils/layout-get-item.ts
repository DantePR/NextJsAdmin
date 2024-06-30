import { cache } from 'react'
import 'server-only'
 
async  function getObjectData( apiname : string){
    const res = await fetch(`${process.env.WEB_CLIENT_API}/${process.env.COGNITO_CLIENT_ID}/pages?target=${apiname}`, {method: 'GET',headers: {
      'x-api-key' :`${process.env.BLACKSTONEAPI}` 
    } })
    const data = await res.json()
     
    return data
  }

export const preload = (id: string) => {
  void getItem(id)
}
 
export const getItem = cache(async (id: string) => {
   return await getObjectData(id)
})