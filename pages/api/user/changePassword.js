import { getSession } from 'next-auth/client';

import { hashPassword, verifyPassword } from '../../../lib/auth';
import dbConnect from "../../../utils/dbConnect";
dbConnect()

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  const user = await Docteur.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: 'User not found.' })
  }

  const currentPassword = user.password

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' })
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await Docteur.updateOne(
    { email: userEmail },
    { password: hashedPassword },
    { new: true, runValidators: true }
  );
  res.status(200).json({ message: 'Password updated!' });
}

export default handler;