import Brimstone from '../../../Models/Brimstone'
import dbConnect from '../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
dbConnect()

export default async function handler (req, res) {
  const session = await getSession({ req })

  if (req.method !== 'GET') return

  if (session) {
    try {
        const products = await Brimstone.findOne({ email: session.user.email }).populate('cart')
    
        res.status(200).json({ success: true, data: products.cart })

    } catch (error) {

        res.status(400).json({ success: false })

    }
   

    
  } else {
    res.status(401).json({ sucess: false, message: 'must be authenticated' })
  }
}
