import Brimstone from '../../../Models/Brimstone'
import Instrument from '../../../Models/Instrument'
import dbConnect from '../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
dbConnect()
// change req.body.email to session later
export default async function handler (req, res) {
  const session = await getSession({ req })
  if (req.method !== 'PATCH') {
    return
  }
  
  if (session) {
    const user = await Brimstone.findOne({ email: session.user.email })
    if (!user) {
      res.status(405).json({ success: false, message: 'User not found' })
    }
    const product = await Instrument.findOne({ reference: req.body.reference })
    if (!product) {
      res.status(400).json({ success: false, message: 'Product not found' })
    }

      const productExists = user.cart.some(item => item.toString() == product._id.toString())
        if(productExists){
          res
          .status(200)
          .json({ success: true, message: 'product removed successfully', cart: user.cart.length })
        }else{
          user.cart.pull(product)
          user.save()
          res
            .status(201)
            .json({ success: true, message: 'product removed successfully', cart: user.cart.length })
        }

      
  } else {
    res.status(401).json({ sucess: false, message: 'must be authenticated' })
  }
}
