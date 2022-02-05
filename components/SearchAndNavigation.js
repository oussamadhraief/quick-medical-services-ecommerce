import CategoriesMenu from "./CategoriesMenu"

export default function SearchAndNavigation(){
    return (
        <div className="flex flex-wrap px-3 mx-5 py-3 bg-white rounded-lg">
            <CategoriesMenu />
            <input type="text" name="search" value="" className="rounded-r-lg outline-none text-lg px-3" placeholder="Search..."/>
        </div>
    )
}

