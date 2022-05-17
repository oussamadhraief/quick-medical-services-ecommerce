import Image from 'next/image'
import SizeSelection from './SizeSelection'
import { useState, useContext } from 'react'
import ContentfulModal from './ContentfulModal'
import 'animate.css'
import { SizeSelectionContext } from '../utils/SizeSelectionContext'
import { ActivatedModalContext } from '../utils/ActivatedModalContext'
import { CartContext } from '../utils/CartContext'
import Link from 'next/link'

export default function ScrollableProduct ({ product }) {
  const eye = 'pfe/eye-12109_hoarin.png'

  const [show, setShow] = useState(false)
  const [selectedSize, setSelectedSize] = useState(0)
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
    const res = await fetch('/api/user/addtocart', {
        method : 'PATCH',
        headers:{
            'accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({reference : product.reference})
    })
    const { success } = await res.json()
    if(success) setCartNumber(prev => prev + 1)
    
  }

  return (
    <div className='w-60 min-w-min p-3 relative animate__animated animate__fadeIn md:p-0 group md:min-w-[320px] h-[390px] border-[1px] border-zinc-300 rounded-lg grid place-items-center mb-5 overflow-hidden'>
      <SizeSelectionContext.Provider value={{ selectedSize, setSelectedSize }}>
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
                  setActivatedModal(true)
                  document.body.style.height = '100vh'
                  document.body.style.overflow = 'hidden'
                  setSelectedSize(0)
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

        <div className='h-fit w-fit max-w-full overflow-hidden mx-auto px-1'>
          <Link href={`/products/${product.reference}`}>
            <a className='font-medium text-xl whitespace-nowrap text-ellipsis overflow-clip hover:text-ciel hover:underline'>
              {product.name}
            </a>
          </Link>
        </div>
        <div className='w-full h-10 overflow-clip flex justify-center'>
          <SizeSelection sizes={product.sizes} />
        </div>

        <button
          className='bg-na3ne3i rounded-lg text-white text-sm font-medium px-3 py-2 z-10 my-1 h-fit w-fit whitespace-nowrap'
          onClick={e=> handleAddToCart(e)}
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
      </SizeSelectionContext.Provider>
    </div>
  )
}
