import { useRef, useEffect } from "react"
import 'animate.css'


export default function Notification({show,setShow, message}){

    const notificationRef = useRef()

    useEffect(() => {
        const temp = []
       if(show){ 
        temp.push(setTimeout(() => {
        notificationRef.current.classList.remove('animate__bounceInUp')
        notificationRef.current.classList.add('animate__bounceOutDown')
            temp.push(setTimeout(() => {
                setShow(false)
            }, 1000))
        }, 2000))
    }

        return () => {
            clearTimeout(temp[0])
            clearTimeout(temp[1])
        }
    })


    
    return(
        <>
        {show ? <div ref={notificationRef} className="fixed block bottom-3 z-[9999] mx-auto left-0 right-0 w-fit h-fit px-5 py-2 bg-emerald-700 text-center font-normal whitespace-nowrap  text-white rounded-md animate__animated animate__bounceInUp">
           {message} &nbsp; <span className=" w-4 h-4 bg-white rounded-full text-emerald-700 font-bold px-1">✔</span> 
        </div> : null}
        </>
    )

}