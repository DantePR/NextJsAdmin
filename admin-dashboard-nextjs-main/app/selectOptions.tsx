'use server'
import { getDataItem } from '../utils/data-get-item'


interface SelectFormData {
  objectName: string;
  fieldName: string;
  fieldId: string;
  selectedVal: string;
  accessToken: string;
  keyField : string;
  companyId : string;

}
export default async function SelectOptions({ params } : {params : SelectFormData }) {
  //console.log(params);
  const çomp = params.companyId
  const url =  `${process.env.WEB_CLIENT_API}/${çomp}/options?idField=${params.fieldId}&nameField=${params.fieldName}&objectName=${params.objectName}`
  //const { responseData, isLoading, isError } = getOptionsData(url,params.accessToken); 
  const pageInitData1  = await getDataItem(url,params.accessToken)
  const [responseData] = await Promise.all([pageInitData1])
  
  if (responseData)
  return (
    <select  className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    invalid:border-pink-500 invalid:text-pink-600
    focus:invalid:border-pink-500 focus:invalid:ring-pink-50' key={params.keyField} id={params.keyField} name={params.keyField} defaultValue={ params.selectedVal} >
      {responseData.response.map((objectRecord, index) => (

<option key={objectRecord[params.fieldId]} value={objectRecord[params.fieldId]}>{objectRecord[params.fieldName]}</option> 
     

     ))}
  
    </select>
  )
  return (
    <select  key={params.keyField} id={params.keyField}  >
      <option value="" key={params.fieldId+"sel"} >No Items ...</option>
  
    </select>
  )
}
