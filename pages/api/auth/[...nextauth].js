import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Brimstone from "../../../Models/Brimstone.js"
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
        const user = await Brimstone.findOne({email : credentials.email,})
        if (!user){
          throw new Error ('No Brimstone found with this email')
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
      const thisBrimstone = await Brimstone.findOne({email : session.user.email})
      
      // if (typeof(thisBrimstone.isAdmin) == 'undefined') {
      //   const newBrimstone = await Brimstone.findOneAndUpdate({email : session.user.email},{
      //   ...thisBrimstone,
      //   isAdmin: false,
      // })}
      session.user.address = thisBrimstone.address
      session.user.city = thisBrimstone.city
      session.user.country = thisBrimstone.country
      session.user.zipCode = thisBrimstone.zipCode
      session.user.name = thisBrimstone.name
      session.user.phone = thisBrimstone.phone
      session.user.isAdmin = thisBrimstone.isAdmin

      
      return Promise.resolve(session)
    }
  }
  
  })
