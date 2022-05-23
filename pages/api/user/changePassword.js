import { getSession } from "next-auth/react"
import dbConnect from "../../../utils/dbConnect";
import { hashPassword, verifyPassword } from '../../../utils/Encryption';
import Testeur from "../../../Models/Testeur";

dbConnect()

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }
  try{

  const session = await getSession({ req: req });

  if (!session) {
    return res.status(401).json({success: false, message: 'Not authenticated!' });
    
  }

  const user = await Testeur.findOne({ email: session.user.email })

  if (!user) {
    return res.status(404).json({ message: 'User not found.' })
  }

  const oldPasswordsAreEqual = await verifyPassword(req.body.oldPassword, user.password)

    if (!oldPasswordsAreEqual) {
    
      return res.status(403).json({success: false, message: 'Invalid password.' })

    }
    
    if (req.body.newPassword !== req.body.newPassword2){

      res.status(401).json({success: false, message: 'new password dosent match'})
    }

  const oldAndNewEqual = await verifyPassword(req.body.newPassword, currentPassword)

  if (oldAndNewEqual) {
    return res.status(401).json({success: false, message : "New password can't be equal to old password"})
   }

  const hashedPassword = await hashPassword(req.body.newPassword)

  const result = await Testeur.updateOne(
    { email: session.user.email },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );

  return res.status(200).json({success: true, message: 'Password updated!' });
  }
  catch (error){
    console.error(error)
  }
}

export default handler;