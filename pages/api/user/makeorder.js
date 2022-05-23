import Amazon from '../../../Models/Amazon'
import Testeur from '../../../Models/Testeur'
import Instrument from '../../../Models/Instrument'
import dbConnect from '../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
dbConnect()
// quick note : fel mongo maktouba adress fi 3oudh address
export default async function handler (req, res) {
  const session = await getSession({ req })

  if (req.method !== 'POST') return
  if (session) {
    
    const User = await Testeur.findOne({ email: session.user.email })
    if(!User){
      res.status(404).json({success: false, message: 'User not found'})
    }

    let orderData = []

    for (const item of req.body.cart) {
      let product = await Instrument.findOne({ reference: item.reference })
      if(!product){
        res.status(404).json({success: false , message: 'Product not found'})
      }
      
      orderData.push({
        product: product,
        size: item.size,
        quantity: item.quantity
      })
    }

    const commande = await Amazon.create({
      user: User,
      email: req.body.email,
      cart: orderData,
      name: req.body.name,
      address : req.body.address,
      city : req.body.city,
      country : req.body.country,
      zipCode : req.body.zipCode,
      phoneNumber : req.body.phone,
      clinicName: req.body.clinicName,
      taxRegistrationNumber: req.body.taxRegistrationNumber,
      note: req.body.note
    })

    User.ordersHistory.push(commande)
    User.save()

    res.status(201).json({ success: true, data: commande, user: User })

    
  } else {
    res.status(401).json({ sucess: false, message: 'must be authenticated' })
  }
}
