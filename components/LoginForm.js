import { getCsrfToken, useSession } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'

export default function SignIn({ csrfToken }) {
  const {data: session, status} = useSession()
  if(session) {
    window.location = '/'
    return 
   }
  if(status === 'loading'){
    return <div>Loading...</div>
  }
  return (
      <div className="h-fit w-[500px] min-h-[500px] flex flex-col px-5 place-content-center place-items-center mt-[12vh] rounded-md z-10">
        <form method="post" action="/api/auth/callback/credentials" className="h-fit min-h-full w-full flex flex-col items-center mb-10">
            <p className="text-[44px] font-medium text-white border-b-2 border-orange mb-10">Se connecter</p>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input name="email" type="email" className="h-9 px-1 outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full" placeholder="Nom d'utilisateur"/>
            
            <input name="password" type="password" className="h-9 px-1 outline-none border-b-2 bg-transparent placeholder:text-white border-white w-full my-7" placeholder="Mot de passe" />
            <button type="submit" className="bg-orange h-fit px-4 py-2 rounded-md text-black text-lg font-medium my-7">Se connecter</button>
            <div className="text-white">
            Vous n'êtes pas déjà inscrit ?&nbsp;
                <Link href='/register'>
                    <a className="font-semibold underline hover:no-underline text-orange">Créez un compte</a>
                </Link>
            </div>
        </form>
        <button className="w-fit h-fit flex flex-nowrap bg-[#546AA3] px-3 py-2 justify-center gap-1 text-white font-medium items-center rounded-md shadow"><Image src={'pfe/facebook_dryelz.png'} alt='facebook icon' width={30} height={30} layout='fixed' /> Se connecter avec Facebook</button>
    </div>
  )
  
}
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

