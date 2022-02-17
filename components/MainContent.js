import Introduction from './Introduction'
import Image from 'next/image'

export default function MainContent(){

    const asymmetricalTriangle = 'pfe/curveAsymmetrical_u29mvz.svg'

    return(
        <main className="h-screen w-full bg-white">
            <Introduction />
            <div className='relative w-full h-20 bg-white'>
                <Image src={asymmetricalTriangle} alt='design' layout='fill' />
            </div>
        </main>
    )
}