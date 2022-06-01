import dbConnect from '../../../utils/dbConnect'
import Bambi from '../../../Models/Bambi'
import { getSession } from 'next-auth/react'
// user must be logged in + check the user to change is the same as the one logged in
dbConnect()
export default async (req, res) => {
  const session = await getSession({ req })
  if (req.method !== 'PATCH')
    return res
      .status(400)
      .json({ success: false, message: 'Only PATCH request accepted' })
  if (session) {
    try {
      const userData = await Bambi.findOneAndUpdate(
        { email: req.user.email },
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
