import { hashPassword } from "../../../utils/Encryption";
import { useSession } from 'next-auth/react';
import { Router } from "next/router";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../Models/User"

dbConnect()

async function handler(req, res) {
  if(req.method !== 'POST'){
    return;
  }
  const data = req.body
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
    password: hashedPassword,
    isAdmin : false
  })
  res.status(201).json({message : 'Created user!' , user: {email , password, isAdmin}})
}
export default handler