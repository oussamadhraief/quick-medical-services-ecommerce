import Quote from '../../../../Models/Quote'
import Brimstone,{db} from '../../../../Models/Brimstone'
import dbConnect from '../../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
import Instrument from '../../../../Models/Instrument'
dbConnect()
export default async function handler (req, res) {
  const session = await getSession({ req })

  if (req.method !== 'GET') return
  if (session) {
    try {
        const User = await Brimstone.findOne({ email: session.user.email })
        if(!User){
          res.status(404).json({success: false, data: 'User not found'})
          return
        }
    
        let commande = await Quote.findOne({user: User, _id: req.query.id}).populate('user')
    
        if(!commande){
            res.status(404).json({success: false, data: 'Order not found'})
            return
        }

        for(let item of commande.cart){
          item.product = await Instrument.findOne({_id: item.product})
        }
        
        res.status(200).json({ success: true, data: commande })

    } catch (error) {

        res.status(400).json({ success: false })

    }
    
  } else {
    res.status(401).json({ sucess: false, data: 'must be authenticated' })
  }
}
