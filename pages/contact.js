import Header from '../components/Header'
import Footer from '../components/Footer'
import { CategoriesContext } from '../utils/CategoriesContext'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchContext } from '../utils/SearchContext'
import Link from 'next/link'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { CartContext } from "../utils/CartContext"



export default function Contact () {
  const { data: session,status } = useSession()
  const facebook = 'pfe/facebook_dryelz.png'

  const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState(
    []
  )
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: ''
  })
  const [cartNumber,setCartNumber] = useState(0)
  const [loading,setLoading] = useState(false)


  const handleChange = e => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    })
  }

  
  useEffect(() => {
    if (session) {
      setFormData({
        name: session.user.name,
        email: session.user.email,
        phoneNumber: session.user.phone,
        subject: '',
        message: ''
      })
    }
  }, [status])

  useEffect(() => {
    async function fetchData () {
      try {
        const res = await fetch('/api/categoriesandsubcategories')
        const { data } = await res.json()
        let categories = data.map(item => item.category)
        categories = [...new Set(categories)]
        const orderedStuff = categories.map(item => orderedTable(item, data))
        setCategoriesAndSubcategories(orderedStuff)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  
  useEffect(() => {
    if(session){
      async function fetchCart(){
          const res = await fetch('/api/user/usercart')
          const { data } = await res.json()
          setCartNumber(data.length)
      }
      fetchCart()
    }
  },[status])

  function orderedTable (item, data) {
    return {
      category: item,
      subcategories: [
        ...new Set(
          data
            .filter(element => element.category == item)
            .map(elem => elem.subcategory)
        )
      ]
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const formInputs = { ...formData, isRead: false, isReview: false }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formInputs)
      }).then(res => {
        setLoading(false)
        if (res.ok) {
          setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            subject: '',
            message: ''
          })
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Head>
        <title>Contact - QUICK Medical Services</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='Medical Supply Store' />
        <meta name='robots' content='index, follow' />
        <link rel='icon' href='/logo.png' />
        <meta name='googlebot' content='index, follow' />
        <meta name='keywords' content='' />
        <meta name='image' content='' />
        <meta itemProp='name' content='QUICK Medical Services' />
        <meta itemProp='description' content='Medical Supply Store' />
        <meta property='og:title' content='QUICK Medical Services' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='' />
        <meta property='og:image' content='' />
        <meta property='og:description' content='Medical Supply Store' />
        <meta itemProp='name' content='QUICK Medical Services' />
        <meta itemProp='description' content='Medical Supply Store' />
        <meta itemProp='image' content='' />
        <meta name='twitter:card' value='summary_large_image' />
        <meta name='twitter:title' value='QUICK Medical Services' />
        <meta name='twitter:description' value='Medical Supply Store' />
        <meta name='twitter:image' value='' />
      </Head>
      <CategoriesContext.Provider
        value={{ categoriesAndSubcategories, setCategoriesAndSubcategories }}
      >
        <SearchContext.Provider value={{search,setSearch}} >
            <CartContext.Provider value={{cartNumber,setCartNumber}} >
                <Header landingPage={false}  />
            </CartContext.Provider>
            </SearchContext.Provider>
      </CategoriesContext.Provider>
      <div className='flex-col lg:flex-row lg:flex w-11/12 lg:w-10/12  mx-auto  shadow-form mt-20 rounded-br-[50px] h-fit rounded-tl-[50px] overflow-hidden'>
        <div className='lg:w-1/2 pt-2 pb-10 lg:p-0 mx-auto contactside bg-[#E7EDEE]'>
          <div className='w-9/12 mx-auto mt-12 mb-8'>
            <h1 className='text-white text-4xl font-bold'><span className='border-b-2 border-pinky'>Contactez</span>  nous</h1>
            <p className='text-white mt-2 font-medium'>
              Vos suggestions sont bienvenues
            </p>
          </div>

          <div className='w-9/12 mx-auto space-y-4 '>
            <Link href='https://www.facebook.com/QMSJRIBI'>
              <a
                target='_blank'
                className='flex text-white w-fit items-center flex-nowrap whitespace-nowrap font-medium'
              >
                <Image
                  src={facebook}
                  alt='facebook'
                  width={18}
                  height={18}
                  layout='fixed'
                />
                &nbsp;&nbsp;&nbsp;Facebook: QUICK Medical services
              </a>
            </Link>

            <p className='whitespace-nowrap text-white font-medium '>
              &#x2709;&nbsp;&nbsp; Email: qms.jribi@gmail.com
            </p>

            <p className='whitespace-nowrap text-white font-medium'>
              &#x260E;&nbsp;&nbsp; Tel: +216 44 219 218
            </p>
          </div>
        </div>

        <form
          className='lg:w-6/12 h-fit relative bg-[#E7EDEE] space-y-10 pb-14 pt-8 lg:space-y-10'
          onSubmit={handleSubmit}
        >
          {loading ? <div
            id='contact-loading'
            className=' absolute w-full h-full bg-[#e7edeea5] z-[9] '
          >
            <div className='reverse-spinner '></div>
          </div> :null }

          <div className='relative mx-auto w-11/12 h-fit'>
            <input
              className='bg-transparent form-input border-na3ne3i invalid:border-pinky peer invalid:text-pinky'
              placeholder=' '
              required
              type='text'
              name='name'
              id='formName'
              value={formData.name}
              minLength={4}
              onChange={handleChange}
            />
            <label className='form-label text-na3ne3i' htmlFor='formName'>
              Nom et Prénom
            </label>
          </div>
          <div className='relative mx-auto w-11/12 h-fit'>
            <input
              className='bg-transparent form-input border-na3ne3i invalid:border-pinky peer invalid:text-pinky'
              placeholder=' '
              type='email'
              required
              name='email'
              id='formEmail'
              value={formData.email}
              onChange={handleChange}
            />
            <label className='form-label text-na3ne3i' htmlFor='formEmail'>
              Email
            </label>
          </div>
          <div className='relative mx-auto w-11/12 h-fit'>
            <input
              className='bg-transparent form-input border-na3ne3i invalid:border-pinky peer invalid:text-pinky appearance'
              placeholder=' '
              type='number'
              required
              name='phoneNumber'
              id='formPhoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <label className='form-label text-na3ne3i' htmlFor='formPhoneNumber'>
              Num. de téléphone
            </label>
          </div>
          <div className='relative mx-auto w-11/12 h-fit'>
            <input
              className='bg-transparent form-input border-na3ne3i invalid:border-pinky peer invalid:text-pinky'
              placeholder=' '
              type='text'
              required
              name='subject'
              id='formSubject'
              value={formData.subject}
              onChange={handleChange}
            />
            <label className='form-label text-na3ne3i' htmlFor='formSubject'>
              Sujet
            </label>
          </div>
          <div className='relative mx-auto w-11/12 h-fit'>
            <textarea
              className='h-32 bg-transparent form-input border-na3ne3i invalid:border-pinky peer invalid:text-pinky'
              placeholder=' '
              required
              col={50}
              row={4}
              name='message'
              id='formTextArea'
              value={formData.message}
              onChange={handleChange}
            />
            <label className='form-label text-na3ne3i' htmlFor='formTextArea'>
              Message
            </label>
          </div>
          <button
            className='flex text-white px-5 font-medium rounded-lg py-2 mx-auto bg-orange shadow-form hover:scale-110 transition-all'
            type='submit'
          >
            Envoyer
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps () {
  return { props: { hi: 'hi' } }
}
