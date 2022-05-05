import Image from 'next/image'
import Link from 'next/link'
import ProductsCarousel from './ProductsCarousel'
import { useEffect, useState } from 'react'
import TestimonialSection from "../components/TestimonialSection"

export default function MainContent(){

    const steps = 'pfe/Roadmap_Timeline_Process_Infographic_Graph_1_xlmjdq.png'
    const searchIcon = 'pfe/searchIcon_ooxkbe.png'
    const card1 = 'pfe/1_isl98v.png'
    const card2 = 'pfe/4_of9wnc.png'
    const card3 = 'pfe/3_cztxz9.png'
    const card4 = 'pfe/2_usdhjt.png'
    const card5 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__7_-removebg-preview_yompbn.png'
    const delivery = 'pfe/1_tybhhw.png'
    const payment = 'pfe/2_tqhmcd.png'
    const rapidity = 'pfe/3_av1ccn.png'
    const satisfaction = 'pfe/4_gutx7r.png'
    
    const [availableSearch,setAvailableSearch] = useState('')
    const [unavailableSearch,setUnavailableSearch] = useState('')
    const [isMobile,setIsMobile] = useState(false)

    useEffect(() => {
        const mq1 = window.matchMedia('(max-width: 767px)')
         if(mq1.matches){
             setIsMobile(true)
         }
    },[])
    
    return(
        
        <main className="h-fit w-full bg-white overflow-hidden">
            <div className='w-full h-fit bg-white py-20 mb-32 mt-10 '>
            
            
        <p className='text-lg sm:text-2xl md:text-3xl font-medium mx-auto w-fit bg-pinky text-white px-5 py-2 shadow-stylish mb-20 hover:cursor-pointer hover:scale-125 transition-all whitespace-nowrap'>Comment commander en ligne ?</p>
        <div id='steps' className='w-full px-5 lg:px-0 lg:w-11/12 xl:w-10/12 2xl:w-9/12 gap-5 mx-auto h-fit bg-transparent py-0  flex flex-wrap lg:flex-nowrap justify-evenly items-center'>
           
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
            <div className='flex flex-col md:flex-row justify-center items-center md:justify-between w-screen h-fit px-5 md:px-0 py-2'>
            <p className='bg-na3ne3i w-fit px-3 py-1 shadow-form hover:cursor-pointer hover:scale-105 transition-all text-white font-medium text-xl text-center md:ml-10 '>Produits disponibles à tout moment</p>
            <div className='mt-3 md:mt-0 flex flex-nowrap justify-between items-center w-60 border-[2px] rounded-lg md:mr-10 h-fit px-2 py-1'>
            <input type='text' name='availableSearch' value={availableSearch} onChange={(e) => {
                    setAvailableSearch(e.target.value)
                }} className='outline-none w-full mr-1' placeholder='Chercher un produit...'/>
            <Image src={searchIcon} alt='search icon' width={20} height={20} layout='fixed' />    
            </div>
            </div>
            <ProductsCarousel id='navigatablefeatured' />
            <div className='w-full h-fit flex flex-wrap justify-evenly px-10 sm:px-[20%] bg-[#E7EDEE] items-center mb-10 py-5 sm:10 md:16 lg:py-20 xl:py-24'>
                <div className='mx-3 mt-3'>
                    <div className='relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36'>
                        <Image src={delivery} alt='delivery truck icon' layout="fill" />
                    </div>
                    <p className='text-center font-medium mt-2 text-sm text-third'>
                        Livraison à<br />domicile
                    </p>
                </div>
                <div className='mx-3 mt-3'>
                    <div className='relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36'>
                        <Image src={payment} alt='payment icon' layout="fill" />
                    </div>
                    <p className='text-center font-medium mt-2 text-sm text-third'>
                    Paiement à<br />la livraison
                    </p>
                </div>
                <div className='mx-3 mt-3'>
                    <div className='relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36'>
                        <Image src={rapidity} alt='rapidity icon' layout="fill" />
                    </div>
                    <p className='text-center font-medium mt-2 text-sm text-third'>
                    Rapidité et<br />efficacité
                    </p>
                </div>
                <div className='mx-3 mt-3'>
                    <div className='relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36'>
                        <Image src={satisfaction} alt='satisfaction icon' layout="fill" />
                    </div>
                    <p className='text-center font-medium mt-2 text-sm text-third'>
                    Garantie de<br />satisfaction
                    </p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center md:justify-between w-screen h-fit px-5 md:px-0 py-2'>
            <p className='bg-orange w-fit px-3 py-1 shadow-form hover:cursor-pointer hover:scale-105 transition-all text-white font-medium text-xl text-center md:ml-10'>Produits disponibles sur commande</p>

            <div className='mt-3 md:mt-0 flex flex-nowrap justify-between items-center w-60 border-[2px] rounded-lg md:mr-10 h-fit px-2 py-1'>
            <input type='text' name='unavailableSearch' value={unavailableSearch} onChange={(e) => {
                    setUnavailableSearch(e.target.value)
                }} className='outline-none w-full mr-1' placeholder='Chercher un produit...'/>
            <Image src={searchIcon} alt='search icon' width={20} height={20} layout='fixed' />    
            </div>
            </div>
            <ProductsCarousel id='navigatablefeatured1' />

            <div id='encourageSection' className='bg-[#8EB0A5] w-full h-fit md:h-[40vh] lg:h-[50vh] xl:h-[60vh] min-h-fit mt-32 flex flex-col md:flex-row md:flex-nowrap justify-between items-center py-5 pr-5 md:pr-0 lg:py-10 pl-5 lg:pl-10 xl:pl-20'>
                <div className='w-fit md:w-2/12 xl:w-1/4 h-fit grid place-items-start lg:place-items-end order-2 md:order-1 mt-5 md:mt-0'>
                    <h1 className='w-full h-fit text-third text-base lg:text-lg xl:text-2xl font-mono whitespace-nowrap'>Vous avez une question?</h1>
                    <h1 className='w-fit h-fit text-third text-base lg:text-lg xl:text-2xl font-mono whitespace-nowrap mb-5'>Ou vous voulez nous laisser un commentaire ?</h1>
                    <Link href='/contact'>
                        <a className='text-white bg-third text-lg mx-auto lg:mx-0 xl:text-2xl font-mono px-3 py-1 hover:underline w-fit h-fit'>Contactez-nous !</a>
                    </Link>
                </div>
                {isMobile ? null :<ul className='w-5/12 lg:w-7/12 xl:w-1/2 h-full flex lg:min-h-[300px] flex-nowrap justify-start lg:justify-center items-center gap-5 relative order-1 md:order-2'>
                    <li className='hoverablecontainer hover:cursor-pointer hover:w-7/12 xl:hover:w-1/2 overflow-hidden h-full bg-rainy rounded-3xl transition-all duration-500 peer w-20 lg:w-32 shadow-float'>
                        
                    </li>
                    <li className='hoverablecontainer peer-hover:w-20 lg:peer-hover:w-32 hover:cursor-pointer overflow-hidden w-7/12 xl:w-1/2 h-full bg-rainy rounded-3xl transition-all duration-300 peer shadow-float'>
                        
                    </li>
                </ul>}
                {isMobile ? 
                    <div className='hoverablecontainer hover:cursor-pointer overflow-hidden bg-rainy rounded-3xl transition-all duration-300 shadow-float w-64 h-64'>
                        
                    </div> : null}
            </div>
            <TestimonialSection />
        </main>
    )
}