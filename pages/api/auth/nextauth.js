import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../models/User.js"
import dbConnect from "../../../utils/dbConnect";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/mongodb"


import { verifyPassword } from '../../../utils/auth';
dbConnect()

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
          email: { label: "Email", type: "email", placeholder: "exemple@gmail.com" },
          password: {  label: "Password", type: "password" }
        },
      async authorize(credentials) {
        const email = credentials.email
        const password = credentials.password
        const user = await User.findOne({email})
        if(!user)  throw new Error ("no user found")
        const isValid = await verifyPassword(password, user.password)
        if (!isValid) {
          throw new Error ('Could not log you in!')
        }
        return {email: user.email}
      },
    })
  ],
  pages: {
    signIn: '/login',
  },
  database: process.env.MONGO_URI,
  secret: process.env.NEXTAUTH_SECRET,
  })


