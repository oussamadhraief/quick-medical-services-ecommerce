import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook"
import Testeur from "../../../Models/Testeur.js"
import dbConnect from "../../../utils/dbConnect";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/MongoDBProvider"


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
        const user = await Testeur.findOne({email : credentials.email,})
        if (!user){
          throw new Error ('No Testeur found with this email')
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
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks:{
    async session({session, user}){
      const thisTesteur = await Testeur.findOne({email : session.user.email})
      
      // if (typeof(thisTesteur.isAdmin) == 'undefined') {
      //   const newTesteur = await Testeur.findOneAndUpdate({email : session.user.email},{
      //   ...thisTesteur,
      //   isAdmin: false,
      // })}
      session.user.address = thisTesteur.address
      session.user.city = thisTesteur.city
      session.user.country = thisTesteur.country
      session.user.zipCode = thisTesteur.zipCode
      session.user.name = thisTesteur.name
      session.user.phone = thisTesteur.phone
      session.user.isAdmin = thisTesteur.isAdmin

      
      return Promise.resolve(session)
    }
  }
  
  })
