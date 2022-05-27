import Image from 'next/image'
import UserNavigation from './UserNavigation'
import { useState,useContext } from "react"
import { useRouter } from 'next/router'
import { SearchContext } from '../utils/SearchContext'
import { useEffect } from 'react'

function AdminNavbar(props) {

    const router = useRouter()

    const {searchContext,setSearchContext} = useContext(SearchContext)

    const [categoriesOpen, setCategoriesOpen] = useState(false)
    const [searchCategory, setSearchCategory] = useState("Produits")

    const menuIcon = 'pfe/icons8-menu-rounded-48_hjad2s'
    const closeMenu = 'pfe/icons8-menu-rounded-48_1_ncncux'

    useEffect(() => {
        if(router){
            if(router.pathname.includes('orders')) setSearchCategory("Commandes")
            if(router.pathname.includes('products')) setSearchCategory("Produits")
            if(router.pathname.includes('quote')) setSearchCategory("Devis")
        }
    },[])

    function handleOpenMenu(){
       props.setOpen(prev => !prev)
    }

    const handleChooseCategory = (category) => {
        setSearchCategory(category)
        setCategoriesOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const searchText = searchContext.toLowerCase()
        switch(searchCategory){
            case 'Produits':
                window.location = '/admin/search/products/'+searchText+'?page=0'
                break;
            case 'Commandes':
                window.location = '/admin/search/orders/'+searchText+'?page=0'
                break;
            case 'Devis':
                break;
            default: 
                console.error('Wrong category');
            break;
        }
    }

    return ( 
    <nav className="adminNavbar h-12 flex flex-nowrap items-center w-full  bg-light justify-between px-10 z-50">
        <button className="h-7 w-7 px-1 py-1 grid place-content-center place-items-center" onClick={e => handleOpenMenu()}> <Image src={props.open ? closeMenu : menuIcon} width={25} height={25} layout='fixed' /> </button>
        <form onSubmit={e => handleSubmit(e)} className="bg-white h-8 flex flex-nowrap w-fit items-center rounded-[4px]">
            <div className={categoriesOpen ? "h-8 font-medium outline-none border-0 grid w-32 py-0.5  bg-zinc-200  rounded-l-[4px] relative" : "relative h-8 font-medium outline-none border-0 grid w-32 py-0.5  bg-white rounded-l-[4px]"}>
                <button type="button" className="flex flex-nowrap justify-between w-full items-center h-full px-1 py-[1px]" onClick={e => setCategoriesOpen(prev => !prev)}> <span className="font-medium">{searchCategory}</span>  <Image src={'pfe/icons8-chevron-up-96_l5fczz'} alt='arrow' height={7} width={13} layout='fixed' className={categoriesOpen ? "rotate-0 transition-all" : "rotate-180 transition-all"} /></button>
                <div className={categoriesOpen ? "absolute top-[110%] left-0 h-26 w-40 bg-white grid place-content-center place-items-center shadow-form py-1 transition-[height] duration-1000" : "h-0 overflow-hidden transition-[height] duration-1000"}>
                    <button type="button" onClick={e => handleChooseCategory("Produits")}  className="bg-white px-1 text-center font-medium border-b w-36 py-1">Produits</button>
                    <button type="button" onClick={e => handleChooseCategory("Commandes")}  className="bg-white px-1 text-center font-medium w-36 border-b py-1">Commandes</button>
                    <button type="button" onClick={e => handleChooseCategory("Devis")}  className="bg-white px-1 text-center font-medium w-36 py-1">Devis</button>
                </div>
            </div>
            <input type="text" name="search" value={searchContext} onChange={e => setSearchContext(e.target.value)} placeholder="Chercher par catégorie" className="w-72 px-1 outline-none h-7 border-l border-zinc-300"/>
            <button type="submit" className="w-7 h-5 "><Image src={'pfe/searchIcon_ooxkbe_tg1uir'} alt='search' width={22} height={22} layout='fixed' /> </button>
        </form>
       
        <UserNavigation />
    </nav> );
}

export default AdminNavbar;