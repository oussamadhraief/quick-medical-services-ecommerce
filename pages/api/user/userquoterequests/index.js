import Quote from '../../../../Models/Quote'
import Brimstone from '../../../../Models/Brimstone'
import dbConnect from '../../../../utils/dbConnect'
import { getSession } from 'next-auth/react'
dbConnect()
export default async function handler (req, res) {
  const session = await getSession({ req })

  if (req.method !== 'GET') return
  if (session) {
    try {
        const User = await Brimstone.findOne({ email: session.user.email })
        if(!User){
          res.status(404).json({success: false, message: 'User not found'})
        }
    
        const devis = await Quote.find({user: User}).sort({createdAt: -1})
    
        res.status(200).json({ success: true, data: devis })

    } catch (error) {

        res.status(400).json({ success: false })

    }
   

    
  } else {
    res.status(401).json({ sucess: false, message: 'must be authenticated' })
  }
}
