import Brimstone from '../../../Models/Brimstone'
import Instrument from '../../../Models/Instrument'
import dbConnect from '../../../utils/dbConnect'
import { getSession } from 'next-auth/react'

dbConnect()

export default async function handler (req, res) {
  const session = await getSession({ req })
  
  if (req.method !== 'PATCH') {
    return
  }
  
  try {
    if (session) {
      const user = await Brimstone.findOne({ email: session.user.email })
      if (!user) {
        res.status(405).json({ success: false, message: 'User not found' })
        return
      }
      const product = await Instrument.findOne({ reference: req.body.reference })
      if (!product || product.archived == true) {
        res.status(404).json({ success: false, message: 'Product not found' })
        return
      }
      
      if(product.archived){
        res.status(400).json({ success: false, message: 'Unable to add product to cart' })
        return
      }
      
      const productExists = user.cart.some(item => {
        return item.toString() == product._id.toString()
      })
  
      if (productExists) {
        res
          .status(200)
          .json({ success: true, message: 'products exists already', cart: user.cart.length })
      } else {
  
        user.cart.push(product)
        res
          .status(201)
          .json({ success: true, message: 'product added successfully', cart: user.cart.length })
      }
      
  
      user.save()
    } else {
      res.status(401).json({ sucess: false, message: 'must be authenticated' })
    }
  } catch (error) {
    
      res.status(400).json({ sucess: false })
      
  }

  
}
