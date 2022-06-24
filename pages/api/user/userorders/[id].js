import Amazon from '../../../../Models/Amazon'
import Instrument from '../../../../Models/Instrument'
import Brimstone,{db} from '../../../../Models/Brimstone'
import dbConnect from '../../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
dbConnect()
// quick note : fel mongo maktouba adress fi 3oudh address
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
    
        let commande = await Amazon.findOne({user: User, _id: req.query.id}).populate([{path: 'user',model: 'Brimstone'},{path: 'cart.product',model: 'Instrument'}])
    
        if(!commande){
            res.status(404).json({success: false, data: 'Order not found'})
            return
        }

        res.status(200).json({ success: true, data: commande })

    } catch (error) {

        res.status(400).json({ success: false })

    }
    
  } else {
    res.status(401).json({ sucess: false, data: 'must be authenticated' })
  }
}
