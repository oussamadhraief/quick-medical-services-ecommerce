import Image from "next/image"
import Link from "next/link"

export default function Footer(){

    const delivery = 'pfe/delivery_nexa3b.png'
    const payment = 'pfe/payment_zy8xmo.png'
    const rapidity = 'pfe/rapidity_xclfrf.png'
    const satisfaction = 'pfe/satisfait_yak5un.png'
    const facebook = 'pfe/facebook_dryelz.png'
    const location = 'pfe/location_nkg5e0.png'
    const logo = 'pfe/logoqms2_2_kslfsx.png'

    return (
        <footer className="w-full min-w-full h-fit grid bg-ciel rounded-tr-[70px] mt-32 shadow-3xl">
            <div className="h-fit py-5 px-5 w-[94%] flex justify-center gap-10 lg:gap-20 flex-wrap md:flex-nowrap items-center">
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={delivery} alt='' width={100} height={60} layout='fixed' />
                    <p className="text-center font-medium text-sm text-third">Livraison à<br></br>domicile</p>
                </div>
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={payment} alt='' width={80} height={80} layout='fixed' />
                    <p className="text-center font-medium text-sm text-third">Paiement à<br></br>la livraison</p>
                </div>
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={rapidity} alt='' width={80} height={80} layout='fixed' />
                    <p className="text-center font-medium text-sm text-third">Rapidité et<br></br>efficacité</p>
                </div>
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={satisfaction} alt='' width={80} height={80} layout='fixed' />
                    <p className="text-start font-medium text-sm text-third">Garantie de<br></br>satisfaction totale</p>
                </div>
            </div>
            <div className="w-[98%] md:w-[94%] min-h-[350px] gap-10 grid place-items-center px-5 lg:flex lg:justify-around items-center h-fit py-10 lg:py-20 bg-third rounded-tr-[70px]">
                <address className="text-white grid place-items-center space-y-2 not-italic w-fit h-fit">
                    <Link href='https://www.facebook.com/QMSJRIBI'>
                        <a target='_blank' className="flex items-center flex-nowrap whitespace-nowrap"><Image src={facebook} alt='facebook' width={16} height={16} layout='fixed' />&nbsp;Facebook: QUICK Medical services</a>
                    </Link>
                    <p className="whitespace-nowrap">&#x2709; Email: qms.jribi@gmail.com</p>
                    <p className="whitespace-nowrap">&#x260E; Tel: +216 44 219 218</p>
                        
                    <div className="flex items-center flex-nowrap">
                        <Image src={location} alt='location' width={20} height={20} layout='fixed' />
                        <p className="whitespace-nowrap">Sfax, Tunisie</p>
                    </div>
                </address>
                    
                <div className="text-white italic flex flex-nowrap justify-center h-fit w-fit items-center whitespace-nowrap"> Créé par&nbsp;
                    <div className="font-medium text-ciel hover:cursor-pointer relative group">
                        Oussema&nbsp;
                        <p className="absolute -top-[85px] -left-20 text-center bg-white hidden text-third group-hover:block px-2 py-1 rounded-xl after:content-[''] after:absolute after:-bottom-3 after:right-24 after:border-b-0 after:border-r-[15px] after:border-r-transparent after:border-l-[15px] after:border-l-transparent after:border-t-[15px] after:border-t-white">Oussema Dhraief
                        oussema.dhraief@gmail.com <br></br>
                        <Link href='https://www.oussama-dhraief.tech'>
                            <a target='_blank'>www.oussama-dhraief.tech</a>
                        </Link></p>
                    </div> et &nbsp;
                    <div className="font-medium text-secondary hover:cursor-pointer relative group">
                        Mohamed
                        <p className="absolute -top-[70px] -left-16 text-center bg-white hidden text-third group-hover:block px-3 py-2 rounded-xl after:content-[''] after:absolute after:-bottom-3 after:right-20 after:border-b-0 after:border-r-[15px] after:border-r-transparent after:border-l-[15px] after:border-l-transparent after:border-t-[15px] after:border-t-white">Mohamed Halouani
                        halouani142@gmail.com</p>
                    </div>&nbsp; &#xa9;  2022, Tunisie.
                </div>
                    <div className="w-fit h-fit flex flex-nowrap justify-center items-center hover:cursor-pointer relative group" onClick={() => window.scroll(0,0)}>
                        <Image src={logo} alt='Quick medical services logo' width={120} height={120} layout='fixed' objectFit="center" />
                        <p className="absolute -top-10 -left-8 text-center font-semibold bg-white hidden text-third whitespace-nowrap group-hover:block px-2 py-1 rounded-xl after:content-[''] after:absolute after:-bottom-3 after:left-20 after:border-b-0 after:border-r-[15px] after:border-r-transparent after:border-l-[15px] after:border-l-transparent after:border-t-[15px] after:border-t-white">QUICK Medical Services</p>
                    </div>
            </div>
        </footer>
    )
}