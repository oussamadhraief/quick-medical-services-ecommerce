import dbConnect from '../../../utils/dbConnect'
import Prv from '../../../Models/Prv'
import { getSession } from "next-auth/react"

dbConnect()

export default async (req, res) => {
  const session = await getSession({ req })
  switch (req.method) {
    case 'PUT':
      if(session){

        if(session.user.isAdmin){
      try {
        const data = await Prv.findOneAndUpdate(
          { _id: req.query.id },
          {isReview : req.body.isReview },
          { new: true }
          )
        return res.status(200).json({ success: true, data: data })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
    }else{
      return res.status(400).json({ success: false, data: 'must be authorized' })
    }
    }else{
      return res.status(400).json({ success: false, data: 'must be authenticated' })

    }
    case 'DELETE':
      if(session){

        if(session.user.isAdmin){
      try {
        await Prv.deleteOne(
          { _id: req.query.id }
        )
        return res.status(200).json({ success: true })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
    }else{
      return res.status(400).json({ success: false, data: 'must be authorized' })
    }
    }else{
      return res.status(400).json({ success: false, data: 'must be authenticated' })

    }
  }
}
