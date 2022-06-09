import { useSession, signIn } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'
import 'animate.css'
import { useState } from "react"
import { useRouter } from 'next/router'

export default function LoginForm() {
  const {data: session, status} = useSession()
  
  const router = useRouter()

  const [login,setLogin] = useState({email: '',password: ''})
  const [loginError,setLoginError] = useState(false)

  function handleChange(e) {
    setLoginError(false)
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }


  if(session) {
    
      if(document.referrer.includes('localhost')) {
        router.back()
      }else{
        router.push('/')
      }
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
      <div className="h-fit w-full md:w-[500px] min-w-[320px] min-h-[500px] flex flex-col px-5 place-content-center place-items-center mt-[12vh] rounded-md z-10 animate__animated animate__fadeInRight">
        <form onSubmit={e => {
          e.preventDefault()
          signIn("credentials", {redirect: false, email: login.email, password: login.password }).then(({ ok, error}) => {
            if(error){
              
              setLoginError(true)
            }
          })
        }} className="h-fit min-h-full w-full flex flex-col items-center mb-10">
            <p className="text-[44px] font-medium text-white border-b-2 border-pinky mb-10">Se connecter</p>
            <input name="email" required minLength={8} type="email" value={login.email} onChange={ e => handleChange(e)} className={loginError ? "h-9 px-1 outline-none border-b-2 bg-transparent text-red-500 placeholder:text-red-500 border-red-500 w-full" : "h-9 px-1 outline-none border-b-2 bg-transparent text-white placeholder:text-white border-white w-full"} placeholder="Adresse E-mail"/>
            
            <input name="password" required minLength={6} type="password" value={login.password} onChange={ e => handleChange(e)} className={loginError ? "h-9 px-1 outline-none border-b-2 bg-transparent text-red-500 placeholder:text-red-500 border-red-500 w-full mt-7" : "h-9 px-1 outline-none border-b-2 bg-transparent text-white placeholder:text-white border-white w-full mt-7"} placeholder="Mot de passe" />
            {loginError ? <p className="text-red-500 w-full text-left">L&apos;adresse e-mail ou le mot de passe n&apos;est pas valide</p> : null}
            <button type="submit" className="bg-pinky shadow-[0px_3px_10px_rgba(247,177,162,0.2)] h-fit px-4 py-2 rounded-md text-white text-lg my-7 hover:scale-110 transition-all">Se connecter</button>
            <div className="text-white">
            Vous n&apos;êtes pas déjà inscrit ?&nbsp;
                <Link href='/register'>
                    <a className="font-semibold underline hover:no-underline text-pinky">Créez un compte</a>
                </Link>
            </div>
        </form>
    </div>
  )
  
}