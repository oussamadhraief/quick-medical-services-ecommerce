import Image from 'next/image'
import ProductsCarousel from './ProductsCarousel'
import { useEffect, useState } from 'react'
import { ProductsContext } from '../utils/ProductsContext'

export default function MainContent(){

    const steps = 'pfe/Roadmap_Timeline_Process_Infographic_Graph_1_xlmjdq.png'
    const searchIcon = 'pfe/searchIcon_ooxkbe.png'
    const card1 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__3_-removebg-preview_1_w5ecrw.png'
    const card2 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__6_-removebg-preview_m5nsuf.png'
    const card3 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__5_-removebg-preview_am1ajy.png'
    const card4 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__4_-removebg-preview_vd14wo.png'
    const card5 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__7_-removebg-preview_yompbn.png'
    
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
            <div className='w-full h-fit bg-white py-20 mb-32 mt-10 '>
            
            
        <p className='text-lg sm:text-2xl md:text-3xl font-medium mx-auto w-fit bg-[#44A4F4] text-white px-5 py-2 shadow-stylish mb-20 hover:cursor-pointer hover:scale-125 transition-all whitespace-nowrap'>Comment commander en ligne ?</p>
        <div id='steps' className='w-full px-5 lg:px-0 lg:w-11/12 xl:w-9/12 gap-5 mx-auto h-fit bg-transparent py-0  flex flex-wrap lg:flex-nowrap justify-evenly items-center'>
            {/* <div className='relative w-6/12  h-[650px] mx-auto bg-white  mt-32' id='roundme'>
                    <Image src={steps} alt='design' layout='fill' quality={100}  />
            </div> */}
            <div className='w-60 h-96 bg-white relative overflow-visible rounded-xl hover:cursor-pointer hover:scale-105 transition-all'>
                <div className='w-[105px] hover:scale-110 h-32 absolute -top-14 left-0 right-0 mx-auto '>
                    <Image src={card1} alt='explorer' layout='fill' />
                </div>
                <p className='mx-auto mt-24 w-fit h-fit font-extrabold text-[#FF8F2E] text-4xl hover:scale-110'>01</p>
                <p className='font-medium w-fit h-fit mx-auto mt-20 text-lg text-third text-center'>Explorez nos produits</p>
                <div className='w-24 h-3 absolute -bottom-[7px] bg-[#FF8F2E] rounded-3xl left-0 hover:scale-110 right-0 mx-auto '>
                </div>
            </div>

            <div className='w-60 h-96 bg-white relative overflow-visible rounded-xl hover:cursor-pointer hover:scale-105 transition-all'>
                <div className='w-[105px] hover:scale-110 h-32 absolute -top-14 left-0 right-0 mx-auto '>
                    <Image src={card4} alt='explorer' layout='fill' />
                </div>
                <p className='mx-auto mt-24 w-fit h-fit font-extrabold text-[#FF3874] text-4xl hover:scale-110'>02</p>
                <p className='font-medium w-fit h-fit mx-auto mt-20 text-lg text-third text-center px-2'>Choisissez vos instruments et ajoutez les au panier</p>
                <div className='w-24 h-3 absolute -bottom-[7px] bg-[#FF3874] rounded-3xl left-0 hover:scale-110 right-0 mx-auto '>
                </div>
            </div>

            <div className='w-60 h-96 bg-white relative overflow-visible rounded-xl hover:cursor-pointer hover:scale-105 transition-all'>
                <div className='w-[105px] hover:scale-110 h-32 absolute -top-14 left-0 right-0 mx-auto '>
                    <Image src={card3} alt='explorer' layout='fill' />
                </div>
                <p className='mx-auto mt-24 w-fit h-fit font-extrabold text-[#8C52FF] text-4xl hover:scale-110'>03</p>
                <p className='font-medium w-fit h-fit mx-auto mt-20 text-lg text-third text-center'>Demandez un devis</p>

                <div className='w-24 h-3 absolute -bottom-[7px] bg-[#8C52FF] rounded-3xl left-0 hover:scale-110 right-0 mx-auto '>
                </div>
            </div>

            <div className='w-60 h-96 bg-white relative overflow-visible rounded-xl hover:cursor-pointer hover:scale-105 transition-all'>
                <div className='w-[105px] hover:scale-110 h-32 absolute -top-14 left-0 right-0 mx-auto '>
                    <Image src={card2} alt='explorer' layout='fill' />
                </div>
                <p className='mx-auto mt-24 w-fit h-fit font-extrabold text-[#44A4F4] text-4xl hover:scale-110'>04</p>
                <p className='font-medium w-fit h-fit mx-auto mt-20 text-lg text-third text-center'>Passez une commande</p>

                <div className='w-24 h-3 absolute -bottom-[7px] bg-[#44A4F4] rounded-3xl left-0 hover:scale-110 right-0 mx-auto '>
                </div>
            </div>

            <div className='w-60 h-96 bg-white relative mt-24 md:mt-0 overflow-visible rounded-xl hover:cursor-pointer hover:scale-105 transition-all'>
                <div className='w-[105px] hover:scale-110 h-32 absolute -top-14 left-0 right-0 mx-auto '>
                    <Image src={card5} alt='explorer' layout='fill' />
                </div>
                <p className='mx-auto mt-24 w-fit h-fit font-extrabold text-[#22BF79] text-4xl hover:scale-110'>05</p>
                <p className='font-medium w-fit h-fit mx-auto mt-20 text-lg text-third text-center'>Payez à la livraison</p>

                <div className='w-24 h-3 absolute -bottom-[7px] bg-[#22BF79] rounded-3xl left-0 hover:scale-110 right-0 mx-auto '>
                </div>
            </div>
        </div>
        </div>
            {/* <Introduction />
            <div className='relative w-full h-20 bg-white'>
                <Image src={asymmetricalTriangle} alt='design' layout='fill' />
            </div> */}
            <div className='flex justify-between w-screen h-fit'>
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