import { hashPassword } from "../../../utils/Encryption";
import dbConnect from "../../../utils/dbConnect";
import Brimstone from "../../../Models/Brimstone"

dbConnect()

async function handler(req, res) {
  if(req.method !== 'POST'){
    return;
  }

  if (!req.body.email || !req.body.email.includes('@') || !req.body.password || req.body.password.trim().length < 7 || req.body.passwordConfirm !== req.body.password){
    res.status(422).json({ success: false,message:  'Invalid input - password should also be at least 7 characters long.'})
    return;
  }
  try {
    const existingUser = await Brimstone.findOne({email: req.body.email})

  if (existingUser) {
    res.status(422).json({ success: false, message: 'User exists already'})
    return;
  }

  const hashedPassword = await hashPassword(req.body.password)

  const name = `${req.body.firstName} ${req.body.lastName}`

  const result = await Brimstone.create({
    name: name,
    email: req.body.email,
    password: hashedPassword,
    isAdmin : false,
    phone: parseInt(req.body.phone),
    cart : []
  })
  res.status(201).json({ success: true, message : 'Created user!' , user: result})
  } catch (error) {
    res.status(400).json({success: false})
  }
  
}
export default handler