import Testeur from '../../../Models/Testeur'
import dbConnect from '../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
dbConnect()

export default async function handler (req, res) {
  const session = await getSession({ req })

  if (req.method !== 'GET') return

  if (session) {
    try {
        const User = await Testeur.findOne({ email: session.user.email }).populate('cart')
        const newCart = User.cart.filter(item => item.archived == false)
        if(newCart.length != User.cart.length){
          User.cart = newCart
          User.save()
        }
        res.status(200).json({ success: true, data: User.cart })

    } catch (error) {

        res.status(400).json({ success: false })

    }
   

    
  } else {
    res.status(401).json({ sucess: false, message: 'must be authenticated' })
  }
}
