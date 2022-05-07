import Commande from '../../../Models/Commande'
import Docteur from '../../../Models/Docteur'
import Instrument from '../../../Models/Instrument'
import dbConnect from '../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
dbConnect()
//change req.body.email to session.email
export default async function handler (req, res) {
  const session = await getSession({ req })

  if (req.method !== 'POST') return
  if (session) {
    const user = await Docteur.findOne({ email: session.user.email })
    const commande = await Commande.create({
      user: user,
      cart: [],
      clinicName: req.body.clinicName,
      taxRegistrationNumber: req.body.taxRegistrationNumber
    })

    for (const elem of req.body.products) {
      let myArray = elem.reference.split('.')
      let reference = `${myArray[0]}.${myArray[1]}.${myArray[2]}`
      let size = parseInt(myArray[3])
      console.log(myArray)
      console.log(reference)
      console.log(size)
      // let productToAdd = {{product}, "quantity" : req.body.quantity}
      let product = await Instrument.findOne({ reference: reference })
      console.log(product)
      commande.cart.push({
        product: product,
        size: size,
        quantity: elem.quantity
      })
    }
    commande.save()

    res.status(201).json({ success: true, data: commande })
  } else {
    res.status(401).json({ sucess: false, message: 'must be authenticated' })
  }
}
