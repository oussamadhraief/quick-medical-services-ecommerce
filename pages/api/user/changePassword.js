import { getSession } from "next-auth/react"
import dbConnect from "../../../utils/dbConnect";
import { hashPassword, verifyPassword } from '../../../utils/Encryption';
import Docteur from "../../../Models/Docteur";

dbConnect()

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }
  try{

  const session = await getSession({ req: req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated!' });
    
  }

  const userEmail = session.user.email
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword
  const newPassword2 = req.body.newPassword2

  const user = await Docteur.findOne({ email: userEmail })

  if (!user) {
    return res.status(404).json({ message: 'User not found.' })
  }

  const currentPassword = user.password

  const oldPasswordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!oldPasswordsAreEqual) {
    console.log('invalid old password')
    return res.status(403).json({ message: 'Invalid password.' })
    }
    if (newPassword !== newPassword2){
      res.status(401).json({message: 'new password dosent match'})
    }

  // const newPasswordsAreEqual = (newPassword === verifyNewPassword )
  // if (!newPasswordsAreEqual) {
  //   return res.status(403).json({message : "Password dosen't match"})
  //  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await Docteur.updateOne(
    { email: userEmail },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );
  console.log('Password updated!')
  return res.status(200).json({ message: 'Password updated!' });
  }
  catch (error){
    console.error(error)
  }
}

export default handler;