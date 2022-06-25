import dbConnect from '../../../utils/dbConnect'
import Brimstone from '../../../Models/Brimstone'
import { getSession } from 'next-auth/react'

dbConnect()

export default async (req, res) => {
  const session = await getSession({ req })

  if (req.method !== 'PATCH') return res.status(400).json({ success: false, message: 'Only PATCH request accepted' })

  if (session) {
    try {
      const user = await Brimstone.findOneAndUpdate({ email: session.user.email },{
        phone: req.body.phone,
        name: req.body.name
      },{ new: true, runValidators: true })
     
      res.status(200).json({ success: true, user: user })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  } else
    res.status(401).json({ sucess: false, message: 'must be authenticated' })
}
