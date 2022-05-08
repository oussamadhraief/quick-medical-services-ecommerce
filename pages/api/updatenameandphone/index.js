import dbConnect from '../../../utils/dbConnect'
import Docteur from '../../../Models/Docteur'
import { getSession } from 'next-auth/react'
// user must be logged in
dbConnect()
export default async (req, res) => {
  const session = await getSession({ req })
  if (req.method !== 'POST')
    return res
      .status(400)
      .json({ success: false, message: 'Only POST request accepted' })
}