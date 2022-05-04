import Image from "next/image"

export default function LoadingAnimation(props){

    const logo = 'pfe/logo_hq43sm.png'

    return (
        <div className='bg-white h-full w-full rounded-lg overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
        <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
          <div className="reverse-spinner "></div>
        </div>
      </div>
    )
}