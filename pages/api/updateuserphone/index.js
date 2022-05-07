import dbConnect from '../../../utils/dbConnect'
import Docteur from '../../../Models/Docteur'
import { getSession } from 'next-auth/react'
// user must be logged in + check the user to change is the same as the one logged in
dbConnect()
export default async (req, res) => {
  const session = await getSession({ req })
  if (req.method !== 'POST')
    return res
      .status(400)
      .json({ success: false, message: 'Only POST request accepted' })
  if (session) {
    const user = await Docteur.findOne({ email: req.body.email })
    if (!user) {
      res.status(404).json({ success: false, message: 'no user found' })
    }
    try {
      const userData = await Docteur.findOneAndUpdate(
        { email: req.body.email },
        { phone: req.body.phone },
        { new: true, runValidators: true }
      )

      res.status(200).json({ success: true, data: userData })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  } else {
    res.status(401).json({ sucess: false, message: 'must be authenticated' })
  }
}
