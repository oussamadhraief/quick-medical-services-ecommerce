import { useEffect, useState,useContext } from 'react'
import { ProductsContext } from '../utils/ProductsContext'
import ScrollableProduct from './ScrollableProduct'
import { SizeSelectionContext } from '../utils/SizeSelectionContext'

export default function ProductsCarousel({id}) {

    const {value,setValue} = useContext(ProductsContext)
    const [renderedArray,setRenderedArray] = useState([])
    const [selectedSize,setSelectedSize] = useState(0)

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
        scrollableDiv.scroll(scrollableDiv.scrollLeft + 320,0)
            setTimeout(() => {
                disablelableButtons.forEach(item => item.disabled = false)
        }, 300);
    }

    const handleLeftNavigation = () => {
        const scrollableDiv = document.getElementById(id)
        const disablelableButtons = document.querySelectorAll('.disablelable')
        disablelableButtons.forEach(item => item.disabled = true)
        scrollableDiv.scroll(scrollableDiv.scrollLeft - 320,0)
            setTimeout(() => {
                disablelableButtons.forEach(item => item.disabled = false)
        }, 300);
    }

    return (
        <div   className='scrollable relative w-screen overflow-x-hidden h-fit'>
            <div id={id} className='w-screen h-fit overflow-x-auto md:overflow-x-hidden py-5 mb-10 mt-2 flex flex-nowrap justify-start gap-20 px-5 md:px-20'>
            <SizeSelectionContext.Provider value={{ selectedSize,setSelectedSize}} >
            {renderedArray}
            </SizeSelectionContext.Provider>
            </div>
            <div className='h-full w-14 bg-white z-50  items-center absolute top-0 left-0 pl-3 hover:cursor-default hidden md:flex'><button className='font-bold text-xl text-main rounded-full w-9 h-9 shadow-stylish hover:scale-110 hover:cursor-pointer disablelable' onClick={(e) => handleLeftNavigation()}>&#x3c;</button></div>
            <div className='h-full w-16 bg-white z-50  items-center absolute top-0 right-0 pl-2 pr-3 hover:cursor-default hidden md:flex'><button className='font-bold text-xl text-main rounded-full w-9 h-9 text-center shadow-stylish hover:scale-110 hover:cursor-pointer disablelable' onClick={(e) => handleRightNavigation()}>&#x3e;</button></div>
        </div>
    )
}