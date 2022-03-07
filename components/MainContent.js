import Image from 'next/image'
import Link from 'next/link'
import ProductsCarousel from './ProductsCarousel'
import { useEffect, useState } from 'react'
import LoadingAnimation from './LoadingAnimation'
import { ProductsContext } from '../utils/ProductsContext'
import Header from "../components/Header"
import TestimonialSection from "../components/TestimonialSection"
import { ActivatedModalContext } from '../utils/ActivatedModalContext'
import { CategoriesContext } from '../utils/CategoriesContext'
import { SearchContext } from '../utils/SearchContext'

export default function MainContent(){

    const steps = 'pfe/Roadmap_Timeline_Process_Infographic_Graph_1_xlmjdq.png'
    const searchIcon = 'pfe/searchIcon_ooxkbe.png'
    const card1 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__3_-removebg-preview_1_w5ecrw.png'
    const card2 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__6_-removebg-preview_m5nsuf.png'
    const card3 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__5_-removebg-preview_am1ajy.png'
    const card4 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__4_-removebg-preview_vd14wo.png'
    const card5 = 'pfe/Roadmap_Timeline_Process_Infographic_Graph__7_-removebg-preview_yompbn.png'
    const question = 'pfe/1_ns4qha.png'
    const feedback = 'pfe/2_qtx32d.png'
    
    const [value,setValue] = useState([])
    const [search,setSearch] = useState('')
    const [availableSearch,setAvailableSearch] = useState('')
    const [unavailableSearch,setUnavailableSearch] = useState('')
    const [loading,setLoading] = useState(true)
    const [activatedModal,setActivatedModal] = useState(false)
    const [categoriesAndSubcategories,setCategoriesAndSubcategories] = useState([])

    // useEffect(() => {
    //     document.querySelectorAll('.hoverablephotos').forEach(item => {
    //         item.style.height = document.getElementById('encourageSection').offsetHeight + 'px'
    //         item.style.width = document.querySelector('.hoverablecontainer').offsetHeight + 'px'
    //         console.log(item.offsetHeight,item.offsetWidth);
    //     })
    // },[])

    // useEffect(() => {
    //     new ResizeObserver(() => {
    //         if(document.querySelector('.hoverablecontainer:last-child').offsetWidth > 130) {document.querySelector('.hoverablecontainer:first-child').style.width = '128px'} else {
    //             document.querySelector('.hoverablecontainer:first-child').style.width = '50%'
    //         }

    //     }).observe(document.querySelector('.hoverablecontainer:last-child'))
    // },[])

    useEffect(async () => {
        if(value.length < 1){
            const res = await fetch('api/products')
            const {data} = await res.json()
            setValue(data)
            setLoading(false)
            let categories = data.map(item => item.category)
            categories = [...new Set(categories)]
            const orderedStuff = categories.map(item => orderedTable(item,data))
            setCategoriesAndSubcategories(orderedStuff)
        }
    },[value])

    function orderedTable(item,data){
        return {
            category: item,
            subcategories: [...new Set(data.filter(element => element.category == item).map(elem => elem.subcategory))]
        }
    }
    
    return(
        <ProductsContext.Provider value={{value,setValue}}>
        <ActivatedModalContext.Provider value={{activatedModal,setActivatedModal}}>
        <CategoriesContext.Provider value={{categoriesAndSubcategories,setCategoriesAndSubcategories}}>
        <SearchContext.Provider value={{search,setSearch}}>
            <Header landingPage={true} />
        </SearchContext.Provider>
        </CategoriesContext.Provider>
        <main className="h-fit w-full bg-white overflow-hidden">
            <div className='w-full h-fit bg-white py-20 mb-32 mt-10 '>
            
            
        <p className='text-lg sm:text-2xl md:text-3xl font-medium mx-auto w-fit bg-[#44A4F4] text-white px-5 py-2 shadow-stylish mb-20 hover:cursor-pointer hover:scale-125 transition-all whitespace-nowrap'>Comment commander en ligne ?</p>
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
            {loading ? <div className='w-screen h-[450px] relative'>
                <LoadingAnimation bgOpacity={true} />
                </div> :
                <>
            <div className='flex justify-between w-screen h-fit py-2'>
            <p className='bg-na3ne3i px-3 py-1 shadow-form hover:cursor-pointer hover:scale-105 transition-all text-white font-medium text-xl ml-10 '>Produits disponibles à tout moment</p>
            <div className='flex flex-nowrap justify-between items-center w-60 border-[1px] rounded-lg mr-10 h-fit px-2 py-1'>
            <input type='text' name='availableSearch' value={availableSearch} onChange={(e) => {
                    setAvailableSearch(e.target.value)
                }} className='outline-none w-full mr-1' placeholder='Chercher un produit...'/>
            <Image src={searchIcon} alt='search icon' width={20} height={20} layout='fixed' />    
            </div>
            </div>
            <ProductsCarousel id='navigatablefeatured' />
            <div className='flex justify-between w-screen h-fit mt-20 py-2'>
            <p className='bg-[#D9302B] px-3 py-1 shadow-form text-white font-medium text-xl hover:cursor-pointer hover:scale-105 transition-all ml-10 '>Produits disponibles sur commande</p>

            <div className='flex flex-nowrap justify-between items-center w-60 border-[1px] rounded-lg mr-10 h-fit px-2 py-1'>
            <input type='text' name='unavailableSearch' value={unavailableSearch} onChange={(e) => {
                    setUnavailableSearch(e.target.value)
                }} className='outline-none w-full mr-1' placeholder='Chercher un produit...'/>
            <Image src={searchIcon} alt='search icon' width={20} height={20} layout='fixed' />    
            </div>
            </div>
            <ProductsCarousel id='navigatablefeatured1' />
            </>}
            <div id='encourageSection' className='bg-trendy w-full h-[60vh] min-h-fit mt-32 flex flex-nowrap justify-between items-center py-10 pl-20'>
                <div className='w-1/4 h-fit'>
                    <h1 className='w-fit h-fit text-third text-2xl font-mono whitespace-nowrap'>Vous avez une question?</h1>
                    <h1 className='w-fit h-fit text-third text-2xl font-mono whitespace-nowrap'>Ou vous voulez nous laisser un commentaire ?</h1>
                </div>
                <ul className='w-1/2 h-full flex min-h-[300px] flex-nowrap justify-start items-center gap-5 relative'>
                    <li className='hoverablecontainer hover:cursor-pointer hover:w-1/2 overflow-hidden h-full bg-rainy rounded-3xl transition-all duration-500 peer w-32 shadow-float'>
                        
                    </li>
                    <Link href='/contact'>
                        <a className='absolute text-white bg-third text-2xl font-mono px-3 py-1 bottom-5 -left-5 hover:underline'>Contactez-nous !</a>
                    </Link>
                    <li className='hoverablecontainer peer-hover:w-32 hover:cursor-pointer overflow-hidden w-1/2 h-full bg-rainy rounded-3xl transition-all duration-300 peer shadow-float'>
                        
                    </li>
                </ul>
            </div>
            <TestimonialSection />
        </main>
        </ActivatedModalContext.Provider>
        </ProductsContext.Provider>
    )
}

{/* <div className='hoverablecontainer peer-hover:w-20 hover:cursor-pointer overflow-hidden w-1/2 h-full'>
                        <div className='hoverablephotos relative bg-rainy rounded-xl'>
                            <Image src={question} alt='contact' width={230} height={190} layout='responsive' objectPosition='center'  />
                        </div>
                    </div>
                    <div className='hoverablecontainer peer w-20 hover:cursor-pointer overflow-hidden h-full'>
                        <div className='hoverablephotos relative bg-rainy rounded-xl'>
                        <Image src={feedback} alt='contact' width={280} height={240} layout='responsive' objectPosition='center'  />
                        </div>
                    </div> */}