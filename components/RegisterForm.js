import {useState } from 'react'
import {useSession} from "next-auth/react"
import Link from 'next/link'
import 'animate.css'

export default function signup () {

  const {data: session, status} = useSession()
  const [signUpData, setSignUpData] = useState({
    lastName: '',
    firstName: '',
    adress: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const handleChange = e => {
    setSignUpData(prevSignUpData => {
      return {
        ...prevSignUpData,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  if(session) {
    window.location = '/'
    return 
   }
  if(status === 'loading'){
    return <div>Loading...</div>
  }
  return (
      <div className='h-fit w-[500px] min-h-[500px] flex flex-col px-5 place-content-center place-items-center mt-[13vh] rounded-md z-10 animate__animated animate__fadeInLeft'>
    <form onSubmit={handleSubmit} className='h-fit min-h-full w-full flex flex-col items-center mb-10'>
    <p className="text-[44px] font-medium text-white border-b-2 border-orange mb-10">S'inscrire</p>
    <div className='flex flex-nowrap justify-between w-full h-fit mb-7'>
        <input
          type='text'
          placeholder='Nom'
          className='h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-[48%]'
          required=''
          name="lastName"
          value={signUpData.lastName}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Prénom'
          className='h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-[48%]'
          required=''
          name="firstName"
          value={signUpData.firstName}
          onChange={handleChange}
        />
    </div>
        <input
          type='text'
          placeholder='Adresse'
          className='h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full mb-7'
          required=''
          name="adress"
          value={signUpData.adress}
          onChange={handleChange}
        />
        <input
          type='number'
          placeholder='Numéro de tél.'
          className='h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full mb-7'
          required=''
          name="phone"
          value={signUpData.phone}
          onChange={handleChange}
        />
         <input
          type='email'
          placeholder='Email'
          className='h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full'
          required=''
          name="email"
          value={signUpData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Mot de passe'
          required=''
          className="h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full mt-7"
          name="password"
          value={signUpData.password}
          onChange={handleChange}
          />
        <input
          type='password'
          className='h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full my-7'
          id='repeat-password'
          placeholder='Confirmez le mot de passe'
          required=''
          name="passwordConfirm"
          value={signUpData.passwordConfirm}
          onChange={handleChange}
        />
        <button type="submit" className="bg-orange h-fit px-4 py-2 rounded-md text-black text-lg font-medium my-7">S'inscrire</button>
        <div className="text-white">
            Vous êtes déjà inscrit ?&nbsp;
                <Link href='/login'>
                    <a className="font-semibold underline hover:no-underline text-orange">S'identifier</a>
                </Link>
            </div>
    </form>
    </div>
  )
}
