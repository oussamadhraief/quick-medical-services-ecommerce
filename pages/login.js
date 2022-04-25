import { getCsrfToken, signIn } from "next-auth/react"
import { useState } from 'react'



export default function SignIn({ csrfToken }) {
//   const [email, setEmail] = useState(null)
//   const [password, setPassword] = useState(null)

//   const onSubmit = async () => {
//     e.preventDefault()
//     const res = await signIn('credentials',{email, password, callbackUrl : '/'})
//     if (res?.error){
//       return res.error 
//     }
//     if (res.url) console.log(res.url)
// }
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

