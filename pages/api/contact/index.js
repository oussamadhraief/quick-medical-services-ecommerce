import dbConnect from '../../../utils/dbConnect'
import Feedback from '../../../Models/Contact'
import { getSession } from "next-auth/react"

dbConnect()

export default async (req, res) => {
  const session = await getSession({ req })
  switch (req.method) {
    case 'GET':
      if(session){

        if(session.user.isAdmin){

            const NumberOfFeedbacks = await Feedback.countDocuments({})

                
                    
                    const Feedbacks = await Feedback.find({}).sort({createdAt: -1}).skip(req.query.page* 5).limit( 5)

                    res.status(200).json({ success: true, data: Feedbacks, number: NumberOfFeedbacks, index: req.query.page });

                    return
      }else{
        return res.status(400).json({ success: false, data: 'must be authorized' })
      }
      }else{
        return res.status(400).json({ success: false, data: 'must be authenticated' })

      }
    case 'POST':
      try {
        const data = await Feedback.create(req.body)
        return res.status(201).json({ success: true, data: data })
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false })
      }
  }
}
