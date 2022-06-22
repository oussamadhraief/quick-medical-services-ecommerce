import dbConnect from '../../../utils/dbConnect'
import Prv from '../../../Models/Prv'
import { getSession } from "next-auth/react"

dbConnect()

export default async (req, res) => {
  const session = await getSession({ req })
  switch (req.method) {
    case 'GET':
      if(session){

        if(session.user.isAdmin){    
                    const number = req.query.page*5
                    const Prvs = await Prv.find({}).sort({createdAt: -1}).skip(number).limit(5)

                    res.status(200).json({ success: true, data: Prvs });

                    return
      }else{
        return res.status(400).json({ success: false, data: 'must be authorized' })
      }
      }else{
        return res.status(400).json({ success: false, data: 'must be authenticated' })

      }
    case 'POST':
      try {
        const data = await Prv.create(req.body)
        return res.status(201).json({ success: true, data: data })
      } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false })
      }
  }
}
