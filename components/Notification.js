import { useContext, useEffect } from "react"
import { NotificationContext } from "../utils/NotificationContext";
import 'animate.css'


export default function Notification(props){

    const { appear, setAppear } = useContext(NotificationContext)

    useEffect(() => {
        const temp = []
       if(appear.display){ 
        temp.push(setTimeout(() => {
        document.getElementById('notification').classList.remove('animate__bounceInUp')
        document.getElementById('notification').classList.add('animate__bounceOutDown')
            temp.push(setTimeout(() => {
                setAppear({display: false, action: ''})
            }, 1000))
        }, 3000))
    }

        return () => {
            clearTimeout(temp[0])
            clearTimeout(temp[1])
        }
})
    
    return (
        <div id="notification" className={appear.display ? "absolute block bottom-3 z-[9999] mx-auto left-0 right-0 w-fit h-fit px-5 py-3 bg-emerald-700 text-center font-normal whitespace-nowrap  text-white rounded-xl animate__animated animate__bounceInUp" : "absolute hidden"}>
            <span className=" w-4 h-4 bg-white rounded-full text-emerald-700 font-bold px-1">✔</span> Le produit a bien été {appear.action}
        </div>
    )
}