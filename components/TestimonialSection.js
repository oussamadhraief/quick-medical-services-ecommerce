import Image from 'next/image'
import { useEffect, useState,useRef } from 'react'

export default function TestimonialSection ({ data }) {

  const mainTestimonial = useRef()
  const timeouts = useRef([])

  const quotes = 'pfe/right-quotes-13252_m2dsct_ijvj9k.png'

  const [activeReviews, setActiveReviews] = useState([])
  const [testimonials,setTestimonials] = useState([])
  const [isMobile, setIsMobile] = useState(32.5)
  const [ind, setInd] = useState(0)

  useEffect(() => {
      setTestimonials(data)
      if(data.length == 3){
        setInd(1)
        setActiveReviews([
          data[1],
          data[2],
          data[0],
          data[1],
          data[2]
        ])
      }

      if(data.length == 4){
        setInd(2)
        setActiveReviews([
          data[2],
          data[3],
          data[0],
          data[1],
          data[2]
        ])
      }

      if(data.length > 4 ){
        setInd(data.length - 2)
        setActiveReviews([
          data[data.length - 2],
          data[data.length - 1],
          data[0],
          data[1],
          data[2]
        ])
      }
      
      const mq1 = window.matchMedia("(max-width: 1023px)")
       if(mq1.matches){
         setIsMobile(100)
       }
      const right = document.getElementById('navigateRightReview')
      const left = document.getElementById('navigateLeftReview')
      right.addEventListener('click', () => {
        right.disabled = true
        left.disabled = true
        timeouts.current.push(setTimeout(() => {
          left.disabled = false
          right.disabled = false
        }, 1000))
      })
      left.addEventListener('click', () => {
        left.disabled = true
        right.disabled = true
        timeouts.current.push(setTimeout(() => {
          right.disabled = false
          left.disabled = false
        }, 1000))
      })
      const interval = setInterval(() => {
        right.click()
      }, 10000)
    return () => {
      clearInterval(interval)
      for( const item of timeouts.current){
        clearTimeout(item)
      }
      right.removeEventListener('click', () => {
        right.disabled = true
        left.disabled = true
        timeouts.current.push(setTimeout(() => {
          left.disabled = false
          right.disabled = false
        }, 1000))
      })
      left.removeEventListener('click', () => {
        left.disabled = true
        right.disabled = true
        timeouts.current.push(setTimeout(() => {
          right.disabled = false
          left.disabled = false
        }, 1000))
      })
    }
  }, [])

  const handleScrollRight = () => {
    const section = document.querySelectorAll('#scrollableTestimonial div')
    section.forEach(item => {
      item.style.transitionDuration = '0.3s'
      item.style.transform = `translateX(-${isMobile}vw)`
    })
    timeouts.current.push(setTimeout(() => {
      section.forEach((item, index) => {
        item.style.transitionDuration = '0s'
        item.style.transform = 'translateX(0px)'
      })
      let count
      if (ind < testimonials.length - 1) {
        count = ind + 1
        setInd(count)
      } else {
        count = 0
        setInd(0)
      }
      let ind1
      let ind2
      let ind3
      let ind4
      if (count + 1 < testimonials.length) {
        ind1 = count + 1
      } else {
        ind1 = 0
      }
      if (ind1 + 1 < testimonials.length) {
        ind2 = ind1 + 1
      } else {
        ind2 = 0
      }
      if (ind2 + 1 < testimonials.length) {
        ind3 = ind2 + 1
      } else {
        ind3 = 0
      }
      if (ind3 + 1 < testimonials.length) {
        ind4 = ind3 + 1
      } else {
        ind4 = 0
      }
      setActiveReviews([
        testimonials[ind],
        testimonials[ind1],
        testimonials[ind2],
        testimonials[ind3],
        testimonials[ind4]
      ])
      timeouts.current.push(setTimeout(() => {
        mainTestimonial.current.style.transitionDuration = '0.3s'
        if(isMobile == 32.5)mainTestimonial.current.style.transform = 'scale(1.3)'
      }, 50))
    }, 300))
  }

  const handleScrollLeft = () => {
    const section = document.querySelectorAll('#scrollableTestimonial div')
    section.forEach(item => {
      item.style.transitionDuration = '0.3s'
      item.style.transform = `translateX(${isMobile}vw)`
    })
    timeouts.current.push(setTimeout(() => {
      section.forEach((item, index) => {
        item.style.transitionDuration = '0s'
        item.style.transform = 'translateX(0px)'
      })
      let count
      if (ind - 1 >= 0) {
        count = ind - 1
        setInd(count)
      } else {
        count = testimonials.length - 1
        setInd(testimonials.length - 1)
      }
      let ind1
      let ind2
      let ind3
      let ind4
      if (count + 1 < testimonials.length) {
        ind1 = count + 1
      } else {
        ind1 = 0
      }
      if (ind1 + 1 < testimonials.length) {
        ind2 = ind1 + 1
      } else {
        ind2 = 0
      }
      if (ind2 + 1 < testimonials.length) {
        ind3 = ind2 + 1
      } else {
        ind3 = 0
      }
      if (ind3 + 1 < testimonials.length) {
        ind4 = ind3 + 1
      } else {
        ind4 = 0
      }
      setActiveReviews([
        testimonials[ind],
        testimonials[ind1],
        testimonials[ind2],
        testimonials[ind3],
        testimonials[ind4]
      ])

      timeouts.current.push(setTimeout(() => {
        mainTestimonial.current.style.transitionDuration = '0.3s'
        if(isMobile == 32.5)mainTestimonial.current.style.transform = 'scale(1.3)'
      }, 50))
    }, 300))
  }

  return (
    <div className='w-full h-fit grid mb-12 mt-32 overflow-hidden'>
      <p className="w-fit h-fit mx-auto text-[36px] font-bold after:content-['']  after:w-7/12 after:h-[3px] after:bg-pinky after:absolute after:bottom-1.5 after:-right-0.5 relative text-third mainPageTitle">
        Avis de nos clients 
      </p>
      <p className='w-fit h-fit mx-auto text-third font-medium mt-1.5'>
        Ils nous ont fait confiance et témoignent
      </p>
      <div
        id='scrollableTestimonial'
        className='flex flex-nowrap justify-evenly items-center w-fit -translate-x-[200vw] lg:-translate-x-[32.5vw] min-w-full h-fit mt-20'
      >
        {activeReviews.map((item, index) => {
          if (index == 1 || index == 3)
            return (
              <div
                key={index}
                className={`relative w-[100vw] flex flex-col min-h-[250px] lg:w-[25vw] lg:mx-[5vw] h-64 shadow-float grayscale blur-[1px] px-10 py-7 group hover:cursor-pointer rounded-md transition-all duration-300`}
              >
                <div className='absolute w-10 h-10 -top-5 left-0 right-0 mx-auto bg-white rounded-full shadow-lg'>
                  <Image
                    src={quotes}
                    alt='quotes'
                    width={40}
                    height={40}
                    layout='fixed'
                  />
                </div>

                <q className='text-sm italic text-third h-44 overflow-hidden w-full text-ellipsis break-words'>{item.message}</q>
                <div className='absolute w-full h-2 hidden group-hover:block bg-orange left-0 bottom-0 rounded-b-md'></div>
                <div className='w-fit mx-auto flex flex-nowrap items-center h-fit gap-3 mt-3'>
                  <div
                    className='w-12 h-12 rounded-full shadow relative'
                    style={{
                      background: `url("https://avatars.dicebear.com/api/personas/${item.name}.svg?mood[]=happy") no-repeat center center`
                    }}
                  ></div>
                  <h1 className='w-fit mb-2 h-fit mx-auto drop-shadow-2xl font-semibold text-md'>
                    {item.name}
                  </h1>
                </div>
              </div>
            )
          if (index == 0)
            return (
              <div
                key={index}
                className={`relative w-[100vw] flex flex-col lg:w-[25vw] lg:ml-[5vw] lg:mr-[2.5vw] h-64 shadow-float grayscale blur-[1px] px-10 py-7 group hover:cursor-pointer rounded-md transition-all duration-300`}
              >
                <div className='absolute w-10 h-10 -top-5 left-0 right-0 mx-auto bg-white rounded-full shadow-lg'>
                  <Image
                    src={quotes}
                    alt='quotes'
                    width={40}
                    height={40}
                    layout='fixed'
                  />
                </div>

                <q className='text-sm italic text-third h-60 overflow-hidden w-full text-ellipsis break-words'> {item.message}</q>
                <div className='absolute w-full h-2 hidden group-hover:block bg-orange left-0 bottom-0 rounded-b-md'></div>
                <div className='w-fit mx-auto flex flex-nowrap items-center h-fit gap-3 mt-3'>
                  <div
                    className='w-12 h-12 rounded-full shadow relative'
                    style={{
                      background: `url("https://avatars.dicebear.com/api/personas/${item.name}.svg?mood[]=happy") no-repeat center center`
                    }}
                  ></div>
                  <h1 className='w-fit mb-2 h-fit mx-auto drop-shadow-2xl font-semibold text-md'>
                    {item.name}
                  </h1>
                </div>
              </div>
            )
          if (index == 4)
            return (
              <div
                key={index}
                className={`relative w-[100vw] flex flex-col lg:w-[25vw] lg:mr-[5vw] lg:ml-[2.5vw] h-64 shadow-float grayscale blur-[1px] px-10 py-7 group hover:cursor-pointer rounded-md transition-all duration-300`}
              >
                <div className='absolute w-10 h-10 -top-5 left-0 right-0 mx-auto bg-white rounded-full shadow-lg'>
                  <Image
                    src={quotes}
                    alt='quotes'
                    width={40}
                    height={40}
                    layout='fixed'
                  />
                </div>

                <q className='text-sm italic text-third h-60 overflow-hidden w-full text-ellipsis break-words'> {item.message}</q>
                <div className='absolute w-full h-2 hidden group-hover:block bg-orange left-0 bottom-0 rounded-b-md'></div>
                <div className='w-fit mx-auto flex flex-nowrap items-center h-fit gap-3 mt-3'>
                  <div
                    className='w-12 h-12 rounded-full shadow relative'
                    style={{
                      background: `url("https://avatars.dicebear.com/api/personas/${item.name}.svg?mood[]=happy") no-repeat center center`
                    }}
                  ></div>
                  <h1 className='w-fit mb-2 h-fit mx-auto drop-shadow-2xl font-semibold text-md'>
                    {item.name}
                  </h1>
                </div>
              </div>
            )
          return (
            <div
            ref={mainTestimonial}
              key={index}
              className={`relative w-[90vw] flex flex-col h-64 mx-[5vw] lg:w-[25vw] lg:mx-[2.5vw] shadow-float lg:scale-[1.3] px-10 py-7 group hover:cursor-pointer rounded-md transition-all duration-300`}
            >
              <div className='absolute w-10 h-10 -top-5 left-0 right-0 mx-auto bg-white rounded-full shadow-lg'>
                <Image
                  src={quotes}
                  alt='quotes'
                  width={40}
                  height={40}
                  layout='fixed'
                />
              </div>

              <q className='text-sm italic text-third h-60 overflow-hidden w-full text-ellipsis break-words'>
                 {item.message}
              </q>
              <div className='absolute w-full h-2 hidden group-hover:block bg-orange left-0 bottom-0 rounded-b-md'></div>
              <div className='w-fit mx-auto flex flex-nowrap items-center h-fit gap-3 mt-3'>
                <div
                  className='w-12 h-12 rounded-full shadow relative'
                  style={{
                    background: `url("https://avatars.dicebear.com/api/personas/${item.name}.svg?mood[]=happy") no-repeat center center`
                  }}
                ></div>
                <h1 className='w-fit mb-2 h-fit mx-auto drop-shadow-2xl font-semibold text-md'>
                  {item.name}
                </h1>
              </div>
            </div>
          )
        })}
      </div>
      <div className='w-fit h-fit flex flex-nowrap mx-auto mt-10 md:mt-20'>
        <button
          id='navigateLeftReview'
          className='w-fit h-fit text-5xl px-5 py-4 font-bold text-zinc-400 scale-x-[1.4] hover:scale-x-[1.8] transition-all hover:text-orange'
          onClick={e => handleScrollLeft()}
        >
          &#x2190;
        </button>
        <button
          id='navigateRightReview'
          className='w-fit h-fit text-5xl px-5 py-4 font-bold text-zinc-400 scale-x-[1.4] hover:scale-x-[1.8] transition-all hover:text-orange'
          onClick={e => handleScrollRight()}
        >
          &#x2192;
        </button>
      </div>
    </div>
  )
}
