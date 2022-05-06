import Docteur from '../../../Models/Docteur'
import Instrument from '../../../Models/Instrument'
import dbConnect from '../../../utils/dbConnect'
dbConnect()
// change req.body.email to session later
export default async function handler (req, res) {
  if (req.method !== 'PATCH') {
    return
  }

  const user = await Docteur.findOne({ email: req.body.email })
  if (!user) {
    res.status(405).json({ success: false, message: 'User not found' })
  }
  const product = await Instrument.findOne({ reference: req.body.reference })
  if (!product) {
    res.status(400).json({ success: false, message: 'Product not found' })
  }
  
  let productExists
  console.log(user)
  user.cart.forEach(elem => {
    if (String(elem) === String(product._id)) {
      productExists = true
    }
  })
  if (productExists) {
    res.status(200).json({success:true , message : 'products exists already'})
  } else {
    user.cart.push(product)
    res.status(201).json({success:true , message: 'product added successfully'})
  }
  
  user.save()
  user
    .populate('cart')
    .then(e => console.log(e))
}
