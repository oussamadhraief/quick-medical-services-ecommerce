import { hashPassword } from "../../../utils/auth";
import { useSession } from 'next-auth/react';
import { Router } from "next/router";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../Models/User"

dbConnect()

async function handler(req, res) {

  //redirect to home page if a user is already logged in
  const {data: status} = useSession()
  if (status === "authenticated") {
    return Router.push('/')
  }

  if(req.method !== 'POST'){
    return;
  }
  const data = req.body
  console.log(data)
  const {email, password, passwordConfirm}= data

  if (!email || !email.includes('@') || !password || password.trim().length < 7 || passwordConfirm !== password){
    res.status(422).json({message:  'Invalid input - password should also be at least 7 characters long.'})
    return;
  }
  const existingUser = await User.findOne({email: email})

  if (existingUser) {
    res.status(422).json({message: 'User exists already'})
    return;
  }
  const hashedPassword = await hashPassword(password);

  const result = await User.create({
    email : email,
    password: hashedPassword
  })
  res.status(201).json({message : 'Created user!' , user: {email , password}})
}
export default handler