import Commande from '../../../Models/Commande'
import Docteur from '../../../Models/Docteur'
import Instrument from '../../../Models/Instrument'
import dbConnect from '../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
dbConnect()
// quick note : fel mongo maktouba adress fi 3oudh address
export default async function handler (req, res) {
  const session = await getSession({ req })

  if (req.method !== 'POST') return
  // if (session) {
    const user = await Docteur.findOne({ email: req.body.email })
    if(!user){
      res.status(404).json({success: false, message: 'User not found'})
    }
    console.log(req.body.address)
    const commande = await Commande.create({
      user: user,
      cart: [],
      name: req.body.name,
      address : [],
      phone : req.body.phoneNumber,
      clinicName: req.body.clinicName,
      taxRegistrationNumber: req.body.taxRegistrationNumber,
      note: req.body.note
    })
    for (const elem of req.body.address){

      commande.adress.push(elem)
    }
    // await commande.address.push(req.body.address)

    for (const elem of req.body.products) {
      let myArray = elem.reference.split('.')
      let reference = `${myArray[0]}.${myArray[1]}.${myArray[2]}`
      let size = parseInt(myArray[3])
      let product = await Instrument.findOne({ reference: reference })
      if(!product){
        res.status(404).json({success: false , message: 'Product not found'})
      }
      
      commande.cart.push({
        product: product,
        size: size,
        quantity: elem.quantity
      })
    }
    commande.save()

    res.status(201).json({ success: true, data: commande })
  // } else {
  //   res.status(401).json({ sucess: false, message: 'must be authenticated' })
  // }
}
