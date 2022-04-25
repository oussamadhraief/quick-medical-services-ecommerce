import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../models/User.js"
import dbConnect from "../../../utils/dbConnect";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../utils/mongoDBProvider"


import { verifyPassword } from '../../../utils/Encryption';
import bcrypt from "bcryptjs/dist/bcrypt";
dbConnect()

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
},
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      
      async authorize(credentials) {
        // const client = await MongoClient.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
        // const users = await client.db().users
        const user = await User.findOne({email : credentials.email,})
        if (!user){
          throw new Error ('No User found with this email')
        }
        const validPassword = await bcrypt.compare(credentials.password, user.password)
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
  })


