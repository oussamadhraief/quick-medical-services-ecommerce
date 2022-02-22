import Image from "next/image"
import Link from "next/link"

export default function Footer(){

    const delivery = 'pfe/delivery_v7wo2v.png'
    const payment = 'pfe/payment_zy8xmo.png'
    const rapidity = 'pfe/rapidity_xclfrf.png'
    const satisfaction = 'pfe/satisfait_yak5un.png'
    const facebook = 'pfe/facebook_dryelz.png'
    const location = 'pfe/location_nkg5e0.png'

    return (
        <footer className="w-full h-[600px] grid bg-ciel rounded-tr-[70px] mt-32 shadow-3xl">
            <div className="h-fit py-10 px-14 w-[94%] flex justify-start gap-32 flex-nowrap items-center">
                <div className="flex flex-nowrap justify-between gap-4 items-center w-fit h-fit">
                    <Image src={delivery} alt='' width={80} height={80} layout='fixed' />
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
            <div className="w-[94%] min-h-full flex h-full bg-third rounded-tr-[70px]">
                <div>
                    <address className="text-white grid">
                    <Link href='mailto:qms.jribi@gmail.com'>
                    <a target='_blank'>&#x2709; Email: qms.jribi@gmail.com</a>
                    </Link>
                    <Link href="tel:+216-44-219-218">
                    <a >&#x260E; Tel: 44 219 218</a>
                    </Link>
                        
                    <Link href='https://www.facebook.com/QMSJRIBI'>
                        <a target='_blank' className="flex items-center flex-nowrap"><Image src={facebook} alt='facebook' width={18} height={18} layout='fixed' />&nbsp;Facebook: QUICK Medical services</a>
                    </Link>
                    <div className="flex items-center flex-nowrap">
                        <Image src={location} alt='location' width={20} height={20} layout='fixed' />
                        <p>Sfax, Tunisie</p>
                    </div>
                    </address>
                </div>
                <div className="text-white italic">
                    Créé par&nbsp;
                    <Link href='mailto:oussema.dhraief@gmail.com'>
                    <a target='_blank'>Oussema</a>
                    </Link>
                    &nbsp;et&nbsp;
                    <Link href='mailto:halouani142@gmail.com'>
                    <a target='_blank'>Mohamed</a>
                    </Link>
                    &nbsp;&#xa9;&nbsp; 2022,&nbsp;Tunisie.
                </div>
            </div>
        </footer>
    )
}