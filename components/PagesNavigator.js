import { useContext } from "react"
import { PageSelectionContext } from "../utils/PageSelectionContext"
import { PagesContext } from "../utils/PagesContext"
import { LoadingContext } from "../utils/LoadingContext"


export default function PagesNavigator(props){

    const {pageSelection,setPageSelection} = useContext(PageSelectionContext)
    const {pages,setPages} = useContext(PagesContext)
    const {loadingContext,setLoadingContext} = useContext(LoadingContext)

    function renderPages(){
        let arr = []
        for (let index = 0; index < pages; index++) {
            arr.push(<button key={index} className={index == pageSelection ? "px-3 py-1 border-[1px] w-fit h-8 border-main bg-main text-white font-semibold mx-1" : "px-3 py-1 w-fit h-8 border-[1px] border-main text-main font-semibold mx-1 hover:bg-main hover:border-main hover:text-white"} onClick={e => setPageSelection(index)}>{index +1}</button>)
        }
        return arr
    }
    if(loadingContext) return null
    return(
        <div className={props.relative ? "relative  h-fit w-fit mr-5 flex justify-center flex-nowrap py-1 bg-white z-50" : "absolute bottom-0 h-fit w-full flex justify-center flex-nowrap py-1 bg-[rgba(255,255,255,0.9)] z-50 rounded-b-lg"}>
            <button className="px-2 pb-0.5 border-[1px] border-main text-main font-bold text-lg mx-1 hover:bg-main hover:border-main hover:text-white" onClick={e => {if(pageSelection > 0) setPageSelection(pageSelection -1)}}>&#60;</button>
            {renderPages()}
            <button className="px-2 pb-0.5 border-[1px] border-main text-main font-bold text-lg mx-1 hover:bg-main hover:border-main hover:text-white" onClick={e => {if(pageSelection != pages -1) setPageSelection(pageSelection + 1)}}>&#62;</button>
        </div>
        
    )
}