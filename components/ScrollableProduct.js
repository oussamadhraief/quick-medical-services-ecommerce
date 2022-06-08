import Image from 'next/image'
import { useState, useContext } from 'react'
import ContentfulModal from './ContentfulModal'
import LoadingAnimation from './LoadingAnimation'
import Modal from './Modal'
import 'animate.css'
import { ActivatedModalContext } from '../utils/ActivatedModalContext'
import { CartContext } from '../utils/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

export default function ScrollableProduct ({ product }) {

  const Router = useRouter()
  const {data: session} = useSession()

  const eye = 'pfe/eye-12109_hoarin.png'

  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [productContent, setProductContent] = useState({})
  const { activatedModal, setActivatedModal } = useContext(
    ActivatedModalContext
  )
  const { cartNumber, setCartNumber } = useContext(
    CartContext
  )

  const fetchProduct = async () => {
    const res = await fetch('/api/products/' + product.reference)
    const { data } = await res.json()
    setProductContent(data)
  }

  async function handleAddToCart() {
    try {
        const res = await fetch('/api/user/addproducttocart', {
          method : 'PATCH',
          headers:{
              'accept' : 'application/json',
              'Content-Type' : 'application/json'
          },
          body : JSON.stringify({reference : product.reference})
      })
      const { cart } = await res.json()
      setCartNumber(cart)
    } catch (error) {
      console.error(error)
    }
    
    
  }

  return (
    <div className='w-60 min-w-[270px] p-0 relative animate__animated animate__fadeIn md:p-0 group md:min-w-[300px] h-[370px] border-[1px] border-zinc-300 rounded-lg grid place-items-center mb-5 overflow-hidden'>
      {loading ? <LoadingAnimation key='delete' bgOpacity={false} /> : null}
      {product.availability == 'unavailable' ? <div className="absolute top-0 right-1 z-10 w-14 h-12">
                    <Image src={'pfe/feelin_3_or1zjy'} alt='sur commande' layout="fill" />
        </div> : null }

        <div className='mx-auto w-[95%] h-fit flex justify-center items-center relative  hover:cursor-pointer'>
          <div className='bg-white h-fit w-fit rounded-full shadow-3xl px-2 justify-center items-center absolute z-[9999] bottom-1/2 top-1/2 hidden group-hover:flex animate__animated animate__fadeInUp'>
            <Image
              src={eye}
              alt='view product'
              width={30}
              height={30}
              layout='fixed'
              onClick={() => {
                if (!activatedModal) {
                  setLoading(true)
                  setActivatedModal(true)
                  document.body.style.height = '100vh'
                  document.body.style.overflow = 'hidden'
                  fetchProduct().then(() => {
                    setLoading(false)
                    setShow(true)
                  })
                }
              }}
            />
          </div>
          <Image
            src={product.image}
            alt='product image'
            height={220}
            width={220}
            layout='fixed'
            objectFit='contain'
            objectPosition='center'
          />
        </div>

          <Link href={`/products/${product.reference}`}>
            <a className='font-medium text-xl whitespace-nowrap text-ellipsis overflow-hidden w-full text-center px-1 max-w-full hover:text-orange hover:underline'>
              {product.name}
            </a>
          </Link>

            <p className='font-medium text-lg whitespace-nowrap italic text-ellipsis overflow-hidden w-full text-center px-1 max-w-full '>
              Réf - <span className='text-zinc-600'>{product.reference}</span>
            </p>

        <button
          className='bg-pinky shadow-[0px_3px_10px_rgba(247,177,162,0.5)] hover:bg-na3ne3i hover:shadow-[0px_3px_10px_rgba(25,98,102,0.5)] hover:scale-105 transition-all rounded-lg text-white text-sm font-medium px-3 py-2 z-10 my-1 h-fit w-fit whitespace-nowrap'
          onClick={e=> 
           { if(session) {
              setOpen(true)}else{
                Router.push('/login')
              }}}
        >
          Ajouter au panier
        </button>
        <ContentfulModal
          show={show}
          content={productContent}
          onClose={() => {
            document.body.style.height = 'fit'
            document.body.style.overflow = 'auto'
            setActivatedModal(false)
            setShow(false)
          }}
        />
         <Modal show={open} onClose={() => setOpen(false)} onConfirm={() => handleAddToCart()} action={'add'} content={'Êtes-vous sûr de vouloir ajouter ce produit au panier?'} />
    </div>
  )
}
