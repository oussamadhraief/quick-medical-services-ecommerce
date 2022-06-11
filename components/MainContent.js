import Image from 'next/image'
import Link from 'next/link'
import ProductsCarousel from './ProductsCarousel'
import { useEffect, useState } from 'react'
import TestimonialSection from "../components/TestimonialSection"

export default function MainContent(){

    const steps = 'pfe/Roadmap_Timeline_Process_Infographic_Graph_1_xlmjdq.png'
    const searchIcon = 'pfe/searchIcon_ooxkbe_tg1uir.png'
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
    const [testimonials,setTestimonials] = useState([])
    const [isMobile,setIsMobile] = useState(false)

    useEffect(() => {
        async function getData(){

            const res = await fetch('/api/testimonials')
            const { data } = await res.json()
            setTestimonials(data)
          }
          getData()
        const mq1 = window.matchMedia('(max-width: 767px)')
         if(mq1.matches){
             setIsMobile(true)
         }
    },[])
    
    return(
        
        <main className="h-fit w-full bg-white overflow-hidden">
            <div className='w-full h-fit bg-white py-20 mb-32 mt-10 '>
            
            
        <p className='text-lg sm:text-2xl md:text-4xl font-bold mx-auto w-fit mb-20 whitespace-nowrap text-third mainPageTitle'>Comment commander <span className='border-b-[3px] border-pinky'> en ligne</span>  ?</p>
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
                <p className='font-medium w-fit h-fit mx-auto mt-20 text-lg text-third text-center'>Demandez un devis et attendez la réponse</p>

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
            <p className=' w-fit font-bold text-2xl text-center md:ml-10 text-third mainPageTitle'>Produits disponibles <span className='border-b-[3px] border-pinky'>à tout moment</span> </p>
            <div className='mt-3 md:mt-0 flex flex-nowrap justify-between items-center w-60 border-b border-na3ne3i md:mr-10 h-fit px-2 py-1'>
            <input type='text' name='availableSearch' value={availableSearch} onChange={(e) => {
                    setAvailableSearch(e.target.value)
                }} className='outline-none w-full mr-1' placeholder='Chercher un produit...'/>
             <Link href={`/products/search/${availableSearch}`}>
                <a className="w-fit h-full flex items-center hover:cursor-pointer"><Image src={searchIcon} alt='design' width={25} height={25} layout="intrinsic" /></a>
            </Link>  
            </div>
            </div>
            <ProductsCarousel id='navigatablefeatured' />
            <div className='w-full h-fit flex flex-wrap justify-evenly px-10 sm:px-[20%] bg-complementary items-center mb-10 py-10 md:16 lg:py-20 xl:py-24'>
                <div className='mx-3 mt-3'>
                    <div className='relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36'>
                        <Image src={delivery} alt='delivery truck icon' layout="fill" />
                    </div>
                    <p className='text-center font-medium mt-2 text-third'>
                        Livraison à<br />domicile
                    </p>
                </div>
                <div className='mx-3 mt-3'>
                    <div className='relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36'>
                        <Image src={payment} alt='payment icon' layout="fill" />
                    </div>
                    <p className='text-center font-medium mt-2 text-third'>
                    Paiement à<br />la livraison
                    </p>
                </div>
                <div className='mx-3 mt-3'>
                    <div className='relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36'>
                        <Image src={rapidity} alt='rapidity icon' layout="fill" />
                    </div>
                    <p className='text-center font-medium mt-2 text-third'>
                    Rapidité et<br />efficacité
                    </p>
                </div>
                <div className='mx-3 mt-3'>
                    <div className='relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36'>
                        <Image src={satisfaction} alt='satisfaction icon' layout="fill" />
                    </div>
                    <p className='text-center font-medium mt-2 text-third'>
                    Garantie de<br />satisfaction
                    </p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center md:justify-between w-screen h-fit px-5 md:px-0 py-2'>
            <p className=' w-fit font-bold text-2xl text-center md:ml-10 text-third mainPageTitle'>Produits disponibles <span className='border-b-[3px] border-pinky'>sur commande</span> </p>


            <div className='mt-3 md:mt-0 flex flex-nowrap justify-between items-center w-60 border-b border-na3ne3i md:mr-10 h-fit px-2 py-1'>
            <input type='text' name='unavailableSearch' value={unavailableSearch} onChange={(e) => {
                    setUnavailableSearch(e.target.value)
                }} className='outline-none w-full mr-1' placeholder='Chercher un produit...'/>
            <Link href={`/products/search/${unavailableSearch}`}>
                <a className="w-fit h-full flex items-center hover:cursor-pointer"><Image src={searchIcon} alt='design' width={25} height={25} layout="intrinsic" /></a>
            </Link>  
            </div>
            </div>
            <ProductsCarousel id='navigatablefeatured1' />

            <div id='encourageSection' className='bg-complementary gap-5 lg:gap-10 xl:gap-20 relative w-full h-fit min-h-fit mt-52 mb-32 sm:my-32 flex flex-col md:flex-row md:flex-nowrap justify-center lg:justify-start items-center py-10 pr-5 md:pr-0 lg:py-10 pl-5 md:pl-2 lg:pl-7 xl:pl-[4.5vw]'>
                <div className='hoverablecontainer relative hover:cursor-pointer bg-transparent rounded-md transition-all duration-300 aspect-[95/69] w-11/12 sm:w-9/12 md:w-5/12 lg:1/2 xl:w-1/3'>
                    <Image src={'pfe/Untitled_design_4_ad5c55'} alt='contact' layout='fill' />
                    <div className='absolute bottom-full sm:bottom-[95%] right-0 md:top-[85%] md:left-[85%] lg:top-3/4 lg:left-3/4 w-fit h-fit bg-white shadow-float px-5 lg:px-8 py-3 lg:py-5 grid gap-2 hover:scale-105 transition-all'>
                        <i className='font-medium w-fit h-fit text-lg'>&quot;Qualité du service et de produits <br></br> excepionnelle  !&quot;</i>
                        <p className='font-medium w-full text-right h-fit text-zinc-600'>- Dr. John Doe</p>
                        <p className='font-medium w-full h-fit mx-auto mt-3 text-center bg-pinky shadow-[0px_3px_15px_rgba(247,177,162,0.8)] text-white rounded py-1 lg:py-2 hover:scale-105 transition-all'>Envoyer</p>
                    </div>
                </div>
                <div className='w-fit h-fit grid place-items-start lg:place-items-end order-2 md:order-1 mt-5 md:mt-0'>
                    <h1 className='w-full h-fit  text-[17px] sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-medium sm:whitespace-nowrap text-third mainPageTitle'>Vous avez une <span className='border-b-2 border-pinky'>question</span> ?</h1>
                    <h1 className='w-fit h-fit text-third text-[17px] sm:text-xl lg:text-xl md:text-lg  xl:text-2xl font-medium sm:whitespace-nowrap mb-5  mainPageTitle'>Ou vous voulez nous laisser un <span className='border-b-2 border-pinky'>commentaire</span> ?</h1>
                    <Link href='/contact'>
                        <a className='text-white bg-na3ne3i text-[17px] shadow-[0px_3px_15px_rgba(25,98,102,0.8)]  sm:text-xl md:text-lg mx-auto lg:mx-0 xl:text-2xl font-medium px-3 py-1 hover:underline w-fit h-fit rounded '>Contactez-nous !</a>
                    </Link>
                </div>
            </div>
            {testimonials.length > 2 
            ?
            <TestimonialSection data={testimonials} />
            : null
            }
        </main>
    )
}