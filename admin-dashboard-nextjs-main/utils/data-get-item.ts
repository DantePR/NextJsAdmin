import { cache } from 'react'

import 'server-only'
 
async  function getDataObjectData( url : string, accessToken : string){
    const res = await fetch(url, {method: 'GET',headers: {
      'x-api-key' :`${process.env.BLACKSTONEAPI}` ,
      'Content-Type' :  'application/json',
      'Authorization' :  accessToken
    } })
    const data = await res.json()
     
    return data
  }

export const preload = (url: string, accessToken : string) => {
  void getDataItem(url, accessToken)
}
 
export const getDataItem = cache(async (url: string, accessToken : string) => {
   return await getDataObjectData(url, accessToken)
})