import { hashPassword } from "../../../utils/Encryption";
import dbConnect from "../../../utils/dbConnect";
import Docteur from "../../../Models/Docteur"

dbConnect()

async function handler(req, res) {
  if(req.method !== 'POST'){
    return;
  }

  if (!req.body.email || !req.body.email.includes('@') || !req.body.password || req.body.password.trim().length < 7 || req.body.passwordConfirm !== req.body.password){
    res.status(422).json({message:  'Invalid input - password should also be at least 7 characters long.'})
    return;
  }
  const existingUser = await Docteur.findOne({email: req.body.email})

  if (existingUser) {
    res.status(422).json({message: 'User exists already'})
    return;
  }
  const hashedPassword = await hashPassword(req.body.password)

  const name = `${req.body.firstName} ${req.body.lastName}`

  const result = await Docteur.create({
    name: name,
    email: req.body.email,
    password: hashedPassword,
    isAdmin : false,
    phone: parseInt(req.body.phone),
    address: req.body.address
  })
  res.status(201).json({message : 'Created user!' , user: result, address: req.body.address})
}
export default handler