import { cache } from 'react'
import 'server-only'
 
async  function getObjectData(){
    const res = await fetch(`${process.env.WEB_CLIENT_API}/${process.env.COGNITO_CLIENT_ID}/topmenu`, {method: 'GET',headers: {
      'x-api-key' :`${process.env.BLACKSTONEAPI}` 
    } })
    const data = await res.json()
     
    return data
  }

export const preload = () => {
  void getMenuItem()
}
 
export const getMenuItem = cache(async () => {
   return await getObjectData()
})