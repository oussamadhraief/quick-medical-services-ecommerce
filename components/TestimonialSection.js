import Image from 'next/image'

export default function TestimonialSection(){

    const testimonials = [{author: 'Dhraief Dhraief',message: 'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'},{author: 'Dhraief Dhraief',message: 'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'},{author: 'Dhraief Dhraief',message: 'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'},]

    const quotes = 'pfe/right-quotes-13252_m2dsct.png'

    return (
        <div className='w-full h-fit grid mb-12 mt-32'>
            <p className="w-fit h-fit mx-auto text-3xl text-secondary font-semibold after:content-[''] after:bg-zinc-400 after:w-7/12 after:h-[1px] after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto relative">Avis de nos clients</p>
            <p className='w-fit h-fit mx-auto text-base text-third font-medium mt-1'>Ils nous ont fait confiance et témoignent</p>
            <div className='flex flex-nowrap justify-evenly items-center w-full h-fit mt-20'>
                {testimonials.map((item,index) => <div className={`relative w-[450px] h-60 shadow-float grayscale blur-[1px] px-10 py-7 group hover:cursor-pointer rounded-md`}>
                        <div className='absolute w-10 h-10 -top-5 left-0 right-0 mx-auto bg-white rounded-full shadow-lg'>
                            <Image src={quotes} alt='quotes' width={40} height={40} layout='fixed' />
                        </div>
                        <h1 className='w-fit mb-2 h-fit mx-auto drop-shadow-2xl font-semibold text-lg'>Dhraief Dhraief</h1>
                        <q className='text-sm italic text-third'>Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.</q>
                        <div className='absolute w-full h-2 hidden group-hover:block bg-secondary left-0 bottom-0 rounded-b-md'>
                            
                        </div>
        </div>)}
            </div>
            <div className='w-fit h-fit flex flex-nowrap mx-auto mt-20 gap-3'>
                <button className='w-fit h-fit text-5xl font-bold text-zinc-400 hover:scale-x-[1.8] transition-all hover:text-secondary'>&#x2190;</button>
                <button className='w-fit h-fit text-5xl font-bold text-zinc-400 hover:scale-x-[1.8] transition-all hover:text-secondary'>&#x2192;</button>
            </div>
        </div>
    )
}