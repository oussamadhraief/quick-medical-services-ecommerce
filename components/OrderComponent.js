import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'

export default function OrderComponent(props){

  const [classes,setClasses] = useState("font-bold bg-[#ffdbb9c6] text-[#fd8c22c6] w-24 px-2 py-1 rounded-md text-center mx-auto ")

  useEffect(() => {
    if(props.status == 'Livrée') setClasses('font-bold bg-green-200 text-emerald-700 w-24 px-2 py-1 rounded-md text-center mx-auto ')
    if(props.status == 'Archivée') setClasses('font-bold bg-red-200 text-red-500 w-24 px-2 py-1 rounded-md text-center mx-auto')
  },[])

    return(
      <tr className='w-full h-fit even:bg-zinc-100 hover:cursor-pointer hover:bg-harvey relative'>
      <td className='font-bold text-center whitespace-nowrap px-2 underline'>{props.id}</td>
      <td className='font-medium text-zinc-600 text-left px-3 space-y-1 py-3'>
          <p className=' font-thin'><span className='text-base font-medium'>Adresse:</span> {props.address}</p>
          <p className=' font-thin'><span className='text-base font-medium'>Ville:</span> {props.city}</p>
          <p className=' font-thin'><span className='text-base font-medium'>Pays</span> {props.country}</p>
          <p className=' font-thin'><span className='text-base font-medium'>Code postal:</span> {props.zipCode}</p>
          </td>
          <td className='font-medium text-zinc-600 text-left px-3 space-y-1 py-3'>
          <p className=' font-thin'><span className='text-base font-medium'>Adresse:</span> {props.address2}</p>
          <p className=' font-thin'><span className='text-base font-medium'>Ville:</span> {props.city2}</p>
          <p className=' font-thin'><span className='text-base font-medium'>Pays</span> {props.country2}</p>
          <p className=' font-thin'><span className='text-base font-medium'>Code postal:</span> {props.zipCode2}</p>
          </td>
      <td className='font-medium text-zinc-600 text-center whitespace-nowrap px-3'>{props.phoneNumber}</td>
      <td className='font-medium text-sm text-zinc-600 text-center whitespace-nowrap px-3'>{props.createdAt.substr(0,10)}</td>
      <td className='font-medium text-zinc-600 text-center whitespace-nowrap px-3'>{props.email}</td>
      <td className='px-2'> 
      <p className={classes}>{props.status == 'Archivée' ? 'Annulée' : props.status}</p>
       </td>
      <td className='w-14 flex justify-center items-center h-full'>
          <Link href={'/account/orders/'+props.id}>
              <a className='w-full text-center hover:underline font-medium text-third'>voir</a>
          </Link>
      </td>
</tr>
    )
}