import Docteur from "../../../Models/Docteur";
import Instrument from "../../../Models/Instrument";
import dbConnect from "../../../utils/dbConnect";
dbConnect()

export default async function handler(req, res){
  if (req.method !== 'PATCH') {
    return;
  }

  const user = await Docteur.findOne({email: req.body.email})
  if (!user){
    res.status(405).json({success: false , message: 'User not found'})
  }
  const product = await Instrument.findOne({reference: req.body.reference})
  if(!product){
    res.status(400).json({success:false , message: 'Product not found'})
  }
  user.cart.push(product._id)
  user.save()
  user.populate('cart').then(p => console.log(p))
  
  res.status(201).json({success: true , message: 'product Added to cart successfully' })
}