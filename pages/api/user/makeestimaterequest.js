import Quote from '../../../Models/Quote'
import Brimstone from '../../../Models/Brimstone'
import Instrument from '../../../Models/Instrument'
import dbConnect from '../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
dbConnect()


export default async function handler (req, res) {
  const session = await getSession({ req })

  if (req.method !== 'POST') return

  try {
    if (session) {
    
      const User = await Brimstone.findOne({ email: session.user.email })
      if(!User){
        res.status(404).json({success: false, message: 'User not found'})
        return
      }
  
      let estimateData = []
  
      for (const item of req.body.cart) {
        let product = await Instrument.findOne({ reference: item.reference })
        if(!product){
          res.status(404).json({success: false , message: 'Product not found'})
          return
        }
        
        estimateData.push({
          product: product,
          size: item.size,
          quantity: item.quantity
        })
      }
  
      const devis = await Quote.create({
        user: User,
        email: req.body.email,
        cart: estimateData,
        name: req.body.name,
        phoneNumber : req.body.phone,
        note: req.body.note
      })
  
      User.estimateHistory.push(devis)
      User.cart = []
      User.save()
  
      res.status(201).json({ success: true, data: devis, user: User })
  
      
    } else {
      res.status(401).json({ sucess: false, message: 'must be authenticated' })
    }
  } catch (error) {

    res.status(400).json({ sucess: false })
    
  }
  
}
