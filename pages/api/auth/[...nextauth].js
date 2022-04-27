import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook"
import User from "../../../models/User.js"
import dbConnect from "../../../utils/dbConnect";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/mongoDBProvider"


import { verifyPassword } from '../../../utils/Encryption';
dbConnect()

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      
      async authorize(credentials) {
        const user = await User.findOne({email : credentials.email,})
        if (!user){
          throw new Error ('No User found with this email')
        }
        const validPassword = await verifyPassword(credentials.password, user.password)
        if (!validPassword) {
          
          throw new Error('Password doesnt match');
        }
        
        return user;
        },
    })
  ],
  pages: {
    signIn: '/login',
  },
  database: process.env.MONGO_URI,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async session({session, user}){
      const thisUser = await User.findOne({email : session.user.email})
      session.user.isAdmin = thisUser.isAdmin
      
      return Promise.resolve(session)
    }
  }
  
  })
