import Introduction from './Introduction'
import Image from 'next/image'
import ProductsCarousel from './ProductsCarousel'
import { useEffect, useState } from 'react'
import { ProductsContext } from '../utils/ProductsContext'

export default function MainContent(){

    const asymmetricalTriangle = 'pfe/curveAsymmetrical_hlhril.svg'
    const searchIcon = 'pfe/searchIcon_ooxkbe.png'
    
    const [value,setValue] = useState([])
    const [availableSearch,setAvailableSearch] = useState('')
    const [unavailableSearch,setUnavailableSearch] = useState('')

    useEffect(async () => {
        if(value.length < 1){
            const res = await fetch('api/products')
            const {data} = await res.json()
            setValue(data)
        }else{

        }
    },[value])
    
    return(
        <ProductsContext.Provider value={{value,setValue}}>
        <main className="h-fit w-full bg-white overflow-hidden">
            <Introduction />
            <div className='relative w-full h-20 bg-white'>
                <Image src={asymmetricalTriangle} alt='design' layout='fill' />
            </div>
            <div className='flex justify-between w-screen h-fit mt-40'>
            <p className='text-emerald-600 font-semibold text-2xl ml-10 '>Produits disponibles à tout moment</p>
            <div className='flex flex-nowrap justify-between items-center w-60 border-[1px] rounded-lg mr-10 h-fit px-2 py-1'>
            <input type='text' name='availableSearch' value={availableSearch} onChange={(e) => {
                    setAvailableSearch(e.target.value)
                }} className='outline-none w-full mr-1' placeholder='Chercher un produit...'/>
            <Image src={searchIcon} alt='search icon' width={20} height={20} layout='fixed' />    
            </div>
            </div>
            <ProductsCarousel id='navigatablefeatured' />
            <div className='flex justify-between w-screen h-fit mt-20'>
            <p className='text-red-400 font-semibold text-2xl ml-10 '>Produits disponibles sur commande</p>

            <div className='flex flex-nowrap justify-between items-center w-60 border-[1px] rounded-lg mr-10 h-fit px-2 py-1'>
            <input type='text' name='unavailableSearch' value={unavailableSearch} onChange={(e) => {
                    setUnavailableSearch(e.target.value)
                }} className='outline-none w-full mr-1' placeholder='Chercher un produit...'/>
            <Image src={searchIcon} alt='search icon' width={20} height={20} layout='fixed' />    
            </div>
            </div>
            <ProductsCarousel id='navigatablefeatured1'/>
        </main>
        </ProductsContext.Provider>
    )
}