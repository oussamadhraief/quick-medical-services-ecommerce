import Image from "next/image"

export default function LoadingAnimation(props){

    const logo = 'pfe/logo_hq43sm.png'

    return (
        <div className={props.bgOpacity ? "absolute top-0 left-0 w-full h-full bg-white z-50 grid content-center" : "absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.7)] z-50 grid content-center"}>
                <div className="loadingAnimation flex justify-center items-center flex-nowrap mb-28">
                    <span className="w-2 h-2 bg-ciel rounded-full mx-2"></span>
                    <span className="w-2 h-2 bg-main rounded-full mx-1"></span>
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mx-2"></span>
                </div>
        </div>
    )
}