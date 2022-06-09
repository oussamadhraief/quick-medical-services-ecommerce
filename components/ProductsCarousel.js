import { useEffect, useState,useContext } from 'react'
import { ProductsContext } from '../utils/ProductsContext'
import ScrollableProduct from './ScrollableProduct'
import Image from 'next/image'

export default function ProductsCarousel({id}) {

    const {value,setValue} = useContext(ProductsContext)
    const [renderedArray,setRenderedArray] = useState([])

    useEffect(() => {
        let newValue
        if(id == 'navigatablefeatured') {
            newValue = value.filter(item => item.availability == 'available')
        }else{
            newValue = value.filter(item => item.availability == 'unavailable')
        }
        newValue = newValue.map(item => <ScrollableProduct key={item.name} product={item} />)
        setRenderedArray(newValue)
    },[value])

    const handleRightNavigation = () => {
        const scrollableDiv = document.getElementById(id)
        const disablelableButtons = document.querySelectorAll('.disablelable')
        disablelableButtons.forEach(item => item.disabled = true)
        scrollableDiv.scroll(scrollableDiv.scrollLeft + window.innerWidth,0)
            setTimeout(() => {
                disablelableButtons.forEach(item => item.disabled = false)
        }, 300);
    }

    const handleLeftNavigation = () => {
        const scrollableDiv = document.getElementById(id)
        const disablelableButtons = document.querySelectorAll('.disablelable')
        disablelableButtons.forEach(item => item.disabled = true)
        scrollableDiv.scroll(scrollableDiv.scrollLeft - window.innerWidth,0)
            setTimeout(() => {
                disablelableButtons.forEach(item => item.disabled = false)
        }, 300);
    }

    return (
        <div className='scrollable relative w-screen flex flex-nowrap items-center overflow-x-hidden h-fit bg-white z-[3]'>
            <button className='relative bg-white w-10 h-full z-[90] font-bold text-2xl hidden md:block' onClick={e => handleLeftNavigation()}><Image src={'pfe/arrow-right-3098_-_Copy_hsxwaz'} alt='arrow' width={30} height={30} layout='fixed' className='hover:scale-x-125' /></button>
            <div id={id} className='w-full h-fit overflow-x-auto md:overflow-x-hidden py-5 mb-10 mt-2 flex flex-nowrap justify-start gap-10 md:gap-20 px-5'>
            {renderedArray}
            </div>
            <button className='relative  bg-white w-10 h-full z-[90] font-bold text-2xl hidden md:block' onClick={e => handleRightNavigation()}><Image src={'pfe/arrow-right-3098_eujgfr'} alt='arrow' width={30} height={30} layout='fixed' className='hover:scale-x-125' /></button>
        </div>
    )
}