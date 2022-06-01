import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Bambi from "../../../Models/Bambi.js"
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
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      
      async authorize(credentials) {
        const user = await Bambi.findOne({email : credentials.email,})
        if (!user){
          throw new Error ('No Bambi found with this email')
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
      const thisBambi = await Bambi.findOne({email : session.user.email})
      
      // if (typeof(thisBambi.isAdmin) == 'undefined') {
      //   const newBambi = await Bambi.findOneAndUpdate({email : session.user.email},{
      //   ...thisBambi,
      //   isAdmin: false,
      // })}
      session.user.address = thisBambi.address
      session.user.city = thisBambi.city
      session.user.country = thisBambi.country
      session.user.zipCode = thisBambi.zipCode
      session.user.name = thisBambi.name
      session.user.phone = thisBambi.phone
      session.user.isAdmin = thisBambi.isAdmin

      
      return Promise.resolve(session)
    }
  }
  
  })
