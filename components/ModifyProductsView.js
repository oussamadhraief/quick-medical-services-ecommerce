import { useContext, useEffect } from 'react'
import { ProductsContext } from '../utils/ProductsContext'
import AdminProducts from './AdminProducts'
import PagesNavigator from './PagesNavigator'

export default function ModifyProductsView(){

//    const {value,setValue} = useContext(ProductsContext)

//    function handleClick() {
//        setValue({
//         name: 'Wartenberg',
//         name1: 'Oussema',
//         name2: 'Dhraief',
//         name3: 'Halouani',
//         name4: 'GgA',
//         name5: 'MohAmEd',
//         name6: 'Wartenbdeezerg',
//         name7: 'nuta',
//         name8: 'whatsapppppp ',
//         name9: 'ouwwwwwwwwwwwwwww',
//     })
//    }

    return (
        <div className="h-full relative w-full border-2 rounded-lg border-zinc-300">
            <div className="h-full relative w-full overflow-y-scroll  rounded-md pb-32 px-3 pt-3 lg:pt-10 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-10 3xl:gap-14">
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            <AdminProducts />
            </div>
            <PagesNavigator />
        </div>
    )
}