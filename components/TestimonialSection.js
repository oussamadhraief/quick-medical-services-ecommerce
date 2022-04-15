import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function TestimonialSection () {
  const testimonials = [
    {
      author: 'gdoura',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    },
    {
      author: 'dhraief',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    },
    {
      author: '3',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    },
    {
      author: 'mohamed',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    },
    {
      author: '5',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    },
    {
      author: 'sameh derbali',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    },
    {
      author: '7',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    },
    {
      author: '8',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    },
    {
      author: '9',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    },
    {
      author: '10',
      message:
        'Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.'
    }
  ]

  const quotes = 'pfe/right-quotes-13252_m2dsct.png'

  const [activeReviews, setActiveReviews] = useState([])
  const [ind, setInd] = useState(0)

  useEffect(() => {
    setActiveReviews([
      testimonials[0],
      testimonials[1],
      testimonials[2],
      testimonials[3],
      testimonials[4]
    ])
    document.getElementById('scrollableTestimonial').style.transform =
      'translateX(-32vw)'
    const right = document.getElementById('navigateRightReview')
    const left = document.getElementById('navigateLeftReview')
    right.addEventListener('click', () => {
      right.disabled = true
      left.disabled = true
      setTimeout(() => {
        left.disabled = false
        right.disabled = false
      }, 1000)
    })
    left.addEventListener('click', () => {
      left.disabled = true
      right.disabled = true
      setTimeout(() => {
        right.disabled = false
        left.disabled = false
      }, 1000)
    })
    setInterval(() => {
      right.click()
    }, 10000)
  }, [])

  const handleScrollRight = () => {
    const section = document.querySelectorAll('#scrollableTestimonial div')
    section.forEach(item => {
      item.style.transitionDuration = '0.3s'
      item.style.transform = 'translateX(-32vw)'
    })
    setTimeout(() => {
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
      setTimeout(() => {
        document.querySelector(
          '#scrollableTestimonial > div:nth-child(3)'
        ).style.transitionDuration = '0.3s'
        document.querySelector(
          '#scrollableTestimonial > div:nth-child(3)'
        ).style.transform = 'scale(1.3)'
      }, 50)
    }, 300)
  }

  const handleScrollLeft = () => {
    const section = document.querySelectorAll('#scrollableTestimonial div')
    section.forEach(item => {
      item.style.transitionDuration = '0.3s'
      item.style.transform = 'translateX(32vw)'
    })
    setTimeout(() => {
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

      setTimeout(() => {
        document.querySelector(
          '#scrollableTestimonial > div:nth-child(3)'
        ).style.transitionDuration = '0.3s'
        document.querySelector(
          '#scrollableTestimonial > div:nth-child(3)'
        ).style.transform = 'scale(1.3)'
      }, 50)
    }, 300)
  }

  return (
    <div className='w-full h-fit grid mb-12 mt-32 overflow-hidden'>
      <p className="w-fit h-fit mx-auto text-[44px] text-na3ne3i font-bold after:content-[''] after:bg-zinc-400 after:w-7/12 after:h-[1px] after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto relative">
        Avis de nos clients
      </p>
      <p className='w-fit h-fit mx-auto text-base text-third font-medium mt-1.5'>
        Ils nous ont fait confiance et témoignent
      </p>
      <div
        id='scrollableTestimonial'
        className='flex flex-nowrap justify-evenly items-center w-fit gap-[7vw] min-w-full h-fit mt-20'
      >
        {activeReviews.map((item, index) => {
          let avatarBackground = {
            background: `url("https://avatars.dicebear.com/api/personas/${item.author}.svg?mood[]=happy") no-repeat center center`
          }
          if (index == 1 || index == 3)
            return (
              <div
                key={index}
                className={`relative w-[25vw] h-60 shadow-float grayscale blur-[1px] px-10 py-7 group hover:cursor-pointer rounded-md transition-all duration-300`}
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

                <q className='text-sm italic text-third'>{item.message}</q>
                <div className='absolute w-full h-2 hidden group-hover:block bg-secondary left-0 bottom-0 rounded-b-md'></div>
                <div className='w-fit mx-auto flex flex-nowrap items-center h-fit gap-3 mt-3'>
                  <div
                    className='w-12 h-12 rounded-full shadow relative'
                    style={
                      avatarBackground
                    }
                  ></div>
                  <h1 className='w-fit mb-2 h-fit mx-auto drop-shadow-2xl font-semibold text-md'>
                    {item.author}
                  </h1>
                </div>
              </div>
            )
          if (index == 0)
            return (
              <div
                key={index}
                className={`relative w-[25vw] h-60 shadow-float grayscale blur-[1px] px-10 py-7 group hover:cursor-pointer rounded-md transition-all duration-300 ml-[7vw]`}
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

                <q className='text-sm italic text-third'>{item.message}</q>
                <div className='absolute w-full h-2 hidden group-hover:block bg-secondary left-0 bottom-0 rounded-b-md'></div>
                <div className='w-fit mx-auto flex flex-nowrap items-center h-fit gap-3 mt-3'>
                  <div
                    className='w-12 h-12 rounded-full shadow relative'
                    style={
                      avatarBackground
                    }
                  ></div>
                  <h1 className='w-fit mb-2 h-fit mx-auto drop-shadow-2xl font-semibold text-md'>
                    {item.author}
                  </h1>
                </div>
              </div>
            )
          if (index == 4)
            return (
              <div
                key={index}
                className={`relative w-[25vw] h-60 shadow-float grayscale blur-[1px] px-10 py-7 group hover:cursor-pointer rounded-md transition-all duration-300 mr-[7vw]`}
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

                <q className='text-sm italic text-third'>{item.message}</q>
                <div className='absolute w-full h-2 hidden group-hover:block bg-secondary left-0 bottom-0 rounded-b-md'></div>
                <div className='w-fit mx-auto flex flex-nowrap items-center h-fit gap-3 mt-3'>
                  <div
                    className='w-12 h-12 rounded-full shadow relative'
                    style={
                      avatarBackground
                    }
                  ></div>
                  <h1 className='w-fit mb-2 h-fit mx-auto drop-shadow-2xl font-semibold text-md'>
                    {item.author}
                  </h1>
                </div>
              </div>
            )
          return (
            <div
              key={index}
              className={`relative w-[450px] h-60 shadow-float scale-[1.3] px-10 py-7 group hover:cursor-pointer rounded-md transition-all duration-300`}
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

              <q className='text-sm italic text-third'>
                Wikipedia is a free online encyclopedia, created and edited by
                volunteers around the world and hosted by the Wikimedia
                Foundation. Wikipedia is a free online encyclopedia, created and
                edited by volunteers around the world and hosted by the
                Wikimedia Foundation.
              </q>
              <div className='absolute w-full h-2 hidden group-hover:block bg-secondary left-0 bottom-0 rounded-b-md'></div>
              <div className='w-fit mx-auto flex flex-nowrap items-center h-fit gap-3 mt-3'>
                <div
                  className='w-12 h-12 rounded-full shadow relative'
                  style={{
                    background: `url("https://avatars.dicebear.com/api/personas/${item.author}.svg?mood[]=happy") no-repeat center center`
                  }}
                ></div>
                <h1 className='w-fit mb-2 h-fit mx-auto drop-shadow-2xl font-semibold text-md'>
                  {item.author}
                </h1>
              </div>
            </div>
          )
        })}
      </div>
      <div className='w-fit h-fit flex flex-nowrap mx-auto mt-20 gap-3'>
        <button
          id='navigateLeftReview'
          className='w-fit h-fit text-5xl font-bold text-zinc-400 hover:scale-x-[1.8] transition-all hover:text-secondary'
          onClick={e => handleScrollLeft()}
        >
          &#x2190;
        </button>
        <button
          id='navigateRightReview'
          className='w-fit h-fit text-5xl font-bold text-zinc-400 hover:scale-x-[1.8] transition-all hover:text-secondary'
          onClick={e => handleScrollRight()}
        >
          &#x2192;
        </button>
      </div>
    </div>
  )
}
