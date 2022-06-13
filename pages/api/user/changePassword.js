import { getSession } from "next-auth/react"
import dbConnect from "../../../utils/dbConnect";
import { hashPassword, verifyPassword } from '../../../utils/Encryption';
import Brimstone from "../../../Models/Brimstone";

dbConnect()

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }
  try{

  const session = await getSession({ req: req });

  if (!session) {
     res.status(401).json({success: false, message: 'Not authenticated!' });
     return
    
  }

  const user = await Brimstone.findOne({ email: session.user.email })

  if (!user) {
     res.status(404).json({ message: 'User not found.' })
     return
  }

  const oldPasswordsAreEqual = await verifyPassword(req.body.oldPassword, user.password)

    if (!oldPasswordsAreEqual) {
    
       res.status(403).json({success: false, message: 'Invalid password.' })
       return

    }
    
    if (req.body.newPassword !== req.body.newPassword2){

      res.status(401).json({success: false, message: 'new password doesnt match'})
    }

  const oldAndNewEqual = await verifyPassword(req.body.newPassword, user.password)

  if (oldAndNewEqual) {
     res.status(401).json({success: false, message : "New password can't be equal to old password"})
     return
   }

  const hashedPassword = await hashPassword(req.body.newPassword)

  const result = await Brimstone.updateOne(
    { email: session.user.email },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );

   res.status(200).json({success: true, message: 'Password updated!' });
  }
  catch (error){
    console.error(error)
  }
}

export default handler;