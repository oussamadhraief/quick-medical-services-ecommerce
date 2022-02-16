import CategoriesMenu from "./CategoriesMenu"

export default function SearchAndNavigation(){
    return (
        <div className="flex flex-wrap px-3 mx-5 py-3 bg-white border-[1px] h-20 rounded-lg w-3/6">
            <CategoriesMenu />
            <input type="text" name="search" value="" className="rounded-r-lg outline-none text-lg px-4" placeholder="Chercher un produit..."/>
        </div>
    )
}

