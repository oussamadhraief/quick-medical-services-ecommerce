import { getCsrfToken, useSession } from "next-auth/react"

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
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Username
        <input name="email" type="email"  />
      </label>
      <label>
        Password
        <input name="password" type="password"  />
      </label>
      <button type="submit" >Sign in</button>
    </form>
  )
  
}
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

