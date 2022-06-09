import {useState } from 'react'
import {useSession} from "next-auth/react"
import Link from 'next/link'
import 'animate.css'
import { useRouter } from 'next/router'

export default function RegisterForm() {

  const {data: session, status} = useSession()

  const router = useRouter()

  const [signUpData, setSignUpData] = useState({
    lastName: '',
    firstName: '',
    phone: null,
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [registerError,setRegisterError] = useState(false)
  const [registerPasswordError,setRegisterPasswordError] = useState(false)

  const handleChange = e => {
    setRegisterError(false)
    setRegisterPasswordError(false)
    setSignUpData({
        ...signUpData,
        [e.target.name]: e.target.value
      }
    )}

  const handleSubmit = async e => {
    e.preventDefault()
    if(signUpData.password != signUpData.passwordConfirm){
      setRegisterPasswordError(true)
      setSignUpData({
        ...signUpData,
        password: '',
        passwordConfirm: '',
      })
    }else{
      setSignUpData({
        ...signUpData,
          firstName: signUpData.firstName.charAt(0).toUpperCase() + signUpData.firstName.slice(1).toLowerCase(),
          lastName: signUpData.lastName.charAt(0).toUpperCase() + signUpData.lastName.slice(1).toLowerCase()
      })
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(signUpData)
        })
        const { success } = await res.json()
        if(success) {
          router.push('/login')
        }else{
        setRegisterError(true)
        }
      } catch (error) {
        setRegisterError(true)
      }
    }
    
  }



  if(session) {
    router.push('/')
    return 
   }

   if (status === 'loading') {
    return (
      <div className='bg-white h-screen w-screen overflow-hidden flex items-center absolute z-[9999] left-0 top-0'>
        
    <div id="contact-loading" className="w-fit h-fit bg-white/70 z-[9999] mx-auto ">
      <div className="reverse-spinner "></div>
    </div>
      </div>
     )
  }
  
  return (
      <div className='h-fit w-full md:w-[600px] min-w-[320px] min-h-[500px] flex flex-col px-5 place-content-center place-items-center mt-10 md:mt-[13vh] rounded-md z-10 animate__animated animate__fadeInLeft'>
    <form onSubmit={handleSubmit} className='h-fit min-h-full w-full flex flex-col items-center mb-10'>
    <p className="text-[44px] font-medium text-white border-b-2 border-pinky mb-10">S&apos;inscrire</p>
    <div className='flex flex-nowrap justify-between w-full h-fit mb-7'>
        <input
          type='text'
          placeholder='Nom'
          className='h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-[48%]'
          required={true}
          minLength={3}
          name="lastName"
          value={signUpData.lastName}
          onChange={ e => handleChange(e)}
          />
        <input
          type='text'
          placeholder='Prénom'
          className='h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-[48%]'
          required={true}
          minLength={3}
          name="firstName"
          value={signUpData.firstName}
          onChange={ e => handleChange(e)}
        />
    </div>

        <input
          type='number'
          placeholder='Numéro de tél.'
          className='h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full mb-7'
          required={true}
          max='10000000000000'
          min='10000000'
          name="phone"
          value={signUpData.phone}
          onChange={ e => handleChange(e)}
        />
         <input
          type='email'
          placeholder='Email'
          className={registerError ? 'h-9 px-1 text-red-500 outline-none border-b-2 bg-transparent placeholder:text-red-500 border-red-500 w-full mb-0' : 'h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full mb-7'}
          required={true}
          minLength={8}
          name="email"
          value={signUpData.email}
          onChange={ e => handleChange(e)}
        />
        {registerError ? <p className='text-red-500 w-full text-left mb-5'>L&apos;adresse e-mail est déjà utilisée</p> : null}
        <input
          type='password'
          placeholder='Mot de passe'
          required={true}
          minLength={6}
          className={registerPasswordError ? "h-9 px-1 text-red-500 outline-none border-b-2 bg-transparent placeholder:text-red-500 border-red-500 w-full" : "h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full"}
          name="password"
          value={signUpData.password}
          onChange={ e => handleChange(e)}
          />
        <input
          type='password'
          className={registerPasswordError ? 'h-9 px-1 text-red-500 outline-none border-b-2 bg-transparent placeholder:text-red-500 border-red-500 w-full mt-7' : 'h-9 px-1 text-white outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full mt-7'}
          id='repeat-password'
          placeholder='Confirmer le mot de passe'
          required={true}
          minLength={6}
          name="passwordConfirm"
          value={signUpData.passwordConfirm}
          onChange={ e => handleChange(e)}
        />
        {registerPasswordError ? <p className='text-red-500 w-full text-left'>Les mots de passe ne sont pas identiques</p> : null}
        <button type="submit" className="bg-pinky shadow-[0px_3px_10px_rgba(247,177,162,0.5)] h-fit px-4 py-2 rounded-md text-white text-lg my-7">S&apos;inscrire</button>
        <div className="text-white">
            Vous êtes déjà inscrit ?&nbsp;
                <Link href='/login'>
                    <a className="font-semibold underline hover:no-underline text-pinky">S&apos;identifier</a>
                </Link>
            </div>
    </form>
    </div>
  )
}
